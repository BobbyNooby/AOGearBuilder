<script lang="ts">
	import { magicDetailsList } from '$lib/data/magicDetails';
	import { staticImagesRootFolder } from '$lib/dataConstants';
	import { Player } from '$lib/gearBuilder/playerClasses';
	import { fade } from 'svelte/transition';
	import MagicStatBar from './MagicStatBar.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { clamp } from '$lib/utils/clamp';
	import type { magic } from '$lib/gearBuilder/playerTypes';
	import { RGBtoHex, hexToRGB } from '$lib/utils/hexToRGB';

	export let updatePage: any, player: Player, magicName: string, magicIndex: number;

	let isMenuOpen = false;

	let selectedMagic = magicDetailsList[magicName];

	const tweenDuration = 300;
	const easingMethod = cubicOut;

	const magicSizeTween = tweened(selectedMagic.magicSize, {
		duration: tweenDuration,
		easing: cubicOut
	});

	const magicSpeedTween = tweened(selectedMagic.magicSpeed, {
		duration: tweenDuration,
		easing: easingMethod
	});

	const magicDamageTween = tweened(selectedMagic.magicDamage, {
		duration: tweenDuration,
		easing: easingMethod
	});

	const magicDestructionTween = tweened(selectedMagic.magicDestruction, {
		duration: tweenDuration,
		easing: easingMethod
	});

	const redTween = tweened(hexToRGB(selectedMagic.color).r, {
		duration: tweenDuration,
		easing: easingMethod
	});

	const greenTween = tweened(hexToRGB(selectedMagic.color).g, {
		duration: tweenDuration,
		easing: easingMethod
	});

	const blueTween = tweened(hexToRGB(selectedMagic.color).b, {
		duration: tweenDuration,
		easing: easingMethod
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleMagicChange(magicName: keyof typeof magicDetailsList) {
		selectedMagic = magicDetailsList[magicName];
		magicSizeTween.set(selectedMagic.magicSize);
		magicSpeedTween.set(selectedMagic.magicSpeed);
		magicDamageTween.set(selectedMagic.magicDamage);
		magicDestructionTween.set(selectedMagic.magicDestruction);

		redTween.set(hexToRGB(selectedMagic.color).r);
		greenTween.set(hexToRGB(selectedMagic.color).g);
		blueTween.set(hexToRGB(selectedMagic.color).b);

		player.setMagic(magicName as magic, magicIndex);
	}

	function handleMagicSelect() {
		const hasDuplicate = player.magics.some(
			(magic, index) => index !== magicIndex && magic === selectedMagic.name
		);
		if (!hasDuplicate) {
			player.setMagic(selectedMagic.name as magic, magicIndex);
			toggleMenu();
			updatePage();
		}
	}
</script>

<div>
	<button
		on:click={toggleMenu}
		class="bg-black border border-white text-white font-bold text-lg py-2 px-4 w-28 h-28 items-center m-2"
	>
		<div class="items-center m-2">
			<img src="{staticImagesRootFolder}/Magics/{magicName}_Magic.webp" alt="Test" />
			<p style="font-family: Merriweather;">{magicName}</p>
		</div>
	</button>
</div>

<!-- Magic Selection Menu -->
{#if isMenuOpen}
	<div
		style="background-color: rgba(21, 55, 97, 0.8);"
		class="z-20 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col justify-center items-center"
		id="menuouter"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
	>
		<p class="text-center text-3xl my-4 text-white" style="font-family: Merriweather;">
			Select Magic
		</p>
		<div class="flex flex-row border-white rounded border w-3/4 overflow-x-auto">
			{#each Object.values(magicDetailsList) as magicOption}
				<div class="m-2">
					<button
						on:click={() => {
							handleMagicChange(magicOption.name);

							// updatePage();
						}}
						class="bg-black border border-white text-white font-bold text-sm py-2 px-4 w-28 h-28 items-center text-center"
						style="font-family: Merriweather;"
					>
						<img src={magicOption.imageId} alt={magicOption.name} />
						<p style="font-family: Merriweather;">{magicOption.name}</p>
					</button>
				</div>
			{/each}
		</div>

		<div class="flex flex-row w-full px-24 py-10">
			<div class="flex flex-col w-1/2 mx-5">
				<MagicStatBar
					minBarValue={0}
					maxBarValue={1.3}
					barText="SIZE"
					redTween={$redTween}
					greenTween={$greenTween}
					blueTween={$blueTween}
					magicStat={$magicSizeTween}
				></MagicStatBar>
				<MagicStatBar
					minBarValue={0}
					maxBarValue={1.8}
					barText="SPEED"
					redTween={$redTween}
					greenTween={$greenTween}
					blueTween={$blueTween}
					magicStat={$magicSpeedTween}
				></MagicStatBar>
				<MagicStatBar
					minBarValue={0}
					maxBarValue={1.05}
					barText="DAMAGE"
					redTween={$redTween}
					greenTween={$greenTween}
					blueTween={$blueTween}
					magicStat={$magicDamageTween}
				></MagicStatBar>
				<MagicStatBar
					minBarValue={0}
					maxBarValue={1.2}
					barText="DESTRUCTION"
					redTween={$redTween}
					greenTween={$greenTween}
					blueTween={$blueTween}
					magicStat={$magicDestructionTween}
				></MagicStatBar>
			</div>

			<p
				class="text-center text-3xl my-4 text-white w-5/12 mx-5"
				style="font-family: Merriweather;"
			>
				{selectedMagic.legend}
			</p>
		</div>

		<button
			class="w-56 h-20 border-2 border-white bg-blue-500"
			on:click={handleMagicSelect}
			style="font-family: Merriweather;">Select Magic</button
		>
	</div>
{/if}
