import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import Picker from '../src/picker';
import { mount } from 'enzyme';
import { extractProp, delay, getStyle, getRandomOptions, getRandomNumber } from '../../common/testUtil';

injectTapEventPlugin();

const testOpts = getRandomOptions(15);
const initialProps = {
    options: testOpts,
    value: 3,
    looped: true,
    extraClass: 'mount-test',
    height: 200,
    onChange(value){
        testWrap.setProps({ value });
    }
};
let picker = null;
const testWrap = mount(<Picker {...initialProps}/>);

test('Picker should mount with correct props.', () => {
    const hostNode = testWrap.find('.yo-picker');
    expect(extractProp(hostNode, 'class')).toBe('yo-picker mount-test');
    expect(getStyle(hostNode, 'height')).toBe('200px');

    const scrollerNode = testWrap.find('ul.list');
    const scrollerHeight = getStyle(scrollerNode, 'height');
    const scrollerTop = getStyle(scrollerNode, 'top');
    expect(scrollerHeight).toBe('30000000px');
    expect(scrollerTop).toBe('-14999855px');
});

test('Picker should get a correct new value after each scrolling.', () => {
    const componentRef = testWrap.first().node;
    componentRef.refreshOffsetY(-200000);
    const visibleList = componentRef.state.visibleList;
    expect(visibleList[0].value).toBe(4);
    expect(visibleList.pop().value).toBe(13);
});

test('Picker should be refreshed properly after parent component rendered.', () => {
    testWrap.setProps({
        value: 7,
        options: getRandomOptions(20),
        height: 300,
        looped: false,
        extraClass: 'mount-test2'
    });
    const hostNode = testWrap.find('.yo-picker');
    const scrollerNode = testWrap.find('ul.list');
    expect(getStyle(hostNode, 'height')).toBe('300px');
    expect(extractProp(hostNode, 'class')).toBe('yo-picker mount-test2');
    expect(getStyle(scrollerNode, 'height')).toBe('870px');
    expect(getStyle(scrollerNode, 'top')).toBe('-210px');
});