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

* add: `yo-panel`
    - 新增 `yo-panel`，以后会缓步替代 `yo-group`
* update: `yo-search`
    - `yo-search` 更名为 `yo-suggest`
    - 去除 `非独占` 形态下的 `取消` 按钮
    - 新增输入时loading状态
* update: `ani`
    - 新增 `rotate` 动画

### Lastest: v1.4.0

* update: `yo-tab`
    - 删除tab子项的:active状态
    - 选中状态只保留 `item-on` 类名，删除 `on`
* update: `yo-loading`
    - loading换成webfonts
    - `size` 参数改成 `ico-size`
    - `color` 参数改成 `ico-color`
    - 新增 `font-size` 参数用以控制文本大小
    - 新增 `color` 参数用以控制文本颜色
    - 新增 `content` 参数用以控制loading的形态，可传入webfonts编码
* update:
    - 删除元素 `yo-checkbox` 和 `yo-radio`，如已使用可以直接改用 `yo-checked`


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