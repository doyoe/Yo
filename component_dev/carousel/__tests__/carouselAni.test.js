
import React, { Component, PropTypes } from 'react';
import { shallow } from 'enzyme';
import aniScrollX from '../src/aniScrollX.js';
import aniCss from '../src/aniCss.js';
import aniInfinate from '../src/aniInfinate.js';
import aniLoopInfinate from '../src/aniLoopInfinate.js';
import CarouselItem from '../src/carouselItem';
import testData from './testData.js'; 

function basicTestList(aniFunc, aniProps = {}){

    const testAniProps = Object.assign({
        aniSpeed:0,
        containerDOM: '', 
        delay: 1,
        loop: true,
        operationTimer: 1,
        pageNow: 2,
        pagesNum: 5,
        speed: .5,
        stageDOM: '',
        width: 375,
        touchstartLocation: '',
        touchendLocation: '',
        touchmoveLocation: ''
    }, aniProps);

    const defaultFunList = [
        'handleData',
        'prev',
        'next',
        'arrive',
        'touchstart',
        'touchmove',
        'touchend'
    ];

    const aniObj = aniFunc();
    describe('necessary function', () => {
        defaultFunList.forEach(item => {
            test(item, () => {
                expect(aniObj.hasOwnProperty(item) && typeof aniObj[item] === 'function').toBeTruthy();
            })
        });
    });

    test('handleData function must return React.Children', () => {
        const children = (testData.map((item, index) => <CarouselItem {...item} key={index} />));
        const childrenAfterHandle = aniObj.handleData(testAniProps, children);
        expect(React.isValidElement(childrenAfterHandle.length ? childrenAfterHandle[0]: childrenAfterHandle)).toBeTruthy();
    });

    test('next function should return newpageNum larger than pageNow', () => {
        testAniProps.operationTimer = testAniProps.pageNow;
        expect(aniObj.next(testAniProps) - testAniProps.pageNow).toBe(1);
    });

    test('prev function should return newpageNum less than pageNow', () => {
        testAniProps.operationTimer = testAniProps.pageNow - 2;
        expect(aniObj.prev(testAniProps) - testAniProps.pageNow).toBe(-1);
    });

    test('arrive should return the target page', () => {
        testAniProps.operationTimer = 3;
        expect(aniObj.arrive(testAniProps, 4)).toBe(4);
    })
}

describe('carousel aniScrollX test', () => {
    basicTestList(aniScrollX);
});
describe('carousel aniInfinate test', () => {
    basicTestList(aniInfinate);
});
describe('carousel aniLoopInfinate test', () => {
    basicTestList(aniLoopInfinate);
});
describe('carousel aniCss test', () => {
    basicTestList(aniCss);
});

