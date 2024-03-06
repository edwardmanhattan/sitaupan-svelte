// @ts-nocheck

export const handle = async ({ event, resolve }) => {
	const auth = event.cookies.get('AuthUser');
	const apiKey = auth?.split('.')[0];
	const userId = auth?.split('.')[1] ?? 2;
	const userPrivilege = auth?.split('.')[2];
	const userTipe = auth?.split('.')[3] ?? 'operator';
	const userJabatan = auth?.split('.')[4] ?? 17;
	const userBidang = auth?.split('.')[5] ?? 1;
	const userNama = auth?.split('.')[6] ?? '';
	const userNamaJabatan = auth?.split('.')[7] ?? '';

	const userFullData = auth === undefined ? {} : JSON.parse(auth?.split('.')[8]);

	if (auth) {
		event.locals = {
			apiKey,
			userId,
			userPrivilege,
			userTipe,
			userJabatan,
			userBidang,
			userNama,
			userNamaJabatan,
			userFullData
		};
	}

	return await resolve(event);
};
