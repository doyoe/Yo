#### 引用方式

```
import { Picker } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Picker from 'yo3/component/picker';
```

#### 基础使用

`Picker`使用方式与网页里的`<select>`十分相似。 你需要给它指定三个属性: `options`(带选项的数据源, 数组形式)，`value`(当前选中的option的值)
以及`onChange`(选中option发生改变时触发的事件回调)。

需要注意的是这是一个严格受控的组件，你必须同时配置`value`和`onChange`才能保证它正常工作。示例如下:

```
<Picker
    options={[
        { value: 'option1', text:'选项1' },
        { value: 'option2', text:'选项2' },
        ...
    ]}
    value={this.state.value}
    onChange={option => {
        this.setState({ value:option.value });
    }}
    // 自定义高度
    height={200}
/>
```

`options`是一个数组，里面的数据元素必须是对象，每个对象必须有`value`属性，这表示这个`option`的真实值。
也可以给它设置`text`属性，这表示显示在组件中的`option`的文本。如果不设置`text`，会使用`value`作为`option`的文本。

另外需要注意的是`Picker`组件需要指定一个高度值才能正常工作，它有一个默认高度`150`，你可以通过设置`height`属性来改变它的高度。

##### 循环模式

开启循环模式后(设置`looped`属性为true)，`Picker`的option将会变成一个首尾相接的循环列表(参考iOS系统的闹钟设置):

```
<Picker
    ...
    looped = {true}
/>
```

一般的建议是option的数量比较多时开启循环模式，这样可以降低用户选择的操作成本。

##### 设置单位

使用`unit`属性可以在`Picker`的右侧展示一个单位栏，`unit`的值作为单位栏的内容:

```
<Picker
    ...
    unit="单位"
/>
```

#### 使用场景

一般来说，`Picker`需要和一个模态框系列组件结合使用，而不是直接放置在页面上。因为`Picker`的触摸事件和`Scroller`并不相容。
下面是一个结合了`Popup`组件使用的弹出式的`Picker`。

** 如果没有特殊的定制化要求，你应该优先选择使用 `PopupPicker` 和 `PopupDateTimePicker`，这两个组件封装了弹层的逻辑，更加易于使用。 **

```
<Popup
    show={this.state.open}
    onMaskTap={()=> {
        this.setState({open: false});
    }}
>
    <Picker
        height={200}
        options={this.state.options}
        onChange={(opt)=> {
            this.setState({value: opt.value});
        }}
        value={this.state.value}
    />
</Popup>
```

如果需要把`Picker`直接放置在页面上，可以设置`stopPropagation`属性为`true`来阻止`Picker`的touch事件冒泡到`Scroller`上。
这样在滑动`Picker`时它外层的`Scroller`并不会跟着滑动:

```
<Picker
    ...
    stopPropagation={true}
/>
```

