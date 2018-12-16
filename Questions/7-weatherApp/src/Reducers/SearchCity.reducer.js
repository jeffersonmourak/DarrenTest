import { actions } from '../constants';

/**
 * @typedef {Object} State
 * @property {Array} list City List.
 * @property {String} query User's search query.
 * @property {Boolean} loading Loading Flag.
 */

/**
 * @typedef {Object} Action
 * @property {Object} payload Action Payload.
 * @property {String} Type Action Type.
 */

const DEFAULT_STATE = {
    list: [],
    loading: false,
    query: ''
};

export {
    DEFAULT_STATE
}

/**
 * Search City Reducer.
 * 
 * @description
 * Handles the data mutation for the state of search city.
 * 
 * @param {State} state Current State.
 * @param {Action} action Requested Action.
 * 
 * @returns {State} The new mutated state.
 */
export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case actions.searchCity.LIST_UPDATED: 
            return {
                ...state,
                loading: false,
                list: action.payload
            }

        case actions.searchCity.RESET:
            return DEFAULT_STATE;
        
        case actions.searchCity.CLEAR_LIST:
            return {
                ...state,
                list: []
            };

        case actions.searchCity.QUERY_UPDATED:
            return {
                ...state,
                loading: action.payload !== '',
                query: action.payload
            }

        default: 
            return state;
    }
}