/**
 * Created by Ellery1 on 16/7/4.
 */
import Suggest from '../src';
import Popup from '../../popup/src';
import React from 'react';
import ReactDom from 'react-dom';

let guid = -1;

function randomizeArray() {
    const ret = [];
    for (let i = 0; i < 1000; i++) {
        ret[i] = Math.random() * 100;
    }
    return ret;
}

class SuggestDemo extends React.Component {

    constructor() {
        super();
        this.state = { show: false, results: [] };
    }

    filter(value) {
        if (value) {
            this.setState({ results: randomizeArray().map(num => ({ text: num, key: ++guid })) });
        } else {
            this.setState({ results: [] });
        }
    }

    render() {
        return (
            <div className="suggest-demo">
                <Popup
                    maskExtraClass="test-mask"
                    show={this.state.show}
                    height={window.screen.height}
                    onShow={() => {
                        this.suggest.input.focus();
                    }}
                >
                    <Suggest
                        onItemTap={(result) => {
                            console.log(result);
                        }}
                        ref={suggest => {
                            this.suggest = suggest;
                        }}
                        inputIcon={'refresh'}
                        showCancelButton={true}
                        onIconTap={(name, value) => {
                            console.log(name, value);
                        }}
                        onCancelButtonTap={() => {
                            this.setState({ show: false });
                        }}
                        onFocus={(value) => console.log(value)}
                        noDataTmpl={<div style={{ padding: '0.11rem 0.1rem 0.12rem' }}>None!</div>}
                        onConditionChange={(value, oldValue) => this.filter(value, oldValue)}
                        results={this.state.results}
                        extraClass="test"
                        itemTouchClass="item-light"
                        placeholder="搜索"
                        defaultCondition="hahah"
                        infinite={true}
                        infiniteSize={15}
                    />
                </Popup>
                <button
                    onClick={() => {
                        this.setState({ show: true });
                    }}
                >
                    打开
                </button>
            </div>
        );
    }
}

ReactDom.render(
    <SuggestDemo />,
    document.getElementById('content')
);

