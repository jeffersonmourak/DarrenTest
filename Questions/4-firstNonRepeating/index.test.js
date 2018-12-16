const firstNonRepeating = require('./index');

test('Should return always the first non-repeating char', () => {
    expect(firstNonRepeating(['t', 'o', 't', 'a', 'l'])).toBe('o');

    expect(firstNonRepeating(['t', 'e', 'e', 't', 'e', 'r'])).toBe('r');

    expect(firstNonRepeating(['a', 'b', 'c', 'd', 'e', 'f'])).toBe('a');

    expect(firstNonRepeating(['a', 'a', 'a', 'a', 'a', 'a'])).toBe(false);
    
    expect(firstNonRepeating([])).toBe(false);
});