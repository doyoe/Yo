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