<script lang="ts">
	export let key: string, value: number;
	import { clamp } from '$lib/utils/clamp';

	const validKeys: Record<string, { text: string; color: string; stroke: string }> = {
		damageMultiplier: {
			text: 'Damage Multiplier',
			color: '#FFC07F',
			stroke: '#000000'
		},
		rangeMultiplier: { text: 'Range Multiplier', color: '#7FC0FF', stroke: '#000000' },
		spreadMultiplier: { text: 'Spread Multiplier', color: '#7FFF7F', stroke: '#000000' },
		fuseLength: { text: 'Fuse Length', color: '#FFFF7F', stroke: '#000000' },
		reloadTime: { text: 'Reload Time', color: '#C0C0C0', stroke: '#000000' },
		ramSpeed: { text: 'Ram Speed', color: '#7FC0FF', stroke: '#000000' }
	};

	let maxValue = 2;

	if (key == 'reloadTime') {
		maxValue = 18;
	} else if (key == 'fuseTime') {
		maxValue = 5;
	}
</script>

{#if key in validKeys}
	<div class="flex flex-col">
		<div class="w-full flex justify-between">
			<p
				style=" color: {validKeys[key].color}; -webkit-text-stroke-color: {validKeys[key]
					.stroke}; -webkit-text-stroke: 1px;"
			>
				{validKeys[key].text}
			</p>
			<p
				style=" color: {validKeys[key].color}; -webkit-text-stroke-color: {validKeys[key]
					.stroke}; -webkit-text-stroke: 1px;"
			>
				{value}
			</p>
		</div>
		<div style="border-width: 1px; border-color: {validKeys[key].color};" class="h-4 w-full">
			<div
				style=" width :{clamp(value / maxValue, 0, 1) * 100}%; background-color: {validKeys[key]
					.color};"
				class="h-full"
			></div>
		</div>
	</div>
{/if}
