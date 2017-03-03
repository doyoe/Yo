/**
 * Created by Ellery1 on 16/7/8.
 */
import FastClick from './fastclick';
import injectTapEventPlugin from 'react-tap-event-plugin';

if (!window.___yoTapEventInjected) {
    // 不要觉得这里没用
    // 因为yo-router也用了tap-event-plugin，如果不加try catch会报引用两次tap-event-plugin的警告
    try {
        injectTapEventPlugin();
    } catch (e) {

    }

    if (document.readyState === 'complete'
        || document.readyState === 'interactive') {
        FastClick.attach(document.body);
    }

    document.addEventListener('DOMContentLoaded', () => {
        FastClick.attach(document.body);
    });
    document.body.addEventListener('touchmove', (evt) => {
        evt.preventDefault();
    });
    window.___yoTapEventInjected = true;
}