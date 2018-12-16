import { combineReducers, createStore } from 'redux';

import WeatherReducer from './Weather.reducer';
import SearchCityReducer from './SearchCity.reducer';

/**
 * Combine the reducers for easy store management.
 */
const reducers = combineReducers({
    weather: WeatherReducer,
    searchCity: SearchCityReducer
});

export default createStore(reducers);