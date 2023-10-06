<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center h-screen p-12 bg-slate-2">
	<div>🙏🙏</div>
	<p class="font-semibold text-slate-800">{$page.status}</p>
	<p class="font-semibold">{$page.error?.message}</p>
	<div>🙏🙏</div>
</div>
