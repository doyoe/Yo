import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/index';
import './demo.scss';

function getRandomColors(num) {
    const _color = [];
    for (let j = 0; j < num; j++) {
        const letters = '3456789ABC'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
        _color.push(color);
    }

    return _color;
}

class ScrollerDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentOffset: {
                x: 0,
                y: 0
            },
            content: getRandomColors(30)
        };
    }

    render() {
        return (
            <div className="container">
                <Scroller simple={true} extraClass="scroller_wrapper">
                    {this.state.content.map((item, index) => <div className="item" style={{ backgroundColor: item }} key={index}>{index}</div>)}
                </Scroller>
                <Scroller simple={true} extraClass="scroller_wrapper" containerExtraClass="scroller_container_horizental" scrollX={true} scrollY={false}>
                    {this.state.content.map((item, index) => <div className="item_vertical" style={{ backgroundColor: item }} key={index}>{index}</div>)}
                </Scroller>
            </div>
        );
    }
}

ReactDOM.render(<ScrollerDemo />, document.getElementById('content'));
