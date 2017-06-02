import React, { Component, PropTypes } from 'react';
import Range from '../src';
import ReactDom, { render } from 'react-dom';

export default class RangeDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: props.disable,
            resize: false,
            value: props.value,
            rangeValue: [200, 600]
        }
    }

    onChange(stateData) {
        this.setState({ value: stateData });
    }

    render() {
        return (
            <div>
                <Range
                    max={800}
                    min={0}
                    step={200}
                    value={this.state.rangeValue}
                    onChange={(value) => { this.setState({ rangeValue: value }) }}
                />
                <Range
                    ref="range"
                    max={this.props.max}
                    min={this.props.min}
                    value={this.state.value}
                    step={this.props.step}
                    showScale={this.props.showScale}
                    scaleFormat={this.props.scaleFormat}
                    isSingle={this.props.isSingle}
                    disable={this.state.disable}
                    onTouchMove={() => console.log('demo touch move')}
                    onTouchEnd={() => console.log('demo touch end')}
                    onChange={this.onChange.bind(this)}
                >
                </Range>
            </div>
        )
    }
}


ReactDom.render(
    <div>
        <RangeDemo
            disable={false}
            max={300}
            min={-300}
            value={-150}
            step={150}
            isSingle={true}
        />
    </div>,
    document.getElementById('content')
);
