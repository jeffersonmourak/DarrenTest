import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CitiesApi from '../../Api/Cities.api';
import AutoComplete from '../AutoComplete';
import SearchCityActions from '../../Actions/SearchCity.actions';
import { connect } from "react-redux";
import { debounce } from 'lodash';
import reporter from '../../Helpers/reporter.helper';

class SearchCity extends Component {
	static propTypes = {
		/**
		 * Gets called when the user selects a city.
		 * 
		 * @param {Object} city the selected city.
		 */
		onSelect: PropTypes.func.isRequired,
	}

	/**
	 * On update query.
	 * @async
	 * 
	 * @description
	 * Gets called when the user updates the query and starts a request to
	 * the backend to get a list of cities that matches the query or clear the list.
	 * 
	 * @param {String} query The query string for the search.
	 * 
	 * @returns {Promise} The promisse of get a list back.
	 */
	async onUpdateQuery(query) {
		if (query.length > 3) {
			try {
				this.props.updateList(await CitiesApi.search(query));

			} catch (e) {
				reporter.report(e);
			}
		} else {
			this.props.clearList();
		}
	}

	/**
	 * Close on selecti.
	 * 
	 * @description
	 * Gets called when the user selects a city,
	 * it triggers the onSelect and clear the list.
	 * 
	 * @param {Object} selection City selected.
	 */
	closeOnSelect(selection) {
		this.props.onSelect(selection);
		this.props.reset();
	}

	/**
	 * On change.
	 * 
	 * @description
	 * Gets called when the user type on AutoComplete,
	 * it updates the list if debounce 500ms and updates the query.
	 * 
	 * @param {String} query Query string.
	 */
	onChange(query) {
		const update = debounce(this.onUpdateQuery.bind(this, query), 500);

		this.props.updateQuery(query);

		update(query);
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
			<AutoComplete onChange={query => this.onChange(query)}
				onSelect={selection => this.closeOnSelect(selection)}
				onClear={this.props.reset}
				dataSet={this.props.data.list}
				value={this.props.data.query}
				loading={this.props.data.loading}
				type={this.props.type} />
		);
	}
}

const mapStateToProps = state => ({ data: state.searchCity });
const SearchCityConnected = connect(mapStateToProps, SearchCityActions)(SearchCity);

export {
	SearchCityConnected as default,
	SearchCity
};
