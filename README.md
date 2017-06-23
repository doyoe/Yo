# Yo

`Yo` 是一个纯粹的移动前端开发框架，专注为移动应用提供快速且专业的构建方式；她轻量，易用，可配置，并且具备超强的扩展能力。

`v3` 版本是 `Yo` 的一个新里程碑，我们将加入丰富的UI组件，让构建移动应用变得更简单。如果你对之前的 `Yo` 恋恋不舍，只想使用她的样式，`v3及后续版本` 仍然会满足，你只需要保持和之前的版本一样安装和使用即可，我们提供了与之对应的 `pure` 版本。

下面的内容可以帮你更好的了解 `Yo`：

* [简介](#intro)
* [起步](#getting-started)
* [浏览器支持](#supported-browsers)
* [注意](#attention)
* [实例和文档](#documentation-and-demo)
* [版本](#versioning)
* [问题及反馈](#bugs-and-feature-requests)
* [作者](#author)
* [版权和许可](#copyright-and-license)


<a name="intro"></a>
## 简介

与其它框架不同的是，实际上我们并不计划对外提供类似打包好的 `yo.min.css/yo.min.js` 来供使用，而是推荐直接在 `Yo` 的标准工程目录下进行开发。这样你将能体会到 `Yo` 的众多功能和方法为开发所带来的便利，并感受到它的魅力。

<a name="getting-started"></a>
## 起步

* 根据 [起步说明](http://yo.doyoe.com/doc/getting-started.html) 了解 `Yo` 的工作原理并开始构建标准的 `Yo` 项目；


<a name="supported-browsers"></a>
## 浏览器支持

* iOS6.0+
* Android4.0+
* Latest Stable: Chrome, Safari, Opera, IE10+


<a name="attention"></a>
## 注意

`Yo` 做了一些全局的定义，这些定义也让设计变得意思。

### 文档模式

为了能够让你的样式得到完整的解析，我们推荐你使用 `HTML5 doctype`：

    <!DOCTYPE html>

### 视窗viewport

`Yo` 采用 `Mobile First` 的策略设计，首先要保证移动设备上的体验，至于不同的终端，可以配合 `响应式` 来做适配：

    <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />

如果应用需要考虑手动缩放的情况，可以将 `maximum-scale=1, user-scalable=no` 移除；但不建议移除 `minimum-scale=1`，因为页面可能会被缩小到难以阅读的程度。

### 单位

`Yo` 约束了2种项目所使用的长度单位

* 所有涉及到 `border` 的长度单位都是用 `px`；
* 除 `border` 外，所有的长度设置都是用 `rem` 单位；

### 盒模型

为了让计算变得简单，我们改变了所有元素的盒模型，将其重置为 `border-box`。当然，也包括常用的伪元素 `::before` 和 `::after`。

    *,
    ::before,
    ::after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

如果你长时间工作在 `PC` 平台上，这个设定可能需要一个适应的过程，但可以肯定的是，你一定会喜欢上它。

### flex布局

为了让你的 `flex` 布局可以正常工作，请检查 `flex子项` 是否为块级元素（可以显式的通过 `display` 来定义），在较老的平台及浏览器上，如果 `flex子项` 是行内级元素，`flex` 布局将会解析错误。


<a name="documentation-and-demo"></a>
## 实例和文档

* [View Demo](http://doyoe.github.io/Yo/demo/)
* [View Documentation](http://doyoe.github.io/Yo/doc/)

如果你想在本地构建 `Yo` 的文档，只需要：

* 安装 ydoc：`npm install ydoc -g --registry=https://registry.npm.taobao.org`
* 在项目根目录下执行：`ydoc build`

此时，文档将会默认生成到 `doc` 目录下。

> 线上默认提供的只是最新版本的文档，如果你正在使用过往版本，则可以按照这种方式直接生成本地文档。


<a name="versioning"></a>
## 版本

`Yo` 的版本方针遵循 [SemVer](http://semver.org/lang/zh-CN/) 规范，版本号采用 `主版本号.次版本号.修订号` 的格式。版本发布周期是透明的，并尽可能保证向前向后兼容，您可以根据我们的语义化版本方针进行版本控制。

你可以在 [releases tag](https://github.com/doyoe/Yo/releases) 中找到当前所有已发布的稳定版本。如想查看更多版本变更历史，请查看 [ChangeLog](changelog.md)


<a name="bugs-and-feature-requests"></a>
## 问题及反馈

如果您的项目正在使用`Yo`，过程中发现了任何问题，或者有任何帮助`Yo`更完善的想法和建议，请直接给我们提 [Issues](https://github.com/doyoe/Yo/issues/new) 和 [Pull Requests](https://github.com/doyoe/Yo/pulls)。


<a name="author"></a>
## 作者

**杜瑶**

* https://github.com/doyoe
* http://weibo.com/doyoe
* http://www.doyoe.com

**YMFE Team**

* https://github.com/YMFE


<a name="copyright-and-license"></a>
## 版本和许可

源码和文档版权属于 Yo 的所有开发者。源码发布基于 [the MIT license](http://opensource.org/licenses/MIT) 开源协议。文档发布基于 [Creative Commons](http://creativecommons.org/licenses/by/4.0/) 开源协议。