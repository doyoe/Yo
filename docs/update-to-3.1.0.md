# 3.1.0 升级指南

`Yo` 从 `3.1.0` 版本起，升级 `react` 至 `^16.2.0` 版本，不再支持 `react@15`。`react@16` 的新特性，请查看[官方说明](https://reactjs.org/blog/2017/09/26/react-v16.0.html)。

## 新版本升级点

1. 升级 `react`：修改项目 package.json 中的引用的 `react` 和 `react-dom` 版本为 `^16.2.0`。
2. 升级 `yo-router`：修改项目 package.json 中的引用的 `yo-router` 版本为 `^1.2.0`。
3. `PropTypes` 必须通过 `prop-types` 包引入，在引入后请确保该包已安装并写入了 package.json 依赖。
    
    ```javascript
    import PropTypes from 'prop-types';
    ```

4. `createClass` 必须通过 `create-react-class` 包引入，在引入后请确保该包已安装并写入了 package.json 依赖。

    ```javascript
    var createReactClass = require('create-react-class');
    var Greeting = createReactClass({
    render: function() {
        return <h1>Hello, {this.props.name}</h1>;
    }
    });
    ```

## 旧版本支持

如果暂时还不想升级到最新版本，那么你可能还需要：

1. 修改 package.json 中的 `yo3` 的版本改为 `~3.0.x`
2. 修改 package.json 中的 `yo-router` 的版本改为 `~1.1.x`。
