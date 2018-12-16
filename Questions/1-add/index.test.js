const add = require('./index');

test('Should mutate the array', () => {
    let array = [0];
    let finalArray = [0, 1, 2, 3, 4];

    add(array, 1, 2, 3, 4);

    expect(array).toEqual(finalArray);
});

test('Should create a new array', () => {
    let array = [0];
    let finalArray = [0, 1, 2, 3];

    let newArray = add(array, 1, 2, 3);

    expect(newArray).toEqual(finalArray);
    expect(array).not.toBe(newArray);
});

test('Should work as prototype', () => {
    let finalArray = [0, 1, 2, 3];

    expect([0].add(1, 2, 3)).toEqual(finalArray);
});