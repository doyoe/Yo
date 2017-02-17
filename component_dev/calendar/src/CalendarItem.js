/**
 * @author qingguo.xu
 * 某一天的数据显示
 */
import '../../common/tapEventPluginInit.js';
import React, { Component, PropTypes } from 'react';
import getClassNames from 'classnames';
import Touchable from '../../touchable/src';

const propTypes = {
    isRender: PropTypes.bool,
    week: PropTypes.array,
    selectionStartText: PropTypes.string,
    selectionEndText: PropTypes.string,
    onChange: PropTypes.func
};

export default class WeekItem extends Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.isRender !== nextProps.isRender) {
            return true;
        }
        return nextProps.isRender;
    }

    handleChange(str) {
        if (!str) {
            return null;
        }
        return this.props.onChange(str);
    }

    render() {
        const { selectionStartText, selectionEndText } = this.props;
        const weeks = this.props.week.map((item, i) => {
            const day = item.disabled ? null : `${item.date}-${item.day}`;
            let classNames = '';
            if (item.today) {
                classNames += 'today ';
            }
            if (item.weekend) {
                classNames += 'weekend ';
            }
            if (!!item.holiday) {
                classNames += 'holiday ';
            }
            if (item.isCheckIn) {
                classNames += 'start ';
            }
            if (item.isCheckOut) {
                classNames += 'end ';
            }
            if (item.isCheck) {
                classNames += 'range ';
            }
            if (item.disabled) {
                classNames += 'disabled ';
            }

            return (
                <Touchable key={i} onTap={() => this.handleChange(day)} internalUse={true}>
                    <li
                        className={classNames ? getClassNames(classNames) : null}
                    >
                        <span className="day">{item.day}</span>
                        {item.today ? (<ins className="special">今天</ins>) : null}
                        {item.holiday ? (<ins className="special">{item.holiday}</ins>) : null}
                        {item.isCheckIn ? (<span className="tip yo-ico">{selectionStartText}</span>) : null}
                        {item.isCheckOut ? (<span className="tip yo-ico">{selectionEndText}</span>) : null}
                    </li>
                </Touchable>
            );
        });

        return (
            <ul className="week">{weeks}</ul>
        );
    }
}

WeekItem.propTypes = propTypes;
