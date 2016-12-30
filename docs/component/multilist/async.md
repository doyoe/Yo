
#### 异步加载数据
调用MultiList组件的组件请参考上一个demo。该方法用于减少首次渲染数据的优化，不适用于替代首次数据的获取。

```JavaScript
const subList = [{
    name: '2-1',
    value: '2-1'
},{
    name: '2-2',
    value: '2-2'
},{
    name: '2-3',
    value: '2-3'
}];
const testData = [{
    name: '异步',
    value: 2,
    defaultValue: '2-2',
    subList: function(){
        return new Promise((resolve, reject) => {
            window.setTimeout(function(){
                resolve(subList)
            }, 300)
        })
    }
}];
```

当组件渲染到当前层级时会执行`sublist`方法，该方法需返回一个`promise`对象，`resolve`的参数是对应该层级的内容，组件介绍到内容后会触发`updateDataSource`方法并返回处理好的完整的`dataSource`。

```JavaScript
<MultiList
    dataSource={ this.state.dataSource}
    value={this.state.value}
    updateDataSource={(data) => {
        this.setState({
            dataSource: data
        });
    }}
    updateValue={({newValue}) => {
        this.updateValue(newValue);
    }}
/>
```
