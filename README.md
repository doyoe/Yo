# Yo

`Yo` 是一款基于 `Mobile First` 理念而设计的 `CSS Framework`；轻量，易用，快速且具备高度强大的自定义能力。


## Quick start

* 克隆：`git clone git@github.com:doyoe/Yo.git`
* Ruby环境：`如果是windows环境需要先安装ruby`
* 安装Compass：`gem install compass`
* 装gulp：`npm install gulp -g`
* 安装依赖模块，`npm install`
* 编译命令：`gulp`


## Browser support

* iOS6.0+
* Android4.0+
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

### Developing: v1.8.3

* 开发中...

### Lastest: v1.8.2

* update: `yo-list`
    - 修复item底边线的问题
* update: `yo-btn`
    - 移除按钮内1px高亮定义
    - 更改 disabled 状态定义
* update: `flex` mixin方法
    - 如果横向排列时使用flex方法如下：
    ```
    @include flex(n);
    ```
    - 如果纵向排列时使用flex方法如下：
    ```
    @include flex(n, column);
    ```


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