/**
 * option组件
 */
import React, { Component, PropTypes } from 'react';
import '../../common/tapEventPluginInit';

export default class extends Component {

    static propTypes = {
        ele: PropTypes.object,
        onOptionTap: PropTypes.func,
        itemHeight: PropTypes.number
    };

    /**
     * option组件的render触发控制的比较苛刻,同样是为了优化低端手机的滚动性能
     * @param nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps) {
        return !!(nextProps.ele.value !== this.props.ele.value
        || nextProps.ele.text !== this.props.ele.text
        || nextProps.ele.index !== this.props.ele.index
        || nextProps.notLooped);
    }

    render() {
        const { ele, itemHeight, onOptionTap } = this.props;
        const y = ele.index * itemHeight;
        const transform = `translate(0,${y + ele.offset}px) translateZ(0px)`;

        return (
            <li
                onTouchTap={() => {
                    onOptionTap(ele);
                }}
                style={{
                    transform,
                    WebkitTransform: transform
                }}
                className="item"
            >
                {ele.text || ele.value}
            </li>
        );
    }
}
