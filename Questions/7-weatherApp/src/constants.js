const actions = {
    weather: {
        LOADED: 'LOADED',
        LOADING: 'LOADING',
        NOT_FOUND: 'NOT_FOUND'
    },
    searchCity: {
        LIST_UPDATED: 'LIST_UPDATED',
        RESET: 'RESET',
        ITEM_SELECTED: 'ITEM_SELECTED',
        QUERY_UPDATED: 'QUERY_UPDATED',
        CLEAR_LIST: 'CLEAR_LIST'
    },
    pages: [
        'weather',
        'home'
    ]
}
export {
    actions
}