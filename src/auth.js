import fetch from 'node-fetch';
import btoa from 'btoa';

import { config } from './config';

let token;

function redirectURL() {
    const { host, port } = config;
    return encodeURIComponent(`http://${host}` + (host === '127.0.0.1' ? `:${port}` : '') + '/auth/callback');
}

export async function login(req, res) {
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${config.discord.id}&scope=identify&response_type=code&redirect_uri=${redirectURL()}`);
}

export async function callback(req, res) {
    if (!req.query.code) throw new Error('No code provided');

    const code = req.query.code;
    const creds = btoa(`${config.discord.id}:${config.discord.secret}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectURL()}`,
    {
        method: 'POST',
        headers: {
            Authorization: `Basic ${creds}`,
        },
    });

    const json = await response.json();

    if (json.access_token) {
        token = json.access_token;
        res.redirect(`/auth/me`);
    } else {
        res.status(403).send('Failed auth');
    }
}

export async function me(req, res) {
    if (!token) {
        res.status(403).send('Unauthorized');
        return;
    }

    const response = await fetch('http://discordapp.com/api/users/@me', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    res.send(await response.json());
}
