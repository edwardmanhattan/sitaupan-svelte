<script>
	import Navbar from '$lib/nav/navbar.svelte';
	export let data;
	const { locals } = data;
</script>

<div class="flex flex-col h-screen">
	<Navbar {locals} />
	<div class="p-12 overflow-auto grow">
		<slot />
	</div>
</div>
