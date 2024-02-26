<script>
	import { writable } from 'svelte/store';
	import { isMobile } from '$lib/utils/mobileStore';
	import { playCorrect} from '$lib/utils/sound.js';
	import { fade } from 'svelte/transition';
	import {
		finalAgility,
		finalAttackSize,
		finalAttackSpeed,
		finalDefense,
		finalDrawback,
		finalInsanity,
		finalIntensity,
		finalPower,
		finalWarding
	} from '$lib/utils/statsStore';

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

    let efficiencyPoints = 0;

    $: {
        efficiencyPoints = ($finalPower*3)+$finalAttackSpeed+$finalAttackSize+$finalIntensity+$finalAgility+($finalDefense/3)+($finalWarding*18)-($finalInsanity*36)-($finalDrawback*18)
    }
</script>

{#if !$isMobile}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex items-center py-5" style="border-top: 2px solid white;" on:mousemove={handleMouseOver} on:mouseleave={handleMouseOut}>
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white; text-align: center;"
		>
			Efficiency Points: {Math.round((efficiencyPoints + Number.EPSILON) * 100) / 100}
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
					class="items-center justify-center"
					on:mousemove={handleMouseOver}
					on:mouseleave={handleMouseOut}
				>
					<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/power.png" alt="power" />= 3EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/attackSpeed.png" alt="attackSpeed" /><img style="display:inline;" class="h-6" src="assets/images/stats/attackSize.png" alt="attackSize" /><img style="display:inline;" class="h-6" src="assets/images/stats/intensity.png" alt="intensity" /><img style="display:inline;" class="h-6" src="assets/images/stats/agility.png" alt="agility" />= 1EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        3<img style="display:inline;" class="h-6" src="assets/images/stats/defense.png" alt="defense" />= 1EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/warding.png" alt="defense" />= 18EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/insanity.png" alt="insanity" />= -36EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/drawback.png" alt="drawback" />= -18EP
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
		class="flex items-center py-5"
        style="border-top: 2px solid white;"
		on:click={() => {
			menuIsActive = true;
			playCorrect();
		}}
	>
		<p
			style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white; text-align: center;"
		>
            Efficiency Points: {Math.round((efficiencyPoints + Number.EPSILON) * 100) / 100}
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
			<div class="space-y-2 flex flex-col justify-center items-center z-40 text-white">
				<p class="text-center text-3xl text-white" style="font-family: Merriweather;">
					Efficiency Points Guide
				</p>
				<div class="pb-4">
					<p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/power.png" alt="power" />= 3EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/attackSpeed.png" alt="attackSpeed" /><img style="display:inline;" class="h-6" src="assets/images/stats/attackSize.png" alt="attackSize" /><img style="display:inline;" class="h-6" src="assets/images/stats/intensity.png" alt="intensity" /><img style="display:inline;" class="h-6" src="assets/images/stats/agility.png" alt="agility" />= 1EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        3<img style="display:inline;" class="h-6" src="assets/images/stats/defense.png" alt="defense" />= 1EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/warding.png" alt="defense" />= 18EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/insanity.png" alt="insanity" />= -36EP
					</p>
                    <p style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: white text-align: center;">
                        1<img style="display:inline;" class="h-6" src="assets/images/stats/drawback.png" alt="drawback" />= -18EP
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
