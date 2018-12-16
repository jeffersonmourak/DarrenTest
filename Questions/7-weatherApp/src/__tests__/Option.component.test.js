import React from 'react';
import Option from '../Components/AutoComplete/Option';
import { shallow } from 'enzyme';

test('Renders without crashing with string', () => {
    shallow(<Option data={'hello'} />);
});

test('Renders without crashing with object', () => {
    shallow(<Option data={{ label: 'hey!' }} />);
});

test('Renders without crashing as readOnly', () => {
    shallow(<Option readOnly={ true } data={{ label: 'hey!' }} />);
});