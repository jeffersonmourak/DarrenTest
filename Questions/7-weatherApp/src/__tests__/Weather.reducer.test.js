import { actions } from '../constants';
import weatherReducer from '../Reducers/Weather.reducer';

const DEFAULT_STATE = {
    ready: false,
    error: false,
    weather: {},
    forecast: []
};

describe('Search City Reducer', () => {
    test('initial state', () => {
        expect(weatherReducer(undefined, { type: 'UNKNOWN' })).toEqual(DEFAULT_STATE);
    });

    test('loaded data', () => {
        const expectedState = {
            ...DEFAULT_STATE,
            ready: true,
            weather: { type: 'Ok' },
            forecast: [ 'weather' ]
        };

        const action = { 
            type: actions.weather.LOADED,
            payload: {
                weather: { type: 'Ok' },
                forecast: [ 'weather' ]
            }
        };

        expect(weatherReducer(DEFAULT_STATE, action)).toEqual(expectedState);
    });

    test('reset state', () => {
        const action = { 
            type: actions.weather.LOADING,
        };

        expect(weatherReducer(DEFAULT_STATE, action)).toEqual(DEFAULT_STATE);
    });

    test('Not found', () => {
        const action = { 
            type: actions.weather.NOT_FOUND,
        };

        const expectedState = {
            ...DEFAULT_STATE,
            ready: false,
            error: true
        };

        expect(weatherReducer(DEFAULT_STATE, action)).toEqual(expectedState);
    });
});