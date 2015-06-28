## Gulp 工具

### 命令

> gulp compile

编译, 从 `usage/page` 到 `usage/export`

参数:

* `-c, --compiler` : 选择编译器, 可设 `sass`, `node-sass`, `compass`, 默认是 `compass`

> gulp watch

`watch` 文件进行 `comiple`

> gulp build

构建 `css`, 从 `usage/build` 到 `build`

参数:

* `-c, --compiler` : 选择编译器, 可设 `sass`, `node-sass`, `compass`, 默认是 `compass`
* `-m, --min` : 生成压缩版本

> gulp version

输出版本, 包括 `yo`, `sass`, `node-sass(libsass)`, `compass` 的版本

> gulp diff

比较编译结果，详细请查看 `diff/diff.css`

参数:

* `-f, --file` : 选择 `usage/build` 目录下的的文件，默认 `yo.scss`

### 默认

gulp = version + compile + watch

### 注意

自行安装配置 `ruby`, `sass`, `compass` 环境。

