<h4><strong style="color: red;">当前为内测版本！</strong></h4>

## 安装


1. 安装ykit

    ```
    sudo npm install @qnpm/ykit -g --registry=http://registry.npm.corp.qunar.com/ --cache=$HOME/.npm/.cache/qnpm --userconfig=$HOME/.qnpmrc
    ```

2. 安装 ykit-extension-yo

    ```
    sudo npm install @qnpm/ykit-extension-yo -g --unsafe-perm --registry=http://registry.npm.corp.qunar.com/ --cache=$HOME/.npm/.cache/qnpm --userconfig=$HOME/.qnpmrc
    ```

## 构建项目

在你的工作目录下新建项目目录，并进入该目录执行 `ykit yo init --hy2`，即可构建出一个基于 `Yo` 的项目工程。

### 目录结构

在构建完成之后会生成下面的目录结构（这与之前的版本有较大的不同）：

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
|  |   |- ...
|  |   |- ...
|  |- page ----------------------// 业务逻辑目录（页面维度）
|  |   |- pageA //页面目录
|  |   |    |- index.js ---------// 页面入口文件
|  |   |    |- index.scss -------// 页面样式
|  |   |    |- component --------// 页面内部使用的组件
|  |   |- pageB
|  |   |- ...
|  |   |- ...
|  |   |- ...
|  |- html ----------------------// 页面html
|  |- yo-config -----------------// 样式配置文件夹
|- ...
|- ...
|- ...
|- package.json
|- ykit.hy2.js // ykit配置文件
```

## 全新的开发方式

`Yo 3.0` 在开发方式上相比之前有了比较大的改进。

- 基于React：`Yo 3.0` 完全抛弃了传统的 `fekit` 时代的开发模式，全面拥抱ES6语法和React，在使用Yo开发之前，你应该首先熟悉一下 [React 和 Flux](https://facebook.github.io/react/)。

- 样式革新：`Yo 3.0` 不再推荐使用传统的 `css` 和 `js` 分离的方式, 而是推荐直接在 .js文件里引入 .scss文件。

    ```
    page/index/index.js
    - - - - - - - - - - - -
    import './index.scss' // 引入这个页面的scss
    - - - - - - - - - - - -
    ```

## 开始开发

### 1. 启动ykit server

在项目上一级目录执行 `(sudo) ykit server` 启动 `ykit`，然后访问配置的页面即可。

### 2. 添加资源引用

1. 在 `ykit.hy2.js` 中通过 `setExports` 配置 `.js` 文件的入口。

    ```
    this.setExports([
        './page/demo/index.js'
    ]);
    ```

    P.S. 由于是通过 `js` 引用的 `css`，所以在配置入口时只需添加js，构建工具会自动帮你构建出对应的 `css`。

2. 在页面中添加 `js` 和 `css` 的引用：

    ```
    <link rel="stylesheet" href="//q.qunarzz.com/[项目名]/prd/page/demo/index.css">
    ...
    <script src="//q.qunarzz.com/[项目名]/prd/lib@VERSION.js"><script>
    <script src="//q.qunarzz.com/[项目名]/prd/page/demo/index@VERSION.js"></script>
    ```

### 3. 使用Yo Component

`Yo3.0` 提供了数量众多的React组件，需要使用时将它们 `import` 进来即可。当然，首先你需要引入 `React` 和 `ReactDOM`：

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GroupList from '@qnpm/yo/component/grouplist';
import Toast from '@qnpm/yo/component/toast'
```

- 引用方式：组件的样式无需单独再引入一次，组件的js内部已经有了样式的引用。这意味着你再也不需要为管理样式的依赖操心了，excited！

- 使用方法：具体使用方式请参考 [文档和Demo](./component.html)（Demo是可以在页面里玩的哦，请使用Chrome浏览器来查看Demo）。

### 4. 使用Yo style

在样式的使用上，`Yo3.0` 保留了一切之前的特性和用法。

不太一样的是，`Yo` 的脚手架会在项目工程下生成一个 `yo-config` 目录，它对应的是以前的 `usage` 目录。对于 `Yo` 的所有元件，我们仍然可以在 `yo-config` 目录下的对应文件中进行扩展，推荐大家在这里扩展全局和通用性的元件，特殊或者单一性的扩展可以放到具体的页面级样式文件中进行。

同时，`Yo` 的样式 `lib` 目录不再直接放在项目工程目录下，而是放到了 `node_modules` 目录下，规避在业务开发中被修改的可能性，降低升级的风险。

如果需要引用 `lib` 中的文件，这样做即可：

```css
@import "~@qnpm/yo/style/lib/layout/yo-flex";
@import "~@qnpm/yo/style/lib/element/yo-btn";
```

而引用 `yo-config` 中的扩展时，可以这样：

```css
@import "$yo/core/reset";
@import "$yo/layout/yo-flex";
```

`$yo` 是指向到 `yo-config` 目录的一个默认的别名，这样就不用再为目录层级烦恼。当然，这个别名可以在配置文件中修改。


## 升级

相比于之前的升级方式，现在的 `Yo` 升级也更加简便，只需要在项目目录执行 `npm install --registry=http://registry.npm.corp.qunar.com/` 即可。