/**
 * 加载中组件
 * @component loading
 * @type {Object}
 * @version 3.0.0
 * @description 加载中组件。
 *
 * @instructions {instruInfo: ./loading.md}{instruUrl: loading.html?hideIcon}
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    text: PropTypes.string,
    extraClass: PropTypes.string
};
const LoadingDefaultProps = {
    /**
     * @property text
     * @type PropTypes.string
     * @default ''
     * @description 组件属性：loading伴随动画图标的文字
     */
    text: '',
    /**
     * @property extraClass
     * @type PropTypes.string
     * @default ''
     * @description 组件属性：附加给Loading组件的额外class
     */
    extraClass: ''
};

export default class Loading extends Component {
    render() {
        const props = this.props;
        return (
            <div
                className={classNames('yo-loading', props.extraClass)}
            >
                <i className="yo-ico" />
                {!!props.text.toString().length && <span className="text">{props.text}</span>}
            </div>
        );
    }
}

Loading.propTypes = propTypes;
Loading.defaultProps = LoadingDefaultProps;
