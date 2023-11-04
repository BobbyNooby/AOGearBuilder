<script>
	import { generateCode } from '$lib/utils/statsStore';
	import { playCorrect } from '$lib/utils/sound.js';

	async function share() {
		// generate code
		let code =
			location.protocol +
			'//' +
			location.host +
			location.pathname +
			(location.search ? location.search : '') +
			'#' +
			generateCode();

		// copy text to clipboard
		await navigator.clipboard.writeText(code);
		playCorrect();
	}
</script>

<div>
	<button
		class=" bg-black border border-white text-white font-bold text-lg py-2 px-4 w-56"
		style="font-family: Merriweather;"
		on:click={share}
	>
		Share Link
	</button>
</div>
