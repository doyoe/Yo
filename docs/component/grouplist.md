#### 引用方式

```
import { GroupList } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import GroupList from 'yo3/component/grouplist';
```

#### 基础使用

`GroupList`是一个定制化的`List`，它会把`List`的`dataSource`中的元素进行分组展示，并且给每一组添加一个组标题。
因此它的`dataSource`与`List`中的稍有不同，你需要给每一个元素指定一个`groupKey`，这是一个必须添加的属性:

```
let guid = -1;
...

<GroupList
    dataSource={[
        {text: '北京', key:++guid, groupKey:'B'},
        {text: '上海', key:++guid, groupKey:'S'},
        ...
    ]}
    sort={(a,b) => { //return a positive or negative number... }}
    ...
/>
```

如果设置`groupKey`为`notGrouped`，那么这些元素组成的组没有标题，并且会放置在所有分组的上方。使用`sort`属性可以给分组排序，它的使用方式与数组的sort完全一致。


除了必须给`dataSource`中的元素添加`groupKey`之外，和`List`不同的一点是`GroupList`的`renderItem`属性现在被分成了两个属性: `renderGroupItem`
和`renderGroupTitle`:

```
<GroupList
    ...
    renderGroupItem={(item,i) => { /* return a JSX ,array of element or string... */ }}
    renderGroupTitle={groupKey => { /* the same to renderGroupItem... */ }}
/>
```

你可以分别指定普通的列表项和分组标题的渲染方式，`renderGroupItem`的使用与`List`的`renderItem`完全一致；`renderGroupTitle`可以指定分组标题的渲染方式,
它可以接收一个参数`groupKey`，即你在dataSource中为每个元素添加的groupKey。

对于一些其它`List`中的属性，`GroupList`也与之有细微的差别: `itemTouchClass`在`GroupList`里只能够指定普通列表项的触摸反馈效果，对于分组标题无效,
`onItemTap`也是一样; 而`itemExtraClass`现在也分成了两个属性`itemExtraClass`和`groupTitleExtraClass`。可以参考`GroupList`的文档使用。

`GroupList`继承了`List`的全部特性，无穷模式，下拉刷新和加载更多等功能都可以使用。

#### 配置分组导航侧边栏

设置`showIndexNavBar`属性为`true`可以开启一个分组导航栏(默认是开启的)，你可以通过`renderIndexNavBar`指定渲染导航项的方式。
它有一个事件`onIndexNavBarItemHover`，在手指划过某个导航项时触发。

需要注意的是，在不指定高度的无穷模式下，分组导航栏无法使用，因为在所有列表项完成定位之前无法获取每一个分组的位置。

#### 一个完整的例子

下面的代码就是右侧Demo的源码:

```js
class GroupListDemo extends Component {

    static guid = -1;

    constructor() {
        super();
        this.state = {
            dataSource: this.renderDataSource(getRandomDataSource(100))
        };
    }

    renderDataSource(dataSource) {
        return dataSource.map((item, index)=> {
            return {
                groupKey: index < 5 ? 'notGrouped' : parseInt(item.text / 10, 10),
                text: index < 5 ? ('没有被分组的元素' + item.text) : item.text,
                key: ++GroupListDemo.guid
            };
        });
    }

    loadMore() {
        this.setState({
            dataSource: this.state.dataSource.concat(this.renderDataSource(getRandomDataSource(10)))
        });
    }

    render() {
        return (
            <Page title='GroupList Demo' onLeftPress={()=>location.href = '../index/index.html'}>
                <GroupList
                    ref='grouplist'
                    dataSource={this.state.dataSource}
                    offsetY={-220}
                    infinite={true}
                    itemHeight={44}
                    showIndexNavBar={true /* 注意:没有指定高度的无穷分组列表无法使用indexNavBar,这个属性设置为true也不会生效 */}
                    renderIndexNavBarItem={(groupKey)=>DIGIT_TO_CHN[groupKey] /* 同上 */}
                    onIndexNavBarItemHover={(groupKey)=> {
                        ToolTip.show(DIGIT_TO_CHN[groupKey], 2000);
                    }}
                    renderGroupItem={(item, index)=><div>{index + ':' + item.text}</div>}
                    renderGroupTitle={(groupKey)=>DIGIT_TO_CHN[groupKey]}
                    groupTitleExtraClass={title=>'label demo-group-title'}
                    onItemTap={(item, index)=>ToolTip.show('tapping:' + item.text, 2000)}
                    sort={(a, b)=> {
                        return a - b;
                    }}
                    usePullRefresh={true}
                    onRefresh={()=> {
                        setTimeout(()=> {
                            this.setState({ dataSource: this.renderDataSource(getRandomDataSource(500)) })
                            this.refs.grouplist.stopRefreshing(true);
                        }, 500);
                    }}
                    useLoadMore={true}
                    onLoad={()=> {
                        setTimeout(()=> {
                            this.loadMore();
                            this.refs.grouplist.stopLoading(true);
                        }, 500);
                    }}
                />
            </Page>
        );
    }
}
```

