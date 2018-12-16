import { convertToTimezone, getHour, getDate } from './date.helper';
import { groupBy as group, minBy } from 'lodash';

/**
 * @typedef {Object} HourForecast
 * @property {moment} date Day date.
 * @property {Object} temperature Temperature data of the day.
 * @property {Number} temperature.min Minimum temperature data of the day.
 * @property {Number} temperature.max Minimum temperature data of the day.
 * @property {Number} temperature.expectation Minimum temperature data of the day.
 * @property {Object} weather Weather date of the day.
 * @property {Number} humidity Humidity percentage of the day.
 */

 /**
 * @typedef {Object} RawForecast
 * @property {Object} data Raw Forecast data.
 * @property {String} data.dt_txt Date string.
 * @property {Number} data.main.temp_min Minimum temperature.
 * @property {Number} data.main.temp_max Maximum temperature.
 * @property {Number} data.main.temp Temperature.
 * @property {Number} data.main.humidity Humidity percentage.
 * @property {Object[]} data.weather Weather data.
 */

/**
 * Create Model Helper.
 * 
 * @description
 * Create a forecast model from the given data.
 * 
 * @param {Object} data Raw Forecast data.
 * @param {String} data.dt_txt Date string.
 * @param {Number} data.main.temp_min Minimum temperature.
 * @param {Number} data.main.temp_max Maximum temperature.
 * @param {Number} data.main.temp Temperature.
 * @param {Number} data.main.humidity Humidity percentage.
 * @param {Object[]} data.weather Weather data.
 * 
 * @returns {HourForecast} Parsed Model.
 */
const createModel = data => ({
    date: convertToTimezone(data.dt_txt),
    temperature: {
        min: ~~data.main.temp_min,
        max: ~~data.main.temp_max,
        expectation: ~~data.main.temp
    },
    weather: data.weather[0],
    humidity: data.main.humidity
});

/**
 * Map Dates.
 * 
 * @description
 * Maps the array of dates to groups for each day.
 * 
 * @param {Array} list List of dates
 * 
 * @returns {Object} Dates forecasts.
 */
const mapDates = list => group(list, data => getDate(data.date));

/**
 * Get Day forecast.
 * 
 * @description
 * Generates a resume of the day forecast.
 * 
 * @param {HourForecast} hours Hour weather date.
 * 
 * @returns {Object} resume of the day. 
 */
function getDayForecast(hours) {
    let defaultData = {
        worstWeather: hours[0].weather,
        max: hours[0].temperature.max,
        min: hours[0].temperature.min,
        date: hours[0].date
    }

    return hours.reduce((data, hour) => ({
        ...data,
        worstWeather: minBy([data.worstWeather, hour.weather], weather => weather.id),
        min: Math.min(data.min, hour.temperature.min),
        max: Math.max(data.max, hour.temperature.max)
    }), defaultData);
}

/**
 * Create chart from hours.
 * 
 * @description
 * Generates the day chart forecast from the given hour data.
 * 
 * @param {HourForecast[]} hours list of weather data.
 * 
 * @returns {Object} The hours chart data.
 */
function createChartFromHours(hours) {
    return hours.reduce((chartData, hour) => ({
        labels: [...chartData.labels, getHour(hour.date)],
        data: [...chartData.data, ~~hour.temperature.expectation]
    }), { labels: [], data: [] });
}

/**
 * Crate Day Data.
 * 
 * @description
 * Create a day set of forecast data from the given array.
 * 
 * @param {RawForecast[]} list List of raw forecast data.
 * 
 * @returns {Object} object with the chart and the resume of each day.
 */
function createDayData(list) {
    let dates = Object.values(mapDates(list));

    return dates.map(hours => ({ resume: getDayForecast(hours), hours, chart: createChartFromHours(hours) }))
}

export {
    createModel,
    mapDates,
    createDayData
};