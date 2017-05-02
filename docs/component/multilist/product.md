#### 引用方式

```
import { MultiList } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import MultiList from 'yo3/component/multilist';
```

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
