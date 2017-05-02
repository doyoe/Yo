#### 引用方式

```
import { Popup } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Popup from 'yo3/component/popup';
```

#### 基本用法
最简单用法，从页面底部弹出一个模态浮层。

```javascript
<Popup show={this.state.show}>
    Popup content
</Popup>
```

#### 从上向下
通过`direction`属性设置组件的动画方向，默认从页面底部自下向上。

```javascript
<Popup show={this.state.show} direction="down">
    Popup content
</Popup>
```

#### 遮罩层偏移
通过`maskOffset`属性设置组件背景遮罩层的偏移量。该属性是一个数组，分别对应上、下偏移量，默认`[0, 0]`。

```javascript
<Popup show={this.state.show} maskOffset={[44, 0]}>
    Popup content
</Popup>
```

#### 动画执行时间
通过`duration`属性设置组件打开、关闭过程中的动画执行时间。默认200ms。

```javascript
<Popup show={this.state.show} duration={1000}>
    Popup content
</Popup>
```