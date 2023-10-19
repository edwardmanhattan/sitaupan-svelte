<script>
	import Icon from '@iconify/svelte';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => {
		history.back();
	}}
	class="text-xl hover:cursor-pointer hover:scale-110"
>
	<Icon icon="streamline:interface-arrows-left-circle-1-arrow-keyboard-circle-button-left" />
</div>
