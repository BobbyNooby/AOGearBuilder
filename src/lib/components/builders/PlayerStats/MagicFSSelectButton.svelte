<script lang="ts">
	import { type magicDetails, type fightingStyleDetails } from '$lib/data/playerAbilitiyTypes';
	import { staticImagesRootFolder } from '$lib/dataConstants';
	import { Player } from '$lib/gearBuilder/playerClasses';
	import { fade } from 'svelte/transition';
	import MagicFsStatBar from './MagicFSStatBar.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import type { fightingStyle, magic } from '$lib/gearBuilder/playerTypes';
	import { hexToRGB } from '$lib/utils/hexToRGB';
	import { get, writable } from 'svelte/store';
	import { magicRecords } from '$lib/data/playerMagics';
	import { fightingStyleRecords } from '$lib/data/playerFightingStyles';
	import { interpolateLab } from 'd3-interpolate';
	import { isMobile } from '$lib/utils/mobileStore';

	export let updatePage: any,
		player: Player,
		abilityName: string,
		abilityImageId: string,
		abilityIndex: number,
		abilityType: 'Magic' | 'Fighting Style';

	let isMenuOpen = false;

	let selectedAbility: magicDetails | fightingStyleDetails = null;
	let abilityList: Record<magic, magicDetails> | Record<fightingStyles, fightingStyleDetails> = {};

	if (abilityType == 'Magic') {
		selectedAbility = magicRecords[abilityName as keyof typeof magicRecords];
		abilityList = magicRecords;
	} else if (abilityType == 'Fighting Style') {
		selectedAbility = fightingStyleRecords[abilityName as keyof typeof fightingStyleRecords];
		abilityList = fightingStyleRecords;
	}

	const tweenDuration = 300;
	const easingMethod = cubicOut;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	const bar0Tween = tweened(
		selectedAbility.stats[
			Object.keys(selectedAbility.stats)[0] as keyof typeof selectedAbility.stats
		] || 0,
		{
			duration: tweenDuration,
			easing: easingMethod
		}
	);

	const bar1Tween = tweened(
		selectedAbility.stats[
			Object.keys(selectedAbility.stats)[1] as keyof typeof selectedAbility.stats
		] || 0,
		{
			duration: tweenDuration,
			easing: easingMethod
		}
	);

	const bar2Tween = tweened(
		selectedAbility.stats[
			Object.keys(selectedAbility.stats)[2] as keyof typeof selectedAbility.stats
		] || 0,
		{
			duration: tweenDuration,
			easing: easingMethod
		}
	);

	const bar3Tween = tweened(
		selectedAbility.stats[
			Object.keys(selectedAbility.stats)[3] as keyof typeof selectedAbility.stats
		] || 0,
		{
			duration: tweenDuration,
			easing: easingMethod
		}
	);

	const colorTween = tweened(
		`rgb(${hexToRGB(selectedAbility.color).r}, ${hexToRGB(selectedAbility.color).g}, ${hexToRGB(selectedAbility.color).b})`,
		{
			duration: tweenDuration,
			interpolate: interpolateLab,
			easing: easingMethod
		}
	);

	const genericFillTween = tweened(
		`rgb(${hexToRGB(selectedAbility.textColors.genericFillColor).r}, ${hexToRGB(selectedAbility.textColors.genericFillColor).g}, ${hexToRGB(selectedAbility.textColors.genericFillColor).b})`,
		{
			duration: tweenDuration,
			interpolate: interpolateLab,
			easing: easingMethod
		}
	);

	const genericStrokeTween = tweened(
		`rgb(${hexToRGB(selectedAbility.textColors.genericStrokeColor).r}, ${hexToRGB(selectedAbility.textColors.genericStrokeColor).g}, ${hexToRGB(selectedAbility.textColors.genericStrokeColor).b})`,
		{
			duration: tweenDuration,
			interpolate: interpolateLab,
			easing: easingMethod
		}
	);

	const effectFillTween = tweened(`rgb(0, 0, 0)`, {
		duration: tweenDuration,
		interpolate: interpolateLab,
		easing: easingMethod
	});

	const effectStrokeTween = tweened(`rgb(0, 0, 0)`, {
		duration: tweenDuration,
		interpolate: interpolateLab,
		easing: easingMethod
	});

	if (selectedAbility.type == 'Magic') {
		genericFillTween.set(
			`rgb(${hexToRGB(selectedAbility.textColors.genericFillColor).r}, ${hexToRGB(selectedAbility.textColors.genericFillColor).g}, ${hexToRGB(selectedAbility.textColors.genericFillColor).b})`
		);
		genericStrokeTween.set(
			`rgb(${hexToRGB(selectedAbility.textColors.genericStrokeColor).r}, ${hexToRGB(selectedAbility.textColors.genericStrokeColor).g}, ${hexToRGB(selectedAbility.textColors.genericStrokeColor).b})`
		);

		effectFillTween.set(
			`rgb(${hexToRGB(selectedAbility.statusEffect.effectFillColor).r}, ${hexToRGB(selectedAbility.statusEffect.effectFillColor).g}, ${hexToRGB(selectedAbility.statusEffect.effectFillColor).b})`
		);
		effectStrokeTween.set(
			`rgb(${hexToRGB(selectedAbility.statusEffect.effectStrokeColor).r}, ${hexToRGB(selectedAbility.statusEffect.effectStrokeColor).g}, ${hexToRGB(selectedAbility.statusEffect.effectStrokeColor).b})`
		);
	}

	$: tweenList = [$bar0Tween.value, $bar1Tween.value, $bar2Tween.value, $bar3Tween.value];

	function handleAbilityChange(ability: magicDetails | fightingStyleDetails) {
		selectedAbility = ability;
		bar0Tween.set(
			selectedAbility.stats[
				Object.keys(selectedAbility.stats)[0] as keyof typeof selectedAbility.stats
			] || 0
		);
		bar1Tween.set(
			selectedAbility.stats[
				Object.keys(selectedAbility.stats)[1] as keyof typeof selectedAbility.stats
			] || 0
		);
		bar2Tween.set(
			selectedAbility.stats[
				Object.keys(selectedAbility.stats)[2] as keyof typeof selectedAbility.stats
			] || 0
		);
		bar3Tween.set(
			selectedAbility.stats[
				Object.keys(selectedAbility.stats)[3] as keyof typeof selectedAbility.stats
			] || 0
		);

		colorTween.set(
			`rgb(${hexToRGB(selectedAbility.color).r}, ${hexToRGB(selectedAbility.color).g}, ${hexToRGB(selectedAbility.color).b})`
		);

		genericFillTween.set(
			`rgb(${hexToRGB(selectedAbility.textColors.genericFillColor).r}, ${hexToRGB(selectedAbility.textColors.genericFillColor).g}, ${hexToRGB(selectedAbility.textColors.genericFillColor).b})`
		);
		genericStrokeTween.set(
			`rgb(${hexToRGB(selectedAbility.textColors.genericStrokeColor).r}, ${hexToRGB(selectedAbility.textColors.genericStrokeColor).g}, ${hexToRGB(selectedAbility.textColors.genericStrokeColor).b})`
		);

		if (selectedAbility.type == 'Magic') {
			effectFillTween.set(
				`rgb(${hexToRGB(selectedAbility.statusEffect.effectFillColor).r}, ${hexToRGB(selectedAbility.statusEffect.effectFillColor).g}, ${hexToRGB(selectedAbility.statusEffect.effectFillColor).b})`
			);
			effectStrokeTween.set(
				`rgb(${hexToRGB(selectedAbility.statusEffect.effectStrokeColor).r}, ${hexToRGB(selectedAbility.statusEffect.effectStrokeColor).g}, ${hexToRGB(selectedAbility.statusEffect.effectStrokeColor).b})`
			);
		}
	}

	function handleAbilitySelect() {
		const hasDuplicate =
			player.magics.some(
				(ability, index) => index !== abilityIndex && ability === selectedAbility.name
			) ||
			player.fightingStyles.some(
				(ability, index) => index !== abilityIndex && ability === selectedAbility.name
			);
		if (!hasDuplicate) {
			if (abilityType == 'Magic') {
				player.setMagic(selectedAbility.name as magic, abilityIndex);
			} else if (abilityType == 'Fighting Style') {
				player.setFightingStyle(selectedAbility.name as fightingStyle, abilityIndex);
			}
			toggleMenu();
			updatePage();
		}
	}

	const statTextRelations = {
		magicSize: 'Magic Size',
		magicSpeed: 'Magic Speed',
		magicDamage: 'Magic Damage',
		magicDestruction: 'Magic Destruction',

		fightingStyleDamage: 'Fighting Style Damage',
		fightingStyleSpeed: 'Fighting Style Speed',
		fightingStyleSize: 'Fighting Style Size',

		misc: 'Misc'
	};
</script>

<div>
	<button
		on:click={toggleMenu}
		class="bg-black border border-white text-white font-bold text-sm py-2 px-4 w-40 h-40 items-center m-1"
	>
		<div class="items-center m-2">
			<img src={abilityImageId} alt="Test" />
			<p style="font-family: Merriweather;">{abilityName}</p>
		</div>
	</button>
</div>

<!-- Magic Selection Menu -->
{#if isMenuOpen}
	{#if !$isMobile}
		<div
			style="background-color: rgba(21, 55, 97, 0.9);"
			class="z-20 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col items-center overflow-auto"
			id="menuouter"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<p class="text-center text-3xl mt-20 mb-4 text-white" style="font-family: Merriweather;">
				Select {abilityType}
			</p>
			<div
				class="flex flex-row border-white rounded border w-3/4 overflow-x-scroll items-center min-h-36"
			>
				{#each Object.values(abilityList) as abilityOption}
					<div class="m-2">
						<button
							on:click={() => {
								handleAbilityChange(abilityOption);
								// updatePage();
							}}
							class="bg-black border border-white text-white font-bold text-sm py-2 px-4 w-36 h-36 items-center text-center"
							style="font-family: Merriweather;"
						>
							<img src={abilityOption.imageId} alt={abilityOption.name} />
							<p class="text-center" style="font-family: Merriweather;">{abilityOption.name}</p>
						</button>
					</div>
				{/each}
			</div>

			<div class="flex flex-row w-full px-24 py-10">
				<div class="flex flex-col w-1/2 items-center">
					<p
						style="color: {$genericFillTween};  -webkit-text-stroke-color: {$genericStrokeTween}; -webkit-text-stroke: 1px; font-family: Merriweather;"
						class="text-center text-3xl my-4"
					>
						{selectedAbility.name}
						{#if selectedAbility.type == 'Magic'}Magic{/if}
					</p>
					{#each Object.values(selectedAbility.stats) as statBarDetails, i}
						<MagicFsStatBar
							minBarValue={statBarDetails.minValue}
							maxBarValue={statBarDetails.maxValue}
							barText={statBarDetails.text}
							rgbString={$colorTween}
							statValue={tweenList[i]}
						/>
					{/each}
					{#if selectedAbility.type == 'Magic' && selectedAbility.statusEffect.name != 'NONE'}
						<div
							class="flex flex-col text-4xl text-center"
							style="color: {$genericFillTween};  -webkit-text-stroke-color: {$genericStrokeTween}; -webkit-text-stroke: 1px; font-family: Merriweather;"
						>
							<p class="mt-5">
								Status Effect - <span
									style="color : {$effectFillTween}; -webkit-text-stroke-color: {$effectStrokeTween};"
									>{selectedAbility.statusEffect.name}</span
								>
							</p>
							<p class="text-2xl">{selectedAbility.statusEffect.description}</p>
							<p
								class="text-xl"
								style="color : {selectedAbility.statusEffect
									.applyMethodFillColor}; -webkit-text-stroke-color: {selectedAbility.statusEffect
									.applyMethodStrokeColor}; -webkit-text-stroke: 1px;"
							>
								{selectedAbility.statusEffect.applyMethod}
							</p>
						</div>
					{/if}
				</div>

				<div class="flex flex-col w-1/2 items-center">
					<p class="text-center text-2xl my-4 text-white mx-5" style="font-family: Merriweather;">
						{selectedAbility.legend}
					</p>

					<p class="text-center text-3xl my-4 text-white mx-5" style="font-family: Merriweather;">
						Extra Stats
					</p>
					<div class="w-full px-5 text-white" style="font-family: Merriweather;">
						{#each Object.keys(selectedAbility.extraStats) as extraStatKey}
							{#if selectedAbility.extraStats[extraStatKey].length != 0}
								<div class="flex flex-row py-2">
									<div class="w-1/3">
										<p>{statTextRelations[extraStatKey]}</p>
									</div>
									<div class="flex flex-col w-2/3">
										{#each selectedAbility.extraStats[extraStatKey] as extraStatString}
											<p>{extraStatString}</p>
										{/each}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>

			<button
				class="p-4 w-56 h-20 border-2 border-white bg-blue-500 text-white text-xl"
				on:click={handleAbilitySelect}
				style="font-family: Merriweather;">Select {abilityType}</button
			>
		</div>
	{:else}
		<!-- 
		
		
		Mobile View 
	
	
	
	-->

		<div
			style="background-color: rgba(21, 55, 97, 0.9);"
			class="z-20 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col items-center overflow-auto"
			id="menuouter"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<p class="text-center text-3xl mt-20 mb-4 text-white" style="font-family: Merriweather;">
				Select {abilityType}
			</p>
			<div
				class="flex flex-row border-white rounded border min-h-40 w-full px-2 overflow-x-scroll items-center"
			>
				{#each Object.values(abilityList) as abilityOption}
					<div class="m-2">
						<button
							on:click={() => {
								handleAbilityChange(abilityOption);
								// updatePage();
							}}
							class="bg-black border border-white text-white font-bold text-sm py-2 px-4 w-36 h-36 items-center text-center"
							style="font-family: Merriweather;"
						>
							<img src={abilityOption.imageId} alt={abilityOption.name} />
							<p class="text-center" style="font-family: Merriweather;">{abilityOption.name}</p>
						</button>
					</div>
				{/each}
			</div>

			<div class="flex flex-row w-full px-2 py-10">
				<div class="flex flex-col w-1/2 items-center">
					<p
						style="color: {$genericFillTween};  -webkit-text-stroke-color: {$genericStrokeTween}; -webkit-text-stroke: 1px; font-family: Merriweather;"
						class="text-center text-2xl my-4"
					>
						{selectedAbility.name}
						{#if selectedAbility.type == 'Magic'}Magic{/if}
					</p>
					{#each Object.values(selectedAbility.stats) as statBarDetails, i}
						<MagicFsStatBar
							minBarValue={statBarDetails.minValue}
							maxBarValue={statBarDetails.maxValue}
							barText={statBarDetails.text}
							rgbString={$colorTween}
							statValue={tweenList[i]}
						/>
					{/each}
					{#if selectedAbility.type == 'Magic' && selectedAbility.statusEffect.name != 'NONE'}
						<div
							class="flex flex-col text-2xl text-center mt-5"
							style="color: {$genericFillTween};  -webkit-text-stroke-color: {$genericStrokeTween}; -webkit-text-stroke: 1px; font-family: Merriweather;"
						>
							<p class="mt-3">
								Status Effect<br />
								<span
									style="color : {$effectFillTween}; -webkit-text-stroke-color: {$effectStrokeTween};"
									>{selectedAbility.statusEffect.name}</span
								>
							</p>
							<p class="text-lg mt-3">{selectedAbility.statusEffect.description}</p>
							<p
								class="text-xl mt-3"
								style="color : {selectedAbility.statusEffect
									.applyMethodFillColor}; -webkit-text-stroke-color: {selectedAbility.statusEffect
									.applyMethodStrokeColor}; -webkit-text-stroke: 1px;"
							>
								{selectedAbility.statusEffect.applyMethod}
							</p>
						</div>
					{/if}
				</div>

				<div class="flex flex-col w-1/2 items-center">
					<p class="text-center text-lg my-4 text-white mx-5" style="font-family: Merriweather;">
						{selectedAbility.legend}
					</p>

					<p class="text-center text-xl my-4 text-white mx-5" style="font-family: Merriweather;">
						Extra Stats
					</p>
					<div class="w-full text-sm px-1 text-white" style="font-family: Merriweather;">
						{#each Object.keys(selectedAbility.extraStats) as extraStatKey}
							{#if selectedAbility.extraStats[extraStatKey].length != 0}
								<div class="flex flex-row py-2">
									<div class="w-1/3">
										<p>{statTextRelations[extraStatKey]}</p>
									</div>
									<div class="flex flex-col w-2/3">
										{#each selectedAbility.extraStats[extraStatKey] as extraStatString}
											<p>{extraStatString}</p>
										{/each}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>

			<button
				class="mb-5 p-4 w-56 h-20 border-2 border-white bg-blue-500 text-white text-xl"
				on:click={handleAbilitySelect}
				style="font-family: Merriweather;">Select {abilityType}</button
			>
		</div>
	{/if}
{/if}
