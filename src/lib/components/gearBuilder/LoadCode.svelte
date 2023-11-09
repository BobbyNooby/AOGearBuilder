<script>
	import { playCorrect, playWrong } from '$lib/utils/sound.js';
	import { finalPower, loadCode } from '$lib/utils/statsStore';

	let inputString = '';

	async function load() {
		// read string from clipboard
		inputString = await navigator.clipboard.readText();
		// load build into store
		let success = loadCode(inputString);
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
