<script>
	import { fiero } from '$lib/js/fiero';

	export let kategori = '';
</script>

{#await fiero(`/operator/getListPersediaanAset`) then data}
	<div class="w-32">
		<select bind:value={kategori}>
			<option value="">Semua Kategori</option>
			{#each data as d}
				<option value={[d.id, d.nama_barang]}>{d.nama_barang}</option>
			{/each}
		</select>
	</div>
{/await}
