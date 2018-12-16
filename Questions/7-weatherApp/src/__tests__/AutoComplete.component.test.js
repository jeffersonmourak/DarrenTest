import React from 'react';
import AutoComplete from '../Components/AutoComplete';
import { noop } from 'lodash';
import { shallow } from 'enzyme';

test('Renders without crashing', () => {
    shallow(<AutoComplete onChange={ noop } onSelect={ noop } />);
});

test('Renders with options', () => {
    shallow(<AutoComplete onChange={ noop } onSelect={ noop } dataSet={ ['hello', 'world'] }/>);
});

test('Unmount correctly', () => {
    const wrapper = shallow(<AutoComplete onChange={ noop } onSelect={ noop } dataSet={ ['hello', 'world'] }/>);

    wrapper.unmount();
});

describe('Handle click outside', () => {
    let wrapper, onClear;
    beforeEach( () => {
        onClear = jest.fn();

        wrapper = shallow(<AutoComplete onChange={ noop } onClear={ onClear } onSelect={ noop } dataSet={ ['hello', 'world'] }/>);
        wrapper.instance().node = { contains: target => !target };
    });

    test('Receive event from eventListener', () => {
        wrapper.instance().detectOutsideFocus = jest.fn();
        wrapper.instance().handleMouseDown({ target: false });
        expect(wrapper.instance().detectOutsideFocus.mock.calls.length).toBe(1);
    });

    test('Trigger on clear action when click outside', () => {
        wrapper.instance().detectOutsideFocus({ target: true });

        expect(onClear.mock.calls.length).toBe(1);
    });

    test('Do not trigger on clear action when click inside', () => {
        wrapper.instance().detectOutsideFocus({ target: false });
        
        expect(onClear.mock.calls.length).toBe(0);
    });
})


