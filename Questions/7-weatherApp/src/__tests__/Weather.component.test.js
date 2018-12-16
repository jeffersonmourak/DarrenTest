import React from 'react';
import { default as Weather, isTodayFilter, getTheme, Today, buildDay } from '../Components/Weather';
import { shallow } from 'enzyme';
import { getToday } from '../Helpers/date.helper';

const weatherModel = {
    date: getToday(),
    temperature: {
        current: 10,
        max: 11,
        min: 1
    },
    city: {
        name: 'Tokyo',
        country: 'JP'
    },
    weather: {
        icon: 'none'
    }
}

test('Renders without crashing', () => {
    shallow(<Weather forecast={ [] } weather={ weatherModel } />);
});

test('isTodayFilter(date)', () => {
    expect(isTodayFilter({ resume: { date: getToday() } })).toBe(false);
    expect(isTodayFilter({ resume: { date: getToday().add(1, 'days') } })).toBe(true);
});

test('getTheme(temperature)', () => {
    expect(getTheme(11)).toBe('cold');
    expect(getTheme(22)).toBe('hot');
});

test('Today', () => {
    shallow(<Today weather={weatherModel} />);
});

test('buildDay(data, key)', () => {
    const list = [{
        resume: {
            min: 0,
            max: 10,
        }
    }];
    shallow(<div> { list.map(buildDay) } </div>);
});