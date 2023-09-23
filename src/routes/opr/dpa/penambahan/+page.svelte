<script>
	// @ts-nocheck

	import Table from '$lib/table/table.svelte';
	import Modal from '$lib/modal/modal.svelte';
	import Icon from '@iconify/svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import { setModifierHidden, setModifierShown } from '$lib/js/modifier';

	let modal;

	let sourceAPI = `getListDataDPAByJenis?`;
	let subPage = 'program';
	let subPages = ['program', 'kegiatan', 'sub_kegiatan', 'rincian_sub_kegiatan'];

	$: source = fiero(`/operator/${sourceAPI}jenis=${subPage}`);

	let modifier = {
		no_dpa: { alias: 'Nomor & Tanggal DPA-SKPD/DPPA-SKPD/DPA.L-SKPD', show: true },
		kode_rek_program: { show: true },
		kode_rek_kegiatan: { show: false },
		kode_rek_sub_kegiatan: { show: false },
		kode_rek_rincian_sub_kegiatan: { show: false },
		id_kode_rekening: { show: false },
		anggaran: { show: false },
		jenis_pekerjaan: { show: false },
		bidang: { show: true }
	};

	function changeSubPage(sub, api) {
		subPage = sub;
		sourceAPI = api ?? `getListDataDPAByJenis?`;
		if (sub === 'program') {
			modifier = setModifierShown(modifier, ['no_dpa', 'bidang']);
			modifier = setModifierHidden(modifier, [
				'kode_rek_kegiatan',
				'kode_rek_sub_kegiatan',
				'kode_rek_rincian_sub_kegiatan'
			]);
		} else if (sub === 'kegiatan') {
			modifier = setModifierShown(modifier, ['kode_rek_kegiatan']);
			modifier = setModifierHidden(modifier, [
				'no_dpa',
				'bidang',
				'kode_rek_sub_kegiatan',
				'kode_rek_rincian_sub_kegiatan'
			]);
		} else if (sub === 'sub_kegiatan') {
			modifier = setModifierShown(modifier, ['kode_rek_kegiatan', 'kode_rek_sub_kegiatan']);
			modifier = setModifierHidden(modifier, ['no_dpa', 'bidang', 'kode_rek_rincian_sub_kegiatan']);
		} else if (sub === 'rincian_sub_kegiatan') {
			modifier = setModifierShown(modifier, [
				'kode_rek_kegiatan',
				'kode_rek_sub_kegiatan',
				'kode_rek_rincian_sub_kegiatan'
			]);
			modifier = setModifierHidden(modifier, ['no_dpa', 'bidang']);
		}
	}

	$: buttons = [
		{
			head: `List ${formatTitle(subPages[subPages.findIndex((str) => str === subPage) + 1] ?? '')}`,
			body: `Lihat ${formatTitle(
				subPages[subPages.findIndex((str) => str === subPage) + 1] ?? ''
			)}`,
			action: (id) => {
				changeSubPage(
					subPages[subPages.findIndex((str) => str === subPage) + 1],
					`getChildDPA?id=${id}&`
				);
			},
			idKey: `id_kode_rekening`
		}
	];

	$: {
		if (subPage === 'rincian_sub_kegiatan') buttons = [];
	}
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		{#each subPages as sub}
			<button
				on:click={() => {
					changeSubPage(sub);
				}}
				class:active={subPage === sub}
				class="subpage"
			>
				{formatTitle(sub)}
			</button>
		{/each}
	</div>
	<div>
		<button on:click={modal.open}>
			<Icon icon="bi:plus" />
			Tambah Program
		</button>
	</div>
</div>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} {buttons} />
{:catch err}
	<div>{err}</div>
{/await}

<Modal bind:this={modal}>
	<div>Say Something</div>
	<button>Simpan</button>
</Modal>
