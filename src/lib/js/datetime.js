export const getTodayDate = (addOn = 0) => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because January is 0-based
	const day = String(today.getDate() + addOn).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export function formatFullDate(date = getTodayDate()) {
	return new Intl.DateTimeFormat('id-ID', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(date));
}
