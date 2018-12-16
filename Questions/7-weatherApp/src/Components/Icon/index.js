import React from 'react';
import { getIcon, iconModes } from '../../Helpers/icon.helper';

/**
 * Icon.
 * 
 * @description
 * The component to display an Icon.
 * 
 * @param {Object} props The properties to Icon.
 * @param {String} props.type type of the icon.
 * @param {String} props.id id of the icon.
 * @param {String} props.iconModes the mode of the icon.
 * @param {String} props.alt Alt property to the image.
 * @param {String} props.className CSS class for the image component.
 * 
 * @returns {React.Component} the component.
 */
export default ({ type, id = null, mode = iconModes.day, alt, className }) => (
    id !== null ?
        <img className={className} alt={alt} src={`${process.env.PUBLIC_URL}/images/icons/${id}.svg`} /> :
        <img className={className} alt={alt} src={`${process.env.PUBLIC_URL}/images/icons/${getIcon(type, mode)}.svg`} />
);