<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import SubmitButton from './inputs/SubmitButton.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import SelectInput from './inputs/SelectInput.svelte';
	import type { anyItem } from '$lib/gearBuilder/itemTypes';
	import { Column, Table } from '$lib/utils/admin/table';
	import RangeInput from './inputs/RangeInput.svelte';
	import toast from 'svelte-french-toast';
	import { rarityColors, staticImagesRootFolder } from '$lib/dataConstants';
	import { roundDown } from '$lib/utils/roundDown';
	import ItemImage from '../shared/ItemImage.svelte';
	import { EnchantTable, EnchantColumn } from '$lib/utils/admin/enchantTable';
	import { calculateStatScaling, findImbue } from '$lib/utils/calculateScaling';
	import { ScalingTable, ScalingColumn } from '$lib/utils/admin/scalingTable';

	export let item: anyItem,
		mode: 'edit' | 'create',
		config: any,
		modifiers: Record<string, boolean>;

	let itemDefault: anyItem = Object.assign({}, item);

	function resetItem() {
		item = Object.assign({}, itemDefault);
	}

	let open = false;

	let finalSubmitData: string = '';

	let validImage = true;

	if (item.imageId == 'NO_IMAGE') {
		validImage = false;
		item.imageId = '';
	}

	function setMin(e: Event & { currentTarget: EventTarget & Element }) {
		if (e.target) {
			statsTable.minLevel = parseInt((e.target as HTMLInputElement).value) || 10;
			statsTable.updateColumns();
		}
	}

	function setMax(e: Event & { currentTarget: EventTarget & Element }) {
		if (e.target) {
			statsTable.maxLevel = parseInt((e.target as HTMLInputElement).value) || 10;
			statsTable.updateColumns();
		}
	}

	let title = 'None';

	$: title = item.name || 'None';
	const handleToggle = () => {
		open = !open;
	};

	const rarities = ['None', 'Common', 'Uncommon', 'Rare', 'Exotic', 'Legendary', 'Seasonal'];

	const mainTypeStats = {
		gearStatic: [
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
		],
		gearIncrement: [
			'powerIncrement',
			'defenseIncrement',
			'agilityIncrement',
			'attackSpeedIncrement',
			'attackSizeIncrement',
			'intensityIncrement',
			'regenerationIncrement',
			'piercingIncrement',
			'resistanceIncrement',

			'insanity',
			'warding',
			'drawback'
		],
		enchant: [
			'powerIncrement',
			'defenseIncrement',
			'agilityIncrement',
			'attackSpeedIncrement',
			'attackSizeIncrement',
			'intensityIncrement',
			'regenerationIncrement',
			'piercingIncrement',
			'resistanceIncrement',

			'insanity',
			'warding',
			'drawback'
		],
		ship: [
			'durability',
			'magicStorage',
			'ramDefense',
			'ramStrength',
			'resilience',
			'speed',
			'stability',
			'turning',

			'hullArmorSlot',
			'quartermasterSlot',
			'cannonSlot',
			'siegeWeaponSlot',
			'sailMaterialSlot',
			'shipCrewSlot',
			'ramSlot',
			'deckhandSlot'
		],
		shipStats: [
			'durability',
			'magicStorage',
			'ramDefense',
			'ramStrength',
			'resilience',
			'speed',
			'stability',
			'turning'
		],
		cannon: [
			'durability',
			'magicStorage',
			'ramDefense',
			'ramStrength',
			'resilience',
			'speed',
			'stability',
			'turning',

			'damageMultiplier',
			'rangeMultiplier',
			'fuseLength',
			'reloadTime'
		],
		ram: [
			'durability',
			'magicStorage',
			'ramDefense',
			'ramStrength',
			'resilience',
			'speed',
			'stability',
			'turning',
			'ramSpeed'
		],
		siegeWeapon: [
			'durability',
			'magicStorage',
			'ramDefense',
			'ramStrength',
			'resilience',
			'speed',
			'stability',
			'turning',

			'damageMultiplier',
			'rangeMultiplier',
			'spreadMultiplier',
			'fuseLength',
			'reloadTime'
		],
		allShipStats: [
			'durability',
			'magicStorage',
			'ramDefense',
			'ramStrength',
			'resilience',
			'speed',
			'stability',
			'turning',
			'ramSpeed',

			'damageMultiplier',
			'rangeMultiplier',
			'spreadMultiplier',
			'fuseLength',
			'reloadTime'
		]
	};

	const tableSettings: {
		mainType: {
			[key: string]: {
				levelVisibility: boolean;
				subTypes: string[] | null;
				statTypes: string[] | null;
				gemVisibility: boolean;
				modifiable: boolean;
				isShip: boolean;
			};
		};
	} = {
		mainType: {
			Accessory: {
				levelVisibility: true,
				subTypes: [
					'None',
					'Head',
					'Helmet',
					'Hat',
					'Face',
					'Neck',
					'Amulet',
					'Shoulder',
					'Collar',
					'Arms',
					'Arm',
					'Back',
					'Front',
					'Waist'
				],
				statTypes: ['None', 'Magic', 'Strength', 'Vitality'],
				gemVisibility: true,
				modifiable: true,
				isShip: false
			},
			Chestplate: {
				levelVisibility: true,
				subTypes: null,
				statTypes: ['None', 'Magic', 'Strength', 'Vitality'],
				gemVisibility: true,
				modifiable: true,
				isShip: false
			},
			Pants: {
				levelVisibility: true,
				subTypes: null,
				statTypes: ['None', 'Magic', 'Strength', 'Vitality'],
				gemVisibility: true,
				modifiable: true,
				isShip: false
			},
			Gem: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: false
			},
			Enchant: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			Modifier: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: false
			},
			Cannon: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			Deckhand: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			'Hull Armor': {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			Quartermaster: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			Ram: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			'Sail Material': {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			'Ship Crew': {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			Ship: {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			},
			'Siege Weapon': {
				levelVisibility: false,
				subTypes: null,
				statTypes: null,
				gemVisibility: false,
				modifiable: false,
				isShip: true
			}
		}
	};

	let statsTable: Table;
	let enchantTable: EnchantTable = new EnchantTable();
	let scalingTable: ScalingTable = new ScalingTable();
	if (mode == 'create') {
		statsTable = new Table(90, roundDown(config.maxLevel, 10), true, modifiers);
		enchantTable = new EnchantTable();
		scalingTable = new ScalingTable();
	}
	if (mode == 'edit') {
		if ('minLevel' in item && 'maxLevel' in item) {
			statsTable = new Table(item.minLevel, item.maxLevel, true, modifiers);
			const newMinLevel = Math.min(item.minLevel, item.maxLevel);
			const newMaxLevel = Math.max(item.minLevel, item.maxLevel);

			let filteredStats: any = {};
			for (let stat of item.statsPerLevel) {
				filteredStats[stat.level] = stat;
			}

			const newColumns = [];
			for (let level = newMinLevel; level <= newMaxLevel; level += 10) {
				let column: any = new Column(level, statsTable);
				if (level in filteredStats) {
					for (const [key, value] of Object.entries(filteredStats[level])) {
						column[key] = value;
						if (key != 'level') {
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
			statsTable = new Table(90, roundDown(config.maxLevel, 10), false, modifiers);
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

		enchantTable = new EnchantTable();
		if ('enchantTypes' in item) {
			for (const [key, value] of Object.entries(item.enchantTypes as {})) {
				enchantTable.selected[key].bool = true;

				if (key == 'gear') {
					statsTable = new Table(90, roundDown(config.maxLevel, 10), false, modifiers);
					let column: any = new Column(0, statsTable);
					for (const [key, stat] of Object.entries(value as {})) {
						if (key in column) {
							column[key] = stat;
						}
						if (key in statsTable.visiBools) {
							statsTable.visiBools[key].bool = true;
						}
					}
					statsTable.columns = [column];
				}

				if (key == 'ship') {
					const newColumns = [];
					for (const component of enchantTable.getComponentOptions()) {
						if (component in (value as {})) {
							let column: any = new EnchantColumn(component, enchantTable);
							enchantTable.visiBoolsComponents[component].bool = true;
							for (const [statName, stat] of Object.entries((value as any)[component])) {
								column[statName] = stat;
								if (statName != 'component') {
									enchantTable.visiBools[statName].bool = true;
								}
							}
							newColumns.push(column);
						}
					}
					enchantTable.columns = newColumns;
				}
			}
		}

		scalingTable = new ScalingTable();
		if ('scaling' in item) {
			let column: any = new ScalingColumn(scalingTable);
			for (let statName of Object.keys(item.scaling)) {
				column[statName] = item.scaling[statName];
				statsTable.visiBools[statName].bool = true;
			}
			scalingTable.column = column;
		}
	}

	let validCategories: string[] = mainTypeStats.gearStatic;

	function updateMainType() {
		if (
			item.subType &&
			(tableSettings.mainType[item.mainType].subTypes == null ||
				!tableSettings.mainType[item.mainType].subTypes?.includes(item.subType))
		) {
			item.subType = 'None';
		}
		if (['Accessory', 'Chestplate', 'Pants', 'Gem'].includes(item.mainType)) {
			validCategories = mainTypeStats.gearStatic;
		} else if (['Modifier'].includes(item.mainType)) {
			validCategories = mainTypeStats.gearIncrement;
		} else if (['Enchant'].includes(item.mainType)) {
			validCategories = mainTypeStats.enchant;
		} else if (['Ram'].includes(item.mainType)) {
			validCategories = mainTypeStats.ram;
		} else if (['Cannon'].includes(item.mainType)) {
			validCategories = mainTypeStats.cannon;
		} else if (['Siege Weapon'].includes(item.mainType)) {
			validCategories = mainTypeStats.siegeWeapon;
		} else if (['Ship'].includes(item.mainType)) {
			validCategories = mainTypeStats.ship;
		} else {
			validCategories = mainTypeStats.shipStats;
		}

		for (const stat in statsTable.visiBools) {
			if (!validCategories.includes(stat)) {
				statsTable.visiBools[stat].bool = false;
			}
		}
		statsTable.levelVisibility = tableSettings.mainType[item.mainType].levelVisibility;
		statsTable.updateColumns();
	}

	function generateEntry() {
		let tempItem: Partial<anyItem> = {
			id: item.id,
			name: item.name,
			legend: item.legend,
			mainType: item.mainType,
			rarity: item.rarity,
			imageId: item.imageId,
			deleted: item.deleted
		};

		if (!validImage) {
			tempItem.imageId = 'NO_IMAGE';
		}

		let scalingTableData = scalingTable.getData();
		if (Object.keys(scalingTableData).length != 0) {
			tempItem.scaling = scalingTableData;
		}

		if (['Accessory', 'Chestplate', 'Pants'].includes(item.mainType)) {
			tempItem.subType = item.subType;
			tempItem.statType = item.statType;
			tempItem.gemNo = item.gemNo;
			tempItem.minLevel = statsTable.minLevel;
			tempItem.maxLevel = statsTable.maxLevel;
			tempItem.statsPerLevel = statsTable.getData();
			tempItem.validModifiers = [];
			for (const modifier in statsTable.validModifiers) {
				if (statsTable.validModifiers[modifier] == true) {
					tempItem.validModifiers.push(modifier);
				}
			}
		} else if (['Enchant'].includes(item.mainType)) {
			tempItem.enchantTypes = {};
			if (enchantTable.selected.gear.bool == true) {
				tempItem.enchantTypes['gear'] = {};
				for (const statKey in statsTable.getData()) {
					tempItem.enchantTypes.gear[statKey] = statsTable.getData()[statKey];
				}
			}
			if (enchantTable.selected.ship.bool == true) {
				tempItem.enchantTypes['ship'] = {};
				for (let column of enchantTable.getData()) {
					tempItem.enchantTypes.ship[column.component] = {};
					for (const [key, value] of Object.entries(column)) {
						if (!['parentTable', 'component'].includes(key)) {
							tempItem.enchantTypes.ship[column.component][key] = value;
						}
					}
				}
			}
		} else {
			for (const statKey in statsTable.getData()) {
				tempItem[statKey] = statsTable.getData()[statKey];
			}
		}

		// Size of data in bytes
		console.log(tempItem, new Blob([JSON.stringify(tempItem)]).size);
		finalSubmitData = JSON.stringify(tempItem);
	}

	onMount(() => {
		statsTable.updateColumns();
		updateMainType();
	});
</script>

{#if mode == 'create'}
	<button
		class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
		on:click={() => handleToggle()}>Create Item</button
	>
{/if}

{#if mode == 'edit'}
	<button class="w-24 h-24" on:click={() => handleToggle()}>
		<ItemImage {item} />
	</button>
{/if}

{#if open}
	<div
		class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0 overflow-x-hidden overflow-y-auto"
	>
		<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
		<div
			class="bg-white flex flex-col w-full lg:h-max lg:w-5/6 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto max-h-full"
		>
			<form
				method="POST"
				action="?/{mode == 'create' ? 'create' : 'edit'}"
				on:submit={generateEntry}
				use:enhance={() => {
					return async ({ result, update }) => {
						update({ reset: false });

						if (result.type === 'success') {
							handleToggle();
							if (mode == 'create') {
								toast.success('Successfully created ' + item.name + '!');
								resetItem();
							}
							if (mode == 'edit') {
								toast.success('Successfully updated ' + item.name + '!');
							}
						}

						if (result.type === 'failure') {
							if (result['data'] !== undefined && result['data']['error'] !== undefined) {
								toast.error('Error: ' + result['data']['error']);
							} else {
								toast.error('Error: Unknown');
							}
						}
					};
				}}
			>
				<div
					class="flex flex-shrink-0 justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold overflow-hidden"
				>
					{title}
					<button
						class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
						on:click={() => handleToggle()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 0 24 24"
							width="24px"
							fill="#000000"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
							/>
						</svg>
					</button>
				</div>

				<div class="content p-8 pt-2 overflow-y-auto">
					<!-- uncomment when auth system setup -->
					<input type="hidden" id="itemData" name="itemData" value={finalSubmitData} required />

					<h6 class="mb-1 text-lg font-bold text-gray-900">Info</h6>
					<div class="grid gap-6 mb-6 md:grid-cols-4">
						<TextInput
							id={'name'}
							name={'Name'}
							placeholder={'None'}
							isRequired={true}
							bind:value={item.name}
						/>
						<SelectInput
							id={'rarity'}
							name={'Rarity'}
							dropdowns={rarities}
							isRequired={true}
							bind:value={item.rarity}
							tooltip={'Please select a rarity'}
						/>
						<SelectInput
							id={'mainType'}
							name={'Category'}
							dropdowns={Object.keys(tableSettings.mainType)}
							bind:value={item.mainType}
							onChange={updateMainType}
							isRequired={true}
							tooltip={'Please select a category'}
						/>
						<!-- fix the types by just changing them reactively at the top-->
						{#if tableSettings.mainType[item.mainType].subTypes != null}
							<SelectInput
								id={'subType'}
								name={'Sub Category'}
								bind:value={item.subType}
								bind:dropdowns={tableSettings.mainType[item.mainType].subTypes}
								isRequired={true}
								tooltip={'Please select a sub category'}
							/>
						{/if}
					</div>
					<div class="grid gap-6 mb-6 md:grid-cols-4">
						{#if tableSettings.mainType[item.mainType].gemVisibility == true}
							<RangeInput
								id={'gemNo'}
								name={'Gem No'}
								min={0}
								max={3}
								bind:value={item.gemNo}
								isRequired={true}
							/>
						{/if}
						{#if tableSettings.mainType[item.mainType].levelVisibility == true}
							<RangeInput
								id={'minLevel'}
								name={'Min Level'}
								value={statsTable.minLevel}
								min={10}
								max={statsTable.maxLevel}
								step={10}
								onChange={setMin}
								isRequired={true}
							/>
							<RangeInput
								id={'maxLevel'}
								name={'Max Level'}
								value={statsTable.maxLevel}
								min={statsTable.minLevel}
								max={roundDown(config.maxLevel, 10)}
								step={10}
								onChange={setMax}
								isRequired={true}
							/>
						{/if}
						{#if tableSettings.mainType[item.mainType].statTypes != null}
							<SelectInput
								id={'statType'}
								name={'Stat Type'}
								bind:value={item.statType}
								bind:dropdowns={tableSettings.mainType[item.mainType].statTypes}
								isRequired={true}
								tooltip={'Please select a stat type'}
							/>
						{/if}
					</div>
					<div class="grid gap-6 mb-6 md:grid-cols-6">
						<div class="col-span-3">
							<TextInput
								id={'legend'}
								name={'Legend'}
								isRequired={true}
								placeholder={'None'}
								bind:value={item.legend}
							/>
						</div>
						<div class="col-span-2">
							<TextInput
								id={'imageId'}
								name={'Image ID'}
								bind:value={item.imageId}
								placeholder={'NO_IMAGE'}
							/>
						</div>
						<!-- 
							
						 Image part 
					
					
					-->
						<div class="w-24 h-24 col-span-1 mx-auto my-auto">
							<ItemImage {item} borderWidth={2} />
						</div>
					</div>

					<h6 class="mb-1 text-lg font-bold text-gray-900">Stats</h6>

					<!-- 
                        
                    VisiBools
                    
                -->
					{#if item.mainType == 'Enchant'}
						<h6 class="mb-1 text-md font-bold text-gray-900">Stat Types</h6>
						<div class="flex flex-wrap items-center">
							{#each enchantTable.getSelectOptions() as key}
								<div class="px-2">
									<input
										id={key}
										type="checkbox"
										bind:checked={enchantTable.selected[key].bool}
										on:input={() => {
											enchantTable.updateColumns();
										}}
									/>
									<label for={key}>{enchantTable.selected[key].text}</label>
								</div>
							{/each}
						</div>
					{/if}

					{#if item.mainType != 'Enchant' || (item.mainType == 'Enchant' && enchantTable.selected.gear.bool == true)}
						<h6 class="mb-1 text-md font-bold text-gray-900">Stat Options</h6>
						<div class="flex flex-wrap items-center">
							{#each validCategories as key}
								<div class="px-2">
									<input
										id={key}
										type="checkbox"
										bind:checked={statsTable.visiBools[key].bool}
										on:input={() => {
											statsTable.updateColumns();
										}}
									/>
									<label for={key}>{statsTable.visiBools[key].text}</label>
								</div>
							{/each}
						</div>

						<!-- 
			
						Modifier Checkboxes 
					
					-->

						{#if tableSettings.mainType[item.mainType].modifiable == true}
							<h6 class="mb-1 text-md font-bold text-gray-900">Modifier Options</h6>
							<div class="flex flex-wrap items-center">
								{#each Object.keys(statsTable.validModifiers) as key}
									<div class="px-2">
										<input
											id={key}
											type="checkbox"
											bind:checked={statsTable.validModifiers[key]}
											on:input={() => {
												statsTable.updateColumns();
											}}
										/>
										<label for={key}>{key}</label>
									</div>
								{/each}
							</div>
						{/if}

						<!--

						Scaling Table

						-->

						{#if ['Accessory', 'Chestplate', 'Pants'].includes(item.mainType || '')}
							<div class="grid grid-cols-6 md:grid-cols-12">
								<div class="col-span-1">
									<div class="w-full mb-1 font-bold">Scaling</div>

									{#each Object.keys(scalingTable.visiBools) as stat}
										{#if statsTable.visiBools[stat].bool === true}
											<div class="w-full pb-1 h-6 items-center">
												<img
													class="object-contain h-6"
													alt={scalingTable.visiBools[stat].text}
													src={scalingTable.visiBools[stat].imageId}
												/>
											</div>
										{/if}
									{/each}
								</div>
								<div class="col-span-1">
									<div class="w-full mb-1 font-bold">-</div>
									{#each Object.keys(scalingTable.column) as key}
										{#if key != 'parentTable'}
											{#if statsTable.visiBools[key].bool === true}
												<input
													type="number"
													step="any"
													class="w-full h-6 max-w-full bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block p-1"
													bind:value={scalingTable.column[key]}
													placeholder={'0'}
												/>
											{/if}
										{/if}
									{/each}
								</div>
							</div>
							{#if statsTable.visiBools['insanity'].bool || statsTable.visiBools['drawback'].bool || statsTable.visiBools['warding'].bool}
								<h6 class="text-sm font-bold text-gray-900">
									Insanity, Drawback and Warding scaling will be treated as flat values.
								</h6>
							{/if}
						{/if}

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
											<img
												class="object-contain h-6"
												alt={statsTable.visiBools[stat].text}
												src={statsTable.visiBools[stat].imageId}
											/>
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
												<input
													type="number"
													step="any"
													class="w-full h-6 max-w-full bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block p-1"
													bind:value={column[key]}
													placeholder={calculateStatScaling(
														{ ...item, scaling: scalingTable.column },
														key,
														column.level,
														config,
														findImbue(item, config)
													).toString()}
												/>
											{/if}
										{/if}
									{/each}
								</div>
							{/each}
						</div>
					{/if}

					{#if item.mainType == 'Enchant' && enchantTable.selected.ship.bool == true}
						<h6 class="mb-1 text-md font-bold text-gray-900">Ship Components</h6>
						<div class="flex flex-wrap items-center">
							{#each enchantTable.getComponentOptions() as key}
								<div class="px-2">
									<input
										id={key}
										type="checkbox"
										bind:checked={enchantTable.visiBoolsComponents[key].bool}
										on:input={(e) => {
											enchantTable.visiBoolsComponents[key].bool = e.currentTarget?.checked;
											enchantTable.updateColumns();
										}}
									/>
									<label for={key}>{enchantTable.visiBoolsComponents[key].text}</label>
								</div>
							{/each}
						</div>

						<h6 class="mb-1 text-md font-bold text-gray-900">Stat Options</h6>
						<div class="flex flex-wrap items-center">
							{#each mainTypeStats['allShipStats'] as key}
								<div class="px-2">
									<input
										id={key}
										type="checkbox"
										bind:checked={enchantTable.visiBools[key].bool}
										on:input={() => {
											enchantTable.updateColumns();
										}}
									/>
									<label for={key}>{enchantTable.visiBools[key].text}</label>
								</div>
							{/each}
						</div>

						<div class="grid grid-cols-6 md:grid-cols-12">
							<div class="col-span-1">
								<div class="w-full mb-1 font-bold">Stats</div>

								{#each Object.keys(enchantTable.visiBools) as stat}
									{#if enchantTable.visiBools[stat].bool === true}
										<div class="w-full pb-1 h-6 items-center">
											<img
												class="object-contain h-6"
												alt={enchantTable.visiBools[stat].text}
												src={enchantTable.visiBools[stat].imageId}
											/>
										</div>
									{/if}
								{/each}
							</div>
							{#each enchantTable.columns as column}
								<div class="col-span-1">
									{#each Object.keys(column) as key}
										{#if key != 'parentTable'}
											{#if key === 'component'}
												<div class="w-full mb-1 font-bold">
													{enchantTable.visiBoolsComponents[column.component].text}
												</div>
											{:else if key !== 'component ' && enchantTable.visiBools[key].bool === true}
												<input
													type="number"
													step="any"
													class="w-full h-6 max-w-full bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block p-1"
													bind:value={column[key]}
													placeholder={'0'}
												/>
											{/if}
										{/if}
									{/each}
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<SubmitButton text={mode == 'create' ? 'Create' : 'Update'} />
			</form>
		</div>
	</div>
{/if}
