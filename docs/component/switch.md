#### 引用方式

```
import { Switch } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Switch from 'yo3/component/switch';
```

#### 基本用法
展示一个开关组件，`switch1` 为当前选中的状态。由于这是一个受控的组件，所以需要通过`onChange`回调来设置当前值。
```
<Switch
    checked={this.state.switch1}
    onChange={(value) => { this.getValue('switch1', value); }}
/>
```

#### 禁用组件
展示一个处于不可操作状态的`switch`组件 `checked`表示当前的组件的状态。

```
<Switch disabled checked={false} />
<Switch disabled />
```

#### 自定义样式扩展
自定义扩展样式需要在sass中配合使用[yo-switch](/yo/_docs/element.html#yo-switch) 扩展。

```css
/**
 * yo-switch 扩展
 * @param  {[type]} name   扩展名
 * @param  {[type]} on-bgcolor 定义switch激活背景色
 * @return {[type]} bgcolor     定义switch背景色
 * @return {[type]} follow-bgcolor   定义switch跟随背景色
 * @return {[type]} thumb-color     定义switch滑块色
 */
@include yo-switch(blue,#43cee6);
```
并将扩展后的类名通过`extraClass`传给`switch`组件。如果更改了active状态时的颜色，需要通过`activeColor`传给组件。

```
<Switch
  checked={this.state.switch3}
  onChange={(value) => { this.getValue('switch3', value); }}
  activeColor="#43cee6"
  extraClass="yo-switch-blue"
/>
```
