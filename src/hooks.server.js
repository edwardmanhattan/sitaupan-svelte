// @ts-nocheck

import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	let auth = event.cookies.get('auth');
	if (!auth) {
		if (event.url.pathname.includes('/print'))
			auth =
				'{"key":"C1SM/DL3zVofegx4fib2BZRLWCaT0/XPGwP0Y9tD7/c=","tipe":"mitra","user":{"id":11,"nama":"Terrius Jeremiah","username":"terri","password":"1234","nama_perusahaan":"PT Jaya Abadi","no_telepon":"1234567890","foto_ktp":"-","foto":"-","status":"non-aktif","privilege":"","email":""}}';
		else if (!event.url.pathname.startsWith('/login')) throw redirect(301, '/login');
	}

	auth = auth ? JSON.parse(auth) : { user: {} };

	event.locals.auth = auth;
	event.locals = {
		...event.locals,
		apiKey: auth.key,
		userId: auth.user?.id,
		userPrivilege: auth.privilege,
		userTipe: auth.tipe,
		userJabatan: auth.user?.jabatan,
		userBidang: auth.user?.bidang,
		userNama: auth.user?.nama,
		userNamaJabatan: auth.user?.nama_jabatan,
		userFullData: auth.user
	};

	const response = await resolve(event);

	return response;
};
