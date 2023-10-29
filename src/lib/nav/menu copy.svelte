<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	export let icon = '';
	export let anchor;
	export let href;
	export let childPos = 0;

	let open = false;
	function hover() {
		open = !open;
	}
	function goToHref() {
		if (!href || href === '') return;
		goto(href);
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:mouseenter={hover}
	on:mouseleave={hover}
	class="relative border-b border-b-teal-800/30 bg-blue-2 hover:bg-blue-1 hover:border-white"
>
	<div on:click|stopPropagation={goToHref} class="menu">
		{#if icon !== ''}
			<Icon width="18px" {icon} />
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
		<div
			class="absolute flex flex-col border w-fit left-full border-teal-950/30 z-[10000]"
			style="top: calc( -22.5px * {parseInt(childPos)} )"
		>
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	@tailwind components;
	@layer components {
		.menu {
			@apply p-3 flex items-center gap-6 cursor-pointer;
		}
	}
</style>
