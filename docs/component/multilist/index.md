#### dataSource 数据结构
multiList是根据dataSource 以及 value进行递归渲染的，因此dataSource是一个树形的结构。
```javascript
const testData = [{
    name: '1',
    value: 1,
    defaultValue: '1-1',
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
    name: '2',
    value: 2,
    defaultValue: '2-2',
    subList: [{
        name: '2-1',
        value: '2-1',
        defaultValue: '2-1-1',
        subList:[{
            name: '2-1-1',
            value: '2-1-1'
        },{
            name: '2-1-2',
            value: '2-1-2'
        }]
    }, {
        name: '2-2 默认选项',
        value: '2-2'
    }, {
        name: '2-3',
        value: '2-3'
    }]
}];
```
