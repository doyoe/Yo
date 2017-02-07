#### 列表项的性能优化和更新

在开启了无穷列表模式的情况下，在滚动过程中会实时更新容器内部的列表项，这会触发大量的`render`过程，虽然React的虚拟dom diff的开销并不大，
但是对于某些老式手机，如此频繁的触发dom diff依然会有不可忽视的性能开销。

为了最大限度地优化滚动的性能，无穷列表的列表项都默认配置了`shouldComponentUpdate`，** 它会根据列表项对应的`item.key`是否发生了变化来决定是否触发`render`，
这样可以确保`render`的触发次数达到最小。 ** 你会发现这和使用`Immutable`来优化`render`的原理十分相似。

** 在默认情况下，如果你想修改列表中某一项的数据，
除了设置改变后的属性值之外，你还应该给它设置一个新的`key`，
否则ListItem的`shouldComponentUpdate`的结果仍然为`false`，你期待的dom更新也不会发生。 **

有的时候这会导致用户期待的`render`没有发生，这时候可以通过配置`shouldItemUpdate`属性来覆盖掉默认的`shouldComponentUpdate`返回的结果。例如：

```
<List
    ...
    shouldItemUpdate={(next,now) => {
        // return ...; //true or false
    }}
/>
```

这个函数接收两个参数，第一个参数和第二个参数分别对应着列表项当前的数据和即将接收到的数据。
这个函数返回的布尔值会作为shouldComponentUpdate的新结果返回。

这里需要注意一点，如果你没有使用`Immutable`数据结构，
那么`next`和`now`此时实际上都会指向同一个对象。所以在这种情况下，
不能简单地通过这两个对象的浅比较来确定是否应该`render`。

如果你使用了`Immutable`，那么推荐做以下的配置：
```
<List
    ...
    shouldItemUpdate={(next,now) => next !== now }
    ...
/>
```
这样当列表项的数据发生变化时，你不必再做修改`key`值的操作而只需要修改数据，改动的列表项将会自动重新`render`，方便许多。

#### 无穷模式下改变列表项的高度
如上所述, 无穷列表的所有位置信息保存在`List`组件内部的一张哈希表中，这个哈希表的键值正是你传入的列表项的`key`。

因此，如果某一项的高度发生了变化，你需要给它设置一个新的`key`，这样保存高度的哈希表的旧记录就失效了，
在列表项重新render以后，它的新高度就被用这个新的key值保存到哈希表中。** 注意：这种改变高度的场景必须通过修改`key`值来
实现，即使你已经使用`shouldItemUpdate`改变了原有的`shouldComponentUpdate`。 **

右侧的Demo展示了一个需要展开完整文本内容的场景，这正是一个典型的需要改变列表项高度的需求，它的代码如下：
```
class ModifyHeightDemo extends Component {

    static guid = -1;

    constructor() {
        super();
        this.state = {
            dataSource: Immutable.fromJS(dataSource.map(item => {
                const len = item.comment.trim().length;
                return {
                    ...item,
                    showMoreFlag: false,
                    key: ++ModifyHeightDemo.guid,
                    shortComment: len > 150 ? item.comment.substr(0, 150) + '...' : item.comment,
                    commentHasMore: len > 150 ? 1 : 0
                };
            }))
        };
    }

    // 展开/收起内容，注意这里key值发生的变化
    toggle(item) {
        this.setState({
            dataSource: this.state.dataSource.map(it => {
                if (it === item) {
                    return it
                        .set('key', ++ModifyHeightDemo.guid)
                        .set('showMoreFlag', !it.get('showMoreFlag'));
                }
                return it;
            })
        });
    }

    render() {
        return (
            <Page title="Modify Height" onLeftPress={() => location.href = "./index.html"}>
                <List
                    extraClass="yo-scroller-fullscreen m-sight-comment-list"
                    dataSource={this.state.dataSource}
                    renderItem={(item) => <DemoItem data={item} toggle={() => this.toggle(item)}/>}
                    infinite={true}
                    infiniteSize={5}
                />
            </Page>
        );
    }
}
```