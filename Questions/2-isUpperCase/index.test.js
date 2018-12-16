const startsUpper = require('./index');

test('Should Match a simple text', () => {
    expect(startsUpper('hello')).toBe(false);
    expect(startsUpper('Hello')).toBe(true);
    expect(startsUpper('    hEllo')).toBe(false);
    expect(startsUpper('UnderWorld     ')).toBe(true);
    expect(startsUpper('    a    ')).toBe(false);
    expect(startsUpper('A')).toBe(true);
});

test('Should Match when used as property of text', () => {
    expect('hello'.startsUpper()).toBe(false);
    expect('Hello'.startsUpper()).toBe(true);
    expect('    hEllo'.startsUpper()).toBe(false);
    expect('UnderWorld     '.startsUpper()).toBe(true);
    expect('    a    '.startsUpper()).toBe(false);
    expect('A'.startsUpper()).toBe(true);
});