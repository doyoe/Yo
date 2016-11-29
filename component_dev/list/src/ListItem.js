/**
 * 列表项组件
 */
import React, { Component, PropTypes } from 'react';
import { replaceRedundantSpaces } from '../../common/util';
import Touchable from '../../touchable/src';

export default class extends Component {

    static propTypes = {
        item: PropTypes.object,
        listModel: PropTypes.object,
        itemTouchClass: PropTypes.func,
        itemExtraClass: PropTypes.func,
        scroller: PropTypes.object,
        onItemTouchStart: PropTypes.func,
        renderItem: PropTypes.func,
        i: PropTypes.number,
        onItemTap: PropTypes.func,
        onListItemUpdate: PropTypes.func
    };

    static childContextTypes = {
        offsetY: PropTypes.number,
        itemRef: PropTypes.object
    };

    static defaultProps = {
        onListItemUpdate() {
        }
    };

    /**
     * key和translateY在shouldComponentUpdate中会被使用
     * 将会根据nextProps.item中对应的值,来决定是否render
     * @param props
     */
    constructor(props) {
        super(props);
        this.key = props.item.key;
        this.translateY = props.item._translateY;
    }

    getChildContext() {
        return { offsetY: this.props.item._translateY, itemRef: this };
    }

    /**
     * 不定高的核心逻辑,在dom rendered以后更新对应列表项的定位信息,并渲染出下一个未经定位的列表项,直到填满visibleList的size
     */
    componentDidMount() {
        const { isHeightFixed } = this.props.listModel;

        // 不定高无穷列表的容器是flex-box的话, 浏览器会先渲染dom然后调整高度, 这时候取到的高度不准
        // setTimeout是无奈之举，确实没有想到更好的办法，因为这个调整高度的时机用js根本无法准确获取
        if (isHeightFixed) {
            this.updateItemHeightWhenDomRendered();
        } else {
            this.domNode.style.visibility = 'hidden';
            setTimeout(() => {
                this.updateItemHeightWhenDomRendered();
                this.domNode.style.visibility = 'visible';
            }, 250);
        }
    }

    /**
     * 根据之前的key和_translateY和接收到的props.item中的对应值,决定是否render
     * 使用者定义的shouldItemUpdate可以接收到shouldComponentUpdate的结果,并返回一个新的结果
     * @param nextProps
     * @returns {Bool}
     */
    shouldComponentUpdate(nextProps) {
        const { listModel, shouldItemUpdate } = nextProps;

        let ret = true;
        // 当容器内部item的key和translateY发生变化时重新render
        if (listModel.infinite &&
            this.key === nextProps.item.key &&
            this.translateY === nextProps.item._translateY) {
            ret = false;
        }

        this.key = nextProps.item.key;
        this.translateY = nextProps.item._translateY;

        if (shouldItemUpdate) {
            return shouldItemUpdate(ret, nextProps.item, this.props.item);
        }

        return ret;
    }

    componentDidUpdate() {
        this.updateItemHeightWhenDomRendered();
    }

    /**
     * 不定高模式的无穷列表需要在列表项渲染后更新它的位置信息
     */
    updateItemHeightWhenDomRendered() {
        const { item, listModel, onListItemUpdate } = this.props;

        if (!item._resolved
            && item._translateY !== undefined
            && listModel.infinite
            && !listModel.isHeightFixed) {
            listModel.resolveItem(item.key, this.domNode.offsetHeight);
        }

        onListItemUpdate(item, this.domNode);
    }

    render() {
        const {
            renderItem,
            item,
            onItemTap,
            i,
            listModel,
            itemTouchClass,
            itemExtraClass,
            onItemTouchStart
        } = this.props;
        const transform = `translate(0,${item._translateY}px) translateZ(0px)`;
        const basicProps = {
            ref: (dom) => {
                this.domNode = dom;
            },
            style: listModel.infinite ? {
                WebkitTransform: transform,
                transform,
                height: item.height
            } : null
        };
        const additionalProps = {
            className: replaceRedundantSpaces(
                `${itemExtraClass(item, item._index)} ${item._type !== 'groupTitle' ? 'item' : ''}`
            )
        };

        return (
            <Touchable
                internalUse={true}
                onTap={onItemTap}
                touchClass={itemTouchClass(item, item._index)}
                onTouchStart={evt => {
                    onItemTouchStart(item, item._index, evt);
                }}
            >
                <li {...Object.assign({}, basicProps, additionalProps)}>
                    {renderItem(item, item._index == null ? i : item._index)}
                </li>
            </Touchable>
        );
    }
}
