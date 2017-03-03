import React, { PropTypes } from 'react';
import classNames from 'classnames';

const ITEMPROPSCONFIG = {
    data: PropTypes.object,
    level: PropTypes.number,
    isChecked: PropTypes.bool,
    isSpread: PropTypes.bool,
    isLeaf: PropTypes.bool,
    index: PropTypes.string,
    route: PropTypes.string
};

export const CheckboxItem = (props) => (
    <div className="select-checkbox" data-type="CHECKBOX" data-index={props.index || null} data-route={props.route || null}>
        <div className="yo-checked yo-checked-checkbox">
            <input type="radio" checked={props.isChecked} readOnly="readOnly" />
            <span className="type" />
        </div>
        <p className="content">{props.data.name}</p>
    </div>
);
CheckboxItem.propTypes = ITEMPROPSCONFIG;

export const RadioItem = (props) => (
    <div className={classNames('select-checkbox', { checked: props.isChecked })} data-type="RADIO" data-index={props.index || null} data-route={props.route || null}>
        <div className="yo-checked yo-checked-radio">
            <input type="radio" checked={props.isChecked} readOnly="readOnly" />
            <span className="type" />
        </div>
        <span className="content">{props.data.name}</span>
    </div>
);
RadioItem.propTypes = ITEMPROPSCONFIG;

export const MenuItem = (props) => (
    <div className={classNames('select-checkbox', 'multi-list-content', { spread: props.isSpread, effect: props.isChecked })} data-type="MENU" data-index={props.index || null} data-route={props.route || null}>
        <div className="yo-checked yo-checked-dot">
            <input type="radio" checked={props.isChecked} readOnly="readOnly" />
            <span className="type" />
        </div>
        <span className="content">{props.data.name}</span>
    </div>
);
MenuItem.propTypes = ITEMPROPSCONFIG;

export const EmptyList = () => (
    <p className="multiList-container-tip">数据为空</p>
);
export const FaultList = () => (
    <p className="multiList-container-tip">数据加载失败</p>
);
export const LoadingList = () => (
    <p className="multiList-container-tip">数据加载中......</p>
);
