import express from 'express';
import logger from './logger';
import { config, load as loadConfig } from './config';

import { login, callback, logout, validate } from "./auth";

const version = require('../package.json').version;

const app = express();

logger.info(`-- FAQ backend v${version}\n`);
logger.info('--> Loading config');

loadConfig();

logger.info('--> Loading HTTP app...');

app.use(validate);

app.get('/', (req, res) => res.contentType('text/plain').send(config.easter));

app.get('/auth/login', login);
app.get('/auth/callback', callback);
app.post('/auth/logout', logout);

const server = app.listen(config.port, config.host, () => {
    const { address, port } = server.address();

    console.log();
    logger.info(`Ready ! Listening on http://${address}:${port}/`);
});
