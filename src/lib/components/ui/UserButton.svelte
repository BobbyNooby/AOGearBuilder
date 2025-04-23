<script lang="ts">
	import { page } from '$app/state';
	import { signOut } from '@auth/sveltekit/client';
	import { SignIn } from '@auth/sveltekit/components';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let ready = $state(false);

	let session = page.data.session;
	let userImage = page.data.session?.user?.image || undefined;
	let userName = page.data.session?.user?.name || undefined;

	let menuOpen = $state(false);

	function clickChecker(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const navElement = document.getElementById('userNav');
		const navButton = document.getElementById('userButton');
		const userImg = document.getElementById('userImg');

		// Check if click is outside nav (and nav is open)
		if (
			menuOpen &&
			navElement &&
			!navElement.contains(target) &&
			target !== navButton &&
			target !== userImg
		) {
			menuOpen = false;
		}
		// Check if click is on nav button or logo (and nav is closed)
		else if (!menuOpen && (target === navButton || target === userImg)) {
			menuOpen = true;
		}
	}

	onMount(() => {
		ready = true;
		menuOpen = false;
		document.addEventListener('click', clickChecker);
		return () => document.removeEventListener('click', clickChecker);
	});
</script>

{#if !session}
	{#if ready}
		<SignIn provider="discord">
			<button
				aria-label="Sign in with Discord"
				slot="submitButton"
				in:fly={{ duration: 300, x: 100, easing: cubicInOut }}
				out:fly={{ duration: 300, x: 100, easing: cubicInOut }}
				class="absolute right-2 top-2 flex flex-row items-center rounded-md border border-white bg-gray-900 p-2 text-white hover:bg-gray-800"
				style="z-index: 998;"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					class="h-10 w-10"
					viewBox="0 0 24 24"
					fill="currentColor"
					><path
						d="M19.3034 5.33716C17.9344 4.71103 16.4805 4.2547 14.9629 4C14.7719 4.32899 14.5596 4.77471 14.411 5.12492C12.7969 4.89144 11.1944 4.89144 9.60255 5.12492C9.45397 4.77471 9.2311 4.32899 9.05068 4C7.52251 4.2547 6.06861 4.71103 4.70915 5.33716C1.96053 9.39111 1.21766 13.3495 1.5891 17.2549C3.41443 18.5815 5.17612 19.388 6.90701 19.9187C7.33151 19.3456 7.71356 18.73 8.04255 18.0827C7.41641 17.8492 6.82211 17.5627 6.24904 17.2231C6.39762 17.117 6.5462 17.0003 6.68416 16.8835C10.1438 18.4648 13.8911 18.4648 17.3082 16.8835C17.4568 17.0003 17.5948 17.117 17.7434 17.2231C17.1703 17.5627 16.576 17.8492 15.9499 18.0827C16.2789 18.73 16.6609 19.3456 17.0854 19.9187C18.8152 19.388 20.5875 18.5815 22.4033 17.2549C22.8596 12.7341 21.6806 8.80747 19.3034 5.33716ZM8.5201 14.8459C7.48007 14.8459 6.63107 13.9014 6.63107 12.7447C6.63107 11.5879 7.45884 10.6434 8.5201 10.6434C9.57071 10.6434 10.4303 11.5879 10.4091 12.7447C10.4091 13.9014 9.57071 14.8459 8.5201 14.8459ZM15.4936 14.8459C14.4535 14.8459 13.6034 13.9014 13.6034 12.7447C13.6034 11.5879 14.4323 10.6434 15.4936 10.6434C16.5442 10.6434 17.4038 11.5879 17.3825 12.7447C17.3825 13.9014 16.5548 14.8459 15.4936 14.8459Z"
					></path></svg
				>
			</button>
		</SignIn>
	{/if}
{:else if session}
	{#if ready && menuOpen == false}
		<button
			id="userButton"
			in:fly={{ duration: 300, x: 100, easing: cubicInOut }}
			out:fly={{ duration: 300, x: 100, easing: cubicInOut }}
			class="absolute right-2 top-2 flex flex-row items-center rounded-md border border-white bg-gray-900 p-2 text-white hover:bg-gray-800"
			style="z-index: 998;"
			><img id="userImg" class="h-10 w-10 rounded-full" src={userImage} alt={userName} />
		</button>
	{:else if ready && menuOpen == true}
		<div
			in:fly={{ duration: 300, x: 100, easing: cubicInOut }}
			out:fade
			class="absolute right-0 top-0 w-80 p-5 text-white"
			style="z-index: 998;"
		>
			<div class="w-full rounded-md border border-white bg-gray-900 p-4" id="userNav">
				<div class="flex w-full flex-col items-center justify-center text-center align-middle">
					<img class="h-16 w-16 rounded-full" src={userImage} alt={userName} />
					<p class="mt-2 font-medium">{userName}</p>
				</div>

				<div class="mt-4 flex w-full justify-center">
					<button
						onclick={() => {
							signOut();
						}}
						class="rounded-md border border-white bg-gray-800 px-4 py-2 hover:bg-gray-700"
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}
