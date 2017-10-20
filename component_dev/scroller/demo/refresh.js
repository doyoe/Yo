import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/index';
import Sticky from '../../sticky/index';

function getRandomColors(num) {
    const _color = [];

    const baseColor = Math.floor(Math.random() * 256 * 256 * 256 * 0.5);
    for (let j = 0; j < num; j++) {
        let __color = (baseColor + 1 * j * 256 * 256 + 5 * j * 256 + 5 * j).toString(16);
        while (__color.length < 6) { __color = '0' + __color };
        _color.push('#' + __color);
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
                    usePullRefresh={true}
                    contentInset={{ bottom: 20 }}
                    onRefresh={() => {
                        setTimeout(() => {
                            if (this.refs.scroller) {
                                this.setState({
                                    content: getRandomColors(30)
                                });
                                this.refs.scroller.stopRefreshing(true);
                            }
                        }, 2000);
                    }}
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
                    onScroll={(e) => console.log(e.contentOffset.y)}
                    extraClass={'scroller_wrapper'}
                >
                    {this.state.content.map((item, index) => <div className="item" style={{ backgroundColor: item }} key={index}>{index}</div>)}
                </Scroller>
            </div>
        );
    }
}

ReactDOM.render(<ScrollerDemo />, document.getElementById('content'));
