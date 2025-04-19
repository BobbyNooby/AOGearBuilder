<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import NavBarSeperator from './NavBarSeperator.svelte';
	import { navigationRoutes } from '../sidebar/navigationRoutes';
	import NavGroup from './NavGroup.svelte';
	import { page } from '$app/state';

	let ready = $state(false);
	let navOpen = $state(false);

	function clickChecker(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const navElement = document.getElementById('nav');
		const navButton = document.getElementById('navButton');
		const logo = document.getElementById('logo');

		// Check if click is outside nav (and nav is open)
		if (
			navOpen &&
			navElement &&
			!navElement.contains(target) &&
			target !== navButton &&
			target !== logo
		) {
			navOpen = false;
		}
		// Check if click is on nav button or logo (and nav is closed)
		else if (!navOpen && (target === navButton || target === logo)) {
			navOpen = true;
		}
	}

	onMount(() => {
		ready = true;
		navOpen = false;
		document.addEventListener('click', clickChecker);
		return () => document.removeEventListener('click', clickChecker);
	});

	const publicRoutes = navigationRoutes.public;
	const adminRoutes = navigationRoutes.admin;
	const devRoutes = navigationRoutes.developer;
</script>

{#if ready && navOpen == false}
	<button
		id="navButton"
		in:fly={{ duration: 300, x: -100, easing: cubicInOut }}
		out:fly={{ duration: 300, x: -100, easing: cubicInOut }}
		class="absolute left-2 top-2 flex flex-row items-center rounded-md border border-white bg-gray-900 p-2 hover:bg-gray-800"
		style="z-index: 998;"
		><img id="logo" src="/logo.png" alt="Arcane Odyssey Tools" class="h-10 w-10" />
	</button>
{:else if ready && navOpen == true}
	<div
		in:fly={{ duration: 300, x: -100, easing: cubicInOut }}
		out:fade
		class="absolute left-0 h-full w-80 p-5 text-white"
		style="z-index: 998;"
	>
		<div class="h-full w-full rounded-md border border-white bg-gray-900" id="nav">
			<div class="flex w-full flex-col items-center justify-center text-center align-middle">
				<img src="/logo.png" alt="Arcane Odyssey Tools" class=" h-28 w-28" />
				<p>Arcane Odyssey Tools</p>
			</div>

			<NavBarSeperator />
			<div class="flex w-full flex-col space-y-2">
				<NavGroup routes={publicRoutes} label={'Tools'} />
				<NavGroup routes={devRoutes} label={'Developer'} />
				{#if page.data.session && page.data.isAdmin}
					<NavGroup routes={adminRoutes} label={'Admin'} />
				{/if}
			</div>
		</div>
	</div>
{/if}
