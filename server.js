import { handler } from './build/handler.js';
import express from 'express';

import fs from 'fs';
import http from 'http';
import https from 'https';

const privateKey = fs.readFileSync(
	'../../../etc/letsencrypt/live/sitaupan.annieprojects.id/privkey.pem'
);
const certificate = fs.readFileSync(
	'../../../etc/letsencrypt/live/sitaupan.annieprojects.id/fullchain.pem'
);

const credentials = { key: privateKey, cert: certificate };

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const PORT = 80;
const SSLPORT = 443;

httpServer.listen(PORT, function () {
	console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

httpsServer.listen(SSLPORT, function () {
	console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

app.use(handler);
