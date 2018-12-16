const hamming = require('./index');

test('Should return the right number in 1500', () => {
    expect(hamming()).toBe(859963392);
});

test('Should return the right number in 9', () => {
    expect(hamming({ limit: 9 })).toBe(10);
});