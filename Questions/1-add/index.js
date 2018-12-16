function add() {
    let [arr, ...params] = arguments;

    arr.push(...params);

    return [...arr];
}

Array.prototype.add = function () {
    return add(this, ...arguments);
};

module.exports = add;