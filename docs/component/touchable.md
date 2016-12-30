#### 移动端的触摸事件

在大多数原生App中, 点按操作(Press)会有一个明确的反馈, 这个反馈可以是改变了背景色(例如从白色变成灰色), 也可以是
改变元素的透明度, 或者改变背景图片等等。总之, 这种触摸反馈能够让整个App变得更加立体, 也让用户更能直接地体验到交互感。

但是由于移动端浏览器的种种限制, 这种"触摸反馈"变得没那么容易实现。使用PC端常用的`:active`伪类并不能完全满足需求。因为
滚动视图(`Scroller`)组件的存在, 各种触摸事件都需要解决和滚动的冲突问题, 即在滚动时不允许触发Press, 这靠css是无法独自解决的。

出于以上两点考虑, 我们借鉴了React-Native的`Touchable`系列组件, 为网页也设计实现了同样的组件。我们鼓励你在所有需要绑定tap事件的场景使用它。

#### 使用方式

`Touchable`是一个"虚拟"的组件, 它没有根节点, 而是以传给它的唯一子元素作为根节点。换句话说, 它不会改变原本的dom结构。
需要注意的是, 它只能有一个子元素, 如果传入多个子元素React会抛出一个错误, 以下是例子:

```
<Touchable
    touchClass="touchable-highlight"
    onTap={()=> {
        Toast.show('touchable pressed.');
    }}
>
    <div style={{ height: 200 }}>
        点击会出现深色背景的Touchable
    </div>
</Touchable>
```

这里有两个比较重要的属性`onTap`和`touchClass`: `onTap`是你希望绑定给它的唯一子元素的Tap事件回调, 而
`touchClass`是触摸过程中(`touchstart`到`touchend`过程中)为唯一子元素添加的className。

如果你没有设置`touchClass`, 将不会有触摸反馈效果, onTap的绑定依然生效。但是这个时候组件会给出一个警告, 我们的建议是尽量为所有的可触摸区域添加反馈效果。

#### 嵌套的Touchable

需要注意的是`Touchable`虽然允许互相嵌套，但是不能够同时触发内层和外层的touchClass改变和tap事件，
而总是触发手指触摸到的最内层的`Touchable`的触摸反馈和事件，
这与没有stopPropagation的`onTouchTap`事件不一致。换句话说，在同一时刻只能有一个`Touchable`响应用户的触摸事件。
以下是一个互相嵌套的`Touchable`的例子：

```
 <Touchable touchClass='green' onTap={() => {console.log('点我变绿。')}}>
    <div className="comment-wrap">
        <Touchable touchClass='yellow' onTap={() => {
            console.log('点我变黄');
        }}>
            <h2 className="comment-title ellipsis">如此美景，难怪志明要带春娇来这里</h2>
        </Touchable>
        <p className="comment-detail ellipsis">北京长城脚下的公社</p>
        <div className="tags ellipsis">
            度假&nbsp;/&nbsp;亲子&nbsp;/&nbsp;浪漫&nbsp;/&nbsp;美景&nbsp;/&nbsp;格调
        </div>
    </div>
</Touchable>
```

#### 解决和Scroller的冲突问题

`Touchable`组件在内部解决了和`Scroller`以及所有基于`Scroller`实现的组件(`List`系列等)的手势冲突,
** 你不需要做任何额外的配置, 正常使用即可 **。
下面是一个在`Scroller`内部使用`Touchable`的例子, 这些代码就是右侧Demo的源码:

```
class TouchableDemo extends Component {
    render() {
        return (
            <Page title="Touchable Demo" onLeftPress={() => {
                location.href = '../index/index.html';
            }}>
                <Scroller style={{ background: 'white', position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
                    <Touchable onTap={()=> {
                        Toast.show('touchable pressed.');
                    }}>
                        <div style={{ height: 200, background: 'white' }}>
                            这是一个没有任何反馈的Touchable。
                        </div>
                    </Touchable>
                    <Touchable touchClass="touchable-highlight" onTap={()=> {
                        Toast.show('touchable pressed.');
                    }}>
                        <div style={{ height: 200 }}>
                            点击会出现深色背景的Touchable
                        </div>
                    </Touchable>
                    <Touchable touchClass="touchable-opacity" onTap={()=> {
                        Toast.show('touchable pressed.');
                    }}>
                        <div style={{ height: 200 }}>
                            点击后透明度变为0.7的Touchable
                        </div>
                    </Touchable>
                    <Touchable touchClass="touchable-opacity touchable-highlight" onTap={()=> {
                        Toast.show('touchable pressed.');
                    }}>
                        <div style={{ height: 200 }}>
                            同时具有以上两种效果的Touchable
                        </div>
                    </Touchable>
                </Scroller>
            </Page>
        );
    }
}
```