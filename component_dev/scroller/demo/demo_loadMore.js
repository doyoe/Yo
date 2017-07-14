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
            content: getRandomColors(30)
        };
    }

    render() {
        return (
            <div className="container">
                <Scroller
                    ref="scroller"
                    useLoadMore={true}
                    onLoad={() => {
                        setTimeout(() => {
                            if (this.refs.scroller) {
                                this.setState({
                                    content: this.state.content.concat(getRandomColors(30))
                                });
                                this.refs.scroller.stopLoading(true);
                            }
                        }, 2000);
                    }}
                    extraClass={'scroller_wrapper'}
                >
                    {this.state.content.map((item, index) => <div className="item" style={{ backgroundColor: item }} key={index}>{index}</div>)}
                </Scroller>
            </div>
        );
    }
}

ReactDOM.render(<ScrollerDemo />, document.getElementById('content'));
