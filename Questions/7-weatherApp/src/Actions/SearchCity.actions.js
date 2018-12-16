import { actions } from '../constants';

/**
 * Update list.
 * 
 * @description
 * Generates the action to mutate the cities list on the store for the given one.
 * 
 * @param {Array} payload List of items to be visible on the dropdown.
 * 
 * @returns {Object} The action model for the store.
 */
const updateList = payload => ({
    type: actions.searchCity.LIST_UPDATED,
    payload
});

/**
 * Reset.
 * 
 * @description
 * Generates the action for reset the whole store and get back to default data.
 * 
 * @returns {Object} The action model for the store.
 */
const reset = () => ({
    type: actions.searchCity.RESET
});

/**
 * Clear List.
 * 
 * @description
 * Generates the action for reset only the list of cities on the store
 * 
 * @returns {Object} The action model for the store.
 */
const clearList = () => ({
    type: actions.searchCity.CLEAR_LIST
});

/**
 * Select Item.
 * 
 * @description
 * Generates the action to mutate the selected item to the given one.
 * 
 * @param {Object} payload The item selected.
 * 
 * @returns {Object} The action model for the store.
 */
const selectItem = payload => ({
    type: actions.searchCity.ITEM_SELECTED,
    payload
});

/**
 * Update query.
 * 
 * @description
 * Generates the action to mutate the current search query to the given one.
 * 
 * @param {String} payload The query to be searched.
 * 
 * @returns {Object} The action model for the store.
 */
const updateQuery = payload => ({
    type: actions.searchCity.QUERY_UPDATED,
    payload
});

export default {
    updateList,
    selectItem,
    reset,
    updateQuery,
    clearList
}