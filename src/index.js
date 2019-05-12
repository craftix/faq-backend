import express from 'express';

import logger from './logger';
import { config, load as loadConfig } from './config';
import { login, callback, logout, validate as authMiddleware } from './auth';
import { get as qGet } from './questions';
import corsMiddleware from './cors';

const version = require('../package.json').version;

const app = express();

logger.info(`-- FAQ backend v${version}\n`);
logger.info('--> Loading config');

loadConfig();

logger.info('--> Loading HTTP app...');

app.use(corsMiddleware);
app.use(authMiddleware);

app.get('/', (req, res) => res.contentType('text/plain').send(config.easter));

app.get('/auth/login', login);
app.get('/auth/callback', callback);
app.post('/auth/logout', logout);

app.get('/q/get', qGet);

const server = app.listen(config.port, config.host, () => {
    const { address, port } = server.address();

    console.log();
    logger.info(`Ready ! Listening on http://${address}:${port}/`);
});
