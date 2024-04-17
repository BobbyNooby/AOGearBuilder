<script>
	import { filterType } from '$lib/utils/filterSortStore';
	import { fade } from 'svelte/transition';
	import { filterList } from '$lib/data/filterList';
	import { get } from 'svelte/store';
	import { rarityColors } from '$lib/dataConstants';

	let menuIsActive = false;

	function menuToggle() {
		menuIsActive = !menuIsActive;
	}

	function toggleFilter(filter) {
		const currentFilters = $filterType;
		if (currentFilters.includes(filter)) {
			filterType.set(currentFilters.filter((f) => f !== filter));
		} else {
			filterType.set([...currentFilters, filter]);
		}
		console.log(get(filterType).length);
	}
</script>

<div>
	<button on:click={menuToggle}>
		<img src="assets/images/filter.jpg" alt="Gear Button" />
	</button>

	{#if menuIsActive}
		<div
			class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<div class="fixed inset-0 flex flex-col items-center justify-center overflow-y-auto">
				<button
					on:click={() => {
						menuToggle();
					}}
					class=" my-4 w-24 h-24 bg-black border rounded border-white text-white font-bold text-lg py-2 px-4 items-center relative"
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
				<div>
					{#each filterList as filter (filter.id)}
						<div
							class="p-5 mb-4 border border-white bg-black text-xl"
							style="font-family: Merriweather;"
						>
							<label class="flex items-center">
								<input
									type="checkbox"
									class="mr-2 w-10 h-10"
									checked={$filterType.includes(filter.filter)}
									on:change={() => toggleFilter(filter.filter)}
								/>
								<p style="color : {rarityColors[filter.filter]}">
									{filter.name}
								</p>
							</label>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
