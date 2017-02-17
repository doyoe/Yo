/**
 * @component PopupPicker
 * @version 3.0.5
 * @description 由`Popup`和`Picker`组件结合的组件，能够方便的创建一个可弹出的Picker。
 *
 * @instructions {instruInfo: ./popuppicker.md}{instruUrl: popuppicker.html?hideIcon}
 * @author tianqi.tian
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Touchable from '../../touchable/src';
import Popup from '../../popup/src';
import Picker from '../../picker/src';
import './style.scss';

const propTypes = {
    /**
     * @property touchClass
     * @type String
     * @default null
     * @description 定制触发区域和弹出式选择器触摸时附加的 className，必须
     */
    touchClass: PropTypes.string.isRequired,
    /**
     * @property value
     * @type Number/String
     * @default null
     * @description 组件的value，参考网页`select`标签的 value 属性。
     *
     * value 是一个严格受控属性，只能通过的父组件改变，你需要设置 onChange 属性来控制 value 属性的变化。
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * @property onChange
     * @type Function
     * @param value 当前的 option 的 value
     * @description 弹出式选择器 Ok 按钮点击后的回调，必须。
     */
    onChange: PropTypes.func.isRequired,
    /**
     * @property options
     * @type Array
     * @default null
     * @description `Picker`组件的 options 属性。数组形式，元素的格式为`{text:string,value:string}`，
     *
     * text 为 option 显示的文本，value 为 option 对应的真实值（参考网页 option 标签），
     *
     * text 的缺省值为 value，value 必须传入，且只能为字符串/数字类型
     */
    options: PropTypes.arrayOf(
        PropTypes.shape(
            {
                text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
            }
        )
    ).isRequired,
    /**
     * @property popupHeader
     * @type Object
     * @default {
     *   title: '',
     *   okBtn: { text: '确定', touchClass: 'action-touch' },
     *   cancelBtn: { text: '取消', touchClass: 'action-touch' }
     * }
     * @description popup 区域头部的标题和按钮定制，分别为 title、okBtn 和 cancelBtn，
     *
     * 通过 title 键值定制 Popup 组件头部的标题文本。
     *
     * 通过 text 和 touchClass 键值定制按钮显示的文本和触摸按钮时附加的 className
     */
    popupHeader: PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        okBtn: PropTypes.shape({
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            touchClass: PropTypes.string
        }),
        cancelBtn: PropTypes.shape({
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
            touchClass: PropTypes.string
        })
    }),
    /**
     * @property duration
     * @type Number
     * @default 200ms
     * @description `Popup`组件的 duration 属性。组件内容显隐时，动画执行时间，单位：ms
     */
    duration: PropTypes.number,
    /**
     * @property pickerHeight
     * @type Number
     * @default 150
     * @description `Picker`组件的 height 属性。控制 Picker 组件显示的内容高度
     */
    pickerHeight: PropTypes.number.isRequired,
    /**
     * @property looped
     * @type Bool
     * @default true
     * @description `Picker`组件的 looped 属性。是否采用循环模式，默认为 true
     */
    looped: PropTypes.bool,
    /**
     * @property unit
     * @type Number
     * @default null
     * @description `Picker`组件的 unit 属性。显示在 picker 右侧的单位。
     */
    unit: PropTypes.string,
    /**
     * @property popupExtraClass
     * @type String
     * @default null
     * @description 附加 popup 区域根节点的额外 class
     */
    popupExtraClass: PropTypes.string,
    children: PropTypes.element
};

const defaultProps = {
    touchClass: '',
    value: null,
    options: null,
    popupHeader: {
        title: '',
        okBtn: { text: '确定', touchClass: 'action-touch' },
        cancelBtn: { text: '取消', touchClass: 'action-touch' }
    },
    onChange: () => {
    },
    pickerHeight: 150,
    duration: 200,
    looped: true,
    unit: null,
    fieldExtraClass: null,
    popupExtraClass: null
};

// picker默认选择第一项
function defaultPickerValue(options) {
    if (Array.isArray(options) && options.length > 0) {
        return (options[0].value);
    }
    return { value: null };
}

class PopupPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            pickerValue: null
        };
    }

    componentWillMount() {
        const { value, options } = this.props;
        if (value === null || value === undefined) {
            this.setState({
                pickerValue: defaultPickerValue(options)
            });
        } else {
            this.setState({
                pickerValue: value
            });
        }
    }

    componentDidMount() {
        this.updatePicker();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value != null && nextProps.value !== this.state.pickerValue) {
            this.setState({
                pickerValue: nextProps.value
            });
        }
    }

    componentDidUpdate() {
        this.updatePicker();
    }

    componentWillUnmount() {
        document.body.removeChild(this.wrapper);
    }

    createWrapper() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'this-element-is-a-tricky-hack-for-popuppicker-please-just-ignore-it';
        document.body.appendChild(this.wrapper);
    }

    updatePicker() {
        if (this.wrapper == null) {
            this.createWrapper();
        }
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.renderPicker(), this.wrapper);
    }

    show() {
        this.setState({ show: true });
    }

    hide() {
        this.setState({ show: false });
    }

    handlePopupOk() {
        const { onChange } = this.props;
        return () => {
            this.hide();
            onChange(this.state.pickerValue);
        };
    }

    handlePopupCancel() {
        const { value, options } = this.props;
        this.hide();
        if (value === null || value === undefined) {
            this.setState({
                pickerValue: defaultPickerValue(options)
            });
        } else {
            this.setState({
                pickerValue: value
            });
        }
    }

    handlePickerChange(option) {
        this.setState({
            pickerValue: option.value
        });
    }

    renderPicker() {
        const {
            options,
            popupHeader,
            duration,
            pickerHeight,
            looped,
            unit,
            popupExtraClass
        } = this.props;
        let okBtn = null;
        let cancelBtn = null;
        let title = null;
        if (popupHeader) {
            title = popupHeader.title || defaultProps.popupHeader.title;
            okBtn = popupHeader.okBtn || defaultProps.popupHeader.okBtn;
            cancelBtn = popupHeader.cancelBtn || defaultProps.popupHeader.cancelBtn;
        }

        return (
            <Popup
                show={this.state.show}
                duration={duration}
                extraClass={popupExtraClass}
                onMaskTap={this.handlePopupCancel.bind(this)}
            >
                <div className="yo-popup yo-popup-picker">
                    <header className="yo-header yo-header-popup-picker">
                        <span className="title">{title}</span>
                        <Touchable
                            onTap={this.handlePopupCancel.bind(this)}
                            touchClass={cancelBtn.touchClass || defaultProps.popupHeader.cancelBtn.touchClass}
                        >
                            <span className="regret">{cancelBtn.text || defaultProps.popupHeader.cancelBtn.text}</span>
                        </Touchable>
                        <Touchable
                            onTap={this.handlePopupOk()}
                            touchClass={okBtn.touchClass || defaultProps.popupHeader.okBtn.touchClass}
                        >
                            <div className="affirm">{okBtn.text || defaultProps.popupHeader.okBtn.text}</div>
                        </Touchable>
                    </header>
                    <div className="bd">
                        <Picker
                            options={options}
                            value={this.state.pickerValue}
                            onChange={this.handlePickerChange.bind(this)}
                            height={pickerHeight}
                            looped={looped}
                            unit={unit}
                        />
                    </div>
                </div>
            </Popup>
        );
    }

    render() {
        const {
            touchClass
        } = this.props;
        return (
            <Touchable
                onTap={this.show.bind(this)}
                touchClass={touchClass}
            >
                {this.props.children}
            </Touchable>
        );
    }
}

PopupPicker.propTypes = propTypes;
PopupPicker.defaultProps = defaultProps;

export default PopupPicker;