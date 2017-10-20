## 代码分割与异步路由加载

对于大型单页应用、多页应用以及 hy 上的应用来说，在一个页面中加载全部的静态资源都是一种浪费，因此我们在 router 中支持了根据页面按需引入页面内所需的资源。

### chunk 文件打入离线包

> 在使用该功能前，请务必升级 `ykit-config-yo` 到 1.1.7+ 版本。

**注意**：使用 chunk 之后，由于 chunk 是非入口文件，不会被自动加入到离线包当中，因此需要在离线包入口页面 html 模板（在发布的时候，配置发布信息 -> 远程文件，一般是项目的入口 index.html）的 header 中添加一个 `<meta>` 标签帮助离线包工具抓取 chunk。

meta 包含两个重要的属性：

1. `cache-files`：该属性必须设置为 `qp`；
2. `href`：这里需要配置一个 json 文件，它在线上打包的时候会自动生成，位于项目的 prd 目录中，带版本号。比如项目名称为 `trainapp_intl`，获取版本号的方式时使用 .ver 文件，就可以这样写：

```
<meta cache-files="qp" href="//q.qunarzz.com/trainapp_intl/prd/chunk@<!--#include virtual='/ver/trainapp_intl/ver/chunk.json.ver' -->.json">
```

### 代码分割

[代码分割](http://webpack.github.io/docs/code-splitting.html) 是 webpack 提供的一种异步加载静态资源的方式，每次 `require.ensure` 的调用会生成一个加载点，被异步引入的资源会生成一个非入口分块（[non-entry chunks](http://webpack.github.io/docs/code-splitting.html#initial-chunk)）。

代码分割让我们保证了页面入口资源大小可以得到保证，对于单页应用来说，页面的资源是异步递增的过程；对于多页应用来说，每个页面的资源也可以得到控制，仅包含自身页面的业务逻辑。这种方式与之前的全部资源全量引入相比，各有其优劣，但是对于大型项目来说，使用代码分割绝对是最好的选择。

由于代码分割可能会导致资源过于分散的问题，因此找到一个控制代码分割的点就尤为重要；而 router 本身就是一个视图控制工具，用来控制代码分割的方式和位置最为合适。

代码分割的基本场景如下：

```js
require.ensure(['some'], function() {
  var a = require('module-a');
  // ...
});
```

这里的 `require.ensure` 是告诉 webpack/ykit，让其构建分块代码，而不是将资源直接打包到 bundle 中去，其中第一个参数是分块代码依赖的资源，主要用于分块代码内部没有引入依赖、或多个引入代码的公共依赖，在我们路由场景中基本不会用到，所以写个空数组就行。

也许有同学会关心加载的多个 chunk 之间，如果存在公共代码应该怎么处理？这里可以使用 webpack 的 [CommonsChunkPlugin](http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin) 插件，或者在 hy2 项目里使用 `ykit dll` 进行公共依赖的构建。

### 异步路由加载

在 router 里，我们不仅支持 **页面组件的异步加载**，同时也支持 **整个子路由的动态加载**。当然，这样的加载方式会给之前 JSX 的声明式的路由构建方式带来一些不便，这种场景下使用纯对象的路由构建更加方便，当然对于纯组建的异步加载，可以尝试我们提供的 `require.async` 语法糖。

组件可以定义 `getChildRoutes`、`getIndexRoute` 与 `getComponents` 方法，这些获取子路由和组件的方法是按需且异步的。

#### 异步加载组件

使用异步方法加载组件，应该是项目初期最常见的一种需求，我们先看下同步加载的写法：

```js
import User from './User'

<Route path="/user" component={User} />
```

这里表示在跳转到路由 `/user` 时，进行组件 `User` 的渲染，但实际上由于我们是实现 import 了该组件，因此它的全部 js 逻辑实际上已经引入到页面内部了。

如果要将其转换为动态加载，可以这样编写：

```js
<Route path="/user" getComponent={(nextState, cb) => {
  require.ensure([], () => cb(null, require('./User')))
}} />
```

这里要注意的一点是，`getComponent` 方法传入回调的第一参数是 `nextState`，是路由中通过历史传递的 `location.state`，这个历史 `state` 目前仅在单页的 browserHistory 中存在，在多页场景和 hash 场景中都无法使用，我们推荐使用通过生命周期的方式跨页面传递数据，因此不推荐使用这个参数。

第二个参数 `cb` 就是用来异步获取组件的回调，其中该回调第一个参数是错误参数，第二个参数是组件。如果使用原生的方式进行组件动态加载，那么要注意在导出组件时不要使用 ES6 的 `export default` 语法，或者在 `require` 的时候带上 `default` 属性：

即可以这样写：

```js
// file - User
export default User

<Route path="/user" getComponent={(nextState, cb) => {
  // 注意这里是 default
  require.ensure([], () => cb(null, require('./User').default))
}} />
```

也可以这样写：

```js
// file - User
module.exports = User

<Route path="/user" getComponent={(nextState, cb) => {
  // 注意这里是 default
  require.ensure([], () => cb(null, require('./User')))
}} />
```

如果觉得麻烦，在使用了 [ykit-config-hy2](http://npm.corp.qunar.com/package/@qnpm/ykit-config-hy2) 的前提下可以尝试我们提供的 `require.async` 语法糖，用法如下：

```js
const User = require.async('./User');

<Route path="/user" getComponent={User} />
```

我们自动处理了 ES6 模块加载的问题，也隐藏了复杂的异步逻辑。

#### 异步加载首页路由、子路由

异步加载首页路由、子路由的方式同异步加载组件类似，只不过 `cb` 回调传递的第二个参数为首页路由对象和子路由数组。之前同步配置的方式如下：

```jsx
import A from './routes/A'
import B from './routes/B'
import Index from './routes/Index'

<Route path="course/:courseId">
  <IndexRoute component={Index}>
  <Route path="/a" component={A} />
  <Route path="/b" component={B} />
</Route>
```

而异步配置的方式如下：

```jsx
<Route
  path="course/:courseId"
  getIndexRoute={(nextState, callback) => {
    require.ensure([], function (require) {
      callback(null, {
        component: require('./routes/Index'),
      })
    })
  }}
  getChildRoutes={(nextState, callback) => {
    require.ensure([], function (require) {
      callback(null, [
        require('./routes/A'),
        require('./routes/B')
      ])
    })
  }}
/>
```

这样可以保证整个页面的子路由结构都是异步载入的，可以在具体的页面内部再进行路由的配置。

**注意** 在异步配置首页路由时，需要传入一个路由对象，而配置子路由时，需要传入一个数组对象。

目前在这种场景下我们还没有提供更方便的语法糖配置，在后续的版本中我们会加入便捷的配置方式。

#### 配置publicPath

目前所有chunk默认的publicPath都是q.qunarzz.com，因此如果想正常访问你的本地项目，需要配置一条host：q.qunarzz.com 127.0.0.1。

如果你不希望使用q.qunarzz.com作为publicPath，你可以在 `ykit.yo.js` 中修改它的配置，如下：

```
modifyWebpackConfig: function (config) {
    ...
    // 修改dev环境下的publicPath
    config.output.dev.publicPath = "//dev.touch.travelfe.qunar.com/travel_hy2/prd/";
    // 修改prd环境下的publicPath
    config.output.prd.publicPath = "//gofe.beta.qunar.com/travel_hy2/prd/";
    // 修改本地环境下的publicPath
    config.output.local.publicPath = "//q.qunarzz.com/travel_hy2/prd/";
    return config;
}
```
