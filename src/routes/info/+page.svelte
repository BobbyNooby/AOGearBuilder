<script lang="ts">
	import { fade } from 'svelte/transition';

	import { onMount } from 'svelte';

	// Fade in initiator
	let ready = false;
	onMount(() => (ready = true));

	let menuIsActive = false;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Info</title>
	<meta name="title" content="Info" />
	<meta name="description" content="Links to discord, and data spreadsheets." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Info" />
	<meta property="og:description" content="Links to discord, and data spreadsheets." />
	<meta property="og:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Info" />
	<meta property="twitter:description" content="Links to discord, and data spreadsheets." />
	<meta property="twitter:image" content="https://i.imgur.com/c6n3LP1.png" />

	<!-- Meta Tags Generated with https://metatags.io -->

	<!-- Google Fonts Link -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Open+Sans:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section>
	{#if ready}
		<ul class="items-center justify-center flex flex-col">
			<p
				class=" text-7xl font-medium text-gray-300 text-center p-4"
				style="font-family: Merriweather;"
				in:fade={{ delay: 250, duration: 300 }}
				out:fade={{ delay: 250, duration: 300 }}
			>
				Info
			</p>

			<li class="p-4">
				<button
					class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
					style="font-family: Merriweather;"
					in:fade={{ delay: 250, duration: 300 }}
					out:fade={{ delay: 250, duration: 300 }}
					on:click={() => {
						window.open('https://github.com/BobbyNooby/AOGearBuilder/');
					}}
				>
					Source Code
				</button>
			</li>

			<li class="p-4">
				<button
					on:click={() => {
						menuIsActive = true;
					}}
					class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
					style="font-family: Merriweather;"
					in:fade={{ delay: 250, duration: 300 }}
					out:fade={{ delay: 250, duration: 300 }}
				>
					<p>Credits</p>

					{#if menuIsActive}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="z-30 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 fixed flex flex-col justify-center items-center"
							in:fade={{ duration: 100 }}
							out:fade={{ duration: 100 }}
							on:click={() => {
								event.stopPropagation();
							}}
						>
							<div class="space-y-2 flex flex-col justify-center items-center z-40">
								<p class="text-center text-3xl text-white" style="font-family: Merriweather;">
									BobbyNooby - Main Programmer<br /><br />
									WoodyLoody - Contributor Programmer<br /><br />
									Discord Community - For all the help ♥<br /><br />
								</p>

								<div class="flex flex-row space-x-2">
									<button
										on:click={() => {
											menuIsActive = false;
										}}
										class="mb-4 w-20 h-20 bg-black border rounded border-white text-white font-bold text-lg py-2 px-4 items-center relative"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="100%"
											height="100%"
											fill="currentColor"
											class="bi bi-x-lg"
											viewBox="0 0 16 16"
											style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
										>
											<path
												d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					{/if}
				</button>
			</li>

			<li class="p-4">
				<button
					class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
					style="font-family: Merriweather;"
					in:fade={{ delay: 250, duration: 300 }}
					out:fade={{ delay: 250, duration: 300 }}
					on:click={() => {
						window.open('https://discord.gg/wuczy67us7');
					}}
				>
					Discord Server
				</button>
			</li>

			<li class="p-4">
				<button
					class=" border border-slate-300 bg-gray-900 hover:bg-gray-800 px-4 py-2 flex items-center text-xl font-medium text-gray-300 text-center rounded-lg"
					style="font-family: Merriweather;"
					in:fade={{ delay: 250, duration: 300 }}
					out:fade={{ delay: 250, duration: 300 }}
					on:click={() => {
						window.open(
							'https://docs.google.com/spreadsheets/d/1-pP65mFfwWAFRMXqtNFN1p-syiS7d1jX-n6FOEaxQjU/edit?usp=sharing'
						);
					}}
				>
					Potions Spreadsheet
				</button>
			</li>
		</ul>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
