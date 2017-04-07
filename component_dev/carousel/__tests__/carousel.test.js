import Carousel from '../src/carousel.js';
import testForCase from './testForCase.js';
import { mount } from 'enzyme';
import testAni, { Demo } from './testAni.js';

const defaultProperty = {
    dots: true,
    autoplay: true,
    loop: true,
    delay: 1.5,
    speed: 0.5,
    defaultPage: 1,
    aniSpeed: 0
};
const spyCb = {
     afterChange(){},
     beforeChange(){}
};
const spyObj = {}

// 不处理重名自己考虑
function spyAllFuncOfObj(obj){
    Object.keys(obj).forEach(item => {
        spyObj[item] = jest.spyOn(obj, item); 
    })
}
spyAllFuncOfObj(spyCb);
spyAllFuncOfObj(testAni);

const wrapper = mount(testForCase({aniObj: testAni}));

// const wrapper = mount(testForCase({}));
describe('defaultProperty is stable', () => {
    Object.keys(defaultProperty).map(item => {
        test(item, () => {
            expect(wrapper.find(Carousel).props()[item]).toBe(defaultProperty[item]); 
        });
    });
});

describe("aniObj's functino has been called", () => {
    test('invoke prev', () => {
        const pageNow = wrapper.state().pageNow; 
        wrapper.ref('prev').simulate('click');
        expect(spyObj.prev).toHaveBeenCalled();
        expect(wrapper.state().pageNow).toBe(pageNow - 1);
    });
    test('invoke next', () => {
        const pageNow = wrapper.state().pageNow; 
        wrapper.ref('next').simulate('click');
        expect(spyObj.next).toHaveBeenCalled();
        expect(wrapper.state().pageNow).toBe( pageNow + 1);
    });

    test('invoke arrive', () => {
        wrapper.ref('arrive3').simulate('click');
        expect(spyObj.arrive).toHaveBeenCalled();
        expect(wrapper.state().pageNow).toBe(3);
    });

    test('invoke touchstart', () => {
        const dom = wrapper.find('.cont');
        const mockTouch = createTouchE('touchstart', 100, 100, 100, 100, 100, 100);
        wrapper.find('.cont').simulate('touchstart', mockTouch);
        expect(spyObj.touchstart).toHaveBeenCalled();
    });
    
    test('invoke touchmove', () => {
        const dom = wrapper.find('.cont');
        const mockTouch = createTouchE('touchmove', 100, 100, 100, 100, 100, 100);
        wrapper.find('.cont').simulate('touchmove', mockTouch);
        expect(spyObj.touchmove).toHaveBeenCalled();
    });

    test('invoke touchend', () => {
        const dom = wrapper.find('.cont');
        const mockTouch = createTouchE('touchend', 200, 200, 200, 200, 200, 200);
        wrapper.find('.cont').simulate('touchend', mockTouch);
        expect(spyObj.touchend).toHaveBeenCalled();
    });
});

describe('page change callback has been invoke', () => {
    const wrapper2 = mount(testForCase(Object.assign(spyCb, {aniObj: testAni})));
    wrapper2.ref('next').simulate('click');
    test('beforeChange', () => {
        expect(spyObj.beforeChange).toHaveBeenCalled();
    });
    wrapper2.ref('prev').simulate('click');
    test('afterChange', () => {
        expect(spyObj.afterChange).toHaveBeenCalled();
    });
})

test('defaultPage work well', () => {
    const wrapper3 = mount(testForCase({defaultPage: 2}));
    expect(wrapper3.state().pageNow).toBe(2);
})


function createTouchE(name, screenX, screenY, pageX, pageY, clientX, clientY){
    const touchEvent = document.createEvent('UIEvent');
    touchEvent.initEvent(name, true, true);
    touchEvent.touches = touchEvent.changedTouches = [{ screenX, screenY, pageX, pageY, clientX, clientY }];
    return touchEvent;
}