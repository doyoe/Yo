#### 引用方式

```
import { Range } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Range from 'yo3/component/range';
```

#### 双滑块用法

由于组件是受控驱动的，所以你必须自己来控制更新，组件会将应该更新到的状态通过回调参数value传递出来，你需要通过传递state数据给value属性（如value={this.state.value}），并在onChange函数中对state（如state.value)进行更新,即调用this.setState({ value: value })。

```
import Range from 'component';
class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [200, 300]
        };
    }

    render() {
        return (
            <Range
                max={500}
                min={100}
                step={100}
                value={this.state.value}
                onChange={value => this.setState({ value })}
            />
        )
    }
}
```

#### 单滑块用法

```
// this.state = { value: 200 };

<Range
    max={500}
    min={100}
    step={100}
    isSingle={true}
    value={this.state.value}
    onChange={value => this.setState({ value })}
/>
```

#### 扩展用法
自定义标签，支持JSX

```
scaleFormat(value, index) {
    const text = ['￥0', '￥150', '￥300', '￥500', '￥800', '不限'];
    return (
        <div key={`tick${index}`}>
            <span>
                {text[index]}
            </span>
            <i className="yo-ico">{'\uf083'}</i>
        </div>
    );
}

<Range
    ref="range"
    max={750}
    min={0}
    step={150}
    value={this.state.value}
    scaleFormat={this.scaleFormat}
    onChange={value => { this.setState({ value }); }}
/>
```
#### 扩展用法

借助onSliderTouchMove回调参数，可实时获取value值和滑块的translateX

在touchMove滑动过程中，鉴于通过state数据来控制滑块移动的性能极差（事件触发太过频繁），故而选择直接改变Dom属性，如果你想利用touchMove中的回调参数做一些事情，也极力推荐直接操作Dom，下面有示范。

```
<span
    ref="tip"
    style={{ transform: `translateX(${this.state.translateX}px)` }}
>
<Range
    onSliderTouchMove={(val, translateX, evt, sliderIndex) => {
        const $tip = this.refs.tip,
        $tip.innerText = val[sliderIndex];
        $tip.style.transform = `translateX(${translateX[sliderIndex]}px)`;
    }}
    onChange={value => { this.setState({ value }); }}
    {...otherProps}
/>
```

#### 刷新滑块位置

与Popup组件复合时，从display: none到展示时，可通过ref调用resize()来将滑块位置重置到正确的位置上，必须得在Range组件渲染的Dom有实际宽度后调用才能生效。

```
<Popup
    onShow={() => {
        this.refs.range.resize();
    }}
    {...otherProps}
>
    <Range
        ref="range"
        {...otherProps}
    />
</Popup>
```

