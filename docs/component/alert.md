#### 引用方式

```
import { Alert } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Alert from 'yo3/component/alert';
```

#### 基本用法

最简单的用法，传入需要显示的内容参数。适用于简单的警告提示。

```
Alert('the alert text');
```

#### 含有标题

通过第二个参数传入组件显示的标题，默认不显示标题。

```
Alert('the alert text', 'Alert');
```

#### 自定义按钮文本

Alert可以接受一个配置对象option为参数，你可以在里面指定title和content的值。
option的btnText属性指定了Alert按钮的文本，例如:

```
// opt对象调用模式
Alert({
    title:'title',
    content:'content',
    btnText:'ok!'
})
```

#### 绑定回调函数

通过返回的`Promise`实例对象的`then`方法绑定确定按钮的回调函数，点击确定的回调函数参数值是`true`。

```
Alert('return Promise Object').then(
    res => console.log(`resolve ${res}`)
);
```

#### 设置动画

通过opt对象的`animation`参数和CSS3动画可以设置组件显隐过程的动态效果，配置动画对象中的`animation`属性是一个数组，分别对应组件显、隐过程执行的动画效果，`duration`属性设置动画执行时间。
也可以传入组件内部支持的动画名字符串`fade`、`fade-in-up`、`fade-in-down`、`zoom`。

```
const animation = {animation: ['actionsheet-up', 'actionsheet-down'], duration: 200};

Alert({
    title:'Alert',
    content:'the alert text',
    animation
}).then(res => console.log('resolve'))
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