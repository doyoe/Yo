import Calendar from '../src';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CalendarDemo extends Component {
    constructor() {
        super();
        this.state = {
            duration: ['2017-01-01', '2017-4-8']
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
                onChange={str => this.onChange(str)}
            />
        );
    }
}

ReactDOM.render(<CalendarDemo />, document.getElementById('content'));
