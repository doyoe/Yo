# Yo

一个基于 `Sass` 开发的 `CSS Framework`，Mobile First 的设计理念使得 Yo 的体积超轻量，同时又能延伸到支持PC端。


## Quick start

待完善...


## Browser support

* iOS6.x, iOS7.x, iOS8.x
* Android4.x, Android5.x
* Latest Stable: Chrome, Safari


## Bugs and feature requests

如果你或者你所在的公司正在使用 Yo，过程中发现了任何问题，或者有任何帮助 Yo 更完善的想法和建议，都可以直接给我提[Issues](https://github.com/doyoe/Yo/issues/new)和[Pull Requests](https://github.com/doyoe/Yo/pulls)。


## Documentation

待发布...

## Versioning

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


### History

For more information on History Version, Please visit [changelog](changelog.md).


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