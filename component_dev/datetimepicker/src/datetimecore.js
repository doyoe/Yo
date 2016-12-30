import { getArrayByLength } from '../../common/util';

export default class DateTimeCore {

    constructor(value, range, units = [], dateOrTime = 'date',
        extraNumStrWrapper = (val => val)) {
        this.monthMapDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.monthRange = { min: 1, max: 12 };
        this.minsRange = { min: 0, max: 59 };
        this.refresh(value, range, dateOrTime, units, extraNumStrWrapper);
        this.deepUpdateMultiPickerState();
    }

    refresh(value = this.value, range = this.range, dateOrTime = this.dateOrTime,
        units = this.units, extraNumStrWrapper = this.extraNumStrWrapper.bind(this)) {
        this.value = value;
        this.range = range;
        this.dateOrTime = dateOrTime;
        this.levels = getArrayByLength(value.length).fill(1).map((cur, index) => index);
        this.units = units;
        this.extraNumStrWrapper = extraNumStrWrapper;
        this.rangeStore = this.calculateRange(this.range, this.dateOrTime);
        this.value = this.trimValue(this.value);
        this.currRange = this.getCurrRange();
        return this;
    }

    deepUpdateMultiPickerState() {
        this.multiPickerState = this.levels.reduce((accState, level) => {
            accState[level] = this.genPickerState(level, this.currRange[level], this.value[level]);
            return accState;
        }, {});
    }

    // 只有value及currRange 发生变化时，只需从已有的状态中取出需要更新的new options即可。
    shallowUpdateMultiPickerState(level, currRange, value) {
        this.multiPickerState[level] = this.genPickerState(level, currRange, value);
    }

    updateDateTime(newValues) {
        const levels = this.levels;
        let startLevel;

        newValues.forEach((newValue, level) => {
            const pickerState = this.multiPickerState[level];
            if (newValue !== pickerState.value && pickerState.value !== undefined) {
                this.value[level] = newValue;
                if (startLevel === undefined) {
                    startLevel = level;
                }
            }
        });
        levels.forEach(level => {
            const pickerState = this.multiPickerState[level];
            if (level < startLevel || pickerState.value === undefined) {
                return;
            }
            const currRange = this.getCurrRange(),
                { min, max } = currRange[level],
                currValue = this.value[level],
                newValue = this.cutNum(currValue, min, max),
                options = this.multiPickerState[level].options,
                minValue = options[0].value,
                maxValue = options[options.length - 1].value;

            this.value[level] = newValue || this.value[level];
            if (min !== minValue || max !== maxValue) {
                this.shallowUpdateMultiPickerState(level, currRange[level], newValue);
            } else {
                this.multiPickerState[level].value = this.value[level];
            }
        });
    }

    genPickerState(level, currRange, value, units = this.units) {
        const { min, max } = currRange;
        return {
            options: this.mapRangeToOptions(min, max, level, units[level] || ''),
            value
        };
    }

    mapRangeToOptions(min, max, level, unit) {
        return getArrayByLength(max - min + 1).fill(1).map((cur, index) => ({
            value: index + min,
            text: this.extraNumStrWrapper(index + min, level) + unit
        }));
    }

    /**
     * 获取合法的 新 value
     * @method getNextValue
     * @param {Number} changedValue 当前改变的 value
     * @param {Number} changedLevel 当前改变的 value 所在的 level（年、月、日 or 时、分，0 1 2）
     * @return {Array} 合法的新 value 数组。
     *
     * @description 输入当前改变的 value，及所在的 level，返回合法的 包含全部 level 的 value 的数据。
     */
    getNextValue(changedValue, changedLevel) {
        const nextValue = [].concat(this.value);
        nextValue[changedLevel] = changedValue;

        return this.trimValue(nextValue);
    }

    trimValue(unLegalValue) {
        return this.levels.reduce((legalValue, level) => {
            // 获取 当前 level 的 range 范围
            const nextRange = this.getCurrRange(legalValue),
                { min, max } = nextRange[level],

                // cut 裁减 value，使之在当前 range 内
                value = legalValue[level],
                trimedValue = this.cutNum(value, min, max);

            // 将裁减过的合法 value 存入 legalValue 数组中，方便在下次循环中，
            // 以此 value，算出下一级 新的 range，进而可通过裁减调整 得到下一级的 value
            legalValue[level] = trimedValue;
            return legalValue;
        }, unLegalValue);
    }

    /* range: [[2000,7, 23], [2016, 9, 3]],
        rangeStore: {
            2000: {
                min: 7,
                max: 12,
                7: {min: 23, max: 31},
            2016: {
                min: 1,
                max: 9,
                9: {min: 1, max: 3},
            }
        }
    */
    calculateRange(range = this.range) {
        const min = this.selectByMode(1, 0);
        return range.reduce((rangeStore, cur, index) => {
            const high = cur[0],
                mid = cur[1],
                low = cur[2] || 0,
                days = this.getDaysByMonth(mid);

            if (index === 0) {
                rangeStore[high] = { min: mid, max: this.selectByMode(12, 59) };
                rangeStore[high][mid] = { min: low, max: this.selectByMode(days, 59) };
            } else {
                rangeStore[high] = Object.assign({ min }, rangeStore[high], { max: mid });
                rangeStore[high][mid] = Object.assign({ min }, rangeStore[high][mid], { max: low });
            }
            return rangeStore;
        }, {});
    }

    getCurrRange(value = this.value, mode = this.dateOrTime, rangeStore = this.rangeStore) {
        const midRange = rangeStore[value[0]],
            lowRange = midRange && midRange[value[1]],
            highRange = { min: this.range[0][0], max: this.range[1][0] },
            monthRange = this.monthRange,
            minsRange = this.minsRange,
            dayRange = { min: 1, max: this.getDaysByMonth(value[1]) },
            range = {
                0: highRange,
                1: midRange || this.selectByMode(monthRange, minsRange),
                2: lowRange || this.selectByMode(dayRange, minsRange)
            };
        return range;
    }

    selectByMode(dateRange, timeRange, mode = this.dateOrTime) {
        return mode === 'date' ? dateRange : timeRange;
    }

    cutNum(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    isLeapYear(num) {
        const mod4 = num % 4,
            mod100 = num % 100,
            mod400 = num % 400;
        return !mod4 && (mod100 || (!mod100 && !mod400));
    }

    getDaysByMonth(month, year = this.value[0], isLeap = this.isLeapYear.bind(this),
        monthMapDays = this.monthMapDays) {
        const leap = isLeap(year);
        return !(leap && month === 2) ? monthMapDays[month - 1] : monthMapDays[month - 1] + 1;
    }
}
