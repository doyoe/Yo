import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PopupPicker from '../src/index';

const options = [
    { text: '零', value: 0 },
    { text: '一', value: 1 },
    { text: '二', value: 2 },
    { text: '三', value: 3 },
    { text: '四', value: 4 },
    { text: '五', value: 5 },
    { text: '六', value: 6 },
    { text: '七', value: 7 },
    { text: '八', value: 8 },
    { text: '九', value: 9 }
];

class PopupPickerDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: null
        };
    }

    handleChange(value) {
        this.setState({ value });
    }

    renderField(value) {
        return (
            <div className="demo-item">
                <span className="title">选择序号</span>
                <span className="value">{value === null ? '请选择' : value}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="popuppicker-demo">
                <PopupPicker
                    fieldExtraClass="field"
                    popupExtraClass="popup"
                    renderField={this.renderField.bind(this)}
                    popupHeader={{
                        title: '欢迎使用Yo',
                        cancelBtn: { text: (<i className="regret yo-ico">&#xf077;</i>), touchClass: 'op0_6' },
                        okBtn: { text: 'OK', touchClass: 'op0_6' }
                    }}
                    touchClass={'op0_6'}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    duration={200}
                    options={options}
                    pickerHeight={150}
                    looped={true}
                    unit={null}
                />
            </div>
        );
    }
}

ReactDom.render(<PopupPickerDemo />, document.getElementById('content'));
