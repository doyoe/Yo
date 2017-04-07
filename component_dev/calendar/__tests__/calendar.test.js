import React from 'react';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CalendarCore from '../src/CalendarCore';
import { convert2digit } from '../src/lunar.js';
import Calendar from '../src/calendar';

injectTapEventPlugin();

const formatDate = time => {
    const date = new Date(time);
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
};

const calendarCore = new CalendarCore();
// custom在前面，要不getGroupKey test会出错
const customHolidayData = calendarCore.getData({
    duration: ['2017-10-1', '2018-4-30']
});
const defaultData = calendarCore.getData({ duration: 180 });
const toDay = new Date().getDate();
const toDayWeekDayNum = new Date().getDay();
const toDayMonth = new Date().getMonth() + 1;
const toDayMonth2 = convert2digit(new Date().getMonth() + 1);
const toDayYear = new Date().getFullYear();

const testWrap = mount(<Calendar duration={180} allowSingle/>);
const todayNode = testWrap.find('li.today');

test('the number of day besides today which can be selected is 181, and all Check are false', () => {
    let num = 0;
    let flag = true;
    defaultData.forEach(item => {
        item.week.forEach((dayItem, j) => {
            const { disabled, day, date, weekend, isCheckIn, isCheck, isCheckOut } = dayItem;
            if ( flag && day === toDay ) {
                flag = false;
                expect(disabled).toBeFalsy();
                expect(date).toBe(`${toDayYear}/${toDayMonth2}`);
            }
            if (!disabled) {
                num++;
                j % 6 === 0 ? expect(weekend).toBeTruthy() : expect(weekend).toBeFalsy();
            }
            
            expect(isCheckIn).toBeFalsy();
            expect(isCheck).toBeFalsy();
            expect(isCheckOut).toBeFalsy();
            expect(day || 0).toBeLessThanOrEqual(31);
        });
    });
    expect(num).toBe(181);
});

test('the groupKey of no selectonStart is today', () => {
    expect(calendarCore.getGroupKey()).toBe(`${toDayYear}年${toDayMonth}月`);
});

test('the today node must has today class', () => {
    toDayWeekDayNum % 6 === 0 ? expect(todayNode.hasClass('today weekend')).toBeTruthy()
        : expect(todayNode.hasClass('today')).toBeTruthy()
});

test('selected today node', () => {
    expect(testWrap.find('li.start')).toHaveLength(0);
    const selectionStart = [toDayYear, toDayMonth, toDay].join('-');
    testWrap.setProps({ selectionStart, selectionEnd: '' });
    expect(testWrap.find('li.start')).toHaveLength(1);
    expect(todayNode.children().last().html()).toBe('<span class="tip yo-ico">入店</span>')
});

const customHolidayWrap = mount(<Calendar duration={['2017-10-1', '2018-4-30']} />);

test("2017-10-01: The National Day, 2017-10-04: The The Mid-Autumn Festival, "
    + "2017-11-11: Singles Day, 2017-12-24: Christmas Eve, "
    + "2017-12-25: Christmas Day, 2018-01-01: New Year's Day, "
    + "2018-02-14: Valentine's Day, 2018-02-15: New Year's eve, "
    + "2018-02-16: Spring Festival, 2017-04-05: The QingMing Festival", () => {
    customHolidayData.forEach(item => {
        item.week.forEach(dayItem => {
            const { day, date, holiday } = dayItem;
            if (date === '2017/10' && day === 1) expect(holiday).toBe('国庆节');
            if (date === '2017/10' && day === 4) expect(holiday).toBe('中秋节');
            if (date === '2017/11' && day === 11) expect(holiday).toBe('光棍节');
            if (date === '2017/12' && day === 24) expect(holiday).toBe('平安夜');
            if (date === '2017/12' && day === 25) expect(holiday).toBe('圣诞节');
            if (date === '2018/01' && day === 1) expect(holiday).toBe('元旦');
            if (date === '2018/02' && day === 14) expect(holiday).toBe('情人节');
            if (date === '2018/02' && day === 15) expect(holiday).toBe('除夕');
            if (date === '2018/02' && day === 16) expect(holiday).toBe('春节');
            if (date === '2018/04' && day === 5) expect(holiday).toBe('清明');
        });
    });
});

test('the number of holiday between 2017-10-1 and 2018-4-30 should be 6', () => {
    expect(customHolidayWrap.find('li.holiday')).toHaveLength(10);
});

const selectionStartTime = new Date().getTime() + 30 * 24 * 3600 * 1000;
const customCore = new CalendarCore();
const [selectionStartYear, selectionStartMonth, selectionStartDate] = formatDate(selectionStartTime);
const [selectionEndYear, selectionEndMonth, selectionEndDate] = formatDate(selectionStartTime + 6 * 24 * 3600 * 1000);
const selectionStart = formatDate(selectionStartTime).join('-');
const selectionEnd = [selectionEndYear, selectionEndMonth, selectionEndDate].join('-');
const customData = customCore.getData({
    selectionStart,
    selectionEnd
});
const selectionStartYearMonth = `${selectionStartYear}/${convert2digit(selectionStartMonth)}`;
const selectionEndYearMonth = `${selectionEndYear}/${convert2digit(selectionEndMonth)}`;

const customWrap = mount(<Calendar
    selectionStart={selectionStart}
    selectionEnd={selectionEnd}
    selectionStartText="飞不飞"
    selectionEndText="gogogo"
/>);

test('the groupKey should be the group where the selectionStart located', () => {
    expect(customCore.getGroupKey()).toBe(`${selectionStartYear}年${selectionStartMonth}月`);
});

test('the Check property should be true between selectionStart and selectionEnd, the custom text should be setted', () => {
    let num = 0;
    customData.forEach(item => {
        item.week.forEach(weekItem => {
            const { disabled, day, date, isCheckIn, isCheckOut, isCheck } = weekItem;
            if (!disabled) {
                if (isCheck) num++;
                if (date === selectionStartDate && day === selectionStartYearMonth) {
                    expect(isCheckIn).toBeTruthy();
                    expect(isCheck).toBeTruthy();
                }
                if (date === selectionEndDate && day === selectionEndYearMonth) {
                    expect(isCheckOut).toBeTruthy();
                    expect(isCheck).toBeTruthy();
                }
            }
        });
    });
    expect(num).toBe(7);
    const startNode = customWrap.find('li.start');
    const endNode = customWrap.find('li.end');
    expect(customWrap.find('li.range')).toHaveLength(7);
    expect(startNode).toHaveLength(1);
    expect(startNode.children().last().html()).toBe('<span class="tip yo-ico">飞不飞</span>');
    expect(endNode).toHaveLength(1);
    expect(endNode.children().last().html()).toBe('<span class="tip yo-ico">gogogo</span>');
});

const renderDate = (item, ret) => {
    const { date, day } = item;
    return date === `${toDayYear}/${toDayMonth2}` && day === toDay ? (
            <span className="custom-today-class">我不管，今天必须实现成这种模式</span>
        ) : ret;
};
const renderDateWrap = mount(<Calendar renderDate={renderDate} />);

test('only today will be used the customed renderDate', () => {
    expect(renderDateWrap.find('li.today').children().html()).toBe('<span class="custom-today-class">我不管，今天必须实现成这种模式</span>');
    expect(renderDateWrap.find('.custom-today-class')).toHaveLength(1);
});