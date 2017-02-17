/**
 * @component Dialog
 * @version 3.0.0
 * @description 对话弹框组件，可自定义显示位置的对话弹框，基于Modal组件实现。
 *
 * - 可自定义组件弹层内容的大小、显示位置。
 * - 可自定义组件背景阴影遮罩层的上偏移、下偏移。
 * - 弹层显隐的动画可使用自定义的css3动画或modal组件默认的fade动画。
 *
 * @instructions {instruInfo: ./dialog.md}{instruUrl: dialog.html?hideIcon}
 * @author qingguo.xu
 */
import React, { Component, PropTypes } from 'react';
import Modal from '../../modal/src';
import Touchable from '../../touchable/src';
import classNames from 'classnames';
import './style.scss';

const defaultProps = {
    show: false,
    animation: 'fade',
    title: '',
    content: '',
    width: 'auto',
    height: 'auto',
    align: 'center',
    contentOffset: [0, 0],
    maskOffset: [0, 0],
    extraClass: '',
    okText: '确定',
    cancelText: '取消',
    onOk() {
    },
    onCancel() {
    }
};

const propTypes = {
    /**
     * @property show
     * @description 组件是否显示
     * @type Bool
     * @default false
     */
    show: PropTypes.bool,
    /**
     * @property effect
     * @description 组件显隐时采用的动画
     *
     * ```
     * PropTypes.oneOfType([
     * PropTypes.string,
     * PropTypes.shape({
     *       animation: PropTypes.arrayOf(PropTypes.string).isRequired,
     *        duration: PropTypes.number.isRequired
     *    })
     * ])
     * ```
     * @type String/Object
     * @default 'none'
     */
    animation: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            animation: PropTypes.arrayOf(PropTypes.string).isRequired,
            duration: PropTypes.number.isRequired
        })
    ]),
    /**
     * @property title
     * @description 组件显示的标题
     * @type Element/String
     */
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * @property width
     * @description 组件显示的内容宽度
     * @type Number/String
     * @default 'auto'
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * @property height
     * @description 组件显示的内容高度
     * @type Number/String
     * @default 'auto'
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * @property align
     * @description 组件显示内容的垂直方向位置
     * @type Enum {'top', 'bottom', 'center'}
     * @default "center"
     */
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    /**
     * @property contentOffset
     * @description 组件显示内容的X轴、Y轴偏移量
     * @type Array<Number>
     * @default [0, 0]
     */
    contentOffset: PropTypes.arrayOf(PropTypes.number),
    /**
     * @property maskOffset
     * @description 组件遮罩层的顶部、底部偏移量
     * @type Array<Number>
     * @default [0, 0]
     */
    maskOffset: PropTypes.arrayOf(PropTypes.number),
    /**
     * @property extraClass
     * @description 组件额外样式类
     * @type String
     */
    extraClass: PropTypes.string,
    /**
     * @property okText
     * @description 组件确定按钮的内容
     * @type String
     * @default '确定'
     */
    okText: PropTypes.string,
    /**
     * @property cancelText
     * @description 组件取消按钮的内容
     * @type String
     * @default '取消'
     */
    cancelText: PropTypes.string,
    /**
     * @property onOk
     * @description 组件确定按钮的回调函数，`false`表示不显示确定按钮
     * @type Bool/Function
     * @default () => {}
     */
    onOk: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    /**
     * @property onCancel
     * @description 组件取消按钮的回调函数，`false`表示不显示取消按钮
     * @type Bool/Function
     * @default () => {}
     */
    onCancel: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
};

export default class Dialog extends Component {
    render() {
        const {
            show, title, animation, width, height, align, contentOffset,
            maskOffset, extraClass, okText, cancelText, onOk, onCancel, children
        } = this.props;
        const cancelBtnNode = onCancel ?
            <Touchable onTap={onCancel} touchClass="yo-btn-touch">
                <button
                    className="yo-btn yo-btn-dialog yo-btn-l"
                >
                    {cancelText}
                </button>
            </Touchable>
            : null;
        const okBtnNode = onOk ?
            <Touchable onTap={onOk} touchClass="yo-btn-touch">
                <button
                    className="yo-btn yo-btn-dialog yo-btn-l"
                >
                    {okText}
                </button>
            </Touchable>
            : null;
        return (
            <Modal
                align={align}
                show={show}
                width={width}
                height={height}
                animation={animation || ''}
                contentOffset={contentOffset}
                maskOffset={maskOffset}
                onMaskTap={() => {
                }}
            >
                <div className={classNames('yo-dialog', extraClass)}>
                    <header className="hd">
                        <h2 className="title">{title}</h2>
                    </header>
                    <div className="bd">{children}</div>
                    <footer className="ft">
                        {cancelBtnNode}
                        {okBtnNode}
                    </footer>
                </div>
            </Modal>
        );
    }
}

Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;
