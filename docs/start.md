`Yo` 提供了一些非常便捷的开始方式，你可以通过阅读下面的内容根据自己的特定需要来选择：

* [环境与构建](#environment-and-build)
* [全新的开发方式](#new-developed-way)
* [开始开发](#start-developing)
* [基础用法](#basic-usage)
* [项目目录结构](#directory-structure)
* [更新升级](#upgrade)


<a name="environment-and-build"></a>
## 环境与构建

### 基础环境

请确保你已经安装过下述环境：

* Node.js
* npm
    > 我们推荐使用 `>=3.0.0` 版本的 `npm` 进行开发。如果 `npm` 的版本过低，可能会导致一些问题，具体说明和解决方案请查看 [这里](./start-npm.html)。

### 使用 `ykit` 构建（推荐）

`Yo` 提供了基于 `ykit` 的构建工具，只需简单几步，你就可以构建出一个基于 `Yo` 的项目。

* 安装 [ykit](http://ued.qunar.com/ykit/)：`(sudo) npm install ykit -g`
* 初始化一个项目：在项目根目录下（没有则新建）执行 `ykit init yo`，将会自动完成 `Yo` 的安装，同时为你构建出 [Yo标准工程目录](#directory-structure)

如果需要在已有项目中使用，详情请参考 [这里](./start-diy.html)。


<a name="new-developed-way"></a>
## 全新的开发方式

`Yo` 在开发方式上相比之前有了比较大的改进。

* 基于React：`Yo` 全面拥抱 `ES6` 语法和 `React`，在使用 `Yo` 开发之前，你应该首先熟悉一下 [React](https://facebook.github.io/react/)。
* 样式革新：`Yo` 不再要求必须使用传统的 `css` 和 `js` 分离的方式，而是推荐直接在 `js` 文件里引入 `scss` 文件，构建工具会自动帮你在该 `js` 文件所在目录生成一个同名的 `css` 文件。

    例如：page/demo/index.js

    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.scss'; // 引入这个页面的scss
    ```

* 使用chunk模式：`Yo` 默认使用了 `webpack` 的 `chunk` 模式，即不管是单页还是多页模式，`js` 资源都是按需加载的。[查看详情](./start-chunk.html)
* 使用DLL：`Yo` 为了提升开发体验、有效利用浏览器缓存，将项目中的公共模块提取并生成公共文件 `lib.js`，用户只需要在页面中多添加一个引用即可。[查看详情](./start-lib.html)


<a name="start-developing"></a>
## 开始开发

* 启动ykit：在项目上一级目录执行 `(sudo) ykit server`
* 添加资源引用：

    首先，在项目根目录找到 `ykit.yo.js` 文件（该文件是在项目初始化时自动创建的），并通过 `export` 参数配置 `js` 文件的入口。

    ```
    export: ['./page/demo/index.js'],
    ```

    > 由于构建工具会帮你在 `js` 文件所在目录生成一个同名 `css` 文件，所以在配置入口时只需添加 `js`，不需要添加 `css`。

    然后，在页面中引用 `js` 和 `css` 资源。

    ```html
    <link rel="stylesheet" href="[项目路径]/prd/page/home/index.css" />
    ...
    <script src="[项目路径]/prd/lib.js"></script>
    <script src="[项目路径]/prd/page/home/index.js"></script>
    ```

    > * 由于使用了 `DLL`，所以页面中需要多引入一个 `lib.js`。
    > * 在更新了 `node_modules` 或是修改了 `DLL` 相关的配置之后，你可能需要执行 `ykit dll` 并重启 `ykit` 服务。[查看详情](./start-lib.html)

* 访问页面：这个时候你的页面已经可以正常访问了
> 当然，你也可以访问项目初始化时，我们为您创建的示例页面（默认地址是：[http://127.0.0.1/项目名/src/html/index.html](http://127.0.0.1/项目名/src/html/index.html)）


<a name="basic-usage"></a>
## 基础用法

### 配置别名

项目初始化时，会在生成的 `ykit.yo.js` 文件中对一些常用的路径配置别名。开发时，你将不再需要关心它们的引用路径深度。

    alias: {
        '$yo': 'yo3',
        '$yo-config': '/src/yo-config',
        '$yo-component': 'yo3/component',
        '$component': '/src/component',
        '$common': '/src/common',
        '$router': 'yo-router'
    }

这是默认配置（推荐），实际开发中，你也可以对它们进行修改，或者配置一些新的别名。**注意：不要在配置的路径最后加 "/"**

> 大家可能会奇怪为什么在项目初始化时，会安装一个 `yo3` 而不是 `yo` 的模块。这是因为 `yo` 在 `npm` 上已经被占用，所以我们只好将包名改为了 `yo3`。但是通过上述的别名配置后，基本上也无伤大雅。


### 使用Yo Component

`Yo v3` 提供了数量众多的React组件，需要使用时将它们 `import` 进来即可。当然，首先你需要引入 `React` 和 `ReactDOM`：

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GroupList from '$yo-component/grouplist';
import Toast from '$yo-component/toast'
```

- 引用方式：组件的样式无需单独再引入一次，组件的js内部已经有了样式的引用。这意味着你再也不需要为管理样式的依赖操心了，excited！

- 使用方法：具体使用方式请参考 [文档和Demo](./component.html)（Demo是可以在页面里玩的哦，请使用Chrome浏览器来查看Demo）。

如果你的 `ykit-config-yo` 已经升级到 `1.1.17` 以上的版本，你还可以使用更加便捷的语法糖：

```
import { Scroller, Touchable, List, GroupList } from '$yo-component';
```

在编译之后这行代码将会被转化为：

```
import Scroller from 'yo3/component/scroller';
import Touchable from 'yo3/component/touchable';
import List from 'yo3/component/list';
import GroupList from 'yo3/component/grouplist';
```

### 使用Yo style

在样式的使用上，`Yo v3` 保留了一切之前的特性和用法。

不太一样的是，`Yo` 的脚手架会在项目工程下生成一个 `yo-config` 目录，它对应的是以前的 `usage` 目录。对于 `Yo` 的所有元件，我们仍然可以在 `yo-config` 目录下的对应文件中进行扩展，推荐大家在这里扩展全局和通用性的元件，特殊或者单一性的扩展可以放到具体的页面级样式文件中进行。

同时，`Yo` 的样式 `lib` 目录不再直接放在项目工程目录下，而是在项目初始化时被安装到了 `node_modules` 目录下，规避在业务开发中被修改的可能性，降低升级的风险。

如果需要在项目中直接引用 `lib` 中的文件，这样做即可：

```css
@import "$yo/style/lib/layout/yo-flex";
@import "$yo/style/lib/element/yo-btn";
```

而引用 `yo-config` 中的扩展时，可以这样：

```css
@import "$yo-config/core/reset";
@import "$yo-config/layout/yo-flex";
```


<a name="directory-structure"></a>
## 项目目录结构

在构建完成之后会生成下面的目录结构：

```
|- node_modules
|- src --------------------------// 项目源码
|  |- common --------------------// 公共配置、工具等
|  |- component -----------------// 公共组件
|  |   |- componentA
|  |   |    |- index.js ---------// 组件代码
|  |   |    |- style.scss -------// 组件样式
|  |   |- componentB
|  |   |- ...
|  |- page ----------------------// 业务逻辑目录（页面维度）
|  |   |- pageA //页面目录
|  |   |    |- index.js ---------// 页面入口文件
|  |   |    |- index.scss -------// 页面样式
|  |   |    |- component --------// 页面内部使用的组件
|  |   |- pageB
|  |   |- ...
|  |- html ----------------------// 页面html
|  |- yo-config -----------------// 样式配置文件夹
|- ...
|- package.json // npm配置文件
|- ykit.yo.js // ykit配置文件
```


<a name="upgrade"></a>
## 更新升级

相比于之前的升级方式，现在的 `Yo` 升级也更加简便，只需要在项目目录执行 `npm install` 即可。

`Yo` 升级时，只会对 `node_modules` 中的 `yo3` 模块进行更新，而不会侵入用户目录中的其它地方。假设 `Yo` 新增了一些组件，升级时，会增量的将这些新组件添加到项目的 `yo-config` 目录中，而不会改动任何已存在的文件。
这时你会在npm install结束后在控制台看到如下信息：

```
yo:新增文件[文件名]已经被拷贝到[目录路径]
```

请注意，这时候你应该手动执行一次``git add ./src/yo-config``，否则新增的文件不会被加入到版本控制中。

当你需要升级 `Yo` 的时候，请仔细阅读 [版本变更](changelog.html) 。
