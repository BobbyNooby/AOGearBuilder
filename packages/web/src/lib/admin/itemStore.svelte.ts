import { apiClient } from '$lib/api/client';
import { defaultItem } from '$lib/adminSchemas';
import { RARITY_ORDER, equipTypeLabel, statsStyles } from '$lib/utils';
import type { ActiveFilter, FilterCategory, SortOption } from '$lib/components/ui/FilterBar.svelte';

type ToastFn = (message: string, type?: 'success' | 'error') => void;

function cap(s: string): string {
	return s ? s[0].toUpperCase() + s.slice(1) : '';
}

function matchesGemSlots(item: any, bucket: string): boolean {
	const slots = item.jewelSlots ?? 0;
	switch (bucket) {
		case '0': return slots === 0;
		case '1': return slots === 1;
		case '2': return slots === 2;
		case '3+': return slots >= 3;
		default: return false;
	}
}

export class ItemStore {
	items = $state<any[]>([]);
	query = $state('');
	filters: ActiveFilter[] = $state([]);
	sort = $state('ep_desc');
	modalOpen = $state(false);
	selectedId = $state<string | null>(null);
	draft: any = $state(null);
	deleteConfirm = $state(false);

	private notify: ToastFn;

	constructor(initialItems: any[], notify: ToastFn) {
		this.items = initialItems;
		this.notify = notify;
	}

	get isNew() { return !this.draft?.id; }

	filteredItems = $derived.by(() => {
		let list = this.items.filter((i: any) =>
			(i.name || i.id).toLowerCase().includes(this.query.toLowerCase())
		);

		const groups: Record<string, (string | boolean)[]> = {};
		for (const f of this.filters) {
			(groups[f.categoryKey] ||= []).push(f.value);
		}

		for (const [categoryKey, values] of Object.entries(groups)) {
			switch (categoryKey) {
				case 'type':
					list = list.filter((i: any) => values.includes(i.type));
					break;
				case 'rarity':
					list = list.filter((i: any) => values.includes(i.rarity));
					break;
				case 'equipType':
					list = list.filter((i: any) => values.includes(i.equipType));
					break;
				case 'statType':
					list = list.filter((i: any) => values.includes(i.statType || 'Normal'));
					break;
				case 'stats': {
					const statFilters = this.filters.filter((f) => f.categoryKey === 'stats');
					const includes = statFilters.filter((f) => f.mode === 'include').map((f) => String(f.value));
					const excludes = statFilters.filter((f) => f.mode === 'exclude').map((f) => String(f.value));
					if (includes.length) {
						list = list.filter((i: any) => includes.every((s) => (i.scaling ?? {})[s] != null));
					}
					if (excludes.length) {
						list = list.filter((i: any) => excludes.every((s) => (i.scaling ?? {})[s] == null));
					}
					break;
				}
				case 'endgame':
					list = list.filter((i: any) => i.isEndgame === true);
					break;
				case 'hasImage':
					list = list.filter((i: any) => !!i.imageUrl);
					break;
				case 'gems':
					list = list.filter((i: any) => values.some((v) => matchesGemSlots(i, String(v))));
					break;
			}
		}

		const rarityRank = (r: string) => RARITY_ORDER.indexOf(r ?? 'None');
		const epOf = (i: any) => Object.values(i.scaling ?? {}).reduce((s: number, v: any) => s + Number(v), 0);

		list = [...list].sort((a: any, b: any) => {
			if (this.sort === 'ep_asc' || this.sort === 'ep_desc') {
				const sign = this.sort === 'ep_asc' ? 1 : -1;
				return sign * (epOf(a) - epOf(b));
			}
			const statMatch = this.sort.match(/^([\w]+)_(asc|desc)$/);
			if (statMatch && statsStyles[statMatch[1]]) {
				const [, stat, dir] = statMatch;
				const sign = dir === 'asc' ? 1 : -1;
				return sign * (((a.scaling ?? {})[stat] ?? 0) - ((b.scaling ?? {})[stat] ?? 0));
			}
			switch (this.sort) {
				case 'name_asc': return (a.name || a.id).localeCompare(b.name || b.id);
				case 'name_desc': return (b.name || b.id).localeCompare(a.name || a.id);
				case 'rarity_asc': return rarityRank(a.rarity) - rarityRank(b.rarity);
				case 'rarity_desc': return rarityRank(b.rarity) - rarityRank(a.rarity);
				case 'level_asc': return (a.minLevel ?? 0) - (b.minLevel ?? 0);
				case 'level_desc': return (b.minLevel ?? 0) - (a.minLevel ?? 0);
				default: return 0;
			}
		});

		return list;
	});

	sortOptions = $derived.by((): SortOption[] => {
		const statKeys = [
			...new Set(this.items.flatMap((i: any) => Object.keys(i.scaling ?? {})))
		].sort() as string[];
		return [
			{ value: 'ep_desc', label: 'EP ↓' },
			{ value: 'ep_asc', label: 'EP ↑' },
			{ value: 'rarity_desc', label: 'Rarity ↓' },
			{ value: 'rarity_asc', label: 'Rarity ↑' },
			...statKeys.flatMap((k) => {
				const name = statsStyles[k]?.name || cap(k);
				return [{ value: `${k}_desc`, label: `${name} ↓` }, { value: `${k}_asc`, label: `${name} ↑` }];
			}),
			{ value: 'name_asc', label: 'Name A-Z' },
			{ value: 'name_desc', label: 'Name Z-A' },
			{ value: 'level_asc', label: 'Level ↑' },
			{ value: 'level_desc', label: 'Level ↓' }
		];
	});

	filterCategories = $derived.by((): FilterCategory[] => {
		const types = [...new Set(this.items.map((i: any) => i.type).filter(Boolean))].sort() as string[];
		const rarities = ([...new Set(this.items.map((i: any) => i.rarity).filter(Boolean))] as string[])
			.sort((a, b) => RARITY_ORDER.indexOf(a ?? 'None') - RARITY_ORDER.indexOf(b ?? 'None'));
		const equipTypes = [...new Set(this.items.map((i: any) => i.equipType).filter(Boolean))].sort() as string[];
		const statTypes = [...new Set(this.items.map((i: any) => i.statType || 'Normal').filter(Boolean))].sort() as string[];
		const statKeys = [
			...new Set(this.items.flatMap((i: any) => Object.keys(i.scaling ?? {})))
		].sort() as string[];

		return [
			{
				key: 'type',
				label: 'Type',
				options: types.map((t) => ({ value: t, label: cap(t), count: this.items.filter((i: any) => i.type === t).length }))
			},
			{
				key: 'rarity',
				label: 'Rarity',
				options: rarities.map((r) => ({ value: r, label: r, count: this.items.filter((i: any) => i.rarity === r).length }))
			},
			{
				key: 'equipType',
				label: 'Subtype',
				options: equipTypes.map((e) => ({
					value: e,
					label: equipTypeLabel[e] || cap(e),
					count: this.items.filter((i: any) => i.equipType === e).length
				}))
			},
			{
				key: 'statType',
				label: 'Stat Type',
				options: statTypes.map((s) => ({
					value: s,
					label: s,
					count: this.items.filter((i: any) => (i.statType || 'Normal') === s).length
				}))
			},
			{
				key: 'stats',
				label: 'Stats',
				toggleMode: true,
				options: statKeys.map((s) => ({
					value: s,
					label: statsStyles[s]?.name || cap(s),
					count: this.items.filter((i: any) => (i.scaling ?? {})[s] != null).length
				}))
			},
			{
				key: 'endgame',
				label: 'Endgame',
				options: [{ value: true, label: 'Yes', count: this.items.filter((i: any) => i.isEndgame === true).length }]
			},
			{
				key: 'hasImage',
				label: 'Has Image',
				options: [{ value: true, label: 'Yes', count: this.items.filter((i: any) => !!i.imageUrl).length }]
			},
			{
				key: 'gems',
				label: 'Gems',
				options: ['0', '1', '2', '3+'].map((b) => ({
					value: b,
					label: b === '3+' ? '3+' : `${b} slot${b === '1' ? '' : 's'}`,
					count: this.items.filter((i: any) => matchesGemSlots(i, b)).length
				}))
			}
		].filter((c) => c.options.length > 0 && c.options.some((o) => o.count && o.count > 0));
	});

	openModal(item: any) {
		this.selectedId = item?.id ?? null;
		this.draft = item ? { ...item } : { ...defaultItem };
		this.modalOpen = true;
	}

	closeModal() {
		this.draft = null;
		this.selectedId = null;
		this.modalOpen = false;
	}

	createItem() {
		this.openModal(null);
	}

	async saveItem() {
		if (!this.draft) return;
		try {
			if (!this.draft.id) {
				const created = await apiClient('/api/admin/items', {
					method: 'POST',
					body: JSON.stringify(this.draft)
				});
				this.items = [created, ...this.items];
				this.selectedId = created.id;
				this.closeModal();
				this.notify('Item created');
			} else {
				const updated = await apiClient(`/api/admin/items/${this.draft.id}`, {
					method: 'PUT',
					body: JSON.stringify(this.draft)
				});
				this.items = this.items.map((i: any) => (i.id === updated.id ? updated : i));
				this.closeModal();
				this.notify('Item saved');
			}
		} catch (err: any) {
			this.notify(err.message, 'error');
		}
	}

	async deleteItem() {
		if (!this.draft?.id) return;
		try {
			await apiClient(`/api/admin/items/${this.draft.id}`, { method: 'DELETE' });
			this.items = this.items.filter((i: any) => i.id !== this.draft.id);
			this.closeModal();
			this.notify('Item deleted');
		} catch (err: any) {
			this.notify(err.message, 'error');
		}
		this.deleteConfirm = false;
	}
}
