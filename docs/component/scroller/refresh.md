#### 下拉刷新和加载更多

`Scroller` 提供了下拉刷新和加载更多的功能，这两个功能只支持纵向滚动。这两个功能常常在 `List` 组件中使用，[查看List组件中的用法](./component-List.html)。

##### 1. 下拉刷新
    
- 功能：在滚动到 `Scroller` 顶部之后，继续滚动一段距离就会触发 `下拉刷新` 功能。该功能可以用来刷新 `Scroller` 中的内容。
- 使用：
    1. 设置 `usePullRefresh` 参数为 `true`；
    2. 通过 `onRefresh` 方法监听触发刷新状态（即：变成加载中状态）的回调；
    3. 调用 `Scroller` 实例的 `stopRefreshing` 方法来停止加载中状态，该方法的第一个参数为一个 `bool` 值，用来告诉 `Scroller` 是否刷新成功。
    如果为 `true`，会显示『加载成功』；如果为 `false`，会显示『加载失败』。

```
<Scroller
    ref="scroller"
    usePullRefresh={true}
    onRefresh={() => {
        // 刷新数据 start
        // ...
        // 刷新数据 end

        this.refs.scroller.stopRefreshing(true); // 这个调用也可以放在异步操作的回调里之后
    }}
>
    <h1>这是内容区域</h1>
</Scroller>
```

##### 2. 加载更多

- 功能：在滚动到 `Scroller` 底部之后，继续滚动一段距离就会触发 `加载更多` 功能。该功能可以用来加载 `Scroller` 中更多的内容，比如：查看详情。
- 使用：
    1. 设置 `useLoadMore` 参数为 `true`；
    2. 通过 `onLoad` 方法监听触发加载状态（即：变成加载中状态）的回调；
    3. 调用 `Scroller` 实例的 `stopLoading` 方法来停止加载中状态，该方法的第一个参数为一个 `bool` 值，用来告诉 `Scroller` 后面是否还有更多数据。
    如果为 `false` 会显示『没有更多了...』。

```
<Scroller
    ref="scroller"
    useLoadMore={true}
    onLoad={() => {
        // 加载数据 start
        // ...
        // 加载数据 end

        this.refs.scroller.stopLoading(true); // 这个调用也可以放在异步操作的回调里之后
    }}
>
    <h1>这是内容区域</h1>
</Scroller>
```