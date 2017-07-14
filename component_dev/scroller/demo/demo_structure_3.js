import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/index';

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

    componentDidMount() {
        const _height = this.refs.container.offsetHeight,
            _width = this.refs.container.offsetWidth;

        this.refs.scroller1.refresh({ wrapperWidth: _width, wrapperHeight: _height / 2 }, true);
        this.refs.scroller2.refresh({ wrapperWidth: _width, wrapperHeight: _height / 2 }, true);
    }

    render() {
        return (
            <div className="container" ref="container">
                <div className="scroller_wrapper">
                    <Scroller
                        ref="scroller1"
                        wrapper={{ clientWidth: 0, clientHeight: 0 }}
                    >
                        <ul className="scroller_container">
                            {this.state.content.map((item, index) => <li className="item" style={{ backgroundColor: item }} key={index}>{index}</li>)}
                        </ul>
                    </Scroller>
                </div>
                <div className="scroller_wrapper">
                    <Scroller
                        ref="scroller2"
                        scrollX={true}
                        scrollY={false}
                        wrapper={{ clientWidth: 0, clientHeight: 0 }}
                    >
                        <ul className="scroller_container_horizental">
                            {this.state.content.map((item, index) => <li className="item_vertical" style={{ backgroundColor: item }} key={index}>{index}</li>)}
                        </ul>
                    </Scroller>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<ScrollerDemo />, document.getElementById('content'));
