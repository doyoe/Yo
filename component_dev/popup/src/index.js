/**
 * @component Popup
 * @version 3.0.0
 * @description 弹出组件，支持上、下两个方向的弹出组件，基于Modal组件实现。
 *
 * - 可设置组件内容弹出的方向，高度和效果执行时间。
 * - 可设置组件背景遮罩层的上、下偏移量。
 *
 * @instructions {instruInfo: ./popup.md}{instruUrl: popup.html?hideIcon}
 * @author qingguo.xu
 */

import Modal from '../../modal/src';
import React, { Component, PropTypes } from 'react';
import './style.scss';

const noop = () => {
};

const propTypes = {
    /**
     * @property show
     * @type Bool
     * @description 组件是否显示
     * @default false
     */
    show: PropTypes.bool,
    /**
     * @property duration
     * @type Number
     * @description 组件内容显隐时，动画执行时间，单位：ms
     * @default 200ms
     */
    duration: PropTypes.number,
    /**
     * @property height
     * @type String/Number
     * @description 组件显示的内容高度
     * @default 'auto'
     */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * @property direction
     * @type Enum {'up', 'down'}
     * @description 组件动画打开方向
     * @default 'up'
     */
    direction: PropTypes.oneOf(['up', 'down']),
    /**
     * @method onMaskTap
     * @type Function
     * @description 组件背景遮罩层的点击回调
     * @default () => {}
     */
    onMaskTap: PropTypes.func,
    /**
     * @method onShow
     * @type Function
     * @description 组件打开时，动画触发之前的事件回调
     * @default () => {}
     */
    onShow: PropTypes.func,
    /**
     * @method onHide
     * @type Function
     * @description 组件关闭时，动画触发之前的事件回调
     * @default () => {}
     */
    onHide: PropTypes.func,
    /**
     * @property maskOffset
     * @type Array<Number>
     * @description 组件背景遮罩层的上、下偏移量
     * @default [0, 0]
     */
    maskOffset: PropTypes.arrayOf(PropTypes.number),
    /**
     * @property extraClass
     * @type String
     * @description 组件额外样式类
     */
    extraClass: PropTypes.string,
    delayBeforeAnimationStart: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const defaultPros = {
    duration: 200,
    height: 'auto',
    direction: 'up',
    onMaskTap: noop,
    onShow: noop,
    onHide: noop
};

export default class Popup extends Component {
    render() {
        const {
            show,
            duration,
            height,
            direction,
            onMaskTap,
            onShow,
            onHide,
            maskOffset,
            extraClass,
            children,
            delayBeforeAnimationStart
        } = this.props;
        const animation = direction === 'up' ?
            ['fade-in-up', 'fade-out-down'] : ['fade-in-down', 'fade-out-up'];
        const align = direction === 'up' ? 'bottom' : 'top';
        return (
            <Modal
                show={show}
                height={height}
                width={'100%'}
                direction={direction}
                onMaskTap={onMaskTap}
                onShow={onShow}
                onHide={onHide}
                align={align}
                animation={{ animation, duration }}
                maskOffset={maskOffset}
                contentExtraClass={extraClass}
                delayBeforeAnimationStart={delayBeforeAnimationStart}
            >
                {children}
            </Modal>
        );
    }
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultPros;