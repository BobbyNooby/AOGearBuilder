<script>
	import { sortType } from '$lib/utils/filterSortStore';
	import { fade } from 'svelte/transition';
	import { sortList } from '$lib/data/sortList';
	import { staticImagesRootFolder } from '$lib/dataConstants';

	function setSortType(value) {
		sortType.set(value);
	}

	let menuIsActive = false;

	function menuToggle() {
		menuIsActive = !menuIsActive;
	}
</script>

<div>
	<button
		on:click={() => {
			menuToggle();
		}}><img src="{staticImagesRootFolder}/sort.jpg" alt="Gear Button" /></button
	>

	{#if menuIsActive}
		<div
			class="z-10 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 fixed overflow-y-auto"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
		>
			<div class="fixed inset-0 flex items-center justify-center">
				<div class="w-1/2">
					{#each sortList as sort (sort.id)}
						<div class="mb-4">
							<button
								class="w-full bg-black border border-white text-white font-bold text-lg py-2 px-4 rounded"
								class:selected={sort.sortMethod === $sortType}
								on:click={() => {
									setSortType(sort.sortMethod);

									menuToggle();
								}}
							>
								<p>
									{sort.name}
								</p>
							</button>
						</div>
					{/each}
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
