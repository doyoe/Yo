import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PopupPicker from '../src/index';
import Toast from '../../toast/src/';

const options = [
    [
        { value: 'javascript' },
        { value: 'java' },
        { value: 'c++' },
        { value: 'haskell' },
        { value: 'scheme' }
    ],
    [
        { value: 'functional' },
        { value: 'imperative' }
    ]
];

class PopupPickerDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: null
        };
    }

    handleChange(value) {
        // 你接收到的value将会是一个数组，包含了每一列picker的值
        console.log('onChange', value);
        this.setState({ value });
    }

    componentDidMount() {
        console.log(this.popupPickerComponent);
        this.popupPickerComponent.show();
    }

    renderField(value) {
        return (
            <div className="demo-item">
                <span className="title">选择序号</span>
                <span className="value">{value === null ? '请选择' : value.join(' ')}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="popuppicker-demo">
                <PopupPicker
                    ref={component => {
                        this.popupPickerComponent = component;
                    }}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    onSelect={(value) => console.log(value)}
                    beforePopupShow={() => {
                        Toast.show('before popup show');
                        // return false;
                    }}
                    duration={200}
                    options={options}
                    pickerHeight={150}
                    looped={[true, false]}
                    unit={['language', 'paradigm']}
                >
                    {this.renderField(this.state.value)}
                </PopupPicker>
            </div>
        );
    }


}

ReactDom.render(<PopupPickerDemo />, document.getElementById('content'));
