#### 基础使用

`SwipeMenuList`是一个定制化的`List`, 和`List`的不同之处在于它的每一个列表项都是`SwipeMenu`, 因此它的`dataSource`和
`List`稍有不同。实际上`dataSource`中的每一个元素都是一个`SwipeMenu`组件的配置项。它的格式如下:

```
{
    // 配置菜单的按钮
    action:[
        {
            text: string // 按钮文本,必须
            onTap: function // 按钮的点击事件回调,接受参数item(这个配置对象的引用),index(配置对象在数据源的index)以及component(该对象对应的SwipeMenu组件的引用)
            className: // 给按钮附加的额外类名
        },
        ...
    ],
    // List dataSource原有的属性
    height: number // 组件高度(参考List组件的数据源中相应的属性),如果开启了infinite模式并且没有设置高度,则会使用不定高的无穷列表
    text: string // SwipeMenu内容区文本,可选,如果不配置renderMenuContent,则会使用这个属性作为内容区的内容,
    key: // 列表项的key
}
```

`action`属性用来配置`SwipeMenu`按钮的表现和行为, 下面是一个具体的例子:

```
[
    {
        text: '点我',
        onTap(item, i, swipeMenu){
            ToolTip.show(item.text, 1000);
            swipeMenu.close();
        }
    },
    {
        text: '删除',
        onTap(item, i, swipeMenu){
            self.deleteItem(item);
        }
    }
]
```

需要注意的是, 每个按钮的`onTap`回调可以接收到三个参数, 这与`SwipeMenu`不同。前两个参数`item`和`i`是列表项的数据对象和index, 第三个参数
是当前列表项对应的`SwipeMenu`的组件实例的引用。实例里通过这个实例的引用调用了`SwipeMenu`的`close`方法, 这样就可以在点击按钮以后关闭这个列表项。

另外, `renderItem`属性被`renderMenuContent`取代, 你能指定的渲染区域只有`SwipeMenu`的内容区域。它使用的方式与`renderItem`完全一致。

`SwipeMenuList`继承了`List`的所有特性, 无穷模式(指定高度和不指定高度), 加载更多和下拉刷新都可以使用。可以参考`List`的文档。

#### 监听菜单项的打开/关闭

`SwipeMenuList` 提供了两个事件回调函数 `onMenuOpen`和`onMenuClose` 来监听菜单项打开状态的变化，这在某些场景下会有用
（可以观察一下iOS的信息功能，在短信上左划整个页面会发生什么变化）。参考下面的代码：

```
<SwipeMenuList
    dataSource={this.state.dataSource}
    infinite={true}
    infiniteSize={30}
    onMenuOpen={(item, index) => {
        // 参数可以取到当前打开的菜单项的数据和index
        console.log('open', item, index);
    }}
    onMenuClose={(item,index) => {
        // 同上
        console.log('close', item, index);
    }}
/>
```

#### 一个完整的例子

下面的代码就是右侧Demo的源码, 这个Demo实现了常见的删除列表项的功能:

```
class SwipeMenuListDemo extends Component {

    static guid = -1;

    append(origDs = this.state.dataSource) {
        this.setState({
            dataSource: origDs.concat(this.renderDataSource(getRandomDataSource(20)))
        });
    }

    refresh() {
        this.setState({ dataSource: this.renderDataSource(getRandomDataSource(20)) })
    }

    deleteItem(item) {
        const newDataSource = this.state.dataSource.filter((it, index)=>it.key !== item.key);

        if (newDataSource.length < this.page * 20) {
            this.append(newDataSource);
        }
        else {
            this.setState({
                dataSource: newDataSource
            });
        }
    }

    renderDataSource(ds) {
        const self = this;
        return ds.map((item, i)=> {
            return {
                ...item,
                key: ++SwipeMenuListDemo.guid,
                action: [
                    {
                        text: '点我',
                        onTap(item, i, swipeMenu){
                            ToolTip.show(item.text, 1000);
                            swipeMenu.close();
                        }
                    },
                    {
                        text: '删除',
                        onTap(item, i, swipeMenu){
                            self.deleteItem(item);
                        }
                    }
                ]
            };
        });
    }

    constructor() {
        super();
        const self = this;
        const testData = this.renderDataSource(getRandomDataSource(20));
        this.page = 1;
        this.state = {
            dataSource: testData
        };
    }

    render() {
        return (
            <Page title="SwipeMenuList Demo" onLeftPress={()=>location.href = '../index/index.html'}>
                <SwipeMenuList
                    offsetY={-100}
                    ref="swipemenulist"
                    dataSource={this.state.dataSource}
                    infinite={true}
                    infiniteSize={15}
                    renderMenuContent={(item, i)=>(
                        <div style={{ height: 60 }}>
                            {'第' + i + '个item:' + item.text}
                        </div>
                    )}
                    usePullRefresh={true}
                    onRefresh={()=> {
                        setTimeout(()=> {
                            this.refresh();
                            this.refs.swipemenulist.stopRefreshing(true);
                        }, 500);
                    }}
                    useLoadMore={true}
                    onLoad={()=> {
                        setTimeout(()=> {
                            this.append();
                            ++this.page;
                            this.refs.swipemenulist.stopLoading(true);
                        }, 500);
                    }}
                />
            </Page>
        );
    }
}
```

