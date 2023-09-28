<script>
	// @ts-nocheck

	import { indonesianMonths } from '$lib/js/datetime';
	import Icon from '@iconify/svelte';
	import Row from '$lib/table/row.svelte';
	import { fiero } from '$lib/js/fiero';
	import Modal from '$lib/modal/modal.svelte';
	import { snack } from '$lib/js/vanilla.js';
	import Currency from '$lib/form/currency.svelte';
	let modal;
	export let data;

	const id = data.formulirId;
	const form = data.data;
</script>

<div class="h-screen px-24 py-12 overflow-auto">
	<h1>FORMULIR PENYEDIA JASA</h1>
	<br />

	<Row number="1" title="Nomor SPM">
		<input type="text" bind:value={form.no_spm} disabled class="bg-transparent disabled" />
	</Row>

	<Row number="2" title="Tanggal Perjanjian / Kontrak / SPK">
		<input type="date" bind:value={form.tanggal_kontrak} />
	</Row>

	<Row number="" title="Nomor Perjanjian / Kontrak / SPK">
		<input type="text" bind:value={form.nomor_kontrak} />
	</Row>

	<Row number="" title="Sub Kegiatan / Pekerjaan / Uraian Pekerjaan / Nama Pekerjaan">
		<input type="text" bind:value={form.uraian_sub_kegiatan} disabled class="disabled" />
	</Row>

	<Row number="3" title="Nilai Kontrak">
		<Currency bind:value={form.nilai_kontrak} />
	</Row>

	<Row number="4" title="Lokasi / Alamat Kegiatan">
		<textarea rows="3" bind:value={form.alamat_kegiatan} />
	</Row>

	<Row number="5" title="Jenis Belanja Modal">
		<select bind:value={form.jenis_belanja_modal} />
	</Row>

	<Row
		number="6"
		title="Nama Penyedia Barang / Kontraktor / Pelaksana / Penyedia Jasa / Nama Penyedia"
	>
		<input type="text" bind:value={form.nama_penyedia} />
	</Row>

	<Row number="" title="a. Nama Pimpinan Penyedia Jasa">
		<input type="text" bind:value={form.nama_pimpinan} />
	</Row>

	<Row number="" title="b. Handphone">
		<input type="text" bind:value={form.no_hp} />
	</Row>

	<Row number="" title="c. Email">
		<input type="text" bind:value={form.email} />
	</Row>

	<Row number="7" title="Uraian Pengadaan Sesuai Kontrak">
		<input type="text" bind:value={form.uraian_kontrak} />
	</Row>

	<Row number="8" title="Persen Pekerjaan / Tahap">
		<svelte:fragment>
			<select bind:value={form.pilihan_pencairan}>
				<option value="Uang Muka">Uang Muka</option>
				<option value="MC">MC (%)</option>
				<option value="Sekaligus">Sekaligus (100%)</option>
			</select>
			<span class="mx-auto">/</span>
			<div class="flex items-center gap-2">
				<input type="number" bind:value={form.tahap_pekerjaan} />
				<div>%</div>
			</div>
		</svelte:fragment>
	</Row>

	<Row
		number="9"
		title="Nilai Permohonan Pembayaran / Nilai Realisasi / Realisasi Keuangan / Sub Total Harga / Pembayaran / Pembayaran Saat Ini / Total Realisasi Sampai Saat Ini"
	>
		<Currency bind:value={form.nilai_permohonan} />
	</Row>

	<Row number="" title="a. Realisasi Keuangan / Persen Keuangan">
		<svelte:fragment>
			<Currency bind:value={form.realisasi_keuangan} />
			<span class="mx-auto">/</span>
			<div class="flex items-center gap-2">
				<input type="text" bind:value={form.presentase_keuangan} />
				<span>%</span>
			</div>
		</svelte:fragment>
	</Row>

	<Row number="" title="b. Realisasi Fisik / Persen Fisik">
		<svelte:fragment>
			<Currency bind:value={form.realisasi_fisik} />
			<span class="mx-auto">/</span>
			<div class="flex items-center gap-2">
				<input type="text" bind:value={form.presentase_fisik} />
				<span>%</span>
			</div>
		</svelte:fragment>
	</Row>

	<Row number="" title="c. Kode Rekening Rincian Sub Kegiatan">
		<input type="text" bind:value={form.rincian_sub_kegiatan} />
	</Row>

	<Row number="10" title="Satuan (Paket)">
		<select bind:value={form.satuan}>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
	</Row>

	<Row number="11" title="Jangka Waktu Kontrak / Masa Kontrak" />

	<Row number="" title="a. Jumlah Hari">
		<input type="number" bind:value={form.jumlah_hari} />
	</Row>

	<Row number="" title="b. Tanggal Mulai">
		<input type="date" bind:value={form.tanggal_mulai} />
	</Row>

	<Row number="" title="c. Tanggal Berakhir">
		<input type="date" bind:value={form.tanggal_selesai} />
	</Row>

	<Row number="12" title="Nomor dan Tanggal Adendum" />

	<Row number="" title="a. Nomor">
		<input type="text" bind:value={form.nomor_adendum} />
	</Row>

	<Row number="" title="b. Tanggal">
		<input type="date" bind:value={form.tanggal_adendum} />
	</Row>

	<Row number="13" title="Uraian dan Nilai Adendum" />

	<Row number="" title="a. Uraian Adendum">
		<textarea rows="3" bind:value={form.uraian_adendum} />
	</Row>

	<Row number="" title="b. Nilai Adendum">
		<input type="number" bind:value={form.nilai_adendum} />
	</Row>

	<Row number="14" title="Jangka Waktu Adendum" />

	<Row number="" title="a. Jumlah Hari">
		<input type="number" bind:value={form.jumlah_hari_adendum} />
	</Row>

	<Row number="" title="b. Tanggal Mulai">
		<input type="date" bind:value={form.tanggal_mulai_adendum} />
	</Row>

	<Row number="" title="c. Tanggal Berakhir">
		<input type="date" bind:value={form.tanggal_berakhir_adendum} />
	</Row>

	<Row number="" title="d. Adendum ke-">
		<select bind:value={form.adendum_ke}>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
	</Row>

	<Row number="15" title="Jaminan Pelaksanaan" />

	<Row number="" title="a. Bentuk">
		<input type="text" bind:value={form.jaminan_pelaksanaan_bentuk} />
	</Row>

	<Row number="" title="b. Nilai">
		<Currency bind:value={form.jaminan_pelaksanaan_nilai} />
	</Row>

	<Row number="" title="c. Masa Berlaku">
		<input type="number" bind:value={form.jaminan_pelaksanaan_masa_berlaku} />
	</Row>

	<Row number="16" title="Jaminan Pemeliharaan" />

	<Row number="" title="a. Bentuk">
		<input type="text" bind:value={form.jaminan_pemeliharaan_bentuk} />
	</Row>

	<Row number="" title="b. Nilai">
		<Currency bind:value={form.jaminan_pemeliharaan_nilai} />
	</Row>

	<Row number="" title="c. Masa Berlaku">
		<input type="number" bind:value={form.jaminan_pemeliharaan_masa_berlaku} />
	</Row>

	<Row number="17" title="Metode Pengadaan">
		<select bind:value={form.metode_pengadaan}>
			<option value="Tender">Tender</option>
			<option value="PL">PL</option>
		</select>
	</Row>

	<Row number="18" title="Manual / LPSE">
		<select bind:value={form.manual_lpse}>
			<option value="Manual">Manual</option>
			<option value="LPSE">LPSE</option>
		</select>
	</Row>

	<Row number="19" title="Berita Acara Serah Terima (BAST)" />

	<Row number="" title="a. Nomor">
		<input type="text" bind:value={form.bast_nomor} />
	</Row>

	<Row number="" title="b. Tanggal">
		<input type="date" bind:value={form.bast_tanggal} />
	</Row>

	<Row number="" title="c. Nilai">
		<Currency bind:value={form.bast_nilai} />
	</Row>

	<Row number="20" title="Tanggal PHO dan FHO" />

	<Row number="" title="a. Tanggal PHO / Nomor PHO">
		<svelte:fragment>
			<input type="date" bind:value={form.tanggal_pho} />
			<span class="mx-auto">/</span>
			<input type="number" bind:value={form.nomor_pho} />
		</svelte:fragment>
	</Row>

	<Row number="" title="a. Tanggal FHO / Nomor FHO">
		<svelte:fragment>
			<input type="date" bind:value={form.tanggal_fho} />
			<span class="mx-auto">/</span>
			<input type="number" bind:value={form.nomor_fho} />
		</svelte:fragment>
	</Row>

	<Row number="21" title="Jaminan Uang Muka" />

	<Row number="" title="a. Bentuk">
		<input type="text" bind:value={form.jaminan_uang_muka_bentuk} />
	</Row>

	<Row number="" title="b. Nilai">
		<Currency bind:value={form.jaminan_uang_muka_nilai} />
	</Row>

	<Row number="" title="c. Masa Berlaku">
		<input type="number" bind:value={form.jaminan_uang_muka_masa_berlaku} />
	</Row>

	<Row number="22" title="No. SPK / SPB / Nota Permintaan" />

	<Row number="" title="a. Tanggal">
		<input type="date" bind:value={form.tanggal_spk} />
	</Row>

	<Row number="" title="b. Nomor">
		<input type="text" bind:value={form.nomor_spk} />
	</Row>

	<Row number="23" title="Nota Tagihan / Persediaan Masuk">
		<select bind:value={form.nota_tagihan} />
	</Row>

	<Row number="24" title="Bulan">
		<select bind:value={form.bulan}>
			{#each indonesianMonths as month}
				<option value={month}>{month}</option>
			{/each}
		</select>
	</Row>

	<Row number="25" title="Nama Barang">
		<button on:click={modal.open}>Buka Nota Tagihan</button>
	</Row>

	<Row number="26" title="Kategori">
		<select bind:value={form.kategori} />
	</Row>

	<Row number="27" title="Ukuran" />

	<Row number="" title="a. Panjang">
		<input type="number" bind:value={form.ukuran_panjang} />
	</Row>

	<Row number="" title="b. Lebar">
		<input type="number" bind:value={form.ukuran_lebar} />
	</Row>

	<Row number="28" title="Konstruksi">
		<input type="text" bind:value={form.kontruksi} />
	</Row>

	<Row number="29" title="Berita Acara Pembayaran" />

	<Row number="" title="a. Nomor">
		<input type="text" bind:value={form.bap_nomor} />
	</Row>

	<Row number="" title="b. Tanggal">
		<input type="date" bind:value={form.bap_tanggal} />
	</Row>

	<Row number="30" title="Rincian KIB (Aset)" />

	<Row number="" title="a. Rincian Spesifikasi Barang Untuk Pekerjaan TANAH">
		<button
			on:click={() => {
				form.kib_a = [
					...form.kib_a,
					{
						kode_barang: '',
						nama_barang: '',
						luas: '',
						harga: '',
						keterangan: ''
					}
				];
			}}
			class="ml-auto w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</Row>

	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Kode Barang</th>
				<th>Nama / Jenis Barang</th>
				<th>Luas</th>
				<th>Harga</th>
				<th>Keterangan Pekerjaan</th>
				<th>Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.kib_a as key, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td> <input type="text" bind:value={key.kode_barang} /></td>
					<td> <input type="text" bind:value={key.nama_barang} /></td>
					<td> <input type="text" bind:value={key.luas} /></td>
					<td> <Currency bind:value={key.harga} /></td>
					<td> <input type="text" bind:value={key.keterangan} /></td>
					<td>
						<div class="flex items-center gap-2">
							<button
								on:click={() => {
									form.kib_a = form.kib_a.filter((_, idx) => idx !== i);
								}}
								class="bg-red-600"
							>
								<Icon icon="bi:trash" />
							</button>
						</div>
					</td>
				</tr>
			{:else}
				<div />
			{/each}
		</tbody>
	</table>
	<br />

	<Row number="" title="b. Rincian Spesifikasi Barang Untuk Pekerjaan / Pengadaan">
		<button
			on:click={() => {
				form.kib_b = [
					...form.kib_b,
					{
						nama_barang: '',
						merek: '',
						no_rangka_mesin: '',
						ukuran: '',
						keterangan: ''
					}
				];
			}}
			class="ml-auto w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</Row>

	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Nama / Jenis Barang</th>
				<th>Merek / Type</th>
				<th>No. Rangka Mesin</th>
				<th>Ukuran</th>
				<th>Keterangan Pekerjaan</th>
				<th>Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.kib_b as key, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td><input type="text" bind:value={key.nama_barang} /></td>
					<td><input type="text" bind:value={key.merek} /></td>
					<td><input type="text" bind:value={key.no_rangka_mesin} /></td>
					<td><input type="text" bind:value={key.ukuran} /></td>
					<td><input type="text" bind:value={key.keterangan} /></td>
					<td>
						<button
							on:click={() => {
								form.kib_b = form.kib_b.filter((_, idx) => idx !== i);
							}}
							class="bg-red-600"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{:else}
				<div />
			{/each}
		</tbody>
	</table>
	<br />

	<Row number="" title="c. Rincian Spesifikasi Barang Untuk Pekerjaan BANGUNAN GEDUNG">
		<button
			on:click={() => {
				form.kib_c = [
					...form.kib_c,
					{
						nama_barang: '',
						tingkat: '',
						beton: '',
						luas: '',
						keterangan: ''
					}
				];
			}}
			class="ml-auto w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</Row>

	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Nama / Jenis Barang</th>
				<th>Tingkat / Tidak</th>
				<th>Beton / Tidak</th>
				<th>Luas</th>
				<th>Keterangan Pekerjaan</th>
				<th>Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.kib_c as key, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td><input type="text" bind:value={key.nama_barang} /></td>
					<td><input type="text" bind:value={key.tingkat} /></td>
					<td><input type="text" bind:value={key.beton} /></td>
					<td><input type="text" bind:value={key.luas} /></td>
					<td><input type="text" bind:value={key.keterangan} /></td>
					<td>
						<button
							on:click={() => {
								form.kib_c = form.kib_c.filter((_, idx) => idx !== i);
							}}
							class="bg-red-600"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{:else}
				<div />
			{/each}
		</tbody>
	</table>
	<br />

	<Row
		number=""
		title="d. Rincian Spesifikasi Barang Untuk Pekerjaan FISIK (Kecuali Bangunan Gedung)"
	>
		<button
			on:click={() => {
				form.kib_d = [
					...form.kib_d,
					{
						nama_barang: '',
						konstruksi: '',
						panjang: '',
						lebar: '',
						keterangan: ''
					}
				];
			}}
			class="ml-auto w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</Row>

	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Nama / Jenis Barang</th>
				<th>Konstruksi</th>
				<th>Panjang</th>
				<th>Lebar</th>
				<th>Keterangan Pekerjaan</th>
				<th>Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.kib_d as key, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td><input type="text" bind:value={key.nama_barang} /></td>
					<td><input type="text" bind:value={key.konstruksi} /></td>
					<td><input type="text" bind:value={key.panjang} /></td>
					<td><input type="text" bind:value={key.lebar} /></td>
					<td><input type="text" bind:value={key.keterangan} /></td>
					<td>
						<button
							on:click={() => {
								form.kib_d = form.kib_d.filter((_, idx) => idx !== i);
							}}
							class="bg-red-600"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{:else}
				<div />
			{/each}
		</tbody>
	</table>
	<br />

	<Row
		number=""
		title="e. Rincian Spesifikasi Barang Untuk Pekerjaan Buku / Perpustakaan, Barang Bercorak Kesenian / Kebudayaan dan Hewan / Ternak serta Tumbuhan"
	>
		<button
			on:click={() => {
				form.kib_e = [
					...form.kib_e,
					{
						nama_barang: '',
						nomor_registrasi: '',
						judul: '',
						spesifikasi: ''
					}
				];
			}}
			class="ml-auto w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</Row>

	<table>
		<thead>
			<tr>
				<th rowspan="2">No</th>
				<th rowspan="2">Nama / Jenis Barang</th>
				<th rowspan="2">Nomor Register</th>
				<th colspan="2">Buku / Perpustakaan</th>
				<th rowspan="2">Aksi</th>
			</tr>
			<tr>
				<th>Judul Pencipta</th>
				<th>Spesifikasi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.kib_e as key, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td><input type="text" bind:value={key.nama_barang} /></td>
					<td><input type="text" bind:value={key.nomor_registrasi} /></td>
					<td><input type="text" bind:value={key.judul} /></td>
					<td><input type="text" bind:value={key.spesifikasi} /></td>
					<td>
						<button
							on:click={() => {
								form.kib_e = form.kib_e.filter((_, idx) => idx !== i);
							}}
							class="bg-red-600"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{:else}
				<div />
			{/each}
		</tbody>
	</table>
	<br />

	<Row number="" title="f. Rincian Spesifikasi Barang Untuk Pekerjaan KONSULTAN">
		<button
			on:click={() => {
				form.kib_f = [
					...form.kib_f,
					{
						nama_barang: '',
						konstruksi: '',
						panjang: '',
						lebar: '',
						keterangan: ''
					}
				];
			}}
			class="ml-auto w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</Row>
	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Nama / Jenis Barang</th>
				<th>Konstruksi</th>
				<th>Panjang</th>
				<th>Lebar</th>
				<th>Keterangan Pekerjaan</th>
				<th>Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.kib_f as key, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td><input type="text" bind:value={key.nama_barang} /></td>
					<td><input type="text" bind:value={key.konstruksi} /></td>
					<td><input type="text" bind:value={key.panjang} /></td>
					<td><input type="text" bind:value={key.lebar} /></td>
					<td><input type="text" bind:value={key.keterangan} /></td>
					<td>
						<button
							on:click={() => {
								form.kib_f = form.kib_f.filter((_, idx) => idx !== i);
							}}
							class="bg-red-600"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{:else}
				<div />
			{/each}
		</tbody>
	</table>
	<br />
	<br />

	<button
		on:click={async () => {
			const res = await fiero(`/mitra/pengisianFormPenyediaJasa`, 'POST', {
				form_penyedia_jasa: JSON.stringify(form)
			});

			if (res.message === 'berhasil') {
				snack.info('Berhasil menyimpan');
			}
		}}
	>
		Simpan
	</button>
</div>

<Modal bind:this={modal}>
	<h1>Penambahan Invoice</h1>
	<br />

	<Row number="none" title="ID Nota">
		<input type="text" bind:value={form.nota_tagihan.id_nota} />
	</Row>

	<Row number="none" title="Tanggal">
		<input type="date" bind:value={form.nota_tagihan.tanggal_nota} />
	</Row>

	<Row number="none" title="Nama Toko">
		<input type="text" bind:value={form.nota_tagihan.nama_toko} />
	</Row>

	<Row number="none" title="Rincian Data">
		<input type="text" bind:value={form.nota_tagihan.rincian_data} />
	</Row>

	<Row number="none" title="Detail Pembelian">
		<button
			on:click={() => {
				form.nota_tagihan.detail_pembelian = [
					...form.nota_tagihan.detail_pembelian,
					{
						uraian: '',
						harga: '',
						jumlah_barang: 0,
						total: 0
					}
				];
			}}
			class="ml-auto w-fit"
		>
			<Icon icon="bi:plus" />
			Tambah
		</button>
	</Row>

	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Uraian</th>
				<th>Harga</th>
				<th>Jumlah Barang</th>
				<th>Total</th>
				<th>Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each form.nota_tagihan.detail_pembelian as det, i (i)}
				<tr>
					<td>{i + 1}</td>
					<td><input type="text" bind:value={det.uraian} /></td>
					<td>
						<Currency
							bind:value={det.harga}
							onChange={() => {
								det.total = parseFloat(det.harga) * det.jumlah_barang;
							}}
						/>
					</td>
					<td>
						<input
							type="number"
							bind:value={det.jumlah_barang}
							on:change={() => {
								det.total = parseFloat(det.harga) * det.jumlah_barang;
							}}
						/>
					</td>
					<td>
						<Currency
							bind:value={det.total}
							onChange={() => {
								det.harga = parseFloat(det.total) / det.jumlah_barang;
							}}
						/>
					</td>
					<td>
						<button
							on:click={() => {
								form.nota_tagihan.detail_pembelian = form.nota_tagihan.detail_pembelian.filter(
									(_, idx) => idx !== i
								);
							}}
							class="bg-red-600"
						>
							<Icon icon="bi:trash" />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<br />
</Modal>
