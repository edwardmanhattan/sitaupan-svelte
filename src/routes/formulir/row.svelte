<script>
	export let number = '';
	export let title = '';
</script>

<div class="flex items-center gap-4 mb-2 text-sm">
	<div class="w-4">{number}</div>
	<div class="w-4/12">{title}</div>
	<div class="w-2">:</div>
	<div class="grid items-center grid-flow-col gap-2 grow">
		<slot />
	</div>
</div>
