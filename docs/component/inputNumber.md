#### 引用方式

```
import { InputNumber } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import InputNumber from 'yo3/component/inputnumber';
```

#### 基本用法

和原生的表单组件（例如`input`和`select`）一样，
你需要同时配置 `value`和`onChange`来驱动组件的更新：

```
<InputNumber
    value={this.state.value}
    onChange={value => this.setState({value})}
/>
```

#### 小数

通过`decimalNum`属性，配置组件显示数字的小数位数，默认为`0`。

```
<InputNumber
    value={this.state.value}
    decimalNum={2}
    onChange={value => this.setState({value})}
/>
```

#### 设置范围

通过`max`和`min`属性设置组件数值的最大值、最小值。

```
<InputNumber
    value={this.state.value}
    onChange={val => this.onChange(value)}
    min={-2}
    max={5}
/>
```

#### 设置步长

通过`step`属性设置组件一次加减操作改变的数值步长。默认是1。

```
<InputNumber
    value={this.state.value}
    onChange={val => this.onChange(val)}
    min={-10}
    max={10}
    step={2}
/>
```

#### 输入框不可用

设置`inputDisable`属性为`true`可以让组件的输入框不可用，这时只能通过加减按钮改变组件数值。

```
<InputNumber
    value={this.state.value}
    onChange={val => this.onChange(val)}
    min={-10}
    max={10}
    decimalNum={2}
    step={0.5}
    inputDisable={true}
/>
```

#### 不可用

设置`disable`属性为`true`后，整个组件都会处于不可用状态。此时组件只能展示数值而不能修改。

```
<InputNumber
    value={2}
    disable={true}
/>
```