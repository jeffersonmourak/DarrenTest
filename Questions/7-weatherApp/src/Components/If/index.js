import React from 'react';

/**
 * If.
 * 
 * @description
 * The component to display a children if the condition matches.
 * 
 * @param {Object} props The properties to If.
 * @param {*} props.children the children to be visible.
 * @param {Boolean} props.condition the condition to be visible.
 * 
 * @returns {React.Component} the component.
 */
export default (props) => (
    props.condition ? <React.Fragment> {props.children} </React.Fragment> : null
);