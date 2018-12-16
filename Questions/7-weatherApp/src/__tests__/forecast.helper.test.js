import * as forecastHelper from '../Helpers/forecast.helper';
import { convertToTimezone, getHour } from '../Helpers/date.helper';

test('createModel', () => {
    const modelInput = {
        dt_txt: '2017-02-16 12:00:00',
        main: {
            temp_min: 1.3,
            temp_max: 1.5,
            temp: 1.4,
            humidity: 20
        },
        weather: ['weather']
    };

    const modelOutput = {
        date: convertToTimezone('2017-02-16 12:00:00'),
        temperature: {
            min: 1,
            max: 1,
            expectation: 1
        },
        weather: 'weather',
        humidity: 20
    };

    expect(forecastHelper.createModel(modelInput)).toEqual(modelOutput);
});

test('mapDates', () => {
    let date = convertToTimezone('2017-02-16 12:00:00');

    const inputModel = [
        {
            date,
            name: 'hello'
        },
        {
            date,
            name: 'world'
        }
    ];

    const result = {
        '2017-02-16': [{ date, name: 'hello' }, { date, name: 'world' }]
    }

    expect(forecastHelper.mapDates(inputModel)).toEqual(result);
});

test('createDayData', () => {
    const modelsInput = [
        {
            dt_txt: '2017-02-16 12:00:00',
            main: {
                temp_min: 1.3,
                temp_max: 1.5,
                temp: 1.4,
                humidity: 20
            },
            weather: [{ id: 0 }]
        },
        {
            dt_txt: '2017-02-16 13:00:00',
            main: {
                temp_min: 1.3,
                temp_max: 1.5,
                temp: 1.4,
                humidity: 20
            },
            weather: [{ id: 1 }]
        }
    ];

    const hours = [ convertToTimezone('2017-02-16 12:00:00'), convertToTimezone('2017-02-16 13:00:00') ];

    const expectedResult = [{
        chart: {
            data: [1, 1],
            labels: hours.map(getHour),
        },
        hours: [
            {
                date: hours[0],
                humidity: 20,
                temperature: {
                    expectation: 1,
                    max: 1,
                    min: 1
                }, weather: { id: 0 }
            }, {
                date: hours[1],
                humidity: 20,
                temperature: {
                    expectation: 1,
                    max: 1,
                    min: 1
                }
                , weather: { id: 1 }
            }
        ],
        resume: {
            date: convertToTimezone('2017-02-16 12:00:00'),
            max: 1,
            min: 1,
            worstWeather: { id: 0 }
        }
    }]
    expect(forecastHelper.createDayData(modelsInput.map(forecastHelper.createModel))).toEqual(expectedResult);
});