#### 滚动特性

`Scroller` 不仅提供了滚动容器，也提供了相关的滚动特性。

- 禁止滚动：`disabled`
- 弹性滚动：`bounce` 滚动是否能够超出屏幕范围
- 惯性滚动：`momentum` 在松手之后有一定的速度，是否能够继续滚动一段距离

```
<Scroller
    disabled={false}
    bounce={false}
    momentum={false}
>
    <h1>这是内容区域</h1>
</Scroller>
```

#### 滚动到某一位置

`Scroller` 提供了 `scrollTo(x, y, time)` 方法来滚动到某个位置。

- x：横向目标位置
- y：纵向目标位置
- time：滚动动画时间，单位ms，默认为 0

```
<Scroller ref="scroller">
    <h1>这是内容区域</h1>
</Scroller>
```

```
this.refs.scroller.scrollTo(0, -100, 300);
```

#### 监听滚动事件

`Scroller` 提供了 `onScroll` 方法来监听滚动事件。一旦设置了这个回调，会强制使用 `requestAnimationFrame` 来实现滚动动画（包括：回弹、惯性滚动和 `scrollTo` 方法的动画），即使设置 `useTransition` 属性为 `true`。
这样会导致 `Scroller` 的性能变差，请谨慎使用。

```
<Scroller
    onScroll={(evt) => {
        console.log(evt.contentOffset.x); // 当前横向位移
        console.log(evt.contentOffset.y); // 当前纵向位移
    }}
>
    <h1>这是内容区域</h1>
</Scroller>
```