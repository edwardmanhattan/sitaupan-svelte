<script>
	import bg from '$lib/assets/login.webp';
	import logo from '$lib/assets/logo.webp';
	import { snack } from '$lib/js/vanilla';

	let username = '';
	let password = '';
	let role = 'operator';
</script>

<div class="flex w-screen h-screen">
	<div class="w-5/12" style="background: url({bg}) center center / 100% 100% no-repeat; " />
	<div class="flex flex-col items-center justify-center gap-4 px-16 py-12 bg-white-1 grow">
		<div class="w-24">
			<img src={logo} alt="logo" />
		</div>
		<h1 class="text-3xl">Selamat Datang</h1>

		<br />
		<div class="w-full">
			<div>Username</div>
			<input type="text" placeholder="masukkan username..." bind:value={username} />
			<div>Password</div>
			<input type="password" placeholder="masukkan password..." bind:value={password} />
			<br />
			<br />
			<div>Masuk Sebagai</div>
			<select bind:value={role}>
				<option value="operator">Operator</option>
				<option value="mitra">Mitra</option>
			</select>
		</div>

		<button
			on:click={() => {
				if (password !== '1234') {
					snack.info('Password Salah');
					return;
				}

				if (role === 'operator' && username === 'leon') {
					snack.info('Berhasil Masuk');
					document.location.href = '/opr';
					return;
				} else if (role === 'mitra' && username === 'terri') {
					snack.info('Berhasil Masuk');
					document.location.href = '/user';
					return;
				} else {
					snack.info('Terdapat Kesalahan Data');
				}
			}}
		>
			Masuk
		</button>
	</div>
</div>
