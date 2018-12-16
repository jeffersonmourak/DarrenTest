import React from 'react';

import SearchCity from '../SearchCity';

import './style.css';

/**
 * On city Selected.
 * 
 * @description
 * Gets called when the user selects a city from dropdown.
 * 
 * @param {Array} history The browser history.
 * @param {Object} city The city selected.
 * @param {String} city.name The name of the city.
 * @param {String} city.country The country code.
 */
const onCitySelected = (history, city) => {
    history.push(`/weather/${city.country}/${city.name}`);
}

/**
 * Header.
 * 
 * @description
 * The component to display a Header.
 * 
 * @param {Object} props The properties to Header.
 * @param {Array} props.history Browser History.
 * 
 * @returns {React.Component} the component.
 */
const Header = ({ history }) => (
    <div className={'header'}>
        <SearchCity onSelect={city => onCitySelected(history, city)} />
    </div>
);

export {
    onCitySelected,
    Header as default
}