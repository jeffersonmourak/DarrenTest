import moment from 'moment';
import 'moment-timezone'

import * as dateHelper from '../Helpers/date.helper';

describe('constants', () => {
    test('FULL_DATE_MODEL', () => {
        expect(dateHelper.constants.FULL_DATE_MODEL).toBe('YYYY-MM-DD HH:mm:ss');
    });
    
    test('DATE_MODEL', () => {
        expect(dateHelper.constants.DATE_MODEL).toBe('YYYY-MM-DD');
    });
    
    test('HUMAN_DATE_MODEL', () => {
        expect(dateHelper.constants.HUMAN_DATE_MODEL).toBe('MMM DD');
    });

    test('HOUR_MODEL', () => {
        expect(dateHelper.constants.HOUR_MODEL).toBe('HH:mm');
    });

    test('FULL_HUMAN_DATE_MODEL', () => {
        expect(dateHelper.constants.FULL_HUMAN_DATE_MODEL).toBe('LL');
    });
});


test('convertToTimezone', () => {
    const expected = moment.utc('2017-02-16 12:00:00', dateHelper.constants.FULL_DATE_MODEL).tz(moment.tz.guess());

    expect(dateHelper.convertToTimezone('2017-02-16 12:00:00')).toEqual(expected);
});

test('getDate', () => {
    const date = dateHelper.convertToTimezone('2017-02-16 12:00:00');

    expect(dateHelper.getDate(date)).toBe('2017-02-16');
});

test('getHour', () => {
    const date = dateHelper.convertToTimezone('2017-02-16 12:00:00');
    const expectedDate = date.format('HH:mm');

    expect(dateHelper.getHour(date)).toBe(expectedDate);
});

test('getHumanDate', () => {
    const date = dateHelper.convertToTimezone('2017-02-16 12:00:00');
    const expectedDate = date.format('MMM DD');

    expect(dateHelper.getHumanDate(date)).toBe(expectedDate);
});

test('getFullHumanDate', () => {
    const date = dateHelper.convertToTimezone('2017-02-16 12:00:00');
    const expectedDate = date.format('LL');

    expect(dateHelper.getFullHumanDate(date)).toBe(expectedDate);
});

test('getToday', () => {
    const expectedDate = moment().startOf('day');

    expect(dateHelper.getToday()).toEqual(expectedDate);
});

test('isToday', () => {
    const date = moment().startOf('day');

    expect(dateHelper.isToday(date)).toBe(true);
});