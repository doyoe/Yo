import React from 'react';
import Suggest from '../src/suggest';
import { mount } from 'enzyme';
import { extractProp, delay, getStyle, getRandomNumber } from '../../common/testUtil';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const initialProps = {
    results: [{ text: 'test1' }, { text: 'test2' }, { text: 'test3' }],
    inputIcon: 'refresh',
    placeholder: 'search',
    defaultCondition: 'default',
    noDataTmpl: <div>nodata</div>,
    recommendTmpl: <div>recommend</div>,
    showCancelButton: false,
    onConditionChange(cond){
        if (cond === 'another condition') {
            testWrap.setProps({ results: [{ text: 'test2' }, { text: 'test3' }, { text: 'test4' }] });
        } else {
            testWrap.setProps({ results: null });
        }
    },
    renderItem(item){
        return item.text;
    },
    onFocus(){
        testWrap.setProps({ showCancelButton: true });
    },
    onBlur(){
        testWrap.setProps({ showCancelButton: false });
    },
    extraClass: 'yo-suggest-test'
};
const testWrap = mount(<Suggest {...initialProps}/>);
const hostNode = testWrap.find('.yo-suggest');
const formNode = testWrap.find('form.action');
const refreshIcon = testWrap.find('i.yo-ico-refresh');
const deleteIcon = testWrap.find('i.yo-ico-delete');
const recommendNode = testWrap.find('.recommend').first();
const resultNode = testWrap.find('.result.show');
const resultListNode = testWrap.find('ul.yo-list');
const inputNode = testWrap.find('input.input');
const component = testWrap.first().node;

test('The suggest component should mount correctly', () => {
    expect(extractProp(hostNode, 'class')).toBe('yo-suggest yo-suggest-test');
    expect(extractProp(formNode, 'class')).toBe('action');
    expect(extractProp(formNode, 'action')).toBe(null);
    expect(extractProp(refreshIcon, 'class')).toBe('yo-ico yo-ico-refresh show');
    expect(recommendNode.html()).toBe('<div class=\"recommend\"><div>recommend</div></div>');
    expect(resultListNode.html()).toBe('<ul class="yo-list"><li class="item">test1</li><li class="item">test2</li><li class="item">test3</li></ul>');
    expect(extractProp(inputNode, 'value')).toBe('default');
});

test('The results should be updated after condition mutated.', () => {
    component.onConditionChange('another condition');
    expect(resultListNode.html()).toBe('<ul class="yo-list"><li class="item">test2</li><li class="item">test3</li><li class="item">test4</li></ul>');
});

test('NoDataTmpl should be displayed while results is empty.', () => {
    component.onConditionChange('no data condition');
    expect(resultNode.html()).toBe('<div class=\"result show\"><div>nodata</div></div>');
});

test('The delete icon should be displayed if there is a non-empty condition.(If no input icon is identified)', () => {
    testWrap.setProps({ inputIcon: 'delete' });
    expect(extractProp(deleteIcon, 'class')).toBe('yo-ico yo-ico-delete show');
});

test('There should be a cancel button if showCancelButton prop is set to true.', () => {
    inputNode.simulate('focus');
    expect(extractProp(hostNode, 'class')).toBe('yo-suggest yo-suggest-test yo-suggest-modal');
});

test('The cancel button should be hidden after the input blur.', () => {
    inputNode.simulate('blur');
    expect(extractProp(hostNode, 'class')).toBe('yo-suggest yo-suggest-test');
});

test('The result should be rendered as renderResults identified.', () => {
    const renderResult = (results) => {
        return results.map(result => result.text).join(',');
    };
    testWrap.setProps({ renderResult, results: [{ text: 1 }, { text: 2 }] });
    expect(resultNode.html()).toBe('<div class="result show">1,2</div>');
});