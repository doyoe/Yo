/**
 * Created by Ellery1 on 16/7/8.
 */
import FastClick from './fastclick';
import injectTapEventPlugin from 'react-tap-event-plugin';

if (!window.___yoTapEventInjected) {
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