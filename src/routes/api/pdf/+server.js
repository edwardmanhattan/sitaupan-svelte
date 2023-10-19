// @ts-nocheck
import { json } from '@sveltejs/kit';
import puppeteer from 'puppeteer';

const args = [
	'--disable-features=IsolateOrigins',
	'--disable-site-isolation-trials',
	'--autoplay-policy=user-gesture-required',
	'--disable-background-networking',
	'--disable-background-timer-throttling',
	'--disable-backgrounding-occluded-windows',
	'--disable-breakpad',
	'--disable-client-side-phishing-detection',
	'--disable-component-update',
	'--disable-default-apps',
	'--disable-dev-shm-usage',
	'--disable-domain-reliability',
	'--disable-extensions',
	'--disable-features=AudioServiceOutOfProcess',
	'--disable-hang-monitor',
	'--disable-ipc-flooding-protection',
	'--disable-notifications',
	'--disable-offer-store-unmasked-wallet-cards',
	'--disable-popup-blocking',
	'--disable-print-preview',
	'--disable-prompt-on-repost',
	'--disable-renderer-backgrounding',
	'--disable-setuid-sandbox',
	'--disable-speech-api',
	'--disable-sync',
	'--hide-scrollbars',
	'--ignore-gpu-blacklist',
	'--metrics-recording-only',
	'--mute-audio',
	'--no-default-browser-check',
	'--no-first-run',
	'--no-pings',
	'--no-sandbox',
	'--no-zygote',
	'--password-store=basic',
	'--use-gl=swiftshader',
	'--use-mock-keychain'
];
export const POST = async ({ url }) => {
	const link = url.searchParams.get('link');

	const browser = await puppeteer.launch({ headless: 'new', args: args });
	const page = await browser.newPage();

	await page.goto(link, { waitUntil: 'domcontentloaded' });

	const element = await page.$('#printTarget');

	await page.evaluate((el) => {
		el = el.cloneNode(true);
		document.body.innerHTML = `<div> ${el.outerHTML} </div>`;
	}, element);

	const pdfBuffer = await page.pdf({ format: 'A4' });

	await browser.close();

	return json({
		status: 200,
		pdf: pdfBuffer.toString('base64')
	});
};
