import env from './env.helper';
import * as Sentry from '@sentry/browser'

/**
 * Initialize the sentry reporter;
 */
function initSentry() {
    Sentry.init({
        dsn: env().sentry.dns
    });
}

/**
 * Report error.
 * 
 * @description
 * Reports to sentry if enbled by config.
 * 
 * @param {String} error Error Text
 */
function report(error) {
    if (env().sentry.enabled) {
        initSentry();
        Sentry.captureException(error);
    } else {
        console.error(error);
    }
}

const reporter = {
    report,
    initSentry
};

export default reporter;