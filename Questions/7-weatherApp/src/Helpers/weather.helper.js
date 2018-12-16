import { getToday } from './date.helper';

/**
 * @typedef {Object} WeatherModel
 * @property {moment} date Day date.
 * @property {String} city.name City Name.
 * @property {String} city.country Country Code.
 * @property {Object} temperature Temperature data of the day.
 * @property {Number} temperature.min Minimum temperature data of the day.
 * @property {Number} temperature.max Minimum temperature data of the day.
 * @property {Number} temperature.current Minimum temperature data of the day.
 * @property {Object} weather Weather date of the day.
 * @property {Number} humidity Humidity percentage of the day.
 */

 /**
 * @typedef {Object} RawWeather
 * @property {Object} data Raw Forecast data.
 * @property {String} data.dt_txt Date string.
 * @property {String} data.name City Name String.
 * @property {String} data.sys.country City Country
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
 * Create a weather model from the given data.
 * 
 * @param {RawWeather} data Raw Weather data.
 * 
 * @returns {WeatherModel} Parsed Model.
 */
const createModel = data => ({
  date: getToday(),
  humidity: data.main.humidity,
  city: {
    name: data.name,
    country: data.sys.country
  },
  temperature: {
    current: ~~data.main.temp,
    max: ~~data.main.temp_max,
    min: ~~data.main.temp_min
  },
  weather: data.weather[0]
});

export {
  createModel,
};