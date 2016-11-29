#### 基本用法
最简单用法，传入合法的`menu`数组，配置菜单的选项列表和对应的点击回调，点击菜单之后，组件自动关闭。

```JavaScript
ActionSheet({
    menu:[
        { text: '存储图像', onTap() { console.log('save.'); } },
        { text: '拷贝', onTap() { console.log('copy'); } }
    ]
});
```

#### 显示标题

通过`title`参数配置组件菜单顶部的标题文字，默认为空，不显示。

```JavaScript
ActionSheet({
    menu:[
        { text: '存储图像', onTap() { console.log('save.'); } },
        { text: '拷贝', onTap() { console.log('copy'); } }
    ],
    title: '保存图片？'
});
```

#### 取消文字

通过`cancelText`参数配置"取消"菜单的文字，默认是"取消"。

```JavaScript
const menu = [
    { text: 'save', onTap() { console.log('save.'); } },
    { text: 'copy', onTap() { console.log('copy'); } }
];

ActionSheet({menu, cancelText: 'cancel'});
```