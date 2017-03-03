#### Static Section

在业务需求中经常会遇到界面的一部分是列表形式，一部分是静态内容的情况。
这种场景可以借助`staticSection`属性实现，给这个属性传入的JSX将会被渲染到所有列表项之上，例如：

```
<List
    ...
    staticSection={<div>static section...</div>}
/>
```

下面的代码是一个更复杂的例子，这个例子实现的是类似去哪儿旅行客户端首页的效果，上部区域是静态内容，下半部分是一个Infinite的列表，
还实现了一个横向的可滚动Tab，你可以在右边的Demo中查看效果：

```js
class Demo extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: getRandomDataSource(25),
            x: 0
        };
    }

    getContent() {
        return [1, 2, 3, 4, 5].map((item) => {
            return <div className="item" style={{ background: 'green' }} key={item}>{item}</div>;
        });
    }

    getGroup(i) {
        return (
            <div key={i} className="demo-group">
                <Scroller.Sticky>
                    <div style={{ height: 50, lineHeight: 50 + 'px' }} className="sticky-title">
                        <span>{'Sticky Header ' + i}</span>
                        <Touchable touchClass='touchable-opacity' onTap={() => {
                            Toast.show('sticky header ' + i);
                        }}>
                            <span className="touchable-right" style={{ float: 'right' }}>tap!</span>
                        </Touchable>
                    </div>
                </Scroller.Sticky>
                {this.getContent()}
            </div>
        );
    }

    refresh() {
        this.setState({ dataSource: getRandomDataSource(25) });
    }

    fetch() {
        this.setState({ dataSource: this.state.dataSource.concat(getRandomDataSource(15)) });
    }

    render() {
        return (
            <Page title="List: Static Section" onLeftPress={() => location.href = "./index.html"}>
                <List
                    directionLockThreshold={3 /* 这个属性用来改变竖向滚动的阈值，因为这个例子中存在横向滚动容器，设置一个小的阈值可以解决方向冲突问题 */}
                    staticSection={
                        <div className="demo-static-header">
                            {[0, 1, 2].map(num => this.getGroup(num))}
                            <Scroller.Sticky>
                                <div>
                                    <div style={{ height: 50, lineHeight: 50 + 'px' }} className="sticky-title">
                                        <span>{'Sticky Header For List'}</span>
                                    </div>
                                    <Scroller
                                        style={{ height: 50, width: '100%', background: 'white' }}
                                        scrollX={true}
                                        scrollY={false}
                                        bounce={false}
                                        contentOffset={{ x: this.state.x || 0, y: 0 }}
                                        onScrollEnd={(evt) => {
                                            const x = evt.contentOffset.x;
                                            this.setState({ x })
                                        }}
                                    >
                                        <div style={{ height: '100%', width: 600 }}>
                                            {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                                <span key={num} className="scroller-item">{num}</span>
                                            ))}
                                        </div>
                                    </Scroller>
                                </div>
                            </Scroller.Sticky>
                        </div>
                    }
                    ref="list"
                    extraClass="yo-scroller-fullscreen"
                    dataSource={this.state.dataSource}
                    renderItem={(item, i) => <div>{i + ':' + item.text}</div>}
                    infinite={true}
                    infiniteSize={20}
                    itemHeight={44}
                    useLoadMore={true}
                    onLoad={() => {
                        setTimeout(() => {
                            this.fetch();
                            this.refs.list.stopLoading(true);
                        }, 500);
                    }}
                    onItemTap={(item, i) => {
                        Toast.show('item' + i + ' clicked.', 2000);
                    }}
                />
            </Page>
        );
    }
}
```