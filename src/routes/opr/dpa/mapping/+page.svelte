<script>
	// @ts-nocheck

	import Table from '$lib/table/table.svelte';
	import Modal from '$lib/modal/modal.svelte';
	import Icon from '@iconify/svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import Row from '$lib/table/row.svelte';
	import Select from '$lib/form/select.svelte';
	import Currency from '$lib/form/currency.svelte';
	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import { snack } from '$lib/js/vanilla.js';
	import { getYearsSince } from '$lib/js/datetime.js';
	import { setModifierHidden, setModifierShown } from '$lib/js/modifier';
	import Year from '$lib/shortcut/year.svelte';
	import Send from '$lib/shortcut/send.svelte';

	export let data;
	const { barebone, dpa, bidang, jenis, userBidang } = data;
	let modal;

	let sourceAPI = `getListDataDPAByJenis?`;
	let subPage = 'program';
	let subPages = ['program', 'kegiatan', 'sub_kegiatan', 'rincian_sub_kegiatan', 'nama_pekerjaan'];

	let tahun = '';

	$: source = fiero(
		`/operator/${sourceAPI}jenis=${subPage}&id_bidang=${userBidang}&tanggal=${tahun}`
	);

	let modifier = {
		no_dpa: { alias: 'Nomor DPA', show: true },
		kode_rek_program: { show: true },
		kode_rek_kegiatan: { show: false },
		kode_rek_sub_kegiatan: { show: false },
		kode_rek_rincian_sub_kegiatan: { show: false },
		id_kode_rekening: { show: false },
		anggaran: { show: false },
		jenis_pekerjaan: { show: false },
		bidang: { show: true },
		tanggal_dpa: { show: true }
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
				'tanggal_dpa',
				'kode_rek_sub_kegiatan',
				'kode_rek_rincian_sub_kegiatan'
			]);
		} else if (sub === 'sub_kegiatan') {
			modifier = setModifierShown(modifier, ['kode_rek_kegiatan', 'kode_rek_sub_kegiatan']);
			modifier = setModifierHidden(modifier, [
				'no_dpa',
				'tanggal_dpa',
				'kode_rek_rincian_sub_kegiatan'
			]);
		} else if (sub === 'rincian_sub_kegiatan') {
			modifier = setModifierShown(modifier, [
				'kode_rek_kegiatan',
				'kode_rek_sub_kegiatan',
				'kode_rek_rincian_sub_kegiatan'
			]);
			modifier = setModifierHidden(modifier, ['no_dpa', 'bidang', 'jenis_pekerjaan']);
		} else if (sub === 'nama_pekerjaan') {
			modifier = setModifierShown(modifier, [
				'kode_rek_kegiatan',
				'kode_rek_sub_kegiatan',
				'kode_rek_rincian_sub_kegiatan',
				'jenis_pekerjaan'
			]);
			modifier = setModifierHidden(modifier, ['tanggal_dpa', 'no_dpa', 'bidang']);
		}
	}

	let currentRekening = '';
	$: buttons = [
		{
			head: `List ${formatTitle(subPages[subPages.findIndex((str) => str === subPage) + 1] ?? '')}`,
			body: `Lihat ${formatTitle(
				subPages[subPages.findIndex((str) => str === subPage) + 1] ?? ''
			)}`,
			icon: 'bi:eye',
			action: (id, data) => {
				currentRekening = data[`kode_rek_${subPage}`];
				changeSubPage(
					subPages[subPages.findIndex((str) => str === subPage) + 1],
					`getChildDPA?id=${id}&`
				);
			},
			idKey: `id_kode_rekening`
		},
		{
			head: 'Aksi',
			body: 'Hapus',
			icon: 'bi:trash',
			color: 'red-1',
			textColor: 'white',
			action: (id) => {
				snack.confirm('Anda yakin ingin menghapus data ini?', async function () {
					const res = await fiero(`/operator/deleteDataMapping`, 'POST', { id });
					if (res?.status === 200) {
						snack.info(`Berhasil menghapus data`);
						changeSubPage(subPage);
						source = fiero(
							`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=${subPage}`
						);
					} else snack.info('Gagal menghapus data.');
				});
			},
			idKey: 'id_kode_rekening'
		}
	];

	$: {
		if (subPage === 'nama_pekerjaan') buttons = [buttons[1]];
	}

	let selected = {
		program: {},
		kegiatan: {},
		sub_kegiatan: {},
		rincian_sub_kegiatan: {},
		nama_pekerjaan: {}
	};
</script>

<div class="flex items-center justify-between mb-2">
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
		<button
			on:click={async () => {
				selected[subPage] = await JSON.parse(JSON.stringify(barebone[subPage]));

				if (subPage === 'kegiatan') selected[subPage]['kode_rekening_program'] = currentRekening;
				else if (subPage === 'sub_kegiatan')
					selected[subPage]['kode_rekening_kegiatan'] = currentRekening;
				else if (subPage === 'rincian_sub_kegiatan')
					selected[subPage]['kode_rekening_sub_kegiatan'] = currentRekening;
				else if (subPage === 'nama_pekerjaan')
					selected[subPage]['kode_rekening_rincian_sub_kegiatan'] = currentRekening;

				modal.open();
			}}
		>
			<Icon icon="bi:plus" />
			Tambah {formatTitle(subPage)}
		</button>
	</div>
</div>

<div class="flex items-center justify-end gap-2">
	<Year bind:year={tahun} />
</div>

{#await source}
	<Skeleton />
{:then data}
	<Table {data} {modifier} {buttons} />
{:catch err}
	<div>{err}</div>
{/await}

<Modal bind:this={modal}>
	<h1>Tambah {formatTitle(subPage)}</h1>
	<br />

	{#if subPage === 'program'}
		<Row number="1" title="Nomor DPA">
			<Select
				bind:key={selected.program.nomor_dpa}
				data={dpa}
				config={{ key: 'nomor_dpa', title: 'nomor_dpa' }}
				on:linkup={(data) => {
					selected.program.tanggal_dpa =
						dpa.find((d) => d.nomor_dpa === selected.program.nomor_dpa)?.tanggal_dpa ?? '';

					const _dpa = data.detail.data;
					const _key = data.detail.key;
					selected.program.id_parent = _dpa.find((x) => x.nomor_dpa === _key).id;
				}}
			/>
		</Row>

		<Row number="" title="Tanggal DPA">
			<input type="date" bind:value={selected.program.tanggal_dpa} disabled class="disabled" />
		</Row>

		<Row number="2" title="Bidang">
			<Select
				bind:key={selected.program.bidang}
				data={bidang}
				config={{ key: 'id', title: 'nama_bidang' }}
			/>
		</Row>

		<Row number="3" title="Kode Rekening & Uraian Program">
			<svelte:fragment>
				<input type="text" bind:value={selected.program.kode_rekening} />
				<span>/</span>
				<input type="text" bind:value={selected.program.uraian_program} />
			</svelte:fragment>
		</Row>

		<Row number="4" title="Pagu Anggaran">
			<Currency bind:value={selected.program.anggaran} />
		</Row>

		<br />
		<button
			on:click={async () => {
				console.log({
					jenis: subPage,
					no_dpa: selected.program.nomor_dpa,
					uraian: selected.program.uraian_program,
					...selected.program
				});
				try {
					const res = await fiero(`/operator/insertDataMapping`, 'POST', {
						jenis: subPage,
						no_dpa: selected.program.nomor_dpa,
						uraian: selected.program.uraian_program,
						...selected.program
					});
					if (res.status === 200) snack.info('Berhasil menambah program baru');
					else snack.info('Kesalahan isian data');
				} catch (err) {
					console.log(err);
					snack.info('Terjadi kesalahan');
				} finally {
					modal.close();
					changeSubPage('program');
					source = fiero(
						`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=${subPage}`
					);
				}
			}}
		>
			Simpan
		</button>
	{:else if subPage === 'kegiatan'}
		<Row number="1" title="Kode Rekening Program">
			{#await fiero(`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=program`) then data}
				<Select
					bind:key={selected.kegiatan.kode_rekening_program}
					{data}
					config={{ key: 'kode_rek_program', title: 'kode_rek_program' }}
					on:linkup={async () => {
						const list = await fiero(
							`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=kegiatan`
						);
						const num =
							list.filter((x) => x.kode_rek_program === selected.kegiatan.kode_rekening_program)
								.length + 1;
						selected.kegiatan.kode_rekening = selected.kegiatan.kode_rekening_program + `.${num}`;

						selected.kegiatan.id_parent =
							data.find((x) => x.kode_rek_program === selected.kegiatan.kode_rekening_program)
								?.id_kode_rekening ?? 0;
					}}
				/>
			{/await}
		</Row>

		<Row number="2" title="Kode Rekening & Uraian Kegiatan">
			<svelte:fragment>
				<input type="text" bind:value={selected.kegiatan.kode_rekening} />
				<span>/</span>
				<input type="text" bind:value={selected.kegiatan.uraian} />
			</svelte:fragment>
		</Row>

		<Row number="3" title="Anggaran Kegiatan">
			<Currency bind:value={selected.kegiatan.anggaran} />
		</Row>

		<br />
		<button
			on:click={async () => {
				try {
					const res = await fiero(`/operator/insertDataMapping`, 'POST', {
						jenis: subPage,
						...selected.kegiatan
					});
					if (res.status === 200) {
						snack.info('Berhasil menambah kegiatan baru');
					} else snack.info('Kesalahan isian data');
				} catch (err) {
					console.log(err);
					snack.info('Terjadi Kesalahan');
				} finally {
					modal.close();
					changeSubPage('kegiatan');
					source = fiero(
						`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=${subPage}`
					);
				}
			}}
		>
			Simpan
		</button>
	{:else if subPage === 'sub_kegiatan'}
		<Row number="1" title="Kode Rekening Kegiatan">
			{#await fiero(`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=kegiatan`) then data}
				<Select
					bind:key={selected.sub_kegiatan.kode_rekening_kegiatan}
					{data}
					config={{ key: 'kode_rek_kegiatan', title: 'kode_rek_kegiatan' }}
					on:linkup={async () => {
						const list = await fiero(
							`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=sub_kegiatan`
						);
						const num =
							list.filter(
								(x) => x.kode_rek_kegiatan === selected.sub_kegiatan.kode_rekening_kegiatan
							).length + 1;

						selected.sub_kegiatan.kode_rekening =
							selected.sub_kegiatan.kode_rekening_kegiatan + `.${num}`;

						selected.sub_kegiatan.id_parent =
							data.find((x) => x.kode_rek_kegiatan === selected.sub_kegiatan.kode_rekening_kegiatan)
								?.id_kode_rekening ?? 0;
					}}
				/>
			{/await}
		</Row>

		<Row number="2" title="Kode Rekening & Uraian Sub Kegiatan">
			<svelte:fragment>
				<input type="text" bind:value={selected.sub_kegiatan.kode_rekening} />
				<span>/</span>
				<input type="text" bind:value={selected.sub_kegiatan.uraian} />
			</svelte:fragment>
		</Row>

		<Row number="3" title="Anggaran Sub Kegiatan">
			<Currency bind:value={selected.sub_kegiatan.anggaran} />
		</Row>

		<br />
		<button
			on:click={async () => {
				const res = await fiero(`/operator/insertDataMapping`, 'POST', {
					jenis: subPage,
					...selected.sub_kegiatan
				});
				if (res.status === 200) {
					snack.info('Berhasil menambah sub kegiatan baru');
				} else snack.info('Kesalahan isian data');
			}}
		>
			Simpan
		</button>
	{:else if subPage == 'rincian_sub_kegiatan'}
		<Row number="1" title="Kode Rekening Sub Kegiatan">
			{#await fiero(`/operator/getListDataDPAByJenisForInsert?id_bidang=${userBidang}&jenis=sub_kegiatan`) then data}
				<Select
					bind:key={selected.rincian_sub_kegiatan.kode_rekening_sub_kegiatan}
					{data}
					config={{ key: 'kode_rek_sub_kegiatan', title: 'uraian' }}
					on:linkup={async () => {
						const list = await fiero(
							`/operator/getListDataDPAByJenisForInsert?id_bidang=${userBidang}&jenis=rincian_sub_kegiatan`
						);
						// console.log(list);
						const num =
							list.filter(
								(x) =>
									x.kode_rek_sub_kegiatan ===
									selected.rincian_sub_kegiatan.kode_rekening_sub_kegiatan
							).length + 1;

						selected.rincian_sub_kegiatan.kode_rekening =
							selected.rincian_sub_kegiatan.kode_rekening_sub_kegiatan + `.${num}`;

						selected.rincian_sub_kegiatan.id_parent =
							data.find(
								(x) =>
									x.kode_rek_sub_kegiatan ===
									selected.rincian_sub_kegiatan.kode_rekening_sub_kegiatan
							)?.id_kode_rekening ?? 0;
					}}
				/>
			{/await}
		</Row>

		<Row number="2" title="Kode Rekening & Uraian Rincian Sub Kegiatan">
			<svelte:fragment>
				<input type="text" bind:value={selected.rincian_sub_kegiatan.kode_rekening} />
				<span>/</span>
				<input type="text" bind:value={selected.rincian_sub_kegiatan.uraian} />
			</svelte:fragment>
		</Row>

		<Row number="3" title="Anggaran Rincian Sub Kegiatan">
			<Currency bind:value={selected.rincian_sub_kegiatan.anggaran} />
		</Row>

		<br />
		<button
			on:click={async () => {
				const res = await fiero(`/operator/insertDataMapping`, 'POST', {
					jenis: subPage,
					...selected.rincian_sub_kegiatan
				});
				if (res.status === 200) {
					snack.info('Berhasil menambah rincian sub kegiatan baru');
				} else snack.info('Kesalahan isian data');
			}}
		>
			Simpan
		</button>
	{:else if subPage == 'nama_pekerjaan'}
		<Row number="1" title="Kode Rekening Rincian Sub Kegiatan">
			{#await fiero(`/operator/getListDataDPAByJenisForInsert?id_bidang=${userBidang}&jenis=rincian_sub_kegiatan`) then data}
				<Select
					bind:key={selected.nama_pekerjaan.kode_rekening_rincian_sub_kegiatan}
					{data}
					config={{ key: 'kode_rek_rincian_sub_kegiatan', title: 'kode_rek_rincian_sub_kegiatan' }}
					on:linkup={async () => {
						const list = await fiero(
							`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=nama_pekerjaan`
						);
						const num =
							list.filter(
								(x) =>
									x.kode_rek_sub_kegiatan === selected.nama_pekerjaan.kode_rekening_sub_kegiatan
							).length + 1;

						selected.nama_pekerjaan.kode_rekening =
							selected.nama_pekerjaan.kode_rekening_rincian_sub_kegiatan + `.${num}`;

						selected.nama_pekerjaan.id_parent =
							data.find(
								(x) =>
									x.kode_rek_rincian_sub_kegiatan ===
									selected.nama_pekerjaan.kode_rekening_rincian_sub_kegiatan
							)?.id_kode_rekening ?? 0;
					}}
				/>
			{/await}
		</Row>

		<Row number="2" title="Jenis Kegiatan">
			<Select
				bind:key={selected.nama_pekerjaan.jenis_pekerjaan}
				data={jenis}
				config={{ key: 'id', title: 'jenis_proyek' }}
			/>
		</Row>

		<Row number="3" title="Uraian Pekerjaan">
			<svelte:fragment>
				<input type="text" bind:value={selected.nama_pekerjaan.uraian} />
			</svelte:fragment>
		</Row>

		<Row number="4" title="Anggaran Pekerjaan">
			<Currency bind:value={selected.nama_pekerjaan.anggaran} />
		</Row>

		<Row number="5" title="Keterangan Pekerjaan">
			<textarea bind:value={selected.nama_pekerjaan.keterangan} />
		</Row>

		<Row number="6" title="PPK">
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select
					bind:key={selected.nama_pekerjaan.ppk}
					{data}
					config={{ key: 'id', title: 'nama', title2: 'nip' }}
				/>
			{/await}
		</Row>

		<Row number="7" title="Staf Pengelola">
			{#await fiero(`/operator/getAllUserOperator`) then data}
				<Select
					bind:key={selected.nama_pekerjaan.staf_pengelola}
					{data}
					config={{ key: 'id', title: 'nama', title2: 'nip' }}
				/>
			{/await}
		</Row>

		<Row number="8" title="Sumber Dana">
			<button
				on:click={() => {
					selected.nama_pekerjaan.sumber_dana_dummy = [
						...selected.nama_pekerjaan.sumber_dana_dummy,
						{ sumber_dana: '', nilai: 0 }
					];
				}}
				class="text-sm w-fit"
			>
				<Icon icon="bi:plus" />
				Tambah
			</button>
		</Row>

		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Sumber Dana</th>
					<th>Nilai</th>
					<th>Aksi</th>
				</tr>
			</thead>
			<tbody>
				{#each selected.nama_pekerjaan.sumber_dana_dummy ?? [{ sumber_dana: '', nilai: 0 }] as { sumber_dana, nilai }, i (i)}
					<tr>
						<td>{i + 1}</td>
						<td>
							{#await fiero(`/operator/getListSumberDana`) then data}
								<Select
									key={sumber_dana}
									{data}
									config={{ key: 'id', title: 'nama' }}
									on:linkup={(data) => {
										sumber_dana = data.detail.key;
									}}
								/>
							{/await}
						</td>
						<td>
							<Currency
								value={nilai}
								on:linkup={(data) => {
									nilai = data.detail.value;
								}}
							/>
						</td>
						<td>
							<button
								on:click={() => {
									selected.nama_pekerjaan.sumber_dana_dummy =
										selected.nama_pekerjaan.sumber_dana_dummy.filter((x, idx) => idx !== i);
								}}
								class="p-1 bg-red-1 text-white-1"
							>
								<Icon icon="bi:trash" />
							</button>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="6" class="italic text-center">belum ada sumber dana</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<br />
		<Send
			on:click={async () => {
				selected.nama_pekerjaan.sumber_dana = JSON.stringify(
					selected.nama_pekerjaan.sumber_dana_dummy
				);

				try {
					const res = await fiero(`/operator/insertDataMapping`, 'POST', {
						jenis: subPage,
						...selected.nama_pekerjaan
					});

					if (res.status === 200) snack.info('Berhasil menambah nama pekerjaan baru');
					else snack.info('Kesalahan isian data.');
				} catch (err) {
					snack.info('Terjadi kesalahan.');
				} finally {
					modal.close();
					changeSubPage('nama_pekerjaan');
					source = fiero(
						`/operator/getListDataDPAByJenis?id_bidang=${userBidang}&jenis=${subPage}`
					);
				}
			}}
		/>
	{/if}
</Modal>
