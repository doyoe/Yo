#### 引用方式

```
import { Confirm } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Confirm from 'yo3/component/confirm';
```

#### 基本用法

最简单的用法，传入需要显示的内容参数。用于简单的弹出确认框。

```JavaScript
Confirm('the confirm text');
```

#### 含有标题

通过第二个参数传入组件显示的标题，默认不显示标题。。

```JavaScript
Confirm('the confirm text', 'Confirm');
```

#### 绑定回调函数

通过返回的`Promise`实例对象的`then`方法分别绑定确认、取消按钮的回调函数。
如果res的值为true，说明点击的是确定按钮，反之为取消按钮。

```JavaScript
Confirm('the confirm text').then(
    res => console.log(`resolve ${res}`)
);
```

#### 定义按钮文本
Confirm可以接受一个参数对象option，除了上面的content和title外，还可以定义一些更高级的属性值，例如改变两个按钮的文本：

```
Confirm({
    content:'the confirm text',
    title:'title',
    btnText:['ok','cancel']
});
```

#### 设置动画

通过给option对象传入`animation`参数和CSS3动画设置组件显隐过程的动态效果，配置动画对象中的`animation`属性是一个数组，分别对应组件显、隐过程执行的动画效果，`duration`属性设置动画执行时间。
也可以传入组件内部支持的动画名字符串`fade`、`fade-in-up`、`fade-in-down`、`zoom`。默认没有动画。

```JavaScript
const animation = {animation: ['actionsheet-up', 'actionsheet-down'], duration: 200};

Confirm({
    content:'the confirm text',
    title:'Confirm',
    animation
})
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

#### 隐藏取消按钮
此种形式下的组件效果等同于Alert警告提示组件。