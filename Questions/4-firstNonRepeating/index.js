/**
 * The code basically runs over all the items and maps it to a hashMap (Map) create a smaller direct access and iterable
 * code, that can after that be iterated and stopped at first ocurrency of non repetition.
 * 
 */
function firstNonRepeating(array) {
    let map = new Map();

    array.forEach( item => (map.set(item, (map.get(item) + 1) || 1)) );

    for (let item of map) {
        let [key, repeat] = item;

        if (repeat === 1) {
            return key;
        }
    }

    return false;
}

module.exports = firstNonRepeating;