import { actions } from '../constants';

/**
 * @typedef {Object} State
 * @property {Object} weather Weather Data.
 * @property {Array} forecast Forecast list.
 * @property {Boolean} ready Loading Flag.
 * @property {Boolean} error Error Flag.
 */

/**
 * @typedef {Object} Action
 * @property {Object} payload Action Payload.
 * @property {String} Type Action Type.
 */

const DEFAULT_STATE = {
    ready: false,
    error: false,
    weather: {},
    forecast: []
};

export {
    DEFAULT_STATE
}

/**
 * Weather Page Reducer.
 * 
 * @description
 * Handles the data mutation for the state of Weather page.
 * 
 * @param {State} state Current State.
 * @param {Action} action Requested Action.
 * 
 * @returns {State} The new mutated state.
 */
export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case actions.weather.LOADED: 
            return {
                ...state,
                ready: true,
                weather: action.payload.weather,
                forecast: action.payload.forecast
            }
        case actions.weather.NOT_FOUND:
            return {
                ...state,
                ready: false,
                error: true
            }
        case actions.weather.LOADING:
            return DEFAULT_STATE;
        default: 
            return state
    }
}