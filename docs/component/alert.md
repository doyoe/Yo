#### 基本用法

最简单的用法，传入需要显示的内容参数。适用于简单的警告提示。

```JavaScript
Alert('the alert text');
```

#### 含有标题

通过第二个参数传入组件显示的标题，默认不显示标题。

```JavaScript
Alert('the alert text', 'Alert');
```

#### 绑定回调函数

通过返回的`Promise`实例对象的`then`方法绑定确定按钮的回调函数，点击确定的回调函数参数值是`true`。

```JavaScript
Alert('return Promise Object').then(
    res => console.log(`resolve ${res}`)
);
```

#### 设置动画

通过`animation`参数和CSS3动画设置组件显隐过程的动态效果，配置动画对象中的`animation`属性是一个数组，分别对应组件显、隐过程执行的动画效果，`duration`属性设置动画执行时间。
也可以传入组件内部支持的动画名字符串`fade`、`fade-in-up`、`fade-in-down`、`zoom`。默认没有动画。

```JavaScript
const animation = {animation: ['actionsheet-up', 'actionsheet-down'], duration: 200};

Alert('the alert text', 'Alert', animation).then(
    res => console.log(`resolve ${res}`)
);
```

```css

.actionsheet-up {
  -webkit-animation-name: actionsheet-up;
  animation-name: actionsheet-up;
}

.actionsheet-down {
  -webkit-animation-name: actionsheet-down;
  animation-name: actionsheet-down;
}

@keyframes actionsheet-up {
    from {
        transform: translate3d(0, 100%, 0);
    }
    to {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes actionsheet-down {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(0, 100%, 0);
    }
}
```