#
## 用前须知

`Yo` 是基于 `Mobile First` 理念而设计，并使用 `Sass` 开发的 `CSS Framework`，所以在使用之前，请先确保你的机器有能够编译 `Sass` 的环境。如果还没有，下面的步骤可以帮你快速搞定：


## 内容

* [环境搭建](#quick-stat)
* [浏览器支持](#supported-browsers)
* [问题及反馈](#bugs-and-feature-requests)
* [文档和实例](#documentation-and-demo)
* [版本](#versioning)
* [作者](#author)
* [版权和许可](#copyright-and-license)


## 环境搭建

* 安装: `Nodejs`
* 克隆项目: `git clone git@github.com:doyoe/Yo.git`
* 安装gulp: `npm install gulp -g --registry=https://registry.npm.taobao.org`
* 安装依赖: `npm install --registry=https://registry.npm.taobao.org`
* 运行:
    * `gulp watch`: 如果你想监听所有文件的变更
    * `gulp build`: 如果你只是想build一次该项目


## 内容


首先，实际上我们并不计划对外提供打包好的 `yo.min.css` 来供直接引用，而是推荐直接在 `Yo` 的 `usage` 目录下进行开发。因为这样，你才更能体会 `Yo` 的众多功能和方法所带来的便利，并感受到它的魅力。


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