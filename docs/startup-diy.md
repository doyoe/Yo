# 安装

## 1. 前置工作

首先需要全局安装ykit, 执行:
```
sudo npm install @qnpm/ykit -g --registry=http://registry.npm.corp.qunar.com/ --cache=$HOME/.npm/.cache/qnpm --userconfig=$HOME/.qnpmrc
```

然后你需要去git上新建一个项目并克隆至本地。

## 2. 项目目录结构

我们推荐你采用如下的目录结构:

```
|- node_modules
|- src // 项目源码
|  |- page // 放页面的目录
|  |   |- pageA //页面目录
|  |   |    |- index.js // 页面入口文件
|  |   |    |- style.scss // 页面样式
|  |   |    |- component // 页面内部使用的组件
|  |   |- pageB // 一样
|  |   |- ...
|  |- component // 公共组件
|  |   |- componentA
|  |   |    |- index.js // 组件代码
|  |   |    |- style.scss // 组件样式
|  |   |- componentB //一样
|  |   |- ...
|  |- html //页面html 如果有的话
|  |- yo-config // yo-usage文件夹, 这个文件夹在安装yo以后会自动生成
```

## 3. 初始化ykit
在项目目录下执行``ykit init``即可出现init提示, 根据提示一步步操作即可。

## 4. 安装Yo

Yo 2.0现在已经可以通过npm安装, 首先你需要在刚刚克隆的项目中执行npm init以生成一个package.json文件:

```
cd /path/to/your/project
npm init
```

package.json文件创建完成后, 在JSON中加入如下配置:

```
"yo" : {
    "path": "./src/yo-config"
}
```

path属性应该填入一个路径, 然后yo安装完成后会把yo/style/usage目录复制到这个路径下面并命名为yo-config。这里我们统一推荐使用./src/yo-config这样的配置。
** 注意: 请不要修改yo-config的目录结构以及增删文件, 否则今后的升级过程可能会出现问题。 **

完成以上工作以后, 执行qnpm install:

```
npm install @qnpm/yo -save --registry=http://registry.npm.corp.qunar.com/ --cache=$HOME/.npm/.cache/qnpm --userconfig=$HOME/.qnpmrc
```

## 5. 安装其他依赖并配置ykit-hy

Yo 2.0采用了全新的ES6+React的开发方式, 在开始开发之前你需要引入依赖的模块, 在package.json中加入以下依赖:
```
{
...
  "dependencies": {
      "@qnpm/hysdk": "^1.0.0-beta", // 如果不需要使用hysdk, 可以不写这一项
      "@qnpm/ykit-config-hy2": "^0.1.4",
      "@qnpm/yo": "^3.0.0-alpha2",
      "@qnpm/yo-router": "^1.0.0-alpha4", // 如果不需要使用router, 可以不写这一项
      "babel-polyfill": "^6.16.0",
      "react": "^15.3.2",
      "react-dom": "^15.3.2",
      "webpack": "^1.13.3"
  }
  ...
}
```

执行install:
```
npm install --registry=http://registry.npm.corp.qunar.com/ --cache=$HOME/.npm/.cache/qnpm --userconfig=$HOME/.qnpmrc
```

然后需要修改ykit.hy的配置, 首先在ykit.hy.js的头部加入webpack的依赖(需要使用webpack的env插件)。
```
var webpack = require('webpack');
```

然后在export.config后面的函数中加入以下代码:
```
export.config=function(){
    ...
    // 开发机sync配置
    this.setSync({
        host: "192.168.237.71",
        path: "/home/q/www/qunarzz.com/yo-demo"

    }

    this.setConfig(function (config) {
        // [配置]编译环境
        var env = 'dev';
        switch (self.env) {
            case 'local':
                env = 'dev';
                break;
            case 'dev':
                env = 'production';
                break;
            case 'prd':
                env = 'production';
        }

        var envPlugin = new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env)
            }
        });

        config.plugins.push(envPlugin);

        // [配置]项目中的别名，推荐所有的别名都以 $ 开头，既能一眼识别出是别名，也能避免命名冲突
        // 注意这里的别名只是webpack别名功能的子集
        // 别名路径只资词两种格式, 以'/'开头的会从你项目的根目录开始查找对应目录
        // 否则直接使用字符串替换
        // scss文件也同样资词别名, 可以放心使用
        // 请严格遵守以上规则, 否则会出现模块引用错误
        config.resolve = {
            alias: {
                '$yo': '/src/yo-config'
            }
        config.devtool = 'source-map
        return config;
    });
    ...
    return config;
}
```

## 6. 在html中引入js和css

首先需要做的是配置项目js的output, 在ykit.hy.js中找到this.setExports, 在其中添加你需要导出的页面js, 以下是一个例子:
```
// 项目资源入口, 将babel-polyfill和whatwg-fetch直接合并到输出中
this.setExports([
    ['babel-polyfill', 'whatwg-fetch', './page/approval/list/index.js']
]);
```
然后新建一个页面html, 在</body>之前插入script标签, 注意prd之后的部分和上面的export配置的路径一致:
```
<script src="/psapproval/prd/page/approval/list/index.js"></script>
```
在<head>添加一个link标签引入css:
```
<link rel="stylesheet" href="/psapproval/prd/page/approval/list/index.css">
```
所有的配置到这里就完成了。很快我们会推出一个cli工具, 它能够用一行命令帮你完成以上的所有工作。

## 7. 升级

Yo 2.0的升级方式比之前有了很大优化, 现在仅仅需要重新执行一次npm install过程, 无需再执行其他操作。

# 开始开发

## 1. 启动ykit server

执行以下命令``cd .. && sudo ykit server``即可启动ykit开发服务器。然后在浏览器里访问你配置好的页面即可。

## 2. 全新的开发模式

Yo 2.0完全抛弃了传统的fekit时代的开发模式, 全面拥抱ES6语法和React, 在使用Yo开发之前, 你应该首先熟悉一下[React和Flux](https://facebook.github.io/react/)。

另外一个很大的革新是引入样式的方式。Yo 2.0不再推荐使用传统的css和js分离的方式, 而是利用webpack-css-loader和webpack-scss-loader直接在js文件里引入.scss文件:
```
// page/index/index.js
import './style.scss' // 引入这个页面的scss
import React from 'react';
...
```
幸运的是这项工作ykit已经帮你做好了, 不需要额外的配置, 开发时需要做的仅仅是启动ykit server。

## 3. 使用Yo Component

Yo2.0提供了数量众多的React组件, 需要使用时将它们import进来即可, 当然, 首先你需要import React和ReactDOM:

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GroupList from '@qnpm/yo/component/grouplist';
import Toast from '@qnpm/yo/component/toast'
```
组件的样式无需单独再引入一次, 组件的js内部已经有了样式的引用。这意味着你再也不需要为管理样式的依赖操心了, excited!

具体的每个组件的使用方式请参考各个组件的[文档和Demo](./yo3/component.html)(Demo是可以在页面里玩的哦, 请使用Chrome浏览器来查看Demo), 下面给出一个示例页面的代码:

```
import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Page from '../component/page';
import GroupList from '@qnpm/yo/component/grouplist';

const componentList = [
    {
        text: 'Touchable',
        groupKey: 'Touchable',
        link: '../touchable/index.html'
    },
    {
        text: 'Scroller',
        groupKey: '滚动和列表',
        link: '../scroller/index.html'
    },
    {
        text: 'List',
        groupKey: '滚动和列表',
        link: '../list/index.html'
    },
    ...
];

class DemoIndex extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Page title="Yo-Component Demo">
                <GroupList
                    dataSource={componentList}
                    onItemTap={(item)=> {
                        location.href = item.link;
                    }}
                    renderGroupItem={item => {
                        return [
                            <div key={0} className="flex">{item.text}</div>,
                            <i key={1} className="yo-ico more">&#xf07f;</i>
                        ];
                    }}
                />
            </Page>
        );
    }
}

ReactDOM.render(<DemoIndex />, document.getElementById('content'));
```