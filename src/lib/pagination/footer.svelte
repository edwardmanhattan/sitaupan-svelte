<script>
	// @ts-nocheck

	import Icon from '@iconify/svelte';

	export let display;
	export let page;
	export let currentPage;
</script>

<div class="flex mt-2">
	<div class="flex items-center">
		<button
			on:click={() => {
				display = page.prev();
				currentPage = page.getCurrentPage();
			}}
		>
			<Icon icon="material-symbols:arrow-left" />
		</button>

		<button
			on:click={() => {
				display = page.next();
				currentPage = page.getCurrentPage();
			}}
		>
			<Icon icon="material-symbols:arrow-right" />
		</button>
	</div>
	<div class="ml-2">
		menampilkan {display.length} dari {page.root.length} data
	</div>
	<div class="ml-auto">
		halaman {currentPage} dari {page.pageLength + 1}
	</div>
</div>
