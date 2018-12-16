class Hamming {
    constructor(options = {}) {
        this.multipliers = new Map();
        this.limit = options.limit || 1500;
        
        this.setupMultipliers(options.multipliers || [2, 3, 5]);
    }

    setupMultipliers(multipliersList) {
        for (let multiplier of multipliersList) {
            this.multipliers.set(multiplier, 0);
        }
    }

    getMin(array) {
        let min = Number.MAX_SAFE_INTEGER || Number.MAX_VALUE;
        for (let item of this.multipliers) {
            let [ multiplier, index ] = item;

            if (array[index] * multiplier <= min) {
                min = array[index] * multiplier
            }
        }

        return min;
    }

    updateMultiplersIndexes(array, min) {
        for (let item of this.multipliers) {
            let [ multiplier, index ] = item;

            if (min === array[index] * multiplier) {
                this.multipliers.set(multiplier, index + 1);
            }
        }
    }

    search() {
        let array = new Array(this.limit);

        array[0] = 1;

        for (let i = 1; i < this.limit; i++) {
            let min = this.getMin(array);

            array[i] = min;

            this.updateMultiplersIndexes(array, min);
        }

        return array[this.limit - 1];
    }
}

module.exports = (options = {}) => {
    const hamming = new Hamming(options);

    return hamming.search();
};