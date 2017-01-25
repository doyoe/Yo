
#### 异步加载数据
该方法用于减少首次渲染数据的大小，不适用于替代首次数据的获取。下面是传入组件中用于渲染的`dataSource`。
```
const dataSource = {
    defaultValue: 1,
    subItemType: 'MENU',
    subList: [{
        name: '同步',
        value: 1,
        defaultValue: '1-1',
        subItemType: 'RADIO',
        subList: [{
        name: '1-1  默认选项',
            value: '1-1'
        }, {
            name: '1-2',
            value: '1-2'
        }, {
            name: '1-3',
            value: '1-3'
        }, {
            name: '1-4',
            value: '1-4'
        }]
    }, {
        name: '异步',
        value: 2,
        subItemType: 'RADIO',
        defaultValue: '2-2',
        subList: 'ASYNC',
        asyncType: '2-2'
    }]
};
```
组件按照Value和defaultValue来计算展开路径，并渲染组件。当渲染到`subList`为`ASYNC`的节点时会触发`onUpdateData`事件，并传入该层级数据内容作为参数，用户可以通过判断`Value`或自定义`key`值标记，获取数据更新`dataSource`。

```
class SimplaMultiList extends Component {
    ...
    async handleUpdateData(item){
        /**
        * item 内容为
        *{
        *    name: '异步',
        *    value: 2,
        *    subItemType: 'RADIO',
        *    defaultValue: '2-2',
        *    subList: 'ASYNC',
        *    asyncType: '2-2'
        *}
        */
         switch (item.asyncType){
            case '2-2':
                testData[1].subList = await fetchData();
                this.setState({
                    dataSource: {
                        defaultValue: 1,
                        subList: testData,
                        subItemType: 'MENU'
                    }
                });
            break;
        }
    }
    render() {
        return (
            <Page
                title="multiList Demo"
                extraClass="demo-content"
            >
                <MultiList
                    dataSource={ this.state.dataSource}
                    value={this.state.value}
                    onUpdateData={this.handleUpdateData.bind(this)}
                    onChange={({newValue}) => {
                        this.updateValue(newValue);
                         Toast.show(`您的选择是${newValue.join('>')}`)
                    }}
                />
            </Page>
        )
    }
}
```