import React, { Component } from 'react';
import ReactDom from 'react-dom';
import '../../common/tapEventPluginInit';
import Picker from '../src';
const testData2 = [1, 2, 3, 4, 5, 6].map(item => ({ value: item }));
import { getRandomNumber, getRandomOptions } from '../../common/testUtil';

class PickerDemo extends Component {

    constructor() {
        const options = getRandomOptions();
        super();
        this.state = {
            options,
            height: 200,
            loopedValue: 1,
            notLoopedValue: 4,
            looped: true
        };
    }

    render() {
        return (
            <div>
                <button
                    onTouchTap={() => {
                        const randomOptions = getRandomOptions();
                        const value = randomOptions[getRandomNumber(0, randomOptions.length)].value;
                        const height = getRandomNumber(100, 300);
                        this.setState({
                            options: randomOptions,
                            notLoopedValue: value,
                            height,
                            looped: !this.state.looped
                        });
                    }}
                >
                    change options, value and height of picker1
                </button>
                <div>
                    <Picker
                        extraClass="test"
                        options={this.state.options}
                        onChange={item => this.setState({ notLoopedValue: item.value })}
                        height={this.state.height}
                        value={this.state.notLoopedValue}
                        looped={this.state.looped}
                    />
                </div>
                <div style={{ marginTop: 50 }}>
                    <Picker
                        options={testData2}
                        extraClass="yo-picker-xxx"
                        onChange={item => this.setState({ loopedValue: item.value })}
                        value={this.state.loopedValue}
                        itemHeight={45}
                        unit="haha"
                    />
                </div>
            </div>
        );
    }
}

ReactDom.render(<PickerDemo />, document.getElementById('content'));
