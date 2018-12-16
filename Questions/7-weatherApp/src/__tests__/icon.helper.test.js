import * as iconHelper from '../Helpers/icon.helper';

const icons = [
    {  key: 'clearSky', id: '01' },
    {  key: 'fewClouds', id: '02' },
    {  key: 'scattedClouds', id: '03' },
    {  key: 'brokenClouds', id: '04' },
    {  key: 'showerRain', id: '09' },
    {  key: 'rain', id: '10' },
    {  key: 'thunderStorm', id: '11' },
    {  key: 'snow', id: '13' },
    {  key: 'mist', id: '50' },
    {  key: 'chevronUp', id: 'chevron-up' },
    {  key: 'chevronDown', id: 'chevron-down' },
    {  key: 'temperature', id: 'temperature' }
];

describe('Expect correct Icons', () => {
    for (let icon of icons) {
        test(`${icon.key} icon`, () => {
            expect(iconHelper.icons[icon.key]).toBe(`${icon.key}`);
        });
    }
});

describe('Expect correct modes', () => {
    test('day', () => expect(iconHelper.iconModes.day).toBe('d'));
    test('night', () => expect(iconHelper.iconModes.night).toBe('n'));
});

describe('getIcon(id, mode = "d")', () => {
    describe('test day icons as default', () => {
        for (let icon of icons) {
            test(`${icon.key} icon`, () => {
                expect(iconHelper.getIcon(iconHelper.icons[icon.key])).toBe(`${icon.id}d`);
            });
        }
    });

    describe('test day icons', () => {
        for (let icon of icons) {
            test(`${icon.key} icon`, () => {
                expect(iconHelper.getIcon(iconHelper.icons[icon.key], iconHelper.iconModes.day)).toBe(`${icon.id}d`);
            });
        }
    });

    describe('test night icons', () => {
        for (let icon of icons) {
            test(`${icon.key} icon`, () => {
                expect(iconHelper.getIcon(iconHelper.icons[icon.key], iconHelper.iconModes.night)).toBe(`${icon.id}n`);
            });
        }
    });
});

describe('getStaticIcon(id)', () => {
    describe('test icons', () => {
        for (let icon of icons) {
            test(`${icon.key} icon`, () => {
                expect(iconHelper.getStaticIcon(iconHelper.icons[icon.key])).toBe(icon.id);
            });
        }
    });
});