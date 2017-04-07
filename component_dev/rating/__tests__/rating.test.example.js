import React, { Component } from 'react';
import Rating from '../src/rating';

export default class RatingExample extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    render() {
        return (
            <Rating
                value={this.state.value}
                disabled={this.props.diabled || false}
                onChange={(value) => this.setState({ value })}
            />
        );
    }
}