
#### 自定义内容
multiList主要适用于多级列表，但是也支持自定义二级及二级以下内容的自定义。使用时传入renderContent方法替换subList方法/属性。该方法需返回一个element。效果请查看demo，自定义内容。

```JavaScript
const multiData = {
    subList: [{
        name: '产品1',
        value: 1,
        renderContent: () => (<Product tit='1'/>)
    },{
        name: '产品2',
        value: 2,
        renderContent: () => (<Product tit='2'/>)
    }]
};

class SimplaMultiList extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: multiData,
            value: [1]
        }
    }

    render() {
        return (
            <MultiList
                dataSource={ this.state.dataSource}
                value={this.state.value}
                updateValue={({newValue}) => {
                    this.setState({
                        value: newValue,
                    })
                }}
            />
        )
    }
}
```
