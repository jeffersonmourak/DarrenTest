import React from 'react';
import { shallow } from 'enzyme';
import { DEFAULT_STATE } from '../Reducers/Weather.reducer'

import '../Api/Forecast.api';
import '../Api/Weather.api';

import Weather from '../Pages/Weather.page';

function mockGetApiHandler(data, response) {

    switch(data.name) {
        case 'REJECT': 
            return Promise.reject({ status: 404 });

        case 'UNKNONW': 
            return Promise.resolve({ status: 0 });

        default:
            return Promise.reject(response);
    }
}

jest.mock('../Api/Forecast.api', () => ({ get: data => mockGetApiHandler(data, []) }));
jest.mock('../Api/Weather.api', () => ({ get: data => mockGetApiHandler(data, {}) }));

describe('Weather page test', () => {
    let params;

    beforeEach(() => {
        params = {
            country: 'JP',
            name: 'RESOLVE'
        };
    });

    test('Renders without crashing with default state', () => {
        shallow(<Weather page={ DEFAULT_STATE } match={{ params }} />);
    });

    test('Renders without crashing with loaded data', () => {
        const state = {
            ...DEFAULT_STATE,
            ready: true
        }

        shallow(<Weather page={ state } match={{ params }} />);
    });

    test('Renders without crashing with 404', () => {
        const state = {
            ...DEFAULT_STATE,
            error: true
        }

        shallow(<Weather page={ state } match={{ params }} />);
    });

    describe('Resolve requests', () => {
        test('Resolve with success', () => {
            const loaded = data => {
                expect(data).toEqual({ weather: {}, forecast: [] });
            }

            shallow(<Weather page={ DEFAULT_STATE } loaded={ loaded } match={{ params }} />);
        });

        test('Reject with 404', () => {
            params.name = 'REJECT';

            shallow(<Weather page={ DEFAULT_STATE } notFound={jest.fn()} match={{ params }} />);
        });

        test('Reject unknown', () => {
            params.name = 'UNKNOWN';

            shallow(<Weather page={ DEFAULT_STATE } match={{ params }} />);
        });
    });

    test('call request update if url change', () => {
        params.name = 'UNKNOWN';

        const reset = jest.fn();

        const wrapper = shallow(<Weather page={ DEFAULT_STATE } reset={reset} match={{ url: '/page', params }} />);

        wrapper.setProps({
            match: {
                url: '/other-page'
            }
        });

        expect(reset.mock.calls.length).toBe(1);

        wrapper.setProps({
            match: {
                url: '/other-page'
            }
        });

        expect(reset.mock.calls.length).toBe(1);
    })
});