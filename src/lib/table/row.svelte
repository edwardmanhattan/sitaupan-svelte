<script>
	export let number = '';
	export let title = '';
	export let bgColor = 'transparent';

	export let userId = '';
	export let able = '';
	export let li = false;
</script>

<div class="flex items-start gap-4 mb-2 text-sm">
	{#if number !== 'none'}
		<div class="w-4 shrink-0">{number}{number ? '.' : ''}</div>
	{/if}

	{#if li}
		<div class="w-4/12 shrink-0" style="background-color: {bgColor};">
			<li style="padding-left: -1em">
				{title}
			</li>
		</div>
	{:else}
		<div class="w-4/12 bg-white shrink-0" style="background-color: {bgColor};">{title}</div>
	{/if}

	<div class="w-2">:</div>

	<div class:disabled={!able.includes(userId)} class="flex items-center gap-2 grow">
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
