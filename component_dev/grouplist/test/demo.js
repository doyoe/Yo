import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GroupList from '../src';
import Touchable from '../../touchable/src';
import { getArrayByLength } from '../../common/util';
import Immutable from 'immutable';
let id = 1;
let testData = getArrayByLength(100).fill(0)
    .map((item, i) => ({
        text: Math.random() * 100,
        groupKey: i < 5 ? 'notGrouped' : i % 10,
        id: ++id,
        key: id,
        color: 'black'
    }));
testData = Immutable.fromJS(testData);

class GroupListDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: testData,
            sort: (a, b) => a - b,
            infinite: true,
            titleHeight: 30,
            titleOffset: 0
        };
    }

    modifyHeight(item) {
        this.setState({
            dataSource: this.state.dataSource.map(it => {
                if (it === item) {
                    return it.set('height', Math.random() * 50 + 30).set('key', ++id);
                }
                return it;
            })
        });
    }

    deleteItem(item) {
        this.setState({
            dataSource: this.state.dataSource.filter(it => it.get('key') !== item.get('key')),
            sort: (a, b) => b - a,
            titleHeight: 50
        });
    }

    turnRed(item) {
        this.setState({
            dataSource: this.state.dataSource.map(it => {
                if (it === item) {
                    return it.set('color', it.get('color') === 'red' ? 'black' : 'red');
                }
                return it;
            }),
            titleOffset: 44
        });
    }

    render() {
        return (
            <GroupList
                staticSection={
                    <div style={{ background: 'yellow', height: 444 }}>
                        static header!!
                    </div>
                }
                shouldItemUpdate={(next, now) => next !== now}
                usePullRefesh={true}
                offsetY={-200}
                ref="grouplist"
                dataSource={this.state.dataSource}
                infinite={true}
                titleHeight={this.state.titleHeight}
                itemHeight={44}
                titleOffset={this.state.titleOffset}
                showIndexNavBar={true}
                renderGroupItem={(item, index) => (
                    <div style={{ width: '100%' }}>
                        {`${index}: ${item.get('text')}`}
                        <Touchable
                            onTap={() => {
                                this.turnRed(item);
                            }}
                            touchClass="opacity"
                        >
                            <span className="button">turn red!</span>
                        </Touchable>
                        <Touchable
                            onTap={() => {
                                this.deleteItem(item, index);
                            }}
                            touchClass="opacity"
                        >
                            <span className="button">delete</span>
                        </Touchable>
                    </div>
                )}
                renderGroupTitle={key => (
                    <div style={{ width: '100%' }}>
                        <span>{key}</span>
                        <Touchable
                            touchClass="yellow"
                            onTap={() => {
                                console.log(key);
                            }}
                        >
                            <span style={{ float: 'right' }}>click me!</span>
                        </Touchable>
                    </div>
                )}
                onItemTap={(item, index) => this.modifyHeight(item, index)}
                sort={this.state.sort}
                itemTouchClass={(item, index) => {
                    // console.log(item);
                    return 'item-touch';
                }}
                itemExtraClass={(item, index) => `${index} ${item.get('color')}`}
                groupTitleExtraClass={(groupKey) => `${groupKey}`}
            />
        );
    }
}

ReactDOM.render(<GroupListDemo />, document.getElementById('content'));