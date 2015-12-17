# Yo

`Yo` 是一款基于 `Mobile First` 理念而设计的 `CSS Framework`，它轻量，易用且自定义能力高度强大，同时也适应于PC端的高级浏览器。


## 快速开始

* 安装: `Nodejs`
* 克隆项目: `git clone git@github.com:doyoe/Yo.git`
* 安装gulp: `npm install gulp -g --registry=https://registry.npm.taobao.org`
* 安装依赖: `npm install --registry=https://registry.npm.taobao.org`
* 运行: `gulp`


## 浏览器支持

* iOS6.0+
* Android4.0+
* Latest Stable: Chrome, Safari, Opera, IE10+


## 问题及反馈

如果您的项目正在使用`Yo`，过程中发现了任何问题，或者有任何帮助`Yo`更完善的想法和建议，请直接给我提[Issues](https://github.com/doyoe/Yo/issues/new)和[Pull Requests](https://github.com/doyoe/Yo/pulls)。


## 实例和文档

* [View Demo](http://doyoe.github.io/Yo/demo/)
* [View Documentation](http://doyoe.github.io/Yo/doc/)


## 注意

Yo约束了2种项目所使用的长度单位

* 所有涉及到`border`的长度单位都是用`px`；
* 除`border`外，所有的长度设置都是用`rem`单位；

## 版本

`master`分支为开发版本，稳定版本都发布在`releases tag`中。

### 最新稳定版: [v2.0.0](https://github.com/doyoe/Yo/releases/tag/v2.0.0)

### 开发中版本: v2.1.0

#### 新增：
* add `frist($list)` function，用于取出Sass List中的第一项；
* add `last($list)` function，用于取出Sass List中的最后一项；
* add `nth-last($list, $index)` function，用于取出Sass List中的倒数第n项；
* add `remove($list, $value)` function，用于移除Sass List中的$value；
* add `slice($list, $start, $end)` function，用于取出Sass List中被选中的项；
* add `splice($list, $index, $count, $values)` function，用于移除Sass List中的项，并添加新项；
* add `$has-last-border` for `yo-list`，用于指定最后一项是否需要底边线；

#### 变更：
* change `perfix` mixin 为私有`_perfix`；
* change `yofont` mixin 为私有`_yofont`；
* change `gradient` mixin 的内部实现；
* change `transition` mixin 的内部实现；
* 为 `selectlist` 添加对 `yo-checked` 的依赖；

### 历史版本

如想查看更多版本变更历史，请查看[ChangeLog](changelog.md).


### 版本号说明

`Yo`的版本发布周期是透明的，并尽可能保证向前向后兼容，您可以根据我们的语义化版本方针进行版本控制。

`Yo`的版本方针遵循 [SemVer](http://semver.org/lang/zh-CN/) 规范，版本号采用`主版本号.次版本号.修订号`的格式，版本号规则如下：

* 主版本号：做了不兼容的`API`修改，同时可以涵盖`次版本号`和`修订号`的内容；
* 次版本号：做了向前向后兼容的功能性新增，同时可以涵盖`修订号`的内容；
* 修订号：做了前向后兼容的问题修正。


## 作者

杜瑶，我目前居住在北京，就职于 [Qunar](http://www.qunar.com)，您可以在 [Github](https://github.com/doyoe) 或者 [Weibo](http://weibo.com/doyoe) 看到我的最近动态。当然，也可以通过我的[个人站点](http://www.doyoe.com)，[博客](http://blog.doyoe.com)，[CSS参考手册](http://css.doyoe.com) 和 [Web前端实验室](http://demo.doyoe.com) 等信息了解更多。


## 版本许可

源码和文档版权属于 [doyoe.com](http://www.doyoe.com)。源码发布基于 [the MIT license](http://opensource.org/licenses/MIT) 开源协议。文档发布基于 [Creative Commons](http://creativecommons.org/licenses/by/4.0/) 开源协议。