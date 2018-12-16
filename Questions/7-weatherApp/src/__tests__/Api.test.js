import Api from '../Api/Api';
import fetchMock from 'fetch-mock';

let api;

class ExampleApi extends Api {
    constructor() {
        super();

        this.resource = 'test';
    }
}

beforeEach(() => {
    api = new ExampleApi();
});

describe('Expect public API', () => {
    test('expect correct base url', () => {
        expect(api.baseUrl).toBe('https://api.openweathermap.org/data/2.5');
    });
    test('expect correct resource', () => {
        expect(api.resource).toBe('test');
    });
    test('expect correct base constants', () => {
        expect(api.constants).toEqual({
            METHOD: {
                GET: 'GET',
                POST: 'POST'
            }
        });
    });
})

describe('createQueryString(data)', () => {
    test('Expect correct query', () => {
        const queryData = {
            hello: 'world',
            someParam: 'uhuu'
        };
        const expectResult = '&hello=world&someParam=uhuu';

        expect(api.createQueryString(queryData)).toBe(expectResult);
    });
});

describe('createApiRequest(method, resource, data = {})', () => {
    describe('POST', () => {
        test('with data', () => {
            const expectResult = {
                url: 'https://api.openweathermap.org/data/2.5/RESOURCE/?appid=TEST',
                options: {
                    body: JSON.stringify({ hello: 'world' }),
                    method: 'POST'
                }
            }

            expect(api.createApiRequest('POST', 'RESOURCE', { hello: 'world' })).toEqual(expectResult);
        });

        test('without data', () => {
            const expectResult = {
                url: 'https://api.openweathermap.org/data/2.5/RESOURCE/?appid=TEST',
                options: {
                    body: JSON.stringify({}),
                    method: 'POST'
                }
            }

            expect(api.createApiRequest('POST', 'RESOURCE')).toEqual(expectResult);
        });
    });

    describe('GET', () => {
        test('with data', () => {
            const expectResult = {
                url: 'https://api.openweathermap.org/data/2.5/RESOURCE/?appid=TEST',
                options: {
                    method: 'GET'
                }
            }

            expect(api.createApiRequest('GET', 'RESOURCE')).toEqual(expectResult);
        });
    })
});

describe('sendApiRequest(request)', () => {
    test('Testing ok response', () => {
        fetchMock.mock('/test', 200, { response: { hello: 'world' } });

        const request = api.sendApiRequest({
            url: '/test',
            options: {
                method: 'GET'
            }
        });

        request.then(data => {
            expect(data).toEqual({ hello: 'world' });
        });
    });

    test('Testing error response', () => {
        fetchMock.mock('/test', 400);

        const request = api.sendApiRequest({
            url: '/test',
            options: {
                method: 'GET'
            }
        });

        request.catch(error => {
            expect(error.status).toBe(400);
        });
    });

    test('Testing unknown error handling', () => {
        global.fetch = null;

        const request = api.sendApiRequest({
            url: '/test',
            options: {
                method: 'GET'
            }
        });

        request.catch(error => {
            expect(error.status).toBe('UNKNOWN');
        })
    });

    afterEach(() => {
        fetchMock.reset();
    });
});

describe('get()', () => {
    beforeEach(() => {
        api.sendApiRequest = jest.fn();
    });

    test('Should call the sendApiRequest', () => {
        const expectedConfig = {
            url: 'https://api.openweathermap.org/data/2.5/test/?appid=TEST',
            options: {
                method: 'GET'
            }
        }

        api.get();

        expect(api.sendApiRequest.mock.calls.length).toBe(1);
        expect(api.sendApiRequest.mock.calls[0][0]).toEqual(expectedConfig);
    });
});

describe('post()', () => {
    beforeEach(() => {
        api.sendApiRequest = jest.fn();
    });

    test('Should call the sendApiRequest', () => {
        const expectedConfig = {
            url: 'https://api.openweathermap.org/data/2.5/test/?appid=TEST',
            options: {
                method: 'POST',
                body: "{}"
            }
        }

        api.post();

        expect(api.sendApiRequest.mock.calls.length).toBe(1);
        expect(api.sendApiRequest.mock.calls[0][0]).toEqual(expectedConfig);
    })
});