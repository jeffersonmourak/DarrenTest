import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Pages/Home.page';

describe('Home page test', () => {
    let component, historyPush;

    beforeEach(() => {
        historyPush = jest.fn();
        component = shallow(<Home history={{ push: historyPush }} />);
    });

    test('Renders without crashing', () => {
        shallow(<Home />);
    });

    test('On Select city change state', () => {
        component.instance().onSelectCity({
            country: 'JP',
            name: 'Tokyo'
        });

        expect(historyPush.mock.calls.length).toBe(1);
    });

});