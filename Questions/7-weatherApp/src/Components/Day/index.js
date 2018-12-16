import React from 'react';
import PropTypes from 'prop-types';
import WeatherChart from '../WeatherChart';
import Icon from '../Icon';
import { getStaticIcon, icons } from '../../Helpers/icon.helper';
import { getFullHumanDate } from '../../Helpers/date.helper';

import './style.css';

/**
 * Day.
 * 
 * @description
 * The component to display a Day data.
 * 
 * @param {Object} props The properties to Day.
 * @param {Object} props.data Data from this day.
 * @param {Object} props.data.resume Resume of day weather.
 * @param {Object} props.data.chart Data for the temperature chart.
 * 
 * @returns {React.Component} the component.
 */
const Day = ({ data: { resume, chart } }) => (
    <div className={'day'}>
        <div className={'day-content'}>
            <h1>{getFullHumanDate(resume.date)}</h1>

            <Icon className={'icon'} id={resume.worstWeather.icon} />

            <div className={'temperature-box'}>
                <span className={'max'}>
                    <Icon className={'temperature-icon'} id={getStaticIcon(icons.chevronUp)} />
                    {resume.max}º
                </span>

                <span className={'min'}>
                    <Icon className={'temperature-icon'} id={getStaticIcon(icons.chevronDown)} />
                    {resume.min}º
                </span>
            </div>
        </div>
        <div className={'canvas'} >
            <WeatherChart source={chart} />
        </div>
    </div>
)

Day.propTypes = {
    /**
     * The Data for day.
     */
    data: PropTypes.object.isRequired
}

export default Day;