const isValid = require('./index');

test('Should Validate the strings', () => {
    expect(isValid(`({[{()}]})`)).toBe(true);

    expect(isValid(`({[{(})]})`)).toBe(false);

    expect(isValid(`({[{()}]})}`)).toBe(true);

    expect(isValid(`(){}[]()()`)).toBe(true);

    expect(isValid(``)).toBe(false);
});