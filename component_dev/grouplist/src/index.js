/**
 * @component Grouplist
 * @version 3.0.0
 * @description 分组列表组件,继承了List的大部分特性。
 *
 * 为列表数据提供分组展示形式,每个组有一个标题,在滚动时当前组的标题有吸顶效果。
 *
 * 同样支持无穷模式(指定高度和未知高度)。
 *
 * 提供分组导航(参考常见的字母导航),但是不定高的无穷列表模式无法使用。
 *  @instructions {instruInfo: ./grouplist.md}{instruUrl: grouplist.html?hideIcon}
 * @author jiao.shen
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import List from '../../list/src';
import GroupCore from './GroupCore';
import { replaceRedundantSpaces } from '../../common/util';
import IndexNavBar from './IndexNavBar';
import './style.scss';

const propTypes = {
    /**
     * @property dataSource
     * @type Array
     * @default null
     * @description 组件的数据源,每个元素必须有groupKey属性(String),如果是不需要分组的元素,groupKey属性为'notGrouped'
     *
     * 示例:
     * ```
     * [
     *   {
     *     text: String //如果传入了这个属性并且没有配置renderItem,会以text文本作为列表项的内容
     *     groupKey: String //列表项的groupKey,将根据这个属性对元素进行分组,如果是不需要分组的元素,应设置为'notGrouped'
     *   },
     *   ...
     * ]
     * ```
     */
    dataSource: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            groupKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
        })
    ).isRequired,
    /**
     * @property sort
     * @type Function
     * @default null
     * @param {String} a 两个title之中在前面的那个
     * @param {String} b 两个title之中在后面的那个
     * @description 组的排序规则,使用方式与array.sort相同,能够接受两个参数a和b,返回一个数字。
     * 负数表示a在b前,正数表示a在b后。
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
     * @description 根据列表项数据渲染列表项,返回JSX或者字符串,默认会返回数据对象的text(如果定义了的话)。
     */
    renderGroupItem: PropTypes.func,
    /**
     * @property showIndexNavBar
     * @type Bool
     * @default false
     * @description 是否显示分组导航
     */
    showIndexNavBar: PropTypes.bool,
    /**
     * @property infinite
     * @type Bool
     * @default false
     * @description 是否使用无穷列表模式(参考List的无穷列表模式)
     */
    infinite: PropTypes.bool,
    /**
     * @property infiniteSize
     * @type Number
     * @default 30
     * @description 无穷列表模式中,保留在容器中列表项的数量
     * 由于grouplist中列表项的高度一般较小,因此默认值为30
     */
    infiniteSize: PropTypes.number,
    /**
     * @property itemHeight
     * @type Number
     * @default null
     * @description 无穷列表模式下列表项的高度
     */
    itemHeight: PropTypes.number,
    /**
     * @property titleHeight
     * @type Number
     * @default 25
     * @description group title的高度,使用infinite模式时通过这个属性设置title项的高度,参见List的无穷列表模式
     */
    titleHeight: PropTypes.number,
    /**
     * @property itemExtraClass
     * @type String/Function
     * @default null
     * @param {Object} item 列表项数据对象
     * @param {Number} index 在数据源中的偏移
     * @description grouplist列表项的extraClass,使用方式参考List的itemExtraClass属性。
     *
     * 注意:这个属性的值/结果会完全覆盖掉默认的className.
     */
    itemExtraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @property groupTitleExtraClass
     * @type String
     * @default null
     * @param {String} groupKey 分组名
     * @description grouptitle的extraClass,可以是字符串或者函数,如果传入函数,可以接收一个参数,为当前元素的groupKey。
     *
     * 注意:这个属性的值/返回的结果会完全覆盖掉默认的className而不是追加。
     */
    groupTitleExtraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @property offsetY
     * @type Number
     * @default 0
     * @description 列表的初始位置
     */
    offsetY: PropTypes.number,
    /**
     * @property onItemTap
     * @type Function
     * @default ()=>{}
     * @param {Object} item 列表项数据对象
     * @param {Number} index 在数据源中的偏移
     * @param {element} target 当前event对象的target
     * @description 点击列表项时触发的事件回调,接受的参数和使用方式与List相同
     */
    onItemTap: PropTypes.func,
    /**
     * @property itemTouchClass
     * @type String/function
     * @param {Object} item 列表项数据对象
     * @param {Number} index 在数据源中的偏移
     * @default item-light
     * @description 列表项被点击时附加的className,参见List同名属性
     */
    itemTouchClass: PropTypes.string,
    /**
     * @property usePullRefresh
     * @type Bool
     * @description 是否使用下拉刷新
     */
    usePullRefresh: PropTypes.bool,
    /**
     * 下拉刷新高度
     *
     * @property pullRefreshHeight
     * @type PropTypes.number
     * @description 触发下拉刷新状态的高度（一般即为下拉刷新提示区域的高度）
     * @default 40
     */
    pullRefreshHeight: PropTypes.number,
    /**
     * 下拉刷新渲染函数
     *
     * @property renderPullRefresh
     * @type PropTypes.func
     * @returns {JSX} 用来渲染 pullRefresh 的 JSX
     * @description () => JSX
     *
     * 自定义的下拉刷新渲染函数
     */
    renderPullRefresh: PropTypes.func,
    /**
     * @property onRefresh
     * @type Function
     * @param {Array} dataSource 当前数据源
     * @description 下拉刷新回调
     */
    onRefresh: PropTypes.func,

    /**
     * @property useLoadMore
     * @type Bool
     * @description 是否开启加载更多功能
     */
    useLoadMore: PropTypes.bool,
    /**
     * @property onLoad
     * @type Function
     * @description 加载更多触发时的回调函数
     */
    onLoad: PropTypes.func,
    /**
     * 加载更多高度
     *
     * @property loadMoreHeight
     * @type PropTypes.number
     * @description 触发加载更多状态的高度（一般即为加载更多提示区域的高度）
     * @default 40
     */
    loadMoreHeight: PropTypes.number,
    /**
     * @property renderLoadMore
     * @type Function
     * @return JSX
     * @description 自定义加载更多区域的渲染方式,用返回的JSX节点取代原节点
     */
    renderLoadMore: PropTypes.func,
    /**
     * @property onScroll
     * @type Function
     * @param {Number} offsetY 当前Scroller的y轴偏移量
     * @description Scroller滚动时触发的回调
     */
    onScroll: PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @description 附加给组件根节点的额外className
     */
    extraClass: PropTypes.string,
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
     * @description 定制grouplist分组导航中每一项的render函数,接收groupkey为参数,返回字符串或者jsx
     */
    renderIndexNavBarItem: PropTypes.func
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
        return groupKey || null;
    },
    // 定义item renderer
    renderGroupItem(item) {
        return item.text;
    },
    // 自定义className
    extraClass: '',
    // 是否展示关键字导航栏
    showIndexNavBar: false,
    // 自定义关键字导航栏item renderer
    renderIndexNavBarItem(groupKey) {
        return groupKey;
    },
    groupTitleExtraClass: 'label',
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
    shouldItemUpdate(ret) {
        return ret;
    }
};

export default class GroupList extends Component {

    /**
     * state中维护了处理过的dataSource(加入了title数据)和groupTitle的列表
     * @param props
     */
    constructor(props) {
        super(props);
        const { dataSource, itemHeight, titleHeight, sort, infinite } = this.props;
        this.groupModel = new GroupCore(dataSource, itemHeight, titleHeight, sort, infinite);
        this.state = {
            dataSource: this.groupModel.dataSource,
            groupTitles: this.groupModel.groupTitles
        };
    }

    componentDidMount() {
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
                    this.stickyHeader.style.display = 'block';
                    this.stickyHeader.className = `${(typeof groupTitleExtraClass === 'function' ?
                        groupTitleExtraClass(groupKey) : groupTitleExtraClass)} sticky`;
                } else {
                    this.stickyHeader.style.display = 'none';
                }
            })
            .registerEventHandler('refresh', (dataSource, groupTitles) => {
                this.setState({ dataSource, groupTitles });
            });

        if (this.groupModel.isHeightFixed) {
            this.refreshStickyHeader();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dataSource, sort, infinite } = nextProps;
        this.groupModel.refresh(dataSource, sort, infinite);
    }

    componentDidUpdate() {
        this.refreshStickyHeader();
    }

    /**
     * 根据offsetY调整stickyHeader的位置
     * @param offsetY
     */
    refreshStickyHeader(offsetY = this.groupModel.offsetY) {
        this.groupModel.offsetY = offsetY;
        this.groupModel.refreshStickyHeader(offsetY);
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
     * @description 调用List同名方法,滚动到某个位置y
     * @method scrollTo
     * @param {Number} y y坐标
     * @param {Number} time 动画持续时间
     */
    scrollTo(y, time) {
        this.list.scrollTo(y, time);
    }

    /**
     * @description 调用List同名方法,中止正在执行的滚动
     * @method stopAnimate
     */
    stopAnimate() {
        this.list.stopAnimate();
    }

    /**
     * @description 调用List同名方法,停止下拉刷新过程
     * @method stopRefreshing
     * @param {Bool} success 下拉刷新是否成功
     */
    stopRefreshing(success) {
        this.list.stopRefreshing(success);
    }

    /**
     * @description 调用List同名方法,模拟下拉刷新过程
     * @method startRefreshing
     */
    startRefreshing() {
        this.list.startRefreshing();
    }

    /**
     * @method stopLoading
     * @param {Bool} success 加载更多是否成功
     * @description 调用List同名方法,中止加载更多过程
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
        return item._type === 'groupTitle' ? renderGroupTitle(item.groupKey, index) : renderGroupItem(item, index);
    }

    render() {
        const {
            infiniteSize,
            infinite,
            itemExtraClass,
            groupTitleExtraClass,
            extraClass,
            onItemTap,
            offsetY,
            renderIndexNavBarItem,
            itemTouchClass,
            usePullRefresh,
            onRefresh,
            onIndexNavBarItemHover,
            onScroll,
            shouldItemUpdate,
            pullRefreshHeight,
            renderPullRefresh,
            useLoadMore,
            renderLoadMore,
            onLoad,
            loadMoreHeight
        } = this.props;
        // 不定高的无穷列表不能支持showIndexNavBar,因为无法定位到每一个item的_translateY
        const showIndexNavBar = this.props.showIndexNavBar && this.groupModel.isHeightFixed;
        const rootClassNames = replaceRedundantSpaces(['yo-group', extraClass].join(' '));
        const { dataSource, groupTitles } = this.state;
        // 包裹props中的onItemTap,这是因为grouplist的数据源中加入了title的数据
        // 在onItemTap时需要filter掉这些title
        const wrappedonItemTap = (item, index, target) => {
            if (onItemTap && item._type !== 'groupTitle') {
                onItemTap(item, index, target);
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
                    itemTouchClass : itemTouchClass(item, index);
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
                    itemExtraClass : itemExtraClass(item, index);
            }
            return ret;
        };
        const wrappedShouldItemUpdate = (ret, next, now) => {
            if (!(now._type === 'groupTitle' && next._type === 'groupTitle')) {
                return shouldItemUpdate(ret, next, now);
            }
            return ret;
        };

        return (
            <div className={rootClassNames}>
                <div
                    className="sticky label"
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
                    dataSource={dataSource}
                    infinite={infinite}
                    offsetY={offsetY}
                    renderItem={(item, index) => this.renderItem(item, index)}
                    itemExtraClass={wrappedItemExtraClass}
                    shouldItemUpdate={wrappedShouldItemUpdate}
                    infiniteSize={infiniteSize}
                    onScroll={(y) => {
                        this.refreshStickyHeader(y);
                        onScroll(y);
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
                    usePullRefresh={usePullRefresh}
                    pullRefreshHeight={pullRefreshHeight}
                    renderPullRefresh={renderPullRefresh}
                    onRefresh={wrappedOnPullRefresh}
                    useLoadMore={useLoadMore}
                    onLoad={onLoad}
                    renderLoadMore={renderLoadMore}
                    loadMoreHeight={loadMoreHeight}
                />
            </div>
        );
    }
}

GroupList.propTypes = propTypes;
GroupList.defaultProps = defaultProps;
