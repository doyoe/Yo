import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';
import testData from './testdata';
import '../../common/tapEventPluginInit';
import Touchable from '../../touchable/src';
import './demo.scss';

let guid = -1;
function getImage(url) {
    return `http://himg1.qunarzz.com/imgs/${url}a818.jpg`;
}

const dataSource = [];

for (let i = 0; i < 1000; i++) {
    const item = testData.data.commentList[parseInt(Math.random() * 50, 10)];
    dataSource.push({
        nickname: item.nickName,
        avatar: getImage(item.imgUrl),
        imageHeight: Math.floor(300 * Math.random()),
        key: ++guid
    });
}

class DemoItem extends React.Component {
    render() {
        return (
            <a style={{ display: 'block', overflow: 'hidden' }} href="javascript:void 0;">
                <img
                    style={{ display: 'block' }}
                    width={"100%"}
                    height={this.props.item.imageHeight}
                    src={this.props.item.avatar}
                />
                <span>{this.props.item.guid}</span>
                <Touchable
                    touchClass="green"
                    onTap={() => {
                        console.log('taped');
                    }}
                >
                    <div className="comment-wrap">
                        <Touchable
                            touchClass="yellow"
                            onTap={() => {
                                console.log('tap inner');
                            }}
                        >
                            <h2 className="comment-title ellipsis">如此美景，难怪志明要带春娇来这里</h2>
                        </Touchable>
                        <p className="comment-detail ellipsis">北京长城脚下的公社</p>

                        <div className="tags ellipsis">
                            度假&nbsp;/&nbsp;亲子&nbsp;/&nbsp;浪漫&nbsp;/&nbsp;美景&nbsp;/&nbsp;格调
                        </div>
                    </div>
                </Touchable>
            </a>
        );
    }
}

class ListViewDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource,
            infiniteSize: 10,
            infinite: true,
            disabled: true
        };
    }

    mutateDataSource(item) {
        const ds = this.state.dataSource.map((it) => {
            if (it.key === item.key) {
                return {
                    ...it,
                    imageHeight: it.imageHeight + 20,
                    key: ++guid
                };
            }

            return it;
        });

        this.setState({
            dataSource: ds,
            infinite: !this.state.infinite,
            infiniteSize: ++this.state.infiniteSize
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
                    <ListView
                        extraClass="yo-list-demo"
                        ref="list"
                        usePullRefresh={true}
                        onRefresh={(ds) => console.log(ds)}
                        dataSource={this.state.dataSource}
                        renderItem={(item) => <DemoItem item={item}/>}
                        itemTouchClass="item-touch"
                        infinite={true}
                        onItemTap={(item, index, target) => this.mutateDataSource(item, index, target)}
                        itemExtraClass={(item, index) => ['item', index].join(' ')}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ListViewDemo />, document.getElementById('content'));
