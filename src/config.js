import fs from 'fs';
import logger from './logger';

const defaultConfig = {
    host: '127.0.0.1',
    port: 2627,
    jwtSecret: 'PLEASE_CHANGE_THIS',
    jwtExpiresIn: '7d',

    discord: {
        id: '',
        secret: ''
    },

    arangodb: {
        host: '127.0.0.1',
        port: 8529,

        user: '',
        password: '',

        database: 'faq'
    },

    easter: ''
};

const configFile = 'config.json';
export let config = defaultConfig;

export function load () {
    if (!fs.existsSync(configFile)) {
        save();

        logger.warn('Default config has been written in config.json');
        logger.warn('Please fill it before relaunching the FAQ');

        process.exit(0);
    }

    config = JSON.parse(fs.readFileSync(configFile));
}

export function save () {
    fs.writeFileSync(configFile, JSON.stringify(config, null, 4));
}
