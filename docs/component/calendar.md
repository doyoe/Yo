#### 引用方式

```
import { Calendar } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Calendar from 'yo3/component/calendar';
```

#### 基本用法
最简单用法，默认显示未来90天的可选日期范围，同时选中日期范围的起、始日期可为同一天。
用户选中范围的起始日期分别是`selectionStart`和`selectionEnd`属性。由于这是一个受控组件，所以需要通过 `onChange` 回调来设置当前值。

```
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

```
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

```
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
```
<Calendar
    selectionStart={this.state.selectionStart}
    selectionEnd={this.state.selectionEnd}
    selectionStartText="起飞"
    selectionEndText="&#xf04a;"
    onChange={obj => this.onChange(obj)}
/>
```

#### 自定义日期渲染模板
通过设置 `renderDate` 属性函数，返回自定义组件的日期渲染模板内容。其中，参数 `item` 是具体某个日期对象的数据层，格式如下：

```javaScript
{
    date: “2017/10”, // 年/月
    day: 1,  // 日
    disabled: false, // 是否可点击
    holiday: "国庆节", // 节假日
    isCheck: false, // 是否选中
    isCheckIn: false, // 是否选中的开始日期
    isCheckOut: false, // 是否选中的结束日期
    lunar: '08-12', // 农历日期：八月十二
    today: false, // 是否今天
    weekend: true, // 是否周末
}
```

另外，可通过参数 `ret` 获取组件内部的默认渲染模板：
```
[
    <span className="day">{item.day}</span>,
    item.today ? (<ins className="special">今天</ins>) : null,
    item.holiday ? (<ins className="special">{item.holiday}</ins>) : null,
    item.isCheckIn ? (<span className="tip yo-ico">{selectionStartText}</span>) : null,
    item.isCheckOut ? (<span className="tip yo-ico">{selectionEndText}</span>) : null
]
```

```
<Calendar
    renderDate={(item, ret) => {
        const { day } = item;
        return day === 1 ? (
            <span>First</span>
        ) : ret;
    }
/>
```