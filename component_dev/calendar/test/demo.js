import Calendar from '../src';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const renderDate = (item, ret) => {
    const { day } = item;
    return day === 1 ? (
        <span>First</span>
    ) : ret;
};

class CalendarDemo extends Component {
    constructor() {
        super();
        this.state = {
            duration: ['2017-03-01', '2018-05-01']
        };
    }

    onChange(obj) {
        const { selectionStart, selectionEnd } = obj;
        this.setState({
            selectionStart,
            selectionEnd
        });
    }

    render() {
        return (
            <Calendar
                extraClass="demo"
                duration={this.state.duration}
                selectionStart={this.state.selectionStart}
                selectionEnd={this.state.selectionEnd}
                allowSingle={false}
                renderDate={renderDate}
                onChange={str => this.onChange(str)}
            />
        );
    }
}

ReactDOM.render(<CalendarDemo />, document.getElementById('content'));
