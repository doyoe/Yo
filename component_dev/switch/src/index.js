/**
 * @component Switch
 * @version 3.0.0
 * @description 开关组件，在checkbox基础上封装，具有打开关闭以及过程动画、
 *
 * - 支持设置禁用
 * - 可配合样式扩展自定义样式，对颜色的修改请传入activeColor&defaultColor
 *
 * @author eva.li
 * @instructions {instruInfo: ./switch.md}{instruUrl: switch.html?hideIcon}
 */

import './style.scss';
import React, { Component, PropTypes } from 'react';
const ALLOWANCE = 4;
const propTypes = {
  /**
   * @property disabled
   * @type Bool
   * @default false
   * @description 是否禁用switch组件
   * 禁用switch后，UI操作不会影响到switch Value的变化
   */
    disabled: PropTypes.bool,
    /**
     * @property checkd
     * @type Bool
     * @default true
     * @description 当前switch组件的值
     */
    checked: PropTypes.bool,
    /**
     * @property extraClass
     * @type String
     * @description 额外添加到根节点上的className
     */
    extraClass: PropTypes.string,
    /**
     * @property onChange
     * @type Function
     * @description value值发生变化的时候触发
     */
    onChange: PropTypes.func,
    /**
     * @property activeColor
     * @type String
     * @default '#4bd763'
     * @description activeColor 响应颜色
     * 当组件处于拖动状态时而非结果状态时需要JS辅助设置背景色
     * 当用户扩展switch样式改变颜色时需要传入
     */
    activeColor: PropTypes.string,
    /**
     * @property defaultColor
     * @type String
     * @default '#fafafa'
     * @description defaultColor 关闭时的颜色
     * 当组件处于拖动状态时而非结果状态时需要JS辅助设置背景色
     * 当用户扩展switch样式改变颜色时需要传入
     */
    defaultColor: PropTypes.string
};

const defaultProps = {
    disabled: false,
    checked: true,
    activeColor: '#4bd763',
    defaultColor: '#ccc'
};

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoving: false
        };
        this.touchstart = this.touchstart.bind(this);
        this.touchmove = this.touchmove.bind(this);
        this.touchend = this.touchend.bind(this);
        this.touchcancel = this.touchcancel.bind(this);
    }

    componentDidMount() {
        this.handleDOM =
            this.handleDOM
                ? ''
                : this.widgetDOM.querySelector('.handle');
        this.trackDOM =
            !this.handleDOM
                ? ''
                : this.widgetDOM.querySelector('.track');
        const line = this.handleDOM.clientWidth;
        this.maxline = this.trackDOM.clientWidth - line * 1.2 - 2;
    }

    touchstart(e) {
        e.preventDefault();
        e.stopPropagation();
        this.touchLocateStart = e.touches[0].clientX;
        const translateX = this.props.checked
            ? this.maxline
            : 0;
        this._setCSS(translateX);
        this.setState({
            isMoving: true
        });
    }
    touchmove(e) {
        e.preventDefault();
        e.stopPropagation();
        const basic = this.props.checked ? this.maxline : 0;
        let translateX = e.touches[0].clientX - this.touchLocateStart + basic;
        if (Math.abs(translateX - basic) > ALLOWANCE) {
            translateX = translateX < this.maxline / 2 ? 0 : this.maxline;
            this._setCSS(translateX);
            this.touchmoved = true;
        }
    }
    touchend(e) {
        e.preventDefault();
        e.stopPropagation();
        const prevresult = this.props.checked;
        let result;
        if (this.touchmoved) {
            // 响应滑动事件
            const translateX = e.changedTouches[0].clientX - this.touchLocateStart + this.maxline;
            if (translateX < this.maxline / 2) {
                result = false;
            } else {
                result = true;
            }
        } else {
            // 响应tap事件
            result = !prevresult;
        }
        if (result !== prevresult) {
            this.props.onChange(result);
        }
        this.setState({
            isMoving: false
        });
        this._setCSS();
        this.touchmoved = false;
    }

    touchcancel(e) {
        e.preventDefault();
        e.stopPropagation();
        this._setCSS();
        this.touchmoved = false;
        this.setState({
            isMoving: false
        });
    }

    _setCSS(translateX) {
        if (translateX != null) {
            this.handleDOM.style.transform = `translateX(${Math.round(translateX)}px) translateZ(0)`;
            this.handleDOM.style.webkitTransform = `translateX(${Math.round(translateX)}px) translateZ(0)`;
            // debugger
            this.trackDOM.style.backgroundColor =
                translateX === 0
                    ? this.props.defaultColor
                    : this.props.activeColor;
        } else {
            this.handleDOM.style.transform = '';
            this.handleDOM.style.webkitTransform = '';
            this.trackDOM.style.backgroundColor = '';
        }
    }

    render() {
        const classlist = ['yo-switch'];
        if (this.props.extraClass) classlist.push(this.props.extraClass.split(' '));
        return (
            <label
                className={classlist.join(' ')}
                ref={(node) => {
                    if (node) {
                        this.widgetDOM = node;
                    }
                }}
                onTouchStart={
                    this.props.disabled
                        ? null
                        : this.touchstart
                }
                onTouchEnd={
                    this.props.disabled
                        ? null
                        : this.touchend
                }
                onTouchMove={
                    this.props.disabled
                        ? null
                        : this.touchmove
                }
                onTouchCancel={
                    this.props.disabled
                        ? null
                        : this.touchcancel
                }
            >
                <input
                    type="checkbox"
                    disabled={this.props.disabled}
                    checked={this.props.checked}
                    onChange={() => {
                    }}
                />
                <div
                    className={this.state.isMoving ? 'track moving' : 'track'}
                >
                    <span className="handle" />
                </div>
            </label>
        );
    }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
