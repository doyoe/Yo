import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src';
import testData from './testdata';
import '../../common/tapEventPluginInit';
import Touchable from '../../touchable/src';
import './demo.scss';
import Immutable from 'immutable';

let guid = -1;
function getImage(url) {
    return `http://himg1.qunarzz.com/imgs/${url}a818.jpg`;
}

let dataSource = [];

for (let i = 0; i < 100; i++) {
    const item = testData.data.commentList[parseInt(Math.random() * 50, 10)];
    dataSource.push({
        nickname: item.nickName,
        avatar: getImage(item.imgUrl),
        imageHeight: Math.floor(300 * Math.random()),
        key: ++guid,
        color: 'black'
    });
}

dataSource = Immutable.fromJS(dataSource);

const DemoItem = (props) => (
    <div style={{ display: 'block', overflow: 'hidden' }}>
        <ListView.LazyImage
            style={{ display: 'block' }}
            width={"100%"}
            height={props.item.get('imageHeight')}
            src={props.item.get('avatar')}
            defaultImage="http://www.w3school.com.cn/i/bg_flower.gif"
        />
        <span>{props.item.get('guid')}</span>
        <Touchable
            touchClass="green"
            onTap={() => {
                console.log('taped');
            }}
        >
            <div className="comment-wrap">
                <Touchable
                    disabled={props.item.get('color') === 'red'}
                    touchClass="yellow"
                    onTap={() => {
                        props.red();
                    }}
                >
                    <h2
                        className="comment-title ellipsis"
                        style={{ color: props.item.get('color') }}
                    >
                        如此美景，难怪志明要带春娇来这里
                    </h2>
                </Touchable>
                <p className="comment-detail ellipsis">北京长城脚下的公社</p>

                <div className="tags ellipsis">
                    度假&nbsp;/&nbsp;亲子&nbsp;/&nbsp;浪漫&nbsp;/&nbsp;美景&nbsp;/&nbsp;格调
                </div>
            </div>
        </Touchable>
    </div>
);

DemoItem.propTypes = {
    item: React.PropTypes.object,
    red: React.PropTypes.func
};

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
        console.log(item.toJS(), this.state.dataSource.toJS())
        const ds = this.state.dataSource.map(it => {
            if (it === item) {
                return it.set('imageHeight', it.get('imageHeight') + 20).set('key', ++guid);
            }
            return it;
        });

        this.setState({
            dataSource: ds,
            infinite: !this.state.infinite,
            infiniteSize: ++this.state.infiniteSize
        });
    }

    red(item) {
        this.setState({
            dataSource: this.state.dataSource.map(it => {
                if (it === item) {
                    return it.set('color', it.get('color') === 'red' ? 'black' : 'red');
                }
                return it;
            })
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
                    <ListView
                        staticSection={
                            <div className="haha" style={{ height: 200 }}>
                                Heallo
                            </div>
                        }
                        shouldItemUpdate={(prev, now) => prev !== now}
                        extraClass="yo-list-demo"
                        ref="list"
                        dataSource={this.state.dataSource}
                        renderItem={(item) => <DemoItem
                            red={() => {
                                this.red(item);
                            }}
                            item={item}
                        />}
                        itemTouchClass="item-touch"
                        infinite={true}
                        onItemTap={(item, index, target) => this.mutateDataSource(item, index, target)}
                        itemExtraClass={(item, index) => index}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ListViewDemo />, document.getElementById('content'));
