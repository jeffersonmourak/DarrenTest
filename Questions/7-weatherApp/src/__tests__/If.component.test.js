import React from 'react';
import If from '../Components/If';
import { mount } from 'enzyme';

test('Display children if condition is true', () => {
    const component = mount(<If condition={true} ><span className={ 'test' } > hello </span></If>).find('.test');

    expect(component.length).toBe(1)
});

test('Display children if condition is false', () => {
    const component = mount(<If condition={false} ><span className={ 'test' } > hello </span></If>).find('.test');

    expect(component.length).toBe(0);
});