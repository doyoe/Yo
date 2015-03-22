# Yo

一个基于 `Sass` 开发的 `CSS Framework`，Mobile First 的设计理念使得 Yo 的体积超轻量，同时又能延伸到支持PC端。


<a name="quick-start"></a>
## Quick start

待完善...

<a name="browser-support"></a>
## Browser support

* iOS6.x, iOS7.x, iOS8.x
* Android4.x, Android5.x
* Latest Stable: Chrome, Safari

<a name="bugs-and-feature-requests"></a>
## Bugs and feature requests

如果你或者你所在的公司正在使用 Yo，过程中发现了任何问题，或者有任何帮助 Yo 更完善的想法和建议，都可以直接给我提[Issues](https://github.com/doyoe/Yo/issues/new)和[Pull Requests](https://github.com/doyoe/Yo/pulls)。

<a name="documentation"></a>
## Documentation

待发布...

<a name="version"></a>
## Versioning

<a name="developing-version"></a>
### Developing: v1.3.0

* update: 建议 checkbox 及 radio 都使用 yo-checked，后续考虑将 yo-checkbox 及 yo-radio 删除，尽量不要使用，之前使用过最好及时替换；
* update: yo-checked
    - 删除 `is-border` 参数，不再使用该参数来设定是否有边框，利用原有 `bordercolor` 参数，当值为 `transparent` 时，则无边框；
    - 删除 `disabled-color` 参数，Yo所有元素的禁用色都改为继承 `$base` map；
    - 增加 `radius` 参数用于设置圆角；
    - 增加 `on-bordercolor` 参数用于设置激活边框色；
    - 增加 `on-bgcolor` 参数用于设置激活背景色；
* update: yo-rating 外观
    - 增加 `url` 参数用于改变 yo-rating 的外观；

<a name="lastest-version"></a>
### Lastest: v1.2.0

* update: yo-checkbox 增加圆角参数；
* update: yo-list 增加label和item的颜色参数，字号参数；为item设定最小高度；
* update: yo-header 两侧文本色参数；
* update: yo-group 无数据状态；
* update: yo-tab 增加对ico大小，文本大小的参数配置，并删除默认的横向文本大小设定；
* update: yo-ico 删除 .eot 及 .svg 字体；
* update: yo-loadtip 增加加载失败和成功，同时增加下拉/释放图标动画；
* fixed: yo-group 滚动时顶部溢出；
* fixed: yo-switchable 在小米4上，当使用translatez/translate3d偏移时，会覆盖在其它层级比自身高的元素之上；
* add yo-rating；
* add yo-panel；
* fixed: fixed yo-switch handle bug on samsung s4；


<a name="history-version"></a>
### History

For more information on History Version, Please visit [changelog](changelog.md).

<a name="version-number-description"></a>
### Number Description

Yo 遵循 [Semantic Versioning](http://semver.org/lang/zh-CN/) 规范，版本采用 `主版本号.次版本号.修订号` 的格式，规则如下：

* 主版本号：做了不兼容的API修改，比如大规模重构，设计模式变更，语法变更等；
* 次版本号：做了向下兼容的功能性新增；
* 修订号：做了向下兼容的问题修正、细节调整等。

<a name="author"></a>
## Author

My name is Du Yao, working in Beijing [Qunar.com](http://www.qunar.com) now, is active in [Github](https://github.com/doyoe) and [Weibo](http://weibo.com/doyoe). Thus, you can find some information about me on my [Website](http://www.doyoe.com). Of course, you can visit my [blog](http://blog.doyoe.com) and use my tool sites, including [CSS-handbook](http://css.doyoe.com) and [Web front-end laboratories](http://demo.doyoe.com).

<a name="copyright-and-license"></a>
## Copyright and License

Code and documentation copyright 2014-2015 [doyoe.com](http://www.doyoe.com). Code released under [the MIT license](http://opensource.org/licenses/MIT). Docs released under [Creative Commons](http://creativecommons.org/licenses/by/4.0/).