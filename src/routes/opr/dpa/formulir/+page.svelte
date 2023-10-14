<script>
	// @ts-nocheck

	import Rincian from './rincian.svelte';
	import Formulir from './formulir.svelte';
	import { fiero } from '$lib/js/fiero';

	export let data;
	const { rincianData, listMitra, userId, userJabatan, userBidang } = data;

	let subPage = 'rincian';

	let formulirData = {};
	let formulirOrigin = 'Semua';
</script>

<div class="flex items-center justify-end gap-4">
	<button
		on:click={() => {
			subPage = 'rincian';
		}}
		class:active={subPage === 'rincian'}
		class="subpage">Rincian Sub Kegiatan</button
	>
	<button
		on:click={async () => {
			const apiUrl = `/operator/getListFormPenyediaJasa?id_operator=${userId}&id_jabatan=${userJabatan}&id_bidang=${userBidang}`;
			formulirData = {
				formulir_baru: (await fiero(apiUrl + `&mode=formulir_baru`)) ?? [],
				menunggu: (await fiero(apiUrl + `&mode=menunggu`)) ?? [],
				selesai: (await fiero(apiUrl + `&mode=selesai`)) ?? []
			};

			formulirOrigin = 'Semua';

			subPage = 'formulir';
		}}
		class:active={subPage === 'formulir'}
		class="subpage">Formulir Penyedia Jasa</button
	>
</div>

<br />

{#if subPage === 'rincian'}
	<Rincian
		on:list={(_data) => {
			const { data, origin } = _data.detail;
			formulirData = data;
			formulirOrigin = origin;
			subPage = 'formulir';
		}}
		{rincianData}
		{listMitra}
	/>
{:else}
	<Formulir data={formulirData} origin={formulirOrigin} />
{/if}
