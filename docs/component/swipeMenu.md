#### 基本用法
最简单用法，提供显示菜单选项数组。`text`属性是菜单按钮文字，`onTap`属性绑定点击按钮的回调函数。

```javascript
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

```javascript
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

```javascript
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