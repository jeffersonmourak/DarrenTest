import env from '../Helpers/env.helper';
/**
 * @typedef {Object} RequestOptions
 * @property {String} url The url for the request.
 * @property {Object} options The request options.
 */

class Api {
    /**
     * API.
     * 
     * @description
     * Handles the requests to outside data.
     */
    constructor() {
        this.apiKey = env().apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.resource = '';

        this.constants = {
            METHOD: {
                GET: 'GET',
                POST: 'POST'
            }
        }
    }

    /**
     * Create query String.
     * 
     * @description
     * Converts the given object to a query string.
     * 
     * @param {Object} data The object with keys for the query.
     * 
     * @returns {String} The query string for the given object.
     */
    createQueryString(data) {
        return Object.keys(data).reduce((acc, key) => `${acc}&${key}=${data[key]}`, '');
    }

    /**
     * Create Api Request.
     * 
     * @description
     * Configure the Request to match the parameters for the Backend API.
     * 
     * @param {String} method Request Method.
     * @param {String} resource The api resource.
     * @param {Object} [data] The data for the request.
     * 
     * @returns {RequestOptions} Configuration object for the request.
     */
    createApiRequest(method, resource, data = {}) {
        let options = {
            method,
        }

        let url = `${this.baseUrl}/${resource}/?appid=${this.apiKey}`;

        if (method === this.constants.METHOD.POST) {
            options.body = JSON.stringify(data);
        }

        if (method === this.constants.METHOD.GET) {
            url += this.createQueryString(data);
        }

        return {
            url,
            options
        }
    }

    /**
     * Send API Request.
     * 
     * @description
     * Handles the Send and the response of the API request.
     * 
     * @param {RequestOptions} request The configurarion for the request.
     * 
     * @returns {Promise} The promise of the request with decoded data or error status.
     */
    sendApiRequest(request) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await fetch(request.url, request.options);

                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject({
                        status: response.status,
                        error: response.statusText
                    });
                }
            } catch (error) {
                reject({
                    status: 'UNKNOWN',
                    error
                });
            }
        });
    }

    /**
     * Get.
     * 
     * @description
     * Initiates a get request for the API resource.
     * 
     * @param {Object} [data] Query data.
     * 
     * @returns {Promise} The promise of the request with decoded data or error status.
     */
    get(data = {}) {
        const request = this.createApiRequest(this.constants.METHOD.GET, this.resource, data);

        return this.sendApiRequest(request);
    }

    /**
     * Post.
     * 
     * @description
     * Initiates a Post request for the API resource.
     * 
     * @param {Object} [data] Body data.
     * 
     * @returns {Promise} The promise of the request with decoded data or error status.
     */
    post(data = {}) {
        const request = this.createApiRequest(this.constants.METHOD.POST, this.resource, data);

        return this.sendApiRequest(request);
    }
}

export default Api;