// @ts-nocheck
export const indonesianMonths = [
	'Januari',
	'Februari',
	'Maret',
	'April',
	'Mei',
	'Juni',
	'Juli',
	'Agustus',
	'September',
	'Oktober',
	'November',
	'Desember'
];

export const getTodayDate = (addOn = 0) => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because January is 0-based
	const day = String(today.getDate() + addOn).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const getMonthNow = () => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1

	const monthNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

	if (currentMonth >= 1 && currentMonth <= 12) {
		return monthNumber[currentMonth - 1];
	} else {
		return 'Invalid month';
	}
};

export const getYearNow = () => {
	return new Date().getFullYear();
};

// 12 Agustus 2023
export function formatFullDate(date = getTodayDate()) {
	if (date === '') return '';

	if (date?.includes('T')) date = date?.replace('T', ' ')?.replace('Z', '');

	return new Intl.DateTimeFormat('id-ID', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(date));
}

// [2021,2022,2023]
export function getYearsSince(year) {
	const currentYear = new Date().getFullYear();
	const years = [];

	for (let i = year; i <= currentYear; i++) {
		years.push(i);
	}

	return years;
}
