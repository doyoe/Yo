import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';
import testData from './testdata';
import '../../common/tapEventPluginInit'

var guid = -1;
function getImage(url) {
    return "http://himg1.qunarzz.com/imgs/" + url + "a818.jpg";
}

let dataSource = [];

for (let i = 0; i < 10; i++) {
    let item = testData.data.commentList[parseInt(Math.random() * 50)];
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
                <div className="comment-wrap">
                    <h2 className="comment-title ellipsis">如此美景，难怪志明要带春娇来这里</h2>
                    <p className="comment-detail ellipsis">北京长城脚下的公社</p>

                    <div className="tags ellipsis">
                        度假&nbsp;/&nbsp;亲子&nbsp;/&nbsp;浪漫&nbsp;/&nbsp;美景&nbsp;/&nbsp;格调
                    </div>
                </div>
            </a>
        );
    }
}

class ListViewDemo extends React.Component {
    mutateDataSource(item, i, target) {
        console.log(item, i, target);
        const ds = this.state.dataSource.map((it, i) => {
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

    constructor(props) {
        super(props);
        this.state = {
            dataSource: dataSource,
            infiniteSize: 10,
            infinite: true
        };
    }

    render() {
        return (
            <div style={{ height: "100%" }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, width: "100%" }}>
                    <ListView
                        ref="list"
                        usePullRefresh={true}
                        onRefresh={(ds) => console.log(ds)}
                        dataSource={this.state.dataSource}
                        renderItem={(item, i) => <DemoItem item={item}/>}
                        itemTouchClass="item-touch"
                        infinite={true}
                        onItemTap={(item, index, target) => this.mutateDataSource(item, index, target)}
                        //给item添加额外样式
                        //可以是字符串,会被应用到所有item上
                        //也可以是函数
                        itemExtraClass={(item, index) => ['item', index].join(' ')}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ListViewDemo />, document.getElementById('content'));
