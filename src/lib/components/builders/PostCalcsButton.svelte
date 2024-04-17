<script lang="ts">
	import { get, writable } from 'svelte/store';
	import ItemTooltip from './ItemTooltip.svelte';
	import { isMobile } from '$lib/utils/mobileStore';
	import { fade } from 'svelte/transition';
	import type { ArmorSlot } from '$lib/gearBuilder/ArmorSlot';
	import type { Player } from '$lib/gearBuilder/playerClasses';
	export let slot: ArmorSlot, slotKey: string, player: Player;

	let slotStats = slot.getSlotStats();

	//Mouse hover and position detection for tooltip
	let isHovering = false;
	let mousePosition = { x: 0, y: 0 };
	let hoverWidth = writable(100);

	let menuIsActive = false;

	// Checks if box will overflow and set new position if it will
	// uses documentElement which is the root element as this is the element that contains the scrolable content
	function setBoxPositionOverflow() {
		if (mousePosition.x + $hoverWidth + 20 >= document.documentElement?.clientWidth) {
			if (document.documentElement != null) {
				mousePosition.x = mousePosition.x - 40 - $hoverWidth + document.documentElement.scrollLeft;
			}
		} else {
			if (document.documentElement != null) {
				mousePosition.x += document.documentElement.scrollLeft;
			}
		}

		if (document.getElementById('hover') != null) {
			if (
				mousePosition.y + document.getElementById('hover').offsetHeight >=
				document.documentElement?.clientHeight
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
</script>

{#if !$isMobile}
	<button
		on:mousemove={handleMouseOver}
		on:mouseleave={handleMouseOut}
		class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 text-white w-10 rounded-lg flex items-center aspect-square justify-center"
	>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="20"
				height="20"
				fill="currentColor"
				><path
					d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
				/>
			</svg>
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
					<ItemTooltip
						item={slotStats}
						showName={false}
						{player}
						{slotKey}
						isItemMenu={false}
						atlanteanAttribute={slot.chosenAtlanteanAttribute}
						showOnlyAtlanteanStat={false}
					/>
				</div>
			</div>
		{/if}
	</button>
{/if}

{#if $isMobile}
	<button
		on:click={() => {
			menuIsActive = true;
		}}
		class="border border-slate-300 bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 h-1/2 rounded-lg flex items-center aspect-square justify-center"
	>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="20"
				height="20"
				fill="currentColor"
				><path
					d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
				/>
			</svg>
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
						Current Item's Stats
					</p>
					<div class="pb-4">
						<ItemTooltip
							item={slotStats}
							showName={false}
							{player}
							{slotKey}
							isItemMenu={false}
							atlanteanAttribute={slot.chosenAtlanteanAttribute}
							showOnlyAtlanteanStat={false}
						/>
					</div>
					<div class="flex flex-row space-x-2">
						<button
							on:click={() => {
								menuIsActive = false;
							}}
						>
							<div
								class=" my-4 w-24 h-24 bg-black border rounded border-white text-white font-bold text-lg items-center object-contain relative"
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
							</div>
						</button>
					</div>
				</div>
			</div>
		{/if}
	</button>
{/if}
