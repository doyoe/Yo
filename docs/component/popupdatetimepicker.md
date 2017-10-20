#### 引用方式

```
import { PopupDateTimePicker } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import PopupDateTimePicker from 'yo3/component/popupdatetimepicker';
```


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
                >
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

#### 定制 popup 区域的 Header

和`PopupPicker`组件一样，`PopupDateTimePicker`组件的弹出式选择器同样由确认、取消按钮和标题组成，这些按钮的显示值和可选的标题文本可以通过`popupHeader`定制。其定制方式与`PopupPicker`组件完全一致。

#### beforePopupShow 属性

该属性传递的回调函数在点击触发区域后，Popup 弹层弹出前执行。当其返回值为`false`时，Popup 弹出层将不会弹出。

在业务中，`PopupPicker`和`PopupDateTimePicker`选择器的值可能跟其他项有关联。例如，当前选择器只能在上一个选择器有了选择值之后才能进行选择。若上一个选择器还没有选择值时，该选择器在点击时不能触发弹出层，同时还应该向用户展示一个提示。这个时候可以通过`beforePopupShow`属性传递一个函数调用`Toast.show`显示一条通知，并将其返回值设为`false`表示不触发弹出层。

```javascript
render() {
    return (
        <div className="popupdatetimepicker-demo">
            <PopupDateTimePicker
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                beforePopupShow={() => {
                    Toast.show('before popup show');
                    return false;
                }}
                touchClass="item-touch"
                range={['2015-01-15', '2015-05-20']}
            >
                <div className="demo-item">
                    <span className="title">选择日期</span>
                    <span className="value">{this.state.value === null ? '请选择日期' : this.state.value}</span>
                </div>
            </PopupDateTimePicker>
        </div>
    );
}
```

#### 手动控制弹出式选择器的显示和隐藏

通过 React 的 `ref` 属性来获取 PopupDateTimePicker 组件的引用，然后调用该引用的 `show` 和 `hide` 方法即可控制弹出式选择器的显示和隐藏。

```javascript
render() {
    return (
        <div className="popupdatetimepicker-demo">
            <PopupDateTimePicker
                ref={component => {
                    this.popupDateTimePickerCom = component;
                }}
                ...
            >
                ...
            </PopupDateTimePicker>
        </div>
    );
}

this.popupDateTimePickerCom.show(); // 显示弹出式选择器
this.popupDateTimePickerCom.hide(); // 隐藏弹出式选择器
```