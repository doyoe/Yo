/**
 * @component GroupList
 * @version 3.0.0
 * @description 分组列表组件，继承了List的大部分特性。
 *
 * 为列表数据提供分组展示形式，每个组有一个标题，在滚动时当前组的标题有吸顶效果。
 *
 * 同样支持无穷模式（指定高度和未知高度）。
 *
 * 提供分组导航（参考常见的字母导航），但是不定高的无穷列表模式无法使用。
 *  @instructions {instruInfo: ./grouplist.md}{instruUrl: grouplist.html?hideIcon}
 * @author jiao.shen
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import List from '../../list/src';
import GroupCore from './GroupCore';
import {
    inheritProps,
    DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT
} from '../../common/util';
import classNames from 'classnames';
import IndexNavBar from './IndexNavBar';
import './style.scss';

const propTypes = {
    /**
     * @property dataSource
     * @type Array/Immutable List
     * @default null
     * @description 组件的数据源，每个元素必须有groupKey属性(String)，如果是不需要分组的元素，groupKey属性为'notGrouped'。
     *
     * 示例:
     * ```
     * [
     *   {
     *     text: String //如果传入了这个属性并且没有配置renderItem，会以text文本作为列表项的内容
     *     groupKey: String //列表项的groupKey，将根据这个属性对元素进行分组，如果是不需要分组的元素,应设置为'notGrouped'。
     *   },
     *   ...
     * ]
     * ```
     */
    dataSource: PropTypes.oneOfType([PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            groupKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    ), PropTypes.object]).isRequired,
    /**
     * @property sort
     * @type Function
     * @default null
     * @param {String} a 两个title之中在前面的那个
     * @param {String} b 两个title之中在后面的那个
     * @description 组的排序规则，使用方式与array.sort相同，能够接受两个参数a和b，返回一个数字。
     * 负数表示a在b前，正数表示a在b后。
     */
    sort: PropTypes.func,
    /**
     * @property renderGroupTitle
     * @type Function
     * @default (groupKey)=>groupKey
     * @param groupKey {String} title对应的groupKey
     * @description 根据groupKey渲染group title。
     */
    renderGroupTitle: PropTypes.func,
    /**
     * @property renderGroupItem
     * @type Function
     * @param {Object} item 列表项数据
     * @param {Number} index 在数据源中的index
     * @default item=>item.text
     * @description 根据列表项数据渲染列表项，返回JSX或者字符串，默认会返回数据对象的text(如果定义了的话)。
     */
    renderGroupItem: PropTypes.func,
    /**
     * @property staticSection
     * @type Element
     * @default null
     * @version 3.0.3
     * @description 在所有列表项之上渲染的一块静态区域，在开启Infinite模式时，这块区域不会参与列表项的回收复用。
     * 注意：在设置staticSection以后，你还必须设置staticSectionHeight属性指定它的高度。
     */
    staticSection: PropTypes.element,
    /**
     * @property staticSectionHeight
     * @type Number
     * @version 3.0.3
     * @default 0
     * @description 静态区域的高度，在设置了staticSection以后必须为它指定一个高度。
     */
    staticSectionHeight: PropTypes.number,
    /**
     * @property showIndexNavBar
     * @type Bool
     * @default false
     * @description 是否显示分组导航。
     */
    showIndexNavBar: PropTypes.bool,
    /**
     * @property infinite
     * @type Bool
     * @default false
     * @description 是否使用无穷列表模式(参考List的无穷列表模式)。
     */
    infinite: PropTypes.bool,
    /**
     * @property infiniteSize
     * @type Number
     * @default 30
     * @description 无穷列表模式中，保留在容器中列表项的数量。
     * 由于grouplist中列表项的高度一般较小，因此默认值为30。
     */
    infiniteSize: PropTypes.number,
    /**
     * @property itemHeight
     * @type Number
     * @default null
     * @description 无穷列表模式下列表项的高度。
     */
    itemHeight: PropTypes.number,
    /**
     * @property titleHeight
     * @type Number
     * @default 25
     * @description group title的高度，使用infinite模式时通过这个属性设置title项的高度，参见List的无穷列表模式。
     */
    titleHeight: PropTypes.number,
    /**
     * @property titleOffset
     * @type Number
     * @default 0,
     * @description group title吸顶容器距离默认位置（top:0）的偏移。当你不希望吸顶容器处在GroupList的顶部时，可以设置这个属性。
     * @version 3.0.6
     */
    titleOffset: PropTypes.number,
    /**
     * @property itemExtraClass
     * @type String/Function
     * @default null
     * @param {Object} item 列表项数据对象
     * @param {Number} index 在数据源中的偏移
     * @description grouplist列表项的extraClass，使用方式参考List的itemExtraClass属性。
     *
     * 注意:这个属性的值/结果会完全覆盖掉默认的className。
     */
    itemExtraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @property groupTitleExtraClass
     * @type String
     * @default null
     * @param {String} groupKey 分组名
     * @description grouptitle的extraClass，可以是字符串或者函数，如果传入函数，可以接收一个参数，为当前元素的groupKey。
     *
     * 注意:这个属性的值/返回的结果会完全覆盖掉默认的className而不是追加。
     */
    groupTitleExtraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @property offsetY
     * @type Number
     * @default 0
     * @description 列表的初始位置。
     */
    offsetY: PropTypes.number,
    /**
     * @property onItemTap
     * @type Function
     * @default ()=>{}
     * @param {Object} item 列表项数据对象
     * @param {Number} index 在数据源中的偏移
     * @param {element} target 当前event对象的target
     * @description 点击列表项时触发的事件回调，接受的参数和使用方式与List相同。
     */
    onItemTap: PropTypes.func,
    /**
     * @property itemTouchClass
     * @type String/Function
     * @param {Object} item 列表项数据对象
     * @param {Number} index 在数据源中的偏移
     * @default item-light
     * @description 列表项被点击时附加的className，参见List同名属性。
     */
    itemTouchClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @property usePullRefresh
     * @type Bool
     * @description 是否使用下拉刷新。
     */
    usePullRefresh: PropTypes.bool,
    /**
     * 下拉刷新高度
     *
     * @property pullRefreshHeight
     * @type Number
     * @description 触发下拉刷新状态的高度（一般即为下拉刷新提示区域的高度）。
     * @default 40
     */
    pullRefreshHeight: PropTypes.number,
    /**
     * 下拉刷新渲染函数
     *
     * @property renderPullRefresh
     * @type Function
     * @returns {JSX} 用来渲染 pullRefresh 的 JSX
     * @description () => JSX
     *
     * 自定义的下拉刷新渲染函数。
     */
    renderPullRefresh: PropTypes.func,
    /**
     * @property onRefresh
     * @type Function
     * @param {Array} dataSource 当前数据源
     * @description 下拉刷新回调。
     */
    onRefresh: PropTypes.func,

    /**
     * @property useLoadMore
     * @type Bool
     * @description 是否开启加载更多功能。
     */
    useLoadMore: PropTypes.bool,
    /**
     * @property onLoad
     * @type Function
     * @description 加载更多触发时的回调函数。
     */
    onLoad: PropTypes.func,
    /**
     * 加载更多高度
     *
     * @property loadMoreHeight
     * @type Number
     * @description 触发加载更多状态的高度（一般即为加载更多提示区域的高度）。
     * @default 40
     */
    loadMoreHeight: PropTypes.number,
    /**
     * @property renderLoadMore
     * @type Function
     * @return JSX
     * @description 自定义加载更多区域的渲染方式，用返回的JSX节点取代原节点。
     */
    renderLoadMore: PropTypes.func,
    /**
     * @property onScroll
     * @type Function
     * @param {Number} offsetY 当前Scroller的y轴偏移量
     * @description Scroller滚动时触发的回调。
     */
    onScroll: PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @description 附加给组件根节点的额外className。
     */
    extraClass: PropTypes.string,
    /**
     * @property style
     * @type Object
     * @default null
     * @description 给GroupList容器节点绑定的额外样式。
     * @version 3.0.2
     */
    style: PropTypes.object,
    shouldItemUpdate: PropTypes.func,
    /**
     * @property onIndexNavBarItemHover
     * @type Function
     * @param groupKey {String} 当前手指盖住的navBarItem对应的groupKey
     * @description 在手指扫过分组导航的某一项时触发的回调
     */
    onIndexNavBarItemHover: PropTypes.func,
    /**
     * @property renderIndexNavBarItem
     * @type Function
     * @param {String/Number} groupKey
     * @default groupKey=>groupKey
     * @description 定制grouplist分组导航中每一项的render函数，接收groupkey为参数，返回字符串或者jsx
     */
    renderIndexNavBarItem: PropTypes.func,
    /**
     * @property disabled
     * @type Bool
     * @default false
     * @description 是否禁止滚动,参见Scroller的同名属性
     * @version 3.0.2
     */
    disabled: PropTypes.bool,
    /**
     * 方向锁定阈值
     *
     * @property directionLockThreshold
     * @type Number
     * @description 只允许单向滚动的时候，会根据这个阀值来判定响应哪个方向上的位移：某一方向位移减去另一个方向位移超过阀值，就会判定为这个方向的滚动。
     * @default 5
     * @version 3.0.2
     */
    directionLockThreshold: PropTypes.number,
    /**
     * @property deceleration
     * @type Number
     * @description 滚动视图开始惯性滚动时减速的加速度，默认为0.010。
     * @version 3.0.6
     */
    deceleration: PropTypes.number,
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
     * @skip
     * @property isTitleStatic
     * @description 内部属性，标题是否始终不render
     */
    isTitleStatic: PropTypes.bool,
    /**
     * @property stickyOffset
     * @type Number
     * @default 0
     * @description 给staticSection内部吸顶容器设置的y轴偏移。
     * @version 3.0.6
     */
    stickyOffset: PropTypes.number
};

const defaultProps = {
    // item高度,只在infinite模式下生效
    itemHeight: null,
    // 组标题的高度,只在infinite模式下生效
    titleHeight: 25,
    // 是否是无限列表
    infinite: false,
    // 无限列表内保留元素的数量,只在infinite模式下生效
    infiniteSize: 30,
    // 自定义title renderer
    renderGroupTitle(groupKey) {
        return groupKey;
    },
    // 定义item renderer
    renderGroupItem(item) {
        return typeof item.get === 'function' ? item.get('text') : item.text;
    },
    // 自定义className
    extraClass: '',
    // 是否展示关键字导航栏
    showIndexNavBar: false,
    // 自定义关键字导航栏item renderer
    renderIndexNavBarItem(groupKey) {
        return groupKey;
    },
    groupTitleExtraClass: '',
    offsetY: 0,
    onItemTap: null,
    sort: null,
    itemTouchClass: 'item-touch',
    usePullRefresh: false,
    useLoadMore: false,
    onRefresh() {
    },
    itemExtraClass: '',
    onIndexNavBarItemHover() {
    },
    onScroll() {
    },
    shouldItemUpdate() {
        return false;
    },
    disabled: false,
    style: null,
    scrollWithoutTouchStart: false,
    staticSection: null,
    isTitleStatic: false,
    titleOffset: 0
};

export default class GroupList extends Component {

    /**
     * state中维护了处理过的dataSource(加入了title数据)和groupTitle的列表
     * @param props
     */
    constructor(props) {
        super(props);
        const {
            dataSource,
            itemHeight,
            titleHeight,
            sort,
            infinite,
            isTitleStatic,
            titleOffset
        } = this.props;
        this.groupModel = new GroupCore({
            dataSource,
            itemHeight,
            titleHeight,
            sort,
            infinite,
            isTitleStatic,
            titleOffset
        });
        this.state = {
            dataSource: this.groupModel.dataSource,
            groupTitles: this.groupModel.groupTitles
        };
    }

    componentDidMount() {
        // 获取stickyHeader的display值
        this.groupModel
            .registerEventHandler('refreshStickyHeader', (stickyHeader) => {
                if (stickyHeader.title) {
                    // sticky header的更新并没有采取setState的形式,因为在低端手机上render的性能很差
                    // 而这个操作触发频率很高,因此直接改变dom属性
                    const { groupKey } = stickyHeader.title,
                        { offset } = stickyHeader,
                        transform = `translate(0px,${offset}px) translateZ(0px)`,
                        groupTitle = this.props.renderGroupTitle(stickyHeader.title.groupKey),
                        { groupTitleExtraClass } = this.props;

                    if (typeof groupTitle === 'string' || typeof groupTitle === 'number' || groupTitle === null) {
                        this.stickyHeader.innerHTML = groupTitle;
                    } else {
                        ReactDOM.render(groupTitle, this.stickyHeader);
                    }

                    this.stickyHeader.style.tranform = transform;
                    this.stickyHeader.style.webkitTransform = transform;
                    this.stickyHeader.style.display = stickyHeader.title.display;
                    this.stickyHeader.className = `${(typeof groupTitleExtraClass === 'function' ?
                        groupTitleExtraClass(groupKey) : groupTitleExtraClass)} sticky label group-title`;
                } else {
                    this.stickyHeader.style.display = 'none';
                }
            })
            .registerEventHandler('refresh', (dataSource, groupTitles) => {
                this.setState({ dataSource, groupTitles });
            });

        if (this.groupModel.isHeightFixed) {
            this.refreshStaticSectionHeight();
            this.refreshStickyHeader();
        } else {
            setTimeout(() => {
                this.refreshStaticSectionHeight();
                this.refreshStickyHeader();
            }, DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dataSource, sort, infinite, titleHeight, titleOffset } = nextProps;
        this.groupModel.refresh({ dataSource, sort, infinite, titleHeight, titleOffset });

        setTimeout(() => {
            this.refreshStaticSectionHeight();
            this.refreshStickyHeader();
        }, 0);
    }

    /**
     * 根据offsetY调整stickyHeader的位置
     * @param offsetY
     */
    refreshStickyHeader(offsetY = this.groupModel.offsetY) {
        this.groupModel.offsetY = offsetY;
        this.groupModel.refreshStickyHeader(offsetY);
    }

    refreshStaticSectionHeight() {
        if (this.list.staticSectionContaienr != null) {
            this.groupModel.staticSectionHeight = this.list.staticSectionContaienr.offsetHeight;
        }
    }

    /**
     * 分组导航时调用,直接跳到目标分组的第一个元素
     * @param groupKey
     */
    scrollToGroup(groupKey) {
        this.stopAnimate();
        let targetOffsetY = -this.groupModel.getGroupOffsetY(groupKey);
        const maxScrollY = this.list.scroller.maxScrollY;
        targetOffsetY = targetOffsetY < maxScrollY ? maxScrollY : targetOffsetY;

        this.list.scrollTo(targetOffsetY, 0);
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
     * @description 调用List同名方法,滚动到某个位置y。
     * @method scrollTo
     * @param {Number} y y坐标
     * @param {Number} [time] 动画持续时间
     */
    scrollTo(y, time) {
        this.list.scrollTo(y, time);
    }

    /**
     * @description 调用List同名方法,中止正在执行的滚动。
     * @method stopAnimate
     */
    stopAnimate() {
        this.list.stopAnimate();
    }

    /**
     * @description 调用List同名方法,停止下拉刷新过程。
     * @method stopRefreshing
     * @param {Bool} [success] 下拉刷新是否成功
     */
    stopRefreshing(success) {
        this.list.stopRefreshing(success);
    }

    /**
     * @description 调用List同名方法,模拟下拉刷新过程。
     * @method startRefreshing
     */
    startRefreshing() {
        this.list.startRefreshing();
    }

    /**
     * @method stopLoading
     * @param {Bool} [success] 加载更多是否成功
     * @description 调用List同名方法,中止加载更多过程。
     */
    stopLoading(success) {
        this.list.stopLoading(success);
    }

    /**
     * 根据item._type渲染title/groupitem
     * @param item
     * @returns {*}
     */
    renderItem(item, index) {
        const { renderGroupTitle, renderGroupItem } = this.props;
        return item._type === 'groupTitle' ? renderGroupTitle(item.groupKey, index) : renderGroupItem(item.srcData, index);
    }

    render() {
        const {
            style,
            itemExtraClass,
            groupTitleExtraClass,
            extraClass,
            onItemTap,
            renderIndexNavBarItem,
            itemTouchClass,
            onRefresh,
            onIndexNavBarItemHover,
            onScroll,
            shouldItemUpdate,
            titleHeight,
            titleOffset
        } = this.props;
        // 不定高的无穷列表不能支持showIndexNavBar,因为无法定位到每一个item的_translateY
        const showIndexNavBar = this.props.showIndexNavBar && this.groupModel.isHeightFixed;
        const rootClassNames = classNames('yo-group', extraClass);
        const { dataSource, groupTitles } = this.state;
        // 包裹props中的onItemTap,这是因为grouplist的数据源中加入了title的数据
        // 在onItemTap时需要filter掉这些title
        const wrappedonItemTap = (item, index, target) => {
            if (onItemTap && item._type !== 'groupTitle') {
                onItemTap(item.srcData, index, target);
            }
        };
        // 同上
        const wrappedOnPullRefresh = (ds) => {
            onRefresh(ds.filter((item) => item._type !== 'groupTitle'));
        };
        const wrappedItemActiveClass = (item, index) => {
            let ret = null;
            if (item._type === 'groupTitle') {
                ret = null;
            } else {
                ret = typeof itemTouchClass !== 'function' ?
                    itemTouchClass : itemTouchClass(item.srcData, index);
            }
            return ret;
        };
        const wrappedItemExtraClass = (item, index) => {
            let ret = null;
            if (item._type === 'groupTitle') {
                ret = typeof groupTitleExtraClass !== 'function' ?
                    groupTitleExtraClass : groupTitleExtraClass(item.groupKey);
            } else {
                ret = typeof itemExtraClass !== 'function' ?
                    itemExtraClass : itemExtraClass(item.srcData, index);
            }
            return ret;
        };
        const wrappedShouldItemUpdate = (next, now) => {
            if (!(now._type === 'groupTitle' && next._type === 'groupTitle')) {
                return shouldItemUpdate(next.srcData, now.srcData);
            }
            return false;
        };

        return (
            <div className={rootClassNames} style={style}>
                <div
                    className="sticky label"
                    style={{ height: titleHeight, top: titleOffset, display: 'none' }}
                    ref={(dom) => {
                        if (dom) {
                            this.stickyHeader = dom;
                        }
                    }}
                />
                {showIndexNavBar ?
                    <IndexNavBar
                        list={groupTitles}
                        renderItem={renderIndexNavBarItem}
                        onNavItemFocus={(item) => {
                            this.scrollToGroup(item.groupKey);
                            onIndexNavBarItemHover(item.groupKey);
                        }}
                    /> : null}
                <List
                    {...inheritProps(this.props, [
                        'scrollWithoutTouchStart',
                        'directionLockThreshold',
                        'disabled',
                        'infinite',
                        'infiniteSize',
                        'offsetY',
                        'usePullRefresh',
                        'pullRefreshHeight',
                        'renderPullRefresh',
                        'useLoadMore',
                        'onLoad',
                        'renderLoadMore',
                        'loadMoreHeight',
                        'staticSection',
                        'deceleration',
                        'stickyOffset'
                    ])}
                    dataSource={dataSource}
                    extraClass="yo-scroller-fullscreen"
                    renderItem={(item, index) => this.renderItem(item, index)}
                    itemExtraClass={wrappedItemExtraClass}
                    shouldItemUpdate={wrappedShouldItemUpdate}
                    onScroll={(y, direction) => {
                        this.refreshStickyHeader(-y);
                        onScroll(y, direction);
                    }}
                    onListItemUpdate={(item, domNode) => {
                        this.groupModel.updateGroupTitle(item, domNode);
                    }}
                    onItemTap={wrappedonItemTap}
                    itemTouchClass={wrappedItemActiveClass}
                    ref={(list) => {
                        if (list) {
                            this.list = list;
                        }
                    }}
                    onRefresh={wrappedOnPullRefresh}
                />
            </div>
        );
    }
}

GroupList.propTypes = propTypes;
GroupList.defaultProps = defaultProps;
