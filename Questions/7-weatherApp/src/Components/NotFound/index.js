import React from 'react';
import Icon from '../Icon';
import { icons } from '../../Helpers/icon.helper';

/**
 * Not Found.
 * 
 * @description
 * The component to display the 404 screen.
 * 
 * @todo create a good 404 page.
 * 
 * @returns {React.Component} the component.
 */
export default () => (
    <div className={'home-page'}> 
        <Icon className = { 'icon' } type = { icons.mist }/>
        <h1>404</h1>
        <h3>Not Found</h3>
        <strong>The page you requested was not found</strong>
    </div>
);