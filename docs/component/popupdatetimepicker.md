#### 基本用法

`PopupDateTimePicker`组件实际上由两部分组成，一部分是触发弹层打开的区域，另一部分是弹出的带“确定”和“取消”按钮的弹出式选择器。

该组件是一个严格受控的组件，你需要同时定义`onChange`和`value`属性才能让它正常工作。

你应该给 `PopupDateTimePicker` 传入一个唯一子元素，这个子元素将会作为触发区域的内容，同时你还需要通过 `touchClass` 指定它的触摸反馈效果。

```javascript
class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: null
        };
    }

    handleChange(value) {
        this.setState({ value });
    }

    render() {
        return (
            <div className="popupdatetimepicker-demo">
                <PopupDateTimePicker
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    touchClass="item-touch"
                    range={['2015-01-15', '2015-05-20']}
                />
                    <div className="demo-item">
                        <span className="title">选择日期</span>
                        <span className="value">{this.state.value === null ? '请选择日期' : this.state.value}</span>
                    </div>
                </PopupDateTimePicker>
            </div>
        );
    }
}
```

#### 定制popup区域的Header

和`PopupPicker`组件一样，`PopupDateTimePicker`组件的弹出式选择器同样由确认、取消按钮和标题组成，这些按钮的显示值和可选的标题文本可以通过`popupHeader`定制。其定制方式与`PopupPicker`组件完全一致。