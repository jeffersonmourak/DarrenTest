import React from 'react';
import Loading from '../Components/Loading';
import { shallow } from 'enzyme';

test('Renders without crashing', () => {
    shallow(<Loading />);
});