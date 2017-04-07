
import React, { Component, PropTypes } from 'react';
import Switch from '../src/switch';
import { mount, render } from 'enzyme'; 
import Form from './demoForTest.js';

const wrapper = mount(<Switch />);

test('switch controlled', () => {
    expect(wrapper.prop('checked')).toBe(true);
    expect(wrapper.prop('disabled')).toBe(false);
    wrapper.setProps({checked: false, disabled: true});
    expect(wrapper.prop('checked')).toBe(false);
    expect(wrapper.prop('disabled')).toBe(true);
});

test('switch Dom', () => {
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('.track').length).toBe(1);
    expect(wrapper.find('.handle').length).toBe(1);
});

test('switch tap event ', () => {
    const wrapper1 = mount(<Form />);
    const prevValue = wrapper1.state('switch1');
    wrapper1.find('Switch').first().simulate('touchend');
    wrapper1.update();
    expect(wrapper1.state('switch1')).toBe(!prevValue);
});
