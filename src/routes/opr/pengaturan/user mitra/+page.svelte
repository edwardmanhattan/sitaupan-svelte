<script>
	// @ts-nocheck

	import { fiero } from '$lib/js/fiero';
	import { getKeyModifier, shownKeyModifier } from '$lib/js/modifier';
	import { formatTitle } from '$lib/js/string';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Table from '$lib/table/table.svelte';
	import Icon from '@iconify/svelte';
	let modal;

	let source = fiero(`/operator/getAllUserMitra`);

	let modifier = {
		id: { show: false },
		foto_ktp: { show: false },
		foto: { show: false },
		status: { show: false },
		privilege: { show: false }
	};

	let modalModifier = {
		pageNum: { show: false }
	};

	let buttons = [
		{
			head: 'Edit',
			icon: 'mdi:pencil',
			action: (_, obj) => {
				selected = obj;
				modal.open();
			}
		}
	];

	let selected = {};
</script>

<div class="flex items-center justify-between">
	<h1>User Mitra</h1>
	<div>
		<button
			on:click={async () => {
				selected = {
					id: 0,
					nama: '',
					username: '',
					password: '',
					nama_perusahaan: '',
					no_telepon: '',
					email: ''
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
	<h1>User Mitra</h1>

	<label>Nama</label>
	<input type="text" bind:value={selected.nama} />
	<br />

	<label>Username</label>
	<input type="text" bind:value={selected.username} />
	<br />

	<label>Password</label>
	<input type="password" bind:value={selected.password} />
	<br />

	<label>Email</label>
	<input type="email" bind:value={selected.email} />
	<br />

	<label>Nama Perusahaan</label>
	<input type="text" bind:value={selected.nama_perusahaan} />
	<br />

	<label>No. Telepon</label>
	<input type="text" bind:value={selected.no_telepon} />

	<br />
	<br />
	<button
		on:click={async () => {
			let url = 'insert';
			if (selected.id !== 0) url = 'update';
			const res = await fiero(`/operator/${url}UserMitra`, 'POST', selected);
			if (res.status === 200) {
				if (selected.id === 0) snack.info('Berhasil menambah User Mitra baru');
				else snack.info('Berhasil mengubah informasi User Mitra');
			} else snack.info('Terjadi Kesalahan');
			source = fiero(`/operator/getAllUserMitra`);
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>
