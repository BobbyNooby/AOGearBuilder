<script lang="ts">
	let {
		name,
		color,
		value,
		max,
		legend,
		locked,
		onChange
	}: {
		name: string;
		color: string;
		value: number;
		max: number;
		legend: string;
		locked: boolean;
		onChange: (delta: number) => void;
	} = $props();

	const pct = $derived(max > 0 ? (value / max) * 100 : 0);
</script>

<div class="flex flex-col my-3" class:opacity-40={locked}>
	<div class="flex flex-row items-center justify-between">
		<div class="flex flex-row items-center gap-2">
			<p class="text-lg" style="font-family:Merriweather,serif;color:{color}">{name}</p>
			<p class="text-lg" style="font-family:Merriweather,serif;color:{color}">{value}</p>
		</div>
		<div class="flex flex-row gap-1">
			<button
				onclick={() => onChange(-10)}
				disabled={locked}
				class="h-6 rounded border px-2 text-xs text-white transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
				style="border-color:{color};background:rgba({parseInt(color.slice(1,3),16)},{parseInt(color.slice(3,5),16)},{parseInt(color.slice(5,7),16)},0.2)"
			>
				-10
			</button>
			<button
				onclick={() => onChange(-1)}
				disabled={locked}
				class="h-6 rounded border px-2 text-xs text-white transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
				style="border-color:{color};background:rgba({parseInt(color.slice(1,3),16)},{parseInt(color.slice(3,5),16)},{parseInt(color.slice(5,7),16)},0.2)"
			>
				-1
			</button>
			<button
				onclick={() => onChange(1)}
				disabled={locked}
				class="h-6 rounded border px-2 text-xs text-white transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
				style="border-color:{color};background:rgba({parseInt(color.slice(1,3),16)},{parseInt(color.slice(3,5),16)},{parseInt(color.slice(5,7),16)},0.2)"
			>
				+1
			</button>
			<button
				onclick={() => onChange(Math.min(10, max - value))}
				disabled={locked}
				class="h-6 rounded border px-2 text-xs text-white transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
				style="border-color:{color};background:rgba({parseInt(color.slice(1,3),16)},{parseInt(color.slice(3,5),16)},{parseInt(color.slice(5,7),16)},0.2)"
			>
				+10
			</button>
		</div>
	</div>

	<div class="mt-1 border-2" style="border-color:{color}">
		<div class="border-2 border-gray-800 bg-gray-800">
			<div
				class="h-2 transition-all duration-300"
				style="background-color:{color};width:{pct}%;"
			></div>
		</div>
	</div>

	<p class="mt-1 text-xs text-gray-300" style="font-family:'Open Sans',sans-serif">{legend}</p>
</div>
