<script>
	import { fiero } from '$lib/js/fiero';

	export let bidang = '';
</script>

{#await fiero(`/operator/getAllBidangProyek`) then data}
	<div class="w-32">
		<select bind:value={bidang}>
			<option value="">Semua Bidang</option>
			{#each data as d}
				<option value={[d.kode_bidang, d.nama_bidang]}>{d.nama_bidang}</option>
			{/each}
		</select>
	</div>
{/await}
