#### 基本用法
最简单用法，默认显示未来90天的可选日期范围，同时选中日期范围的起、始日期可为同一天。
用户选中范围的起始日期分别是`selectionStart`和`selectionEnd`属性。由于这是一个受控组件，所以需要通过 `onChange` 回调来设置当前值。

```javascript
<Calendar 
    selectionStart={this.state.selectionStart}
    selectionEnd={this.state.selectionEnd}
    onChange={obj => this.setState({
        selectionStart: obj.selectionStart,
        selectionEnd: obj.selectionEnd
    })}
/>
```

#### 显示特定日期范围
使用`duration`属性，配置显示特定阶段的日期范围，传入具体的数值显示未来可选择的天数范围，还可传入一个数组，显示特定起始范围的可选日期。
另外，可以在`onChange`函数中决定用户选择的日期范围的起、始日期不能为同一天。

```JavaScript
class Demo extends Component {
    constructor() {
        super();
        this.state = {
            selectionStart: '2017-01-01',
            selectionEnd: '2017-01-10'
        };
    }

    onChange(obj) {
        const { selectionStart, selectionEnd } = obj;
        if (selectionStart === selectionEnd) {
            return;
        }
        this.setState({
            selectionStart,
            selectionEnd
        });
    }

    render() {
        return (
             <Calendar
                 duration={['2017-01-01', '2017-12-31']}
                 selectionStart={this.state.selectionStart}
                 selectionEnd={this.state.selectionEnd}
                 onChange={obj => this.onChange(obj)}
             />
        );
    }
}

```
#### 只允许选择单日
配置`allowSingle`属性为`true`，只允许用户选择单个日期，即仅有`selectionStart`属性生效。

```javascript
<Calendar
    allowSingle={true}
    selectionStart={this.state.selectionStart}
    onChange={obj => this.setState({
        selectionStart: obj.selectionStart,
    })}    
/>
```

#### 个性化选中日期标记
通过设置`selectionStartText`和`selectionEndText`属性自定义选中日期的标记内容，同时可传入[Yo支持的iconfont](http://iconfont.corp.qunar.com/repositories/7)。
另外，可以在`onChange`函数中动态设置`selectionStartText`的文字内容，在用户前后两次选中同一天和选择一个日期范围两种情况之间的标记切换。
```JavaScript
<Calendar
    selectionStart={this.state.selectionStart}
    selectionEnd={this.state.selectionEnd}
    selectionStartText="起飞"
    selectionEndText="&#xf04a;"
    onChange={obj => this.onChange(obj)}
/>
```