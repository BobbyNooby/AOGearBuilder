<script lang="ts">
	import { clamp } from '$lib/utils/clamp';
	import { roundDecimal } from '$lib/utils/roundDecimal';

	export let minBarValue: number,
		maxBarValue: number,
		barText: string,
		statValue: number,
		rgbString: string;
</script>

<div class="w-full">
	<p class="text-white text-sm md:text-2xl" style="font-family: Merriweather;">
		{barText} : {roundDecimal(statValue, 4)}x
	</p>
	<div class="flex flex-row items-center">
		<p class="text-white w-5" style="font-family: Merriweather;">{minBarValue}</p>
		<div class="border-2 border-gray-400 w-full h-4">
			<div class="w-full h-full bg-black bg-opacity-50">
				<div
					class=" h-full"
					style="background-color: {rgbString}; width: {clamp(
						(statValue / (maxBarValue - minBarValue)) * 100,
						0,
						100
					)}%;"
				></div>
			</div>
		</div>
		<p class="text-white w-5 mx-2" style="font-family: Merriweather;">{maxBarValue}</p>
	</div>
</div>
