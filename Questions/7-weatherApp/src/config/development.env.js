import production from './production.env';

export default {
    ...production,
    sentry: {
        enabled: false
    }
}