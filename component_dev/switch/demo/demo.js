import Switch from '../src/';
import React from 'react';
import { render } from 'react-dom';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switch1: true,
            switch2: false
        };
    }
    getValue(name, value) {
        this.setState((state) => {
            const cstate = state;
            cstate[name] = value;
            return cstate;
        });
    }
    render() {
        return (
            <div>
                <Switch
                    checked={this.state.switch1}
                    onChange={(value) => { this.getValue('switch1', value); }}
                />
                <Switch
                    checked={this.state.switch2}
                    onChange={(value) => { this.getValue('switch2', value); }}
                />
                <Switch disabled checked={false} />
                <Switch disabled />
            </div>
        );
    }
}

render(
    <Form />,
    document.getElementById('target')
);

export default Form;