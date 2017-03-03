import './demo.scss';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MultiList from '../src';
import {
    trafficData,
    localData,
    distanceData,
    reginData,
    toturistAttractionData,
    subWayData
} from './testdata.js';

function fetchDataOfSubway() {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve(subWayData[2]);
        }, 2000);
    });
}

const originalData = {
    subList: [
        {
            name: '距离我',
            value: 'distance',
            subItemType: 'RADIO',
            subList: distanceData,
            defaultValue: 0
        }, {
            name: '商圈',
            value: 'downtown',
            subItemType: 'RADIO',
            subList: localData,
            defaultValue: 0
        }, {
            name: '行政区',
            value: 'region',
            subItemType: 'CHECKBOX',
            subList: reginData,
            defaultValue: 0
        }, {
            name: '热门景点',
            value: 'scenic',
            subItemType: 'MENU',
            subList: [
                {
                    value: 'city',
                    name: '观光景点',
                    subItemType: 'RADIO',
                    defaultValue: 0,
                    subList: toturistAttractionData.urban
                }, {
                    value: 'nearby',
                    name: '郊游景点',
                    subItemType: 'RADIO',
                    defaultValue: 0,
                    subList: toturistAttractionData.suburbs
                }
            ]
        }, {
            value: 'traffic',
            name: '机场车站',
            subItemType: 'RADIO',
            subList: trafficData,
            defaultValue: 0
        }, {
            value: 'subWay',
            name: '地铁线路',
            subItemType: 'MENU',
            subList: [{
                value: '1',
                name: '1号线',
                subItemType: 'CHECKBOX',
                defaultValue: 0,
                subList: subWayData[1]
            }, {
                value: '2',
                name: '2号线',
                subItemType: 'CHECKBOX',
                subList: 'ASYNC',
                asyncType: 'SUBWAY-2'
            }, {
                value: '3',
                name: '3号线',
                subItemType: 'CHECKBOX',
                subList: 'FAULT'
            }, {
                value: '4',
                name: '4号线',
                subItemType: 'CHECKBOX',
                subList: 'EMPTY'
            }]
        }
    ],
    subItemType: 'MENU',
    onItemTapType: 'DEFAULT',
    defaultValue: 'downtown'
};

class MultiListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multiValue: [],
            dataSource: originalData 
        };
    }
    handleUpdateData() {}
    handleValueChange({newValue, newItems}) {
        let value;
        if (newValue[newValue.length - 1] === 0) {
            value = [];
        } else {
            value = newValue;
        }
        console.log(newItems.map(item => Array.isArray(item)? item.map(i => i.name).join('_'): item.name).join(','));
        this.setState({
            multiValue: value
        });
    }
    handleRenderContent() {}
    async handleAsyncData(item) {
        console.log('触发了一次异步加载回调');
        switch (item.asyncType) {
        case 'SUBWAY-2':
            originalData.subList[5].subList[1].subList = await fetchDataOfSubway();
            this.setState({
                dataSource: Object.assign({}, originalData)
            });
            break;
        default:
            break;
        }
    }
    render() {
        return (
            <MultiList
                dataSource={this.state.dataSource}
                value={this.state.multiValue}
                onItemTap={() => this.handleItemTap()}
                onChange={this.handleValueChange.bind(this)}
                renderContent={() => this.handleRenderContent()}
                onUpdateData={this.handleAsyncData.bind(this)}
            />
        );
    }
}
ReactDOM.render(<MultiListDemo />, document.querySelector('#container'));