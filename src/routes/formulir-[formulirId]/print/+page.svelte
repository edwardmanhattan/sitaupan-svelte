<script>
	import { rupiah } from '$lib/js/currency';
	import { formatFullDate } from '$lib/js/datetime.js';
	import Row from '$lib/table/row.svelte';

	export let data;
	console.log(data);

	$: form = data.data;
	$: ntg = data.data.nota_tagihan;
</script>

<div class="border border-black w-fit h-max">
	<div class="w-[21cm] h-max px-[0.54cm] pb-[2.54cm] pt-[1cm] font-times bg-white" id="printTarget">
		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="1" title="Nomor SPM">
			{form.no_spm}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="2"
			title="Tanggal Perjanjian / Kontrak / SPK"
		>
			{form.tanggal_kontrak}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="Nomor Perjanjian / Kontrak / SPK"
		>
			{form.nomor_kontrak}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="Sub Kegiatan / Pekerjaan / Uraian Pekerjaan / Nama Pekerjaan"
		>
			{form.uraian_sub_kegiatan}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="3" title="Nilai Kontrak">
			{rupiah(form.nilai_kontrak)}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="4"
			title="Lokasi / Alamat Kegiatan"
		>
			{form.alamat_kegiatan}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="5" title="Jenis Belanja Modal">
			{form.jenis_belanja_modal}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="6"
			title="Nama Penyedia Barang / Kontraktor / Pelaksana / Penyedia Jasa / Nama Penyedia"
		>
			{form.nama_perusahaan}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="a. Nama Pimpinan Penyedia Jasa"
		>
			{form.nama_pimpinan}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Handphone">
			{form.no_hp}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="c. Email">
			{form.email}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="7"
			title="Uraian Pengadaan Sesuai Kontrak"
		>
			{form.uraian_kontrak}
		</Row>

		<!--  -->

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="8"
			title="Persen Pekerjaan / Tahap"
		>
			<svelte:fragment>
				{form.pilihan_pencairan}
				<span>/</span>
				<div class="flex items-center gap-2">
					{form.tahap_pekerjaan}
					<div>%</div>
				</div>
			</svelte:fragment>
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="9"
			title="Nilai Permohonan Pembayaran / Nilai Realisasi / Realisasi Keuangan / Sub Total Harga / Pembayaran / Pembayaran Saat Ini / Total Realisasi Sampai Saat Ini"
		>
			{form.nilai_permohonan}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="a. Realisasi Keuangan / Persen Keuangan"
		>
			<svelte:fragment>
				{form.realisasi_keuangan}
				<span>/</span>
				<div class="flex items-center gap-2">
					{form.persentase_keuangan}
					<span>%</span>
				</div>
			</svelte:fragment>
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="b. Realisasi Fisik / Persen Fisik"
		>
			<svelte:fragment>
				{form.realisasi_fisik}
				<span>/</span>
				<div class="flex items-center gap-2">
					{form.persentase_fisik}
					<span>%</span>
				</div>
			</svelte:fragment>
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="c. Kode Rekening Rincian Sub Kegiatan"
		>
			{form.rincian_sub_kegiatan}
		</Row>

		<Row title="d. Nama Bank / Rekening Bank">
			<svelte:fragment>
				{form.nama_bank}
				<span>/</span>
				{form.rekening_bank}
			</svelte:fragment>
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="10" title="Satuan (Paket)">
			{form.satuan}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="11"
			title="Jangka Waktu Kontrak / Masa Kontrak"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Jumlah Hari">
			{form.jumlah_hari}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Tanggal Mulai">
			{form.tanggal_mulai}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="c. Tanggal Berakhir">
			{form.tanggal_selesai}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="12"
			title="Nomor dan Tanggal Adendum"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Nomor">
			{form.nomor_adendum}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Tanggal">
			{form.tanggal_adendum}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="13"
			title="Uraian dan Nilai Adendum"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Uraian Adendum">
			{form.uraian_adendum}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Nilai Adendum">
			{rupiah(form.nilai_adendum)}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="14"
			title="Jangka Waktu Adendum"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Jumlah Hari">
			{form.jumlah_hari_adendum}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Tanggal Mulai">
			{form.tanggal_mulai_adendum}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="c. Tanggal Berakhir">
			{form.tanggal_berakhir_adendum}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="d. Adendum ke-">
			{form.adendum_ke}
		</Row>

		<!--  -->

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="15"
			title="Jaminan Pelaksanaan"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Bentuk">
			{form.jaminan_pelaksanaan_bentuk}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Nilai">
			{rupiah(form.jaminan_pelaksanaan_nilai)}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="c. Masa Berlaku">
			{form.jaminan_pelaksanaan_masa_berlaku}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="16"
			title="Jaminan Pemeliharaan"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Bentuk">
			{form.jaminan_pemeliharaan_bentuk}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Nilai">
			{rupiah(form.jaminan_pemeliharaan_nilai)}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="c. Masa Berlaku">
			{form.jaminan_pemeliharaan_masa_berlaku}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="17" title="Metode Pengadaan">
			{form.metode_pengadaan}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="18" title="Manual / LPSE">
			{form.manual_lpse}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="19"
			title="Berita Acara Serah Terima (BAST)"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Nomor">
			{form.bast_nomor}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Tanggal">
			{form.bast_tanggal}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="c. Nilai">
			{rupiah(form.bast_nilai)}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="20"
			title="Tanggal PHO dan FHO"
		/>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="a. Tanggal PHO / Nomor PHO"
		>
			<svelte:fragment>
				{form.tanggal_pho}
				<span class="mx-auto">/</span>
				{form.nomor_pho}
			</svelte:fragment>
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="a. Tanggal FHO / Nomor FHO"
		>
			<svelte:fragment>
				{form.tanggal_fho}
				<span class="mx-auto">/</span>
				{form.nomor_fho}
			</svelte:fragment>
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3" number="21" title="Jaminan Uang Muka" />

		<Row userId={form.id_jenis_penyedia} able="1,2,3" number="" title="a. Bentuk">
			{form.jaminan_uang_muka_bentuk}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3" number="" title="b. Nilai">
			{rupiah(form.jaminan_uang_muka_nilai)}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3" number="" title="c. Masa Berlaku">
			{form.jaminan_uang_muka_masa_berlaku}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="22"
			title="No. SPK / SPB / Nota Permintaan"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Tanggal">
			{form.tanggal_spk}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Nomor">
			{form.nomor_spk}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="23"
			title="Kategori Persediaan Aset"
		>
			{form.nota_tagihan.id_aset}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="24" title="Bulan">
			{form.bulan}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="25" title="Nama Barang">
			<div class="italic">terlampir.</div>
		</Row>

		<!--  -->
		<!--  -->

		<Row userId={form.id_jenis_penyedia} able="1,5" number="26" title="Ukuran" />

		<Row userId={form.id_jenis_penyedia} able="1,5" number="" title="a. Panjang">
			{form.ukuran_panjang}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,5" number="" title="b. Lebar">
			{form.ukuran_lebar}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3" number="27" title="Konstruksi">
			{form.kontruksi}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="28"
			title="Berita Acara Pemeriksaan"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Nomor">
			{form.bap_nomor}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Tanggal">
			{form.bap_tanggal}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="29"
			title="Berita Acara Pembayaran"
		/>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="a. Nomor">
			{form.nomor_ba_pembayaran}
		</Row>

		<Row userId={form.id_jenis_penyedia} able="1,2,3,4,5,6" number="" title="b. Tanggal">
			{form.tanggal_ba_pembayaran}
		</Row>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number="30"
			title="Rincian KIB (Aset)"
		/>

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="a. Rincian Spesifikasi Barang Untuk Pekerjaan TANAH"
			bgColor="green"
		/>

		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Nama / Jenis Barang</th>
					<th>Luas</th>
					<th>Harga</th>
					<th>Keterangan Pekerjaan</th>
					<th>Alamat</th>
				</tr>
			</thead>
			<tbody>
				{#each form.kib_a as key, i (i)}
					<tr>
						<td>{i + 1}</td>
						<td> {key.nama_barang}</td>
						<td> {key.luas}</td>
						<td> {rupiah(key.harga)}</td>
						<td> {key.keterangan}</td>
						<td>{key.lokasi_alamat}</td>
					</tr>
				{:else}
					<div />
				{/each}
			</tbody>
		</table>
		<br />

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="b. Rincian Spesifikasi Barang Untuk Pekerjaan / Pengadaan"
			bgColor="teal"
		/>

		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Nama / Jenis Barang</th>
					<th>Merek / Type</th>
					<th>No. Rangka Mesin</th>
					<th>Ukuran</th>
					<th>Keterangan Pekerjaan</th>
					<th>Harga</th>
					<th>Banyak</th>
				</tr>
			</thead>
			<tbody>
				{#each form.kib_b as key, i (i)}
					<tr>
						<td>{i + 1}</td>
						<td>{key.nama_barang}</td>
						<td>{key.merek}</td>
						<td>{key.no_rangka_mesin}</td>
						<td>{key.ukuran}</td>
						<td>{key.keterangan}</td>
						<td>{rupiah(key.harga)}</td>
						<td>
							{key.banyak}
						</td>
					</tr>
				{:else}
					<div />
				{/each}
			</tbody>
		</table>
		<br />

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="c. Rincian Spesifikasi Barang Untuk Pekerjaan BANGUNAN GEDUNG"
			bgColor="crimson"
		/>

		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Nama / Jenis Barang</th>
					<th>Tingkat / Tidak</th>
					<th>Beton / Tidak</th>
					<th>Harga</th>
					<th>Luas</th>
					<th>Keterangan Pekerjaan</th>
				</tr>
			</thead>
			<tbody>
				{#each form.kib_c as key, i (i)}
					<tr>
						<td>{i + 1}</td>
						<td>{key.nama_barang}</td>
						<td>{key.tingkat}</td>
						<td>
							{key.beton}
						</td>
						<td>{rupiah(key.harga)}</td>
						<td>{key.luas}</td>
						<td>{key.keterangan}</td>
					</tr>
				{:else}
					<div />
				{/each}
			</tbody>
		</table>
		<br />

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="d. Rincian Spesifikasi Barang Untuk Pekerjaan FISIK (Kecuali Bangunan Gedung)"
			bgColor="orange"
		/>

		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Nama / Jenis Barang</th>
					<th>Konstruksi</th>
					<th>Panjang</th>
					<th>Lebar</th>
					<th>Luas</th>
					<th>Alamat</th>
					<th>Harga</th>
					<th>Keterangan Pekerjaan</th>
				</tr>
			</thead>
			<tbody>
				{#each form.kib_d as key, i (i)}
					<tr>
						<td>{i + 1}</td>
						<td>{key.nama_barang}</td>
						<td>{key.konstruksi}</td>
						<td>{key.panjang}</td>
						<td>{key.lebar}</td>
						<td>{key.luas}</td>
						<td>{key.alamat}</td>
						<td>{rupiah(key.harga)}</td>
						<td>{key.keterangan}</td>
					</tr>
				{:else}
					<div />
				{/each}
			</tbody>
		</table>
		<br />

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="e. Rincian Spesifikasi Barang Untuk Pekerjaan Buku / Perpustakaan, Barang Bercorak Kesenian / Kebudayaan dan Hewan / Ternak serta Tumbuhan"
			bgColor="lime"
		/>

		<table>
			<thead>
				<tr>
					<th rowspan="2">No</th>
					<th rowspan="2">Nama / Jenis Barang</th>
					<th rowspan="2">Nomor Register</th>
					<th colspan="3">Buku / Perpustakaan</th>
					<th rowspan="2">Asal Daerah</th>
					<th rowspan="2">Asal Usul</th>
					<th rowspan="2">Bahan</th>
					<th rowspan="2">Harga</th>
					<th rowspan="2">Jumlah</th>
					<th rowspan="2">Keterangan</th>
					<th rowspan="2">Tahun</th>
					<th rowspan="2">Ukuran</th>
				</tr>
				<tr>
					<th>Judul</th>
					<th>Pencipta</th>
					<th>Spesifikasi</th>
				</tr>
			</thead>
			<tbody>
				{#each form.kib_e as key, i (i)}
					<tr>
						<td>{i + 1}</td>
						<td>{key.nama_barang}</td>
						<td>{key.nomor_registrasi}</td>
						<td>{key.judul}</td>
						<td>{key.pencipta}</td>
						<td>{key.spesifikasi}</td>
						<td>{key.asal_daerah}</td>
						<td>{key.asal_usul}</td>
						<td>{key.bahan}</td>
						<td>{rupiah(key.harga)}</td>
						<td>{key.jumlah}</td>
						<td>{key.keterangan}</td>
						<td>{key.tahun}</td>
						<td>{key.ukuran}</td>
					</tr>
				{:else}
					<div />
				{/each}
			</tbody>
		</table>
		<br />

		<Row
			userId={form.id_jenis_penyedia}
			able="1,2,3,4,5,6"
			number=""
			title="f. Rincian Spesifikasi Barang Untuk Pekerjaan KONSULTAN"
			bgColor="violet"
		/>
		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Nama / Jenis Barang</th>
					<th>Konstruksi</th>
					<th>Panjang</th>
					<th>Lebar</th>
					<th>Luas</th>
					<th>Lokasi</th>
					<th>Harga</th>
					<th>Keterangan Pekerjaan</th>
				</tr>
			</thead>
			<tbody>
				{#each form.kib_f as key, i (i)}
					<tr>
						<td>{i + 1}</td>
						<td>{key.nama_barang}</td>
						<td>{key.konstruksi}</td>
						<td>{key.panjang}</td>
						<td>{key.lebar}</td>
						<td>{key.luas}</td>
						<td>{key.lokasi}</td>
						<td>{rupiah(key.harga)}</td>
						<td>{key.keterangan}</td>
					</tr>
				{:else}
					<div />
				{/each}
			</tbody>
		</table>
		<br />
		<br />

		<div class="font-semibold">Lampiran</div>

		<div class="text-sm">
			<h1>Nota Tagihan</h1>
			<br />

			<div class="flex gap-2">
				<div class="w-32">ID Nota</div>
				<span>:</span>
				<div>{ntg.id_nota}</div>
			</div>

			<div class="flex gap-2">
				<div class="w-32">Tanggal</div>
				<span>:</span>
				<div>{formatFullDate(ntg.tanggal_nota)}</div>
			</div>

			<div>Detail Pembelian</div>
			<br />

			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Uraian</th>
						<th>Harga</th>
						<th>Jumlah Barang</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{#each ntg.detail_pembelian ?? [] as d, i}
						<tr>
							<td>{i + 1}</td>
							<td>{d.uraian}</td>
							<td>{rupiah(d.harga)}</td>
							<td>{d.jumlah_barang}</td>
							<td>{rupiah(d.total)}</td>
						</tr>
					{:else}
						<tr>
							<td colspan="5">tidak ada data</td>
						</tr>
					{/each}
					<tr>
						<td colspan="3" style="border:none" />
						<td class="font-semibold">Total</td>
						<td class="font-semibold">{rupiah(ntg.total)}</td>
					</tr>
				</tbody>
			</table>

			<br />
			<br />
		</div>
	</div>
</div>

<style lang="postcss">
	@tailwind components;
	@layer components {
		table.print {
			@apply text-[1px];
		}
	}

	table tr {
		font-size: 2px;
	}
</style>
