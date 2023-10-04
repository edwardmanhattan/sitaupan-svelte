<script>
	import logo from '$lib/assets/logo-white.webp';
	import Menu from './menu.svelte';
</script>

<div class="flex flex-col h-screen gap-4 py-5 text-white w-fit bg-black-1">
	<div class="grid mx-auto place-items-center w-fit">
		<img src={logo} alt="Logo App Invest" class="w-28" />
	</div>
	<nav class="flex flex-col text-sm grow">
		<Menu
			anchor="Beranda"
			href="/opr"
			icon="streamline:interface-home-2-door-entrance-home-house-map-roof-round"
		/>
		<Menu
			anchor="DPA"
			href="/opr/dpa/penambahan"
			icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
		>
			<Menu
				anchor="Mapping DPA"
				href="/opr/dpa/penambahan"
				icon="streamline:interface-file-clipboard-add-edit-task-edition-add-clipboard-form"
			/>
			<Menu
				anchor="Pembuatan Formulir"
				href="/opr/dpa/penyelesaian"
				icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form"
			/>
			<Menu
				anchor="Daftar Proyek"
				href="/opr/dpa/daftar"
				icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
			/>
			<Menu
				anchor="Pembuatan Serah Terima Berkas"
				href="/opr/dpa/stb"
				icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form"
			/>
			<Menu
				anchor="Tim Kegiatan"
				href="/opr/dpa/tim"
				icon="streamline:interface-user-multiple-close-geometric-human-multiple-person-up-user"
			/>
		</Menu>
		<Menu
			anchor="Data Files"
			href="/opr/files/bpjs"
			icon="streamline:interface-file-folder-work-office-company-folder-supplies-file"
		>
			<Menu
				anchor="BPJS Ketenagakerjaan"
				href="/opr/files/bpjs"
				icon="streamline:interface-add-square-square-remove-cross-buttons-add-plus-button"
			/>
			<Menu
				anchor="Daftar Hutang"
				href="/opr/files/hutang"
				icon="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance"
			/>
			<Menu
				anchor="Data Aset"
				href="/opr/files/aset/aset tetap"
				icon="streamline:interface-align-layers-1-design-layer-layers-pile-stack"
			>
				<Menu anchor="Aset Tetap" href="/opr/files/aset/tetap" />
				<Menu anchor="Persediaan" href="/opr/files/aset/persediaan" />
				<Menu anchor="Berita Acara Pembayaran" href="/opr/files/aset/bap" />
				<Menu anchor="KIB" href="/opr/files/aset/kib-a">
					<Menu anchor="KIB A" href="/opr/files/aset/kib-a" />
					<Menu anchor="KIB B" href="/opr/files/aset/kib-b" />
					<Menu anchor="KIB C" href="/opr/files/aset/kib-c" />
					<Menu anchor="KIB D" href="/opr/files/aset/kib-d" />
					<Menu anchor="KIB E" href="/opr/files/aset/kib-e" />
					<Menu anchor="KIB F" href="/opr/files/aset/kib-f" />
				</Menu>
				<Menu anchor="Jaminan Uang Muka" href="/opr/files/aset/jaminan" />
			</Menu>
			<Menu
				anchor="Inspektorat"
				href="/opr/files/inspektorat/p3dn perencanaan"
				icon="streamline:interface-edit-zoom-in-enhance-glass-in-magnify-magnifying-zoom"
			>
				<Menu anchor="P3DN (Perencanaan)" href="/opr/files/inspektorat/p3dn perencanaan" />
				<Menu anchor="P3DN (Realisasi)" href="/opr/files/inspektorat/p3dn realisasi" />
				<Menu anchor="Data Kontrak" href="/opr/files/inspektorat/data kontrak" />
				<Menu anchor="Bukti Bayar" href="/opr/files/inspektorat/bukti bayar" />
				<Menu anchor="SK" href="/opr/files/inspektorat/sk" />
				<Menu anchor="Realisasi Keuangan" href="/opr/files/inspektorat/realisasi keuangan" />
				<Menu anchor="Serapan Anggaran" href="/opr/files/inspektorat/serapan anggaran" />
			</Menu>
		</Menu>
		<Menu
			anchor="Laporan"
			href="/opr/laporan/capaian"
			icon="streamline:interface-edit-clip-binder-clip-clipper-company-office-supplies-work"
		>
			<Menu
				anchor="Capaian Realisasi"
				href="/opr/laporan/capaian"
				icon="streamline:interface-file-bookmark-text-common-bookmark"
			/>
			<Menu
				anchor="Lampiran"
				href="/opr/laporan/lampiran"
				icon="streamline:interface-file-bookmark-text-common-bookmark"
			/>
			<Menu
				anchor="Laporan BANKEU"
				href="/opr/laporan/bankeu"
				icon="streamline:interface-file-bookmark-text-common-bookmark"
			/>
			<Menu
				anchor="Laporan DAK"
				href="/opr/laporan/dak"
				icon="streamline:interface-file-bookmark-text-common-bookmark"
			/>
			<Menu
				anchor="Laporan DBH"
				href="/opr/laporan/dbh"
				icon="streamline:interface-file-bookmark-text-common-bookmark"
			/>
		</Menu>
		<Menu
			anchor="Pengaturan"
			href="/"
			icon="streamline:interface-setting-slider-horizontal-adjustment-adjust-controls-fader-horizontal-settings-slider"
		>
			<Menu
				anchor="Pengaturan Umum"
				href="/"
				icon="streamline:interface-setting-cog-work-loading-cog-gear-settings-machine"
			/>
			<Menu
				anchor="Pengaturan Data"
				href="/"
				icon="streamline:computer-database-raid-storage-code-disk-programming-database-array-hard-disc"
			>
				<Menu anchor="Data Master" href="/opr/pengaturan/bidang proyek">
					<Menu anchor="Bidang Proyek" href="/opr/pengaturan/bidang proyek" />
					<Menu anchor="Jenis Proyek" href="/opr/pengaturan/jenis proyek" />
					<Menu anchor="Asal Proyek" href="/opr/pengaturan/asal proyek" />
					<Menu anchor="Kode Rekening" href="/opr/pengaturan/kode rekening" />
					<Menu anchor="Nomor DPA" href="/opr/pengaturan/nomor dpa" />
					<Menu anchor="Jabatan" href="/opr/pengaturan/jabatan" />
				</Menu>
				<Menu anchor="Data User" href="/">
					<Menu anchor="User Operator" href="/opr/pengaturan/user operator" />
					<Menu anchor="User Mitra" href="/opr/pengaturan/user mitra" />
				</Menu>
			</Menu>
		</Menu>

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
