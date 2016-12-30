import React, { PropTypes } from 'react';

export const ParentValue = ({
    item,
    listValue,
    effectValue,
    level
}) => {
    const classList = [];
    if (effectValue != null && effectValue[level] === item.value) classList.push('effect');
    if (listValue === item.value) classList.push('spread');
    return <p className={classList.join(' ')}>{item.name}</p>;
};

ParentValue.propTypes = {
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

export const CheckBoxItem = (props) => (
    <p>
        <label>
            <input
                type="checkBox"
                checked={
                  props.listValue instanceof Array &&
                  !!~props.listValue.indexOf(props.item.value)
                }
                value={props.item.value}
            />
            <span className="content">{props.item.name}</span>
        </label>
    </p>
);

CheckBoxItem.propTypes = {
    listValue: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.number,
        PropTypes.null
    ]),
    item: PropTypes.object
};
