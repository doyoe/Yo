## v3.0.2

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

* 全新架构设计

> 由于 `v3.0.0` 引入了交互组件，并对原有结构做了大幅度的调整，所以不建议从旧版本升级，推荐在新项目和重构项目中使用。

## 查看历史版本

[v2及更早版本](https://github.com/doyoe/Yo/releases/)