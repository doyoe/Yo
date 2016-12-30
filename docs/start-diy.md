如果需要在已有项目中使用 `Yo`，通过以下步骤即可：

## 环境与构建

* 安装 [ykit](http://ued.qunar.com/ykit/)：`(sudo) npm install ykit -g`
* 在 `package.json` 中添加 `Yo` 的配置

    ```
    "yo" : {
        "path": "./src/yo-config"
    }
    ```

    > 如果项目中没有 `package.json`，请执行 `npm init` 进行初始化

    > `path` 属性为 `Yo` 的样式配置文件的路径，在安装完 `Yo` 之后，会在该位置生成 `Yo` 的样式配置文件。

    > 请不要修改该目录的目录结构以及增删文件, 否则今后的升级过程可能会出现问题。


* 安装 `Yo`：在项目根目录执行 `npm install yo3 --save`
* 安装依赖：`npm install`

    > 由于 `Yo` 采用了 `ES6 + React` 的开发方式，所以需要在 `package.json` 中添加以下依赖后，再执行 `npm install`

    ```
    {
        ...
        "dependencies": {
            "ykit-config-yo": "^1.0.0",
            "yo-router": "^1.0.0", // 如果不需要使用router, 可以不写这一项
            "babel-polyfill": "^6.16.0",
            "react": "^15.3.2",
            "react-dom": "^15.3.2"
        }
        ...
    }
```

## 配置 ykit

- 在项目根目录下新建 `ykit.yo.js` 文件，并添加以下内容：

    ```
    exports.config = function () {
        return {
            // [配置] 项目资源入口
            export: ['./page/demo/index.js'],
            // [配置] webpack
            modifyWebpackConfig: function(config) {
                // [配置] chunk 的路径
                config.output.local.publicPath = '//127.0.0.1/[#项目名]/prd/';

                // [配置] 项目中的别名，推荐所有的别名都以 $ 开头，既能一眼识别出是别名，也能避免命名冲突
                config.resolve = {
                    alias: {
                        '$yo': 'yo3',
                        '$yo-config': '/src/yo-config',
                        '$yo-component': 'yo3/component',
                        '$component': '/src/component',
                        '$common': '/src/common',
                        '$router': 'yo-router'
                    }
                };
                return config;
            }
        }
    };
    ```

## 构建 lib.js

* 在项目根目录下执行 `ykit dll`，生成 `lib.js`。

## 开始开发

完成上述操作之后，就可以如 [起步](start.html#start-developing) 中所述进行正常开发了。