import { apiClient } from '$lib/api/client';
import { defaultFormula } from '$lib/adminSchemas';

type ToastFn = (message: string, type?: 'success' | 'error') => void;

export class ConfigStore {
	gameConfig = $state<Record<string, any>>({});
	formulas = $state<Record<string, any>>({});
	formulaQuery = $state('');
	selectedFormulaKey = $state<string | null>(null);
	newFormulaKey = $state('');

	private notify: ToastFn;

	constructor(initialConfig: Record<string, any>, initialFormulas: Record<string, any>, notify: ToastFn) {
		this.gameConfig = initialConfig;
		this.formulas = initialFormulas;
		this.notify = notify;
	}

	formulaKeys = $derived(Object.keys(this.formulas));
	filteredFormulaKeys = $derived(
		this.formulaKeys.filter((k) => k.toLowerCase().includes(this.formulaQuery.toLowerCase()))
	);
	selectedFormula = $derived(this.selectedFormulaKey ? this.formulas[this.selectedFormulaKey] : null);

	async saveGameConfig() {
		try {
			await apiClient('/api/admin/config/game-config', {
				method: 'PUT',
				body: JSON.stringify(this.gameConfig)
			});
			this.notify('Game config saved');
		} catch (err: any) {
			this.notify(err.message, 'error');
		}
	}

	addFormula() {
		const key = this.newFormulaKey.trim();
		if (!key || this.formulas[key]) return;
		this.formulas = { ...this.formulas, [key]: { ...defaultFormula } };
		this.selectedFormulaKey = key;
		this.newFormulaKey = '';
	}

	updateFormula(key: string, next: any) {
		this.formulas = { ...this.formulas, [key]: next };
	}

	removeFormula(key: string) {
		if (!confirm(`Delete formula "${key}"?`)) return;
		const next = { ...this.formulas };
		delete next[key];
		this.formulas = next;
		if (this.selectedFormulaKey === key) this.selectedFormulaKey = Object.keys(next)[0] ?? null;
	}

	async saveFormulas() {
		try {
			await apiClient('/api/admin/config/formulas', {
				method: 'PUT',
				body: JSON.stringify(this.formulas)
			});
			this.notify('Formulas saved');
		} catch (err: any) {
			this.notify(err.message, 'error');
		}
	}
}
