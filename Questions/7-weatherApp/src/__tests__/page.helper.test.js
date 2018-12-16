import * as pageHelper from '../Helpers/page.helper';
import React from 'react';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer';

const ExampleComponent = () => (<div></div>);
const mockStore = configureStore();
let store;

beforeEach(() => {
    store = mockStore({});
})

test('createPage(Component, key = "", actions = {})', () => {
    const Component = pageHelper.createPage(ExampleComponent);
    let tree = renderer.create(<Provider store={store}> <Component /> </Provider>);

    expect(tree).toMatchSnapshot();
});