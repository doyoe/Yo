/**
 * Created by chenjiao on 2017/3/21.
 */
import { getArrayByLength } from './util';

export function extractProp(hostNode, prop) {
    const propReg = new RegExp(`${prop}=\"([^"]+)\"`);
    const matches = hostNode.html().match(propReg);
    return matches ? matches[1] : null;
}

export function getStyle(hostNode, propName) {
    const styleStr = extractProp(hostNode, 'style');
    const propReg = new RegExp(`${propName}:([^;]+);`);
    const matches = styleStr.match(propReg);
    return matches ? matches[1].trim() : null;
}

export function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomOptions(size = 10) {
    return getArrayByLength(size).fill(1).map((item, i) => ({ value: i }));
}