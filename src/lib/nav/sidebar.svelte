<script>
	// @ts-nocheck

	import logo from '$lib/assets/logo.webp';
	import { fiero } from '$lib/js/fiero';
	import { snack } from '$lib/js/vanilla';
	import Modal from '$lib/modal/modal.svelte';
	import { userInfo } from '$lib/stores/stores';
	import Icon from '@iconify/svelte';
	import Menu from './menu.svelte';

	export let privilege = { userJabatan: 17, userPrivilege: 17 };

	let { userJabatan, userBidang, userPrivilege, userNama, userNamaJabatan, userFullData } =
		privilege;
	userJabatan = userJabatan.split(',').map((x) => parseInt(x));

	let selected = userFullData;
	let modal;

	$userInfo = {
		jabatan: userJabatan[0],
		bidang: parseInt(userBidang)
	};
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

		<Menu
			anchor="DPA"
			icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
		>
			<Menu
				{userJabatan}
				{userPrivilege}
				jabatan={[2]}
				anchor="Mapping DPA"
				href="/opr/dpa/mapping"
				icon="streamline:interface-file-clipboard-add-edit-task-edition-add-clipboard-form"
			/>

			<Menu
				{userJabatan}
				{userPrivilege}
				jabatan={[12]}
				anchor="Pembuatan Formulir"
				href="/opr/dpa/formulir"
				icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form"
			/>

			<Menu
				{userJabatan}
				{userPrivilege}
				jabatan={[11, 12, 16, 2, 9, 13, 14, 15, 8, 7, 3, 1, 24, 23]}
				anchor="Daftar Kegiatan"
				href="/opr/dpa/daftar"
				icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
			/>

			<Menu
				{userJabatan}
				{userPrivilege}
				jabatan={[11, 12, 2, 9, 13, 14, 15, 8, 7, 3, 1, 24, 23]}
				anchor="Serah Terima Berkas"
				href="/opr/dpa/stb"
				icon="streamline:interface-file-clipboard-check-checkmark-edit-task-edition-checklist-check-success-clipboard-form"
			/>

			<Menu
				{userJabatan}
				{userPrivilege}
				jabatan={[2]}
				anchor="Tim Kegiatan"
				href="/opr/dpa/tim"
				icon="streamline:interface-user-multiple-close-geometric-human-multiple-person-up-user"
			/>
		</Menu>

		<!-- 24 = sekretaris, 23 = kabid -->
		<Menu
			{userJabatan}
			{userPrivilege}
			jabatan={[2, 9, 13, 14, 15, 8, 7, 3, 1, 24, 23, 21]}
			anchor="BPJS Ketenagakerjaan"
			href="/opr/files/bpjs"
			icon="streamline:interface-add-square-square-remove-cross-buttons-add-plus-button"
		/>

		<Menu
			{userJabatan}
			{userPrivilege}
			jabatan={[2, 9, 13, 14, 15, 8, 7, 3, 1, 24, 23, 19]}
			anchor="Bidang Akuntansi BPKAD"
			href="/opr/laporan/bpkad"
			icon="streamline:interface-file-bookmark-text-common-bookmark"
		/>

		<Menu
			{userJabatan}
			{userPrivilege}
			jabatan={[2, 9, 13, 14, 15, 8, 7, 3, 1, 24, 23, 18]}
			anchor="Inspektorat"
			icon="streamline:interface-edit-zoom-in-enhance-glass-in-magnify-magnifying-zoom"
			childPos="8"
		>
			<Menu anchor="Lampiran 1C Belanja Modal" href="/opr/laporan/lampiran_modal" />
			<Menu anchor="Lampiran 1C Belanja Barang & Jasa" href="/opr/laporan/lampiran_barang" />
			<Menu anchor="Jaminan Uang Muka" href="/opr/files/aset/jaminan" />
			<Menu anchor="Daftar Hutang" href="/opr/files/hutang" />
			<Menu anchor="P3DN (Perencanaan)" href="/opr/files/inspektorat/p3dn_perencanaan" />
			<Menu anchor="P3DN (Realisasi)" href="/opr/files/inspektorat/p3dn_realisasi" />
			<Menu anchor="Data Kontrak" href="/opr/files/inspektorat/data kontrak" />
			<Menu anchor="Bukti Bayar (SP2D)" href="/opr/files/inspektorat/sp2d" />
			<Menu anchor="SK" href="/opr/files/inspektorat/sk" />
			<Menu anchor="Realisasi Keuangan" href="/opr/files/inspektorat/realisasi_keuangan" />
			<Menu anchor="Serapan Anggaran" href="/opr/files/inspektorat/serapan_anggaran" />
			<Menu anchor="Capaian Realisasi" href="/opr/laporan/capaian" />
		</Menu>

		<Menu
			{userJabatan}
			{userPrivilege}
			jabatan={[2, 9, 13, 14, 15, 8, 7, 3, 1, 24, 23, 4, 19]}
			anchor="Bidang Aset BPKAD"
			icon="streamline:interface-align-layers-1-design-layer-layers-pile-stack"
		>
			<Menu anchor="Aset Tetap" href="/opr/files/aset/tetap" />
			<Menu anchor="Persediaan" href="/opr/files/aset/persediaan">
				<Menu anchor="Stok Awal" href="/opr/files/aset/stok_awal" />
				<Menu anchor="Persediaan Barang" href="/opr/files/aset/persediaan" />
			</Menu>
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

		<Menu
			{userJabatan}
			{userPrivilege}
			jabatan={[7, 3, 1, 24, 23, 5, 20]}
			anchor="Bidang Perbendaharaan BPKAD"
			icon="streamline:interface-edit-clip-binder-clip-clipper-company-office-supplies-work"
		>
			<Menu
				anchor="Capaian Realisasi"
				href="/opr/laporan/capaian"
				icon="streamline:interface-file-bookmark-text-common-bookmark"
			/>

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
		</Menu>

		<Menu
			{userJabatan}
			{userPrivilege}
			jabatan={[2]}
			anchor="Pengaturan"
			icon="streamline:interface-setting-slider-horizontal-adjustment-adjust-controls-fader-horizontal-settings-slider"
		>
			<!-- <Menu
				{userJabatan} {userPrivilege}
				jabatan={[]}
					anchor="Pengaturan Umum"
					href="/"
					icon="streamline:interface-setting-cog-work-loading-cog-gear-settings-machine"
				/> -->
			<Menu
				{userJabatan}
				{userPrivilege}
				jabatan={[2]}
				anchor="Pengaturan Data"
				icon="streamline:computer-database-raid-storage-code-disk-programming-database-array-hard-disc"
			>
				<Menu
					{userJabatan}
					{userPrivilege}
					jabatan={[]}
					anchor="Data Master"
					href="/opr/pengaturan/bidang kegiatan"
					childPos="12"
				>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Bidang Kegiatan"
						href="/opr/pengaturan/bidang kegiatan"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Jenis Kegiatan"
						href="/opr/pengaturan/jenis kegiatan"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Asal Kegiatan"
						href="/opr/pengaturan/asal kegiatan"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Kode Rekening"
						href="/opr/pengaturan/kode rekening"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Nomor DPA"
						href="/opr/pengaturan/nomor dpa"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Jabatan"
						href="/opr/pengaturan/jabatan"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Kategori Persediaan"
						href="/opr/pengaturan/persediaan"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Jenis Persediaan"
						href="/opr/pengaturan/jenis_persediaan"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Master Tim"
						href="/opr/pengaturan/master tim"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="Sumber Dana"
						href="/opr/pengaturan/sumber dana"
					/>
				</Menu>
				<Menu
					{userJabatan}
					{userPrivilege}
					jabatan={[2]}
					anchor="Data User"
					href="/opr/pengaturan/user operator"
				>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[]}
						anchor="User Operator"
						href="/opr/pengaturan/user operator"
					/>
					<Menu
						{userJabatan}
						{userPrivilege}
						jabatan={[2]}
						anchor="User Mitra"
						href="/opr/pengaturan/user mitra"
					/>
				</Menu>
			</Menu>
		</Menu>

		<div class="mt-auto" />
		<button
			on:click={() => {
				modal.open();
			}}
			class="justify-between px-3 border-0"
		>
			<div class="text-left">
				<div>{userNama}</div>
				<div class="text-xs font-normal">{userNamaJabatan ?? ''}</div>
			</div>
			<Icon icon="basil:settings-alt-outline" />
		</button>

		<Menu anchor="Logout" href="/logout" icon="basil:logout-solid" />
	</nav>
</div>

<!-- svelte-ignore a11y-label-has-associated-control -->
<Modal bind:this={modal}>
	<label>Nama</label>
	<input type="text" bind:value={selected.nama} />
	<br />

	<label>Jabatan</label>
	<input type="text" bind:value={selected.nama_jabatan} disabled />
	<br />

	<label>Username</label>
	<input type="text" bind:value={selected.username} disabled />
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

	<br />
	<br />
	<button
		on:click={async () => {
			selected.id_jabatan = selected.jabatan;
			const res = await fiero(`/operator/updateUserOperator`, 'POST', selected);
			if (res.status === 200) {
				snack.info('Berhasil mengubah informasi User');
			} else snack.info('Terjadi Kesalahan');
			userNama = selected.nama;
			modal.close();
		}}
	>
		Simpan
	</button>
</Modal>

<style lang="postcss">
	@tailwind components;
	@layer components {
		a {
			@apply hover:underline;
		}
	}
</style>
