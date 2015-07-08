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

## Notice

Yo约束了2种项目所使用的长度单位

* 所有涉及到 `border` 的长度单位都是用 `px`；
* 除 `border` 外，所有的长度设置都是用 `rem` 单位；

## Versioning

### Developing: v1.9.0

* update: `reset`
    - 新增一条重置规则
    ```
    input[type="search" i]::-webkit-search-cancel-button {
        @include appearance;
    }
    ```
    用于抹平各浏览器差异，去除输入时的 `x` 按钮

### Lastest: v1.8.0

* update: `yo-header`
    - 新增 `item-ico-color` 参数用以两侧ico颜色
* add: `yo-align`
    - 新增 `yo-align` 布局方式，用于设置元素的水平及垂直对齐方式
* update: `yo-btn`
    - 新增 `width`, `height` 2个变量用于控制按钮大小
* update: `yo-list`
    - 新增 `item-border-space` 变量用于控制列表项底线距左边的间隙


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