import production from '../config/production.env';
import development from '../config/development.env';
import test from '../config/test.env';

function getEnv(env) {
    switch (env) {
        case 'test': 
            return test;

        case 'production': 
            return production;

        case 'development': 
            return development;

        default:
            throw new Error('ENV NOT FOUND');
    }
}

const environment = () => getEnv(process.env.NODE_ENV);

export {
    environment as default,
    getEnv
}