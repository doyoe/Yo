#### 引用方式

```
import { Suggest } from '$yo-component';

// 如果你的项目中未使用最新的 ykit-config-yo 插件，可能无法使用上面这个语法糖
// 你仍然可以通过下面这种方式来引用
import Suggest from 'yo3/component/suggest';
```

#### 基础使用

`Suggest`一般是一个占满整个页面的组件，它也可以配合模态框系列组件一起使用。在默认条件下，`Suggest`的根节点会撑满整个父级容器。

`Suggest`的最重要的属性是`results`和`onConditionChange`。使用这两个属性就可以改变结果区域的内容:

```
<Suggest
    onConditionChange={condition => {
        this.setState({ results });
    }}
    results={this.state.results}
/>
```

你应该把`results`属性和你应用的状态关联起来，这样在输入框的内容发生改变的时候会触发`conditionChange`事件，这时你可以根据新的condition字符串(`onConditionChange`的唯一参数)去改变`results`，达到更新结果区域的目的。

##### 定制结果列表项的渲染方式

results默认的渲染方式是`List`，如果`results`属性数组中的每一个元素都有`text`属性, 会直接使用这个属性值作为列表项的内容。或者，就像`List`一样，
你也可以传入`renderItem`属性来指定列表项的渲染方式。它接收的参数和`List`的同名属性一致。以下是一个自定义`renderItem`的例子:

```
<Suggest
    results={[
        {value:'beijing'},
        {value:'shanghai'},
        ...
    ]}
    renderItem={(item,i) => {
        return <p>`第${i}项的value是${item.value}`</p>
    }}
    noDataTmpl={<div>Nothing to show.</div>}
/>
```

通过定义`noDataTmpl`可以定制没有results数据时展示的内容，它可以接收一个JSX，在`results.length`为`0`时会使用这个JSX渲染结果区域。

##### 自定义结果区域的渲染方式

如果你不希望以默认的`List`形式渲染结果区域，可以通过定义`renderResult`属性来实现，你需要传入一个函数，这个函数可以接收到一个参数`results`，
并用它返回的JSX/DOMElement来完全取代原来的`List`:

```
<Suggest
    results={...}
    renderResult={results => {
        return (
            <CustomResult>
                {results.map(result => {
                    return (
                        <ResultItem result={result} key={result.key}/>
                    );
                })}
            </CustomResult>
        );
    }}
/>
```

#### 推荐区域

在输入框没有输入文字时，结果区域会被隐藏，取而代之的是推荐区域。换句话说，用户在打开`Suggest`时首先看到的是输入框以及推荐区域。

使用`recommendTmpl`可以指定推荐区域的渲染方式，它接收一个JSX。

有些时候，你可能在聚焦到input时希望使用一个蒙层盖住下面的推荐区域，这样用户可以很方便的通过点击推荐区域来关闭键盘。使用`showMask`属性可以控制
蒙层是否在聚焦时展示蒙层。参见下面的例子:

```
<Suggest
    ...
    recommentTmpl={<CityGrouplist ... />}
    showMask={true}
    ...
/>
```

#### 使用输入框图标

一般来说，`Suggest`的输入框的最右侧都会根据当前的输入状态展示一个图标(例如输入框中有文字时会展示一个叉子用来快速清除输入)。`Suggest`组件提供了
四种icon:`delete`，`loading`，`refresh`和`stop`。通过定义`inputIcon`属性，可以指定当前展示在输入框中的是哪一个图标，如果传入`null`，就不会
显示图标。

`delete`图标的点击行为是确定的，即清空当前输入框的内容。对于其他三种图标，你可以指定`onIconTap`属性来定义点击它们的回调:

```
<Suggest
    ...
    inputIcon={this.state.icon}
    onIconTap={icon => {
        switch (icon) {
            case 'refresh':
                // do something...
            case 'stop':
                ...
        }
    }}
/>
```

`onIconTap`可以接收一个参数`icon`，它会是上面四种图标的名称的字符串，这样你可以为不同的图标指定不同的点击回调。

#### 输入事件的性能优化

每次input中value的改变都会触发`onConditionChange`，在用户输入较快时，可能会频繁导致dom更新，以及向服务器发送大量的请求，这对于App的性能十分不利。
为此我们提供了优化性能的手段——事件截流。

配置`throttleGap`属性即可开启事件截流(默认是开启的，值为`300`)。这个属性值表示间隔多少毫秒触发一次onConditionChange，这样可以有效地减少无用的输入导致的onChange。

```
<Suggest
    ...
    throttleGap={500}
/>
```
这样可以让`onConditionChange`每`500`毫秒触发一次。

#### 一个完整的城市选择器示例

以下的代码就是第一个Demo的源码，里面利用了`Grouplist`和`Suggest`实现了一个完整的城市选择器。在这份代码里包含了上面所有介绍的属性的使用。

```
class CitySelectDemo extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            showLoadingIcon: false,
            showCancelButton: false
        };
    }

    filterCity(condition) {
        return condition ? groupListDataSource
            .filter(city=>city.groupKey !== '热门')
            .filter(city=>city.py.search(condition) !== -1 || city.text.search(condition) !== -1) : [];
    }

    render() {
        //实现一个如此复杂的组件只用了不到30行代码
        //使用React,可以很容易地像搭积木一样用小组件搭建出大组件,而不是不停地重复造轮子
        //善用组件化,开发效率可以成倍的提升
        return (
            <Page title="城市选择示例" onLeftPress={() => location.href = '../index.html'}>
                <Suggest
                    showMask={true}
                    ref="suggest"
                    noDataTmpl={(
                        <div style={{ padding: '1em' }}>
                            {!this.state.loading ? 'No Result' : 'Loading...'}
                        </div>
                    )}
                    showCancelButton={this.state.showCancelButton}
                    onCancelButtonTap={()=> {
                        this.refs.suggest.clearInput();
                    }}
                    onFocus={()=> {
                        this.setState({ showCancelButton: true });
                    }}
                    onBlur={()=> {
                        this.setState({ showCancelButton: false });
                    }}
                    recommendTmpl={(
                        <Grouplist
                            infinite={true}
                            itemHeight={44}
                            infiniteSize={25}
                            dataSource={groupListDataSource}
                            sort={(a, b)=> {
                                if (a === '热门') {
                                    return -1;
                                }
                                else if (b === '热门') {
                                    return 1;
                                }
                                return a.charCodeAt(0) - b.charCodeAt(0);
                            }}
                            showIndexNavBar={true}
                            onIndexNavBarItemHover={(groupKey) => Toast.show(groupKey, 1000)}
                            onItemTap={item => Toast.show('选择:' + item.text, 1000)}
                        />
                    )}
                    inputIcon={this.state.loading ? 'loading' : 'delete'}
                    results={this.state.results}
                    onConditionChange={value=> {
                        this.setState({ loading: true });
                        setTimeout(()=> {
                            this.setState({ loading: false, results: this.filterCity(value) });
                        }, 300);
                    }}
                    onItemTap={item => Toast.show('选择:' + item.text, 1000)}
                    placeholder="输入城市名称或拼音"
                    throttleGap={500}
                />
            </Page>
        );
    }
}
```

