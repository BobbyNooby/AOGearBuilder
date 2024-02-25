<script>
	import { get, writable } from 'svelte/store';
	import { isMobile } from '$lib/utils/mobileStore';
	import { playCorrect, playWrong } from '$lib/utils/sound.js';
	import { fade } from 'svelte/transition';
	import {
		finalAgility,
		finalAttackSize,
		finalAttackSpeed,
		finalIntensity
	} from '$lib/utils/statsStore';
	export let category, scalingType;

	//Mouse hover and position detection for tooltip
	let isHovering = false;
	let mousePosition = { x: 0, y: 0 };
	let hoverWidth = writable(290);

	let menuIsActive = false;

	// Checks if box will overflow and set new position if it will
	// uses documentElement which is the root element as this is the element that contains the scrolable content
	function setBoxPositionOverflow() {
		if (mousePosition.x + $hoverWidth + 20 >= document.documentElement?.clientWidth) {
			if (document.documentElement != null) {
				mousePosition.x =
					mousePosition.x - 40 - $hoverWidth + document.documentElement.scrollLeft;
			}
		} else {
			if (document.documentElement != null) {
				mousePosition.x += document.documentElement.scrollLeft;
			}
		}

		if (document.getElementById('hover') != null) {
			if (
				mousePosition.y + document.getElementById('hover').offsetHeight >=
				document.documentElement.clientHeight
			) {
				if (document.documentElement != null) {
					mousePosition.y =
						mousePosition.y -
						document.getElementById('hover').offsetHeight +
						document.documentElement.scrollTop;
				}
			} else {
				if (document.documentElement != null) {
					mousePosition.y += document.documentElement.scrollTop;
				}
			}
		}
	}

	// Called when the hover div is created
	function createdHover() {
		setBoxPositionOverflow();
	}

	function handleMouseOver(event) {
		isHovering = true;
		mousePosition = { x: event.clientX, y: event.clientY };

		setBoxPositionOverflow();
	}

	function handleMouseOut() {
		isHovering = false;
	}

	const itemStats = {
		agility: {
			name: 'AGILITY',
			fillColor: '#FFFFFF',
			strokeColor: '#00ffff',
			suffix: '%'
		},
		attackSpeed: {
			name: 'ATTACK SPEED',
			fillColor: '#FFFFFF',
			strokeColor: '#0077ff',
			suffix: '%'
		},
		attackSize: {
			name: 'ATTACK SIZE',
			fillColor: '#00FF00',
			strokeColor: '#471559',
			suffix: ''
		},
		intensity: {
			name: 'INTENSITY',
			fillColor: '#FFF200',
			strokeColor: '#712402',
			suffix: ''
		}
	};

	const percentValue = writable(0);
	const baseValue = writable(0);
	let multiplier = 0;
	if (scalingType == 'General') {
		multiplier = 1;
	} else if (scalingType == 'SpeedSize') {
		multiplier = 0.8;
	}

	$: {
		const variables = {
			agility: $finalAgility,
			attackSpeed: $finalAttackSpeed,
			attackSize: $finalAttackSize,
			intensity: $finalIntensity
		};

		console.log(get(finalAgility));
		baseValue.set(variables[category]);
		let x = variables[category];

		let percentCalc = (
			multiplier *
			1.35 *
			((16 * Math.pow(Math.log(0.1 * x + 4), 3) * 0.09 + 0.15 * x) /
				(0.1 + 0.15 * Math.pow(125, 0.5)) -
				0.79)
		).toFixed(2);

		percentValue.set(percentCalc);
	}
</script>

{#if !$isMobile}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex items-center" on:mousemove={handleMouseOver} on:mouseleave={handleMouseOut}>
		<img class="h-6" src="assets/images/stats/{category}.png" alt={category} />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[
				category
			].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[category]
				.strokeColor}; text-align: center;"
		>
			+{$baseValue}
			{itemStats[category].name}
		</p>
	</div>

	{#if isHovering}
		<div
			use:createdHover
			class="z-40 border border-white rounded"
			id="hover"
			style="
		  position: absolute;
		  background-color: black;
		  width: {$hoverWidth}px;
		  padding: 10px;
		  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		  color: white;
		  top: {mousePosition.y}px; 
		  left: {mousePosition.x + 20}px;
		  z-index : 40
		  
		"
		>
			<div class=" items-center text-center z-40">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="flex items-center justify-center"
					on:mousemove={handleMouseOver}
					on:mouseleave={handleMouseOut}
				>
					<img class="h-6" src="assets/images/stats/{category}.png" alt={category} />
					<p
						style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[
							category
						].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[
							category
						].strokeColor}; text-align: center;"
					>
						+{$percentValue}% {itemStats[category].name}
					</p>
				</div>
			</div>
		</div>
	{/if}
{/if}

{#if $isMobile}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex items-center"
		on:click={() => {
			menuIsActive = true;
			playCorrect();
		}}
	>
		<img class="h-6" src="assets/images/stats/{category}.png" alt={category} />
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[
				category
			].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[category]
				.strokeColor}; text-align: center;"
		>
			+{$baseValue}
			{itemStats[category].name}
		</p>
	</div>

	{#if menuIsActive}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="z-30 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col justify-center items-center"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
			on:click={() => {
				event.stopPropagation();
			}}
		>
			<div class="space-y-2 flex flex-col justify-center items-center z-40">
				<p class="text-center text-3xl text-white" style="font-family: Merriweather;">
					Stat Percentage Increase
				</p>
				<div class="pb-4 flex">
					<img class="h-6" src="assets/images/stats/{category}.png" alt={category} />
					<p
						style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: {itemStats[
							category
						].fillColor}; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: {itemStats[
							category
						].strokeColor}; text-align: center;"
					>
						+{$percentValue}% {itemStats[category].name}
					</p>
				</div>
				<div class="flex flex-row space-x-2">
					<button
						on:click={() => {
							menuIsActive = false;
							playCorrect();
						}}
						class="mb-4 w-20 h-20 bg-black border rounded border-white text-white font-bold text-lg py-2 px-4 items-center relative"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							fill="currentColor"
							class="bi bi-x-lg"
							viewBox="0 0 16 16"
							style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
						>
							<path
								d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}
