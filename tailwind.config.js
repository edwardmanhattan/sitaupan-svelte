/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// 'blue-1': '#A5DBDD',
				'blue-1': '#F0DCCA',
				// 'blue-2': '#407C87',
				'blue-2': '#D7F0E9',
				'blue-3': '#B0D5C7',
				'white-1': '#F5F5F5',
				'gray-1': '#B1CCCC',
				'gray-2': '#323B3B',
				'black-1': '#191A1A'
			},
			aspectRatio: {
				hero: '3 / 1',
				carousel: '2 / 1'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
