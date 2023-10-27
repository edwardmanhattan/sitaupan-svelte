<script>
	// @ts-nocheck

	import logo from '$lib/assets/logo.webp';
	import Menu from './menu.svelte';

	export let privilege = { userJabatan: 17 };

	privilege.userJabatan ??= 17;

	function checkJabatan(arr = []) {
		arr = [...arr, 17];
		for (const a of arr) {
			if (privilege?.userJabatan?.toString() === a?.toString()) return true;
		}
		return false;
	}
</script>

<div class="flex flex-col h-screen gap-4 py-5 font-semibold text-teal-950 w-fit bg-blue-2">
	<div class="grid mx-auto place-items-center w-fit">
		<img src={logo} alt="Logo App Invest" class="w-28" />
	</div>
	<nav class="flex flex-col text-sm grow">
		<Menu
			anchor="Beranda"
			icon="streamline:interface-home-2-door-entrance-home-house-map-roof-round"
			href="/opr"
		/>

		{#if checkJabatan([2, 11, 12, 16])}
			<Menu
				anchor="DPA"
				icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
			>
				{#if checkJabatan([2])}
					<Menu
						anchor="Mapping DPA"
						href="/opr/dpa/mapping"
						icon="streamline:interface-file-clipboard-add-edit-task-edition-add-clipboard-form"
					/>
				{/if}

				{#if checkJabatan([2, 12])}
					<Menu
						anchor="Pembuatan Formulir"
						href="/opr/dpa/formulir"
						icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form"
					/>
				{/if}

				{#if checkJabatan([2, 12, 16])}
					<Menu
						anchor="Daftar Kegiatan"
						href="/opr/dpa/daftar"
						icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
					/>
				{/if}

				{#if checkJabatan([11])}
					<Menu
						anchor="Serah Terima Berkas"
						href="/opr/dpa/stb"
						icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form"
					/>
				{/if}

				{#if checkJabatan([2])}
					<Menu
						anchor="Tim Kegiatan"
						href="/opr/dpa/tim"
						icon="streamline:interface-user-multiple-close-geometric-human-multiple-person-up-user"
					/>
				{/if}
			</Menu>
		{/if}

		{#if checkJabatan([21])}
			<Menu
				anchor="BPJS Ketenagakerjaan"
				href="/opr/files/bpjs"
				icon="streamline:interface-add-square-square-remove-cross-buttons-add-plus-button"
			/>
		{/if}

		<Menu
			anchor="Bidang Akuntansi BPKAD"
			href="/opr/laporan/bpkad"
			icon="streamline:interface-file-bookmark-text-common-bookmark"
		/>

		{#if checkJabatan([2, 5, 18])}
			<Menu
				anchor="Inspektorat"
				icon="streamline:interface-edit-zoom-in-enhance-glass-in-magnify-magnifying-zoom"
				childPos="8"
			>
				<Menu anchor="Lampiran 1C Belanja Modal" href="/opr/laporan/lampiran_modal" />
				<Menu anchor="Lampiran 1C Belanja Barang & Jasa" href="/opr/laporan/lampiran_barang" />
				<Menu anchor="Jaminan Uang Muka" href="/opr/files/aset/jaminan" />
				<Menu anchor="Daftar Hutang" href="/opr/files/hutang" />

				{#if checkJabatan([2, 18])}
					<Menu anchor="P3DN (Perencanaan)" href="/opr/files/inspektorat/p3dn_perencanaan" />
					<Menu anchor="P3DN (Realisasi)" href="/opr/files/inspektorat/p3dn_realisasi" />
				{/if}

				{#if checkJabatan([5, 18])}
					<Menu anchor="Data Kontrak" href="/opr/files/inspektorat/data kontrak" />
					<Menu anchor="Bukti Bayar (SP2D)" href="/opr/files/inspektorat/sp2d" />
					<Menu anchor="SK" href="/opr/files/inspektorat/sk" />
					{#if checkJabatan([5, 18])}
						<Menu anchor="Realisasi Keuangan" href="/opr/files/inspektorat/realisasi_keuangan" />
					{/if}
					<Menu anchor="Serapan Anggaran" href="/opr/files/inspektorat/serapan_anggaran" />
					<Menu anchor="Capaian Realisasi" href="/opr/laporan/capaian" />
				{/if}
			</Menu>
		{/if}

		{#if checkJabatan()}
			<Menu
				anchor="Bidang Aset BPKAD"
				icon="streamline:interface-align-layers-1-design-layer-layers-pile-stack"
			>
				<Menu anchor="Aset Tetap" href="/opr/files/aset/tetap" />
				<Menu anchor="Persediaan" href="/opr/files/aset/persediaan" />
				<Menu anchor="Berita Acara Pembayaran" href="/opr/files/aset/bap" />
				<Menu anchor="KIB" href="/opr/files/aset/kib-a" childPos="6">
					<Menu anchor="KIB A" href="/opr/files/aset/kib-a" />
					<Menu anchor="KIB B" href="/opr/files/aset/kib-b" />
					<Menu anchor="KIB C" href="/opr/files/aset/kib-c" />
					<Menu anchor="KIB D" href="/opr/files/aset/kib-d" />
					<Menu anchor="KIB E" href="/opr/files/aset/kib-e" />
					<Menu anchor="KIB F" href="/opr/files/aset/kib-f" />
				</Menu>
			</Menu>
		{/if}

		{#if checkJabatan([19, 20])}
			<Menu
				anchor="Bidang Perbendaharaan BPKAD"
				icon="streamline:interface-edit-clip-binder-clip-clipper-company-office-supplies-work"
			>
				{#if checkJabatan([20])}
					<Menu
						anchor="Capaian Realisasi"
						href="/opr/laporan/capaian"
						icon="streamline:interface-file-bookmark-text-common-bookmark"
					/>
				{/if}

				{#if checkJabatan([19])}
					<Menu
						anchor="Uji Laboratorium"
						href="/opr/laporan/uji_lab"
						icon="streamline:interface-file-bookmark-text-common-bookmark"
					/>

					<Menu
						anchor="Sewa Alat Berat"
						href="/opr/laporan/alat_berat"
						icon="streamline:interface-file-bookmark-text-common-bookmark"
					/>
				{/if}
			</Menu>
		{/if}

		{#if checkJabatan()}
			<Menu
				anchor="Pengaturan"
				icon="streamline:interface-setting-slider-horizontal-adjustment-adjust-controls-fader-horizontal-settings-slider"
			>
				<!-- <Menu
					anchor="Pengaturan Umum"
					href="/"
					icon="streamline:interface-setting-cog-work-loading-cog-gear-settings-machine"
				/> -->
				<Menu
					anchor="Pengaturan Data"
					icon="streamline:computer-database-raid-storage-code-disk-programming-database-array-hard-disc"
				>
					<Menu anchor="Data Master" href="/opr/pengaturan/bidang kegiatan" childPos="12">
						<Menu anchor="Bidang Kegiatan" href="/opr/pengaturan/bidang kegiatan" />
						<Menu anchor="Jenis Kegiatan" href="/opr/pengaturan/jenis kegiatan" />
						<Menu anchor="Asal Kegiatan" href="/opr/pengaturan/asal kegiatan" />
						<Menu anchor="Kode Rekening" href="/opr/pengaturan/kode rekening" />
						<Menu anchor="Nomor DPA" href="/opr/pengaturan/nomor dpa" />
						<Menu anchor="Jabatan" href="/opr/pengaturan/jabatan" />
						<Menu anchor="Kategori Persediaan" href="/opr/pengaturan/persediaan" />
						<Menu anchor="Jenis Persediaan" href="/opr/pengaturan/jenis_persediaan" />
						<Menu anchor="Master Tim" href="/opr/pengaturan/master tim" />
						<Menu anchor="Sumber Dana" href="/opr/pengaturan/sumber dana" />
					</Menu>
					<Menu anchor="Data User" href="/opr/pengaturan/user operator">
						<Menu anchor="User Operator" href="/opr/pengaturan/user operator" />
						<Menu anchor="User Mitra" href="/opr/pengaturan/user mitra" />
					</Menu>
				</Menu>
			</Menu>
		{/if}

		<div class="mt-auto" />

		<Menu anchor="Logout" href="/logout" icon="basil:logout-solid" />
	</nav>
</div>

<style lang="postcss">
	@tailwind components;
	@layer components {
		a {
			@apply hover:underline;
		}
	}
</style>
