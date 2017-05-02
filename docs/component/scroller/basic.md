#### 引用方式

```
import { Scroller } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Scroller from 'yo3/component/scroller';
```

#### 基本用法

`Scroller` 默认提供一个纵向滚动区域。该区域必须是有高度的，你可以通过以下几种方式来实现：

- 直接设置 `Scroller` 的高度，例如：`<Scroller style={height: '400px'} />`
- 通过 `flex` 来设置高度，例如：`<div className="yo-flex"><Scroller className="flex" /></div>`
- 通过 `position: absolute` 来设置高度，例如：`<Scroller style={position: 'absolute', left: 0, right: 0, top: 0, bottom: 0} />`

```
<Scroller>
    <h1>这是内容区域</h1>
</Scroller>
```

#### 横向滚动

`Scroller` 可以提供一个横向滚动区域，只需要将 `scrollX` 设置为 `true` 将 `scrollY` 设置为 `false` 即可。

```
<Scroller
    scrollX={true}
    scrollY={false}
>
    <h1>这是内容区域</h1>
</Scroller>
```