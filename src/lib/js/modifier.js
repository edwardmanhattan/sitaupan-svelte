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
