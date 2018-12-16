function startsUpper(string) {
    string = string.trim();

    return string[0] === string[0].toUpperCase();
}

String.prototype.startsUpper = function () {
    return startsUpper(this);
};

module.exports = startsUpper;