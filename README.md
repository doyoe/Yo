# Yo

`Yo` 是一款基于 `Mobile First` 理念而设计的 `CSS Framework`，当然，它也适应于PC端的高级浏览器；其具备轻量，易用，快速且高度强大的自定义能力。


## Quick start

* Install Nodejs
* Clone the repo: `git clone git@github.com:doyoe/Yo.git`
* Install gulp: `npm install gulp -g --registry=https://registry.npm.taobao.org`
* Install dependencies: `npm install --registry=https://registry.npm.taobao.org`
* Run: `gulp`


## Browser support

* iOS6.0+
* Android4.0+
* Latest Stable: Chrome, Safari, Opera, IE10+


## Bugs and feature requests

如果你或者你所在的公司正在使用 Yo，过程中发现了任何问题，或者有任何帮助 Yo 更完善的想法和建议，都可以直接给我提[Issues](https://github.com/doyoe/Yo/issues/new)和[Pull Requests](https://github.com/doyoe/Yo/pulls)。


## Demo And Documentation

* [View Demo](http://doyoe.github.io/Yo/demo/)
* [View Documentation](http://doyoe.github.io/Yo/doc/)

待发布...

## Notice

Yo约束了2种项目所使用的长度单位

* 所有涉及到 `border` 的长度单位都是用 `px`；
* 除 `border` 外，所有的长度设置都是用 `rem` 单位；

## Versioning

The `master` branch is the development of version. The stable versions take the form of `tags`.

### Lastest stable version: v2.0.0

### Developing version: v2.1.0

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

### History

For more information on History Version, Please visit [ChangeLog](changelog.md).


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