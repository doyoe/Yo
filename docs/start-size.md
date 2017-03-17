## Yo 的体积

### lib.js

`lib.js` 主要包括 React、ReactDom、Yo-router 和 babel-polyfill 和 Yo 中的常用组件。推荐大家将常用的包和组件都配置到 `lib.js` 中。

组成 | 体积 | gzip 后的体积
--------- | -------- | ----------
React + ReactDOM | 136.88 KB | 41.14 KB
Yo-router | 90.13 KB | 
babel-polyfill | 85.59 KB |
Yo:<br/>list、scroller、modal、sticky、lazyimage、touchable | 75.50 KB | 
**lib.js 总的体积** | **387.43 KB** | **109.16 KB**

**P.S. 以上体积均是打包压缩之后的体积。**

依赖的库版本和构建工具版本如下：

组成 | 版本
---------- | ----------
React + ReactDOM | 15.4.2
Yo3 | 3.0.6
Yo-router | 1.1.6
babel-polyfill | 6.23.0
Ykit | 0.3.0
Ykit-config-yo | 1.1.13

### Yo

整体计算 Yo 中所有组件的大小并不具有特别大的实际意义，因为大多数项目只会用到小部分组件。这里我们仍然给出大礼包的体积。

组成 | 体积 | gzip 后的体积
--------- | --------- | ---------
所有组件的 JS | 235.80 KB | 48.48 KB
所有组件的 CSS | 43.55 KB | 6.38 KB
**Yo 组件总的体积** | **279.35 KB** | **54.86 KB**

**P.S. 以上体积均是打包压缩之后的体积。**



