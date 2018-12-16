import SearchCityActions from "../Actions/SearchCity.actions";
import { actions } from '../constants';

test('updateList(list)', () => {
    let listExample = ['hello', 'world'];
    
    const expectedResult = {
        type: actions.searchCity.LIST_UPDATED,
        payload: listExample
    };

    expect(SearchCityActions.updateList(listExample)).toEqual(expectedResult)
});

test('selectItem(list)', () => {
    let example = 'item';
    
    const expectedResult = {
        type: actions.searchCity.ITEM_SELECTED,
        payload: example
    };

    expect(SearchCityActions.selectItem(example)).toEqual(expectedResult)
});

test('reset()', () => {
    const expectedResult = {
        type: actions.searchCity.RESET,
    };

    expect(SearchCityActions.reset()).toEqual(expectedResult)
});

test('updateQuery(list)', () => {
    let example = 'item';
    
    const expectedResult = {
        type: actions.searchCity.QUERY_UPDATED,
        payload: example
    };

    expect(SearchCityActions.updateQuery(example)).toEqual(expectedResult)
});

test('clearList(list)', () => {
    const expectedResult = {
        type: actions.searchCity.CLEAR_LIST
    };

    expect(SearchCityActions.clearList()).toEqual(expectedResult)
});