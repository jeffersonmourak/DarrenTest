module.exports = radius => {
    let area = Math.PI * (radius ** 2);

    return Number(area.toFixed(2));
};