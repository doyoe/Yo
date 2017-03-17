/**
 * @component Calendar
 * @version 3.0.0
 * @description 日历组件，基于groupList组件实现。
 *
 * 可通过以下两种方式定义日期范围:
 *  - 传入具体的起、始日期。
 *  - 传入距离系统当日的间隔天数，默认90。
 * 入住时间在今天之前，会被重置为今天。
 * 入住时间在离店时间之后，则互换。
 * 默认selectionStart、selectionEnd可选择同一天。
 *
 * @instructions {instruInfo: ./calendar.md}{instruUrl: calendar.html?hideIcon}
 * @author qingguo.xu
 */

import CalendarCore from './CalendarCore.js';
import CalendarItem from './CalendarItem.js';
import GroupList from '../../grouplist/src/';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import './style.scss';

const defaultProps = {
    duration: 90,
    extraClass: '',
    selectionStart: '',
    selectionEnd: '',
    selectionStartText: '入店',
    selectionEndText: '离店',
    allowSingle: false,
    onChange() {},
    renderDate() {}
};

const propTypes = {
    /**
     * @property duration
     * @description 允许用户选择的日期范围，支持两种形式：传入数字，则表示从今天开始到N天后；传入形式为['yyyy-mm-dd','yyyy-mm-dd']的数组，
     * 可以直接设置起始日期和终止日期。
     * @type Number/Array
     * @default 90
     */
    duration: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    /**
     * @property extraClass
     * @description 组件的额外样式
     * @type String
     */
    extraClass: PropTypes.string,
    /**
     * @property selectionStart
     * @description 默认选中范围的开始日期
     * @type String
     */
    selectionStart: PropTypes.string,
    /**
     * @property selectionEnd
     * @description 默认选中范围的结束日期
     * @type String
     */
    selectionEnd: PropTypes.string,
    /**
     * @property selectionStartText
     * @description 选中范围的开始日期标注，可传入文字或yo支持的icofont
     * @type String
     * @default '入店'
     */
    selectionStartText: PropTypes.string,
    /**
     * @property selectionEndText
     * @description 选中范围的结束日期标注，可传入文字或yo支持的icofont
     * @type String
     */
    selectionEndText: PropTypes.string,
    /**
     * @property allowSingle
     * @description 是否只允许选中单个日期
     * @type Bool
     * @default false
     */
    allowSingle: PropTypes.bool,
    /**
     * @property onChange
     * @type Function
     * @param {Object} obj 选中范围的开始日期、结束日期对象
     * @param {String} obj.selectionStart 选中范围的开始日期
     * @param {String} obj.selectionEnd 选中范围的结束日期
     * @description 点击选中日期时回调函数
     */
    onChange: PropTypes.func,
    /**
     * @property renderDate
     * @type Function
     * @param {Object} item 待渲染的日期数据对象
     * @param {String} ret 组件默认的日期渲染模板
     * @default () => {}
     * @description 每个日期对象渲染函数的模板。可自定义单个日期节点的显示内容。
     */
    renderDate: PropTypes.func
};

export default class Calendar extends Component {

    constructor(props) {
        super(props);
        const { duration, selectionStart, selectionEnd, allowSingle } = props;
        this.calendarModel = new CalendarCore();
        this.state = {
            data: this.calendarModel.getData({ duration, selectionStart, selectionEnd, allowSingle })
        };
        this.groupList = null;
    }

    componentWillMount() {
        // 注册点击check事件， 在CalendarCore理触发
        this.calendarModel.registerEventHandler('check', obj => this.props.onChange(obj));
    }

    componentDidMount() {
        const groupKey = this.calendarModel.getGroupKey();
        this.groupList.scrollToGroup(groupKey);
    }

    componentWillReceiveProps(nextProps) {
        const { duration, selectionStart, selectionEnd, allowSingle } = nextProps;
        this.setState({
            data: this.calendarModel.getData({ duration, selectionStart, selectionEnd, allowSingle })
        });
    }

    render() {
        const { renderDate, selectionStartText, selectionEndText, extraClass } = this.props;
        return (
            <section className={classNames('yo-calendar', extraClass)}>
                <ul className="week-bar">
                    <li className="weekend">日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li className="weekend">六</li>
                </ul>
                <GroupList
                    isTitleStatic={true}
                    itemTouchClass={null}
                    ref={node => { this.groupList = node; }}
                    renderGroupItem={item => <CalendarItem
                        week={item.week}
                        isRender={item.isRender}
                        selectionStartText={selectionStartText}
                        selectionEndText={selectionEndText}
                        renderDate={renderDate}
                        onChange={str => this.calendarModel.handleChange(str)}
                    />}
                    dataSource={this.state.data}
                />
            </section>
        );
    }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;
