import React, { Component } from 'react';
import ReactDom from 'react-dom';
import '../../../../component_dev/common/touchEventSimulator';
import Page from '../../common/page';
import Range from '../../../../component_dev/range/src';
import AttrsLi from '../../common/AttrsLi';
import Switch from '../../../../component_dev/switch/src';
import InputNumber from '../../../../component_dev/inputnumber/src';
import '../main.scss';
import Picker from '../../../../component_dev/picker/src';
import Popup from '../../../../component_dev/popup/src';

class RangeDemo extends Component {
    constructor(props) {
        super(props);
        const { value, min, max, isSingle, step, scaleFormat, scalePosition, disable, round } = props;
        this.value = value;
        this.stateProps = {
            value,
            min,
            max,
            step,
            isSingle: isSingle || false,
            showScale: true,
            scalePosition: scalePosition || 'top',
            disable: disable || false
        };
        this.attrsLiData = this.getTransformData(this.stateProps);
        this.controlledAttrsData = {};
        this.state = {
            ...this.stateProps,
            round,
            pickerValue: 0,
            valueShow: false,
            pickerOption: [{
                text: 'false',
                value: 0
            }, {
                text: 'true',
                value: 1
            }],
            scaleFormat,
            isSingle: false,
            attrsLiData: this.attrsLiData,
            scaleChecked: false,
            arriveround: this.stateProps.round || 1 / 4
        };
    }

    componentDidUpdate() {
        Object.keys(this.controlledAttrsData).forEach(key => {
            this.controlledAttrsData[key] = this.state[key];
        });
    }

    onChange(state) {
        console.log('--- onChange', state);
        this.setState(state);
    }

    popUp(attr, value, nextValue) {
        this.curAttr = attr;
        const newPickerData = {
            pickerValue: 0,
            pickerOption: [{
                text: String(value),
                value: 0
            }, {
                text: String(nextValue),
                value: 1
            }]
        };
        this.setState({
            ...newPickerData,
            valueShow: true
        });
    }

    getTransformData(modeData) {
        return Object.entries(modeData).map(cur => ({
            text: cur[0],
            attr: cur[0],
            defaultValue: this.prefixInputValue(cur[1])
        }));
    }

    prefixInputValue(str) {
        return !Array.isArray(str) ? str : `[ ${this.strFormated(String(str))} ]`;
    }

    strFormated(originStr) {
        const regxNum = /^(-?\d+)(\.\d+)?$/;
        return originStr.split(',')
            .map(str => str.trim())
            .map(str => (regxNum.test(str) || str === 'false' || str === 'true') ? str : `'${str}'`)
            .join(', ');
    }

    render() {
        return (
            <div className="controlatrrs">
                <Range
                    ref="rangeSlider"
                    max={this.state.max}
                    min={this.state.min}
                    value={this.state.value}
                    step={this.state.step}
                    scaleFormat={this.state.scaleFormat}
                    disable={this.state.disable}
                    onChange={value => this.onChange({ value })}
                    decimalNum={this.state.decimalNum}
                    round={this.state.round}
                    isSingle={this.state.isSingle}
                    showScale={this.state.showScale}
                    scalePosition={this.state.scalePosition}
                    extraClass={this.state.extraClass}
                />
                <div className="h3">
                    <h3>受控属性</h3>
                    <button
                        className="yo-btn yo-btn-pri set-multi"
                        onTouchTap={() => {
                            const state = {};
                            Object.keys(this.controlledAttrsData).forEach(key => {
                                state[key] = this.controlledAttrsData[key];
                            });
                            this.onChange(state);
                        }}
                    >
                        {"setState"}
                    </button>
                </div>
                <ul
                    className="yo-list"
                    ref={node => { this.attrsUl = node; }}
                >
                    {this.state.attrsLiData.map((attrs, index) =>
                        <AttrsLi
                            key={`li${index + 1}`}
                            id={`li${index + 1}`}
                            controlledAttrsData={this.controlledAttrsData}
                            curValue={this.state[attrs.attr]}
                            {...attrs}
                            onChange={this.onChange.bind(this)}
                            callPopUp={this.popUp.bind(this)}
                        />
                    )}
                    <li
                        className="item"
                        key="li01"
                        onTouchTap={() => {
                            const { scaleFormat } = this.state,
                                define = scaleFormat === undefined,
                                value = define ? '默认' : '自定义',
                                nextValue = !define ? '默认' : '自定义';

                            this.popUp('scaleFormat', value, nextValue);
                        }}
                    >
                        <div className="flex-basis">scaleFormat</div>
                        <div className="flex-end">
                            <span className="tip">{String(this.state.scaleFormat && "(val, index) => `星期${index}`")}</span>
                            <i className="yo-ico more">{'\uf07f'}</i>
                        </div>
                    </li>
                    <li className="item" key="li0">
                        <div className="flex-basis">{'round'}</div>
                        <div className="flex-end">
                            <InputNumber
                                value={this.state.arriveround}
                                min={0}
                                max={1}
                                step={0.05}
                                decimalNum={2}
                                onChange={arriveround => {
                                    this.setState({ arriveround });
                                    this.onChange({ round: arriveround });
                                }}
                            />
                        </div>
                    </li>
                </ul>
                <Popup
                    height="auto"
                    width="100%"
                    direction="up"
                    show={this.state.valueShow}
                    onMaskTap={() => {
                        this.setState({ valueShow: false });
                    }}
                >
                    <Picker
                        looped={false}
                        options={this.state.pickerOption}
                        onChange={opt => {
                            const state = {},
                                { value } = this.state;
                            if (this.curAttr === 'isSingle') {
                                const { max, min } = this.state;
                                state.value = opt.text === 'false' ? [min, max] : [].concat(value)[0];
                            }

                            state[this.curAttr] = opt.text;

                            if (opt.text === 'false' || opt.text === 'true') {
                                state[this.curAttr] = opt.text === 'false' ? false : true;
                            }

                            if (opt.text === '默认' || opt.text === '自定义') {
                                state[this.curAttr] = opt.text !== '默认'
                                    ? (val, index) => `星期${index}`
                                    : undefined;
                            }
                            this.setState({
                                ...state,
                                pickerValue: opt.value
                            });
                        }}
                        value={this.state.pickerValue}
                    />
                </Popup>
            </div>
        );
    }
}

ReactDom.render(
    <Page title="Range Demo" scrollable>
        <div>
            <RangeDemo
                max={300}
                min={-300}
                value={[-150, 150]}
                step={150}
            />
        </div>
    </Page>,
document.getElementById('content')
);
