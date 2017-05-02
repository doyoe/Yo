#### 引用方式

由于 `LazyImage` 是配合 `List` 或 `Scroller` 使用的，所以只需要按需引用 `List` 或 `Scroller` 即可。

```
import { List, Scroller } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import List from 'yo3/component/list';
import Scroller from 'yo3/component/scroller';
```

#### 在 List 中使用

在 `List` 中使用 `LazyImage` 只需要将 `<image>` 标签替换成 `<List.LazyImage>` 即可。需要注意的是，
为了提高 `List` 组件的性能，使用的时候，需要给图片设置高度，可以通过 `height` 属性或 `style` 属性来设置。

```
<List
    dataSource={[
        {text: '0', key: 0},
        {text: '1', key: 1},
        ...
        {text: '99', key: 99}, 
    ]}
    renderItem={item => {
        return (
            <div>
                <List.LazyImage height="50" src="http://source.qunarzz.com/common/hf/logo.png"/>
            </div>
        )};
    }
    itemHeight={50}
/>
```

#### 在 Scroller 中使用

在 `Scroller` 中使用 `LazyImage` 与在 `List` 中使用类似，只需要将 `<image>` 标签替换成 `<Scroller.LazyImage>` 即可。
虽然 `Scroller` 中并没有强制需要设置图片的高度，但是为了性能，还是推荐给图片指定高度。

```
<Scroller>
    <Scroller.LazyImage height="50" src="http://s.qunarzz.com/a/0.png"/>
    <Scroller.LazyImage height="50" src="http://s.qunarzz.com/a/1.png"/>
    /* ... */
    <Scroller.LazyImage height="50" src="http://s.qunarzz.com/a/99.png"/>
</Scroller>
```