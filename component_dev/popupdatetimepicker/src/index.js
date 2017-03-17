/**
 * @component PopupDateTimePicker
 * @version 3.0.5
 * @description 由`Popup`和`DateTimePicker`组件结合的组件，能够方便的创建一个可弹出的 DateTimePicker。
 *
 * @instructions {instruInfo: ./popupDateTimepicker.md}{instruUrl: popupdatetimepicker.html?hideIcon}
 * @author tianqi.tian
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Touchable from '../../touchable/src';
import Popup from '../../popup/src';
import DateTimePicker from '../../datetimepicker/src';
import './style.scss';

const propTypes = {
    /**
     * @property touchClass
     * @type String
     * @default null
     * @description 定制触发区域和弹出式选择器触摸时附加的 className，必须。
     */
    touchClass: PropTypes.string.isRequired,
    /**
     * @property value
     * @type Number/String
     * @default null
     * @description 组件的 value，参考网页`select`标签的 value 属性。
     *
     * value是一个严格受控属性，只能通过的父组件改变，你需要设置 onChange 属性来控制 value 属性的变化。
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * @property range
     * @type array
     * @default null
     * @description 可选日期/时间的范围。格式为['YYYY-MM-DD','YYYY-MM-DD']或者['HH-MM','HH-MM']。
     */
    range: PropTypes.array,
    /**
     * @property onChange
     * @type Function
     * @default () => {}
     * @param value 当前 datetimepicker 的 value
     * @description 弹出式选择器 Ok 按钮点击后的回调，必须。
     */
    onChange: PropTypes.func.isRequired,
    /**
     * @property popupHeader
     * @type Object
     * @default  {
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
     * @description `DateTimePicker`组件的 height 属性。控制`Picker`组件显示的内容高度
     */
    pickerHeight: PropTypes.number.isRequired,
    /**
     * `DateTimePicker`组件的 dateOrTime 属性。日期或者时间模式
     *
     * @property dateOrTime
     * @type Enum {'date', 'time'},
     * @description `DateTimePicker`组件的 dateOrTime 属性。受控属性：'date'代表日期模式，即年月日模式，'time'代表时间模式，即时分模式
     * @default 'date'
     */
    dateOrTime: PropTypes.oneOf(['date', 'time']),
    /**
     * `DateTimePicker`组件的 loop 属性。循环滚动模式
     *
     * @property loop
     * @type Array<Bool>
     * @description `DateTimePicker`组件的 loop 属性。受控属性：设置为 true，为无限循环滚动模式，反之为有限模式；默认为 true
     * @default [true, true, true]
     */
    loop: PropTypes.arrayOf(PropTypes.bool),
    /**
     * `DateTimePicker`组件的 unitsInline 属性。内联单位
     *
     * @property unitsInline
     * @type Array<String>
     * @description `DateTimePicker`组件的 unitsInline 属性。受控属性：在对应栏里的每个选项里添加对应的单位
     * @default []
     */
    unitsInline: PropTypes.arrayOf(PropTypes.string),
    /**
     * @property popupExtraClass
     * @type String
     * @default null
     * @description 附加popup区域根节点的额外 class
     */
    popupExtraClass: PropTypes.string,
    children: PropTypes.element
};

const defaultProps = {
    touchClass: null,
    dateOrTime: 'date',
    value: null,
    popupHeader: {
        title: null,
        okBtn: { text: '确定', touchClass: 'action-touch' },
        cancelBtn: { text: '取消', touchClass: 'action-touch' }
    },
    onChange: () => {
    },
    pickerHeight: 150,
    duration: 200,
    loop: [true, true, true],
    unitsInline: ['年', '月', '日'],
    fieldExtraClass: null,
    popupExtraClass: null
};

// picker默认选择第一项
function defaultPickerValue(dateOrTime, props) {
    const now = new Date();
    const { range } = props;
    let value = null;

    if (Array.isArray(range) && range.length > 0) {
        value = range[0];
    } else {
        if (dateOrTime === 'date') {
            value = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        } else if (dateOrTime === 'time') {
            value = `${now.getHours()}:${now.getMinutes()}`;
        }
    }
    return value;
}

class PopupDateTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            pickerValue: null
        };
    }

    componentWillMount() {
        const { value, dateOrTime } = this.props;
        if (value === null || value === undefined) {
            this.setState({
                pickerValue: defaultPickerValue(dateOrTime, this.props)
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
        this.wrapper.className = 'this-element-is-a-tricky-hack-for-popupdatetimepicker-please-just-ignore-it';
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
        const { value, dateOrTime } = this.props;
        this.hide();
        if (value === null || value === undefined) {
            this.setState({
                pickerValue: defaultPickerValue(dateOrTime, this.props)
            });
        } else {
            this.setState({
                pickerValue: value
            });
        }
    }

    handlePickerChange(value) {
        this.setState({
            pickerValue: value
        });
    }

    renderPicker() {
        const {
            dateOrTime,
            popupHeader,
            pickerHeight,
            duration,
            loop,
            unitsInline,
            popupExtraClass,
            range
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
                extraClass={classNames(popupExtraClass, 'yo-popup yo-popup-picker')}
                onMaskTap={this.handlePopupCancel.bind(this)}
            >
                <header className="yo-header">
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
                    <DateTimePicker
                        value={this.state.pickerValue}
                        unitsInline={unitsInline}
                        dateOrTime={dateOrTime}
                        onChange={this.handlePickerChange.bind(this)}
                        height={pickerHeight}
                        loop={loop}
                        range={range}
                    />
                </div>
            </Popup>
        );
    }

    render() {
        const { touchClass } = this.props;
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

PopupDateTimePicker.propTypes = propTypes;
PopupDateTimePicker.defaultProps = defaultProps;

export default PopupDateTimePicker;