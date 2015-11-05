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
* Documentation：撰写中

待发布...

## Notice

Yo约束了2种项目所使用的长度单位

* 所有涉及到 `border` 的长度单位都是用 `px`；
* 除 `border` 外，所有的长度设置都是用 `rem` 单位；

## Versioning

### Developing: v2.0.0

**请谨慎升级v2.0.0版本，因为这是大版本，涉及到很多变更**

#### 新增：
* add: `yo-vcode`
    - 新增`yo-vcode`用于验证码或者密码输入组件
* add: `yo-breadcrumb`
    - 新增`yo-breadcrumb`面包屑

#### 变更：
* change: `1px边框方法`
    - 新增`border`方法用于处理retina屏1px边框，移除原`viewport scale`方案（因为该方案影响响应式设计实现，并且因为Android4.3及以下不支持initial-scale除1之外的设置，所以安卓都未实现）
    - 移除原始用于`1px`方案的`$setting is-ios-1pixel`设置
> 原因：
* change: `bordercolor`变量
    - 将所有的`bordercolor`变量都重命名为`border-color`，因为早期的时候命名不严谨导致吐槽激烈，特在此大版本中全部修正
* change: `yo-btn`
    - 将原来统一的灰色禁用按钮更改为每个按钮的禁用外观取决于自身的本来颜色

**再次重申：将你的`flex子项`设置为`非行内级元素`，Yo会缓步移除对这种内部容错的代码**

### Lastest: v1.8.7

* update: `yo-datepicker`
    - 为`weeks`容器添加`relative`
    - 解决`disabled`状态被扩展覆盖的问题
    - 引入`panel`依赖


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