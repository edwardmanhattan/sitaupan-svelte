<script>
	import Navbar from '$lib/nav/navbar.svelte';
</script>

<div class="flex flex-col h-screen">
	<Navbar />
	<div class="p-12 overflow-auto grow">
		<slot />
	</div>
</div>
