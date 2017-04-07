/**
 * 日期、时间选择
 * @component DateTimePicker
 * @version 3.0.0
 * @description 可提供一些日期或者时间序列供用户选择，并返回用户选择的结果。
 *
 * @instructions {instruInfo: ./dateTimePicker.md}{instruUrl: datetimepicker.html?hideIcon}
 * @author zongze.li
 */
import React, { Component, PropTypes } from 'react';
import Picker from '../../picker/src/picker';
import DateTimeCore from './datetimecore';
import { getArrayByLength } from '../../common/util';
import classNames from 'classnames';

const propTypes = {
    /**
     * 容器高度
     *
     * @property height
     * @type Number
     * @description 受控属性：决定容器展示的高度
     * @default 150
     */
    height: PropTypes.number,
    /**
     * 起止区间
     *
     * @property range
     * @type Array<String>
     * @description 受控属性：区间范围开始于, 结束于；可以用非数字符号做为分隔符;
     * @default ['1900-01-01', format(new Date(), 'xxxx-xx-xx')]
     */
    range: PropTypes.arrayOf(PropTypes.string),
    /**
     * 当前区间默认显示的点
     *
     * @property value
     * @type String
     * @description 受控属性：区间范围内当前默认值，可以用非数字符号做为分隔符；
     * @default '2016-8-28'
     */
    value: PropTypes.string,
    /**
     * 循环滚动模式
     *
     * @property loop
     * @type Array<Bool>
     * @description 受控属性：设置为true，为无限循环滚动模式，反之为有限模式；默认为true
     * @default [true, true, true]
     */
    loop: PropTypes.arrayOf(PropTypes.bool),
    /**
     * 内联单位
     *
     * @property unitsInline
     * @type Array<String>
     * @description 受控属性：在对应栏里的每个选项里添加对应的单位；
     * @default []
     */
    unitsInline: PropTypes.arrayOf(PropTypes.string),
    /**
     * 右旁单位
     *
     * @property unitsAside
     * @type Array<String>
     * @description 受控属性：在对应栏里的垂直居中，水平偏右位置，显示当前栏目对应的单位；
     * @default []
     */
    unitsAside: PropTypes.arrayOf(PropTypes.string),
    /**
     * 日期或者时间模式
     *
     * @property dateOrTime
     * @type Enum {'date', 'time'},
     * @description 受控属性：'date'代表日期模式，即年月日模式，'time'代表时间模式，即时分模式
     * @default 'date'
     */
    dateOrTime: PropTypes.oneOf(['date', 'time']),
    /**
     * 数字映射字符串函数
     *
     * @property format
     * @type Function
     * @description 受控属性：默认显示的date或者time是数字，传入该函数，会将数字作为参数，经该函数处理后，返回一个经过包装的字符串，这时将会以字符串作为默认的显示选项；该函数有两个参数(value, level)。
     * @param {Number} value 对应栏目的序列中的单个值
     * @param {Number} level 指代对应的栏目，从左往右递增，从0开始
     * @default (value, level) => value
     */
    format: PropTypes.func,
    /**
     * onChange回调函数
     *
     * @property onChange
     * @type Function
     * @description onChange回调函数，用以将当前选择的项目传递给上层，来触发更新。回传的参数有两个(value, item)。
     * @param {Object} value 为当前组件应更新到的状态
     * @param {Object} item 为当前滑到最中间位置的，选中的数据，包含了一些可能有用的较为详细的信息
     * @default (value, item) => {}
     */
    onChange: PropTypes.func,
    /**
     * 额外类名
     *
     * @property extraClass
     * @type String
     * @description 受控属性：本组件额外的css类
     * @default []
     */
    extraClass: PropTypes.string
};

function toStandardDateStr(value) {
    return String(value).length < 2 ? `0${value}` : value;
}

const DateTimePickerDefaultProps = {
    height: 150,
    loop: [true, true, true],
    unitsInline: [],
    unitsAside: [],
    dateOrTime: 'date',
    format: toStandardDateStr,
    onChange: (value, level) => {
        console.log(value, level, '请设置onChange函数，自行setState更新状态');
    },
    extraClass: ''
};

export default class DateTimePicker extends Component {
    constructor(props) {
        super(props);
        const date = new Date();
        this.defaultRange = {
            time: ['00:00', '23:59'],
            date: ['1900-01-01', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`]
        };
        this.regxNum = /[0-9]+/g;
        this.symbol = props.value.match(/\D/);
        this.splitStrToArray = str => str.match(this.regxNum).map(cur => parseInt(cur, 10));
        const len = this.splitStrToArray(this.props.value).length;
        this.levels = getArrayByLength(len).fill(1).map((cur, index) => index);

        const { range, value, dateOrTime, format, unitsInline } = props,
            newRange = range || this.defaultRange[this.props.dateOrTime],
            rangeArr = newRange.map(curr => this.splitStrToArray(curr));
        this.dateTimeModel = new DateTimeCore(this.splitStrToArray(value), rangeArr,
            unitsInline, dateOrTime, format);
        this.state = {
            levels: this.levels,
            ...this.dateTimeModel.multiPickerState
        };
    }

    componentWillReceiveProps(nextProps) {
        const { range, dateOrTime, unitsInline, format, loop } = nextProps,
            nextValue = this.splitStrToArray(nextProps.value);
        if (this.props.format !== format ||
            this.props.dateOrTime !== dateOrTime ||
            (range !== undefined && this.props.range !== range) ||
            this.props.unitsInline !== unitsInline ||
            this.props.loop !== loop
        ) {
            const newRange = range || this.defaultRange[dateOrTime],
                rangeArr = newRange.map(curr => this.splitStrToArray(curr));

            if (this.props.dateOrTime !== dateOrTime) {
                this.levels = getArrayByLength(rangeArr[0].length).fill(1).map((cur, index) => index);
            }
            this.dateTimeModel
                .refresh(nextValue, rangeArr, dateOrTime, unitsInline, format, loop)
                .deepUpdateMultiPickerState();
        } else {
            this.dateTimeModel.updateDateTime(nextValue);
        }

        this.setState({ ...this.dateTimeModel.multiPickerState, levels: this.levels });
    }

    _handleOnChange(item, level) {
        const nextValue = this.dateTimeModel.getNextValue(item.value, level),
            newValueState = nextValue.map(value => toStandardDateStr(value)).join(this.symbol),
            text = nextValue.map((val, index) => this.props.format(val, index)).join(this.symbol);

        if (this.props.onChange) {
            this.props.onChange(newValueState, text, item, level);
        }
    }

    render() {
        return (
            <div className={classNames('yo-datetimepicker', this.props.extraClass)}>
                {this.state.levels.map((optId, level) =>
                    <Picker
                        key={`picker${level}`}
                        stopPropagation={true}
                        options={this.state[optId].options}
                        value={this.state[optId].value}
                        unit={this.props.unitsAside[level]}
                        looped={this.props.loop[level]}
                        onChange={item => {
                            this._handleOnChange(item, level);
                        }}
                        height={this.props.height}
                    />
                )}
            </div>
        );
    }
}

DateTimePicker.propTypes = propTypes;
DateTimePicker.defaultProps = DateTimePickerDefaultProps;
