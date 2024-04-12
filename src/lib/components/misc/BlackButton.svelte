<script lang="ts">
	export let parentFunction: any, parentText: string;
</script>

<div>
	<button
		class=" bg-black border border-white text-white font-bold text-lg py-2 px-4 w-56"
		style="font-family: Merriweather;"
		on:click={parentFunction}
	>
		{parentText}
	</button>
</div>
