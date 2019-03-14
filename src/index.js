import express from 'express';
import logger from './logger';
import { config, load as loadConfig } from './config';

import { login, callback, me } from "./auth";

const version = require('../package.json').version;

const app = express();

logger.info(`-- FAQ backend v${version}\n`);
logger.info('--> Loading config');

loadConfig();

logger.info('--> Loading HTTP app...');

app.get('/auth/login', login);
app.get('/auth/callback', callback);
app.get('/auth/me', me);

const server = app.listen(config.port, config.host, () => {
    const { address, port } = server.address();

    console.log();
    logger.info(`Ready ! Listening on http://${address}:${port}/`);
});
