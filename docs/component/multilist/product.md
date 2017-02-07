#### 使用场景
这里展示的是multiList主要使用场景，用于多级列表选择。常见于去哪儿客户端、美团客户端、大众点评客户端，位置筛选功能。
```
class MultiListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multiValue: [],
            dataSource: originalData 
        };
    }
    handleValueChange({newValue}) {
        let value;
        // 最后一项选中项value值为0,则清空value,0通常是不限。
        if (newValue[newValue.length - 1] === DEFAULT) {
            value = [];
        } else {
            value = newValue;
        }
        this.setState({
            multiValue: value
        });
    }
    async handleUpdateData(item){
        switch (item.asyncType){
            case 'SUBWAY-2':
                originalData.subList[5].subList[1].subList = await fetchDataOfSubway();
                this.setState({
                    dataSource: Object.assign({}, originalData)
                });
            break;
        }
    }
    render() {
        return (
            <Page title="multiList Demo" extraClass="demo-content">
                 <MultiList
                    dataSource={this.state.dataSource}
                    value={this.state.multiValue}
                    onChange={this.handleValueChange.bind(this)}
                    onUpdateData={this.handleUpdateData.bind(this)}
                />
            </Page>
        );
    }
}

```
