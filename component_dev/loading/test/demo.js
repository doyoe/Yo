/**
 * Created by zongze.li on 16/8/8.
 */
import React, { Component } from 'react';
import Loading, { loading } from '../src';

class LoadingDemo extends Component {

    render() {
        const { text, extraClass } = this.props;

        return (
            <Loading
                text={text}
                extraClass={extraClass}
            />
        );
    }
}
console.log(<LoadingDemo />);

const text = '加载中...',
    extraClass = 'yo-loading-b';

loading.show({ text, extraClass });
// loading.hide();
setTimeout(() => {
    loading.hide();
}, 500);

setTimeout(() => {
    loading.show();
}, 1000);
setTimeout(() => {
    loading.hide();
}, 2000);

setTimeout(() => {
    loading.show({ text: 'loading...' });
}, 3000);
