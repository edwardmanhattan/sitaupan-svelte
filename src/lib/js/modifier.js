// @ts-nocheck

import { formatTitle } from './string';

export const getKeyModifier = (data, existing = {}) => {
	let modifier = existing;
	data = data[0];

	Object.keys(data).forEach((key) => {
		modifier[key] ??= {};
		modifier[key].show ??= true;
		modifier[key].export ??= true;
		modifier[key].alias ??= formatTitle(key);
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
