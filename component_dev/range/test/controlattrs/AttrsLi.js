import React, { Component } from 'react';
import './AttrsLi.scss';
import '../../../component_dev/common/touchEventSimulator';
export default class AttrsLi extends Component {
    constructor(props) {
        super(props);
        const { controlledAttrsData, defaultValue, attr } = props;
        controlledAttrsData[attr] = this.format(String(defaultValue));
    }

    componentDidUpdate() {
        const { curValue } = this.props;
        if (!this.inputNode) {
            return;
        }
        if (this.inputNode.value && this.inputNode.value !== curValue) {
            this.inputNode.value = this.prefixInputValue(curValue);
        }
    }

    format(value) {
        let newValue = value;
        const regxSplit = /[:,/_]/;

        if (value.indexOf('[') !== -1) {
            newValue = value.replace(/[\[\]"']/g, '').split(regxSplit).map(str => this.strToTrueType(str.trim()));
        } else if (value === 'undefined') {
            newValue = undefined;
        } else {
            newValue = this.strToTrueType(value);
        }
        return newValue;
    }

    strFormated(curStr) {
        const regxNum = /^(-?\d+)(\.\d+)?(e-?\+?\d+)?$/;
        return curStr.split(',')
            .map(str => str.trim())
            .map(str => regxNum.test(str) ? parseFloat(str)
                : (str === 'false' || str === 'true') ? str
                : `'${str}'`)
            .join(', ');
    }

    prefixInputValue(str) {
        return !Array.isArray(str) ? str : `[ ${this.strFormated(String(str))} ]`;
    }

    strToTrueType(str) {
        const regxNum = /^(-?\d+)(\.\d+)?(e-?\+?\d+)?$/;
        if (str === 'false') {
            return false;
        } else if (str === 'true') {
            return true;
        }
        return regxNum.test(str) ? parseFloat(str) : str;
    }

    switchable(value) {
        const switchStateMap = {
            true: 'false',
            false: 'true',
            up: 'down',
            down: 'up',
            top: 'bottom',
            bottom: 'top',
            date: 'time',
            time: 'date'
        };
        return switchStateMap[value];
    }

    render() {
        const props = this.props,
            { defaultValue, curValue, attr, controlledAttrsData, onChange, id, text, callPopUp } = props,
            switchState = this.switchable(defaultValue);
        return (switchState === undefined
            ? (<li className="item" key={id}>
                <div className="flex-basis">{text}</div>
                <div className="flex-end">
                    <input
                        className={"input inputtext"}
                        defaultValue={defaultValue}
                        ref={node => {
                            this.inputNode = node;
                        }}
                        onKeyDown={evt => {
                            const state = {};
                            if (evt.keyCode === 13) {
                                state[attr] = this.format(this.inputNode.value);
                                onChange(state);
                            }
                        }}
                        onKeyUp={() => {
                            controlledAttrsData[attr] = this.format(this.inputNode.value);
                        }}
                    />
                </div>
            </li>)
            : (<li
                className="item"
                key={id}
                onTouchTap={() => {
                    callPopUp(attr, curValue, this.switchable(curValue));
                }}
            >
                <div className="flex-basis">{text}</div>
                <div className="flex-end">
                    <span className="tip">{String(curValue)}</span>
                    <i className="yo-ico more">{'\uf07f'}</i>
                </div>
            </li>)
        );
    }
}
