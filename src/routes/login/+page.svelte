<script>
	// @ts-nocheck

	import { enhance } from '$app/forms';
	import bg from '$lib/assets/login.webp';
	import logo from '$lib/assets/logo.webp';

	export let data;
	export let form = {
		username: '',
		password: '',
		tipe: 'operator'
	};

	let username = '';
	let password = '';
	let tipe = 'operator';
</script>

<div class="flex w-screen h-screen">
	<div class="w-5/12" style="background: url({bg}) center center / 100% 100% no-repeat; " />
	<div class="flex flex-col items-center justify-center gap-4 px-16 py-12 bg-white-1 grow">
		<div class="w-24">
			<img src={logo} alt="logo" />
		</div>
		<h1 class="text-3xl">Selamat Datang</h1>

		<br />
		<form use:enhance method="post" action="?/login" class="w-full">
			<div>Username</div>
			<input
				type="text"
				placeholder="masukkan username..."
				name="username"
				value={form?.username ?? ''}
			/>

			<div>Password</div>
			<input
				type="password"
				placeholder="masukkan password..."
				name="password"
				value={form?.password ?? ''}
			/>

			<br />
			<br />
			<div>Masuk Sebagai</div>

			<select name="tipe" value={form?.tipe ?? ''}>
				<option value="operator">Operator</option>
				<option value="mitra">Mitra</option>
			</select>

			<br />
			<br />
			<button class="bg-blue-3" type="submit"> Masuk </button>
		</form>
	</div>
</div>
