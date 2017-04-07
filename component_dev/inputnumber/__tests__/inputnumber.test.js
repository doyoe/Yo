/**
 * Created by chenjiao on 2017/3/23.
 */
import React from 'react';
import InputNumber from '../src/inputnumber';
import { mount } from 'enzyme';
import { extractProp, getStyle, delay } from '../../common/testUtil';

const initialProps = {
    min: 0,
    max: 10,
    step: 2,
    value: 3,
    disable: false,
    decimalNum: 1,
    extraClass: 'test',
    onChange(value){
        testWrap.setProps({ value });
    }
};

const testWrap = mount(<InputNumber {...initialProps}/>);

test('The inputnumber should be initialized correctly.', () => {
    expect(extractProp(testWrap, 'class')).toBe('yo-number test');
    expect(extractProp(testWrap.find('input.input'), 'value')).toBe('3.0');
});

test('The inputnumber buttons and input should be disabled after disable set to true.', () => {
    testWrap.setProps({ disable: true });
    const inputNode = testWrap.find('input.input');
    const leftBtn = testWrap.find('.minus');
    const rightBtn = testWrap.find('.plus');

    expect(extractProp(inputNode, 'disabled')).toBe(null);
    expect(extractProp(leftBtn, 'class')).toBe('minus disabled');
    expect(extractProp(rightBtn, 'class')).toBe('plus disabled');
    testWrap.setProps({ disable: false });
});

test('The inputnumber\'s decimal number should be set properly.', () => {
    testWrap.setProps({ decimalNum: 2 });
    const inputNode = testWrap.find('.input')
    expect(extractProp(inputNode, 'value')).toBe('3.00');
});

test('The inputnumber\'s value should be set correctly after the buttons pressed.', () => {
    const componentNode = testWrap.first().node;
    componentNode.minusValue(3);
    const inputNode = testWrap.find('.input');
    expect(extractProp(inputNode, 'value')).toBe('1.00');
    componentNode.minusValue(1);
    expect(extractProp(inputNode, 'value')).toBe('0.00');

    componentNode.plusValue(1);
    componentNode.plusValue(3);
    componentNode.plusValue(5);
    componentNode.plusValue(7);
    componentNode.plusValue(9);
    expect(extractProp(inputNode, 'value')).toBe('10.00');
});

test('The value should be mutated correctly after the step reset.', () => {
    testWrap.setProps({ step: 5 });
    const componentNode = testWrap.first().node;
    const inputNode = testWrap.find('.input');
    componentNode.minusValue(10);
    expect(extractProp(inputNode, 'value')).toBe('5.00');
});