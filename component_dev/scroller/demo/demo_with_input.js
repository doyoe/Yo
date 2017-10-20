import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/index';

const list = [];

for (let i = 0; i < 100; i++) {
    list.push(i);
}

class ScrollerDemo extends Component {
    render() {
        return (
            <div className="fullscreen">
                <Scroller
                    extraClass="yo-list-root"
                    momentum={false}
                    bounce={false}
                    usePullRefresh={false}
                    useLoadMore={false}
                >
                    {list.map(item => (
                        <div>
                            {item === 24 && <input />}
                            <p>{item}</p>
                        </div>)
                    )}
                </Scroller>
            </div>
        );
    }
}

ReactDOM.render(<ScrollerDemo />, document.getElementById('content'));
