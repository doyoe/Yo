#### 引用方式

```
import { SwipeMenu } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import SwipeMenu from 'yo3/component/swipemenu';
```

#### 基本用法
最简单用法，提供显示菜单选项数组。`text`属性是菜单按钮文字，`onTap`属性绑定点击按钮的回调函数。

```
<SwipeMenu
    action={[
        {
            text: 'delete',
            onTap: () => console.log('click delete')
        }
    ]}
>
    <p>要不要左滑试试?</p>
</SwipeMenu>
```
#### 向右滑动
通过`direction`属性设置滑动方向，默认向左滑动。

```
<SwipeMenu
    action={[
        {
            text: 'delete',
            onTap: () => console.log('click delete')
        }
    ]}
    direction="right"
>
    <p>要不要左滑试试?</p>
</SwipeMenu>
```

#### 不可用
通过`disable`属性，设置组件不可用状态。此时组件不能滑动。

```
<SwipeMenu
    action={[
        {
            text: 'delete',
            onTap: () => console.log('click delete')
        }
    ]}
    disable={false}
>
    <p>要不要左滑试试?</p>
</SwipeMenu>
```