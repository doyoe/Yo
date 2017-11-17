# 发布流程

目前 `Yo3` 的发布周期是每隔一周的周五，如遇到节假日则顺延。

当前版本的开发分支统一命名为`dev-v3.x.x`，每发布一个新版本，在merge到master以后该分支即作废，重新建立一个版本号+1的分支。对于比较大规模的改动，应该新开一个分支进行，然后将该分支合并进 dev 分支。

与此同时 `Yo3` 有一个对应的 Demo 工程，它的分支命名规则与 `Yo3` 保持一致。

需要 check 版本号的地方：
- bower.json 中的 version
- package.json 中的 version
- style/lib/core/variables.scss 中的 version
- ydoc.json 中的 version
- changelog 是否有新版本的变更

发布流程如下：
- diff dev分支和master分支的改动。
- 在当前dev分支上调用 `release`，发布一个`rc tag`，版本号规则为 `3.x.y-rc.z`。然后手动到 `qnpm` sync这个版本。
- 在 `yo-demo` 工程的dev分支上执行 `qnpm i --save yo3@rc`，然后 `rm -rf node_modules` 并重新执行 `qnpm i`。
- 本地多机型测试 `yo-demo` 的各个组件demo是否正常。
- 将 `yo-demo` 的dev分支merge到 `release`，然后执行 `ykit pack -c -m`，构建完成后 `git push` 发布 Demo。
- 再简单进行一次多机型测试。没有问题的话在 `yo3` 工程下执行 `release`，按照操作提示发布正式版。
- 将 `Yo3` dev分支的代码合并到 `master`，修改 `ydoc.config` 的文档站首页的版本号，然后执行 `ydoc build` 并 push master 到 gitlab 仓库。此时 Yo3 的文档站也发布完毕。
- 将 `Yo3` 的gitlab工程的代码同步到 `github`，打对应版本的tag。
- 创建 `Yo3` 和 Demo 工程下个版本的开发分支。

**不允许业务使用非正式版上线，后果自负。**