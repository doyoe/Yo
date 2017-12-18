## v3.0.15 (2017-12-15)

### Bug Fixes
* 修复自定义样式目录中有多层目录时 `post install` 脚本报错的问题。

### New Features
* `Alert` 和 `Confirm` 组件增加 `extraClass` 属性，`content` 属性支持传入 jsx。

## v3.0.14 (2017-11-17)

### Bug Fixes
* 修复 `scroller.js` 中因 `refs.wrapper` 不存在而报错的问题

## v3.0.13 (2017-10-20)

### New Features
* `Scroller/List/GroupList/SwipeMenuList` 添加 `contentInset` 参数，用来在内容区域底部加上间隙（主要用于适配 iPhoneX，在内容最下方留出空间）。
* 添加 `autoBlur` 工具函数，可以通过 `import { autoBlur } from 'yo3/component/common/util.js` 来使用。
* `Toast` 支持传入回调函数，详见 `Toast` 使用说明。
* 为 `ellipsis` 方法内置强制换行（当 `$line-clamp` 大于 `1` 时，即多行截断）。

### Bug Fixes
* 修复 `Modal` 在某些情况下，`componentWillUnmount` 先于 `componentDidMount` 执行导致的 bug。
* 修复 `InputNumber` 在某些安卓手机键盘收起时，数值还原的 bug。
* 修复 `Scroller` 的 `refreshLazyImage` 方法在某些情况下，未能刷新全部图片位置的 bug。
* 修复 `Scorller` 子元素存在 input 输入框时，浏览器强制让 input 显示在可见区域，收缩键盘后无法向上滑倒顶部的 bug。
* 修复 `LazyImage` 在 `List` 组件的非 infinite 模式下，加载更多数据之后报错的 bug。

## v3.0.12 (2017-07-14)

### New Features
* `Scroller` 新增 `refreshLazyImage` 方法，在页面内容变化时，手动刷新 LazyImage。

### Bug Fixes
* 修复 当元素宽度出现小数时，使用 `border` 方法边框可能显示不全的问题。
* 修复 `LazyImage` 在频繁更新图片地址时，有可能加载顺序出现混乱的问题。

## v3.0.11 (2017-06-24)

### New Features
* 新增对 `summary` 元素的响应轮廓的reset定义；
* 新增对 `summary` 展开收起三角箭头标识的reset定义；
* 新增 `fixed-scale` 方法用以在自适应宽度情况下，确保内容元素的宽高比固定，比如：实现随屏幕大小而变化的正方形。
* `carousel` 默认动画 `aniScrollx` ，`aniInfinate` 动画添加非循环播放底页拖动弹性效果。
* `carousel` 添加禁用动画手势响应配置 `disable`
* `Popup` 组件的额外样式定义增加 `wrapperExtraClass` 配置项，用来设置内容区域的额外样式。

### Bug Fixes
* 修复 `reset` 里对清除响应轮廓的选择符错误，`select` 与 `a` 之间少了逗号分隔。
* 修复因为 `React` 升级而出现的 `PropTypes` 的 warning。
* 修复 `Suggest` 在结果列表上滚动时无法自动收起键盘的 bug。（但是，在部分安卓机器上，调用 blur 也无法让键盘收起，暂时无法解决）
* 修复 `Scroller` 组件当内容过少时，首次进入，"加载更多"部分定位错误的 bug。

## v3.0.9 (2017-05-02)

### New Features
- `Calendar` 添加 `allowSelectionBeforeToday` 属性，允许用户选择当前日期之前的时间段。
- `Picker` 添加 `itemHeight` 属性，用来设置 item 高度。

### Bug Fixes
- 修复 `Scroller` 在调用 `scrollTo` 方法时，吸顶容器没有被正确刷新的 bug。
- 修复 `Scroller` 在回弹过程中点击页面导致无法回弹到正确位置的 bug。
- 修复 `LazyImage` 在更新之后获取位置不正确导致图片无法加载的 bug。
- 修复 `Calendar` 当 `duration` 的起始日期大于当前日期时，可选择区域不准确的 bug。
- 修复 `Calendar` 当 `duration` 属性改变时，起始日期所在的周未及时更新的 bug。
- 修复 `Calendar` 在 `onChange` 触发时，输出的格式不规范的 bug，将 YYYY-MM-(D)D 格式改成 YYYY-MM-DD 格式。
- 修复 `Carousel` 当 触发 `toucheEnd` 事件时没有生成对应 `touch` 对象情况下， 没有重置定时器的 bug。

## v3.0.8 (2017-04-07)

### New Features

- `yo-timeline` 时间轴元件新增 `$first-item-color` 参数指定首项的颜色，用以区别其他项。
- `Carousel` 组件新增内置自定义动画，实现循环无限节点。
- `Carousel` 组件添加 `window.resize` 事件，并提供 `handleResize` 方法用于当父容器宽度变化时手动调整组件。
- `PopupPicker` 和 `PopupDateTimePicker` 组件添加 `beforePopupShow` 属性，在点击选择区域后触发，可以用来阻止弹层的弹出。

### Bug Fixes
- 修复 `PopupPicker` 和 `PopupDateTimePicker` 一起使用时，`PopupDateTimePicker` 内部宽度为 `0` 导致内容不可见的 bug。
- 修复 `Suggest` 组件在 `results` 为 `null` 时提示 `List DataSource` 错误，而不是展示 `noDataTmpl` 的bug。
- 修复 `PopupDateTimePicker` 组件打开弹层后弹层内容宽度为0的bug。

## v3.0.7 (2017-03-17)

### New Features

- `PopupPicker` 新增多列Picker模式，如果给 `options` 属性传入一个二维数组，就可以开启多列模式。请参考 `PopupPicker` 文档。
- `Scroller` 和所有列表组件新增API `resetLoadStatus`，用来重置 `加载更多` 功能。
- 调整了`Scroller` 默认的减速摩擦系数，提升用户体验。
- `Carousel` 内置子节点 `Carousel.Item` 增加内部渲染方法 `renderContent`。
- `Carousel` 内置索引增加点击跳转到索引页面功能。
- `Touchable` 增加属性 `disabled`，可以控制点击区域是否处于可用状态。
- 新增 `yo-timeline` 时间轴元件。
- `Calendar`: 在传入 `selectionStart` 属性的情况下，会自动滚动到选中日期的月份。

### Bug Fixes
- 修复 `List` 在非 `infinite` 模式下调用 `refresh` 方法时不能正确刷新 `Scroller` 滚动信息的bug。
- 修复 `GroupList` 在结合 `Modal` 系列组件时，调用 `refresh` 方法不能正确刷新吸顶title的bug。
- 修复 `Carousel` 在压缩后为当前播放子组件添加 `activeClass` 失败的bug。
- 修复 `infinite` 模式的列表组件中使用 `LazyImage` 组件时，加载图片可能发生错乱的bug。
- 修复 `SwipeMenuList` 组件的 `onMenuOpen` 和 `onMenuClose` 在使用 `Immutable` 数据结构时第一个参数为 `undefined` 的 bug。

## v3.0.6 (2017-03-03)

### New Features
- 列表系列组件删除了 `staticSectionHeight` 属性，这意味着在使用 `staticSection` 时不再需要确定静态区域的高度，这个高度将会在组件mount或update时自动获取。
- `GroupList` 新增属性 `titleOffset`，可以设置吸顶容器的y轴偏移。
- `MultiList` 原有事件 `onChange` 回调新增参数 `newItems` ，表示当前value值对应的 `item` 集合。
- `MultiList` 原有方法 `renderItem` 参数新增属性 `route` ，表示当前item值对应的 `dataSource` 中的索引值。
- `GroupList` 和 `SwipeMenuList` 新增 `refresh` 方法，在组件容器尺寸发生变化时需要调用这个方法来刷新内部的 `Scroller`。
- 给列表系列组件 `infinite` 模式做了一些性能优化，现在在低端机型上滚动性能更佳。
- `Scroller` 和所有列表组件（`List`，`GroupList` 和 `SwipeMenuList`）新增 `stickyOffset` 属性，可以设置吸顶容器的y轴偏移。
- `Scroller` 新增属性 `containerExtraStyle`，主要用来在横向滚动时，动态的设置内容容器的宽度。
- `Calendar` 组件新增属性 `renderDate`，现在可以自定义日期的渲染方式。

### Bug Fixes
- 修复 `Scroller` 的 `refresh` 方法在不必要的情况下查询 `wrapper.offsetHeight` 和 `scroller.offsetHeight` 导致 `List` 无穷模式滚动性能变差的bug。
- 修复 `GroupList` 吸顶容器在组件的默认 `display` 不为 `none` 导致组件Mount时出现一个闪烁的灰色条的bug。
- 修复 `MultiList` 的数据更新后视图没有更新的bug。
- 修复 `MultiList` 在每次 `render` 时都触发 `onUpdateData` 回调的bug。
- 修复 `Calendar` 组件展示超过一年的日期时，超出一年的月份展示错误的bug。

## v3.0.5 (2017-02-17)

### New Features
- 新增组件 `PopupPicker` 和 `PopupDateTimePicker`。这两个组件封装了原始的 `Picker` 和 `DateTimePicker` 组件，提供了更加便于使用的弹出式选择器。详情请参考这两个组件的文档。
- `List`，`GroupList`，`SwipeMenuList` 现在加入对 `Immutable` 数据类型的支持，详情请参考 `List` 文档。
- `List` 的 `shoudItemUpdate` 属性去除了冗余的第一个参数 `ret`，现在它只会在 `ListItem` 默认配置的 `shouldComponentUpdate` 返回值为 `false` 时触发。
- `SwipeMenuList` 现在可以配置 `shouldItemUpdate` 方法了，它的使用方式与 `List` 组件一致。
- `Suggest` 新增 `onSubmit` 属性，可以配置点击搜索键时的回调。
- `Carousel` 组件内置自定义动画支持配置参数。
- `align()` mixin 移除对 `type` 参数的支持 ([Issues #42](https://github.com/doyoe/Yo/issues/42))。

### Bug Fixes
- 修复 `Scroller` 的 `scrollTo` 方法在不传参数调用时导致 `Scroller` 无法滚动的bug。
- 修复 `Suggest` 在 `iOS` 上结果列表滚动后，以及点击输入框`x`图标后，输入框无法聚焦的 bug。
- 修复 `GroupList` 设置了 `titleHeight` 属性以后吸顶效果不准确的 bug。
- 修复 `GroupList` 的 `itemTouchClass` 传入函数时报 `PropType` 验证不通过警告的bug。
- 修复 `GroupList` 的 `titleHeight` 属性发生变化后不生效的bug。
- 修复 `GroupList` 在设置 `titleExtraClass` 以后默认的 `label` 类名被覆盖导致在 `infinite` 模式下 `title` 定位不准确的bug。
- 修复 `GroupList` 的吸顶容器的 `display` 属性始终为 `block` 的 bug。
- 修复 `Suggest` 键盘按钮在 `iOS` 上不为 `搜索`，以及点击按钮后页面reload的bug。
- 修复 `Calendar` 在选择日期时月份 `label` 重新创建导致性能不理想的问题。
- 修复 `Carousel` 组件在 `default` 动画下节点使用 `lazyload` 和 `defaultPage`时 加载异常的问题。
- 修复 `yo-list` 在 `infinite` 时，顶部出现间隔线的问题。
- 修复 `yo-search` 参数 `input-height` 无效的问题 ([Issues #41](https://github.com/doyoe/Yo/issues/41))。

## v3.0.4 (2017-01-25)

### New Features
- `Suggest` 结果列表现在支持开启 `Infinite` 模式，可以配置 `infinite`, `infiniteSize` 和 `itemHeight` 三个属性。
- `MultiList` 重构版本重新上线，`dataSource`的配置方式做了大幅调整，现在可以通过`renderItem`和`renderContent`属性更方便的配置组件子菜单的展示方式。
- `CarouselItem` 组件的属性做了大幅度精简，删除了冗余的`index`，`currentPage`和`pagesNum`三个属性。

### Bug Fixes
- 修复 `Suggest` 在输入条件改变时，结果列表没有自动重置到顶部的bug。
- 修复 `GroupList` 在分组变化以后导航栏拖动时定位不准的bug。
- 修复 `LazyImage` 在`List`不定高`Infinite`模式下更新时机不准确的bug。
- 修复 `Touchable` 内部嵌套 `LazyImage`时无效的bug。

## v3.0.3 (2017-01-13)

### New Features

- `List`，`GroupList`和`SwipeMenuList`新增属性`staticSection`和`staticSectionHeight`，
可以在所有的列表项之上渲染一个静态区域，在开启`Infinite`模式时，这一部分的节点不会参与回收复用的逻辑。
- `SwipeMenuList`组件现在将菜单的配置从`dataSource`中分离出来，可以通过属性`getMenuConfig`配置。另外`renderMenuContent`属性
已经改名为`renderItem`，这样可以让所有列表系列组件使用相似的属性名。
- classes 里的 `killspace` mixin 重命名为 `clearspace`，因为 `kill` 这个单词给人一种不安的感觉。

### Bug Fixes

- 修复 `Scroller` 在传入多余wrapper节点时`Sticky`不生效的bug。
- 修复 `Scroller` 重置 `useLoadMore` 参数时loadMore节点位置不正确的bug。
- 修复 `List` 在惯性滑动到底部时加载更多Icon频繁调换方向的bug。
- 修复 `Suggest` 结果区域无法滚动的bug。
- 修复 `Suggest` 取消按钮和输入框图标无触摸反馈效果的bug。
- 修复 `Grouplist` 在存在未分组元素的情况下，通过导航栏快速跳转到第一个分组时白屏的bug。
- 修复 `SwipeMenuList` 的 `onItemTap` 在内容区域存在dom嵌套时不触发的bug。
- 修复 `SwipeMenuList` 列表项内容区存在嵌套dom时点击内容区域不会自动关闭菜单项的bug。
- 修复 `Calendar` 最后一周不满七天时自动补齐会出现某月第32天的情况。
- 修复 `Dialog` 和 `ActionSheet` 组件在某些安卓手机上按钮触摸反馈效果不消失的bug。

## v3.0.2 (2016-12-30)

### New Features

- 新增 `Scroller.Sticky` 组件，可以便捷地给 `Scroller` 内部的节点添加吸顶效果。
- `Scroller`, `List`, `Grouplist`, `SwipeMenuList`新增实验属性`scrollWithoutTouchStart`，允许在没有收到`touchstart`事件时开始滚动。
- 现在 `List` 组件不再有默认的撑满父容器的内联样式，这意味着可以使用 `extraClass` 自由调整 `List` 根节点的尺寸，同时也 **必须** 在使用前通过 `extraClass` 或者 `style` 指定它的高度。
- `List`、`Grouplist`、`SwipeMenuList` 组件新增 `style` 属性，可以直接给它们的容器节点设置样式（这在某些需要计算样式的情境下会有用）。
- `SwipeMenuList` 组件现在可以通过 `itemTouchClass` 配置点击反馈效果。
- `SwipeMenuList` 增加了 `onMenuOpen` 和 `onMenuClose` 两个事件回调，可以用来监听菜单项打开状态的变化。

### Bug Fixes

- 修复 `Modal` 组件 `z-index` 和 `Yo-Router` 容器冲突问题。
- 修复 `Touchable` 组件在相互嵌套时手势发生冲突的bug。
- 修复 `Scroller` 加载 `LazyImage` 时机不准的bug。
- 修复 `Scroller` 在横竖屏切换时报在unmount组件上调用 `forceUpdate` 错误提示的bug。
- 修复 `Scroller` 在refresh时没有重置加载更多文本的错误。
- 修复 `List` 组件不定高`infinite`模式下，调用`scrollTo(0)`白屏的问题。
- 修复 `Grouplist` 没有暴露 `disable` 属性的错误。
- 修复 `Grouplist` 在不定高 `Infinite` 模式下，设置过 `offsetY` 属性后初始吸顶title不展示的bug。
- 修复 `SwipeMenuList` 组件点击打开的列表项时，在关闭列表项的同时触发了列表项的 `tap` 事件的bug。

## v3.0.1 (2016-12-16)

### New Features

- `Alert` 和 `Confirm` API现在支持传入一个opt对象作为参数，除了content,title和animation外，里面还可以指定btnText属性来定制"确定"和"取消"按钮的文本。
- `MultiList` 组件增加了extraClass属性，可以给根节点绑定额外样式类。
- `List` 现在可以通过extraClass设置样式来调整根节点的宽高，之前是直接设定的style属性为{position:absolute;top:0;bottom:0}所以无法修改。这意味着不再需要将List放入一个父容器中。
- `MultiList` updateValue属性改名为onChange。

### Bug Fixes

- 修复 `CarouselItem` 手势滑动到最后一页时无法后退的bug。
- 修复 `Grouplist` 组件groupkey为0或者其他假值时不能正常渲染分组标题的bug
- 修复 `LazyImage` 组件销毁时加载图片导致控制台警告的bug。
- 修复 `List` 组件自动调整offsetY时的位置错误。
- 修复 `List` 组件非Infinite模式下onItemTap属性第二个参数为undefined的错误。
- 修复 `SwipeMenu` 组件propType的警告。
- 修复 `Suggest` 组件结果item默认touchClass的错误。
- 修复异步载入 `Yo` 时Fastclick初始化方法未执行的错误。

## v3.0.0 (2016-11-29)

* 全新架构设计

> 由于 `v3.0.0` 引入了交互组件，并对原有结构做了大幅度的调整，所以不建议从旧版本升级，推荐在新项目和重构项目中使用。

## 查看历史版本

[v2及更早版本](https://github.com/doyoe/Yo/releases/)
