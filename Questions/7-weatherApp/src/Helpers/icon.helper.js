const iconId = {
    clearSky: '01',
    fewClouds: '02',
    scattedClouds: '03',
    brokenClouds: '04',
    showerRain: '09',
    rain: '10',
    thunderStorm: '11',
    snow: '13',
    mist: '50',
    chevronUp: 'chevron-up',
    chevronDown: 'chevron-down',
    temperature: 'temperature'
}

const icons = {
    clearSky: 'clearSky',
    fewClouds: 'fewClouds',
    scattedClouds: 'scattedClouds',
    brokenClouds: 'brokenClouds',
    showerRain: 'showerRain',
    rain: 'rain',
    thunderStorm: 'thunderStorm',
    snow: 'snow',
    mist: 'mist',
    chevronUp: 'chevronUp',
    chevronDown: 'chevronDown',
    temperature: 'temperature'
}

const iconModes = {
    day: 'd',
    night: 'n'
};

/**
 * Get Icon
 * 
 * @description
 * Generates the icon filename from the given id and mode.
 * 
 * @param {String} id Icon Id.
 * @param {String} mode Icon mode.
 * 
 * @returns {String} icon filename.
 */
const getIcon = (id, mode = 'd') => `${iconId[id]}${mode}`;

/**
 * Get Static Icon.
 * 
 * @description
 * Generates the icon filename from the given id only.
 * 
 * @param {String} id Icon Id.
 * 
 * @returns {String} icon filename.
 */
const getStaticIcon = id => `${iconId[id]}`;

export {
    icons,
    iconModes,
    getIcon,
    getStaticIcon
};