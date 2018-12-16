import React from 'react';
import { SearchCity } from '../Components/SearchCity';
import { shallow } from 'enzyme';

import '../Api/Cities.api';
import reporter from '../Helpers/reporter.helper';

function mockSearchApiHandler(query) {
    switch(query) {
        case 'RESOLVE': 
            return Promise.resolve(query);
        
        default:
            return Promise.reject(`Error ${query}`);
    }
}

jest.mock('../Api/Cities.api', () => ({ search: query => mockSearchApiHandler(query) }));

describe('SearchCity', () => {
    let wrapper, onSelect, reset, updateQuery, updateList, clearList;

    beforeEach(() => {
        onSelect = jest.fn();
        reset = jest.fn();
        updateQuery = jest.fn();
        updateList = jest.fn();
        clearList = jest.fn();

        wrapper = shallow(<SearchCity clearList={ clearList } data={{ list: [] }} updateList={ updateList } updateQuery={ updateQuery } onSelect={ onSelect } reset={ reset }/>);
    });

    test('closeOnSelect(selection)', () => {    
        wrapper.instance().closeOnSelect('selection');
    
        expect(onSelect.mock.calls.length).toBe(1);
        expect(onSelect.mock.calls[0][0]).toBe('selection');
        expect(reset.mock.calls.length).toBe(1);
    });

    test('onChange(query)', () => {

        wrapper.instance().onUpdateQuery = jest.fn();

        wrapper.instance().onChange('query');
    
        expect(updateQuery.mock.calls.length).toBe(1);
        expect(updateQuery.mock.calls[0][0]).toBe('query');
    });

    describe('onUpdateQuery(query)', () => {
        test('success', () => {
            expect.assertions(2);
            
            wrapper.instance().onUpdateQuery('RESOLVE').then(() => {
                expect(updateList.mock.calls.length).toBe(1);
                expect(updateList.mock.calls[0][0]).toBe('RESOLVE');
            });
        });

        test('fail', () => {
            const spy = jest.spyOn(reporter, 'report');

            expect.assertions(2);

            wrapper.instance().onUpdateQuery('REJECT')
                .catch(() => {
                    expect(spy).toHaveBeenCalled();
                    expect(updateList.mock.calls.length).toBe(0);
                });
        });

        test('less than 3 letters', () => {
            expect.assertions(1);

            wrapper.instance().onUpdateQuery('re').then(() => {
                expect(clearList.mock.calls.length).toBe(1);
            });
        });
    });
});

