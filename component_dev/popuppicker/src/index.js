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
import classNames from 'classnames';
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
     * @type Number/String/Array <Number, String>
     * @default null
     * @description 组件的value，参考网页`select`标签的 value 属性。
     *
     * value 是一个严格受控属性，只能通过的父组件改变，你需要设置 onChange 属性来控制 value 属性的变化。
     *
     * 在开启了多列模式的情况下（通过设置options属性为一个二维数组），这个属性也应该相应地传入一个数组，每个元素对应着该列的value。
     * 如果value数组和options数组的length不相等，那么空缺的value会被设为null。
     */
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ]),
    /**
     * @property onChange
     * @type Function
     * @param value 当前的 option 的 value，如果开启了多列模式，那么返回值将是一个包含了每一列value的数组。
     * @description 弹出式选择器 Ok 按钮点击后的回调，必须。
     */
    onChange: PropTypes.func.isRequired,
    /**
     * @property options
     * @type Array/Array <Array>
     * @default null
     * @description `Picker`组件的 options 属性。数组形式，元素的格式为`{text:string,value:string}`，
     *
     * text 为 option 显示的文本，value 为 option 对应的真实值（参考网页 option 标签），
     *
     * text 的缺省值为 value，value 必须传入，且只能为字符串/数字类型。
     *
     * 如果你传入一个二维数组，那么PopupPicker将会是一个多列的Picker，二维数组的每一个子数组将会作为对应列的option。
     */
    options: PropTypes.oneOfType([PropTypes.arrayOf(
        PropTypes.shape(
            {
                text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
            }
        )
    ).isRequired, PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape(
                {
                    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
                }
            )
        )
    )]),
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
     * @description `Picker`组件的 looped 属性。是否采用循环模式，默认为 true。
     *
     * 这个属性可以接收两种形式的参数，如果你传入Bool类型，那么将会应用于所有的列上（如果你使用了多列的Picker）。
     * 如果传入一个数组，那么可以针对每一列的Picker分别定义。
     */
    looped: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.bool)
    ]),
    /**
     * @property unit
     * @type Number/String/Array
     * @default null
     * @description `Picker`组件的 unit 属性。显示在 picker 右侧的单位。
     *
     * 这个属性可以接收两种形式的参数，如果你传入Number或者String类型，那么将会应用于所有的列上（如果你使用了多列的Picker）。
     * 如果传入一个数组，那么可以针对每一列的Picker分别定义。
     */
    unit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ])
        )
    ]),
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
        this.resetValue(value, options);
    }

    componentDidMount() {
        this.updatePicker();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value != null && nextProps.value !== this.state.pickerValue) {
            this.setState({
                pickerValue: this.formatPickerProp(nextProps.value)
            });
        }
    }

    componentDidUpdate() {
        this.updatePicker();
    }

    componentWillUnmount() {
        document.body.removeChild(this.wrapper);
    }

    getMultiPickerConfig({ options, looped, unit }) {
        const value = this.state.pickerValue;
        const renderedOpts = this.formatPickerOpt(options);
        const renderedLooped = this.formatPickerProp(looped);
        const renderedUnit = this.formatPickerProp(unit);

        return renderedOpts.map((optGroup, i) => ({
            options: optGroup,
            value: value[i],
            looped: renderedLooped[i] != null ? renderedLooped[i] : renderedLooped[0],
            unit: renderedUnit[i] != null ? renderedUnit[i] : renderedUnit[0]
        }));
    }

    getOnChangeValue(value, i) {
        return this.state.pickerValue.map((val, idx) => idx === i ? value : val);
    }

    resetValue(value, options) {
        if (value === null || value === undefined) {
            this.setState({
                pickerValue: this.defaultPickerValue(options)
            });
        } else {
            this.setState({
                pickerValue: this.formatPickerProp(value)
            });
        }
    }

    show() {
        this.setState({ show: true });
    }

    hide() {
        this.setState({ show: false });
    }

    handlePopupOk() {
        const { onChange } = this.props;
        this.hide();
        onChange(this.state.pickerValue.length > 1 ? this.state.pickerValue : this.state.pickerValue[0]);
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

    defaultPickerValue(options) {
        options = this.formatPickerOpt(options);
        if (Array.isArray(options)) {
            return options.map((pickerOpt) => pickerOpt[0].value);
        }
        throw new Error('yo-popuppicker: option属性必须为一个对象数组或者二维数组，请检查。');
    }

    formatPickerOpt(options) {
        if (!Array.isArray(options[0])) {
            return [options];
        }
        return options;
    }

    formatPickerProp(prop) {
        return Array.isArray(prop) ? prop : [prop];
    }

    handlePopupCancel() {
        const { value, options } = this.props;
        this.hide();
        this.resetValue(value, options);
    }

    handlePickerChange(option, i) {
        this.setState({
            pickerValue: this.getOnChangeValue(option.value, i)
        });
    }

    renderPicker() {
        const {
            popupHeader,
            duration,
            pickerHeight,
            popupExtraClass
        } = this.props;
        const pickerConfigs = this.getMultiPickerConfig(this.props);
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
                extraClass={classNames(popupExtraClass, 'yo-popup yo-popup yo-popup-picker')}
                onMaskTap={this.handlePopupCancel.bind(this)}
            >
                <header className="yo-header yo-header-popup-picker">
                    <span className="title">{title}</span>
                    <Touchable
                        onTap={this.handlePopupCancel.bind(this)}
                        touchClass={cancelBtn.touchClass || defaultProps.popupHeader.cancelBtn.touchClass}
                    >
                        <span className="regret">{cancelBtn.text || defaultProps.popupHeader.cancelBtn.text}</span>
                    </Touchable>
                    <Touchable
                        onTap={() => {
                            this.handlePopupOk();
                        }}
                        touchClass={okBtn.touchClass || defaultProps.popupHeader.okBtn.touchClass}
                    >
                        <div className="affirm">{okBtn.text || defaultProps.popupHeader.okBtn.text}</div>
                    </Touchable>
                </header>
                <div className="bd">
                    {pickerConfigs.map((cfg, i) => (
                        <Picker
                            key={i}
                            options={cfg.options}
                            value={cfg.value}
                            height={pickerHeight}
                            looped={cfg.looped}
                            unit={cfg.unit}
                            onChange={(option) => {
                                this.handlePickerChange(option, i);
                            }}
                        />
                    ))}
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

PopupPicker.propTypes = propTypes;
PopupPicker.defaultProps = defaultProps;

export default PopupPicker;