## Yo 的体积

更新时间：2017年3月17日

### lib.js

`lib.js` 主要包括 React、ReactDom、babel-polyfill、Yo-Router 和 Yo 中的常用组件。推荐大家将常用的包和组件都配置到 `lib.js` 中。

组成 | 体积 | gzip 后的体积 | 版本
--------- | -------- | ---------- | ----------
React + ReactDOM | 146.36 KB | 45.76 KB | 15.6.1
babel-polyfill | 93.09 KB | | 6.23.0
Yo-Router | 91.68 KB | | 1.1.7
Yo:<br/>list、scroller、modal、sticky、lazyimage、touchable | 82.32 KB | | 3.0.11
**lib.js 总的体积** | **410.11 KB** | **129.30 KB** |
Ykit | | | 0.3.3
Ykit-config-yo | | | 1.2.5

**P.S. 以上体积均是打包压缩之后的体积。**

### Yo

整体计算 Yo 中所有组件的大小并不具有特别大的实际意义，因为大多数项目只会用到小部分组件。这里我们仍然给出大礼包的体积。

组成 | 体积 | gzip 后的体积
--------- | --------- | ---------
所有组件的 JS | 252.87 KB | 52.76 KB
所有组件的 CSS | 43.89 | 6.42 KB
**Yo 组件总的体积** | **296.76** | **59.18 KB**

**P.S. 以上体积均是打包压缩之后的体积。**
