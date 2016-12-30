export function deepClone(obj) {
    return Object.keys(obj).reduce((ret, key) => {
        const val = obj[key];
        const type = typeof val;

        if (type === 'string'
            || type === 'number'
            || type === 'bool'
            || type === 'undefined') {
            ret[key] = val;
        } else if (type === 'object') {
            if (val === null) {
                ret[key] = val;
            } else {
                ret[key] = deepClone(val);
            }
        }

        return ret;
    }, {});
}

export function replaceRedundantSpaces(str) {
    return str.replace(/\s{2,}/g, ' ').trim();
}

export function getArrayByLength(length) {
    const ret = [];
    for (let i = 0; i < length; i++) {
        ret[i] = null;
    }
    return ret;
}

function is(x, y) {
    let ret;
    if (x === y) {
        ret = x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // return x !== x && y !== y;
        ret = isNaN(x) && isNaN(y);
    }

    return ret;
}

export function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

export function getElementOffsetY(ele, parent) {
    let y = 0;
    while (ele !== parent && ele !== null) {
        y += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return y;
}

export const DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT = 250;
