/**
 * @component LazyImage
 * @author jiao.shen
 * @description 懒加载图片组件，只能在 `Scroller` 和 `List` 中使用。
 *
 * 使用这个组件代替img标签后，会延迟加载这个图片，直到List组件的滚动使得该图片位于可视区域之内。
 * @instructions {instruInfo: ./lazyimage.md}{instruUrl: scroller/lazyimage.html?hideIcon}
 * @version  3.0.2
 */
import React, { Component, PropTypes } from 'react';
import {
    getElementOffsetY,
    inheritProps
} from '../common/util';

const TO_BE_LOADED = 0;
const LOADING = 1;
const LOADED = 2;

export default class extends Component {
    static contextTypes = {
        // 从父组件context接收的属性
        // list/scroller组件实例的引用
        list: PropTypes.object,
        scroller: PropTypes.object,
        // listitem的offsetY(infinite模式下)
        offsetY: PropTypes.number,
        // listitem实例的引用
        itemRef: PropTypes.object,
        // 是否是Scroller下面的Lazyload,而不是List下面的
        isScroller: PropTypes.bool,
        // 是否是infinite列表
        infinite: PropTypes.bool
    };

    static propTypes = {
        /**
         * @property defaultImage
         * @type String
         * @default null
         * @description 默认图片，在原图片还没有完成加载时展示。
         */
        defaultImage: PropTypes.string,
        /**
         * @property src
         * @type String
         * @default null
         * @description 图片src，必需。
         */
        src: PropTypes.string.isRequired,
        /**
         * @property className
         * @type String
         * @default null
         * @description 给img标签加的类名。
         */
        className: PropTypes.string,
        /**
         * @property width
         * @type Number
         * @default null
         * @description 图片宽度。
         */
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * @property height
         * @type Number
         * @default null
         * @description 图片高度。
         */
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * @property customAttr
         * @type Object
         * @default null
         * @description 附加给img dom节点的自定义属性，属性名需要以data-开头。
         */
        customAttr: PropTypes.object,
        /**
         * @property style
         * @type Object
         * @default null
         * @description 附加给img dom节点的style。
         */
        style: PropTypes.object,
        /**
         * @property alt
         * @type String
         * @default null
         * @description 和img标签的alt属性相同。
         */
        alt: PropTypes.string,
        /**
         * @property title
         * @type String
         * @default null
         * @description 和img标签的title属性相同。
         */
        title: PropTypes.string,
        onTouchStart: PropTypes.func,
        onTouchMove: PropTypes.func,
        onTouchEnd: PropTypes.func,
        onTouchCancel: PropTypes.func
    };

    static defaultProps = {
        defaultImage: null,
        src: null,
        className: null,
        width: null,
        height: null,
        customAttr: {},
        style: null
    };

    constructor(props) {
        super(props);
        // 0->等待load,1->loading,2->loaded
        this.loading = TO_BE_LOADED;
        this.state = {
            src: this.props.defaultImage
        };
    }

    componentDidMount() {
        this.refresh(this.context);
        const scroller = this.context.list || this.context.scroller;
        if (scroller) {
            scroller.childLazyImages.push(this);
        }
    }

    // 父组件render时,需要重置这个组件的loaded状态和context
    componentWillReceiveProps(nextProps, nextContext) {
        this.refresh(nextContext);

        if (this.state.src !== nextProps.src) {
            this.loading = TO_BE_LOADED;
            this.setState({ src: this.props.defaultImage });
        }
    }

    componentWillUnmount() {
        const scroller = this.context.list || this.context.scroller;
        if (scroller) {
            scroller.childLazyImages.splice(scroller.childLazyImages.indexOf(this), 1);
        }
        this.canLoadImage = false;
    }

    refresh(context) {
        this.canLoadImage = true;
        this.offsetY = context.offsetY;
        this.itemRef = context.itemRef;
        this.infinite = context.infinite;
        // 如果不是infinite的列表，那么应该获取offsetTop(这个开销还挺大的，不过没得优化了)，反之，则使用translateY
        if (!this.infinite) {
            this.offsetTop = getElementOffsetY(this.img);
            this.height = this.img.offsetHeight;
        }
    }

    load(callback) {
        if (this.loading === TO_BE_LOADED) {
            const { src } = this.props,
                tmpImg = new Image();
            this.loading = LOADING;
            tmpImg.onload = () => {
                // 在lazyimage正在加载时组件unmount(主要是在SPA模式下有可能发生关闭view的情况)会报错
                // 因此这里需要简单判断一下组件的实例是否还存在
                if (this && this.canLoadImage) {
                    this.loading = LOADED;
                    this.setState({ src, loaded: true });
                    if (callback) {
                        callback();
                    }
                }
            };
            tmpImg.src = src;
        }
    }

    render() {
        const { height, style, customAttr } = this.props;
        // 解决和touchable组件结合使用的问题，必须能够接收这四个属性

        if (this.context.list) {
            if (height == null && style.height == null) {
                throw Error('yo-lazyimage: 在List组件中使用LazyImage必须指定图片的高度。');
            }
        }

        return (
            <img
                {...inheritProps(this.props, [
                    'onTouchStart',
                    'onTouchMove',
                    'onTouchEnd',
                    'onTouchCancel',
                    'width',
                    'height',
                    'className',
                    'title',
                    'style'
                ])}
                alt={this.props.alt}
                ref={(img) => {
                    if (img) this.img = img;
                }}
                src={this.state.src}
                {...customAttr}
            />
        );
    }
}
