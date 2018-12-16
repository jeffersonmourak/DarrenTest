import store from '../Reducers/index';
import { DEFAULT_STATE as searchCity } from '../Reducers/SearchCity.reducer';
import { DEFAULT_STATE as weather } from '../Reducers/Weather.reducer';

test('store setup correctly', () => {
    const initialState = {
        searchCity,
        weather
    }

    expect(store.getState()).toEqual(initialState);
});