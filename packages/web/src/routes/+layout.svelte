<script>
	import '../app.css';
	import AppShell from '$lib/components/Layout/AppShell.svelte';
	let { children, data } = $props();
</script>

<AppShell user={data.user} permissions={data.permissions}>
	{@render children()}
</AppShell>
