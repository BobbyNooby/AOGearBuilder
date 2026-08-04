<script>
	import '../app.css';
	import AppShell from '$lib/components/Layout/AppShell.svelte';
	import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
	let { children, data } = $props();
</script>

<GoogleAnalytics />
<AppShell user={data.user} permissions={data.permissions}>
	{@render children()}
</AppShell>
