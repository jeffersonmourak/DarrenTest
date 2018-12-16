import moment from 'moment';
import 'moment-timezone'

const FULL_DATE_MODEL = 'YYYY-MM-DD HH:mm:ss';
const DATE_MODEL = 'YYYY-MM-DD';
const HUMAN_DATE_MODEL = 'MMM DD';
const HOUR_MODEL = 'HH:mm';
const FULL_HUMAN_DATE_MODEL = 'LL';

const constants = {
    FULL_DATE_MODEL,
    DATE_MODEL,
    HUMAN_DATE_MODEL,
    FULL_HUMAN_DATE_MODEL,
    HOUR_MODEL
};

/**
 * Convert to Timezone.
 * 
 * @description
 * Converts the given UTC String to a timezone moment.
 * 
 * @param {String} utcTime A date string.
 * 
 * @returns {moment} Moment object with correct Timezone.
 */
const convertToTimezone = utcTime => (moment.utc(utcTime, FULL_DATE_MODEL).tz(moment.tz.guess()));

/**
 * Get Date.
 * 
 * @description
 * Generate a date string to a formated YYYY-MM-DD.
 * 
 * @param {moment} date Date object.
 * 
 * @returns {String} date string.
 */
const getDate = date => date.format(DATE_MODEL);

/**
 * Get Hour.
 * 
 * @description
 * Generate a date string to a formated HH:mm.
 * 
 * @param {moment} date Date object.
 * 
 * @returns {String} date string.
 */
const getHour = date => date.format(HOUR_MODEL);

/**
 * Get Human date.
 * 
 * @description
 * Generate a date string to a human readable format.
 * 
 * @param {moment} date Date object.
 * 
 * @returns {String} date string.
 */
const getHumanDate = date => date.format(HUMAN_DATE_MODEL);

/**
 * Get Full human date.
 * 
 * @description
 * Generate a date string to a human readable format with extended text.
 * 
 * @param {moment} date Date object.
 * 
 * @returns {String} date string.
 */
const getFullHumanDate = date => date.format(FULL_HUMAN_DATE_MODEL);

/**
 * Get Today.
 * 
 * @description
 * Gives back the moment object of today.
 * 
 * @returns {moment} today data.
 */
const getToday = () => moment().startOf('day');

/**
 * Is Today.
 * 
 * @description
 * Check if the given date is today.
 * 
 * @param {moment} date moment date.
 * 
 * @returns {Boolean} the resulto of comparation between the date and today.
 */
const isToday = date => date.isSame(getToday(), 'day');

export {
    convertToTimezone,
    getHumanDate,
    getFullHumanDate,
    getDate,
    constants,
    isToday,
    getToday,
    getHour
};