import Weather from '../Api/Weather.api';
import { getToday } from '../Helpers/date.helper';

const RESPONSE = {
    name: 'london',
    sys: {
        country: 'GB'
    },
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
};

describe('Expect public API', () => {
    test('expect correct resource', () => {
        expect(Weather.resource).toBe('weather');
    });
})

describe('get(data)', () => {
    test('search with ok result', () => {
        const dataResponse = {
            date: getToday(),
            city: {
                country: 'GB',
                name: 'london'
            },
            humidity: 100,
            temperature: {
                current: 10,
                max: 11,
                min: 10,
            },
            weather: {
                description: 'clear sky',
                icon: '01d',
                id: 800,
                main: 'Clear'
            }
        };

        expect.assertions(2);
        Weather.sendApiRequest = jest.fn(() => Promise.resolve(RESPONSE));

        Weather.get({ city: 'london', country: 'GB' }).then(data => expect(data).toEqual(dataResponse));

        expect(Weather.sendApiRequest.mock.calls.length).toBe(1);
    })
});