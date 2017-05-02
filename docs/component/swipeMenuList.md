#### 引用方式

```
import { SwipeMenuList } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import SwipeMenuList from 'yo3/component/swipemenulist';
```

#### 基础使用

`SwipeMenuList`是一个定制化的`List`，和`List`的不同之处在于它的每一个列表项都是`SwipeMenu`。因此除了列表的`dataSource`之外
你还需要指定菜单项的配置，这可以通过`getMenuConfig`属性实现：
```
<SwipeMenuList
    ...
    getMenuConfig = {(item, i) => ({
        action:[
            {
                text:`delete ${i}`
                onTap(item, i, swipeMenu){
                    console.log(item, i);
                }
            },
            ...
        ],
        ...
    })}
    ...
/>
```
它可以接收参数`item`和`i`，分别对应列表项的数据和在数据源中的index，返回一个符合`SwipeMenu`组件配置规则的对象。通过
这种方式，你可以给列表项定义不同的`SwipeMenu`配置。

在`getMenuConfig`返回的对象中，`action`属性用来配置`SwipeMenu`按钮的表现和行为，下面是一个具体的例子:

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

需要注意的是，每个按钮的`onTap`回调可以接收到三个参数，这与`SwipeMenu`不同。前两个参数`item`和`i`是列表项的数据对象和index，第三个参数
是当前列表项对应的`SwipeMenu`的组件实例的引用。实例里通过这个实例的引用调用了`SwipeMenu`的`close`方法，这样就可以在点击按钮以后关闭这个列表项。

另外，现在通过配置`renderItem`属性指定的渲染区域只有`SwipeMenu`的内容区域。它使用的方式与其他列表组件的`renderItem`完全一致。

`SwipeMenuList`继承了`List`的所有特性，无穷模式(指定高度和不指定高度)，加载更多和下拉刷新都可以使用。可以参考`List`的文档。

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

下面的代码就是右侧Demo的源码，这个Demo实现了常见的删除列表项的功能:

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
        const newDataSource = this.state.dataSource.filter((it, index) => it.key !== item.key);

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
        return ds.map((item, i) => ({
            ...item,
            color: 'black',
            key: ++SwipeMenuListDemo.guid
        }));
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

    toggleColor(item) {
        this.setState({
            dataSource: this.state.dataSource.map(it =>
                it === item ?
                    Object.assign({}, it, {
                        key: String(it.key).replace(/_\w+/, '') + '_red',
                        color: it.color === 'black' ? 'red' : 'black'
                    }) : it
            )
        });
    }

    render() {
        const self = this;
        return (
            <Page title="SwipeMenuList Demo" onLeftPress={() => location.href = './index.html'}>
                <SwipeMenuList
                    ref="swipemenulist"
                    extraClass="yo-list-fullscreen"
                    getMenuConfig={(item) => ({
                        action: [
                            {
                                text: item.color === 'black' ? '变红' : '变黑',
                                onTap(item, i, swipeMenu){
                                    self.toggleColor(item);
                                    swipeMenu.close();
                                }
                            },
                            {
                                text: '删除',
                                onTap(item, i, swipeMenu){
                                    self.deleteItem(item);
                                    swipeMenu.close(true);
                                }
                            }
                        ]
                    })}
                    dataSource={this.state.dataSource}
                    infinite={true}
                    infiniteSize={15}
                    itemHeight={83}
                    renderItem={(item, i) => (
                        <div style={{ color: item.color, height: 60, width: '100%' }}>
                            {'第' + i + '个item:' + item.text}
                        </div>
                    )}
                    usePullRefresh={true}
                    onRefresh={() => {
                        setTimeout(() => {
                            this.refresh();
                            this.refs.swipemenulist.stopRefreshing(true);
                        }, 500);
                    }}
                    onItemTap={(item) => {
                        Toast.show(item.text);
                    }}
                    itemTouchClass="item-touch"
                    useLoadMore={true}
                    onLoad={() => {
                        setTimeout(() => {
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

