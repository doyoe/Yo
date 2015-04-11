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

### Developing: v1.4.0

* update: `yo-badge`
    - 新增 `padding` 参数用于设置内补白
    - 新增 `border-width` 参数用于设置边框厚度
* update: `yo-btn`
    - 新增 `border-width` 参数用于设置边框厚度
* update: `yo-checked`
    - 删除 `type` 参数，不再使用该参数设置来判定使用哪个标记
    - 新增 `content` 参数用于设置标记，可以直接传字符或者iconfont
    - 新增 `font-size` 参数用于标记大小
* add `background-size` 方法
* update: `yo-header`
    - 增加 `item-ico-size` 参数，用于设置两侧ico的大小
* update: `yo-list`
    - 删除 `is-outline` 参数，新增 `border-width` 参数用于设置外边框厚度
    - 增加 `on-color` 参数，用于设置列表项选中时文本色
    - 删除列表项的 `min-height` 定义
* update: `yo-search`
    - 增加 `cancel-width` 参数，用于设置取消按钮区域的宽度

### Lastest: v1.3.1

* update: `yo-switchable` 参数配置
* update: `yo-btn`
    - 增加 `active-bordercolor`, `active-bgcolor`, `active-color` 参数，用于设置按钮按下时的边框、背景、文本颜色；
* update: `yo-tab`
    - 删除 `is-border`, `is-item-border`, `on-bordercolor` 参数；
    - 新增 `border-width` 参数，用于设置tab的外边框厚度；
    - 新增 `radius` 参数，用于设置tab的圆角大小；
    - 新增 `item-border-height` 参数，用于设置tab子项间隔线的高度；
    - 新增 `item-bordercolor` 参数，用于设置tab子项间隔线的颜色；
* add: 新增分值元素 `yo-score`；
* add: 新增双list `yo-dblist`；
* update: 建议单选和多选都使用 `yo-checked`，后续考虑将 `yo-checkbox` 及 `yo-radio` 删除，尽量不要使用，之前使用过最好及时替换；
* update: `yo-checked`
    - 删除 `is-border` 参数，不再使用该参数来设定是否有边框，利用原有 `bordercolor` 参数，当值为 `transparent` 时，则无边框；
    - 删除 `disabled-color` 参数，Yo所有元素的禁用色都改为继承 `$base` map；
    - 增加 `radius` 参数用于设置圆角；
    - 增加 `on-bordercolor` 参数用于设置激活边框色；
    - 增加 `on-bgcolor` 参数用于设置激活背景色；
* update: yo-rating 外观
    - 增加 `url` 参数用于改变 yo-rating 的外观；


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