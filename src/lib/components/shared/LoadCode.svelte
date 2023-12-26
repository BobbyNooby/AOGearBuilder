<script>
	import { loadShipCode } from '$lib/utils/shipStatsStore';
	import { playCorrect, playWrong } from '$lib/utils/sound.js';
	import { loadCode } from '$lib/utils/statsStore';

	let inputString = '';

	export let type;

	async function load() {
		// read string from clipboard
		inputString = await navigator.clipboard.readText();
		// load build into store
		let success = false;
		if (type == 'gear') {
			success = loadCode(inputString);
		}
		if (type == 'ship') {
			success = loadShipCode(inputString);
		}
		// play sounds for success or error
		if (success) {
			playCorrect();
		} else {
			playWrong();
		}
	}
</script>

<div>
	<button
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-56"
		style="font-family: Merriweather;"
		on:click={load}
	>
		Load Build Code
	</button>
</div>
