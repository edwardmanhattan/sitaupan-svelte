<script>
	// @ts-nocheck

	import Icon from '@iconify/svelte';
	export let icon = '';
	export let anchor;
	export let href;

	let open = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:mouseenter={() => {
		open = !open;
	}}
	on:mouseleave={() => {
		open = !open;
	}}
	class="relative border-b border-b-white/30 bg-black-1 hover:bg-blue-2/80 hover:border-white"
>
	<div
		on:click|stopPropagation={() => {
			document.location.href = href;
		}}
		class="menu"
	>
		{#if icon !== ''}
			<div>
				<Icon width="18px" {icon} />
			</div>
		{:else}
			<div />
		{/if}

		<a class="w-max" {href}>{anchor}</a>

		{#if $$slots.default}
			<div class="ml-auto">
				<Icon width="10px" icon="bi:caret-right" />
			</div>
		{:else}
			<div class="ml-auto" />
		{/if}
	</div>

	{#if $$slots.default && open}
		<div class="absolute top-0 flex flex-col w-fit left-full">
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	@tailwind components;
	@layer components {
		.menu {
			@apply p-3 flex items-center gap-6 hover:text-white cursor-pointer;
		}
	}
</style>
