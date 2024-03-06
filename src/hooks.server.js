// @ts-nocheck

import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	let auth = event.cookies.get('auth');
	if (!auth) if (!event.url.pathname.startsWith('/login')) throw redirect(301, '/login');

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
