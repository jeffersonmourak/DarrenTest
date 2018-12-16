import React from 'react';
import 'react-dom';
import { shallow } from 'enzyme';

import App from '../index';

jest.mock('react-dom');

test('Renders without crashing', () => {
    shallow(<App />);
});