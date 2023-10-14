<script>
	// @ts-nocheck

	import Sidebar from '$lib/nav/sidebar.svelte';
	export let data;

	console.log('layout svelte opt : ', data);
</script>

<div class="flex h-screen overflow-auto">
	<Sidebar privilege={data} />
	<div class="px-8 py-6 overflow-auto grow">
		<slot />
	</div>
</div>
