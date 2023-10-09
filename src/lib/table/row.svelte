<script>
	export let number = '';
	export let title = '';

	export let userId = '';
	export let able = '';
</script>

<div class="flex items-center gap-4 mb-2 text-sm">
	{#if number !== 'none'}
		<div class="w-4 shrink-0">{number}</div>
	{/if}
	<div class="w-4/12 shrink-0">{title}</div>
	<div class="w-2">:</div>

	<div class:disabled={able.includes(userId)} class="flex items-center gap-2 grow">
		<slot />
	</div>
</div>

<style>
	.disabled {
		position: relative;
		pointer-events: none;
	}
	.disabled::after {
		content: '';
		background: rgba(228, 38, 38, 0.358);
		position: absolute;
		inset: 0;
		left: -4px;
		right: -4px;
		border-radius: 5px;
	}
</style>
