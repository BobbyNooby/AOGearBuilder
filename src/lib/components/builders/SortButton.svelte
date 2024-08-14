<script>
	import { sortType, sortTypeStat } from '$lib/utils/filterSortStore';
	import { fade } from 'svelte/transition';
	import { sortList } from '$lib/data/sortList';
	import { staticImagesRootFolder } from '$lib/dataConstants';
	import { capitalizeEachWord } from '$lib/utils/admin/stringUtils';

	function setSortType(value) {
		sortType.set(value);
	}

	function setSortTypeStat(value) {
		sortTypeStat.set(value);
	}

	let menuIsActive = false;
	let statMenuIsActive = false;

	let gearStats = [
		'power',
		'defense',
		'agility',
		'attackSpeed',
		'attackSize',
		'intensity',
		'regeneration',
		'piercing',
		'resistance',

		'insanity',
		'warding',
		'drawback'
	];

	function menuToggle() {
		menuIsActive = !menuIsActive;
	}

	function statMenuToggle() {
		statMenuIsActive = !statMenuIsActive;
	}
</script>

<div>
	<button
		on:click={() => {
			menuToggle();
		}}><img src="{staticImagesRootFolder}/sort.jpg" alt="Gear Button" /></button
	>

	{#if menuIsActive || statMenuIsActive}
		<div
			class="z-50 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<div class="fixed inset-0 flex items-center justify-center">
				<div class="w-1/2">
					{#if menuIsActive}
						{#each sortList as sort (sort.id)}
							<div class="mb-4">
								<button
									class="w-full bg-black border border-white text-white font-bold text-lg py-2 px-4 rounded"
									class:selected={sort.sortMethod === $sortType}
									on:click={() => {
										setSortType(sort.sortMethod);

										menuToggle();
										if (sort.sortMethod == 'statHighest' || sort.sortMethod == 'statLowest') {
											statMenuIsActive = true;
										}
									}}
								>
									<p>
										{sort.name}
									</p>
								</button>
							</div>
						{/each}
					{:else if statMenuIsActive}
						{#each gearStats as stat}
							<div class="mb-4">
								<button
									class="w-full bg-black border border-white text-white font-bold text-lg py-2 px-4 rounded"
									class:selected={stat === $sortTypeStat}
									on:click={() => {
										setSortTypeStat(stat);

										statMenuToggle();
									}}
								>
									<p>
										{capitalizeEachWord(stat)}
									</p>
								</button>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.selected {
		background-color: #0099ff;
		-webkit-text-fill-color: black;
	}
</style>
