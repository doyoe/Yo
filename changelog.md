## v3.0.4

发布时间：2017-01-25

### New Features
- `Suggest` 结果列表现在支持开启 `Infinite` 模式，可以配置 `infinite`, `infiniteSize` 和 `itemHeight` 三个属性。
- `MultiList` 重构版本重新上线，`dataSource`的配置方式做了大幅调整，现在可以通过`renderItem`和`renderContent`属性更方便的配置组件子菜单的展示方式。
- `CarouselItem` 组件的属性做了大幅度精简，删除了冗余的`index`，`currentPage`和`pagesNum`三个属性。

### Bug Fixes
- 修复 `Suggest` 在输入条件改变时，结果列表没有自动重置到顶部的bug。
- 修复 `GroupList` 在分组变化以后导航栏拖动时定位不准的bug。
- 修复 `LazyImage` 在`List`不定高`Infinite`模式下更新时机不准确的bug。
- 修复 `Touchable` 内部嵌套 `LazyImage`时无效的bug。

## v3.0.3

发布时间：2017-01-13

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

## v3.0.2

发布时间：2016-12-30

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

## v3.0.1

发布时间：2016-12-16

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

## v3.0.0

发布时间：2016-11-29

* 全新架构设计

> 由于 `v3.0.0` 引入了交互组件，并对原有结构做了大幅度的调整，所以不建议从旧版本升级，推荐在新项目和重构项目中使用。

## 查看历史版本

[v2及更早版本](https://github.com/doyoe/Yo/releases/)