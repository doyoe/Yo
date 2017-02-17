import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PopupDateTimePicker from '../src/index';

class PopupDateTimePickerDemo extends Component {
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
                <span className="title">选择日期</span>
                <span className="value">{value === null ? '请选择日期' : value}</span>
            </div>
        );
    }

    render() {
        return (
            <div className="popupdatetimepicker-demo">
                <PopupDateTimePicker
                    fieldExtraClass="field"
                    popupExtraClass="popup"
                    popupHeader={{
                        title: '欢迎使用Yo',
                        cancelBtn: { text: (<i className="regret yo-ico">&#xf077;</i>), touchClass: 'op0_6' },
                        okBtn: { text: 'OK', touchClass: 'op0_6' }
                    }}
                    touchClass={'op0_6'}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    duration={200}
                    pickerHeight={150}
                    loop={[false, true, true]}
                    unit={null}
                >
                    {this.renderField(this.state.value)}
                </PopupDateTimePicker>
            </div>
        );
    }
}

ReactDom.render(<PopupDateTimePickerDemo />, document.getElementById('content'));
