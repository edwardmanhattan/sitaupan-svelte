// @ts-nocheck

import { formatProperUppercase, formatTitle } from './string';

export const getKeyModifier = (data, existing = {}) => {
	data = data[0] ?? {};
	let modifier = {};
	if (existing.pageNum) modifier.pageNum = existing.pageNum;
	Object.keys(data).forEach((key) => {
		modifier[key] ??= {};
		if (existing[key]) modifier[key] = existing[key];
		modifier[key].show ??= true;
		modifier[key].export ??= true;
		modifier[key].alias ??= formatProperUppercase(formatTitle(key));
	});

	return modifier;
};

export const shownKeyModifier = (modifier) => {
	let filtered = Object.keys(modifier).reduce((acc, prop) => {
		if (modifier[prop].show) acc[prop] = modifier[prop];
		return acc;
	}, {});

	return Object.keys(filtered);
};

export const setModifierShown = (modifier, keys) => {
	keys.forEach((key) => {
		modifier[key].show = true;
	});
	return modifier;
};

export const setModifierHidden = (modifier, keys) => {
	keys.forEach((key) => {
		modifier[key].show = false;
	});
	return modifier;
};

export const typeParser = (data, integers = [], object = true) => {
	for (const key in data) {
		if (integers.includes(key) && typeof data[key] === 'number') continue;

		if (integers.includes(key) && typeof data[key] !== 'number') data[key] = parseInt(data[key]);
		else if (typeof data[key] === 'object' && object) data[key] = JSON.stringify(data[key]);
		else if (typeof data[key] === 'object' && !object) data[key] = data[key];
		else if (typeof data[key] !== 'string') data[key] = data[key].toString();
	}
	return data;
};

export const stringTypeParser = (data, targets = []) => {
	for (const key in data) {
		if (targets.includes(key) && typeof data[key] === 'number') data[key] = data[key].toString();
	}
	return data;
};

export const objectTypeParser = (data, targets = []) => {
	for (const key in data) {
		if (targets.includes(key) && typeof data[key] === 'string') data[key] = JSON.parse(data[key]);
	}
	return data;
};
