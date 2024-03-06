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

// Middleware to redirect HTTP to HTTPS
const redirectToHttps = function (req, res, next) {
	if (req.protocol === 'http') {
		const httpsUrl = `https://sitaupan.annieprojects.id/login`;
		return res.redirect(301, httpsUrl);
	}
	next();
};

// Use the middleware
app.use(redirectToHttps);

// Your existing route handler
app.use(handler);

httpServer.listen(PORT, function () {
	console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

httpsServer.listen(SSLPORT, function () {
	console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
