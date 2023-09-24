import { writable } from 'svelte/store';

export const identity = writable({
	id: 1,
	role: 'operator'
});
