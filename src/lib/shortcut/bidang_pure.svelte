<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { userInfo } from '$lib/stores/stores';
	import { onMount } from 'svelte';

	export let bidang = '';

	let bidangDisplay = '';
	onMount(async () => {
		if ($userInfo.jabatan == 2) {
			const data = await fiero(`/operator/getAllBidangProyek`);
			const target = data.find((x) => x.id == $userInfo.bidang);
			bidangDisplay = target.nama_bidang;
			bidang = [target.kode_bidang, target.nama_bidang];
		}
	});
</script>

<div class="w-32">
	{#if $userInfo.jabatan == 2}
		<input bind:value={bidangDisplay} type="text" disabled />
	{:else}
		{#await fiero(`/operator/getAllBidangProyek`) then data}
			<select bind:value={bidang}>
				<option value="">Semua Bidang</option>
				{#each data as d}
					<option value={[d.kode_bidang, d.nama_bidang]}>{d.nama_bidang}</option>
				{/each}
			</select>
		{/await}
	{/if}
</div>
