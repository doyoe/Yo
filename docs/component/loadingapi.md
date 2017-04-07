#### 引用方式

```
// 以 API 的形式引入 loading
import { loading } from 'yo3/component/loading';
// 以组件的形式引入 Loading
import Loading from 'yo3/component/loading'; 
```

注意：`loading` 的引用方式与其他组件不同。
- `import { loading } from 'yo3/component/loading'` 的方式引入的是API形式的loading组件；
- `import Loading from 'yo3/component/loading'` 引入的是标签形式的React组件。


#### 基本用法：

调用`loading.show`和`loading.hide`可以控制组件的显示与隐藏：

```javascript
import { loading } from 'yo3/component/loading';

loading.show();
loading.hide();
```
#### 设置遮罩的范围
设置maskOffset属性可以控制loading的遮罩层的范围，`maskOffset`是一个数组，
其中第一个元素对应遮罩上边缘距离顶部的距离，而第二个元素对应遮罩下边缘距离底部的距离：

```javascript
// 这个loading的遮罩没有遮盖住导航条
loading.show({
    maskOffset: [44, 0]
});
```

#### 扩展用法：
你还可以通过设置`extraClass`来给`loading`的根节点添加额外的样式类（比如这里改变了遮罩的透明度）。

设置`text`属性，可以给loading的图标下面添加描述文字：

```javascript
loading.show({
    extraClass: 'yo-loading-b',
    text: 'loading'
});
```