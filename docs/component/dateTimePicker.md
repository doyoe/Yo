#### 基本用法：
##### 日期选择器

和`Picker`一样，`DateTimePicker`需要同时配置`value`和`onChange`才能正常工作。
在滑动`DateTimePicker`时会触发`onChange`回调，在参数中能够获取到当前选中的日期值（格式为`yyyy-mm-dd`或者`hh-mm`），
你应该将`value`属性和父级组件的`state`关联起来，
并在onChange函数中进行setState操作。

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

你可以通过format属性来自定义option的文本，它能够接收两个参数，`value`对应`option`的值，`level`对应所在列的`index`
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

开启循环模式后(设置`loop`属性为`true`，默认为`true`),
DateTimePicker的option将会变成一个首尾相接的循环列表(参考iOS系统的闹钟设置):
可以分别设置各个Picker子组件是否开启循环模式。
```
<DateTimePicker
    ...
    loop={[false, false, true]}
/>
```

##### 简便添加单位

可以设置unitsInline属性来设置内联单位（单位会存在于每一个选项中），
也可设置unitsAside在每列右侧添加一个单位栏。
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

