/**
 * @component Touchable
 * @version 3.0.0
 * @description `Touchable` 组件是一个"虚拟"组件，它不会真的在文档中创建一个 `dom` 节点作为根节点，而是返回它唯一的子组件的一个克隆，并给它绑定一些手势事件。
 * 除了能给 `dom` 绑定 `tap` 事件之外，它还解决了一些移动端的手势"顽疾"，例如触摸反馈和滚动/触摸的冲突问题。在需要绑定 `tap` 事件的情况下，应该优先使用 `Touchable`，
 * 而不是直接把 `tap` 事件回调绑定给 `dom`。
 *
 * @author jiao.shen
 * @instructions {instruInfo: ./touchable.md}{instruUrl: touchable.html?hideIcon}
 */
import React, { Component, PropTypes } from 'react';
import gesture from './gesture';

export default class Touchable extends Component {

    static propTypes = {
        /**
         * @property touchClass
         * @type String
         * @default null
         * @description 触摸Touchable时附加的className，可以用来实现Native常见的触摸反馈功能(例如给触摸区域添加深色背景或者改变透明度等等)。
         */
        touchClass: PropTypes.string,
        /**
         * @property onTap
         * @type Function
         * @default null
         * @param {DOMElement} target tap事件的target
         * @description 给Touchable绑定的onTap事件。
         */
        onTap: PropTypes.func,
        /**
         * @skip 给List定制的属性
         */
        onTouchStart: PropTypes.func,
        /**
         * @skip 内部使用标志
         */
        internalUse: PropTypes.bool,
        children: PropTypes.object
    };

    static defaultProps = {
        onTouchStart: () => {
        },
        touchClass: null,
        onTap: () => {
        },
        internalUse: false
    };

    static contextTypes = {
        scroller: PropTypes.object,
        swipeMenuList: PropTypes.object
    };

    render() {
        if (process.env.NODE_ENV !== 'production') {
            if (this.props.touchClass == null && !this.props.internalUse) {
                console.error('yo-touchable: Touchable组件没有设置touchClass, 出于用户体验考虑, 应该尽量给触摸区域添加触摸反馈。');
            }
        }

        const onlyChild = React.Children.only(this.props.children);
        const gestureObj = gesture(
            this,
            this.context.scroller,
            this.context.swipeMenuList,
            this.props.touchClass,
            this.props.onTap,
            this.props.onTouchStart
        );
        const { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel } = gestureObj;

        return React.cloneElement(onlyChild, { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel });
    }
}
