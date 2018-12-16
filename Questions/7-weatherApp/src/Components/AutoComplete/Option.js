import React from 'react';
import { isString } from 'lodash';

/**
 * Option.
 * 
 * @description
 * The component that display an option on AutoComplete dropdown.
 * 
 * @param {Object} props The properties to Options.
 * @param {Object|String} props.data Data for the option.
 * @param {Function} props.onSelect Gets called when the user click on the component.
 * @param {Boolean} props.readOnly Set if the component is clickable or not.
 * 
 * @returns {React.Component} Option Component.
 */
const Option = ({ data, onSelect, readOnly }) => (
    <div onClick={() => { !readOnly && onSelect(data) }} className={`item ${readOnly ? 'static' : ''}`}>
        {isString(data) ? data : data.label}
    </div>
);

export default Option;
