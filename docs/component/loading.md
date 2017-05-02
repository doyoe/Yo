#### 引用方式

```
import { Loading } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Loading from 'yo3/component/loading';
```

注意：
- `import { loading } from 'yo3/component/loading'` 的方式引入的是 API 形式的 loading 组件；
- `import Loading from 'yo3/component/loading'` 引入的是标签形式的 React 组件。


#### 基本用法

Loading 组件会在当前位置渲染出一个加载中的组件。**如果要使用带弹层的 Loading 组件，请直接使用 [Loading(API)](./component-Loading（API）.html)。**

```jsx
<Loading />
```

#### 设置文本内容

```jsx
<Loading text="加载中，请稍等" />
```

#### 自定义样式

```
@include yo-loading(
    $name: smallblue,
    $ico-size: .2rem,
    $font-size: .12rem,
    $ico-color: #00afc7,
    $color: #00afc7
);
```

```jsx
<Loading text="我是一个小号的" extraClass="yo-loading-smallblue" />
```