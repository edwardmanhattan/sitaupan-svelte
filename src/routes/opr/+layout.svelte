<script>
	// @ts-nocheck
	import Sidebar from '$lib/nav/sidebar.svelte';
	import { fly } from 'svelte/transition';
	export let data;
</script>

<div class="flex h-screen overflow-auto">
	<Sidebar privilege={data} />
	{#key data.url}
		<div
			in:fly={{ x: 200, duration: 300, delay: 300 }}
			out:fly={{ x: -200, duration: 300 }}
			class="px-8 py-6 overflow-auto grow"
		>
			<slot />
		</div>
	{/key}
</div>
