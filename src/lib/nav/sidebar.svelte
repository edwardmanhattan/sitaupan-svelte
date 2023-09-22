<script>
	import logo from '$lib/assets/logo-white.webp';
	import SidebarMenu from './sidebar-menu.svelte';
</script>

<div class="flex flex-col h-screen gap-4 py-5 text-white w-fit bg-slate-950">
	<div class="grid mx-auto place-items-center w-fit">
		<img src={logo} alt="Logo App Invest" class="my-4 w-28" />
	</div>
	<nav class="flex flex-col text-sm">
		<SidebarMenu anchor="Content" href="/user/homepage" icon="mdi:table">
			<SidebarMenu anchor="Homepage" href="/user/homepage" />
			<SidebarMenu anchor="Peluang Investasi" href="/user/peluang" icon="mdi:abacus">
				<SidebarMenu anchor="District" href="/user/district" />
				<SidebarMenu anchor="Sector " href="/user/sector" />
			</SidebarMenu>
			<SidebarMenu anchor="District" href="/user/district" />
			<SidebarMenu anchor="Sector " href="/user/sector" />
		</SidebarMenu>
		<SidebarMenu anchor="Logout" href="/logout" icon="mdi:logout" />
	</nav>
	<div />
</div>

<style lang="postcss">
	@tailwind components;
	@layer components {
		a {
			@apply hover:underline;
		}
	}
</style>
