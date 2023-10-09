// @ts-nocheck

export const handle = async ({ event, resolve }) => {
	const auth = event.cookies.get('AuthUser');
	const apiKey = auth?.split('.')[0];
	const userId = auth?.split('.')[1];
	const userPrivilege = auth?.split('.')[2];
	const userTipe = auth?.split('.')[3];

	if (auth) {
		event.locals = { apiKey, userId, userPrivilege, userTipe };
	} else {
	}

	return await resolve(event);
};