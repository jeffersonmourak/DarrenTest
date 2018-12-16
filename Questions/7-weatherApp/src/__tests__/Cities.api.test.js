import Cities from '../Api/Cities.api';

const RESPONSE = {
    list: [
        {
            name: "London",
            sys: {
                country: "GB"
            }
        }
    ]
};

describe('Expect public API', () => {
    test('expect correct resource', () => {
        expect(Cities.resource).toBe('find');
    });
})

describe('search(q)', () => {
    test('search with ok result', () => {
        expect.assertions(2);
        Cities.sendApiRequest = jest.fn( () => Promise.resolve(RESPONSE) );
        Cities.search('something').then( data => expect(data).toEqual([ { label: 'London, GB', name: 'London', country: 'GB' } ]));
        expect(Cities.sendApiRequest.mock.calls.length).toBe(1);
    })
});