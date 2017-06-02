import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SwipeMenuList from '../src';
import { getArrayByLength } from '../../common/util';
import '../../common/touchEventSimulator';
import Touchable from '../../touchable/src';
import './demo.scss';
import Immutable from 'immutable';

function getRandomList(size) {
    return getArrayByLength(size).fill(1).map(() => parseInt(Math.random() * 100, 10));
}

let guid = -1;
function getRandomDataSource(size) {
    return getRandomList(size).map(num => ({ key: ++guid, text: num }));
}

class SwipeMenuListDemo extends Component {

    constructor() {
        super();
        const testData = Immutable.fromJS(getRandomDataSource(100).map((item, i) => ({
            ...item,
            id: i,
            randomHeight: parseInt(10 + Math.random() * 40, 10),
            color: 'black'
        })));
        this.state = {
            dataSource: testData
        };
    }

    render() {
        const self = this;
        return (
            <SwipeMenuList
                staticSection={<div>static!</div>}
                staticSectionHeight={200}
                getMenuConfig={() => ({
                    direction: 'right',
                    action: [
                        {
                            text: 'haha,haha',
                            onTap(item, i, sw) {
                                self.setState({
                                    dataSource: self.state.dataSource.filter(it => it.get('id') !== item.get('id'))
                                });
                                sw.close(true);
                            }
                        },
                        {
                            text: 'change color',
                            onTap(item, i, sw) {
                                self.setState({
                                    dataSource: self.state.dataSource.map(it => {
                                        if (it === item) {
                                            return it.set('color', it.get('color') === 'black' ? 'red' : 'black');
                                        }
                                        return it;
                                    })
                                });
                                sw.close();
                            }
                        }
                    ]
                })}
                extraClass={'yo-swipemenulist-demo'}
                dataSource={this.state.dataSource}
                infinite={true}
                infiniteSize={30}
                renderItem={(item, i) => ([
                    <span key={0}>{i}</span>,
                    <Touchable
                        key={1}
                        onTap={() => {
                            console.log('tapped', item.get('text'));
                        }}
                        touchClass="yellow"
                    >
                        <span style={{ marginLeft: 50, color: item.get('color') }}>{item.get('text')}</span>
                    </Touchable>
                ])}
                shouldItemUpdate={(next, now) => {
                    return next !== now;
                }}
                onItemTap={(item) => {
                    console.log('tap item', item, item.toJS());
                }}
                onMenuOpen={(item, i) => {
                    console.log('open', item, i);
                }}
                onMenuClose={(item, i) => {
                    console.log('close', item, i);
                }}
            />
        );
    }
}

ReactDOM.render(<SwipeMenuListDemo />, document.getElementById('content'));
