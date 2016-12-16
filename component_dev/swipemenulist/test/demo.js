import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SwipeMenuList from '../src';
import { getArrayByLength } from '../../common/util';
import '../../common/touchEventSimulator';

function getRandomList(size) {
    return getArrayByLength(size).fill(1).map(num => parseInt(Math.random() * 100));
}

let guid = -1;
function getRandomDataSource(size) {
    return getRandomList(size).map(num => ({ key: ++guid, text: num }));
}

class SwipeMenuListDemo extends Component {

    constructor() {
        super();
        const self = this;
        const testData = getRandomDataSource(100).map((item, i) => ({
            ...item,
            id: i,
            randomHeight: parseInt(10 + Math.random() * 40, 10),
            action: [
                {
                    text: '删除',
                    onTap(item, i, swipeMenu){
                        self.setState({
                            dataSource: self.state.dataSource.filter((it, index) => it.id !== item.id)
                        });
                    }
                }
            ]
        }));
        this.state = {
            dataSource: testData
        };
    }

    render() {

        return (
            <SwipeMenuList
                dataSource={this.state.dataSource}
                infinite={true}
                infiniteSize={30}
            />
        );
    }
}

ReactDOM.render(<SwipeMenuListDemo />, document.getElementById('content'));
