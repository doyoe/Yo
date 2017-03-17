#### 下拉刷新和加载更多

这两个功能继承自`Scroller`组件， 可以查看`Scroller`的文档来了解如何使用，这里仅仅给出一个完整的例子，在这个例子中还应用了`Immutable`数据结构。你可以尝试玩一下右边的Demo来看看这段代码究竟做了什么：

```
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Page from '../../../common/page';
import { List, Toast } from '$yo-component';
import { getRandomDataSource } from '../common/baseUtils';
import Immutable from 'immutable';

class ListBase extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: this.getDataSource(25)
        };
    }

    getDataSource(size) {
        return Immutable.fromJS(getRandomDataSource(size));
    }

    refresh() {
        this.setState({ dataSource: this.getDataSource(25) });
    }

    fetch() {
        this.setState({ dataSource: this.state.dataSource.concat(this.getDataSource(15)) });
    }

    render() {
        return (
            <Page title="List Demo" onLeftPress={() => location.href = "./index.html"}>
                <List
                    ref="list"
                    extraClass="yo-list-fullscreen"
                    dataSource={this.state.dataSource}
                    renderItem={(item, i) => <div>{i + ':' + item.get('text')}</div>}
                    infinite={true}
                    infiniteSize={20}
                    itemHeight={44}
                    usePullRefresh={true}
                    onRefresh={() => {
                        setTimeout(() => {
                            this.refresh();
                            this.refs.list.stopRefreshing(true);
                        }, 500);
                    }}
                    useLoadMore={true}
                    onLoad={() => {
                        setTimeout(() => {
                            this.fetch();
                            this.refs.list.stopLoading(true);
                        }, 500);
                    }}
                    itemExtraClass={(item, i) => {
                        return 'item ' + i;
                    }}
                    onItemTap={(item, i) => {
                        Toast.show('item' + i + ' clicked.', 2000);
                    }}
                />
            </Page>
        );
    }
}

ReactDOM.render(<ListBase />, document.getElementById('content'));
```