// @ts-nocheck
import { json } from '@sveltejs/kit';
import puppeteer from 'puppeteer';
// import { puppeteer } from 'puppeteer';

export const POST = async ({ url }) => {
	const link = url.searchParams.get('link');

	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	await page.goto(link);

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
