#### 引用方式

```
import { Rating } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Rating from 'yo3/component/rating';
```

#### 基本用法

展示一个给用户评分的组件，`value` 属性为当前的评分。由于这是一个 `受控的` 组件，所以需要通过 `onChange` 回调来设置当前值。

```
<Rating
    value={this.state.value}
    onChange={value => this.setState({value: value})}
/>
```

#### 展示评分

展示一个显示评分的组件，`value` 属性为需要展示的评分。将 `readonly` 属性设置为 `true` 即可。

```
<Rating
    value={3.5}
    readonly={true}
/>
```

#### 自定义样式

评分组件的样式可以通过 `extraClass` 来扩展。例如：可以将星星图标换成其他图标。

```SCSS
/**
 * yo-rating扩展
 */
@include yo-rating(
    $name: test,
    $url: "star2.png"
);
```

```
<Rating
    extraClass="yo-rating-test"
    value={this.state.value}
    onChange={value => this.setState({value: value})}
/>
```