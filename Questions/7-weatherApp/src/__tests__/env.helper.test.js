import { getEnv } from '../Helpers/env.helper';

import '../config/development.env';
import '../config/production.env';
import '../config/test.env';

jest.mock('../config/development.env', () => 'development');
jest.mock('../config/production.env', () => 'production');
jest.mock('../config/test.env', () => 'test');

test('check env import', () => {
    expect(getEnv('development')).toBe('development');
    expect(getEnv('production')).toBe('production');
    expect(getEnv('test')).toBe('test');
    
    

    expect(() => { getEnv('UNKNOWN') }).toThrowError('ENV NOT FOUND');
});