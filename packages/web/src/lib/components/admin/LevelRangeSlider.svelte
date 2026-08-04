<script lang="ts">
	interface Props {
		min?: number;
		max?: number;
		minValue?: number;
		maxValue?: number;
		step?: number;
		onChange?: (minVal: number, maxVal: number) => void;
	}

	let {
		min = 10, max = 175, minValue = 10, maxValue = 175,
		step = 10, onChange
	}: Props = $props();

	let low = $state(0);
	let high = $state(0);

	$effect(() => {
		low = minValue;
		high = maxValue;
	});

	function handleLow(e: Event) {
		let v = Number((e.target as HTMLInputElement).value);
		if (v >= high) v = high - step;
		low = v;
		onChange?.(low, high);
	}

	function handleHigh(e: Event) {
		let v = Number((e.target as HTMLInputElement).value);
		if (v <= low) v = low + step;
		high = v;
		onChange?.(low, high);
	}
</script>

<div class="relative pt-6 pb-2">
	<div class="text-xs text-gray-400 mb-1">Level {low} – {high}</div>
	<div class="relative h-2">
		<div class="absolute inset-0 rounded bg-gray-700"></div>
		<div
			class="absolute top-0 h-full rounded bg-white/30"
			style="left:{(low - min) / (max - min) * 100}%; width:{((high - low) / (max - min)) * 100}%"
		></div>
		<input
			type="range" min={min} max={max} step={step} value={low}
			oninput={handleLow}
			class="absolute top-0 w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-900"
			style="z-index:2"
		/>
		<input
			type="range" min={min} max={max} step={step} value={high}
			oninput={handleHigh}
			class="absolute top-0 w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-900"
			style="z-index:3"
		/>
	</div>
</div>
