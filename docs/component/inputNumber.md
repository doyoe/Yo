#### 基本用法
最简单用法。由于这是一个 `受控的` 组件，所以需要通过 `onChange` 回调来设置当前值。

```javascript
<InputNumber
    value={this.state.value}
    onChange={value => this.setState({value})}
/>
```

#### 小数
通过`decimalNum`属性，配置组件显示数字的小数位数，默认为0，即不支持小数。

```javascript
<InputNumber
    value={this.state.value}
    decimalNum={2}
    onChange={value => this.setState({value})}
/>
```

#### 设置范围

通过`max`和`min`属性设置组件数值的最大值、最小值。

```javascript
<InputNumber
    value={this.state.value}
    onChange={val => this.onChange(value)}
    min={-2}
    max={5}
/>
```

#### 设置步长

通过`step`属性设置组件一次加减操作改变的数值步长。默认是1。

```javascript
<InputNumber
    value={this.state.value}
    onChange={val => this.onChange(val)}
    min={-10}
    max={10}
    step={2}
/>
```

#### 输入框不可用

通过`inputDisable`属性，设置组件的输入框不可用，只能通过加减按钮改变组件数值。

```javascript
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
通过`disable`属性，设置组件不可用。只是简单的数值显示，不能修改数值。

```javascript
<InputNumber
    value={2}
    disable={true}
/>
```