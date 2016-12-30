import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GroupList from '../src';
import Touchable from '../../touchable/src';
import { getArrayByLength } from '../../common/util';
let id = 1;
const testData = getArrayByLength(100).fill(0)
    .map((item, i) => ({
        text: Math.random() * 100,
        groupKey: i < 5 ? 'notGrouped' : i % 10,
        id: ++id,
        key: id
    }));

class GroupListDemo extends Component {

    constructor(props) {

        super(props);
        this.state = {
            dataSource: testData,
            sort: (a, b) => a - b,
            infinite: true
        };
    }

    deleteItem(item) {
        this.setState({
            dataSource: this.state.dataSource.filter(it => it.key !== item.key),
            sort: (a, b) => b - a
        });
    }

    render() {

        return (
            <GroupList
                usePullRefesh={true}
                offsetY={-500}
                ref="grouplist"
                dataSource={this.state.dataSource}
                infinite={true}
                showIndexNavBar={true}
                renderGroupTitle={key => (
                    <div style={{width:'100%'}}>
                        <span>{key}</span>
                        <Touchable touchClass="yellow" onTap={()=>{console.log(key)}}>
                            <span style={{float:'right'}}>click me!</span>
                        </Touchable>
                    </div>
                )}
                onItemTap={(item, index, ds) => this.deleteItem(item)}
                sort={this.state.sort}
                itemExtraClass={(item, index) => 'item ' + index}
                groupTitleExtraClass={(groupKey) => {
                    return 'group-title label ' + groupKey;
                }}
            />
        );
    }
}

ReactDOM.render(<GroupListDemo />, document.getElementById('content'));

