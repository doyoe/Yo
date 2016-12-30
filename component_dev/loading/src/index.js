/**
 * 加载动画api
 * @component loading
 * @type {Object}
 * @version 3.0.0
 * @description Loading API，调用后弹出一个居中的Loading Icon。
 *
 * @instructions {instruInfo: ./loading.md}{instruUrl: loading.html?hideIcon}
 * @author zongze.li
 */
import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import Modal from '../../modal/src/modal';
import Loading from './loading';
import './style.scss';

const container = document.createElement('div');
document.body.appendChild(container);

let that = null;

const loadingApiPropTypes = {
    /**
     * @property text
     * @type String
     * @default ''
     * @description loading伴随动画图标的文字。
     */
    text: PropTypes.string,
    /**
     * @property extraClass
     * @type String
     * @default ''
     * @description 附加给loading组件内层的div的额外class。
     */
    extraClass: PropTypes.string,
    /**
     * @property modalExtraClass
     * @type String
     * @default ''
     * @description 附加给外层modal组件的额外class。
     */
    modalExtraClass: PropTypes.string,
    /**
     * @property show
     * @type Bool
     * @default false
     * @description 是否显示loading，true为显示loading动画，false为隐藏。
     */
    show: PropTypes.bool,
    /**
     * @property contentOffset
     * @type Array
     * @default [0,0]
     * @description 内容区在水平/垂直方向上的偏移,例如[0,-100]可以使模态框内容区向上偏移100个像素。
     */
    contentOffset: PropTypes.arrayOf(PropTypes.number),
    /**
     * @property maskOffset
     * @type Array
     * @default [0,0]
     * @description 蒙层遮盖的范围。如果不需要蒙层遮盖住整个屏幕,可以设置这个属性。
     *
     * 数组的第一个元素代表蒙层上边缘距离屏幕顶部的距离,第二个元素代表下边缘距离底部的距离。
     */
    maskOffset: PropTypes.arrayOf(PropTypes.number)
};

const loadingApiDefaultProps = {
    text: '',
    extraClass: '',
    show: false,
    contentOffset: [0, 0],
    maskOffset: [0, 0]
};

class LoadingApi extends Component {

    constructor(props) {
        super(props);
        this.state = { ...props };
        that = this;
    }

    render() {
        const { text, modalExtraClass, extraClass, ...restProps } = this.state;
        return (
            <Modal
                align="center"
                extraClass={modalExtraClass}
                {...restProps}
            >
                <Loading
                    extraClass={extraClass}
                    text={text}
                />
            </Modal>
        );
    }
}
LoadingApi.propTypes = loadingApiPropTypes;
LoadingApi.defaultProps = loadingApiDefaultProps;

ReactDom.render(<LoadingApi />, container);
export default Loading;
export const loading = {
    /**
     * show展示
     * @method show
     * @category loading
     * @version 3.0.0
     * @param {Object} options 需要设置的组件属性，如预留顶部高度，额外样式之类的，具体见上面的属性文档描述。
     * @description api方法：显示Loding层，并设置传入的options参数中的属性。
     */
    show: (options) => {
        that.setState(Object.assign({}, options, { show: true }));
    },
    /**
     * hide隐藏
     * @method hide
     * @category loading
     * @version 3.0.0
     * @description api方法：隐藏Loding层。
     */
    hide: () => {
        that.setState({ show: false });
    }
};

