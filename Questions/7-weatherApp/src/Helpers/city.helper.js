import { uniqBy } from 'lodash';

/**
 * Create Model Helper.
 * 
 * @description
 * Create a city model from the given data.
 * 
 * @param {Object} data Raw City data.
 * @param {String} data.name City Name.
 * @param {String} data.sys.country Country Code.
 * 
 * @returns {Object} Parsed Model.
 */
const createModel = data => ({
    label: `${data.name}, ${data.sys.country}`,
    name: data.name,
    country: data.sys.country
});

/**
 * Prevent models duplicated.
 * 
 * @description
 * Prevent to have the same city name twice on the list.
 * 
 * @param {Array} list List of models.
 */
const preventDuplication = list => uniqBy(list, data => data.label);

export {
    createModel,
    preventDuplication
};