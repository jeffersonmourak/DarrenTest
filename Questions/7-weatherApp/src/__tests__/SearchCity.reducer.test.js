import { actions } from '../constants';
import searchCityReducer from '../Reducers/SearchCity.reducer';

const DEFAULT_STATE = {
    list: [],
    loading: false,
    query: ''
};

describe('Search City Reducer', () => {
    test('initial state', () => {
        expect(searchCityReducer(undefined, { type: 'UNKNOWN' })).toEqual(DEFAULT_STATE);
    });

    test('update list', () => {
        const expectedState = {
            ...DEFAULT_STATE,
            list: ['hello']
        }

        const action = { 
            type: actions.searchCity.LIST_UPDATED,
            payload: ['hello']
        };

        expect(searchCityReducer(DEFAULT_STATE, action)).toEqual(expectedState);
    });

    test('reset state', () => {
        const action = { 
            type: actions.searchCity.RESET
        };

        expect(searchCityReducer(DEFAULT_STATE, action)).toEqual(DEFAULT_STATE);
    });

    test('clear list', () => {
        const expectedState = {
            ...DEFAULT_STATE,
            list: []
        }

        const action = { 
            type: actions.searchCity.CLEAR_LIST
        };

        expect(searchCityReducer(DEFAULT_STATE, action)).toEqual(expectedState);
    });

    describe('update query', () => {
        test('no query', () => {
            const expectedState = {
                ...DEFAULT_STATE,
                loading: false,
                query: ''
            }
    
            const action = { 
                type: actions.searchCity.QUERY_UPDATED,
                payload: ''
            };
    
            expect(searchCityReducer(DEFAULT_STATE, action)).toEqual(expectedState);
        });

        test('with query', () => {
            const expectedState = {
                ...DEFAULT_STATE,
                loading: true,
                query: 'asd'
            }
    
            const action = { 
                type: actions.searchCity.QUERY_UPDATED,
                payload: 'asd'
            };
    
            expect(searchCityReducer(DEFAULT_STATE, action)).toEqual(expectedState);
        });
    })
});