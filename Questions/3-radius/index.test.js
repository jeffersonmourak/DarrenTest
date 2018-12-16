const radius = require('./index');

test('Should return the right value', () => {
    expect(radius(1)).toBe(3.14);
    expect(radius(2)).toBe(12.57);
});