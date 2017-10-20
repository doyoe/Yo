#### 引用方式

```
import { PopupPicker } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import PopupPicker from 'yo3/component/popuppicker';
```

#### 基本用法

`PopupPicker`组件实际上由两部分组成，一部分是触发弹层打开的区域，另一部分是弹出的带“确定”和“取消”按钮的弹出式选择器。
这样会使`PopupPicker`看起来更像一个网页里的`<select>`，唯一的区别是你可以扩展弹出式选择器的样式而浏览器不能。

和其他表单组件一样，这个组件也是一个严格受控的组件，你需要同时定义`onChange`和`value`属性才能让它正常工作。

你应该给 `PopupPicker` 传入一个唯一子元素，这个子元素将会作为触发区域的内容，同时你还需要通过 `touchClass` 指定它的触摸反馈效果。

```javascript
const options = [
    { text: '零', value: 0 },
    { text: '一', value: 1 },
    { text: '二', value: 2 },
    { text: '三', value: 3 },
    { text: '四', value: 4 },
    { text: '五', value: 5 },
    { text: '六', value: 6 },
    { text: '七', value: 7 },
    { text: '八', value: 8 },
    { text: '九', value: 9 }
];

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
            <div className="popuppicker-demo">
                <PopupPicker
                    options={options}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    touchClass="item-touch"
                >
                    <div className="demo-item">
                        <span className="title">选择序号</span>
                        <span className="value">{this.state.value === null ? '请选择' : this.state.value}</span>
                    </div>
                </PopupPicker>
            </div>
        );
    }
}
```

#### 定制popup区域的Header

弹出式选择器的 Header 由确认、取消按钮和标题组成，这些按钮的显示值和可选的标题文本可以通过`popupHeader`定制。

```javascript
popupHeader={{
    title: '欢迎使用Yo',
    cancelBtn: { text: 'Cancel', touchClass: 'myTouchClass' },
    okBtn: { text: 'OK', touchClass: 'myTouchClass' }
}}
```

popupHeader 可以设置`title`、`cancelBtn`和`okBtn`值，它们分别代表位于 Header 中间的标题，Header 左边取消按钮和右边确认按钮的显示值。

如果没有设置`title`值，则不显示标题，左右两边的按钮的默认显示值为“取消”和“确认”，可以通过设置`cancelBtn`和`okBtn`覆盖默认值。

#### 图标按钮

上面介绍的`cancelBtn`和`okBtn`不仅可以为字符串，也可以为一个jsx元素。可以将一个图标元素作为`cancelBtn`的值（见下例），这时的取消按钮就是一个叉状的图标了。

```javascript
popupHeader={{
    title: '欢迎使用Yo',
    cancelBtn: { text: (<i className="regret yo-ico">&#xf077;</i>), touchClass: 'myTouchClass' },
    okBtn: { text: 'OK', touchClass: 'myTouchClass' }
}}
```

#### 多列Picker
如果你给 `options` 属性传入一个二维数组，例如：

```javascript
const options = [
    [
        { value: 'javascript' },
        { value: 'java' },
        { value: 'c++' },
        { value: 'haskell' },
        { value: 'scheme' }
    ],
    [
        { value: 'functional' },
        { value: 'imperative' }
    ]
];
```

这时候 `PopupPicker` 将会变成一个多列的 `Picker`：

```javascript
<PopupPicker
    // value可以为null或者传入一个数组，对应每一列picker的取值
    value={this.state.value}
    onChange={(value) => {
        // 你接收到的value将会是一个数组，包含了每一列picker的值
        this.setState({ value });
    }}
    // 以下这些属性都不变
    duration={200}
    options={options}
    pickerHeight={150}
    // looped和unit现在也支持传入数组以定制每一列picker的对应属性，如果传入单个值，则会被应用于所有的picker上
    looped={[true, false]}
    unit={['language', 'paradigm']}
>
    {this.renderField(this.state.value)}
</PopupPicker>
```

#### beforePopupShow 属性

该属性传递的回调函数在点击触发区域后，Popup 弹层弹出前执行。当其返回值为`false`时，Popup 弹出层将不会弹出。

在业务中，`PopupPicker`和`PopupDateTimePicker`选择器的值可能跟其他项有关联。例如，当前选择器只能在上一个选择器有了选择值之后才能进行选择。若上一个选择器还没有选择值时，该选择器在点击时不能触发弹出层，同时还应该向用户展示一个提示。这个时候可以通过`beforePopupShow`属性传递一个函数调用`Toast.show`显示一条通知，并将其返回值设为`false`表示不触发弹出层。

```javascript
render() {
        return (
            <div className="popuppicker-demo">
                <PopupPicker
                    options={options}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    beforePopupShow={() => {
                        Toast.show('before popup show');
                        return false;
                    }}
                    touchClass="item-touch"
                >
                    <div className="demo-item">
                        <span className="title">选择序号</span>
                        <span className="value">{this.state.value === null ? '请选择' : this.state.value}</span>
                    </div>
                </PopupPicker>
            </div>
        );
    }
```

#### 手动控制弹出式选择器的显示和隐藏

通过 React 的 `ref` 属性来获取 PopupPicker 组件的引用，然后调用该引用的 `show` 和 `hide` 方法即可控制弹出式选择器的显示和隐藏。

```javascript
render() {
    return (
        <div className="popuppicker-demo">
            <PopupPicker
                ref={component => {
                    this.popupPickerCom = component;
                }}
                ...
            >
                ...
            </PopupPicker>
        </div>
    );
}

this.popupPickerCom.show(); // 显示弹出式选择器
this.popupPickerCom.hide(); // 隐藏弹出式选择器
```