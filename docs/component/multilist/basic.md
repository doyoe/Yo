#### 基本用法

```JavaScript
class SimplaMultiList extends Component {
    constructor(props) {
        const dataSource = {
            defaultValue: 2,
            itemExtraClass: (item) => {
                return this.state && this.state.value && this.state.value[0] === item.value ?
                    'spread' :
                    ''
            },
            subList: testData
        };
        super();
        this.state = {
            dataSource,
            value: [1, '1-1']
        }
    }
    render() {
        return (
            <MultiList
                dataSource={this.state.dataSource}
                value={this.state.value}
                updateValue={({newValue}) => {
                    this.setState({
                        value,
                    })
                }}
            />
        )
    }
}

```
