export async function load({ locals, url }) {
	return { ...locals, url: url.pathname };
}
