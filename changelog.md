## v3.0.1

### New Features

- `Alert` 和 `Confirm` API现在支持传入一个opt对象作为参数，除了content,title和animation外，里面还可以指定btnText属性来定制"确定"和"取消"按钮的文本。
- `MultiList` 组件增加了extraClass属性，可以给根节点绑定额外样式类。
- `List` 现在可以通过extraClass设置样式来调整根节点的宽高，之前是直接设定的style属性为{position:absolute;top:0;bottom:0}所以无法修改。这意味着不再需要将List放入一个父容器中。
- `MultiList` updateValue属性改名为onChange。

### Bug Fixes

- 修复了 `CarouselItem` 手势滑动到最后一页时无法后退的bug。
- 修复 `Grouplist` 组件groupkey为0或者其他假值时不能正常渲染分组标题的bug
- 修复 `LazyImage` 组件销毁时加载图片导致控制台警告的bug。
- 修复 `List` 组件自动调整offsetY时的位置错误。
- 修复 `List` 组件非Infinite模式下onItemTap属性第二个参数为undefined的错误。
- 修复了 `SwipeMenu` 组件propType的警告。
- 修复了 `Suggest` 组件结果item默认touchClass的错误。
- 修复了异步载入 `Yo` 时Fastclick初始化方法未执行的错误。

## v3.0.0

* 全新架构设计

> 由于 `v3.0.0` 引入了交互组件，并对原有结构做了大幅度的调整，所以不建议从旧版本升级，推荐在新项目和重构项目中使用。

## 查看历史版本

[v2及更早版本](https://github.com/doyoe/Yo/releases/)