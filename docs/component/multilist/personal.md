
#### 自定义内容
multiList主要适用于多级选择列表，但是也支持自定义二级及二级以下内容的自定义。使用时传入subList传入自定义内容，触发renderContent，该方法需返回一个element。

```
const multiData = {
    subItemType: 'ProductMenu',
    subList: [{
        name: '产品1',
        value: 1,
        subList: 'product1'
    },{
        name: '产品2',
        value: 2,
        subList: 'product2',
    }]
};

class SimplaMultiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: multiData,
            value: [1]
        }
    }
    updateValue(value) {
        this.setState({
            value,
        })
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
                    onChange={({newValue}) => {
                        this.updateValue(newValue);
                    }}
                    onItemTap={({item})=>{
                        return [item.value];
                    }}
                    renderItem={({itemType, data, isSpread, index})=>{
                        switch (itemType){
                            case 'ProductMenu':
                                return <ProductMenu data={data} isSpread={isSpread} index={index}/>
                        }
                    }}
                    renderContent={({type}) => {
                        switch (type){
                            case 'product1':
                                return <Product tit="product1" />;
                            case 'product2':
                                return <Product tit="product2" />;
                        }
                    }}
                />
            </Page>
        )
    }
}

ReactDOM.render(<SimplaMultiList /> , document.querySelector('#container'));

```
