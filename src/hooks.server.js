// @ts-nocheck

export const handle = async ({ event, resolve }) => {
	const auth = event.cookies.get('AuthUser');
	const apiKey = auth?.split('.')[0];
	const userId = auth?.split('.')[1] ?? 2;
	const userPrivilege = auth?.split('.')[2];
	const userTipe = auth?.split('.')[3] ?? 'operator';
	const userJabatan = auth?.split('.')[4] ?? 17;
	const userBidang = auth?.split('.')[5] ?? 1;

	console.log('hooks server : ', auth);
	event.locals = { apiKey, userId, userPrivilege, userTipe, userJabatan, userBidang };

	if (auth) {
		console.log('hooks server if auth : ', auth);
	} else {
	}

	return await resolve(event);
};
