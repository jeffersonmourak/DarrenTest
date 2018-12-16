import reporter from '../Helpers/reporter.helper';

import env from '../Helpers/env.helper';
import * as Sentry from '@sentry/browser';

jest.mock('../Helpers/env.helper', () => (jest.fn()));

jest.mock('@sentry/browser', () => ({
    init: jest.fn(),
    captureException: jest.fn()
}));

global.console = {error: jest.fn()}

test('init sentry', () => {
    env.mockReturnValueOnce({
        sentry: {
            dns: 'DNS'
        }
    });

    const spy = jest.spyOn(Sentry, 'init');

    reporter.initSentry();

    expect(spy).toHaveBeenCalled();
});

describe('Report an error', () => {
    test('report to console', () => {
        env.mockReturnValueOnce({
            sentry: {
                dns: 'DNS',
                enabled: false
            }
        });
    
        reporter.report('Error')
    
        expect(console.error.mock.calls.length).toBe(1);
    });

    test('report to sentry', () => {
        const envData = {
            sentry: {
                dns: 'DNS',
                enabled: true
            }
        };
        const spy = jest.spyOn(Sentry, 'captureException');

        env.mockReturnValueOnce(envData).mockReturnValueOnce(envData);

        reporter.report('Error')
    
        expect(spy).toHaveBeenCalled();
    });
});