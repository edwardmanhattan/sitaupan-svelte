<script>
	// @ts-nocheck
	import Select from '$lib/form/select.svelte';

	import { fiero } from '$lib/js/fiero';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatTitle } from '$lib/js/string';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	import { scale } from 'svelte/transition';
	let modal;

	let source = fiero(`/operator/getAllUserOperator`);

	let modifier = {
		id: { show: false },
		foto: { show: false },
		status: { show: false },
		privilege: { show: false },
		id_jabatan: { show: false },
		id_bidang: { show: false }
	};

	let modalModifier = {
		pageNum: { show: false }
	};

	let buttons = [
		{
			head: 'Aksi',
			icon: 'mdi:pencil',
			action: (_, obj) => {
				selected = obj;
				modal.open();
			}
		}
	];

	let selected = {};
	let privilegeSelected = [];
</script>

<div class="flex items-center justify-between">
	<h1>User Operator</h1>
	<div>
		<button
			on:click={async () => {
				selected = {
					id: 0,
					nama: '',
					username: '',
					password: '',
					no_telepon: '',
					nip: '',
					id_jabatan: [],
					id_bidang: 0,
					gender: 'Pria'
				};
				modal.open();
			}}
		>
			<Icon icon="bi:plus" />
			Tambah
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

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modal}>
	<h1>User Operator</h1>

	<label>Nama</label>
	<input type="text" bind:value={selected.nama} />
	<br />

	<label>Username</label>
	<input type="text" bind:value={selected.username} />
	<br />

	<label>Password</label>
	<input type="password" bind:value={selected.password} />
	<br />

	<label>No Telepon</label>
	<input type="text" bind:value={selected.no_telepon} />
	<br />

	<label>NIP</label>
	<input type="text" bind:value={selected.nip} />
	<br />

	<label>Jenis Kelamin</label>
	<select bind:value={selected.gender}>
		<option value="Pria">Pria</option>
		<option value="Wanita">Wanita</option>
	</select>

	<label>Jabatan</label>
	{#await fiero(`/operator/getAllJabatan`) then data}
		<Select bind:key={selected.id_jabatan} {data} config={{ key: 'id', title: 'nama_jabatan' }} />
	{/await}

	<label>Bidang</label>
	{#await fiero(`/operator/getAllBidangProyek`) then data}
		<Select bind:key={selected.id_bidang} {data} config={{ key: 'id', title: 'nama_bidang' }} />
	{/await}

	<label>Privilege Tambahan</label>
	{#await fiero(`/operator/getAllJabatan?privilege=true`) then priv}
		<div class="grid grid-cols-4 gap-2 my-1">
			{#each priv as p}
				<label>
					<input
						type="checkbox"
						checked={privilegeSelected.includes(p.id)}
						on:change={() => {
							if (privilegeSelected.includes(p.id))
								privilegeSelected = privilegeSelected.filter((x) => x !== p.id);
							else privilegeSelected = [...privilegeSelected, p.id];
						}}
					/>
					{p.nama_jabatan}
				</label>
			{/each}
		</div>
	{/await}

	<br />
	<br />
	<button
		on:click={async () => {
			let url = 'insert';
			if (selected.id !== 0) url = 'update';
			const res = await fiero(`/operator/${url}UserOperator`, 'POST', selected);
			if (res.status === 200) {
				if (selected.id === 0) snack.info('Berhasil menambah User Operator baru');
				else snack.info('Berhasil mengubah informasi User Operator');
			} else snack.info('Terjadi Kesalahan');
			source = fiero(`/operator/getAllUserOperator`);
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
