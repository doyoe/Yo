/**
 * @component Carousel.CarouselItem
 * @description Carousel组件内部的Item组件，和普通的dom节点相比增加了懒加载图片功能。也可以使用`onTap`给Item绑定tap事件回调。
 *
 * 你可以通过Carousel.CarouselItem来使用这个组件，或者引用`yo3/component/carousel/src/carouselItem`的js模块来使用。
 *
 * ** 注意：`CarouselItem`不能和`Touchable`一起使用，请使用它的`onTap`属性来绑定事件回调。 **
 */
import './style.scss';
import '../../common/tapEventPluginInit';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

const ALLOWANCE = 1;
const LOADED = 1;
const UNLOAD = 0;
const FAIL = 2;
class CarouselItem extends Component {
    static propTypes = {
        /**
         * @type String
         * @property img
         * @description 图片地址。
         */
        img: PropTypes.string,
        /**
         * @type String
         * @property errorImg
         * @description 图片加载失败时的替换图片。
         */
        errorImg: PropTypes.string,
        /**
         * @type Function
         * @property checkImgFun
         * @description 目标图片onload时触发进行判断的函数。
         * @param 图片实例
         */
        checkImgFun: PropTypes.func,
        /**
         * @type Function
         * @property onTap
         * @param {e} 事件对象，传入组件数据
         * @description item点击事件处理函数。
         */
        onTap: PropTypes.func,
        /**
         * @property renderContent
         * @type Function
         * @param 图片实例
         * @description 当所需要的渲染内容不仅仅是一张图片的时候，通过此方法渲染内容，该方法的参数是经过懒加载判断的图片节点。
         * ** 示例 **
         * ```
         *  dataList.map((item, index)=>{
         *     return (<CarouselItem
         *         key={index + 1}
         *         {...item}
         *         renderContent={(img) => (
         *             <div className="unit">
         *                 {img}
         *                 <span>这是第{index}张图片</span>
         *             </div>
         *         )}
         *     ></CarouselItem>);
         * };
         * ```
         */
        renderContent: PropTypes.func,
        /**
         * @property extraClass
         * @type String
         * @description 为组件根节点提供额外的class。
         */
        extraClass: PropTypes.string,
        /**
         * @type Element
         * @property loadingEle
         * @description 图片加载时的loading Element。
         */
        loadingEle: PropTypes.element,
        /**
         * @type Bool
         * @property lazyload
         * @description 是否需要图片懒加载。默认值为true,当前图片的前后两个节点图片被加载。
         */
        lazyload: PropTypes.bool,
        /**
         * item是当前展示item的样式名
         * @type String
         * @property activeClass
         * @description item是当前展示item的样式名，默认值为'on'。
         */
        activeClass: PropTypes.string,
        index: PropTypes.number,
        style: PropTypes.object
    }
    static defaultProps = {
        errorImg: '//s.qunarzz.com/mobile_search_touch/intention-search-h5/loading.gif',
        loadingEle: null,
        lazyload: true,
        activeClass: 'on',
        onTap: () => {}
    }
    static contextTypes = {
        currentPage: React.PropTypes.number.isRequired,
        pagesNum: React.PropTypes.number.isRequired
    }
    constructor(props) {
        super(props);
        if (props.img) {
            this.state = {
                img: 0
            };
        }
        this.handleTap = this.handleTap.bind(this);
        this.hasUnmount = false;
    }

    componentWillMount() {
        this.lazyload(this.context.currentPage);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const propsChange = shallowCompare(this, nextProps, nextState);
        const contextChange = this.context.currentPage !== nextContext.currentPage || this.context.pagesNum !== nextContext.pagesNum;
        return propsChange || contextChange;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        this.lazyload(nextContext.currentPage);
    }

    componentWillUnmount() {
        this.hasUnmount = true;
    }

    handleTap(e) {
        this.props.onTap(e);
    }

    loadImg() {
        if (!this.props.img) {
            return;
        }
        this.imgNode = new Image();
        this.imgNode.onload = () => {
            let imgState;
            imgState = 1;
            if (this.props.checkImgFun && !this.props.checkImgFun(this.imgNode)) {
                imgState = 2;
            }
            if (!this.hasUnmount) {
                this.setState({
                    img: imgState
                });
            }
        };
        this.imgNode.onerror = () => {
            if (!this.hasUnmount) {
                this.setState({
                    img: 2
                });
            }
        };
        this.imgNode.src = this.props.img;
    }

    lazyload(currentPage) {
        if (this.state.img) {
            return;
        }
        if (!this.props.lazyload) {
            this.loadImg();
        } else {
            if (Math.abs(currentPage - this.props.index) <= ALLOWANCE
            || this.props.index === 1
            || this.props.index === this.context.pagesNum) {
                this.loadImg();
            }
        }
    }


    render() {
        let img = null;
        let classList;
        const activeClass = {};
        if (this.props.img) {
            switch (this.state.img) {
            case LOADED:
                img = <img alt="" src={this.props.img} className="img" draggable="false" />;
                break;
            case FAIL:
                img = <img alt="" src={this.props.errorImg} className="img" draggable="false" />;
                break;
            case UNLOAD:
            default:
                img = this.props.loadingEle;
                break;
            }
        }
        activeClass[this.props.activeClass] = this.context.currentPage === this.props.index;
        if (this.props.extraClass) {
            activeClass[this.props.extraClass] = true;
        }
        classList = classnames('item', activeClass);
        return (
            <li className={classList} style={this.props.style} onTouchTap={this.handleTap} >
                {this.props.renderContent ? this.props.renderContent(img) : img}
            </li>
        );
    }
}

export default CarouselItem;
