#### 基本用法：
显示与隐藏。

注意：你需要使用``import {loading} from 'yo3/component/loading''``的方式引入API形式的loading组件。
因为``import Loading from xxx``引入的是标签形式的React组件。

```javascript
import { loading } from 'yo3/component/loading';

loading.show();
loading.hide();
```
#### 基本用法：
不遮挡顶部

```javascript
loading.show({
    maskOffset: [44, 0]
});

setTimeout(() => {
    loading.hide();
}, 2000);
```

#### 扩展用法：
自定义风格，如黑底蓝字等

```javascript
loading.show({
    extraClass: 'yo-loading-b',
    text: 'loading'
});

setTimeout(() => {
    loading.hide();
}, 2000);
```