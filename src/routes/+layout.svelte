<script>
	import { fly } from 'svelte/transition';
	import '../app.css';

	export let data;
</script>

<svelte:head>
	<title>Si Taupan</title>
</svelte:head>

<div class="bg-white-1">
	<slot />
</div>
