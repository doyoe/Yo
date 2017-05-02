#### 引用方式

```
import { Dialog } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Dialog from 'yo3/component/dialog';
```

#### 基本用法

最简单用法。全屏居中模态显示组件包含的内容，没有过渡动画。

```
<Dialog show={this.state.show}>
    <p>the dialog context</p>
</Dialog>
```

#### 含有标题

通过`title`属性，配置含有标题文字的对话弹框组件。

```
<Dialog title="Dialog" show={this.state.show}>
    <p>the dialog context</p>
</Dialog>
```

#### 国际化

通过`okText`和`cancelText`属性，可配置确定、取消按钮显示的文字。

```
<Dialog show={this.state.show} okText="Yes" cancelText="No">
    <p>the dialog context</p>
</Dialog>
```

#### 位置

通过设置`align`和`contentOffset`属性，自定义组件的内容显示位置。`align`属性配置内容的垂直方向显示位置，`contentOffset`属性是一个数组，可配置内容相对于当前位置的X轴、Y轴偏移量。

```
<Dialog
    show={this.state.show}
    align="top"
    contentOffset={[50, 50]}
>
    <p>the dialog context</p>
</Dialog>
```

#### 绑定回调函数

通过`onOk`和`onCancel`属性，分别设置确定、取消按钮的回调函数。

```
<Dialog
    show={this.state.show}
    onOk={() => this.callback()}
    onCancel={() => this.callback()}
>
    <p>the dialog context</p>
</Dialog>
```

#### 设置动画

通过`animation`参数和CSS3动画设置组件显隐过程的动态效果，配置动画对象中的`animation`属性是一个数组，分别对应组件显、隐过程执行的动画效果，`duration`属性设置动画执行时间。
也可以传入组件内部支持的动画名字符串`fade`、`fade-in-up`、`fade-in-down`、`zoom`。默认没有动画。

```
<Dialog
    show={this.state.show}
    onOk={() => this.callback()}
    onCancel={() => this.callback()}
    animation={{animation: ['actionsheet-up', 'actionsheet-down'], duration: 200}}
>
    <p>the dialog context</p>
</Dialog>
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