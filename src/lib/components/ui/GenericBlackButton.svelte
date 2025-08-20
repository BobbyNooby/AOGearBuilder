<script lang="ts">
	let { parentFunction, parentText }: { parentFunction: () => void; parentText: string } = $props();
</script>

<div>
	<button
		class=" w-56 border border-white bg-black px-4 py-2 text-lg font-bold text-white"
		style="font-family: Merriweather;"
		onclick={parentFunction}
	>
		{parentText}
	</button>
</div>
