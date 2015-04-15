# Yo

一个基于 `Sass` 开发的 `CSS Framework`，Mobile First 的设计理念使得 Yo 的体积超轻量，同时又能延伸到支持PC端。


## Quick start

* 克隆：`git@github.com:doyoe/Yo.git`
* Ruby环境：`如果是windows环境需要先安装ruby`
* 安装Compass：`gem install compass`
* 装gulp：`npm install gulp -g`
* 安装依赖模块，`npm install`
* 编译命令：`gulp`


## Browser support

* iOS6.x, iOS7.x, iOS8.x
* Android4.x, Android5.x
* Latest Stable: Chrome, Safari


## Bugs and feature requests

如果你或者你所在的公司正在使用 Yo，过程中发现了任何问题，或者有任何帮助 Yo 更完善的想法和建议，都可以直接给我提[Issues](https://github.com/doyoe/Yo/issues/new)和[Pull Requests](https://github.com/doyoe/Yo/pulls)。


## Documentation

待发布...

## Versioning

### Developing: v1.5.0

* TODO...

### Lastest: v1.4.0

* update:
    - 删除了 `layout.scss`，如果当前页面需要设置root是否允许滚动，使用 `root-scroll()` 方法
    - 新增 `yo-flex` 弹性布局方法
* update: `flex` 方法
    - 删除 `flex` 方法的 `display: block` 设置，如果参与flex布局，请自行使用非inline元素
* update: `yo-badge`
    - 新增 `padding` 参数用于设置内补白
    - 新增 `border-width` 参数用于设置边框厚度
* update: `yo-btn`
    - 新增 `border-width` 参数用于设置边框厚度
* update: `yo-checked`
    - 删除 `type` 参数，不再使用该参数设置来判定使用哪个标记
    - 新增 `content` 参数用于设置标记，可以直接传字符或者iconfont
    - 新增 `font-size` 参数用于标记大小
    - 新增 `border-width` 参数用于设置边框厚度
    - 新增 `color` 参数用于未选中状态时的标记颜色
* add `background-size` 方法
* update: `yo-header`
    - 增加 `item-ico-size` 参数，用于设置两侧ico的大小
* update: `yo-list`
    - 删除 `is-outline` 参数，新增 `border-width` 参数用于设置外边框厚度
    - 增加 `on-color` 参数，用于设置列表项选中时文本色
    - 删除列表项的 `min-height` 定义
* update: `yo-search`
    - 增加 `cancel-width` 参数，用于设置取消按钮区域的宽度


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