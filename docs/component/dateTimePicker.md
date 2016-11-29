#### 基本用法：
##### 日期选择器

由于组件是受控驱动的，所以你必须自己来控制更新，组件会将应该更新到的状态通过回调参数value传递出来，你需要通过传递state数据给value属性（如value={this.state.value}），并在onChange函数中对state（如state.value)进行更新,即调用this.setState({ value: value })。

使用range属性可以指定DateTimePicker的可选择范围。

```javascript

import DateTimePicker from 'component';
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '2016-11-02'
        };
    }

    render() {
        return (
            <DateTimePicker
                value={this.state.value}
                unitsInline={['年', '月', '日']}
                range={['2016-01-01','2016-12-31']}
                dateOrTime="date"
                onChange={value => this.setState({ value })}
            />
        )
    }
}
```

##### 时间选择器

```javascript
// this.state = { value: '12: 00' };

<DateTimePicker
    value={this.state.value}
    unitsInline={['时', '分']}
    dateOrTime="time"
    onChange={value => this.setState({ value })}
/>
```

#### 扩展用法
##### 自定义选项

你可以通过format属性来自定义选项，回调参数value--选项值，level--所在Picker的序号
```javascript
format(value, level) {
    return String(value).length < 2 ? `0${value}` : value;
}

<DateTimePicker
    ...
    format={this.format}
/>
```

##### 循环模式

开启循环模式后(设置loop属性为true，默认为true), DateTimePicker的option将会变成一个首尾相接的循环列表(参考iOS系统的闹钟设置):
可以分别设置各个Picker子组件是否开启循环模式。
```
<DateTimePicker
    ...
    loop={[false, false, true]}
/>
```

##### 简便添加单位

如果你只是想添加一些单位，你可以很方便的设置unitsInline属性来设置内联单位（单位会存在于每一个选项中）， 也可设置unitsAside在每个Picker右侧中央添加一个单位栏，此时每个Picker中只会有一个位于右侧的单位提示。
```
<DateTimePicker
    ...
    unitsInline={['年', '月', '日']}
/>
<DateTimePicker
    ...
    unitsAside={['年', '月', '日']}
/>
```

