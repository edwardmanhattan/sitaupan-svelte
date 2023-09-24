<script>
	import logo from '$lib/assets/logo.webp';
	import Icon from '@iconify/svelte';
</script>

<div class="flex items-center w-full gap-8 px-8 py-2 bg-blue-1">
	<div class="w-24">
		<img src={logo} alt="logo" class="object-contain object-center" />
	</div>
	<div class="w-8" />

	<a href="/user">Beranda</a>
	<a href="/user/formulir">Formulir</a>
	<a href="/user/invoice">Invoice</a>

	<div class="flex items-center gap-8 ml-auto">
		<div>
			<div>Terius Jeremiah</div>
			<div class="text-xs">Partner</div>
		</div>
		<a href="/logout" class="cursor-pointer hover:text-blue-2">
			<Icon width="24px" icon="basil:login-solid" />
		</a>
	</div>
</div>
