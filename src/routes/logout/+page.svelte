<script>
	import { identity } from '$lib/stores';
	import { onMount } from 'svelte';

	$identity = { id: 0, role: 'operator' };

	onMount(() => {
		document.location.href = '/login';
	});
</script>
