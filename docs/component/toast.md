#### 引用方式

```
import { Toast } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Toast from 'yo3/component/toast';
```

#### 基本用法
最简单用法。居中显示一条通知，不影响其他可视区域正常操作。

```javascript
Toast.show('Toast content');
```

#### 显示时间
通过传入时间参数，修改内容显示时间。默认显示2s。

```javascript
Toast.show('显示3s', 3000);
```

#### 立即隐藏
立即隐藏显示的内容，支持简单的链式调用。

```javascript
Toast.show('Toast content').hide();
```

#### 回调函数

通过传入对应的回调函数，组件会在显示、隐藏之后立即调用。**如果连续调用同一个方法，则传入的回调函数也会被执行多次。**

```javascript
Toast.show('callback', 2000, () => console.log('show')).hide(() => console.log('hide'));
```
