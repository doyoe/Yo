import ComponentCore from '../../common/ComponentCore';
import solar2lunar, { convert2digit } from './lunar.js';
import Holiday from './holiday.js';
import { getArrayByLength } from '../../common/util';

/**
 * getEndDate 获取间隔天数的最后一天日期
 * @param date {Date} 起始日期对象
 * @param offset {Number} 间隔天数
 * @returns {Date} 结束日期对象
 */
const getEndDate = (date, offset) => {
    const startTime = date.getTime();
    const endTime = startTime + offset * 24 * 3600 * 1000;
    return new Date(endTime);
};

/**
 * getFirstDayOfMonth 获取某年某月第一天
 * @param year {String} 年份
 * @param month {String} 月份
 * @returns {Date}
 */
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1);

/**
 * getLastDayOfMonth 获取某年某月最后一天
 * @param year {String}
 * @param month {String}
 * @returns {Date}
 */
const getLastDayOfMonth = (year, month) => new Date(year, month, 0);

/**
 * isWeekend 确定某天是否周末
 * @param dayNum {Number} 日期号
 * @param firstDay {Number} 当月第一天的星期数
 * @return {Boolean}
 */
const isWeekend = (dayNum, firstDay) => {
    const num = (+dayNum + firstDay) % 7;
    // 0是周六、1是周日
    return num === 0 || num === 1;
};

/**
 * onlyFormatMonth 仅格式化月，eg: 2016-08-9
 * @param date {Date}
 */
const onlyFormatMonth = date => [
    date.getFullYear(),
    convert2digit(date.getMonth() + 1),
    date.getDate()
].join('-');

/**
 * formatMonth 格式化某年某月月为指定格式， eg： 2016/08
 * @param year {String}
 * @param month {String}
 * @returns {string}
 */
const formatMonth = (year, month) => [year, convert2digit(month)].join('/');

/**
 * getHoliday 根据传入的参数，对应到holiday.js，返回节假日信息
 * @param str1 {string} 月-日 eg: '09-08'
 * @param str2 {string} solar | lunar
 * @returns {string} 节假日信息
 */
const getHoliday = (str1, str2 = 'solar') => Holiday[str2][str1] || '';

/**
 * formatMonthChinese 中文格式： 2016年8月
 * @param year {String}
 * @param month {String}
 * @returns {string}
 */
const formatMonthChinese = (year, month) => `${year}年${month}月`;

/**
 * compareDate 对比两个日期的大小
 * @param date1 {Date}
 * @param date2 {Date}
 * @return {Number} [相差的天数]
 */
const compareDate = (date1, date2) => date1.getTime() - date2.getTime();

/**
 * getDateInfoArr 获取年、月、日、星期等信息
 * @param date {Date}
 * @returns {Array}
 */
const getDateInfoArr = date => [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDay(),
    date.getDate()
];

/**
 * isHoliday 判断是否是假期
 * @param year {number}
 * @param month {number}
 * @param day {number}
 * @returns {string} 节假日信息或者''
 */
const isHoliday = (year, month, day) => {
    let res = '';
    const tempMonth = convert2digit(month);
    const tempDay = convert2digit(day);
    const lunar = solar2lunar(year, tempMonth, tempDay);
    res += getHoliday(`${tempMonth}-${tempDay}`);
    res += ' '; // 防止两个节日相连
    if (!!lunar.Term) {
        // 清明节，不固定
        res += `${lunar.Term} `;
    }
    res += getHoliday(lunar.str, 'lunar');
    return res.trim();
};

/**
 * 继承ComponentCore组件，主要基于观察者模式，注册、触发自定义事件
 */
export default class CalendarCore extends ComponentCore {
    constructor() {
        super('canlendar');
        this.checkIn = null;
        this.checkInDate = null;
        this.checkOut = null;
        this.checkOutDate = null;
        this.checkRange = []; // 缓存入、住店中间范围ITem对象的引用
        this.hasToday = false; // today 检测
        this.beforeToday = true; // beginDate是否在today之前
        this.isRender = false;
        this.allowSingle = false; // 是否尽允许选择单日情况
        this.groupKey = null; // 入店日期所在的月份分组的key, eg: '2017年10月'
    }

    /**
     * handleChange 点击日期时触发的函数
     * @param str {String} 点中的日期字符串 '2016-10-01'
     * @returns {null}
     */
    handleChange(str) {
        const resObj = {
            selectionStart: '',
            selectionEnd: ''
        };
        const resStr = str.replace(/\//g, '-');
        if (!!this.checkOut || !this.checkIn || this.allowSingle) {
            resObj.selectionStart = resStr;
            return this.emitEvent('check', resObj);
        }
        if (!!this.checkIn) {
            // 处理IOS不兼容2016-10-01， 但不改变原有日期格式
            const tempStr = str.replace(/-/g, '/');
            if (compareDate(new Date(tempStr), this.checkInDate) < 0) {
                resObj.selectionStart = resStr;
            } else {
                resObj.selectionStart = onlyFormatMonth(this.checkInDate);
                resObj.selectionEnd = resStr;
            }
            return this.emitEvent('check', resObj);
        }
        return this.emitEvent('check', resObj);
    }

    /**
     * isToday 某年某月某天是否是今天， this.hasToday存储结果
     * @param year {String}
     * @param month {String}
     * @param day {String}
     * @returns {Boolean}
     */
    isToday(year, month, day) {
        const tempDate = new Date();
        if (!this.checkIn) this.groupKey = formatMonthChinese(year, month);
        this.hasToday = tempDate.getFullYear() === parseFloat(year) && (tempDate.getMonth() + 1) === parseFloat(month) && tempDate.getDate() === parseFloat(day);
        return this.hasToday;
    }

    /**
     * 获取 checkIn 入店日期所在的月份分组的key
     */
    getGroupKey() {
        return this.groupKey;
    }

    /**
     * getDate 获取满足需要的groupList格式数据
     * @param duration {Number | Array} 时间间隔或起始时间日期
     * @param selectionStart {String} 入店时间， eg: 2016-10-01
     * @param selectionEnd {String} 离店时间， eg: 2016-10-01
     * @param allowSingle {Boolean} 允许单选
     * @returns {Array}
     */
    getData({ duration = 90, selectionStart = '', selectionEnd = '', allowSingle }) {
        let beginDate = '';
        let endDate = '';
        const todayDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        this.allowSingle = allowSingle;
        if (typeof duration === 'object') {
            beginDate = new Date(duration[0].replace(/-/g, '/'));
            endDate = new Date(duration[1].replace(/-/g, '/'));
        } else {
            beginDate = todayDate;
            endDate = getEndDate(beginDate, duration);
        }

        this.checkIn = selectionStart.replace(/-/g, '/');
        this.checkOut = selectionEnd.replace(/-/g, '/');
        this.checkInDate = new Date(this.checkIn);
        this.checkOutDate = new Date(this.checkOut);
        this.hasToday = false;
        this.beforeToday = compareDate(beginDate, todayDate);
        // 入店日期为今天之前的情况， 则重置为今天
        if (compareDate(this.checkInDate, todayDate) < 0) {
            this.checkInDate = todayDate;
        }

        // 两次选中同一天情况，相当于allowSingle
        if (!this.allowSingle && this.checkIn === this.checkOut) {
            this.allowSingle = true;
        }

        // 入店日期在离店日期之后， 则互换两者
        if (!!selectionEnd && compareDate(this.checkInDate, this.checkOutDate) > 0) {
            [this.checkInDate, this.checkOutDate] = [this.checkOutDate, this.checkInDate];
        }

        return this.getCheckArr({ beginDate, endDate });
    }

    /**
     * getCheckArr， 根据开始日期获取满足条件的dataSource
     * @param beginDate {Date} 开始日期对象
     * @param endDate {Date} 结束日期对象
     * @returns {Array}
     */
    getCheckArr({ beginDate, endDate }) {
        const [beginYear, beginMonth] = getDateInfoArr(beginDate);
        const [endYear, endMonth, endDay, endDayNum] = getDateInfoArr(endDate);
        const endMonthLastDate = getLastDayOfMonth(endYear, endMonth).getDate();
        let tempYear = beginYear;
        let tempMonth = beginMonth;
        let resArr = [];
        // 当月第一天的星期数
        let dayFirst = getFirstDayOfMonth(beginYear, beginMonth - 1).getDay();
        // baseIndex 基数值，用于补足日期显示范围最后一周的剩下几天
        // addNormalDateFlag 避免超过当前月的最大值，如32
        // disable 同上，最后一周补上额外的几天不可点击
        const addMapFn = (item, i, { baseIndex = 0, addNormalDateFlag = true, disable = false }) => {
            const day = baseIndex + i + 1;
            if (addNormalDateFlag || day <= endMonthLastDate) {
                return {
                    day,
                    date: formatMonth(tempYear, tempMonth),
                    lunar: solar2lunar(tempYear, tempMonth, day).str,
                    today: this.hasToday ? false : this.isToday(tempYear, tempMonth, day),
                    isCheckIn: false,
                    isCheck: false,
                    isCheckOut: false,
                    weekend: isWeekend(day, dayFirst),
                    holiday: isHoliday(tempYear, tempMonth, day),
                    disabled: disable || this.beforeToday <= 0 && !this.hasToday
                };
            }
            return { disabled: true };
        };
        while (tempYear < endYear || (tempYear === endYear && tempMonth <= endMonth)) {
            const isEnd = tempYear === endYear && tempMonth === endMonth;
            const tempDateObj = getLastDayOfMonth(tempYear, tempMonth);
            const dayLast = isEnd ? endDay : tempDateObj.getDay();
            const dayLength = isEnd ? endDayNum : tempDateObj.getDate();

            // 某月第一天之前的空格数
            const firstMonthArr = getArrayByLength(dayFirst).fill({ disabled: true });

            // 某月最后一天之后的空格数
            const lastMonthArr = getArrayByLength(6 - dayLast).fill({ disabled: true });

            // 某月具体每个天数的信息对象
            let tempMonthArr = getArrayByLength(dayLength).fill(0).map(addMapFn);

            // 补足显示日期范围最后一周的剩下几天情况, 为了美观
            if (isEnd) {
                const lastWeekArr = getArrayByLength(6 - endDay).fill(0).map((item, i) => addMapFn(item, i, {
                    baseIndex: endDayNum,
                    addNormalDateFlag: false,
                    disable: true
                }));
                tempMonthArr = tempMonthArr.concat(lastWeekArr);
            }
            const monthArr = firstMonthArr.concat(tempMonthArr, lastMonthArr);
            const groupKey = formatMonthChinese(tempYear, tempMonth);
            resArr = resArr.concat(this.getMonthArr(monthArr, groupKey));
            if (tempMonth === 12) {
                tempMonth = 1;
                tempYear++;
            } else {
                tempMonth++;
            }
            // 下月的第一天的星期为当前月最后一天的星期+1
            dayFirst = (dayLast + 1) % 7;
        }
        return resArr;
    }

    /**
     * getMonthArr 将一个月的天数格式化成按周分组，一周一个对象
     * @param monthArr {Array}
     * @param groupKey {String}
     * @returns {Array}
     */
    getMonthArr(monthArr, groupKey) {
        const resMonthArr = [];
        let tempWeekArr = [];
        monthArr.forEach((item, i) => {
            const itemDayObj = item;
            if (!itemDayObj.disabled && !!this.checkIn) {
                const itemStr = `${itemDayObj.date}/${itemDayObj.day}`;
                const itemDate = new Date(itemStr);
                const compareIn = compareDate(itemDate, this.checkInDate);
                const compareOut = !!this.checkOut && compareDate(itemDate, this.checkOutDate);
                if (!compareIn) {
                    this.checkIn = itemDayObj;
                    itemDayObj.isCheckIn = true;
                    this.groupKey = groupKey;
                }
                if ((compareIn > 0 && compareOut < 0) || ((!compareIn || compareOut === 0) && !this.allowSingle)) {
                    itemDayObj.isCheck = true;
                    this.checkRange.push(itemDayObj);
                }
                if (compareOut === 0) {
                    this.checkOut = itemDayObj;
                    itemDayObj.isCheckOut = true;
                }
            }

            if (i % 7 === 6) {
                tempWeekArr.push(itemDayObj);
                resMonthArr.push(this.getWeekObj(tempWeekArr, groupKey));
                tempWeekArr = [];
            } else {
                tempWeekArr.push(itemDayObj);
            }
        });
        return resMonthArr.map((item, i) => ({ ...item, key: item.groupKey + i }));
    }

    /**
     * 给每周对象上加isRender标志值, 该周是否更新,性能优化
     * @param weekArr {Array} 一周的数组
     * @param groupKey {String} 这周的groupKey
     * @returns {{week: array, isRender: boolean, groupKey: string}}
     */
    getWeekObj(weekArr, groupKey) {
        const resObj = {
            week: weekArr,
            isRender: false,
            groupKey
        };
        if (!this.checkIn) {
            return resObj;
        }
        weekArr.forEach(item => {
            if (item.disabled) {
                return;
            }
            const itemStr = `${item.date}/${item.day}`;
            const itemDate = new Date(itemStr);
            const compareIn = compareDate(itemDate, this.checkInDate);
            let compareOut = '';
            if (!!this.checkOut && this.isRender) {
                compareOut = compareDate(itemDate, this.checkOutDate);
                // 结束
                if (compareOut <= 0) {
                    this.isRender = !!compareOut;
                    resObj.isRender = true;
                }
            }
            if (compareIn === 0) {
                resObj.isRender = true;
                this.isRender = true;
            }
        });
        // console.log(this.isRender)
        return resObj;
    }
}
