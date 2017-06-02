## Scroller 的测试点

- 基础结构
    - 有滚动容器有内容容器
    - 有滚动容器没有内容容器
    - 没有滚动容器没有内容容器

- 附加结构
    - sticky
    - pullRefresh
    - loadMore

- 样式
    - 本身样式
    - extraClass
    - containerExtraClass
    - containerExtraStyle

- 位置
    - contentOffset
    - stickyOffset

- 滚动功能
    - disabled
    - scrollX
    - scrollY

- 滚动属性
    - 方向锁定阀值
    - 惯性滚动
    - 弹性滚动（时间、动画）

- 实现相关
    - transition
    - transform
    - HWCompositing（硬件加速）

- 附加功能
    - 下拉刷新（事件、方法、高度、渲染）
    - 加载更多（事件、方法、高度、渲染）
    - sticky
    - lazyImage

- 滚动事件
    - onScroll
    - onScrollStart
    - onScrollEnd
    - onScrollCancel
    - onMomentumScrollBegin

- API
    - refresh
    - stopAnimate
    - scrollTo
    - startRefreshing
    - stopRefreshing
    - stopLoading
    - resetLoadStatus