/**
 * @component SwipeMenu
 * @version 3.0.0
 * @description 滑动菜单组件。
 *
 * - 支持向右或向左单向滑动，显示菜单按钮。
 * - 默认拖动距离超过菜单按钮的一半时，组件自动打开，否则组件回到关闭状态。
 * - 组件拖动条可拖离足够远位置。
 * - 组件处于开启状态时，下次拖动不作响应，且组件会自动关闭，可通过轻点方式来关闭组件。
 *
 * @instructions {instruInfo: ./swipeMenu.md}{instruUrl: swipemenu.html?hideIcon}
 * @author qingguo.xu
 */
import Drag, { setTransform } from './drag.js';
import React, { Component, PropTypes, isValidElement } from 'react';
import classNames from 'classnames';

const defaultProps = {
    action: [],
    direction: 'left',
    extraClass: '',
    disable: false,
    onTouchStart() {
    },
    onTouchMove() {
    },
    onTouchEnd() {
    },
    onOpen() {
    },
    onClose() {
    }
};

const propTypes = {
    /**
     * @property action
     * @description 组件打开状态显示菜单内容，额外类名，回调函数
     *
     * ```
     * PropTypes.arrayOf(
     *     PropTypes.shape({
     *         text: PropTypes.string.isRequired,
     *         className: PropTypes.string,
     *         onTap: PropTypes.func.isRequired
     *     })
     * )
     * ```
     * @type Array
     * @default []
     */
    action: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            className: PropTypes.string,
            onTap: PropTypes.func.isRequired
        })
    ),
    /**
     * @property open
     * @description 默认组件是否打开
     * @type Bool
     * @default false
     */
    open: PropTypes.bool,
    /**
     * @property direction
     * @description 组件可以拖动的方向
     * @type Enum {'left', 'right'}
     * @default left
     */
    direction: PropTypes.oneOf(['left', 'right']),
    /**
     * @property extraClass
     * @description 组件的额外样式类
     * @type String
     */
    extraClass: PropTypes.string,
    /**
     * @property disable
     * @description 组件是否不可用
     * @type Bool
     * @default false
     */
    disable: PropTypes.bool,
    /**
     * @method onTouchStart
     * @description touchStart时期触发的回调
     * @type Function
     * @default () => {}
     */
    onTouchStart: PropTypes.func,
    /**
     * @method onTouchMove
     * @description touchMove时期触发的回调
     * @type Function
     * @default () => {}
     */
    onTouchMove: PropTypes.func,
    /**
     * @method onTouchEnd
     * @description touchEnd时期触发的回调
     * @type Function
     * @default () => {}
     */
    onTouchEnd: PropTypes.func,
    /**
     * @method onOpen
     * @description 组件打开时期触发的回调
     * @type Function
     * @default () => {}
     */
    onOpen: PropTypes.func,
    /**
     * @method onClose
     * @description 组件关闭时期触发的回调
     * @type Function
     * @default () => {}
     */
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number])
};

export default class SwipeMenu extends Component {
    constructor(props) {
        super(props);
        this.drag = null;

        // 标志， 组件是否在返回， 处理不能同时返回又向外拖的情况
        this.isBack = false;
        this.actBtn = null;

        // action菜单按钮的宽度
        this.actBtnWidth = 0;
        this.startX = 0;
        this.timer = null;
    }

    componentDidMount() {
        const { open, direction } = this.props;
        this.actBtnWidth = this.actBtn.offsetWidth;
        this.dragEvt = new Drag({ node: this.drag, aniClass: 'transition' });
        this.reset(open, direction);
    }

    componentWillReceiveProps(nextProps) {
        this.reset(nextProps.open, this.props.direction);
    }

    /**
     * 获取拖动的距离， 作为common/drag.js 中dragMove的Middleware
     * 主要处理超过最大值时缓慢拖动效果
     * @param distanceX {Number} 实际拖动距离， 由drag.js传入
     * @returns {*} 组件translate距离
     */
    getMoveDistance(distanceX) {
        if (this.props.direction === 'right' && distanceX > 0) {
            if (distanceX > this.actBtnWidth * 1.5) {
                return this.actBtnWidth + 0.35 * distanceX;
            }
            return distanceX;
        }
        if (this.props.direction === 'left' && distanceX < 0) {
            if (Math.abs(distanceX) > this.actBtnWidth * 1.5) {
                return -this.actBtnWidth + 0.35 * distanceX;
            }
            return distanceX;
        }
        return 0;
    }

    /**
     * 组件最终拖动的距离， 由此决定组件最终状态
     * 作为common/drag.js里的dragEnd的middleware
     * @param distanceX dragEnd中实际拖动的距离
     * @returns {*} 组件最后的translate距离
     */
    getEndDistance(distanceX) {
        const dir = this.props.direction;
        const max = this.actBtnWidth;
        if ((dir === 'left' && distanceX > 0) || (dir === 'right' && distanceX < 0)) {
            this.props.onClose();
            return 0;
        }
        const full = dir === 'left' ? -max : max;
        if (Math.abs(distanceX) > max / 2) {
            this.isBack = true;
            this.props.onOpen();
            return full;
        }
        this.props.onClose();
        return 0;
    }

    /**
     * reset 根据open的参数，确定组件关闭
     * @param open {boolean} 是否开启
     * @param direction {string} 组件拖动的方向
     */
    reset(open, direction) {
        let resetX = 0;
        // 为传open， 不需要执行
        if (open === undefined) {
            return;
        }
        if (open) {
            resetX = direction === 'right' ? this.actBtnWidth : -this.actBtnWidth;
        }
        if (this.dragEvt) this.dragEvt.setMove(resetX);
        this.isBack = !!resetX;
        setTransform({ node: this.drag, distanceX: resetX });
    }

    /**
     * 组件的状态转换过程， 是否清楚过渡动画， 完毕之后再加上
     * @param toStatus {Boolean} 目的状态是否是打开状态， true => open
     * @param isClearTransition {Boolean} 是否清楚组件动画
     */
    toggle(toStatus, isClearTransition) {
        if (!isClearTransition) {
            this.reset(toStatus, this.props.direction);
            return;
        }
        if (this.drag) this.drag.className = 'front ';
        this.reset(toStatus, this.props.direction);
        this.timer = setTimeout(() => {
            if (this.drag) this.drag.className = 'front transition';
        }, 300);
    }

    /**
     * @method open
     * @description 打开SwipeMenu，能够接收一个参数，表示是否有过渡动画效果。
     * @param {Boolean} isClearTransition
     */
    open(isClearTransition = false) {
        this.isBack = true;
        this.toggle(true, isClearTransition);
        setTimeout(() => {
            this.props.onOpen();
        }, isClearTransition ? 300 : 0);
    }

    /**
     * @method close
     * @description 关闭SwipeMenu，能够接收一个参数，表示是否有过渡动画效果。
     * @param {Boolean} isClearTransition
     */
    close(isClearTransition = false) {
        this.isBack = false;
        this.toggle(false, isClearTransition);
        // 动画结束时触发onClose
        setTimeout(() => {
            this.props.onClose();
        }, !isClearTransition ? 300 : 0);
    }

    render() {
        const { action, extraClass, disable, direction, onTouchStart, onTouchMove, onTouchEnd } = this.props;
        const actionClass = direction === 'left' ? '' : 'action-start';
        const actionElement = isValidElement(action) ?
            action : action.map((item, i) => {
                item.className = item.className || '';
                return (
                    <span
                        className={classNames('item', item.className)}
                        key={i}
                        onTouchTap={() => item.onTap(this)}
                    >{item.text}</span>
                );
            });
        return (
            <div className={classNames('yo-swipemenu', extraClass)}>
                <div
                    className="front transition"
                    ref={ref => {
                        this.drag = ref;
                    }}
                    onTouchStart={evt => {
                        if (disable) {
                            return;
                        }
                        this.dragEvt.dragStart(evt);
                        if (Math.abs(this.dragEvt.getMove()) > this.actBtnWidth / 2) {
                            this.isBack = true;
                            this.drag.className += 'transition';
                            this.dragEvt.refreshDrag();
                        }
                        onTouchStart();
                    }}
                    onTouchMove={evt => {
                        if (disable || this.isBack) {
                            return;
                        }
                        this.dragEvt.dragMove(evt, this.getMoveDistance.bind(this));
                        onTouchMove();
                    }}
                    onTouchEnd={evt => {
                        if (disable || this.isBack) {
                            this.isBack = false;
                            return;
                        }
                        onTouchEnd();
                        this.dragEvt.dragEnd(evt, this.getEndDistance.bind(this));
                    }}
                    onTouchCancel={evt => this.dragEvt.dragCancel(evt)}
                >
                    {this.props.children}
                </div>
                <div
                    className={classNames('action', actionClass)}
                    ref={ref => {
                        this.actBtn = ref;
                    }}
                >
                    {actionElement}
                </div>
            </div>
        );
    }
}

SwipeMenu.defaultProps = defaultProps;
SwipeMenu.propTypes = propTypes;
