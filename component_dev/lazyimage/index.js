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
import { getElementOffsetY } from '../common/util';

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
        isScroller: PropTypes.bool
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
        const { defaultImage } = props;
        // 0->等待load,1->loading,2->loaded
        this.loading = 0;
        this.state = {
            src: defaultImage
        };
    }

    componentDidMount() {
        this.canLoadImage = true;
        this.offsetY = this.context.offsetY;
        this.itemRef = this.context.itemRef;
        const scroller = this.context.list || this.context.scroller;
        if (this.context.scroller) {
            this.offsetTop = getElementOffsetY(this.img);
            this.height = this.img.offsetHeight;
        }

        if (scroller) {
            scroller.childLazyImages.push(this);
        }
    }

    // 父组件render时,需要重置这个组件的loaded状态和context
    componentWillReceiveProps(nextProps, nextContext) {
        this.loading = 0;
        this.offsetY = nextContext.offsetY;
        this.itemRef = nextContext.itemRef;
        if (this.context.scroller) {
            this.offsetTop = getElementOffsetY(this.img);
        }

        if (nextProps.src !== this.props.src) {
            this.setState({ src: nextProps.defaultImage });
        }
    }

    componentWillUnmount() {
        const scroller = this.context.list || this.context.scroller;
        if (scroller) {
            scroller.childLazyImages.splice(scroller.childLazyImages.indexOf(this), 1);
        }
        this.canLoadImage = false;
    }

    load(callback) {
        if (this.loading === 0) {
            const { src } = this.props,
                tmpImg = new Image();
            this.loading = 1;
            tmpImg.onload = () => {
                // 在lazyimage正在加载时组件unmount(主要是在SPA模式下有可能发生关闭view的情况)会报错
                // 因此这里需要简单判断一下组件的实例是否还存在
                if (this && this.canLoadImage) {
                    this.loading = 2;
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
        const { width, height, style, className, customAttr, alt, title } = this.props;
        // 解决和touchable组件结合使用的问题，必须能够接收这四个属性
        const { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel } = this.props;

        if (this.context.list) {
            if (height == null && style.height == null) {
                throw Error('yo-lazyimage: 在List组件中使用LazyImage必须指定图片的高度。');
            }
        }

        return (
            <img
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchCancel}
                alt={alt}
                title={title}
                ref={(img) => {
                    if (img) this.img = img;
                }}
                src={this.state.src}
                width={width}
                style={style}
                height={height}
                className={className}
                {...customAttr}
            />
        );
    }
}
