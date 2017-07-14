import Calendar from '../src';
import '../src/style.scss';
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
            duration: ['2017-5-10', '2018-04-20'],
            selectionStart: '',
            selectionEnd: ''
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                duration: 100
            });
        }, 5000);
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
