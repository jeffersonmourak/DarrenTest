import React from 'react';
import Icon from '../Icon';
import { getStaticIcon, icons } from '../../Helpers/icon.helper';
import './style.css';

/**
 * Loading.
 * 
 * @description
 * The component to display the loading screen.
 * 
 * @returns {React.Component} the component.
 */
export default () => (
    <div className={'loading-screen'}>
        <div className={'loading-box'}>
            <Icon className={'loading-icon'} id={getStaticIcon(icons.temperature)} />
            Loading...
        </div>
    </div>
);