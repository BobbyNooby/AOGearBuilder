<script module lang="ts">
	export interface FilterOption {
		value: string | boolean;
		label: string;
		count?: number;
	}

	export interface FilterCategory {
		key: string;
		label: string;
		options: FilterOption[];
		toggleMode?: boolean;
	}

	export interface SortOption {
		value: string;
		label: string;
	}

	export interface ActiveFilter {
		categoryKey: string;
		value: string | boolean;
		label: string;
		mode?: 'include' | 'exclude';
	}
</script>

<script lang="ts">
	import { SlidersHorizontal } from 'lucide-svelte';
	import FilterChip from './FilterChip.svelte';

	interface Props {
		categories?: FilterCategory[];
		filters?: ActiveFilter[];
		sort?: string;
		sortOptions?: SortOption[];
		showCount?: boolean;
		onChange?: (filters: ActiveFilter[], sort: string) => void;
	}

	let {
		categories = [],
		filters = [],
		sort = '',
		sortOptions = [],
		showCount = true,
		onChange
	}: Props = $props();

	let openCategory = $state<string | null>(null);
	let containerRef = $state<HTMLDivElement | null>(null);

	function selectedValues(categoryKey: string): (string | boolean)[] {
		return filters.filter((f) => f.categoryKey === categoryKey).map((f) => f.value);
	}

	function isSelected(categoryKey: string, value: string | boolean): boolean {
		return filters.some((f) => f.categoryKey === categoryKey && f.value === value);
	}

	function getMode(categoryKey: string, value: string | boolean): 'include' | 'exclude' | undefined {
		return filters.find((f) => f.categoryKey === categoryKey && f.value === value)?.mode;
	}

	function modeSymbol(mode?: 'include' | 'exclude'): string {
		if (mode === 'include') return '✓';
		if (mode === 'exclude') return '✕';
		return '·';
	}

	function modeClass(mode?: 'include' | 'exclude'): string {
		if (mode === 'include') return 'text-green-400';
		if (mode === 'exclude') return 'text-red-400';
		return 'text-gray-500';
	}

	function toggleFilter(category: FilterCategory, option: FilterOption) {
		const exists = isSelected(category.key, option.value);
		let next: ActiveFilter[];
		if (exists) {
			next = filters.filter(
				(f) => !(f.categoryKey === category.key && f.value === option.value)
			);
		} else {
			next = [
				...filters,
				{
					categoryKey: category.key,
					value: option.value,
					label: `${category.label}: ${option.label}`
				}
			];
		}
		onChange?.(next, sort);
	}

	function cycleMode(category: FilterCategory, option: FilterOption) {
		const current = getMode(category.key, option.value);
		let nextMode: 'include' | 'exclude' | undefined;
		if (!current) nextMode = 'include';
		else if (current === 'include') nextMode = 'exclude';
		else nextMode = undefined;

		let next = filters.filter(
			(f) => !(f.categoryKey === category.key && f.value === option.value)
		);
		if (nextMode) {
			next = [
				...next,
				{
					categoryKey: category.key,
					value: option.value,
					label: `${category.label}: ${option.label}`,
					mode: nextMode
				}
			];
		}
		onChange?.(next, sort);
	}

	function removeFilter(categoryKey: string, value: string | boolean) {
		const next = filters.filter((f) => !(f.categoryKey === categoryKey && f.value === value));
		onChange?.(next, sort);
	}

	function clearFilters() {
		onChange?.([], sort);
	}

	function handleSortChange(e: Event) {
		const nextSort = (e.target as HTMLSelectElement).value;
		onChange?.(filters, nextSort);
	}

	function handleWindowClick(e: MouseEvent) {
		if (openCategory && containerRef && !containerRef.contains(e.target as Node)) {
			openCategory = null;
		}
	}

	function categoryButtonLabel(category: FilterCategory): string {
		const catFilters = filters.filter((f) => f.categoryKey === category.key);
		if (catFilters.length === 0) return category.label;
		if (catFilters.length === 1) {
			const option = category.options.find((o) => o.value === catFilters[0].value);
			return `${category.label}: ${option?.label ?? catFilters[0].value} ${modeSymbol(catFilters[0].mode)}`;
		}
		return `${category.label}: ${catFilters.length} selected`;
	}
</script>

<svelte:window onclick={handleWindowClick} />

<div class="space-y-2" bind:this={containerRef}>
	<div class="flex flex-wrap items-center gap-2">
		{#each categories as category (category.key)}
			<div class="relative">
				<button
					type="button"
					onclick={() => (openCategory = openCategory === category.key ? null : category.key)}
					class="inline-flex items-center gap-1 rounded border border-white/30 bg-black px-2 py-1 text-xs text-white hover:bg-white/10 {selectedValues(category.key).length > 0 ? 'border-white/60 bg-white/5' : ''}"
				>
					{categoryButtonLabel(category)}
					<span class="text-gray-400">▾</span>
				</button>

				{#if openCategory === category.key}
					<div
						class="absolute left-0 top-full z-50 mt-1 max-h-64 min-w-[180px] overflow-y-auto rounded border border-gray-600 bg-black py-1 shadow-lg"
					>
						{#if category.toggleMode}
							<div class="border-b border-gray-700 px-3 py-1 text-xs text-gray-400">
								Click to cycle: include / exclude
							</div>
						{/if}
						{#each category.options as option (option.value)}
							{#if category.toggleMode}
								{@const mode = getMode(category.key, option.value)}
								<button
									type="button"
									onclick={() => cycleMode(category, option)}
									class="flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-1.5 text-left text-sm text-white hover:bg-white/10"
									aria-label="{option.label}: {mode ?? 'neutral'}"
								>
									<span class="inline-flex items-center gap-2">
										<span class="inline-flex h-4 w-4 items-center justify-center font-bold {modeClass(mode)}">
											{modeSymbol(mode)}
										</span>
										{option.label}
									</span>
									{#if showCount && option.count != null}
										<span class="text-xs text-gray-500">{option.count}</span>
									{/if}
								</button>
							{:else}
								<label
									class="flex cursor-pointer items-center justify-between gap-3 px-3 py-1.5 text-sm text-white hover:bg-white/10"
								>
									<span class="inline-flex items-center gap-2">
										<input
											type="checkbox"
											checked={isSelected(category.key, option.value)}
											onchange={() => toggleFilter(category, option)}
											class="rounded border-gray-600 bg-black text-white focus:ring-0"
										/>
										{option.label}
									</span>
									{#if showCount && option.count != null}
										<span class="text-xs text-gray-500">{option.count}</span>
									{/if}
								</label>
							{/if}
						{:else}
							<p class="px-3 py-1.5 text-xs text-gray-500">No options</p>
						{/each}
					</div>
				{/if}
			</div>
		{/each}

		{#if filters.length > 0}
			<button
				type="button"
				onclick={clearFilters}
				class="rounded px-2 py-1 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
			>
				Clear
			</button>
		{/if}

		{#if sortOptions.length > 0}
			<div class="ml-auto flex items-center gap-1.5">
				<SlidersHorizontal class="h-3 w-3 text-gray-400" />
				<select
					value={sort}
					onchange={handleSortChange}
					class="rounded border border-gray-600 bg-black px-2 py-1 text-xs text-white focus:border-white focus:outline-none"
				>
					{#each sortOptions as option (option.value)}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>
		{/if}
	</div>

	{#if filters.length > 0}
		<div class="flex flex-wrap items-center gap-1.5">
			{#each filters as filter (`${filter.categoryKey}-${filter.value}`)}
				<FilterChip
					label={filter.mode ? `${filter.label} ${modeSymbol(filter.mode)}` : filter.label}
					onRemove={() => removeFilter(filter.categoryKey, filter.value)}
				/>
			{/each}
		</div>
	{/if}
</div>
