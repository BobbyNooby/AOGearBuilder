<script lang="ts">
	import { hexToRGB } from '$lib/utils/hexToRGB';

	export let incrementorFunction: any, text: string, color: string;
</script>

<div>
	<button
		style="
		 color: {color}; 
		 border-color: {color}; 
		 background-color: 
		 rgba({hexToRGB(color).r}, {hexToRGB(color).g}, {hexToRGB(color).b}, 0.2); "
		class="border-2 h-fit px-4 rounded items-center justify-center"
		on:click={incrementorFunction()}
		><p class="text-sm" style="-webkit-text-stroke-width: 1px; ">{text}</p></button
	>
</div>
