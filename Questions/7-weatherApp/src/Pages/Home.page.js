import React, { Component } from 'react';
import SearchCity from '../Components/SearchCity';
import Icon from '../Components/Icon';
import { icons } from '../Helpers/icon.helper';

class HomePage extends Component {

	/**
	 * On Select city.
	 * 
	 * @description
	 * Perform the page change when the user selects a city.
	 * 
	 * @param {Object} city City Data.
	 * @param {String} city.name City Name.
	 * @param {String} city.country City Country Code.
	 */
	onSelectCity(city) {
		this.props.history.push(`/weather/${city.country}/${city.name}`);
	}

	/**
     * Render.
     * 
     * @description
     * Renders the component.
     * 
     * @returns {React.Component} the component.
     */
	render() {
		return (
			<div className="home-page">
				<Icon className = { 'icon' } type = { icons.clearSky }/>
				<h1> Weather App </h1>
				<SearchCity type = { 'big' } onSelect = { city => this.onSelectCity(city) }/>
			</div>
		);
	}
}

export default HomePage;