<script>
	// @ts-nocheck

	import Table from '$lib/table/table.svelte';
	import Modal from '$lib/modal/modal.svelte';
	import Icon from '@iconify/svelte';
	import Skeleton from '$lib/table/skeleton.svelte';
	import { fiero } from '$lib/js/fiero';
	import { formatTitle } from '$lib/js/string';
	import { setModifierHidden, setModifierShown } from '$lib/js/modifier';
	import Row from '$lib/table/row.svelte';
	import Select from '$lib/form/select.svelte';
	import Currency from '$lib/form/currency.svelte';
	import { snack } from '$lib/js/vanilla.js';

	export let data;
	const { barebone, dpa, bidang, jenis } = data;

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

	let selected = { program: {}, kegiatan: {}, sub_kegiatan: {}, rincian_sub_kegiatan: {} };
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
			on:click={() => {
				selected[subPage] = JSON.parse(JSON.stringify(barebone[subPage]));
				modal.open();
			}}
		>
			<Icon icon="bi:plus" />
			Tambah {formatTitle(subPage)}
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
	<h1>Tambah {formatTitle(subPage)}</h1>
	<br />

	{#if subPage === 'program'}
		<Row number="1" title="Nomor DPA">
			<Select
				bind:key={selected.program.nomor_dpa}
				data={dpa}
				config={{ key: 'nomor_dpa', title: 'nomor_dpa' }}
				onChange={() => {
					selected.program.tanggal_dpa =
						dpa.find((d) => d.nomor_dpa === selected.program.nomor_dpa)?.tanggal_dpa ?? '';
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

		<Row number="4" title="Anggaran Program">
			<Currency bind:value={selected.program.anggaran} />
		</Row>

		<br />
		<button
			on:click={async () => {
				const res = await fiero(`/operator/insertDataMapping`, 'POST', {
					jenis: subPage,
					no_dpa: selected.program.nomor_dpa,
					uraian: selected.program.uraian_program,
					...selected.program
				});
				if (res.status === 200) {
					snack.info('Berhasil menambah program baru');
					modal.close();
					changeSubPage('program');
					source = fiero(`/operator/getListDataDPAByJenis?jenis=${subPage}`);
				}
			}}
		>
			Simpan
		</button>
	{:else if subPage === 'kegiatan'}
		<Row number="1" title="Kode Rekening Program">
			{#await fiero(`/operator/getListDataDPAByJenis?jenis=program`) then data}
				<Select
					bind:key={selected.kegiatan.kode_rekening_program}
					{data}
					config={{ key: 'kode_rek_program', title: 'kode_rek_program' }}
					onChange={async () => {
						const list = await fiero(`/operator/getListDataDPAByJenis?jenis=kegiatan`);
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
				const res = await fiero(`/operator/insertDataMapping`, 'POST', {
					jenis: subPage,
					...selected.kegiatan
				});
				if (res.status === 200) {
					snack.info('Berhasil menambah kegiatan baru');
					modal.close();
					changeSubPage('kegiatan');
					source = fiero(`/operator/getListDataDPAByJenis?jenis=${subPage}`);
				}
			}}
		>
			Simpan
		</button>
	{:else if subPage === 'sub_kegiatan'}
		<Row number="1" title="Kode Rekening Kegiatan">
			{#await fiero(`/operator/getListDataDPAByJenis?jenis=kegiatan`) then data}
				<Select
					bind:key={selected.sub_kegiatan.kode_rekening_kegiatan}
					{data}
					config={{ key: 'kode_rek_kegiatan', title: 'kode_rek_kegiatan' }}
					onChange={async () => {
						const list = await fiero(`/operator/getListDataDPAByJenis?jenis=sub_kegiatan`);
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
					modal.close();
					changeSubPage('sub_kegiatan');
					source = fiero(`/operator/getListDataDPAByJenis?jenis=${subPage}`);
				}
			}}
		>
			Simpan
		</button>
	{:else}
		<Row number="1" title="Kode Rekening Sub Kegiatan">
			{#await fiero(`/operator/getListDataDPAByJenis?jenis=sub_kegiatan`) then data}
				<Select
					bind:key={selected.rincian_sub_kegiatan.kode_rekening_sub_kegiatan}
					{data}
					config={{ key: 'kode_rek_sub_kegiatan', title: 'kode_rek_sub_kegiatan' }}
					onChange={async () => {
						const list = await fiero(`/operator/getListDataDPAByJenis?jenis=rincian_sub_kegiatan`);
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

		<Row number="2" title="Jenis Kegiatan">
			<Select
				bind:key={selected.rincian_sub_kegiatan.jenis_pekerjaan}
				data={jenis}
				config={{ key: 'id', title: 'jenis_proyek' }}
			/>
		</Row>

		<Row number="3" title="Kode Rekening & Uraian Rincian  Sub Kegiatan">
			<svelte:fragment>
				<input type="text" bind:value={selected.rincian_sub_kegiatan.kode_rekening} />
				<span>/</span>
				<input type="text" bind:value={selected.rincian_sub_kegiatan.uraian} />
			</svelte:fragment>
		</Row>

		<Row number="4" title="Anggaran Rincian Sub Kegiatan">
			<Currency bind:value={selected.rincian_sub_kegiatan.anggaran} />
		</Row>

		<Row number="5" title="Keterangan Rincian Sub Kegiatan">
			<textarea bind:value={selected.rincian_sub_kegiatan.keterangan} />
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
					modal.close();
					changeSubPage('rincian_sub_kegiatan');
					source = fiero(`/operator/getListDataDPAByJenis?jenis=${subPage}`);
				}
			}}
		>
			Simpan
		</button>
	{/if}
</Modal>
