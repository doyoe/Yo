/**
 * 区间选择
 * @component Range
 * @version 3.0.0
 * @description 用户可通过滑动选定一个区间，组件返回这个区间值；支持单、双滑块模式，有step和无step模式等。
 *
 * @instructions {instruInfo: ./range.md}{instruUrl: range.html?hideIcon}
 * @author zongze.li
 */
import React, { Component, PropTypes } from 'react';
import RangeCore from './RangeCore';
import debounce from 'lodash/debounce';
import { getArrayByLength } from '../../common/util';
import classNames from 'classnames';

const propTypes = {
    /**
     * 禁用滑块
     *
     * @property disable
     * @type Bool
     * @description 受控属性：禁止滑块滑动，阻止touch事件。
     * @default false
     */
    disable: PropTypes.bool,
    /**
     * 滑块最右边表示的值
     *
     * @property max
     * @type Number
     * @description 受控属性：滑块滑到最右边应该表示的值。
     *
     * 注意：有传入step属性时，必须保证 (max - min) 能被 step 整除。
     * @default 100
     */
    max: PropTypes.number.isRequired,
    /**
     * 滑块最左边表示的值
     *
     * @property min
     * @type Number
     * @description 受控属性：滑块滑到最左边应该表示的值。
     */
    min: PropTypes.number.isRequired,
    /**
     * 滑动步长
     *
     * @property step
     * @type Number
     * @description 受控属性：滑块单方向滑动一次后的最小步长。
     *
     * 注意：不设置该属性，表示移动时不设步长，step 必须为一正数。
     *
     * 注意：step自带的小数位点影响最后返回的数字的最大小数位数。
     */
    step: PropTypes.number,
    /**
     * 滑块默认区间
     *
     * @property value
     * @type Array<Number>/Number
     * @description 受控属性：滑块初始化时默认选中的区间范围；
     *
     * 注意：类型提示：类型为Array，对应两个滑块的值，类型为Number，对应于1个滑块的值；
     */
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]).isRequired,
    /**
     * 趋势阈值
     *
     * @property round
     * @type Number
     * @description 受控属性：滑块在当前滑动的方向上，累积滑动多大一段距离后，才判定应该到达该方向的下一个停驻点。默认为1/4的间距，也就是如果累积滑动了1/4间距后，即到达该方向上的一下个停驻点。
     * @default 1/4
     */
    round: PropTypes.number,
    /**
     * 方向灵敏度
     *
     * @property directionSensitivity
     * @type Number
     * @description 受控属性：反向移动多少"像素"算作方向改变，防止手指微动时导致方向改变，近而导致由于微动而很难移动到目标位置。
     * @default 6
     */
    directionSensitivity: PropTypes.number,
    /**
     * 单滑块模式
     *
     * @property isSingle
     * @type Bool
     * @description 受控属性：是否启用单滑块模式，默认为 false 不展示，设置为 true 即启用。
     * @default false
     */
    isSingle: PropTypes.bool,
    /**
     * 无标签
     *
     * @property showScale
     * @type Bool
     * @description 受控属性：是否展示标签，默认为 true 展示，设置为 false 即不展示且不生成标签
     * @default true
     */
    showScale: PropTypes.bool,
    /**
     * 自定义刻度标签
     *
     * @property scaleFormat
     * @type Function
     * @param {Number} [scale] 单个标签对应的 value 值
     * @param {Number} [index] 当前标签对应的下标
     * @returns {String} 单个标签所展示的字符串，支持返回jsx。
     * @description 受控属性：滑块滑到某一刻度时所展示的刻度文本信息。
     *
     * 注意：如果 step 相对 max - min 足够小，则默认会产生很多个标签，导致显示时会全挤在一块而变成纯色的 bug 样式，这时可设置 showScale 为 false ，可禁用且不渲染标签。
     * @default value => value
     */
    scaleFormat: PropTypes.func,
    /**
     * 刻度标签位置
     *
     * @property scalePosition
     * @type Enum {'top','bottom'}
     * @description 受控属性：滑块在轨道线的上边显示，还是下边
     * @default 'top'
     */
    scalePosition: PropTypes.oneOf(['top', 'bottom']),
    /**
     * touchStart 回调函数
     *
     * @property onSliderTouchStart
     * @type Function
     * @description 触发touchStart事件后，在事件结束前进行调用的函数，该函数有4个参数，onSliderTouchStart(value, translateX, event, sliderIndex)。
     * @param {Number/Array} [value] 当前选中区间，单滑块为Number，双滑块为Array；
     * @param {Number/Array} [translateX] 当前滑块的translateX，单滑块为Number,双滑块为Array;
     * @param {Object} [event] 事件对象；
     * @param {Number} [sliderIndex] 当前鼠标拖动的滑块序号，0或1，0表示左滑块，1表示右滑块。
     * @default null
     */
    onSliderTouchStart: PropTypes.func,
    /**
     * touchMove 回调函数
     *
     * @property onSliderTouchMove
     * @type Function
     * @description 触发touchMove事件后，在事件结束前进行调用的函数，该函数有3个参数，onTouchMove(value, translateX, event, sliderIndex)。
     * @param {Number/Array} [value] 当前选中区间，单滑块为Number，双滑块为Array；
     * @param {Number/Array} [translateX] 当前滑块的translateX，单滑块为Number,双滑块为Array;
     * @param {Object} [event] 事件对象；
     * @param {Number} [sliderIndex] 当前鼠标拖动的滑块序号，0或1，0表示左滑块，1表示右滑块。
     * @default null
     */
    onSliderTouchMove: PropTypes.func,
    /**
     * touchEnd 回调函数
     *
     * @property onSliderTouchEnd
     * @type Function
     * @description 触发touchEnd事件后，在事件结束前进行调用的函数，该函数有4个参数，onSliderTouchEnd(value, translateX, event, sliderIndex)，event即事件对象。
     * @param {Number/Array} [value] 当前选中区间，单滑块为Number，双滑块为Array；
     * @param {Number/Array} [translateX] 当前滑块的translateX，单滑块为Number,双滑块为Array;
     * @param {Object} [event] 事件对象；
     * @param {Number} [sliderIndex] 当前鼠标拖动的滑块序号，0或1，0表示左滑块，1表示右滑块。
     * @default null
     */
    onSliderTouchEnd: PropTypes.func,
    /**
     * onChange 回调函数
     *
     * @property onChange
     * @type Function
     * @description 当滑动滑块后，滑块在停下时会通过调用上级的 onChange 回调函数，以来在上一层组件中调用 setState 来更新当前组件的状态。
     * @param {Number/Array} [value] 待更新的当前选中区间的对应值
     * @default value => console.log(value)
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 组件额外类
     *
     * @property extraClass
     * @type String
     * @description 受控属性：扩展range组件样式所需添加的额外的类
     */
    extraClass: PropTypes.string
};
const RangeDefaultProps = {
    disable: false,
    isSingle: false,
    round: 0.25,
    scalePosition: 'top',
    directionSensitivity: 6,
    scaleFormat: value => value,
    showScale: true,
    onSliderTouchStart: null,
    onSliderTouchMove: null,
    onSliderTouchEnd: null,
    onChange: value => console.log(value),
    extraClass: ''
};

const transitionClass = 'transition';
const activeClass = 'divide-on';

export default class Range extends Component {
    constructor(props) {
        super(props);

        // 初始化时设置的容器宽度，组件挂载后会获取容器渲染后的实时宽度。
        this.trackLength = 292;
        this.activeIndex = {};
        this.sliderLeftJSX = this.renderSlider('btnLeft');
        this.sliderRightJSX = this.renderSlider('btnRight');
        const { min, max, value, round, isSingle, step, directionSensitivity } = props;
        const newValue = typeof value === 'number' ? [value, value] : value;
        this.rangeCore = new RangeCore(step, this.trackLength, isSingle, [min, max], newValue, round, directionSensitivity);
        this.rangeCore.validateProps(props);
        this.refreshTicks(props, true);
        this.state = {
            ticksJSX: this.ticksJSX
        };
        this.resize = this.handleResize.bind(this);

        // delay 200ms
        this.handleResizeDebounced = debounce(this.resize, 200);
    }

    componentDidMount() {
        this.$sliderList = [this.btnLeft, this.btnRight];
        this.$track = this.refs.track;
        if (this.props.showScale) {
            this.$ticks = this.refs.scale.querySelectorAll('.divide');
        }
        // 调用更新函数，目的是获得渲染后滑块的宽度和容器的宽度，并更新相应的逻辑，之前初始化的是一个不准确的默认值。
        this.refreshBoth(this.props);

        // 函数去抖（与节流相对）
        window.addEventListener('resize', this.handleResizeDebounced, false);
    }

    componentWillReceiveProps(nextProps) {
        const { step, min, max, round, scaleFormat, isSingle, showScale, scalePosition, directionSensitivity } = this.props;

        // 一些影响范围较大的受控属性发生改变，需更新组件相应状态
        if (nextProps.round !== round
            || nextProps.max !== max
            || nextProps.min !== min
            || nextProps.step !== step
            || nextProps.isSingle !== isSingle
            || nextProps.scaleFormat !== scaleFormat
            || nextProps.scalePosition !== scalePosition
            || nextProps.directionSensitivity !== directionSensitivity
            || nextProps.showScale !== showScale) {
            this.refreshBoth(nextProps);
        }
    }

    componentWillUpdate(nextProps) {
        // 滑到nextProps.value对应的位置；附带效果：当父组件不触发value更新时，value不变，此时可回归原位
        const value = nextProps.value,
            newValue = typeof value === 'number' ? [value, value] : value;
        this.rangeCore.syncFromState(newValue);
        this.setCssTransX(this.rangeCore.getTransXList(), this.$sliderList);
    }

    componentDidUpdate() {
        // 当标签从“不显示”切换到“显示”时，如果在componentWillReceiveProps中，节点还未更新，
        // 就不能更新此时的节点引用，此时this.$ticks为空，于是可在componentDidUpdate中更新。
        if (this.props.isSingle) {
            this.btnRight = undefined;
            this.$sliderList = [this.btnLeft];
        } else {
            this.$sliderList = [this.btnLeft, this.btnRight];
        }
        if (this.props.showScale) {
            this.$ticks = this.refs.scale.querySelectorAll('.divide');
            this.toggleTicks();
        }
    }

    componentWillUnmount() {
        this.handleResizeDebounced.cancel();
        window.removeEventListener('resize', this.handleResizeDebounced);
    }

    setCssTransX(transXList, domList = this.$sliderList) {
        [].concat(domList).forEach((dom, index) => {
            if (dom) {
                dom.style.WebkitTransform = `translateX(${transXList[index]}px)`;
                dom.style.transform = `translateX(${transXList[index]}px)`;
            }
        });
    }

    refreshBoth(props) {
        this.rangeCore.validateProps(props);
        this.refreshTrackLength();
        this.refreshCore(props, this.trackLength);
        this.refreshTicks(props);
        const { btnLeft, btnRight } = this.rangeCore.exportedValue;
        this.setCssTransX(this.rangeCore.getTransXList(), this.$sliderList);
        this.props.onChange(props.isSingle ? btnLeft : [btnLeft, btnRight]);
    }

    refreshCore(props = this.props, trackLength = this.trackLength) {
        const { min, max, value, round, isSingle, step, directionSensitivity } = props;
        const newValue = typeof value === 'number' ? [value, value] : value;
        this.rangeCore.refresh(step, trackLength || 292, isSingle, [min, max], newValue, round, directionSensitivity);
    }

    refreshTrackLength() {
        const width = this.$track.clientWidth,
            diam = this.btnLeft.clientWidth,
            trackLength = width - parseInt(diam, 10) || 292;
        this.trackLength = trackLength;
    }

    refreshTicks(props, init = false) {
        const { max, min, scaleFormat, showScale } = props,
            step = props.step || (max - min) / this.trackLength,
            scaleGapNum = parseInt(Math.round((max - min) / step), 10),
            decimalNum = this.rangeCore.decimalLenOfValue,
            ticksValue = !showScale ? [] : getArrayByLength(scaleGapNum + 1).fill(1)
                    .map((_, index) => parseFloat(parseFloat(min + index * step).toFixed(decimalNum))),
            ticksText = ticksValue.map((scale, index) => scaleFormat(scale, index)),
            ticksJSX = this.renderTicks(ticksText);

        this.ticksJSX = ticksJSX;
        if (!init) {
            this.setState({ ticksJSX });
        }
    }

    toggleTicks() {
        const { btnLeft, btnRight } = this.rangeCore.exportedIndex,
            className = activeClass;
        this.activeIndex.left = btnLeft;
        this.activeIndex.right = btnRight;

        const min = btnLeft,
            max = this.props.isSingle ? btnLeft : btnRight,
            scaleList = this.$ticks,
            len = scaleList.length;
        for (let i = 0; i < len; i++) {
            if ((i >= min) && (i <= max)) {
                scaleList[i].classList.add(className);
            } else {
                scaleList[i].classList.remove(className);
            }
        }
    }

    toggleAnimationClass(action = 'add', domList = this.$sliderList) {
        const className = transitionClass;
        [].concat(domList).forEach(dom => {
            if (dom) {
                if (action === 'add') {
                    dom.classList.add(className);
                } else {
                    dom.classList.remove(className);
                }
            }
        });
    }

    /**
     * @method resize
     * @description 当容器宽度改变时，可手动调用 resize 将滑块重置到正确的位置上，可通过ref得到的组件实例来调用（在组件上加个ref属性）。
     * 使用场景1：使用 popup 或者 modal 推出来，由于之前被 display: none 掉，无容器宽度，此时在组件展示的动画之前，在此组件的ref引用上调用此resize方法刷新位置即可。
     * @example
     * this.refs.range.resize();
     */
    // this.resize = this.handleResize.bind(this);
    handleResize() {
        this.toggleAnimationClass('remove');
        this.refreshBoth(this.props);
    }

    handleTouchStart(which, evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.props.disable) {
            return;
        }
        this.rangeCore.handleTouchStart(evt.touches[0].screenX, which);
        this.toggleAnimationClass('remove');

        if (this.props.onSliderTouchStart) {
            const transX = this.rangeCore.getTransXList(),
                translateX = this.props.isSingle ? transX[0] : transX;
            this.props.onSliderTouchStart(this.props.value, translateX, evt, which === 'btnLeft' ? 0 : 1);
        }
    }

    handleTouchMove(which, evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.props.disable) {
            return;
        }

        // 将 screenX 输入数字化模型，计算两个滑块的 translateX 、value 和 index
        this.rangeCore.handleTouchMove(evt.touches[0].screenX, which);

        const { btnRight, btnLeft } = this.rangeCore.exportedValue,
            value = this.props.isSingle ? btnLeft : [btnLeft, btnRight],
            transX = this.rangeCore.getTransXList();

        // 导出 translateX，设置 css，以及高亮相应刻度
        this.setCssTransX(transX, this.$sliderList);
        if (this.props.showScale) {
            this.toggleTicks();
        }

        // touchMove 回调
        if (this.props.onSliderTouchMove) {
            const translateX = this.props.isSingle ? transX[0] : transX;
            this.props.onSliderTouchMove(value, translateX, evt, which === 'btnLeft' ? 0 : 1);
        }
    }

    handleTouchEnd(which, evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.props.disable) {
            return;
        }
        this.toggleAnimationClass('add');
        this.rangeCore.handleTouchEnd(which);

        // 导出 滑块当前位置 所代表的 value，以及对应的tanslateX
        const { btnLeft, btnRight } = this.rangeCore.exportedValue,
            value = this.props.isSingle ? btnLeft : [btnLeft, btnRight],
            transX = this.rangeCore.getTransXList(),
            translateX = this.props.isSingle ? transX[0] : transX;

        // touchEnd 回调
        if (this.props.onSliderTouchEnd) {
            this.props.onSliderTouchEnd(value, translateX, evt, which === 'btnLeft' ? 0 : 1);
        }

        // 如果当父组件在onChange回调中没有触发value更新时，此时无生命周期触发，则无法将滑块回归到当前value对应的位置上。
        // 调用this.forceUpdate()，可强制触发一个生命周期，进而通过componentWillUpdate可使滑块回归到value对应的位置上。
        // this.forceUpdate();
        this.forceUpdate();
        this.props.onChange(value);
    }

    renderTicks(ticksText) {
        const len = ticksText.length;
        return ticksText.map((value, index) => {
            const cssObj = (index === 0 || index === len - 1) ? {} : { left: `${index * 100 / (len - 1)}%` };
            return (
                <li
                    className="divide"
                    key={`t${index}`}
                    style={cssObj}
                >
                    {value}
                </li>
            );
        });
    }

    renderSlider(which = 'btnLeft') {
        return (
            <span
                ref={dom => {
                    this[which] = dom;
                }}
                onTouchStart={evt => this.handleTouchStart(which, evt)}
                onTouchMove={evt => this.handleTouchMove(which, evt)}
                onTouchEnd={evt => this.handleTouchEnd(which, evt)}
                className="thumb"
            />);
    }

    render() {
        const { scalePosition } = this.props,
            ticksJSX = this.props.showScale && this.state.ticksJSX,
            scaleJSX = this.props.showScale && (<ul className="scale" ref="scale">{ticksJSX}</ul>);
        return (
            <div
                className={classNames('yo-range', this.props.extraClass)}
            >
                {scalePosition === 'top' && scaleJSX}
                <div className="track" ref="track">
                    {this.sliderLeftJSX}
                    {!this.props.isSingle && this.sliderRightJSX}
                </div>
                {scalePosition === 'bottom' && scaleJSX}
            </div>
        );
    }
}

Range.propTypes = propTypes;
Range.defaultProps = RangeDefaultProps;
