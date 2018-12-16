import React from 'react';
import { default as Header, onCitySelected } from '../Components/Header';
import { shallow } from 'enzyme';

test('Renders without crashing', () => {
    shallow(<Header />);
});

test('Redirects when select a new city', () => {
    const history = {
        push: jest.fn()
    };

    onCitySelected(history, { name: 'Dublin', country: 'IE' });

    expect(history.push.mock.calls.length).toBe(1);
})