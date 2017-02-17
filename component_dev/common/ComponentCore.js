/**
 * 大型组件使用的抽象Model类，用于集中管理组件内部的逻辑和状态。
 */
import EventEmitter from './EventEmitter';

export default class ComponentCore extends EventEmitter {

    static instanceId = -1;

    constructor(namespace) {
        super();
        this.instanceId = ++ComponentCore.instanceId;
        this.namespace = namespace;
    }

    _getEventName(eventName) {
        return `yo/component/${this.namespace}/${eventName}/${this.instanceId}`;
    }

    emitEvent(eventName, ...args) {
        this.emit(this._getEventName(eventName), ...args);
        return this;
    }

    registerEventHandler(eventName, handler) {
        this.on(this._getEventName(eventName), handler.bind(this));
        return this;
    }

    getAttr(item, attrKey) {
        return typeof item.get === 'function' ? item.get(attrKey) : item[attrKey];
    }

    setAttr(item, attrKey, value) {
        let ret = null;
        if (typeof item.set === 'function') {
            ret = item.set(attrKey, value);
        } else {
            ret = Object.assign({}, item, { [attrKey]: value });
        }
        return ret;
    }
}