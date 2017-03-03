/**
 * @component Modal
 * @description 带遮罩层的模态弹层组件。支持多种位置和动画效果。
 *
 * @instructions {instruInfo: ./modal.md}{instruUrl: modal.html?hideIcon}
 * @author jiao.shen
 * @version 3.0.2
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './style.scss';
import '../../common/tapEventPluginInit';

const defaultProps = {
    show: false,
    extraClass: '',
    contentExtraClass: '',
    align: 'center',
    onMaskTap: () => {
    },
    contentOffset: [0, 0],
    maskOffset: [0, 0],
    maskExtraClass: '',
    animation: '',
    onShow: () => {
    },
    onHide: () => {
    },
    width: null,
    height: null,
    delayBeforeAnimationStart: 100
};

const propTypes = {
    /**
     * @property show
     * @type Bool
     * @default false
     * @description 是否显示模态框
     */
    show: PropTypes.bool.isRequired,
    /**
     * @property extraClass
     * @type String
     * @default null
     * @description 附加给模态框容器(包含了内容区和蒙层)的额外class
     */
    extraClass: PropTypes.string,
    /**
     * @property contentExtraClass
     * @type String
     * @default null
     * @description 附加给模态框内容区的额外class
     */
    contentExtraClass: PropTypes.string,
    /**
     * @property align
     * @type String
     * @default center
     * @description 模态框的位置,默认为center。可选值为cetner/top/bottom
     */
    align: PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    /**
     * @property onMaskTap
     * @type Function
     * @default ()=>{}
     * @description 点击蒙层时的回调
     */
    onMaskTap: PropTypes.func,
    /**
     * @property contentOffset
     * @type Array
     * @default [0,0]
     * @description 内容区在水平/垂直方向上的偏移,例如[0,-100]可以使模态框内容区向上偏移100个像素
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
    maskOffset: PropTypes.arrayOf(PropTypes.number),
    /**
     * @property onShow
     * @type Function
     * @default ()=>{}
     * @description 打开模态框时，动画触发之前的事件回调
     */
    onShow: PropTypes.func,
    /**
     * @property onHide
     * @type Function
     * @default ()=>{}
     * @description 关闭模态框时，动画触发之前的事件回调
     */
    onHide: PropTypes.func,
    /**
     * @property width
     * @type Number/String
     * @default 'auto'
     * @description 内容区宽度,默认为auto,可以传入数字或者百分比
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * @property height
     * @type Number/String
     * @default 'auto'
     * @description 内容区高度,默认为auto,可以传入数字或者百分比
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * @property animation
     * @type String/Object
     * @default "none"
     * @description 打开/关闭动画
     *
     * 有已经实现好的动画fade,fade-in-down,fade-in-up,zoom,也可以自己传入classNames,实现定制的动画效果,例如
     * {animation:['actionsheet-up', 'actionsheet-down'],duration:200}
     * 数组中的第一个元素是打开模态框时附加到内容区的className,第二个是关闭时附加到内容区的className,duration是动画的持续时间,
     * action-sheet-up的css规则如下:
     *
     * ```css
     * @keyframes actionsheet-up {
     *     0% {
     *         transform: translate3d(0, 100%, 0);
     *     }
     *     100% {
     *         transform: translate3d(0, 0, 0);
     *     }
     * }
     * ```
     *
     */
    animation: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            animation: PropTypes.arrayOf(PropTypes.string).isRequired,
            duration: PropTypes.number
        })
    ]),
    delayBeforeAnimationStart: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string, PropTypes.number])
};

// 默认提供的动画效果
const ANIMATION_MAP = {
    fade: { animation: ['fade-in', 'fade-out'], duration: 200 },
    zoom: { animation: ['zoom-in', 'zoom-out'], duration: 300 },
    'fade-in-up': { animation: ['fade-in-up', 'fade-out-down'], duration: 200 },
    'fade-in-down': { animation: ['fade-in-down', 'fade-out-up'], duration: 200 }
};

export default class RealModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            animation: this.getAnimationClass(props.animation, props.show)
        };
    }

    componentDidMount() {
        if (this.props.show) {
            this.props.onShow();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.toggleShowStatus(nextProps);
    }

    componentWillUnmount() {
        clearTimeout(this.hideTimeout);
        clearTimeout(this.showTimeout);
    }

    /**
     * 根据动画名字和打开/关闭状态获取对应的animation属性配置
     * @param name
     * @param isShow
     * @returns {{name: string, duration: number}}
     */
    getAnimationClass(name, isShow) {
        let contentAnimation = '',
            duration = 0;
        if (name) {
            const targetMap = typeof this.props.animation === 'object' ? this.props.animation : ANIMATION_MAP[name];
            if (targetMap) {
                contentAnimation = [targetMap.animation[isShow ? 0 : 1], 'ani'].join(' ');
                duration = targetMap.duration;
            }
        }
        return { name: contentAnimation, duration };
    }

    /**
     * 根据nextProps中的show属性更新内部state
     * @param nextProps
     */
    toggleShowStatus(nextProps) {
        const current = this.state.show;
        const next = nextProps.show;
        const { onShow, onHide } = this.props;
        // 如果新属性的show是true并且模态框处于打开状态
        if (!next && current) {
            // 提取需要指定的动画
            const animationData = this.getAnimationClass(nextProps.animation, next);
            clearTimeout(this.showTimeout);
            // show动画开始前执行onHide回调
            onHide();
            // 先走关闭动画
            this.setState({ animation: animationData });
            // 等到动画结束后处理整个modal的show状态,并且保存timeout引用
            this.hideTimeout = setTimeout(() => {
                this.setState({ show: false });
            }, animationData.duration);
        } else if (next && !current) {
            // 清理关闭timeout
            // 写这一行的目的是用户可能在关闭的同时打开modal
            clearTimeout(this.hideTimeout);
            this.setState({ show: next });
            this.contentDom.style.visibility = 'hidden';

            // 如果直接运行动画会出现闪烁,这里先将contentDom隐藏然后再运行动画
            this.showTimeout = setTimeout(() => {
                // hide动画开始前执行onShow回调
                onShow();
                this.setState({ animation: this.getAnimationClass(nextProps.animation, next) });
                this.contentDom.style.visibility = 'visible';
            }, this.props.delayBeforeAnimationStart);
        }
    }

    render() {
        const { show, animation } = this.state;
        const { duration, name } = animation;
        const {
            extraClass,
            onMaskTap,
            maskOffset,
            contentOffset,
            align,
            contentExtraClass,
            width,
            height
        } = this.props;
        const containerClass = classNames('yo-modal', extraClass, `yo-modal-${align}`);
        const contentClass = classNames('cont', contentExtraClass, name);

        return (
            <div
                ref="container"
                className={containerClass}
                onTouchTap={(evt) => {
                    if (evt.target === this.refs.container) {
                        onMaskTap(evt);
                    }
                }}
                style={Object.assign(
                    {
                        top: parseInt(maskOffset[0], 10),
                        bottom: parseInt(maskOffset[1], 10),
                        transform: 'translate3d(0,0,0)',
                        WebkitTransform: 'translate3d(0,0,0)'
                    },
                    show ? null : { display: 'none' }
                )}
            >
                <div
                    className={contentClass}
                    ref={component => {
                        this.contentDom = component;
                    }}
                    style={{
                        position: 'relative',
                        top: parseInt(contentOffset[1], 10) || 0,
                        left: parseInt(contentOffset[0], 10) || 0,
                        WebkitAnimationDuration: `${duration}ms`,
                        animationDuration: `${duration}ms`,
                        width,
                        height
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

RealModal.defaultProps = defaultProps;
RealModal.propTypes = propTypes;
