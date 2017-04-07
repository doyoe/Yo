import React from 'react';
import { mount, render } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RatingExample from './rating.test.example';
import Rating from '../src/rating';

injectTapEventPlugin();

const defaultProps = {
    extraClass: '',
    total: 5,
    value: 0,
    readonly: false
};

const checkProps = (wrapper, props) => {
    for (var _prop in props) {
        expect(wrapper.prop(_prop)).toBe(props[_prop]);
    }

    checkRender(wrapper, props.total, props.value);
};

const checkRender = (wrapper, total, value) => {
    expect(wrapper.find('li').length).toBe(total);

    const _fullNum = Math.floor(value);
    for (var i = 0; i < _fullNum; i++) {
        expect(wrapper.find('span').at(i).html().match(/width\s*\:\s*(\d+)\%/)[1]).toBe("100");
    }

    if (_fullNum < value) {
        const width = parseInt((value - _fullNum) * 100) + '';
        expect(wrapper.find('span').at(_fullNum).html().match(/width\s*\:\s*(\d+)\%/)[1]).toBe(width);
    }
};

const wrapper = mount(<Rating />);
const exampleWrapper = mount(<RatingExample />);

test('Rating: Default Props', () => {
    checkProps(wrapper, defaultProps);
});

test('Rating: Set Value', () => {
    wrapper.setProps({ value: 0.77 });
    checkProps(wrapper, Object.assign({}, defaultProps, { value: 0.77 }));

    wrapper.setProps({ value: 4.4 });
    checkProps(wrapper, Object.assign({}, defaultProps, { value: 4.4 }));

    wrapper.setProps({ value: 5 });
    checkProps(wrapper, Object.assign({}, defaultProps, { value: 5 }));
});

test('Rating: Set Total', () => {
    wrapper.setProps({ value: 0.77, total: 1 });
    checkProps(wrapper, Object.assign({}, defaultProps, { value: 0.77, total: 1 }));

    wrapper.setProps({ value: 3, total: 3 });
    checkProps(wrapper, Object.assign({}, defaultProps, { value: 3, total: 3 }));

    wrapper.setProps({ value: 4.88, total: 8 });
    checkProps(wrapper, Object.assign({}, defaultProps, { value: 4.88, total: 8 }));
});

// test('Rating: Tap', () => {
//     return new Promise((resolve, reject) => {
//         exampleWrapper.setProps({ disabled: false });
//         exampleWrapper.find('li').at(3).simulate('touchstart');
//         setTimeout(() => {
//             exampleWrapper.find('li').at(3).simulate('touchend');
//             exampleWrapper.update();
//             resolve();
//         }, 100);
//     }).then(() => {
//         expect(exampleWrapper.state('value')).toBe(2);
//     });
// });

// test('Rating: Disabled', () => {
//     const currentValue = exampleWrapper.state('value');

//     return new Promise((resolve, reject) => {
//         exampleWrapper.setProps({ disabled: true });
//         exampleWrapper.find('li').at(1).simulate('touchstart');
//         setTimeout(() => {
//             exampleWrapper.find('li').at(1).simulate('touchend');
//             exampleWrapper.update();
//             resolve();
//         }, 100);
//     }).then(() => {
//         expect(exampleWrapper.state('value')).toBe(currentValue);
//     });
// });

