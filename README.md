# Yo

`Yo` 是一款基于 `Mobile First` 理念而设计的 `CSS Framework`，当然，你使用在PC高级浏览器中也完全没有问题；其具备轻量，易用，快速且高度强大的自定义能力。


## Quick start

* 安装Nodejs：从[NodeJs官网](http://nodejs.org)下载安装包并安装到本地
* 克隆：`git clone git@github.com:doyoe/Yo.git`
* 装gulp：`npm install gulp -g --registry=https://registry.npm.taobao.org`
* 安装依赖模块，`npm install --registry=https://registry.npm.taobao.org`
* 编译命令：`gulp`


## Browser support

* iOS6.0+
* Android4.0+
* Latest Stable: Chrome, Safari, Opera, IE10+


## Bugs and feature requests

如果你或者你所在的公司正在使用 Yo，过程中发现了任何问题，或者有任何帮助 Yo 更完善的想法和建议，都可以直接给我提[Issues](https://github.com/doyoe/Yo/issues/new)和[Pull Requests](https://github.com/doyoe/Yo/pulls)。


## Demo And Documentation

* Demo: [示例查看](http://doyoe.github.io/Yo/demo/)
* Documentation：[使用文档](http://doyoe.github.io/Yo/doc/)

待发布...

## Notice

Yo约束了2种项目所使用的长度单位

* 所有涉及到 `border` 的长度单位都是用 `px`；
* 除 `border` 外，所有的长度设置都是用 `rem` 单位；

## Versioning

### Developing: v2.1.0

#### 新增：
* add `frist($list)` function，用于取出Sass List中的第一项；
* add `last($list)` function，用于取出Sass List中的最后一项；
* add `nth-last($list, $index)` function，用于取出Sass List中的倒数第n项；
* add `remove($list, $value)` function，用于移除Sass List中的$value；
* add `slice($list, $start, $end)` function，用于取出Sass List中被选中的项；
* add `splice($list, $index, $count, $values)` function，用于移除Sass List中的项，并添加新项；

#### 变更：
* change `perfix` mixin 为私有`_perfix`；
* change `yofont` mixin 为私有`_yofont`；
* change `gradient` mixin 的内部实现；
* change `transition` mixin 的内部实现；

### Lastest: v2.0.0

**请谨慎升级v2.0.0版本，因为这是大版本，涉及到很多变更**

#### 新增：
* add: `yo-vcode`
    - 新增`yo-vcode`用于验证码或者密码输入组件
* add: `yo-breadcrumb`
    - 新增`yo-breadcrumb`面包屑
* add: `yo-proportion`
    - 新增`yo-proportion`用于展现占比情况
* add: `响应式断点`
    - 新增`xs, s, m, l, xl`5类响应式断点，用于支持响应式设计
* add: `global classes`
    - 新增`align`方法用于处理元素水平及垂直对齐方式，默认为居中
    - 新增`transform-style`,`perspective`,`perspective-origin`,`backface-visibility`,`flex-flow`方法
* add: `global function`
    - 新增了`function`文件，用以后续扩展Sass内置的函数

#### 变更：
* (*)change: `1px边框方法`（全平台兼容）
    - 新增`border`方法用于处理retina屏1px边框，移除原`viewport scale`方案
    - 移除原始用于`1px`方案的`$setting is-ios-1pixel`设置

    > 原因：
    >
    > 1. 原方案利用viewport缩放（需引入额外的js），这会改变layout viewport尺寸，进而影响响应式设计；
    > 2. 原方案安卓未实现，因为Android4.3及以下不支持initial-scale除1之外的设置；
* (*)change: `bordercolor`变量
    - 将所有带`bordercolor`关键字的变量都重命名为`border-color`，因为早期的时候命名不严谨导致吐槽激烈，特在此大版本中全部修正
* (*)change:
    - 不再强制要求升级`Yo`时业务对比`config`和`variables`的一致性；
    - 需要注意的是`variables`中`map`使用`_`开头，而`config`中不需要`_`，例如：`$_list` -> `$list`；
    - 从`variables`中将`base map`拆分到新文件`base`，同时在`config`中新增`extra`文件用以对应该文件；
    - 用户可以在`extra`文件中配置，扩展或者新增`map`；
* change: `yo-btn`
    - 将原来统一的灰色禁用按钮更改为每个按钮的禁用外观取决于自身的本来颜色
* change: `yo-number`
    - 移除`$disabled-sign-color`参数；
    - 新增`$outer-radius`参数；
    - 新增`$outer-border-width`参数；
    - 新增`$inner-radius`参数；
    - 新增`$inner-border-width`参数；
    - 新增`$font-size`参数；
* change: `yo-flex`
    - 移除`$box`参数；
* change: `wrap` mixin
    - 新增`$is-wrap`参数（Boolean），用于指定文本遇见边界时是否换行；
* change: `yo-list`
    - 新增`$detail-font-size`参数，用于指定详情区域的字号；
    - 新增`$detail-color`参数，用于指定详情区域的文本色；
    - 新增`$info-font-size`参数，用于指定描述区域的字号；
    - 新增`$info-color`参数，用于指定描述区域的文本色；
    - 新增`$more-font-size`参数，用于指定更多区域的字号；
    - 新增`$more-color`参数，用于指定更多区域的文本色；
* update: 内部处理`yo-rating`, `yo-score`, `yo-range`在Node-Sass3.4.1-3.42下编译出错的问题

#### 删除
* del: `alignment` mixin
* del: `valign` mixin

**再次重申：将你的`flex子项`设置为`非行内级元素`，Yo会缓步移除对这种内部容错的代码**


### History

更多历史版本信息，请查看[ChangeLog](changelog.md)。


### Version Number Description

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, Yo will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit [semver.org](http://semver.org/).


## Author

My name is Du Yao, working in Beijing [Qunar.com](http://www.qunar.com) now, is active in [Github](https://github.com/doyoe) and [Weibo](http://weibo.com/doyoe). Thus, you can find some information about me on my [Website](http://www.doyoe.com). Of course, you can visit my [blog](http://blog.doyoe.com) and use my tool sites, including [CSS-handbook](http://css.doyoe.com) and [Web front-end laboratories](http://demo.doyoe.com).


## Copyright and License

Code and documentation copyright 2014-2015 [doyoe.com](http://www.doyoe.com). Code released under [the MIT license](http://opensource.org/licenses/MIT). Docs released under [Creative Commons](http://creativecommons.org/licenses/by/4.0/).