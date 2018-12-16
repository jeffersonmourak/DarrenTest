import React from 'react';
import { isToday, getFullHumanDate } from '../../Helpers/date.helper';
import Day from '../Day';
import Header from '../Header';
import Icon from '../Icon';
import './style.css';

/**
 * Build Day.
 * 
 * @description
 * Creates the Day component for the given day data.
 * 
 * @param {Object} data The day data.
 * @param {Number} key Key for the react repetition key.
 * 
 * @returns {React.Component} the div with the day component.
 */
const buildDay = (data, key) => (
    <div key={key} className={`weather-day-section ${getTheme(data.resume.min)}`}>
        <Day data={data} />
    </div>
);

/**
 * Is today Filter.
 * 
 * @description
 * Checks if the given date is today.
 * 
 * @param {Object} data the day data.
 * 
 * @returns {Boolean} if the date is or not today.
 */
const isTodayFilter = data => !isToday(data.resume.date);

/**
 * Get Theme
 * 
 * @description
 * Gets a theme depending of the temperature.
 * 
 * @param {Number} temperature the temperature for the theme.
 * 
 * @returns {String} theme name.
 */
const getTheme = temperature => temperature < 12 ? 'cold' : 'hot';

/**
 * Today.
 * 
 * @description
 * Renders the data for today.
 * 
 * @param {Object} props The component properties.
 * @param {Object} props.weather The current weather data.
 * 
 * @returns {React.Component} the Today component.
 */
const Today = ({ weather }) => (
    <div className={`weather-day-today`}>
        <Icon className={'icon'} id={weather.weather.icon} />
        <h1 className={'temperature'}>
            {weather.temperature.current}º
    </h1>
        <h3> {getFullHumanDate(weather.date)} </h3>
        <h4> {weather.city.name}, {weather.city.country} </h4>
    </div>
);

/**
 * Weather.
 * 
 * @description
 * Renders the component.
 * 
 * @param {Object} props The component properties.
 * @param {Object} props.weather The current weather data.
 * @param {Object} props.forecast The forecast data for next 120h.
 * @param {Array} props.history The browser history.
 * 
 * @returns {React.Component} the component.
 */
const Weather = ({ forecast, weather, history }) => (
    <div className={'page'} >
        <Header history={history} />
        <div className={`weather-day-section ${getTheme(weather.temperature.current)}`}>
            <Today weather={weather} />
        </div>

        {forecast
            .filter(isTodayFilter)
            .map(buildDay)
        }
    </div>
);

export {
    Weather as default,
    Today,
    buildDay,
    getTheme,
    isTodayFilter
};