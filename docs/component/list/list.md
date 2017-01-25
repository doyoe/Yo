#### 基础用法

##### 根节点尺寸

和`Scroller`组件一样，`List`需要一个固定的高度才能正常工作。
你可以通过给它指定`extraClass`来扩展它的样式， 这个额外的class会被添加到List组件的根节点上。例如
```
.yo-list-fullscreen {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
}

<List
    ...
    extraClass = {'yo-list-fullscreen'}
/>
```
这样就可以让这个`List`撑满它的父容器。

##### 数据源

List最基础的属性是`dataSource`数组，通过它可以配置列表的数据源。你还需要配置`renderItem`属性来指定列表项的渲染方式，示例如下:

```
let guid = -1;
...

<List
    dataSource={[
        {content: "元素1", key: ++guid},
        {content: "元素2", key: ++guid},
        {content: "元素3", key: ++guid},
        ...
    ]}
    renderItem={(item,i)=>{
        return (
            <p>
                {`第${i}项的内容是${item.content}`}
            </p>
        );
    }}
/>
```

你也可以不配置`renderItem`属性，这样如果你的`dataSource`中的元素有text属性，会直接以text的值作为列表项的内容。

`dataSource`中每个数据元素需要有一个唯一的`key`标识，这和`React`列表类型的JSX是一致的，
这个标识会被用来优化长列表的性能。关于这个`key`的选取有多种方式，如果列表和某个
后端接口相关联，那么可以使用接口返回数据中数据库id对应的值。如果没有类似的字段，可以使用自增的guid来作为key值，不过这样存在的问题是
即使是同样的一条数据，在`dataSource`发生变化后可能会有不同的`key`，这会造成很大的性能浪费。而如果两个列表项拥有同样的`key`值，会造成组件
渲染错乱。所以请务必谨慎选择`key`值。

#### 优化长列表的性能

List组件提供了优化长列表性能的方式：无穷模式(Infinite)。开启无穷模式以后，列表内只会保留可见区域附近的列表项，然后随着列表的滚动实时更新。这样
就可以避免列表项过多导致的滚动困难和内存溢出问题。但是由于在滚动时会做dom的更新操作，它的滚动性能要比静态的列表稍差。所以对于列表项不多的List，无需开启无穷模式。

配置属性`infinite = true`即可开启无穷模式的列表。如下:

```
<List
    dataSource={/* a very long array... */}
    infinite={true}
    renderItem={...}
/>
```

##### infinite模式列表项的高度

无穷列表的运作机制有两种：指定高度和不指定高度。如果指定了列表项的高度，那么实际上所有的列表项在初始化时即可完成定位，反之只有在列表项渲染进容器后才可以完成定位。

指定高度的无穷列表的滚动性能要稍好于无高度的列表(无高度的列表要多一次列表项的高度查询开销)，因此请尽量使用指定高度的无穷列表。
实际上，大多数场景下列表项的高度都是可以确定的，但是对于类似微博首页列表的场景，只能使用不定高度的无穷列表。

为列表项指定高度有两种方式，通过`itemHeight`属性可以为所有列表项指定一个高度，这样所有的列表项是等高的；也可以给`dataSource`中的数组元素添加一个`height`属性，这样可以给每一个元素分别指定一个高度。例子如下：

为所有列表项配置相同的高度：
```
<List
    dataSource={/* a very long array... */}
    infinite={true}
    itemHeight={44}
    ...
/>
```

给每个列表项配置不同的高度：
```
<List
    dataSource={[
        { text:'item1', height:100 },
        { text:'item2', height:200 },
        ...
    ]}
    infinite={true}
    ...
/>
```

如果既没有配置`itemHeight`，也没有配置数据源中数据元素的`height`属性，
那么会启动不指定高度模式，列表项的高度会随着列表的滚动计算并保存起来，当所有列表项的高度都被计算之后实际上就切换到了指定高度的模式。

另外一个很重要的属性是`infiniteSize`，它决定了列表将把多少个列表项保留在容器内，默认值为`12`。如果这个值设置的过小，可能会出现保留的列表项内容填不满容器的情况，
如果设置的过大，会将一些本来就不可见的节点渲染出来，造成一些无谓的性能损耗。应该根据实际的业务场景设置这个属性，一般来说保留的列表项的高度大于一个半容器的高度就足够了。

在开启无穷模式以后，列表的滚动过程中会有大量的dom更新(尽管我们已经尽力让这个更新操作最小化)，这是一个巨大的负担。实践表明，良好而精简的dom结构能够
显著降低这个开销，因此请尽量优化列表项的dom结构，减少层级和不必要的标签。

#### 列表项的触摸事件

可以通过`onItemTap`属性为每个列表项指定一个tap事件回调，可以接收三个参数`item`(列表项对应的数据元素)，`index`(列表项的index)以及`target`(当前触发tap事件的dom)：

```
<List
    ...
    onItemTap={(item,index,target) => {
        ...
    }}
/>
```

你也可以使用`Touchable`组件为列表项内部的元素绑定tap事件，详见`Touchable`文档。

在设置了`onItemTap`属性的情况下，可以通过设置`itemTouchClass`来指定列表项的触摸反馈效果(通过在touchstart时给列表项添加一个className)，默认值是`item-touch`。
这个属性可以接收两种形式的值：当传入一个字符串时，会给所有的列表项绑定相同的touchClass；传入函数时，可以根据item为不同的列表项定制touchClass。
如果是一个纯展示功能的`List`，你可以设置`itemTouchClass = null`来取消触摸反馈效果。


```
<List
    ...
    onItemTap={...}
    itemTouchClass={'custom-active-class' /* 传入字符串 */}
    itemTouchClass={(item,i) => { return item.activeClassName; } /* 传入函数 */}
/>
```

#### 列表项的性能优化和更新

在开启了无穷列表模式的情况下，在滚动过程中会实时更新容器内部的列表项，这会触发大量的`render`过程，虽然React的虚拟dom diff的开销并不大，
但是对于某些老式手机，如此频繁的触发dom diff依然会有不可忽视的性能开销。

为了最大限度地优化滚动的性能，无穷列表的列表项都默认配置了`shouldComponentUpdate`，它会根据列表项对应的`item.key`是否发生了变化来决定是否触发`render`，
这样可以确保`render`的触发次数达到最小。

有的时候这会导致用户期待的`render`没有发生，这时候可以通过配置`shouldItemUpdate`属性来覆盖掉默认的`shouldComponentUpdate`返回的结果。例如：

```
<List
    ...
    shouldItemUpdate={(ret,nextItem,nowItem) => {
        // return ...; //true or false
    }}
/>
```

这个函数接收三个参数，第一个`ret`代表了默认的`shouldComponentUpdate`返回的原结果(true/false)，第二个参数和第三个参数分别对应着`shouldComponentUpdate`的`nextProps`和`this.props`。
这个函数返回的布尔值会作为shouldComponentUpdate的新结果返回。

在不覆盖默认的`shouldComponentUpdate`的情况下，如果你想修改列表中某一项的数据，
除了设置改变后的属性值之外，你还应该给它设置一个新的`key`，
否则ListItem的`shouldComponentUpdate`的结果仍然为`false`，你期待的dom更新也不会发生。

#### 无穷模式下改变列表项的高度
如上所述, 无穷列表的所有位置信息保存在`List`组件内部的一张哈希表中，这个哈希表的键值正是你传入的列表项的`key`。

因此，如果某一项的高度发生了变化，你需要做的仅仅是给它设置一个新的`key`，这样保存高度的哈希表的旧记录就失效了，
在列表项重新render以后，它的新高度就被用这个新的key值保存到哈希表中。

#### 图片的懒加载

图片的懒加载（`lazyload`）是最常见的性能优化手段（`List`的示例中也应用了懒加载），使用`LazyImage`组件可以很轻易地实现这个功能。
你需要做的是使用`LazyImage`组件取代列表项内部的`<img/>`标签, 并且给这个图片指定一个高度，如下：

```
<List
    ...
    renderItem={(item,i) => {
        return (
            <a className="img-wrap">
                <List.LazyImage
                    src={item.imgUrl}
                    defaultImage={null}
                    style={{
                        width: '100%',
                        height: 200
                    }}
                />
            </a>
        )
    }}
/>
```

更详细的使用方式请参考`LazyImage`组件的说明文档。
