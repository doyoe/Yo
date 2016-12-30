#### 基础用法

`Modal` 是所有弹层系列组件的基础组件，可以指定多种位置和开/关动画效果。
但是它只需要一个属性就可以工作起来，即控制它显示/隐藏的`show`属性：

```JavaScript
<Modal show={this.state.show}>
    <p>The Modal content</p>
 </Modal>
```

** 注意：`Modal`组件可以在文档的任何位置使用, 组件内部会将它重新渲染到`document.body`下面。 **

#### 位置

通过设置`align`和`contentOffset`属性可以自定义组件的内容显示位置。
`align`支持五种位置：`top`，`bottom`，`left`，`right`和`bottom`。

通过`contentOffset`属性可以在`align`定位的基础上继续微调内容区的位置，它能够接收一个数组。
第一个元素对应水平方向的偏移（负值->向左偏移，正值->向右偏移），
第二个元素对应竖直方向上的偏移（负值->向上偏移，正值->向下偏移）。

```JavaScript

<Modal
    show={this.state.show}
    align="left"
    // 向右偏移150像素，向下偏移100像素
    contentOffset={[150, 100]}
>
    <p>The Modal content</p>
</Modal>
```

#### 遮罩层偏移

通过`maskOffset`属性可以设置组件背景遮罩层的遮罩范围。
它可以接收一个数组，其中第一个元素对应距离顶部的偏移，第二个是距离底部的偏移。
比如当你希望遮罩层顶部不遮盖页面导航条的时候, 可以通过设置这个属性实现。

```JavaScript
<Modal
    show={this.state.show}
    // 遮罩从top:44px开始
    maskOffset={[44, 0]}
>
    <p>The Modal content</p>
</Modal>
```

#### 动画

通过`animation`参数和CSS3动画设置组件显隐过程的动态效果
，配置动画对象中的`animation`属性是一个数组，分别对应组件显、隐过程执行的动画效果，`duration`属性设置动画执行时间。
也可以传入组件内部支持的动画名字符串`fade`、`fade-in-up`、`fade-in-down`、`zoom`。默认无动画。

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