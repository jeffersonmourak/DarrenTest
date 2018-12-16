import * as weatherHelper from '../Helpers/weather.helper';
import { getToday } from '../Helpers/date.helper';

test('createModel', () => {
    const modelInput = {
        name: 'city',
        sys: {
            country: 'CT'
        },
        main: {
            humidity: 20,
            temp: 10.3,
            temp_max: 20.4,
            temp_min: 8.3
        },
        weather: [ 'hello' ]
    }

    const modelOutput = {
        city: {
            country: "CT",
            name: "city"
        }, 
        date: getToday(),
        humidity: 20,
        temperature: {
            current: 10,
            max: 20,
            min: 8
        },
        weather: "hello"
    }

    expect(weatherHelper.createModel(modelInput)).toEqual(modelOutput);
});