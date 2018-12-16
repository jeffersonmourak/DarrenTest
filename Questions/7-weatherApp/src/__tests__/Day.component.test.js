import React from 'react';
import Day from '../Components/Day';
import { getToday } from '../Helpers/date.helper';
import { shallow } from 'enzyme';

test('Renders without crashing', () => {
    const resume = {
        date: getToday(),
        worstWeather: {
            icon: 'icon'
        }
    };

    shallow(<Day data={{ resume, chart: {} }} />);
});