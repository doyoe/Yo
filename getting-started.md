#
## 用前须知

`Yo` 是基于 `Mobile First` 理念而设计，并使用 `Sass` 开发的 `CSS Framework`，所以在使用之前，请先确保你的机器有能够编译 `Sass` 的环境并开始去了解一些 [Sass](http://sass-lang.com/) 相关的知识（当然，这非常简单）。

与其它框架不同的是，实际上我们并不计划对外提供打包好的 `yo.min.css` 来供使用，而是推荐直接在 `Yo` 的 `usage` 目录下进行开发。这样你将能体会到 `Yo` 的众多功能和方法为开发所带来的便利，并感受到它的魅力。

好了，请仔细看下面的步骤，这可以帮你快速搞定一切：


## 内容

* [环境搭建](#quick-stat)
* [如何开始](#supported-browsers)
* [问题及反馈](#bugs-and-feature-requests)
* [文档和实例](#documentation-and-demo)
* [版本](#versioning)
* [作者](#author)
* [注意](#attention)


## 环境搭建

* 安装: `Nodejs`
* 克隆项目: `git clone git@github.com:doyoe/Yo.git`
* 安装gulp: `npm install gulp -g --registry=https://registry.npm.taobao.org`
* 安装依赖: `npm install --registry=https://registry.npm.taobao.org`
* 在Yo根目录下运行:
    * `gulp watch`: 如果你想监听所有文件的变更
    * `gulp build`: 如果你只是想build一次该项目


## 如何开始

通过上述的 `环境搭建`，`Yo` 已经可以在你的机器上跑起来了，你可以打开 `Demo` 目录下的任意文件，

## 注意

#### Yo约束了2种项目所使用的长度单位

* 所有涉及到 `border` 的长度单位都是用 `px`；
* 除 `border` 外，所有的长度设置都是用 `rem` 单位；

#### Yo重置了盒模型

为了让计算变得简单，我们改变了所有元素的盒模型，将其重置为 `border-box`。当然，也包括常用的伪元素 `::before` 和 `::after`。

    *,
    ::before,
    ::after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

如果你长时间工作在 `PC` 平台上，这个设定可能需要一个适应的过程，但可以肯定的是，你一定会喜欢上它。