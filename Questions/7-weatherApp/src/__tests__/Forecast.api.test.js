import Forecast from '../Api/Forecast.api';
import { convertToTimezone } from '../Helpers/date.helper';

const RESPONSE = {
    list: [{
        dt_txt: '2017-02-16 12:00:00',
        main: {
            temp_min: 10.1,
            temp_max: 11.3,
            temp: 10.7,
            humidity: 100
        },
        weather: [
            {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d"
            }
        ]
    }]
};

describe('Expect public API', () => {
    test('expect correct resource', () => {
        expect(Forecast.resource).toBe('forecast');
    });
})

describe('get(data)', () => {
    test('search with ok result', () => {
        const dataResponse = [{
            date: convertToTimezone('2017-02-16 12:00:00'),
            humidity: 100,
            temperature: {
                expectation: 10,
                max: 11,
                min: 10,
            },
            weather: {
                description: 'clear sky',
                icon: '01d',
                id: 800,
                main: 'Clear'
            }
        }]

        expect.assertions(2);
        Forecast.sendApiRequest = jest.fn(() => Promise.resolve(RESPONSE));

        Forecast.get({ city: 'london', country: 'GB' }).then(data => expect(data).toEqual(dataResponse));

        expect(Forecast.sendApiRequest.mock.calls.length).toBe(1);
    })
});