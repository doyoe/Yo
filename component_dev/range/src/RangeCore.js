export default class RangeCore {

    constructor(step, trackLength = 292, single = false, range, value, round = 0.25, directionSensitivity) {
        this.BothMoved = false;
        this.bothMovingDirection = 0;
        this.separated = false;

        // touch 方向灵敏度
        this.directionSensitivity = 6;
        this.exportedIndex = {};
        this.exportedValue = {};
        this.refresh(step, trackLength, single, range, value, round, directionSensitivity);
    }

    validateProps(props) {
        const { isSingle, max, min, round, step, value } = props,
            range = [min, max];
        if (range[0] > range[1] || range.length < 2) {
            throw new Error('yo-range:range属性必须有两个元素,其中第二个元素(上限)的值必须大于第一个(下限)');
        } else if (step !== undefined && step <= 0) {
            throw new Error('yo-range:step必须为正数');
        } else if (value[0] < range[0]) {
            throw new Error('yo-range:左侧滑块的值不能小于range的下限');
        } else if (round >= 1 || round <= 0) {
            throw new Error('yo-range:round必须为0-1之间的数字');
        } else if (step !== undefined) {
            if (step > Math.abs(range[0] - range[1])) {
                throw new Error('yo-range:step不能大于可滑动范围');
            } else if ((range[1] - range[0]) % step) {
                throw new Error('yo-range:(max - min)必须能被step整除');
            } else if (isSingle && (value - min) % step) {
                throw new Error('yo-range:(value - min)在step不为0时，必须能被step整除');
            }
        }
        if (!isSingle) {
            if (value[0] > value[1] || value.length < 2) {
                throw new Error('yo-range:双滑块模式下,value属性必须有两个元素,其中第二个元素(右侧滑块)的值必须大于第一个(左侧滑块)');
            } else if (value[1] > range[1]) {
                throw new Error('yo-range:右侧滑块的value不能大于range的上限');
            } else if (step !== undefined) {
                if ((value[0] - min) % step || (value[1] - min) % step) {
                    throw new Error('yo-range:(value[i] - min)必须能被step整除');
                }
            }
        }
    }

    refresh(step, trackLength = 292, single = false, range, value, round = 0.25, directionSensitivity) {
        this.decimalLenOfValue = this.maxDecimalLenOfList([step]);
        const valueRange = range[1] - range[0];
        this.stepValue = step;
        this.directionSensitivity = directionSensitivity;
        if (step === undefined) {
            this.stepValue = valueRange / trackLength;
        }
        // step 为 0 表示不设置步长 ，即为translateX步长为1px（this.step = 1）的特殊情况，
        // 此时对应的Value值步长为 valueRange / trackLength
        this.step = trackLength / (valueRange / this.stepValue);
        this.maxEndTransX = trackLength;
        this.rateXtoValue = valueRange / this.maxEndTransX;
        this.range = range;
        this.round = round;
        this.single = single;

        // 如果输入的不是停驻点的数，则往最近的点靠
        this.btnLeft = {
            maxTransX: single ? this.maxEndTransX : this.maxEndTransX - this.step,
            minTransX: 0
        };
        this.btnRight = {
            maxTransX: this.maxEndTransX,
            minTransX: single ? 0 : this.step
        };
        this.syncFromState(value);
    }

    getTransXList() {
        return [this.btnLeft.translateX, this.btnRight.translateX];
    }

    keepMaxDecimalNum(num, decimalNum = this.decimalLenOfValue) {
        return parseFloat(num.toFixed(decimalNum), 10);
    }

    maxDecimalLenOfList(numList) {
        return numList.reduce((accMax, num) => {
            const decimal = String(num).split('.')[1],
                len = decimal && decimal.length;
            return Math.max(len || 0, accMax);
        }, 0);
    }

    mapValueToX(value) {
        return Math.round((value - this.range[0]) / this.rateXtoValue);
    }

    mapXtoValue(transX) {
        return this.keepMaxDecimalNum(this.rateXtoValue * transX + this.range[0]);
    }

    _cutNum(num, maxValue, minValue) {
        return Math.min(maxValue, Math.max(minValue, num));
    }

    _roundIndex(index, direction, error = this.round) {
        return direction > 0 ? Math.ceil(index - error) : Math.floor(index + error);
    }

    _trimTranslateX(direction, which = 'btnLeft') {
        if (this.step !== 0) {
            const slider = this[which],
                translateX = this._roundIndex(slider.translateX / this.step, direction) * this.step;
            slider.translateX = this._cutNum(translateX, slider.maxTransX, slider.minTransX);
        }
    }

    exportData(which, direction) {
        // 计算出需要导出的数据 index, value
        this.exportedIndex[which] = this._roundIndex(this[which].translateX / this.step, direction);
        this.exportedValue[which] = this.mapXtoValue(this[which].translateX);
    }

    _dealBothMoving(which, gap, moveLength, direction) {
        const theOtherIndex = which === 'btnLeft' ? 'btnRight' : 'btnLeft',
            slider = this[theOtherIndex];

        // 判断是否小于最小间隔 一个 step
        if (gap < this.step) {
            // 标记进入 同时移动 状态
            this.bothMoved = true;

            // 标记是否非同时移动后分开了
            this.separated = false;

            // 将 差值 补给 另一个滑块
            const extraTransX = (this.step - gap);
            slider.translateX += moveLength < 0 ? -extraTransX : extraTransX;

            this.exportData(theOtherIndex, direction);
            this.bothMovingDirection = direction;
        } else if (this.bothMoved === true) {
            // 当一起移动结束后，记录下 不再滑动的 那个滑块的方向
            if (!this.separated) {
                slider.direction = this.bothMovingDirection;
                this.separated = true;
            }
        }
    }

    handleTouchStart(startX, which = 'btnLeft') {
        const slider = this[which];
        this.bothMoved = false;
        slider.movingX = startX;
        slider.direction = 0;
        slider.startX = startX;
        slider.basic = slider.translateX;
        return this;
    }

    handleTouchMove(movingX, which = 'btnLeft') {
        const slider = this[which];
        const diff = movingX - slider.movingX;
        if (Math.abs(diff) > this.directionSensitivity) {
            slider.direction = movingX - slider.movingX;
            slider.movingX = movingX;
        }
        slider.moveLength = movingX - slider.startX;
        const translateX = slider.basic + slider.moveLength;
        slider.translateX = this._cutNum(translateX, slider.maxTransX, slider.minTransX);

        const gapSection = this.btnRight.translateX - this.btnLeft.translateX;
        if (!this.single) {
            this._dealBothMoving(which, gapSection, slider.moveLength, slider.direction);
        }
        this.exportData(which, slider.direction);
        return this;
    }

    handleTouchEnd(which = 'btnLeft') {
        // 如果存在 A 滑块方向为 0 或 undefined ，则将 A 滑块方向默认值设为 另一个滑块的方向。
        const direction = this.btnLeft.direction || this.btnRight.direction,
            sliderList = this.bothMoved ? ['btnLeft', 'btnRight'] : [which];

        sliderList.forEach(index => {
            this._trimTranslateX(this[index].direction || direction, index);
            this.exportedIndex[index] = Math.round(this[index].translateX / this.step);
            this.exportedValue[index] = this.mapXtoValue(this[index].translateX);
        });
        return this.reInit();
    }

    syncFromState(value) {
        ['btnLeft', 'btnRight'].forEach((which, index) => {
            if (value[index] !== undefined) {
                this[which].translateX = this.mapValueToX(value[index]);
                this.exportedIndex[which] = Math.round(this[which].translateX / this.step);
                this.exportedValue[which] = value[index];
            }
        });
    }

    reInit() {
        this.bothMoved = false;
        this.separated = false;
        this.bothMovingDirection = 0;
        this.btnLeft.direction = 0;
        this.btnRight.direction = 0;
        return this;
    }
}
