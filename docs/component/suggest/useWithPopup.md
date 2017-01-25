#### 将Suggest和弹层结合使用

`Suggest`最常见的使用方式有两种: 完全使用一个新的页面展示; 或者打开一个模态框来展示。
对于后者来说，你需要做的仅仅是把`Suggest`放入一个模态框系列组件中。

在使用模态层展示时，你可能需要在输入框的右侧显示一个"取消"按钮用来关闭它，设置`showCancelButton`属性为`true`就可以展示这个取消按钮，然后
通过`onCanelButtonTap`来定义它的行为。

下面是一个完整的例子:

```
class UseWithPopupDemo extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            results: [],
            defaultCondition: ''
        };
    }

    render() {
        return (
            <Page title="带弹层的Suggest" onLeftPress={()=>location.href = "../index.html"}>
                <div className="container">
                    <button
                        className="yo-btn open-modal"
                        onTouchTap={()=> {
                            this.setState({ show: true });
                        }}
                    >
                        与Popup一起使用,点我打开
                    </button>
                    <Popup
                        onMaskClick={()=> {
                            this.setState({ show: false })
                        }}
                        show={this.state.show}
                        height="100%"
                    >
                        <Suggest
                            ref="suggest"
                            showMask={false}
                            showCancelButton={true}
                            onCancelButtonTap={()=> {
                                this.refs.suggest.clearInput();
                                this.setState({ show: false });
                            }}
                            onConditionChange={value=> {
                                this.setState({ results: value ? getRandomDataSource(10) : [] });
                            }}
                            onItemTap={item=>Toast.show('tapping:' + item.text)}
                            defaultCondition={this.state.defaultCondition}
                            results={this.state.results}
                            recommendTmpl={<p style={{ padding: '1em' }}>设置showCancelButton为true可以展示取消按钮</p>}
                            noDataTmpl={<div style={{ padding: '1em' }}>No Results</div>}
                        />
                    </Popup>
                </div>
            </Page>
        );
    }
}
```