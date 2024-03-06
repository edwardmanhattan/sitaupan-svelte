<script>
	// @ts-nocheck

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import bg from '$lib/assets/login.webp';
	import logo from '$lib/assets/logo.webp';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, message } = superForm(data.form);
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
			<label for="username">Username</label>
			<input
				type="text"
				placeholder="masukkan username..."
				name="username"
				id="username"
				bind:value={$form.username}
			/>
			{#if $errors.username}
				<p class="text-red-500">{$errors.username}</p>
			{/if}

			<label for="password">Password</label>
			<input
				type="password"
				placeholder="masukkan password..."
				name="password"
				id="password"
				bind:value={$form.password}
			/>
			{#if $errors.password}
				<p class="text-red-500">{$errors.password}</p>
			{/if}

			<br />
			<br />
			<div>Masuk Sebagai</div>

			<select name="tipe" id="tipe" bind:value={$form.tipe}>
				<option value="operator">Operator</option>
				<option value="mitra">Mitra</option>
			</select>

			<br />
			<br />
			<button class="bg-blue-3" type="submit"> Masuk </button>
			{#if $message}
				<section class:text-red-500={$page.status != 200} class="text-center">{$message}</section>
			{/if}
		</form>
	</div>
</div>

<style lang="postcss">
	@tailwind components;
	@layer components {
		p {
			@apply text-xs p-0;
		}
	}
</style>
