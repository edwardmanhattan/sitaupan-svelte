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
			href="/"
			icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
		>
			<Menu
				anchor="Penambahan DPA"
				href="/opr/dpa/penambahan"
				icon="streamline:interface-file-clipboard-add-edit-task-edition-add-clipboard-form"
			/>
			<Menu
				anchor="Penyelesaian Proyek"
				href="/opr/dpa/penyelesaian"
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
		</Menu>
		<Menu
			anchor="Laporan"
			href="/"
			icon="streamline:interface-edit-clip-binder-clip-clipper-company-office-supplies-work"
		/>
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
