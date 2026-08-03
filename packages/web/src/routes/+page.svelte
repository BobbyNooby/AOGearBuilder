<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Arcane Odyssey Tools</title>
	<meta name="title" content="Arcane Odyssey Tools" />
	<meta name="description" content="Various Tools for Arcane Odyssey by BobbyNooby" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Arcane Odyssey Tools" />
	<meta property="og:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="og:image" content="https://i.imgur.com/c6n3LP1.png" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Arcane Odyssey Tools" />
	<meta property="twitter:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="https://i.imgur.com/c6n3LP1.png" />
</svelte:head>

<div
	in:fade={{ duration: 1000 }}
	class="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-6 p-4 text-white"
>
	<img src="/logo.png" alt="Arcane Odyssey Tools" class="h-64 w-64" />

	<p class="text-6xl" style="font-family:Merriweather,serif">Arcane Odyssey Tools</p>

	<div class="w-full max-w-xl px-3">
		<div class="h-[1px] w-full bg-white"></div>
	</div>

	<p class="text-center text-xl text-gray-300" style="font-family:Merriweather,serif">
		Use the sidebar to open the Gear Builder, Item List, or Admin panel.
	</p>
</div>
