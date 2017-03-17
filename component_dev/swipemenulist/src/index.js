/**
 * @component SwipeMenuList
 * @version 3.0.0
 * @description SwipeMenuList组件，使用List实现，列表项全部为SwipeMenu。
 *
 * @instructions {instruInfo: ./swipeMenuList.md}{instruUrl: swipemenulist.html?hideIcon}
 * @author jiao.shen
 */
import React, { Component, PropTypes } from 'react';
import List from '../../list/src';
import SwipeMenu from '../../swipemenu/src';
import './style.scss';

const noop = () => {
};

export default class SwipeMenuList extends Component {

    static propTypes = {
        /**
         * @property dataSource
         * @type Array/Immutable List
         * @default null
         * @description 组件数据源，数组类型，与`List`同名属性完全一致。
         */
        dataSource: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
            height: PropTypes.number,
            text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })), PropTypes.object]).isRequired,
        /**
         * @property getMenuConfig
         * @default null
         * @version 3.0.3
         * @type Function
         * @param {Object} item 列表项对应的数据对象
         * @param {Number} index 列表项在数据源中的index
         * @description 这个函数应该返回一个列表项菜单对应的SwipeMenu组件配置对象，
         * 可配置的属性请参考`SwipeMenu`组件。
         */
        getMenuConfig: PropTypes.func.isRequired,
        /**
         * @property renderItem
         * @type Function
         * @default null
         * @param {Object} item 列表项对应的数据对象
         * @param {Number} index 列表项在数据源中的index
         * @description 渲染列表项的函数，接受参数item(该项对应的数据源中的配置对象)，index(配置对象在数据源中的index)，返回JSX或者string
         * 作为SwipeMenu的内容
         */
        renderItem: PropTypes.func,
        /**
         * @property staticSection
         * @type Element
         * @default null
         * @version 3.0.3
         * @description 在所有列表项之上渲染的一块静态区域，在开启Infinite模式时，这块区域不会参与列表项的回收复用。
         */
        staticSection: PropTypes.element,
        /**
         * @property infinite
         * @type Bool
         * @default false
         * @description 是否开启无穷列表模式，参考List同名属性
         */
        infinite: PropTypes.bool,
        /**
         * @property infiniteSize
         * @type Bool
         * @default 20
         * @description 无穷列表模式中，设置保留在容器中的列表项数量，参考List同名属性
         */
        infiniteSize: PropTypes.number,
        /**
         * @property itemHeight
         * @type Number
         * @default null
         * @description 列表项高度，参考List同名属性
         */
        itemHeight: PropTypes.number,
        /**
         * @property itemExtraClass
         * @type Function
         * @default "item swipemenu-list-item"
         * @param {Object} item 列表项对应的数据对象
         * @param {Number} index 列表项在数据源中的偏移
         * @description 列表项class，可以传入函数/字符串，参考List同名属性
         */
        itemExtraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        /**
         * @property onItemTap
         * @type Function
         * @default null
         * @param {Object} item 列表项对应的数据对象
         * @param {Number} index 列表项在数据源中的偏移
         * @param {Array} dataSource 数据源
         * @description item点击事件回调，参考List同名属性。
         *
         * 注意:点击swipemenu的按钮区域以及菜单展开时不会触发这个事件。
         */
        onItemTap: PropTypes.func,
        /**
         * @property itemTouchClass
         * @type String/Function
         * @default item-touch
         * @param {Object} item 列表项对应的数据对象
         * @param {Number} index 列表项在数据源中的index
         * @description 列表项被点击时的className，可以接收字符串或者函数，使用方式与itemExtraClass一致。
         * @version 3.0.2
         */
        itemTouchClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        /**
         * @property extraClass
         * @type String
         * @default null
         * @description 给List容器dom添加的额外class
         */
        extraClass: PropTypes.string,
        /**
         * @property style
         * @type Object
         * @default null
         * @description 给组件容器节点绑定的额外样式
         * @version 3.0.2
         */
        style: PropTypes.object,
        /**
         * @property usePullRefresh
         * @type Bool
         * @default false
         * @description 是否开启下拉刷新
         */
        usePullRefresh: PropTypes.bool,
        /**
         * 下拉刷新高度
         *
         * @property pullRefreshHeight
         * @type Number
         * @description 触发下拉刷新状态的高度（一般即为下拉刷新提示区域的高度）
         * @default 40
         */
        pullRefreshHeight: PropTypes.number,
        /**
         * 下拉刷新渲染函数
         *
         * @property renderPullRefresh
         * @type Function
         * @returns {Element} 用来渲染 pullRefresh 的 JSX
         * @description
         *
         * 自定义的下拉刷新渲染函数
         */
        renderPullRefresh: PropTypes.func,
        /**
         * @property onRefresh
         * @type Function
         * @default null
         * @param {Array} dataSource 列表数据源
         * @description 下拉刷新完成回调
         */
        onRefresh: PropTypes.func,
        /**
         * @property useLoadMore
         * @type Bool
         * @default false
         * @description 是否开启加载更多
         */
        useLoadMore: PropTypes.bool,
        /**
         * 加载更多高度
         *
         * @property loadMoreHeight
         * @type Number
         * @description 触发加载更多状态的高度（一般即为加载更多提示区域的高度）
         * @default 40
         */
        loadMoreHeight: PropTypes.number,
        /**
         * 加载更多渲染函数
         *
         * @property renderLoadMore
         * @type Function
         * @returns {Element} 用来渲染 loadMore 的 JSX
         * @description
         * 自定义的加载更多渲染函数
         */
        renderLoadMore: PropTypes.func,
        /**
         * @property onLoad
         * @type Function
         * @default null
         * @param {Array} dataSource 列表数据源
         * @description 加载更多回调
         */
        onLoad: PropTypes.func,
        /**
         * @property offsetY
         * @type Number
         * @default 0
         * @description 列表初始Y轴偏移
         */
        offsetY: PropTypes.number,
        /**
         * @property onScroll
         * @type Function
         * @default null
         * @param {Number} offsetY y坐标
         * @description 列表滚动时触发的回调
         */
        onScroll: PropTypes.func,
        /**
         * @property shouldItemUpdate
         * @type Function
         * @default null
         * @param {Object} next 即将传给列表项组件的item对象
         * @param {Object} now 当前列表项组件对应的item对象
         * @description 绑定给列表项组件的shouldComponentUpdate，可以避免额外的render，用于提升列表的滚动性能。
         * 详情请参考List组件同名属性。
         */
        shouldItemUpdate: PropTypes.func,
        /**
         * @property deceleration
         * @type Number
         * @description 滚动视图开始惯性滚动时减速的加速度，默认为0.010。
         * @version 3.0.6
         */
        deceleration: PropTypes.number,
        onInfiniteAppend: PropTypes.func,
        /**
         * @property onMenuOpen
         * @type Function
         * @default ()=>{}
         * @param {Object} item 打开的菜单项对应的数据对象
         * @param {Number} index 打开的菜单项在dataSource中的index
         * @description 在某个菜单项打开的时候触发的回调函数。
         * @version 3.0.2
         */
        onMenuOpen: PropTypes.func,
        /**
         * @property onMenuClose
         * @type Function
         * @default ()=>{}
         * @param {Object} item 打开的菜单项对应的数据对象
         * @param {Number} index 打开的菜单项在dataSource中的index
         * @description 在某个菜单项关闭时触发的回调函数。
         * @version 3.0.2
         */
        onMenuClose: PropTypes.func,
        /**
         * @property scrollWithoutTouchStart
         * @type Bool
         * @default false
         * @description ** 实验中的属性 **
         * 在默认情况下一次用户触发（非调用scrollTo方法）scroller的滚动需要由touchstart事件来启动，在某些情况下，例如scroller从disable状态切换到enable状态时，
         * 可能不能接收到这一瞬间的touchstart事件，这可能导致用户期待的滚动过程没有发生。
         * 开启这个属性为true以后将允许scroller用touchmove启动滚动过程，这可以解决上述场景的问题。
         * @version 3.0.2
         */
        scrollWithoutTouchStart: PropTypes.bool,
        /**
         * @property stickyOffset
         * @type Number
         * @default 0
         * @description 给staticSection内部吸顶容器设置的y轴偏移。
         * @version 3.0.6
         */
        stickyOffset: PropTypes.number
    };

    static defaultProps = {
        renderItem(item) {
            return typeof item.get === 'function' ? item.get('text') : item.text;
        },
        infinite: false,
        infiniteSize: 20,
        itemHeight: null,
        itemExtraClass: 'swipemenu-list-item',
        extraClass: 'yo-list-absolute',
        onItemTap: noop,
        usePullRefresh: false,
        onRefresh: noop,
        useLoadMore: false,
        onLoad: noop,
        offsetY: 0,
        onInfiniteAppend: noop,
        onMenuOpen() {
        },
        onMenuClose() {
        },
        scrollWithoutTouchStart: false,
        staticSection: null,
        shouldItemUpdate() {
            return false;
        }
    };

    static childContextTypes = {
        swipeMenuList: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.swipeMenuList = [];
        // 当前打开的菜单index
        this.openIndex = -1;
        // 之前打开菜单的index,用来判断菜单的打开/关闭状态是否有变化
        this.cachedOpenIndex = -1;
        this.state = {
            dataSource: this.ds,
            openIndex: this.openIndex
        };
    }

    getChildContext() {
        return { swipeMenuList: this };
    }

    /**
     * 在render结束时重置缓存的上一个打开菜单的index，此时this.cachedOpenIndex===this.openIndex
     */
    componentDidUpdate() {
        this.cachedOpenIndex = this.openIndex;
    }

    /**
     * 在一个菜单被打开/关闭时触发，改变openIndex
     * @param index
     */
    updateOpenIndex(index) {
        // 保存当前的openIndex
        this.cachedOpenIndex = this.openIndex;
        // 更新openIndex
        // 此时this.cachedOpenIndex!==this.openIndex
        this.openIndex = index;
        this.setState({ openIndex: index });

        const { onMenuOpen, onMenuClose, dataSource } = this.props;
        const itemData = typeof dataSource.get === 'function' ? dataSource.get(index) : dataSource[index];
        if (index !== -1) {
            onMenuOpen(itemData, index);
        } else {
            const lastOpenedItemData = typeof dataSource.get === 'function' ? dataSource.get(this.cachedOpenIndex) : dataSource[this.cachedOpenIndex];
            onMenuClose(lastOpenedItemData, this.cachedOpenIndex);
        }
    }

    /**
     * @method refresh
     * @description 在GroupList容器尺寸发生变化时调用，刷新内部的Scroller组件。
     * @version 3.0.6
     */
    refresh() {
        if (this.list) this.list.refresh();
    }

    /**
     * @method resetLoadStatus
     * @param {Bool} hasLoadMore 是否能够加载更多，如果传入false，加载更多区域的文字将会变成 没有更多了，并且继续向下滚动时不会触发onLoadMore。
     * @description 重置加载更多功能。
     * @version 3.0.7
     */
    resetLoadStatus(hasLoadMore) {
        if (this.list) this.list.resetLoadStatus(hasLoadMore);
    }

    /**
     * @description 滚动到某个位置
     * @method scrollTo
     * @param {Number} y y坐标
     * @param {Number} [time] 动画持续时间
     */
    scrollTo(y, time) {
        if (this.list) this.list.scrollTo(y, time);
    }

    /**
     * @description 停止下拉刷新
     * @method stopRefreshing
     * @param {Bool} success 刷新成功/刷新失败
     */
    stopRefreshing(success) {
        if (this.list) this.list.stopRefreshing(success);
    }

    /**
     * @method startRefreshing
     * @description 模拟下拉刷新
     */
    startRefreshing() {
        if (this.list) this.list.startRefreshing();
    }

    /**
     * @method stopAnimate
     * @description 让列表立刻停止滚动。
     */
    stopAnimate() {
        if (this.list) this.list.stopAnimate();
    }

    /**
     * @description 停止加载更多
     * @method stopLoading
     * @param {Bool} success 加载成功/加载失败
     */
    stopLoading(success) {
        if (this.list) this.list.stopLoading(success);
    }

    /**
     * 关闭打开的菜单
     * 解锁Scroller
     */
    closeAll(i) {
        const swipeMenu = this.swipeMenuList[this.openIndex];
        if (swipeMenu) {
            if (i !== this.openIndex) {
                swipeMenu.close();
            }
            this.updateOpenIndex(-1);
        }
    }

    render() {
        const { renderItem, getMenuConfig, shouldItemUpdate } = this.props;

        return (
            <List
                {...this.props}
                // 如果有菜单被打开,锁定滚动
                disabled={this.openIndex !== -1}
                directionLockThreshold={3}
                ref={(list) => {
                    if (list) this.list = list;
                }}
                // 根据菜单打开/关闭状态是否有变化,决定是否需要render列表项
                shouldItemUpdate={(next, now) => {
                    if (this.props.infinite) {
                        return this.cachedOpenIndex !== this.openIndex || shouldItemUpdate(next, now);
                    }
                    return false;
                }}
                // 渲染列表项
                renderItem={(item, i) => {
                    const menuConfig = getMenuConfig(item, i);
                    const { action } = menuConfig;
                    // 重新包装action 菜单配置对象的tap方法,使其能够接收item,i,component为参数
                    action.forEach((actionObj) => {
                        const origTap = actionObj.onTap;
                        //  以包裹后的tap方法替换原有tap方法,为了tap能够拿到参数
                        //  binded标志可以防止重复绑定
                        if (!origTap.binded) {
                            actionObj.onTap = (component) => {
                                origTap(item, i, component);
                            };
                            actionObj.onTap.binded = true;
                        }
                    });
                    return (
                        <SwipeMenu
                            {...menuConfig}
                            ref={(component) => {
                                if (component) {
                                    this.swipeMenuList[i] = component;
                                }
                            }}
                            disable={this.openIndex !== -1 && i !== this.openIndex}
                            onOpen={() => this.updateOpenIndex(i)}
                            onClose={() => {
                                if (this.state.openIndex !== -1) {
                                    this.updateOpenIndex(-1);
                                }
                            }}
                            action={action}
                            extraClass="swipemenu-list-menu"
                        >
                            {renderItem(item, i)}
                        </SwipeMenu>
                    );
                }}
                onItemTap={(item, i, target) => {
                    // 只有在内容区域的点击才触发onItemTap
                    this.props.onItemTap(item, i, target);
                }}
                onItemTouchStart={(item, i, evt) => {
                    evt.preventDefault();

                    const currentTarget = evt.currentTarget;
                    const front = currentTarget.childNodes[0].childNodes[0];
                    const action = currentTarget.childNodes[0].childNodes[1];
                    let target = evt.target;
                    let touchInFront = target === front;
                    while (target !== front && target !== action) {
                        if (target == null) {
                            touchInFront = true;
                            break;
                        }
                        if (target.parentNode === front) {
                            touchInFront = true;
                            break;
                        }
                        if (target.parentNode === action) {
                            touchInFront = false;
                            break;
                        }
                        target = target.parentNode;
                    }

                    if (touchInFront) {
                        this.closeAll(i, evt);
                    }
                }}
            />
        );
    }
}