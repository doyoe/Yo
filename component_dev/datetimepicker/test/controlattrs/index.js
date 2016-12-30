import React, { Component } from 'react';
import ReactDom from 'react-dom';
import '../../../../component_dev/common/touchEventSimulator';
import Page from '../../common/page';
import DateTimePicker from '../../../../component_dev/datetimepicker/src';
import AttrsLi from '../../common/AttrsLi';
import '../main.scss';
import Picker from '../../../../component_dev/picker/src';
import Popup from '../../../../component_dev/popup/src';

class DateTimePickerDemo extends Component {

    constructor(props) {
        super(props);
        this.$inputs = [];
        this.regxSplit = /[-: ,/_]/;
        this.inputNodes = [];
        this.controlledAttrsData = {};
        this.splitStrToArray = str => str.split(this.regxSplit).map(cur => parseInt(cur, 10));
        const { dateOrTime } = props;
        this.dateProps = {
            dateOrTime: 'date',
            value: '2000-8-31',
            range: ['2000-07-28', '2016-09-10']
        };
        this.timeProps = {
            dateOrTime: 'time',
            value: '3-41',
            range: ['3-41', '16-58']
        };
        this.timeAttrLiDatas = this.getTransformData(this.timeProps);
        this.dateAttrLiDatas = this.getTransformData(this.dateProps);
        this.state = {
            ...(dateOrTime === 'date' ? this.dateProps : this.timeProps),
            height: 150,
            loopedValue: 1,
            pickerValue: 0,
            valueShow: false,
            pickerOption: [{
                text: 'false',
                value: 0
            }, {
                text: 'true',
                value: 1
            }],
            unitsAside: [],
            unitsInline: [],
            loop: [true, true, true],
            arriveHeight: 150,
            modeDatas: dateOrTime === 'time' ? this.timeAttrLiDatas : this.dateAttrLiDatas
        };
    }

    componentDidUpdate() {
        Object.keys(this.controlledAttrsData).forEach(key => {
            this.controlledAttrsData[key] = this.state[key];
        });
    }

    onChange(state) {
        if (state.dateOrTime && state.dateOrTime !== this.state.dateOrTime) {
            const modeDatas = state.dateOrTime === 'time' ? this.timeAttrLiDatas : this.dateAttrLiDatas,
                beSetProps = state.dateOrTime === 'date' ? this.dateProps : this.timeProps,
                stateData = Object.assign({}, { modeDatas }, beSetProps);
            this.setState(stateData);
        } else {
            this.setState(state);
        }
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

    strFormated(curStr) {
        const regxNum = /^(-?\d+)(\.\d+)?$/;
        return curStr.split(',')
            .map(str => str.trim())
            .map(str => (regxNum.test(str) || str === 'false' || str === 'true') ? str : `'${str}'`)
            .join(', ');
    }

    renderLi(attr, toggle = false, index) {
        return (
            <li
                className="item"
                key={`li1${index}`}
                onTouchTap={() => {
                    const curValue = this.state[attr],
                        define = curValue.length;

                    let value = !define ? '默认无' : '自定义',
                        nextValue = define ? '默认无' : '自定义';
                    if (toggle) {
                        [value, nextValue] = [nextValue, value];
                    }
                    this.popUp(attr, value, nextValue);
                }}
            >
                <div className="flex-basis">{attr}</div>
                <div className="flex-end">
                    <span className="tip">{`[ ${String(this.state[attr])} ]`}</span>
                    <i className="yo-ico more">{'\uf07f'}</i>
                </div>
            </li>
        );
    }

    render() {
        return (
            <div className={'datetimepicker'}>
                <DateTimePicker
                    height={parseInt(this.state.height, 10)}
                    range={this.state.range}
                    value={this.state.value}
                    unitsAside={this.state.unitsAside}
                    unitsInline={this.state.unitsInline}
                    dateOrTime={this.state.dateOrTime}
                    loop={this.state.loop}
                    onChange={value => {
                        console.log('---onchange value =', value);
                        this.setState({ value });
                    }}
                    format={this.numStrMaps}
                    extraPickerClass={this.state.extraPickerClass}
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
                    >setState
                    </button>
                </div>
                <div className="controlattrs">
                    <ul className="yo-list">
                        {this.state.modeDatas.map((attrs, index) =>
                            <AttrsLi
                                key={`li${index + 1}`}
                                curValue={this.state[attrs.attr]}
                                controlledAttrsData={this.controlledAttrsData}
                                {...attrs}
                                onChange={this.onChange.bind(this)}
                                callPopUp={this.popUp.bind(this)}
                            />
                        )}
                        {['unitsAside', 'unitsInline', 'loop'].map((attr, index) =>
                            this.renderLi(attr, index === 2, index))
                        }

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
                                const state = {};
                                state[this.curAttr] = opt.text;
                                if (opt.text === '默认' || opt.text === '自定义') {
                                    state[this.curAttr] = opt.text !== '默认'
                                        ? (val, index) => `星期${index}`
                                        : undefined;
                                }
                                if (this.curAttr === 'unitsAside' || this.curAttr === 'unitsInline') {
                                    const units = this.state.dateOrTime === 'date' ? ['年', '月', '日'] : ['时', '分'];
                                    state[this.curAttr] = this.state[this.curAttr].length ? [] : units;
                                }
                                if (this.curAttr === 'loop') {
                                    const newLoop = this.state.loop.map(looped => !looped);
                                    state[this.curAttr] = newLoop;
                                }
                                if (opt.text === 'date' || opt.text === 'time') {
                                    const attrs = opt.text === 'date' ? this.dateProps : this.timeProps;
                                    Object.assign(state, attrs);
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
            </div>
        );
    }
}

ReactDom.render(
    <Page scrollable title="DateTimePicker Demo">
        <div>
            <DateTimePickerDemo
                range={['2000-07-28', '2016-09-10']}
                value={'2000-8-31'}
                unitsAside={['年', '月', '日']}
                unitsInline={['年', '月', '日']}
                dateOrTime={'date'}
            />
        </div>
    </Page>,
    document.getElementById('content')
);
