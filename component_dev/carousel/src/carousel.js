/**
 * @component Carousel
 * @version 3.0.8
 * @description 走马灯组件
 * 支持用户自定义动画对象，支持用户自定义css动画
 * 支持用户自定义子节点
 *
 * 默认动画：
 * + 横向滚动动画
 * + 为当前页加上on的类名，因此可以附加css动画效果。
 *
 * 默认走马灯子节点：
 * + 支持图片懒加载
 * + 图片加载失败的替换图模板
 *
 * 查看Demo获得实例：
 * 使用自定义动画实现图片查看器
 * 内置动画配合css动画效果
 *
 * 使用注意：
 * - `Carousel`组件的父节点需要有宽度，`Carousel`组件默认宽度为‘100%’，如果父节点没有宽度会导致默认滚动动画失效。
 * - `Carousel`组件不能直接嵌套在`Touchable`组件中，请使用`CarouselItem`的`onTap`来给它的Item绑定tap事件回调，
 * 或者用`Touchable`组件包裹Item。
 * @author eva.li
 * @instructions {instruInfo: ./carousel.md}{instruUrl: carousel/index.html?hideIcon}
 */


import React, { Component, PropTypes } from 'react';
import aniScrollX from './aniScrollx.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CarouselItem from './carouselItem';
import CarouselLocat from './carouselLocat';

class Carousel extends Component {
    static propTypes = {
        /**
         * @property dots
         * @type Bool
         * @default true
         * @description 是否使用默认坐标展示，详细可以查看demo基础用法展示。
         */
        dots: PropTypes.bool,
        /**
         * @property autoplay
         * @type Bool
         * @default true
         * @description 是否自动换页。
         */
        autoplay: PropTypes.bool,
        /**
         * @property loop
         * @type Bool
         * @default true
         * @description 是否循环 循环防范受动画影响，因此循环的具体方案由动画对象提供。
         */
        loop: PropTypes.bool,
        /**
         * @property beforeChange
         * @type Function
         * @param {num} 变化后页面索引
         * @description 页面切换前提供的回调函数，索引值在carousel.children中设置从1开始。
         */
        beforeChange: PropTypes.func,
        /**
         * @property afterChange
         * @type Function
         * @param {num} 变化后页面索引
         * @description 页面切换后提供的回调函数，索引值在carousel.children中设置从1开始。
         */
        afterChange: PropTypes.func,
        /**
         * @property extraClass
         * @type String
         * @description 为组件根节点提供额外的class。
         */
        extraClass: PropTypes.string,
        /**
         * @property delay
         * @type Number
         * @description 自动播放时动画间隔，单位为s，因动画的实现方式而不同。
         */
        delay: PropTypes.number,
        /**
         * @property speed
         * @type Number
         * @description 动画播放速度，单位为s,因动画的实现方式而不同。
         */
        speed: PropTypes.number,
        /**
         * @property defaultPage
         * @type Number
         * @description 组件渲染时起始页面。
         */
        defaultPage: PropTypes.number,
        /**
         * @property aniSpeed
         * @type Number
         * @description 如果使用css动画，该值为动画播放时间，用于在滚动循环时计算动画时机。
         */
        aniSpeed: PropTypes.number,
        /**
         * @property aniObj
         * @type Object
         * @description 自定义动画对象，自定义动画需要提供以下方法。
         *
         * - handleData（aniObj, children）用于组件渲染前对于子节点的处理；
         * - touchstart(aniObj) 动画处理的touchstart事件；
         * - touchmove(aniObj) 动画处理的touchmove事件；
         * - touchend(aniObj) 动画处理的touchend事件；
         * - touchcancel(aniObj)动画处理的touchcancel事件；
         * - next(aniObj) 下一帧 需返回动画结束后的当前索引；
         * - arrive（aniObj,num) 跳转；
         * - prev(aniObj) 上一帧 动画结束后的当前索引；
         *
         * carousel组件提供了两种自定义动画，使用者可以按需引用：
         * + aniCss动画使用改变Index层级的方式来展示当前页面。
         * + aniInfinate动画用有限的节点数（3个）渲染无限数量节点，其实现类似于list组件infinte模式，相较于默认动画实现减少了dom节点的数量，增加了dom操作的次数，适用于实现图片查看器等dom节点多的场景。
         *
         * **aniObj格式**
         *
         * ```
         * {
         *    aniSpeed:0,
         *    containerDOM: ul.cont, //节点
         *    delay: 1,
         *    loop: true,
         *    operationTimer: 5, //操作数动画运动的绝对值，交由动画控制
         *    pageNow: 5,
         *    speed: .5,
         *    stageDOM: div,
         *    width: 375 //这里需注意宽度在组件mount后才有
         *    touchstartLocation:e
         *    touchendLocation:e
         *    touchmoveLocation:e
         * }
         * ```
         */
        aniObj: PropTypes.object,
        /**
         * @property children
         * @type Element
         * @description carousel的展示内容。
         */
        children: PropTypes.array.isRequired
    }
    static defaultProps = {
        dots: true,
        autoplay: true,
        loop: true,
        effect: 'scrollX',
        delay: 1.5,
        speed: 0.5,
        defaultPage: 1,
        aniSpeed: 0,
        beforeChange() {
        },
        afterChange() {
        }
    }
    static childContextTypes = {
        /**
         * @property currentPage
         * @type PropTypes.number
         * @description 子组件通过context获取到currentPage，currentPage表示当前展示的page索引。
         */
        currentPage: PropTypes.number,
        /**
         * @property pagesNum
         * @type PropTypes.number
         * @description 子组件通过context获取到pagesNum，pagesNum表示carousel组件children的数量。
         */
        pagesNum: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.dragDom = null;
        this.dragEvt = null;
    }

    getChildContext() {
        return {
            currentPage: this.state.page,
            pagesNum: this.props.children.length
        };
    }

    componentWillMount() {
        this.ani = Object.assign({}, this.props.aniObj || aniScrollX());
        this.aniObj = {
            delay: this.props.delay,
            speed: this.props.speed,
            pageNow: 1,
            pagesNum: this.props.children.length,
            aniSpeed: this.props.aniSpeed,
            loop: this.props.loop,
            operationTimer: 0,
            touchstartLocation: {},
            touchendLocation: {}
        };
    }

    componentDidMount() {
        this.aniObj.stageDOM = this.widgetDOM.parentNode;
        this.aniObj.width = this.widgetDOM.clientWidth;
        this.aniObj.containerDOM = this.widgetDOM.querySelector('.cont');
        this.arrive(this.props.defaultPage, false);
        this.launchAuto();
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillReceiveProps(props) {
        this.aniObj.delay = props.delay;
        this.aniObj.speed = props.speed;
        this.aniObj.pagesNum = props.children.length;
        this.aniObj.aniSpeed = props.aniSpeed;
        this.aniObj.loop = props.loop;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.page !== this.state.page) {
            this.props.beforeChange(nextState.page);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.props.afterChange(this.state.page);
        }
        if (prevProps.autoplay !== this.props.autoplay || prevProps.loop !== this.props.loop) {
            this.pause();
            this.play();
        }
    }

    componentWillUnmount() {
        this.pause();
        window.removeEventListener('resize', this.handleResize);
    }
    /**
     * @description 当元素容器宽度发生变化时调用，用于重设组件内容器 `translate` 的值
     * @method handleResize
     * @version 3.0.8
     */
    handleResize() {
        this.aniObj.width = this.widgetDOM.clientWidth;
        this.arrive(this.state.page, false);
        this.forceUpdate();
    }
    /**
     * @description 到达方法
     * @method arrive
     * @param  {number} num 到达的页数
     * @param {isAni} boolean 是否需要动画
     */
    arrive(num, isAni = false) {
        this.aniObj.operationTimer = num - 1;
        this.pause();
        if (num > 0 && num <= React.Children.count(this.props.children)) {
            const page = this.ani.arrive(this.aniObj, num, isAni);
            this.setState({
                page
            });
            this.aniObj.pageNow = page;
        }
        this.play();
    }

    launchAuto() {
        if (this.autoplay) {
            window.clearInterval(this.autoplay);
        }
        if (this.props.autoplay &&
            (this.props.loop || this.aniObj.pageNow < this.aniObj.pagesNum)
        ) {
            this.autoplay = window.setInterval(() => {
                this.next();
            }, this.props.delay * 1000);
        }
    }

    format(children) {
        let childrenList = children;
        if (children[0].type === CarouselItem) {
            childrenList = React.Children.map(children,
            (childElement, index) => React.cloneElement(childElement, {
                index: index + 1
            })
            );
        }
        return this.ani.handleData(this.aniObj, childrenList);
    }

    // getEndX(distanceX) {
    //     let pageNow = this.aniObj.pageNow;
    //     if (Math.abs(distanceX) < 40) {
    //         return -(pageNow - 1);
    //     }
    //     if (distanceX > 0) {
    //         pageNow = pageNow - 2;
    //         this.aniObj.operationTimer --;
    //     } else {
    //         this.aniObj.operationTimer ++;
    //     }
    //     return -pageNow;
    // }
    /**
     * @method play
     * @description 播放动画
     */
    play() {
        this.launchAuto();
    }

    /**
     * @method pause
     * @description 暂停动画
     */
    pause() {
        if (this.autoplay) {
            window.clearInterval(this.autoplay);
        }
    }

    /**
     * @method prev
     * @description 播放上一页
     */
    prev() {
        this.aniObj.operationTimer--;
        const page = this.ani.prev(this.aniObj);
        this.setState({ page });
        this.aniObj.pageNow = page;
    }

    /**
     * @method next
     * @description 播放下一页
     */
    next() {
        this.aniObj.operationTimer++;
        const page = this.ani.next(this.aniObj);
        this.setState({ page });
        this.aniObj.pageNow = page;
        if (page >= this.aniObj.pagesNum && !this.props.loop) {
            this.pause();
        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        // e.stopPropagation();
        this.pause();
        this.aniObj.touchstartList = e.touches[0];
        this.aniObj.touchstartLocation = [e.touches[0].clientX, e.touches[0].clientY];
        this.ani.touchstart(this.aniObj);
    }

    handleTouchMove(e) {
        e.preventDefault();
        // e.stopPropagation();
        this.aniObj.touchmoveList = e.touches[0];
        this.aniObj.touchmoveLocation = [e.touches[0].clientX, e.touches[0].clientY];

        this.ani.touchmove(this.aniObj);
    }

    handleTouchEnd(e) {
        e.preventDefault();
        // e.stopPropagation();
        this.aniObj.touchendList = e.touches.length > 0 ?
            e.touches[0]
            : this.aniObj.touchmoveList;
        if (!this.aniObj.touchendList) {
            return;
        }
        this.aniObj.touchendLocation = [
            this.aniObj.touchendList.clientX,
            this.aniObj.touchendList.clientY
        ];
        this.aniObj.pageNow = this.ani.touchend(this.aniObj);
        this.setState({
            page: this.aniObj.pageNow
        });
        this.play();
        this.clearTouchList();
    }

    handleTouchCancle(e) {
        e.preventDefault();
        // e.stopPropagation();
        if (this.ani.touchcancel) {
            this.ani.touchcancel(this.aniObj);
            return;
        }
        this.aniObj.touchendList = this.aniObj.touchmoveList || this.aniObj.touchstartList;
        this.aniObj.touchendLocation = [
            this.aniObj.touchendList.clientX,
            this.aniObj.touchendList.clientY
        ];
        this.aniObj.pageNow = this.ani.touchend(this.aniObj);
        this.setState({
            page: this.aniObj.pageNow
        });
        this.clearTouchList();
    }

    clearTouchList() {
        Object.assign(this.aniObj, {
            touchstartList: [],
            touchmoveList: [],
            touchstartLocation: [],
            touchmoveLocation: [],
            touchendLocation: []
        });
    }

    render() {
        const classList = ['yo-carousel'];
        if (this.props.extraClass != null) {
            classList.push(this.props.extraClass);
        }
        let children = this.format(this.props.children);
        return (
            <div
                className={classList.join(' ')}
                ref={(node) => {
                    if (node) {
                        this.widgetDOM = node;
                    }
                }}
                onTouchStart={evt => {
                    this.handleTouchStart(evt);
                }}
                onTouchMove={evt => {
                    this.handleTouchMove(evt);
                }}
                onTouchEnd={evt => {
                    this.handleTouchEnd(evt);
                }}
                onTouchCancel={evt => {
                    // this.dragEvt.dragCancel(evt)
                    this.handleTouchCancle(evt);
                }}
            >
                <ul className={'cont'}>
                    {children}
                </ul>
                {
                    this.props.dots
                    ? <CarouselLocat num={this.aniObj.pagesNum} page={this.state.page} onItemTap={(num) => { this.arrive(num); }} />
                    : null
                }
            </div>
        );
    }

}
Carousel.CarouselItem = CarouselItem;
Carousel.Item = CarouselItem;

export default Carousel;
