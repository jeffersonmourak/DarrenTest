import React from 'react';
import Icon from '../Components/Icon';
import { shallow } from 'enzyme';
import { icons, iconModes } from '../Helpers/icon.helper';

test('Renders without crashing with icon type', () => {
    shallow(<Icon type={icons.brokenClouds} />);
});

test('Renders without crashing with icon type and forced mode', () => {
    shallow(<Icon type={icons.brokenClouds} mode={iconModes.night} />);
});

test('Renders without crashing with icon id', () => {
    shallow(<Icon id={icons.brokenClouds} />);
});