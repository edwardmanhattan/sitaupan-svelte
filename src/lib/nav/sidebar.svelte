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
			href="/"
			icon="streamline:interface-home-2-door-entrance-home-house-map-roof-round"
		/>
		<Menu
			anchor="DPA"
			href="/"
			icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
		>
			<Menu
				anchor="Penambahan DPA"
				href="/"
				icon="streamline:interface-file-clipboard-add-edit-task-edition-add-clipboard-form"
			/>
			<Menu anchor="Penyelesaian Proyek" href="/" icon="" />
			<Menu anchor="Surat Pengantar" href="/" icon="" />
			<Menu anchor="Pembayaran" href="/" icon="" />
			<Menu anchor="Daftar Proyek" href="/" icon="" />
			<Menu anchor="Tim Kegiatan" href="/" icon="" />
		</Menu>
		<Menu
			anchor="Data Files"
			href="/"
			icon="streamline:interface-file-folder-work-office-company-folder-supplies-file"
		/>
		<Menu
			anchor="Laporan"
			href="/"
			icon="streamline:interface-edit-clip-binder-clip-clipper-company-office-supplies-work"
		/>
		<Menu
			anchor="Pengaturan"
			href="/"
			icon="streamline:interface-setting-cog-work-loading-cog-gear-settings-machine"
		>
			<Menu anchor="Pengaturan Umum" href="/" icon="" />
			<Menu anchor="Pengaturan Data" href="/" icon="" />
		</Menu>

		<div class="mt-auto" />

		<Menu anchor="Logout" href="/logout" icon="mdi:logout" />
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
