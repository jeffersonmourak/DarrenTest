import { actions } from '../constants';

/**
 * Loaded.
 * 
 * @description
 * Mutates the store state for Loaded with the given payload.
 * 
 * @param {Object} payload The object with weather and forecast.
 * @param {Object} payload.weather The weather data of current day.
 * @param {Array} payload.forecast The forecast data for next 120 hours.
 * 
 * @returns {Object} The action model for the store.
 */
const loaded = payload => ({
    type: actions.weather.LOADED,
    payload
});

/**
 * Not Found.
 * 
 * @description
 * Mutates the store state for Not found.
 * 
 * @returns {Object} The action model for the store.
 */
const notFound = () => ({
    type: actions.weather.NOT_FOUND
});

/**
 * Reset.
 * 
 * @description
 * Reset the store for the Loading default state.
 * 
 * @returns {Object} The action model for the store.
 */
const reset = () => ({
    type: actions.weather.LOADING
})

export default {
    loaded,
    notFound,
    reset
}