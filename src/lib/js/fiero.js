// @ts-nocheck

export const config = {
	self: 'http://localhost:5173',
	api: 'http://116.68.252.194:3456',
	photo: 'http://sw.crossnet.co.id:2682/getPhoto'
};

export const defaultHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/x-www-form-urlencoded',
	Token: 'rahasia',
	ID_User: 0
};

export async function fiero(url, method = 'GET', data = null, headers = defaultHeaders) {
	const abort = new AbortController();
	const abortFn = () => {
		abort.abort();
	};
	const abortTimeout = setTimeout(abortFn, 100000);

	/////////////////////////////

	const requestInit = {
		method: method,
		headers: headers,
		signal: abort.signal
	};

	//////////////////////////////

	if (method === 'GET') {
		const queryParams = new URLSearchParams(data);
		if (!url.includes('?')) url += `?${queryParams.toString()}`;
	}

	if (method === 'POST') {
		const formData = new URLSearchParams();
		for (const [key, value] of Object.entries(data)) formData.append(key, value.toString());
		requestInit.body = formData;
	}

	const request = new Request(config.api + url, requestInit);

	try {
		let data;
		const response = await fetch(request);
		data = await response.json();

		if (!response.ok) {
			console.error(`Server Error : `, data.message);
			return [];
		}

		clearTimeout(abortTimeout);

		if (method === 'GET') {
			if (data.data === null) data.data = [];
			return data.data;
		} else return data;
	} catch (error) {
		if (error.name === 'AbortError')
			console.error('Request Timed Out : Fetch took longer than 10 seconds!');
		else console.error(`Fetch Error : `, error);

		return [];
	}
}

import noImage from '$lib/assets/no-image.webp';
export const fieroImage = async (id, folder, placeholder = noImage) => {
	return await fetch(config.photo + `?id=${id}&folder=${folder}`)
		.then((res) => {
			if (res.status === 404) throw Error('not found');
			return config.photo + `?id=${id}&folder=${folder}&random=${Math.random()}`;
		})
		.catch((err) => {
			// console.clear();
			return placeholder;
		});
};
