如果你来到了这里，就意味着，你只想使用 `Yo` 的样式部分而不包括UI组件。是的，`v3` 允许你只使用她的样式，像以前那样。在使用之前，请先确保你的机器有能够编译 `Sass` 的环境并开始去了解一些 [Sass](http://sass-lang.com/) 相关的知识（当然，这非常简单）。

与之前不同的是，`v3` 由于增加了组件，所以将之前的 `lib` 和 `usage` 放到了新建 `style` 目录下。

与其它框架不同的是，`Yo` 并不计划提供打包好的 `yo.min.css`，而是推荐直接在 `Yo` 的 `usage` 目录下进行开发。这样你将能体会到 `Yo` 的众多功能和方法为开发所带来的便利，并感受到它的魅力。

好了，请仔细看下面的步骤，这可以帮你快速搞定一切：


## 内容

* [环境搭建](#quick-stat)
* [如何开始](#how-to-start)
* [浏览器支持](#supported-browsers)
* [工程约束](#rules)
* [示例代码](#template)


<a name="quick-stat"></a>
## 环境搭建

### 基础环境

请确保你已经安装过下述环境：

* Bower
* Node.js
* npm

### 使用gulp构建

* 安装: `bower install yo`
* 安装gulp: `npm install gulp -g --registry=https://registry.npm.taobao.org`
* 安装依赖: `npm install --registry=https://registry.npm.taobao.org`
* 在Yo根目录下运行:
    * `gulp watch`: 如果你想监听所有文件的变更
    * `gulp compile`: 如果你只是想编译一次该项目


<a name="how-to-start"></a>
## 如何开始

通过上述的 `环境搭建`，`Yo` 就已经可以在你的机器上跑起来了，在 `Yo` 根目录下运行 `gulp test`，会在 `usage/test` 目录生成一个 `test.css`，这表示一切OK（当然，项目中你可以将test文件夹移除）。


<a name="rules"></a>
## 工程约束

真正的编码之前，先看一下 `Yo` 的目录结构是非常重要的，这有助于理解并更好的使用它：

* `lib` 目录是 `Yo` 框架的底层代码，不要改动它，避免日后升级时遇到麻烦；
* `usage` 目录正是你的舞台，在这做业务的样式编码；
    * `usage/core` 目录下的都是配置文件，比如你想改变某些设定的初始值；
    * 需要编译使用的文件（一般来说都是page级别的文件），放在 `usage/page` 目录下，编译后，默认会输出到 `usage/export` 目录（当然你可以通过配置修改它，或者使用自己喜欢的编译工具）；
    * `usage` 下的其它目录和 `lib` 里的目录一一对应，用于放置业务对各元件的自定义扩展文件；


<a name="template"></a>
## 示例代码

我们可以开始真正的使用 `Yo` 来进行编码了，下面将会展示一段最简单的代码，我们要做一个列表页，其对应的样式表文件为：`list.scss`：

    @charset "utf-8";
    @import "../core/reset";
    @import "../layout/yo-flex";
    @import "../fragment/yo-header";
    @import "../fragment/yo-list";

    // 下面这段模块化的代码，请新建一个 `m-xxx` 的文件并将代码移过去，然后 `@import` 到这里
    // 为了方便演示，所以下述代码直接写在了这里
    .m-xxx {
        // 由于这里所需要的`list`和默认展示不同，所以使用 `yo-list` 进行自定义扩展
        @include yo-list(
            $margin: .1rem,
            $border-width: 1px,
            $border-color: #ccc,
            $radius: .1rem
        );
    }

首先，我们将 `reset` 引入 `list.scss`，这是必须的；该列表页由一个 `yo-header` 和 `yo-list` 组成，于是引入与之相关的2个元件；同时，我们想要使用 `flex` 布局，所以引入了 `yo-flex` 元件。

在页面上请使用 `list.scss` 编译后的 `list.css` 文件。
