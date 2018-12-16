import WeatherActions from "../Actions/Weather.actions";
import { actions } from '../constants';

test('loaded(list)', () => {
    let listExample = ['hello', 'world'];
    
    const expectedResult = {
        type: actions.weather.LOADED,
        payload: listExample
    };

    expect(WeatherActions.loaded(listExample)).toEqual(expectedResult)
});

test('notFound()', () => {
    const expectedResult = {
        type: actions.weather.NOT_FOUND,
    };

    expect(WeatherActions.notFound()).toEqual(expectedResult)
});

test('reset()', () => {
    const expectedResult = {
        type: actions.weather.LOADING,
    };

    expect(WeatherActions.reset()).toEqual(expectedResult)
});