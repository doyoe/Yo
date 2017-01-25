#### 下拉刷新和加载更多

这两个功能继承自`Scroller`组件， 可以查看`Scroller`的文档来了解如何使用，这里仅仅给出一个完整的例子。
可以尝试玩一下右边的Demo来看看这段代码究竟做了什么：

```
class ListBase extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: getRandomDataSource(25)
        };
    }

    // 刷新List
    refresh() {
        this.setState({ dataSource: getRandomDataSource(25) });
    }

    // 加载更多
    fetch() {
        this.setState({ dataSource: this.state.dataSource.concat(getRandomDataSource(15)) });
    }

    render() {
        return (
            <Page title="List Demo" onLeftPress={()=>location.href = "../index.html"}>
                <List
                    ref="list"
                    dataSource={this.state.dataSource}
                    renderItem={(item, i)=><div>{i + ':' + item.text}</div>}
                    infinite={true}
                    infiniteSize={20}
                    itemHeight={44}
                    usePullRefresh={true}
                    onRefresh={()=> {
                        setTimeout(()=> {
                            this.refresh();
                            this.refs.list.stopRefreshing(true);
                        }, 500);
                    }}
                    useLoadMore={true}
                    onLoad={()=> {
                        setTimeout(()=> {
                            this.fetch();
                            this.refs.list.stopLoading(true);
                        }, 500);
                    }}
                    onItemTap={(item, i)=> {
                        Toast.show('item' + i + ' clicked.', 2000);
                    }}
                />
            </Page>
        );
    }
}
```