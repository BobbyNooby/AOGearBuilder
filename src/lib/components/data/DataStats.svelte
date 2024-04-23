<script lang="ts">
    import { onMount } from 'svelte';
	import type { anyItem } from '$lib/gearBuilder/itemTypes';
	import { Column, Table } from '$lib/utils/admin/table';
	import { rarityColors } from '$lib/dataConstants';
	import DataImage from './DataImage.svelte';

	export let item:anyItem;

    let open = false;

	let validImage = true;

	if (item.imageId == "NO_IMAGE") {
		validImage = false;
		item.imageId = "";
    }

    let title = "None";

    $: title = item.name || "None";
    const handleToggle = () => {
        open = !open
    }

    let statsTable: Table;
    if ("minLevel" in item && "maxLevel" in item) {
        statsTable = new Table(item.minLevel, item.maxLevel, true);
        const newMinLevel = Math.min(item.minLevel, item.maxLevel);
        const newMaxLevel = Math.max(item.minLevel, item.maxLevel);

        let filteredStats:any = {};
        for (let stat of item.statsPerLevel) {
            filteredStats[stat.level] = stat;
        }

        const newColumns = [];
        for (let level = newMinLevel; level <= newMaxLevel; level += 10) {
            let column: any = new Column(level, statsTable);
            if (level in filteredStats) {
                for (const [key, value] of Object.entries(filteredStats[level])) {
                    column[key] = value;
                    if (key != "level") {
                        statsTable.visiBools[key].bool = true;
                    }
                }
                newColumns.push(column);
            }
            newColumns.push(column);
        }

        for (const modifier of item.validModifiers) {
            if (modifier in statsTable.validModifiers) {
                statsTable.validModifiers[modifier] = true;
            }
        }

        statsTable.minLevel = newMinLevel;
        statsTable.maxLevel = newMaxLevel;
        statsTable.columns = newColumns;
    } else {
        statsTable = new Table(90, 130, false);
        let column: any = new Column(0, statsTable);
        for (const [key, value] of Object.entries(item)) {
            if (key in column) {
                column[key] = value;
            }
            if (key in statsTable.visiBools) {
                statsTable.visiBools[key].bool = true;
            }
        }
        statsTable.columns = [column];
    }


	onMount(() => {
		statsTable.updateColumns();
	});

</script>

<button class="w-24 h-24 flex items-center justify-center" style="border-color: {rarityColors[item.rarity]}; border-width: 1px; background-color: #020202;"on:click={() => handleToggle()}>
    <DataImage {item} />
</button>


{#if open}
<div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0 overflow-x-hidden overflow-y-auto">
    <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
    <div class="bg-white flex flex-col w-full lg:h-max lg:w-5/6 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto max-h-full">
        <div class="flex flex-shrink-0 justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold overflow-hidden">
            {title}
            <button class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4" on:click={() => handleToggle()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            </button>
        </div>

        <div class="content p-8 pt-2 overflow-y-auto">
            <!--

                Table

            -->
            
            <div class="grid grid-cols-6 md:grid-cols-12">
                <div class="col-span-1">
                    {#if statsTable.levelVisibility}
                        <div class="w-full mb-1 font-bold">Level</div>
                    {:else}
                        <div class="w-full mb-1 font-bold">Stats</div>
                    {/if}

                    {#each Object.keys(statsTable.visiBools) as stat}
                        {#if statsTable.visiBools[stat].bool === true}
                            <div class="w-full pb-1 h-6 items-center">
                                <img class="object-contain h-6" alt={statsTable.visiBools[stat].text} src={statsTable.visiBools[stat].imageId} />
                            </div>
                        {/if}
                    {/each}
                </div>
                {#each statsTable.columns as column}
                    <div class="col-span-1">
                        {#each Object.keys(column) as key}
                            {#if key != 'parentTable'}
                                {#if key === 'level'}
                                    {#if statsTable.levelVisibility}
                                        <div class="w-full mb-1 font-bold">{column.level}</div>
                                    {:else}
                                        <div class="w-full mb-1 font-bold">-</div>
                                    {/if}
                                {:else if key !== 'level ' && statsTable.visiBools[key].bool === true}
                                    <input type="number" step="any" class="w-full h-6 max-w-full bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block p-1" bind:value={column[key]} placeholder={"0"} disabled />
                                {/if}
                            {/if}
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
{/if}