<script lang="ts">
	import { apiClient } from '$lib/api/client';
	import ConfigSection from '$lib/components/ui/ConfigSection.svelte';
	import Toast, { type Toast as ToastType } from '$lib/components/ui/Toast.svelte';
	import {
		Settings,
		Users,
		Shield,
		KeyRound,
		Server,
		Search,
		Plus,
		Trash2,
		Save,
		Copy
	} from 'lucide-svelte';
	import { hasPermission, PERMISSIONS, ALL_PERMISSIONS } from '@aotools/shared';

	let { data }: { data: any } = $props();

	// svelte-ignore state_referenced_locally
	let roles = $state(data.roles ?? []);
	// svelte-ignore state_referenced_locally
	let users = $state(data.users ?? []);
	// svelte-ignore state_referenced_locally
	let keys = $state(data.keys ?? []);
	// svelte-ignore state_referenced_locally
	let internalKeys = $state(data.internalKeys ?? []);
	// svelte-ignore state_referenced_locally
	let adminIds = $state(data.adminIds ?? []);

	let permissions = $derived(data.permissions ?? []);
	let canWriteRoles = $derived(hasPermission(permissions, PERMISSIONS.ROLES_WRITE));
	let canWriteUsers = $derived(hasPermission(permissions, PERMISSIONS.USERS_WRITE));
	let canWriteKeys = $derived(hasPermission(permissions, PERMISSIONS.KEYS_WRITE));
	let canWriteInternalKeys = $derived(hasPermission(permissions, PERMISSIONS.INTERNAL_KEYS_WRITE));
	let canWriteAdminIds = $derived(hasPermission(permissions, PERMISSIONS.ADMIN_IDS_WRITE));

	let toasts: ToastType[] = $state([]);

	// Roles
	// svelte-ignore state_referenced_locally
	let selectedRoleId = $state<string | null>((roles[0]?.id as string) ?? null);
	let newRoleName = $state('');
	let newRoleId = $state('');
	let roleSearch = $state('');

	// Users
	let userSearch = $state('');
	let expandedUserId = $state<string | null>(null);

	// Keys
	let newKeyName = $state('');
	let newKeyOwner = $state('');
	let newKeyRateLimit = $state(60);
	let newKeyScopes = $state<string[]>(['read']);
	let revealedKeyId = $state<string | null>(null);

	// Internal keys
	let newInternalLabel = $state('');
	let revealedInternalKeyId = $state<string | null>(null);

	// Admin IDs
	let newAdminId = $state('');

	let filteredRoles = $derived(
		roles.filter((r: any) => (r.name || r.id).toLowerCase().includes(roleSearch.toLowerCase()))
	);
	let selectedRole = $derived(roles.find((r: any) => r.id === selectedRoleId) ?? null);
	let editingRole = $state<any>(null);

	$effect(() => {
		if (selectedRole) {
			editingRole = { ...selectedRole };
		} else {
			editingRole = null;
		}
	});

	let filteredUsers = $derived(
		users.filter(
			(u: any) =>
				(u.name ?? '').toLowerCase().includes(userSearch.toLowerCase()) ||
				(u.email ?? '').toLowerCase().includes(userSearch.toLowerCase())
		)
	);

	function toast(message: string, type: 'success' | 'error' = 'success') {
		const id = crypto.randomUUID();
		toasts = [...toasts, { id, message, type }];
		setTimeout(() => (toasts = toasts.filter((t) => t.id !== id)), 3000);
	}

	function providerBadges(user: any) {
		if (!user.accounts?.length) return 'none';
		return user.accounts.map((a: any) => `${a.provider}:${a.accountId.slice(0, 8)}...`).join(', ');
	}

	// Roles
	async function createRole() {
		if (!newRoleName.trim()) return;
		const id = newRoleId.trim().toLowerCase() || newRoleName.trim().toLowerCase().replace(/\s+/g, '-');
		try {
			const created = await apiClient('/api/admin/roles', {
				method: 'POST',
				body: JSON.stringify({ id, name: newRoleName.trim(), permissions: [] })
			});
			roles = [...roles, created];
			selectedRoleId = created.id;
			newRoleName = '';
			newRoleId = '';
			toast('Role created');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function updateRole(role: any) {
		try {
			await apiClient(`/api/admin/roles/${role.id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					name: role.name,
					description: role.description,
					color: role.color,
					permissions: role.permissions
				})
			});
			roles = roles.map((r: any) => (r.id === role.id ? { ...role } : r));
			toast('Role saved');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function deleteRole(id: string) {
		if (!confirm('Delete this role?')) return;
		try {
			await apiClient(`/api/admin/roles/${id}`, { method: 'DELETE' });
			roles = roles.filter((r: any) => r.id !== id);
			if (selectedRoleId === id) selectedRoleId = roles[0]?.id ?? null;
			toast('Role deleted');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	function toggleRolePermission(role: any, permission: string) {
		const set = new Set(role.permissions ?? []);
		if (set.has(permission)) set.delete(permission);
		else set.add(permission);
		role.permissions = Array.from(set);
	}

	// Users
	async function updateUserRoles(user: any) {
		try {
			await apiClient(`/api/admin/users/${user.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ roles: user.roles })
			});
			toast('User roles updated');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	function toggleUserRole(user: any, roleId: string) {
		const set = new Set(user.roles ?? []);
		if (set.has(roleId)) set.delete(roleId);
		else set.add(roleId);
		user.roles = Array.from(set);
	}

	// API Keys
	async function createKey() {
		if (!newKeyName.trim()) return;
		try {
			const created = await apiClient('/api/admin/keys', {
				method: 'POST',
				body: JSON.stringify({
					name: newKeyName.trim(),
					owner: newKeyOwner.trim(),
					rateLimit: newKeyRateLimit,
					scopes: newKeyScopes
				})
			});
			keys = [created, ...keys];
			revealedKeyId = created.id;
			newKeyName = '';
			newKeyOwner = '';
			newKeyRateLimit = 60;
			newKeyScopes = ['read'];
			toast('API key created (copy it now)');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function updateKey(key: any) {
		try {
			await apiClient(`/api/admin/keys/${key.id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					name: key.name,
					owner: key.owner,
					active: key.active,
					scopes: key.scopes,
					rateLimit: key.rateLimit
				})
			});
			keys = keys.map((k: any) => (k.id === key.id ? { ...key } : k));
			toast('Key updated');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function deleteKey(id: string) {
		if (!confirm('Delete this API key?')) return;
		try {
			await apiClient(`/api/admin/keys/${id}`, { method: 'DELETE' });
			keys = keys.filter((k: any) => k.id !== id);
			toast('Key deleted');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function createInternalKey() {
		if (!newInternalLabel.trim()) return;
		try {
			const created = await apiClient('/api/admin/internal-keys', {
				method: 'POST',
				body: JSON.stringify({ label: newInternalLabel.trim() })
			});
			internalKeys = [created, ...internalKeys];
			revealedInternalKeyId = created.id;
			newInternalLabel = '';
			toast('Internal key created (copy it now)');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function updateInternalKey(key: any) {
		try {
			await apiClient(`/api/admin/internal-keys/${key.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ label: key.label, active: key.active })
			});
			internalKeys = internalKeys.map((k: any) => (k.id === key.id ? { ...key } : k));
			toast('Internal key updated');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function deleteInternalKey(id: string) {
		if (!confirm('Delete this internal key?')) return;
		try {
			await apiClient(`/api/admin/internal-keys/${id}`, { method: 'DELETE' });
			internalKeys = internalKeys.filter((k: any) => k.id !== id);
			toast('Internal key deleted');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function createAdminId() {
		if (!newAdminId.trim()) return;
		try {
			await apiClient('/api/admin/admin-ids', {
				method: 'POST',
				body: JSON.stringify({ accountId: newAdminId.trim() })
			});
			adminIds = [{ accountId: newAdminId.trim(), addedAt: new Date().toISOString() }, ...adminIds];
			newAdminId = '';
			toast('Admin ID added');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	async function deleteAdminId(id: string) {
		if (!confirm('Remove this admin ID?')) return;
		try {
			await apiClient(`/api/admin/admin-ids/${id}`, { method: 'DELETE' });
			adminIds = adminIds.filter((a: any) => a.accountId !== id && a.id !== id);
			toast('Admin ID removed');
		} catch (err: any) {
			toast(err.message, 'error');
		}
	}

	function formatDate(value: any) {
		if (!value) return '—';
		const d = new Date(value);
		return isNaN(d.getTime()) ? String(value) : d.toLocaleString();
	}
</script>

<svelte:head><title>Platform — AO Tools</title></svelte:head>

<Toast {toasts} />

<div class="p-4 md:p-6">
	<div class="mx-auto max-w-7xl space-y-6">
		<h1 class="text-2xl md:text-3xl" style="font-family:Merriweather,serif">Platform Config</h1>

		<ConfigSection title="Roles" icon={Shield} defaultOpen={true}>
			<div class="flex flex-col gap-4 md:flex-row">
				<div class="flex w-full flex-col gap-2 md:w-64">
					<div class="relative">
						<Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
						<input
							bind:value={roleSearch}
							placeholder="Search roles..."
							class="w-full rounded border border-gray-600 bg-black py-1.5 pl-7 pr-2 text-sm text-white focus:border-white focus:outline-none"
						/>
					</div>
					<div class="flex-1 space-y-1 overflow-auto md:max-h-[400px]">
						{#each filteredRoles as role (role.id)}
							<button
								onclick={() => selectedRoleId = role.id}
								class="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm {selectedRoleId === role.id ? 'bg-white text-black' : 'bg-black text-gray-300 hover:bg-white/10'}"
							>
								<span>{role.name || role.id}</span>
								{#if role.system}
									<span class="text-[10px] uppercase opacity-70">system</span>
								{/if}
							</button>
						{:else}
							<p class="text-sm text-gray-400">No roles.</p>
						{/each}
					</div>
					{#if canWriteRoles}
						<div class="rounded border border-white/10 bg-black/40 p-2">
							<p class="mb-2 text-xs font-bold uppercase text-gray-500">Create Role</p>
							<input
								bind:value={newRoleName}
								placeholder="Role name"
								class="mb-2 w-full rounded border border-gray-600 bg-black px-2 py-1.5 text-sm text-white focus:border-white focus:outline-none"
							/>
							<input
								bind:value={newRoleId}
								placeholder="Role id (optional)"
								class="mb-2 w-full rounded border border-gray-600 bg-black px-2 py-1.5 text-sm text-white focus:border-white focus:outline-none"
							/>
							<button
								onclick={createRole}
								class="inline-flex w-full items-center justify-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
							>
								<Plus class="h-4 w-4" /> Create
							</button>
						</div>
					{/if}
				</div>

			{#if editingRole}
				<div class="flex-1 rounded border border-white/10 bg-black/40 p-4">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl" style="font-family:Merriweather,serif">{editingRole.name || editingRole.id}</h3>
						{#if canWriteRoles && !editingRole.system}
							<button
								onclick={() => deleteRole(editingRole.id)}
								class="inline-flex items-center gap-1 rounded border border-red-500/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/20"
							>
								<Trash2 class="h-4 w-4" /> Delete
							</button>
						{/if}
					</div>
					{#if canWriteRoles}
						<div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
							<input
								bind:value={editingRole.name}
								placeholder="Name"
								class="rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
							/>
							<input
								bind:value={editingRole.color}
								placeholder="Color (hex)"
								class="rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
							/>
							<input
								bind:value={editingRole.description}
								placeholder="Description"
								class="rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none sm:col-span-2"
							/>
						</div>
						<button
							onclick={() => updateRole(editingRole)}
							class="mb-4 inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
						>
							<Save class="h-4 w-4" /> Save Role
						</button>
					{/if}
					<p class="mb-2 text-sm font-bold text-gray-300">Permissions</p>
					<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{#each ALL_PERMISSIONS as perm}
							<label class="flex items-center gap-2 text-sm text-gray-300">
								<input
									type="checkbox"
									checked={editingRole.permissions?.includes(perm)}
									onchange={() => toggleRolePermission(editingRole, perm)}
									disabled={!canWriteRoles}
									class="rounded border-gray-600 bg-black text-white"
								/>
								<span>{perm}</span>
							</label>
						{/each}
					</div>
				</div>
			{/if}
			</div>
		</ConfigSection>

		<ConfigSection title="Users" icon={Users}>
			<div class="flex flex-col gap-3">
				<div class="relative">
					<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
					<input
						bind:value={userSearch}
						placeholder="Search by name or email"
						class="w-full rounded border border-gray-600 bg-black py-2 pl-9 pr-3 text-white focus:border-white focus:outline-none"
					/>
				</div>
				<div class="overflow-x-auto rounded border border-white/10 bg-black/40">
					<table class="w-full text-left text-sm">
						<thead class="border-b border-white/10 bg-black/60 text-gray-300">
							<tr>
								<th class="px-4 py-3">Name</th>
								<th class="px-4 py-3">Email</th>
								<th class="px-4 py-3">Providers</th>
								<th class="px-4 py-3">Roles</th>
								<th class="px-4 py-3 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each filteredUsers as user (user.id)}
								<tr class="border-b border-white/10 last:border-0 hover:bg-white/5">
									<td class="px-4 py-3 font-medium">{user.name || '—'}</td>
									<td class="px-4 py-3 text-gray-400">{user.email || '—'}</td>
									<td class="px-4 py-3 text-xs text-gray-400">{providerBadges(user)}</td>
									<td class="px-4 py-3">
											<div class="flex flex-wrap gap-1">
												{#each user.roles ?? [] as roleId}
													{@const role = roles.find((r: any) => r.id === roleId)}
													<span
														class="inline-flex rounded px-2 py-0.5 text-xs font-bold"
														style={role?.color ? `background:${role.color};color:#000` : 'border:1px solid rgba(255,255,255,0.3)'}
													>
														{role?.name || roleId}
													</span>
												{/each}
											</div>
									</td>
									<td class="px-4 py-3 text-right">
										{#if canWriteUsers}
											<button
												onclick={() => expandedUserId = expandedUserId === user.id ? null : user.id}
												class="rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10"
											>
												Edit Roles
											</button>
										{/if}
									</td>
								</tr>
								{#if expandedUserId === user.id}
									<tr class="border-b border-white/10 bg-black/20">
										<td colspan="5" class="px-4 py-3">
											<div class="mb-2 text-xs font-bold uppercase text-gray-500">Assign Roles</div>
											<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
												{#each roles as role}
													<label class="flex items-center gap-2 text-sm text-gray-300">
														<input
															type="checkbox"
															checked={user.roles?.includes(role.id)}
															onchange={() => toggleUserRole(user, role.id)}
															class="rounded border-gray-600 bg-black text-white"
														/>
														<span>{role.name || role.id}</span>
													</label>
												{/each}
											</div>
											<button
												onclick={() => updateUserRoles(user)}
												class="mt-3 inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-1.5 text-sm hover:bg-white/10"
											>
												<Save class="h-4 w-4" /> Save Roles
											</button>
										</td>
									</tr>
								{/if}
							{:else}
								<tr>
									<td colspan="5" class="px-4 py-8 text-center text-gray-400">No users found.</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</ConfigSection>

		<ConfigSection title="API Keys" icon={KeyRound}>
			<div class="space-y-4">
				{#if canWriteKeys}
					<div class="rounded border border-white/10 bg-black/40 p-3">
						<p class="mb-2 text-xs font-bold uppercase text-gray-500">Create API Key</p>
						<div class="grid grid-cols-1 gap-3 sm:grid-cols-4">
							<input
								bind:value={newKeyName}
								placeholder="Name"
								class="rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
							/>
							<input
								bind:value={newKeyOwner}
								placeholder="Owner"
								class="rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
							/>
							<input
								type="number"
								bind:value={newKeyRateLimit}
								placeholder="Rate limit"
								class="rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
							/>
							<button
								onclick={createKey}
								class="inline-flex items-center justify-center gap-1 rounded border border-white bg-black px-3 py-2 text-sm hover:bg-white/10"
							>
								<Plus class="h-4 w-4" /> Create
							</button>
						</div>
						<div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
							{#each ALL_PERMISSIONS as perm}
								<label class="flex items-center gap-2 text-xs text-gray-300">
									<input
										type="checkbox"
										checked={newKeyScopes.includes(perm)}
										onchange={() => {
											const set = new Set(newKeyScopes);
											if (set.has(perm)) set.delete(perm);
											else set.add(perm);
											newKeyScopes = Array.from(set);
										}}
										class="rounded border-gray-600 bg-black text-white"
									/>
									<span>{perm}</span>
								</label>
							{/each}
						</div>
					</div>
				{/if}
				<div class="overflow-x-auto rounded border border-white/10 bg-black/40">
					<table class="w-full text-left text-sm">
						<thead class="border-b border-white/10 bg-black/60 text-gray-300">
							<tr>
								<th class="px-4 py-3">Name</th>
								<th class="px-4 py-3">Owner</th>
								<th class="px-4 py-3">Scopes</th>
								<th class="px-4 py-3">Rate Limit</th>
								<th class="px-4 py-3">Active</th>
								<th class="px-4 py-3 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each keys as key (key.id)}
								<tr class="border-b border-white/10 last:border-0 hover:bg-white/5">
									<td class="px-4 py-3">{key.name}</td>
									<td class="px-4 py-3 text-gray-400">{key.owner || '—'}</td>
									<td class="px-4 py-3">
										{#if canWriteKeys}
											<select
												multiple
												value={key.scopes ?? []}
												onchange={(e) => {
													const opts = Array.from(e.currentTarget.selectedOptions).map((o) => o.value);
													key.scopes = opts;
												}}
												class="h-20 w-full rounded border border-gray-600 bg-black px-2 py-1 text-xs text-white"
											>
												{#each ALL_PERMISSIONS as perm}
													<option value={perm}>{perm}</option>
												{/each}
											</select>
										{:else}
											<span class="text-xs text-gray-400">{(key.scopes ?? []).join(', ')}</span>
										{/if}
									</td>
									<td class="px-4 py-3">
										{#if canWriteKeys}
											<input
												type="number"
												bind:value={key.rateLimit}
												class="w-20 rounded border border-gray-600 bg-black px-2 py-1 text-white"
											/>
										{:else}
											{key.rateLimit}
										{/if}
									</td>
									<td class="px-4 py-3">
										{#if canWriteKeys}
											<input
												type="checkbox"
												bind:checked={key.active}
												class="rounded border-gray-600 bg-black text-white"
											/>
										{:else}
											<span class="text-gray-400">{key.active ? 'Yes' : 'No'}</span>
										{/if}
									</td>
									<td class="px-4 py-3 text-right">
										<div class="flex justify-end gap-2">
											{#if revealedKeyId === key.id && key.key}
												<span class="text-xs text-gray-300">{key.key}</span>
												<button
													onclick={() => { navigator.clipboard.writeText(key.key); toast('Copied'); }}
													class="text-gray-400 hover:text-white"
												>
													<Copy class="h-4 w-4" />
												</button>
											{/if}
											{#if canWriteKeys}
												<button
													onclick={() => updateKey(key)}
													class="text-gray-400 hover:text-white"
													aria-label="Save"
												>
													<Save class="h-4 w-4" />
												</button>
												<button
													onclick={() => deleteKey(key.id)}
													class="text-red-400 hover:text-red-300"
													aria-label="Delete"
												>
													<Trash2 class="h-4 w-4" />
												</button>
											{/if}
										</div>
									</td>
								</tr>
							{:else}
								<tr>
									<td colspan="6" class="px-4 py-8 text-center text-gray-400">No API keys.</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</ConfigSection>

		<ConfigSection title="Internal Keys" icon={Server}>
			<div class="space-y-4">
				{#if canWriteInternalKeys}
					<div class="flex max-w-md gap-2">
						<input
							bind:value={newInternalLabel}
							placeholder="Label"
							class="flex-1 rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
						/>
						<button
							onclick={createInternalKey}
							class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-2 text-sm hover:bg-white/10"
						>
							<Plus class="h-4 w-4" /> Create
						</button>
					</div>
				{/if}
				<div class="overflow-x-auto rounded border border-white/10 bg-black/40">
					<table class="w-full text-left text-sm">
						<thead class="border-b border-white/10 bg-black/60 text-gray-300">
							<tr>
								<th class="px-4 py-3">Label</th>
								<th class="px-4 py-3">Prefix</th>
								<th class="px-4 py-3">Active</th>
								<th class="px-4 py-3">Created</th>
								<th class="px-4 py-3 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each internalKeys as key (key.id)}
								<tr class="border-b border-white/10 last:border-0 hover:bg-white/5">
									<td class="px-4 py-3">
										{#if canWriteInternalKeys}
											<input
												bind:value={key.label}
												class="rounded border border-gray-600 bg-black px-2 py-1 text-white"
											/>
										{:else}
											{key.label}
										{/if}
									</td>
									<td class="px-4 py-3 text-gray-400">{key.keyPrefix || '—'}</td>
									<td class="px-4 py-3">
										{#if canWriteInternalKeys}
											<input
												type="checkbox"
												bind:checked={key.active}
												class="rounded border-gray-600 bg-black text-white"
											/>
										{:else}
											{key.active ? 'Yes' : 'No'}
										{/if}
									</td>
									<td class="px-4 py-3 text-gray-400">{formatDate(key.createdAt)}</td>
									<td class="px-4 py-3 text-right">
										<div class="flex justify-end gap-2">
											{#if revealedInternalKeyId === key.id && key.key}
												<span class="text-xs text-gray-300">{key.key}</span>
												<button
													onclick={() => { navigator.clipboard.writeText(key.key); toast('Copied'); }}
													class="text-gray-400 hover:text-white"
												>
													<Copy class="h-4 w-4" />
												</button>
											{/if}
											{#if canWriteInternalKeys}
												<button
													onclick={() => updateInternalKey(key)}
													class="text-gray-400 hover:text-white"
												>
													<Save class="h-4 w-4" />
												</button>
												<button
													onclick={() => deleteInternalKey(key.id)}
													class="text-red-400 hover:text-red-300"
												>
													<Trash2 class="h-4 w-4" />
												</button>
											{/if}
										</div>
									</td>
								</tr>
							{:else}
								<tr>
									<td colspan="5" class="px-4 py-8 text-center text-gray-400">No internal keys.</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</ConfigSection>

		<ConfigSection title="Admin IDs" icon={Settings}>
			<div class="space-y-4">
				{#if canWriteAdminIds}
					<div class="flex max-w-md gap-2">
						<input
							bind:value={newAdminId}
							placeholder="Discord account ID"
							class="flex-1 rounded border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
						/>
						<button
							onclick={createAdminId}
							class="inline-flex items-center gap-1 rounded border border-white bg-black px-3 py-2 text-sm hover:bg-white/10"
						>
							<Plus class="h-4 w-4" /> Add
						</button>
					</div>
				{/if}
				<div class="overflow-x-auto rounded border border-white/10 bg-black/40">
					<table class="w-full text-left text-sm">
						<thead class="border-b border-white/10 bg-black/60 text-gray-300">
							<tr>
								<th class="px-4 py-3">Account ID</th>
								<th class="px-4 py-3">Added At</th>
								<th class="px-4 py-3 text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each adminIds as admin (admin.id ?? admin.accountId)}
								<tr class="border-b border-white/10 last:border-0 hover:bg-white/5">
									<td class="px-4 py-3 font-mono text-xs">{admin.id ?? admin.accountId}</td>
									<td class="px-4 py-3 text-gray-400">{formatDate(admin.addedAt)}</td>
									<td class="px-4 py-3 text-right">
										{#if canWriteAdminIds}
											<button
												onclick={() => deleteAdminId(admin.id ?? admin.accountId)}
												class="text-red-400 hover:text-red-300"
											>
												<Trash2 class="h-4 w-4" />
											</button>
										{/if}
									</td>
								</tr>
							{:else}
								<tr>
									<td colspan="3" class="px-4 py-8 text-center text-gray-400">No admin IDs.</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</ConfigSection>
	</div>
</div>