import React, { Component, PropTypes } from 'react';
import Modal from '../src/realmodal';
import { mount } from 'enzyme';
import { extractProp, delay } from '../../common/testUtil';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const initialProps = {
    align: 'center',
    show: true,
    contentExtraClass: 'test',
    extraClass: 'wrap-test',
    animation: 'fade',
    contentOffset: [0, 0]
};

const testWrap = mount(<Modal {...initialProps}>test content</Modal>);

test('The dom and properties should be initialized properly.', () => {
    const hostNode = testWrap.find('.yo-modal');
    const contentNode = testWrap.find('div.cont');

    const classNames = extractProp(hostNode, 'class');
    expect(classNames).toBe('yo-modal wrap-test yo-modal-center');

    const contClassNames = extractProp(contentNode, 'class');
    expect(contClassNames).toBe('cont test fade-in ani');

    expect(contentNode.text()).toBe('test content');
});

test('The very animation class should be set at content dom while closing', () => {
    testWrap.setProps({ show: false, contentOffset: [20, 20], maskOffset: [20, 20] });
    const hostNode = testWrap.find('.yo-modal');
    const contentNode = testWrap.find('.cont');

    expect(testWrap.state('show')).toBe(true);

    return delay(200).then(() => {
        expect(testWrap.state('show')).toBe(false);
        expect(extractProp(hostNode, 'style')).toBe('top: 20px; bottom: 20px; display: none;');
        expect(extractProp(contentNode, 'class')).toBe('cont test fade-out ani');
        expect(extractProp(contentNode, 'style')).toBe('position: relative; top: 20px; left: 20px;');
    });
});

const customAnimation = { animation: ['ani-open', 'ani-close'], duration: 500 };
const propsWithCustomAnimation = Object.assign({}, initialProps, { animation: customAnimation });
const custAniModal = mount(<Modal {...propsWithCustomAnimation}>test content</Modal>);

test('The modal should work well with custom animation.', () => {
    const contentNode = custAniModal.find('.cont');
    expect(extractProp(contentNode, 'class')).toBe('cont test ani-open ani');

    custAniModal.setProps({ show: false });
    expect(custAniModal.state('show')).toBe(true);

    return delay(500).then(() => {
        expect(custAniModal.state('show')).toBe(false);
        expect(extractProp(contentNode, 'class')).toBe('cont test ani-close ani');
    });
});