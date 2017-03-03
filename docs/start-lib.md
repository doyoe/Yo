## 动态链接库

### 基本使用

由于 `Yo` 依赖的 `React` 和周边组件的模块(`React`，`ReactDOM`，`Yo-Router`，`Babel-Polyfill`)数量达到了548个之多（取当前版本，可能以后有出入）
，使用 `webpack` 编译的性能很差，我们采用了 `webpack` 的 `DLLPlugin` 作为提升开发时编译性能的手段。

使用这个插件以后会将以上的库和 `yo3`组件库中的一些基础组件打包成一个 `lib.js` 文件，在编译时会直接跳过这些模块，这能够将编译速度提升几倍甚至十几倍。除此之外，相比于之前将所有页面的代码打包到一个文件中的做法，这样也能更有效地利用浏览器缓存从而大幅提升页面的加载速度，以及减少流量消耗。

使用脚手架工具 `ykit-config-yo` 生成的项目模板里面已经有一份构建好的 `lib.js`，你需要做的是在你的页面中添加引用 `lib.js` 的 `<script>` 标签，如下:

```
<!-- common lib包 -->
<script src="[项目路径]/prd/lib@VERSION.js"></script>
<!-- 业务代码 -->
<script src="[项目路径]/prd/page/pageA/index@VERSION.js"></script>
```

你还可以调用`ykit dll`命令来手动生成 `lib.js`，在以上五个依赖的版本发生变化时，你可能需要手动重新生成它。

在构建和发布时，脚本会自动生成压缩后的 `lib.js` 和版本号。

### 使用production环境的lib.js

在默认情况下，`lib.js` 的是开发环境的代码，而 React 在开发环境下的性能要远逊于线上环境。所以如果你想查看你的App的真实性能，你需要
使用 production 环境的 lib.js，它可以通过命令 `ykit dll-min` 构建。

你需要重启 server 才能正常访问页面。注意在 production 环境下，所有的警告和错误提示都会消失，所以强烈建议在开发时使用 dev 环境的 lib.js。

### 修改 lib.js 中的内容

DLLPlugin的配置中内置了五个依赖：`React`，`ReactDOM`，`Babel-Polyfill`，`Yo-Router`。如果你的业务中还依赖了其他的公共模块，可以通过配置`ykit.yo.js`
中的 `modifyWebpackConfig` 属性来修改 `lib.js` 中的内容：

```
...
modifyWebpackConfig: function (config) {
	config.getVendor = function (vendor) {
		return vendor.concat('a-custom-module');
	};
});
...
```

getVendor函数可以接收一个数组参数 `vendor`，里面是 `lib.js` 中内置的依赖，它返回的新数组将会覆盖掉原有的配置。我们推荐
你将所有的公共模块都内置到lib.js中。

dll也可以支持内置非 `node_modules` 的模块，你需要填写一个相对于 `./src` 目录的路径：

```
config.getVendor = function (vendors) {
    return vendors.concat([
        'immutable',
        'keymirror',
        'isomorphic-fetch',
        'flux',
        '@qnpm/hysdk',
        '@qnpm/hysdk-qunar',
        // 业务模块
        './page/car/model/modelMap.js'
    ]);
};
```

在修改 `vendor` 的配置后，你需要重新运行一次`ykit dll`命令并重启server。

### 关闭动态链接库

如果你不希望使用DLL，可以设置 `getVendor` 返回一个空数组：

```
config.getVendor = function() {
	return [];
}
```

然后你需要重新调用`ykit dll`并重启server。

这时lib.js里面不会有内容，所有的代码都会被打包到export的js中，这也意味着页面里的 `lib.js` 引用也可以删掉了。

** 关闭以后记得手动在export中加入babel-polyfill的依赖！ **
