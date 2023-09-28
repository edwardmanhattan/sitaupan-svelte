// @ts-nocheck
export const rupiah = (num) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR'
	}).format(num.toString());
};

export const numeric = (str) => {
	return str
		.replace(',00', '')
		.replace(/[^0-9,-]/g, '')
		.replace(/,/g, '.');
};
