// @ts-nocheck

export const searchComparison = (a, b) => {
	return a.toString().toLowerCase().includes(b.toString().toLowerCase());
};

export const searchEachText = (data, text, key) => {
	const iterator = key ?? Object.keys(data[0]);
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
