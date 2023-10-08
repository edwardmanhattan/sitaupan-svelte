// @ts-nocheck
export const formatTitle = (str) => {
	const words = str.split('_');
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalizedWords.join(' ');
};

export const formatProperUppercase = (str) => {
	const words = str.split(' ');
	const capitalizedWords = words.map((word) => {
		if (word.length <= 3 && word !== 'No') return word.toUpperCase();
		else return word;
	});
	return capitalizedWords.join(' ');
};
