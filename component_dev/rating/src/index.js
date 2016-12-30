/**
 * 评分组件
 *
 * @component Rating
 * @version 3.0.0
 * @description 评分组件，既可以用来评分，也可以用来展示评分。这是一个受控的组件，当用户点击评分之后，需要通过回调设置当前的分数，否则分数不会变化。
 * @instructions {instruInfo: ./rating.md}{instruUrl: rating.html?hideIcon}
 */
import React, { Component, PropTypes } from 'react';
import { getArrayByLength } from '../../common/util';
import './style.scss';
import '../../common/tapEventPluginInit';

const defaultProps = {
    extraClass: '',
    total: 5,
    value: 0,
    readonly: false
};

const propTypes = {
    /**
     * 组件额外class
     *
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     */
    extraClass: PropTypes.string,
    /**
     * 总分数
     *
     * @property total
     * @type Number
     * @description 图标的总数量。
     * @default 5
     */
    total: PropTypes.number,
    /**
     * 当前分数
     *
     * @property value
     * @type Number
     * @description 当前点亮的图标数。
     * @default 0
     */
    value: PropTypes.number,
    /**
     * 是否只读
     *
     * @property readonly
     * @type Bool
     * @description 是否只读。当为 `true` 的时候，只能展示评分，不能点击；当为 `false` 的时候，可以点击评分
     * @default false
     */
    readonly: PropTypes.bool,
    /**
     * 点击评分的回调
     *
     * @property onChange
     * @type Function
     * @param {number} value 当前选择的图标数
     * @description (value) => void
     *
     * 点击评分的回调。由于 `Number` 是一个受控的组件，需要在该回调中设置 value 参数。
     */
    onChange: PropTypes.func
};

export default class Rating extends Component {
    getItemStyle(index) {
        const _width = (this.props.value - index) * 100;
        const _fixedWidth = parseInt(Math.max(Math.min(_width, 100), 0), 10);

        return {
            width: `${_fixedWidth.toString()}%`
        };
    }

    handleTap(index) {
        if (this.props.readonly) {
            return;
        }

        if (this.props.onChange) {
            this.props.onChange(index + 1);
        }
    }

    render() {
        const { extraClass, total } = this.props;
        const ratingClass = ['yo-rating', extraClass].join(' ');

        return (
            <ul className={ratingClass}>
                {
                    getArrayByLength(total).fill('').map((item, index) =>
                        <li className="item" key={index} onTouchTap={() => this.handleTap(index)}>
                            <span style={this.getItemStyle(index)}></span>
                        </li>
                    )
                }
            </ul>
        );
    }
}

Rating.propTypes = propTypes;
Rating.defaultProps = defaultProps;
