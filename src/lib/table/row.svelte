<script>
	export let number = '';
	export let title = '';
</script>

<div class="flex items-center gap-4 mb-2 text-sm">
	{#if number !== 'none'}
		<div class="w-4 shrink-0">{number}</div>
	{/if}
	<div class="w-4/12 shrink-0">{title}</div>
	<div class="w-2">:</div>
	<div class="flex items-center justify-center gap-2 grow">
		<slot />
	</div>
</div>
