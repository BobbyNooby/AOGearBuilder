<script lang="ts">
	import type { magicDetails } from '$lib/data/magicDetails';
	import { clamp } from '$lib/utils/clamp';
	import { roundDecimal } from '$lib/utils/roundDecimal';

	export let minBarValue: number,
		maxBarValue: number,
		barText: string,
		magicStat: number,
		redTween: number,
		greenTween: number,
		blueTween: number;
</script>

<div class="w-full">
	<p class="text-white text-2xl" style="font-family: Merriweather;">
		{barText} : {roundDecimal(magicStat, 4)}x
	</p>
	<div class="flex flex-row items-center">
		<p class="text-white w-5" style="font-family: Merriweather;">{minBarValue}</p>
		<div class="border-2 border-gray-400 w-full h-4">
			<div class="w-full h-full bg-black bg-opacity-50">
				<div
					class=" h-full"
					style="background-color: rgb({redTween}, {greenTween}, {blueTween}); width: {clamp(
						(magicStat / (maxBarValue - minBarValue)) * 100,
						0,
						100
					)}%;"
				></div>
			</div>
		</div>
		<p class="text-white w-5 mx-2" style="font-family: Merriweather;">{maxBarValue}</p>
	</div>
</div>
