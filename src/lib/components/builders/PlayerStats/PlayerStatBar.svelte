<script lang="ts">
	import { Player } from '$lib/gearBuilder/playerClasses';
	import PlayerStatIncrementor from './PlayerStatIncrementor.svelte';
	import { hexToRGB } from '$lib/utils/hexToRGB';
	import { isMobile } from '$lib/utils/mobileStore';

	export let statName: string,
		statColor: string,
		statLegend: string,
		statKey: 'vitalityPoints' | 'magicPoints' | 'strengthPoints' | 'weaponPoints',
		barColor: string,
		barValue: number,
		buttonColor: string,
		incrementorFunction: any,
		player: Player,
		maximumPlayerStatPoints: number;
</script>

{#if !$isMobile}
	<div class="flex flex-col my-5">
		<div class="flex flex-row justify-between w-full">
			<div class="flex flex-row pr-10 items-center text-left">
				<p
					style="font-family: 'Eagle Lake'; color : rgba({hexToRGB(statColor).r}, {hexToRGB(
						statColor
					).g}, {hexToRGB(statColor).b}, 1);"
					class="text-2xl"
				>
					{statName}
				</p>
				<p
					class="text-2xl mx-5"
					style="font-family: 'Eagle Lake'; color : rgba({hexToRGB(statColor).r}, {hexToRGB(
						statColor
					).g}, {hexToRGB(statColor).b}, 1);"
				>
					{player[statKey]}
				</p>
			</div>

			<div class="flex items-center text-right">
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, -10)}
					text={'-10'}
					color={buttonColor}
				/>
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, -1)}
					text={'-1'}
					color={buttonColor}
				/>
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, 1)}
					text={'+1'}
					color={buttonColor}
				/>
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, 10)}
					text={'+10'}
					color={buttonColor}
				/>
			</div>
		</div>

		<div
			class="border-2"
			style="border-color: rgba({hexToRGB(barColor).r}, {hexToRGB(barColor).g}, {hexToRGB(barColor)
				.b}, 1);;"
		>
			<div class="border-2 border-gray-800 bg-gray-800">
				<div
					class="h-2"
					style="background-color: rgba({hexToRGB(barColor).r}, {hexToRGB(barColor).g}, {hexToRGB(
						barColor
					).b}, 1); width: {(barValue / maximumPlayerStatPoints) * 100}%;"
				></div>
			</div>
		</div>
		<p class="m-1 text-gray-300" style="font-family: 'Open Sans', sans-serif;">{statLegend}</p>
	</div>
{:else}
	<div class="flex flex-col my-5">
		<div class="flex flex-col w-full">
			<div class="flex flex-row pr-10 items-center text-left my-5">
				<p
					style="font-family: 'Eagle Lake'; color : rgba({hexToRGB(statColor).r}, {hexToRGB(
						statColor
					).g}, {hexToRGB(statColor).b}, 1);"
					class="text-2xl"
				>
					{statName}
				</p>
				<p
					class="text-2xl mx-5"
					style="font-family: 'Eagle Lake'; color : rgba({hexToRGB(statColor).r}, {hexToRGB(
						statColor
					).g}, {hexToRGB(statColor).b}, 1);"
				>
					{player[statKey]}
				</p>
			</div>

			<div class="flex items-center text-right mb-4">
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, -10)}
					text={'-10'}
					color={buttonColor}
				/>
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, -1)}
					text={'-1'}
					color={buttonColor}
				/>
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, 1)}
					text={'+1'}
					color={buttonColor}
				/>
				<PlayerStatIncrementor
					incrementorFunction={() => incrementorFunction(statKey, 10)}
					text={'+10'}
					color={buttonColor}
				/>
			</div>
		</div>

		<div
			class="border-2"
			style="border-color: rgba({hexToRGB(barColor).r}, {hexToRGB(barColor).g}, {hexToRGB(barColor)
				.b}, 1);;"
		>
			<div class="border-2 border-gray-800 bg-gray-800">
				<div
					class="h-2"
					style="background-color: rgba({hexToRGB(barColor).r}, {hexToRGB(barColor).g}, {hexToRGB(
						barColor
					).b}, 1); width: {(barValue / maximumPlayerStatPoints) * 100}%;"
				></div>
			</div>
		</div>
		<p class="m-1 text-gray-300" style="font-family: 'Open Sans', sans-serif;">{statLegend}</p>
	</div>
{/if}
