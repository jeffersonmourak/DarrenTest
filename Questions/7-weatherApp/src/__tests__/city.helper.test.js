import * as cityHelper from '../Helpers/city.helper';

test('createModel', () => {
    const modelInput = {
        name: 'city',
        sys: {
            country: 'CT'
        }
    };

    const modelOutput = {
        label: 'city, CT',
        name: 'city',
        country: 'CT'
    };

    expect(cityHelper.createModel(modelInput)).toEqual(modelOutput);
});

test('preventDuplication', () => {
    const listInput = [{ label: 'a' }, { label: 'b' }, { label: 'a' }, { label: 'c' } ];

    const listOutput = [{ label: 'a' }, { label: 'b' }, { label: 'c' }];

    expect(cityHelper.preventDuplication(listInput)).toEqual(listOutput);
});