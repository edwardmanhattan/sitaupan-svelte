<script>
	import Sidebar from '$lib/nav/sidebar.svelte';
</script>

<div class="flex h-screen overflow-auto">
	<Sidebar />
	<div class="px-8 py-6 overflow-auto grow">
		<slot />
	</div>
</div>
