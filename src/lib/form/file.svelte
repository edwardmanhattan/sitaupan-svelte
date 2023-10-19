<script>
	// @ts-nocheck
	import { config } from '$lib/js/fiero';
	export let name = 'file';
	export let data = {};
	export let placeholder = 'pilih file...';

	let file;
	let form;

	export async function upload(id = 0, folder = '', kolom = '') {
		try {
			file.name = 'file';
			const res = await fetch(config.api + `/uploadFile?id=${id}&folder=${folder}&kolom=${kolom}`, {
				method: 'POST',
				body: new FormData(form)
			});
			file.name = name;
			console.log(res, file);
			return res;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
</script>

<label for={name} class="flex w-full text-sm cursor-pointer">
	<form bind:this={form}>
		<input
			type="file"
			bind:this={file}
			on:change={() => {
				placeholder = file.files.item(0).name;
			}}
			{name}
			id={name}
			bind:value={data}
			class="w-0 h-0"
		/>
	</form>
	<div
		class="flex items-center px-2 text-xs italic bg-white border rounded-l hover:underline text-slate-700 border-black/30 grow"
	>
		{placeholder}
	</div>
	<div class="grid w-24 py-1 text-white bg-teal-800 rounded-r place-items-center">Browse</div>
</label>

<style lang="postcss">
	@tailwind components;
	@layer components {
		input[type='file'] {
			@apply border-0 p-0;
		}
	}
</style>
