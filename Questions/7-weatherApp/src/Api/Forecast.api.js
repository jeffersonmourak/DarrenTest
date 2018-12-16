import Api from './Api';
import { createModel } from '../Helpers/forecast.helper';
class ForecastApi extends Api {
    /**
     * Forecast Api.
     * @extends Api
     * 
     * @description
     * Handles the requests to '/forecast' endpoint.
     */
    constructor() {
        super();

        this.resource = 'forecast';
    }

    /**
     * Get.
     * 
     * @description
     * Initiates a get request for the API resource.
     * 
     * @param {Object} data City data.
     * @param {String} data.city City name
     * @param {String} data.country Country code.
     * 
     * @returns {Promise} The promise of the request with decoded data or error status.
     */
    get(data) {
        const q = `${data.city},${data.country}`;

        const request = this.createApiRequest(this.constants.METHOD.GET, this.resource, { q, units: 'metric' });

        return this.sendApiRequest(request)
            .then(response => response.list.map(createModel));
    }
}

export default new ForecastApi();