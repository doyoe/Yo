#### 基础用法

最简单的使用方法，全屏居中的模态浮层容器。通过show属性来控制`Modal`的打开/关闭状态。

`Modal`组件可以在文档的任何位置使用, 组件内部会将它重新渲染到`document.body`下面。

```JavaScript
<Modal show={this.state.show}>
    <p>The Modal content</p>
 </Modal>
```

#### 位置

通过设置`align`和`contentOffset`属性，自定义组件的内容显示位置。`align`属性配置内容的垂直方向显示位置，`contentOffset`属性是一个数组，可配置内容相对于当前位置的X轴、Y轴偏移量。

```JavaScript

<Modal
    show={this.state.show}
    align="left"
    contentOffset={[150, 100]}
>
    <p>The Modal content</p>
</Modal>
```

#### 遮罩层偏移

通过`maskOffset`属性设置组件背景遮罩层的上、下偏移量。比如当你希望遮罩层顶部不遮盖页面导航条的时候, 可以设置这个属性。

```JavaScript
<Modal
    show={this.state.show}
    maskOffset={[88, 0]}
>
    <p>The Modal content</p>
</Modal>
```

#### 动画

通过`animation`参数和CSS3动画设置组件显隐过程的动态效果，配置动画对象中的`animation`属性是一个数组，分别对应组件显、隐过程执行的动画效果，`duration`属性设置动画执行时间。
也可以传入组件内部支持的动画名字符串`fade`、`fade-in-up`、`fade-in-down`、`zoom`。默认没有动画。

```javascript
<Modal
    show={this.state.show}
    animation={{animation: ['actionsheet-up', 'actionsheet-down'], duration: 200}}
>
    <p>The Modal content</p>
</Modal>
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