// @ts-nocheck

export const searchComparison = (a, b) => {
	return a.toString().toLowerCase().includes(b.toString().toLowerCase());
};

export const searchEachText = (data, text, key) => {
	data ??= [];
	const iterator = key ?? Object.keys(data[0] ?? {});
	return data.filter((obj) => {
		let found = false;
		for (const i of iterator)
			if (searchComparison(obj[i], text)) {
				found = true;
				break;
			}

		if (found) return obj;
	});
};

export const searchBidang = (data, bidang = '', key) => {
	if (!data || data.length === 0 || !key || bidang === '') return data;
	return data.filter((x) => x[key] === bidang[0] || x[key] === bidang[1]);
};
