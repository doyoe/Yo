## npm 版本

我们推荐使用 `npm >= 3.0.0` 的版本，原因是低版本的 `npm` 的 `node_modules` 中模块是树状结构而非扁平的，会有多个 `React` 存在。
这样的话会引起一些问题，具体信息可以参照 [官方说明](https://facebook.github.io/react/warnings/refs-must-have-owner.html)。

### 低版本 npm 怎么办

当然，有些时候因为各种原因，你无法使用更高版本的 `npm`。我们也提供了解决方案。

你需要手动删除 `node_modules/yo3/node_modules/react` 这个文件夹。但是由于每次 `npm install` 都会覆盖这个删除，很难维护，所以还是希望你能克服一切困难更新你的 `npm` 版本。