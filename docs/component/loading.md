#### 基本用法：
显示与隐藏

```javascript
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