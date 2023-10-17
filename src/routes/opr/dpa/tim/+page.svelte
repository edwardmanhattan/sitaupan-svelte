<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';

	export let data;

	let source = fiero(`/operator/getAllTimKegiatan`);
	let modifier = {
		id: { show: false },
		nama_tim: { alias: 'Uraian Sub Kegiatan' }
	};

	let buttons = [
		{
			head: 'Aksi',
			body: 'Lihat',
			action: (id) => {
				document.location.href = `./tim/detail-${id}`;
			}
		}
	];
</script>

<!-- <a href="/opr/dpa/tim/add">
	<button class="ml-auto w-fit">
		<Icon icon="bi:plus" />
		Tambah Tim
	</button>
</a> -->
<br />

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} {buttons} />
{:catch err}
	<div>{err}</div>
{/await}
