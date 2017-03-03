import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/index';
import Sticky from '../../sticky/index';
import Touchable from '../../touchable/src';

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
            content: getRandomColors(5)
        };
    }

    getContent() {
        return getRandomColors(5).map((item, index) => (
            <div
                className="item"
                style={{ backgroundColor: item }}
                key={index}
            >
                {index}
            </div>
        ));
    }

    getGroup(i) {
        const height = Math.random() * 20 + 20;
        return (
            <div key={i} className="demo-group">
                <Sticky>
                    <div style={{ height }} className="demo-sticky">
                        <span>{i}</span>
                        <Touchable
                            touchClass="yellow"
                            onTap={() => {
                                console.log('tap', i);
                            }}
                        >
                            <span style={{ float: 'right' }}>tap!</span>
                        </Touchable>
                    </div>
                </Sticky>
                {this.getContent()}
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <Scroller
                    stickyOffset={44}
                    ref="scroller"
                    extraClass={'scroller_wrapper'}
                >
                    <div style={{ height: 44 }} />
                    {[1, 2, 3, 4, 5].map((_, i) => this.getGroup(i))}
                </Scroller>
            </div>
        );
    }
}

ReactDOM.render(<ScrollerDemo />, document.getElementById('content'));
