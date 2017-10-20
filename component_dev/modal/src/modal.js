import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        // 某些情况业务的崩溃会导致 WillUnmount 在 DidMount 之前调用，所以需要加层判断
        if (!!this.wrapper) {
            document.body.removeChild(this.wrapper);
        }
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