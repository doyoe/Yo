import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rating from '../src';
import './demo.scss';

class RatingDemo extends Component {

    constructor() {
        super();

        this.state = {
            demo1: {
                value: 1
            },
            demo2: {
                value: 4.5
            },
            demo3: {
                value: 5
            }
        };
    }

    render() {
        return (
            <ul className="yo-list">
                <li className="item">
                    <label className="prop-name">基础用法</label>
                    <Rating
                        value={this.state.demo1.value}
                        onChange={value => this.setState({ demo1: { value } })}
                    />
                </li>
                <li className="item">
                    <label className="prop-name">展示评分（不可点击）</label>
                    <Rating
                        value={3.5}
                        readonly={true}
                    />
                </li>
                <li className="item">
                    <label className="prop-name">自定义样式</label>
                    <Rating
                        extraClass="yo-rating-test"
                        value={this.state.demo2.value}
                        onChange={value => this.setState({ demo2: { value } })}
                    />
                </li>
                <li className="item">
                    <label className="prop-name">自定义总数</label>
                    <Rating
                        total={6}
                        value={this.state.demo3.value}
                        onChange={value => this.setState({ demo3: { value } })}
                    />
                </li>
            </ul>
        );
    }
}

ReactDOM.render(<RatingDemo />, document.getElementById('content'));
