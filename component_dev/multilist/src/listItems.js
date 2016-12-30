import React, { PropTypes } from 'react';

export const PlanItem = ({ item, defaultValue = null, level, listValue }) => {
    const checked = listValue === item.value
        || listValue instanceof Array
            && (!!~listValue.indexOf(item.value)
                || listValue.length === 0 && defaultValue === item.value)
        || (listValue == null) && defaultValue === item.value;
    return (
        <label className={checked ? 'checked' : null}>
            <div className="yo-checked yo-checked-radio">
                <input type="radio" name={level} checked={checked} readOnly="readOnly"/>
                <span className="type"></span>
            </div>
            <span className="content">{item.name}</span>
        </label>
    );
};

PlanItem.propTypes = {
    item: PropTypes.object,
    multiValue: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.number,
        PropTypes.null
    ]),
    defaultValue: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.number,
        PropTypes.null
    ]),
    listValue: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.number,
        PropTypes.null
    ]),
    effectValue: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.number,
        PropTypes.null
    ]),
    level: PropTypes.number
};
