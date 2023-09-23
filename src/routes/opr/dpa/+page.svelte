<script>
	// @ts-nocheck

	import Table from '$lib/table/table.svelte';
	import { fiero } from '$lib/js/fiero';

	const source = fiero(`/operator/getListDataDPAByJenis?jenis=program`);
	const modifier = {
		kode_rek_kegiatan: { show: false },
		kode_rek_sub_kegiatan: { show: false },
		kode_rek_rincian_sub_kegiatan: { show: false },
		id_kode_rekening: { show: false },
		no_dpa: { alias: 'Nomor & Tanggal DPA-SKPD/DPPA-SKPD/DPA.L-SKPD' },
		anggaran: { show: false },
		jenis_pekerjaan: { show: false }
	};
</script>

{#await source}
	<div>loading...</div>
{:then data}
	<Table {data} {modifier}>
		<svelte:fragment slot="head">
			<th>List Kegiatan</th>
		</svelte:fragment>
		<svelte:fragment slot="body">
			<td><button>Lihat Kegiatan</button></td>
		</svelte:fragment>
	</Table>
{/await}
