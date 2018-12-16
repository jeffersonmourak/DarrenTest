import React from 'react';
import NotFound from '../Components/NotFound';
import { shallow } from 'enzyme';

test('Renders without crashing', () => {
    shallow(<NotFound />);
});