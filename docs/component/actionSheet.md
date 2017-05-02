#### 引用方式

```
import { ActionSheet } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import ActionSheet from 'yo3/component/actionsheet';
```

#### 基本用法

`ActionSheet` 接收一个`option`对象作为参数。
其中`menu`属性负责控制ActionSheet的菜单项，它是一个对象数组，每个元素有两个属性`text`和`onTap`，分别用来控制菜单项的文字和点击回调。
需要注意的是，点击菜单之后，组件会自动关闭，这与iOS系统的ActionSheet API是一致的。

```
ActionSheet({
    menu:[
        { text: '存储图像', onTap() { console.log('save.'); } },
        { text: '拷贝', onTap() { console.log('copy'); } }
    ]
});
```

#### 显示标题

通过`title`参数配置组件菜单顶部的标题文字，默认无标题：

```
ActionSheet({
    menu:[
        { text: '存储图像', onTap() { console.log('save.'); } },
        { text: '拷贝', onTap() { console.log('copy'); } }
    ],
    title: '保存图片？'
});
```

#### 取消文字

通过`cancelText`参数配置"取消"菜单的文字：

```
const menu = [
    { text: 'save', onTap() { console.log('save.'); } },
    { text: 'copy', onTap() { console.log('copy'); } }
];

ActionSheet({menu, cancelText: 'cancel'});
```