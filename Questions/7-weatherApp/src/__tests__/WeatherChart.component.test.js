import React from 'react';
import WeatherChart from '../Components/WeatherChart';
import { mount } from 'enzyme';

import 'chart.js';

jest.mock('chart.js');

describe('Weather chart', () => {
    let instance;

    beforeEach(() => {
        const wrapper = mount(<WeatherChart source={{ labels: [], data: [] }} />);
        instance = wrapper.instance();
    });

    describe('setupToolTipsTitle(tooltipItems, data)', () => {
        let tooltipItems;

        beforeEach(() => {
            tooltipItems = [{ index: 0 }];
        });

        test('with label', () => {
            const data = {
                labels: ['2018'],
                datasets: [{
                    data: [10]
                }]
            };

            expect(instance.setupToolTipsTitle(tooltipItems, data)).toBe('10º');
        });

        test('without label', () => {
            const data = {
                labels: ['_NO_LABEL_'],
                datasets: [{
                    data: [10]
                }]
            };

            expect(instance.setupToolTipsTitle(tooltipItems, data)).toBe('');
        });
    });

    describe('setupToolTipsLabel(tooltipItems, data)', () => {
        let tooltipItems;

        beforeEach(() => {
            tooltipItems = { index: 0 };
        });

        test('with label', () => {
            const data = {
                labels: ['2018'],
            };

            expect(instance.setupToolTipsLabel(tooltipItems, data)).toBe('2018');
        });

        test('without label', () => {
            const data = {
                labels: ['_NO_LABEL_'],
            };

            expect(instance.setupToolTipsLabel(tooltipItems, data)).toBe('');
        });
    });

    test('setupTooltips()', () => {
        expect(instance.setupTooltips()).toHaveProperty('yAlign');
        expect(instance.setupTooltips()).toHaveProperty('callbacks');
    });

    test('setupScales(min, max)', () => {
        const expectedResult = {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: false,
                        max: 20,
                        min: -9,
                        scaleBeginAtZero: true,
                    },
                },
            ],
        }

        expect(instance.setupScales(1, 10)).toEqual(expectedResult);
    });

    test('setupTheme(name)', () => {
        expect(instance.setupTheme('cold')).toBe('#fff');
        expect(instance.setupTheme('hot')).toBe('#585858');
    });

   describe('setupData(source)', () => {
        test('Setup Cold', () => {
            const source = {
                data: [10, 1],
                labels: ['1', '2']
            }

            expect(instance.setupData(source)).toHaveProperty('labels');
            expect(instance.setupData(source)).toHaveProperty('datasets');
        });

        test('Setup Hot', () => {
            const source = {
                data: [27, 32],
                labels: ['1', '2']
            }

            expect(instance.setupData(source)).toHaveProperty('labels');
            expect(instance.setupData(source)).toHaveProperty('datasets');
        });
   });
});