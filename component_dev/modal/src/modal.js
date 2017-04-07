import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import RealModal from './realmodal';

/**
 * 这个虚拟的组件将会利用renderSubtreeIntoContainer将Modal从原有的位置移动到body中
 */
export default class Modal extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    };

    componentDidMount() {
        this.wrapper = document.createElement('div');
        document.body.appendChild(this.wrapper);
        this.appendWrapperToDocBody();
    }

    componentDidUpdate() {
        this.appendWrapperToDocBody();
    }

    componentWillUnmount() {
        document.body.removeChild(this.wrapper);
    }

    appendWrapperToDocBody() {
        ReactDom.unstable_renderSubtreeIntoContainer(
            this,
            <RealModal {...this.props}>
                {this.props.children}
            </RealModal>,
            this.wrapper
        );
    }

    render() {
        return null;
    }
}