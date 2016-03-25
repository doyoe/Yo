#
## 用前须知

`Yo` 是基于 `Mobile First` 理念而设计，并使用 `Sass` 开发的 `CSS Framework`，所以在使用之前，请先确保你的机器有能够编译 `Sass` 的环境并开始去了解一些 [Sass](http://sass-lang.com/) 相关的知识（当然，这非常简单）。

与其它框架不同的是，实际上我们并不计划对外提供打包好的 `yo.min.css` 来供使用，而是推荐直接在 `Yo` 的 `usage` 目录下进行开发。这样你将能体会到 `Yo` 的众多功能和方法为开发所带来的便利，并感受到它的魅力。

好了，请仔细看下面的步骤，这可以帮你快速搞定一切：


## 内容

* [环境搭建](#quick-stat)
    * [使用gulp构建](#gulp)
    * [使用fekit&QMB构建](#fekit)
* [如何开始](#how-to-start)
* [工程约束](#rules)
* [示例代码](#template)
* [注意](#attention)
    * [文档模式](#doctype)
    * [视窗viewport](#viewport)
    * [单位](#units)
    * [盒模型](#box-sizing)


<a name="quick-stat"></a>
## 环境搭建

<a name="gulp"></a>
### 使用gulp构建

* 安装: `Nodejs`
* 克隆项目: `git clone git@github.com:doyoe/Yo.git`
* 安装gulp: `npm install gulp -g --registry=https://registry.npm.taobao.org`
* 安装依赖: `npm install --registry=https://registry.npm.taobao.org`
* 在Yo根目录下运行:
    * `gulp watch`: 如果你想监听所有文件的变更
    * `gulp build`: 如果你只是想build一次该项目

<a name="fekit"></a>
### 使用fekit&QMB构建

* 使用方法参考：[QMB使用说明](http://ued.qunar.com/mobile/qmb2/)


<a name="how-to-start"></a>
## 如何开始

通过上述的 `环境搭建`，`Yo` 就已经可以在你的机器上跑起来了，此时你可以浏览 `Demo` 目录下的任意演示文件来确认它是否正常。


<a name="rules"></a>
## 工程约束

真正的编码之前，先看一下 `Yo` 的目录结构是非常重要的，这有助于理解并更好的使用它：

* `lib` 目录是 `Yo` 框架的底层代码，不要改动它，避免日后升级时遇到麻烦；
* `usage` 目录正是你的舞台，在这做业务的样式编码；
    * `usage/core` 目录下的都是配置文件，比如你想改变某些设定的初始值；
    * 需要编译使用的文件（一般来说都是page级别的文件），放在 `usage/page` 目录下，编译后，会输出到 `usage/export` 目录；
    * `usage` 下的其它目录和 `lib` 里的目录一一对应，用于放置扩展文件；


<a name="template"></a>
## 示例代码

我们可以开始真正的使用 `Yo` 来进行编码了，下面将会展示一段最简单的代码，我们要做一个列表页，其对应的样式表文件为：`list.scss`：

    @charset "utf-8";
    @import "../core/reset";
    @import "../fragment/yo-flex";
    @import "../fragment/yo-header";
    @import "../element/yo-list";

    // 下面这段模块化的代码，请新建一个 `m-xxx` 的文件并将代码移过去，然后 `@import` 到这里
    // 为了方便演示，所以下述代码直接写在了这里
    .m-xxx {
        // 由于这里所需要的`list`和默认展示不同，所以使用 `yo-list` 进行扩展
        @include yo-list(
            $margin: .1rem,
            $border-width: 1px,
            $border-color: #ccc,
            $radius: .1rem
        );
    }

首先，我们将 `reset` 引入 `list.scss`，这是必须的；该列表页由一个 `yo-header` 和 `yo-list` 组成，于是引入与之相关的2个元件；同时，我们想要使用 `flex` 布局，所以引入了 `yo-flex` 元件。

在页面上请使用 `list-scss` 编译后的 `list.css` 文件。


<a name="attention"></a>
## 注意

`Yo` 做了一些全局的定义，这些定义也让设计变得意思。

<a name="doctype"></a>
### 文档模式

为了能够让你的样式得到完整的解析，我们推荐你使用 `HTML5 doctype`：

    <!DOCTYPE html>

<a name="viewport"></a>
### 视窗viewport

`Yo` 采用 `Mobile First` 的策略设计，首先要保证移动设备上的体验，至于不同的终端，可以配合 `响应式` 来做适配：

    <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />

如果应用需要考虑手动缩放的情况，可以将 `maximum-scale=1, user-scalable=no` 移除；但不建议移除 `minimum-scale=1`，因为页面可能会被缩小到难以阅读的程度。

<a name="units"></a>
### 单位

`Yo` 约束了2种项目所使用的长度单位

* 所有涉及到 `border` 的长度单位都是用 `px`；
* 除 `border` 外，所有的长度设置都是用 `rem` 单位；

<a name="box-sizing"></a>
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