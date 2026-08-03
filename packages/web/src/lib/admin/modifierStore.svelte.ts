import { apiClient } from '$lib/api/client';
import { defaultModifier } from '$lib/adminSchemas';

type ToastFn = (message: string, type?: 'success' | 'error') => void;

export class ModifierStore {
	modifiers = $state<any[]>([]);
	query = $state('');
	modalOpen = $state(false);
	selectedId = $state<string | null>(null);
	draft: any = $state(null);
	deleteConfirm = $state(false);

	private notify: ToastFn;

	constructor(initialModifiers: any[], notify: ToastFn) {
		this.modifiers = initialModifiers;
		this.notify = notify;
	}

	get isNew() { return !this.draft?.id; }

	filteredModifiers = $derived(
		this.modifiers.filter((m: any) =>
			(m.name || m.id).toLowerCase().includes(this.query.toLowerCase())
		)
	);

	openModal(modifier: any) {
		this.selectedId = modifier?.id ?? null;
		this.draft = modifier ? { ...modifier } : { ...defaultModifier };
		this.modalOpen = true;
	}

	closeModal() {
		this.draft = null;
		this.selectedId = null;
		this.modalOpen = false;
	}

	createModifier() {
		this.openModal(null);
	}

	async saveModifier() {
		if (!this.draft) return;
		try {
			if (!this.draft.id) {
				const created = await apiClient('/api/admin/modifiers', {
					method: 'POST',
					body: JSON.stringify(this.draft)
				});
				this.modifiers = [created, ...this.modifiers];
				this.selectedId = created.id;
				this.closeModal();
				this.notify('Modifier created');
			} else {
				const updated = await apiClient(`/api/admin/modifiers/${this.draft.id}`, {
					method: 'PUT',
					body: JSON.stringify(this.draft)
				});
				this.modifiers = this.modifiers.map((m: any) => (m.id === updated.id ? updated : m));
				this.closeModal();
				this.notify('Modifier saved');
			}
		} catch (err: any) {
			this.notify(err.message, 'error');
		}
	}

	async deleteModifier() {
		if (!this.draft?.id) return;
		try {
			await apiClient(`/api/admin/modifiers/${this.draft.id}`, { method: 'DELETE' });
			this.modifiers = this.modifiers.filter((m: any) => m.id !== this.draft.id);
			this.closeModal();
			this.notify('Modifier deleted');
		} catch (err: any) {
			this.notify(err.message, 'error');
		}
		this.deleteConfirm = false;
	}
}
