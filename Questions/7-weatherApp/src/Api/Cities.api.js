import Api from './Api';
import { createModel, preventDuplication } from '../Helpers/city.helper';

class CitiesApi extends Api {
    /**
     * Cities Api.
     * @extends Api
     * 
     * @description
     * Handles the request to '/find' endpoint.
     */
    constructor() {
        super();

        this.abortable = true;
        this.resource = 'find';
    }

    /**
     * Search.
     * 
     * @description
     * Run a search for the given word.
     * 
     * @param {string} q the query word of a city.
     * 
     * @returns {Promise} The promise of the request with decoded data or error status.
     */
    search(q) {
        const request = this.createApiRequest(this.constants.METHOD.GET, this.resource, { q });

        return this.sendApiRequest(request)
            .then(citiesData => preventDuplication(citiesData.list.map(createModel)));
    }
}

export default new CitiesApi();