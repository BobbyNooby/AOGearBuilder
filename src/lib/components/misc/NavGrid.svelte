<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	export let showHome: boolean, showText: boolean;

	const navLinks = {
		home: {
			route: '/',
			svgPath: `<path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19Z"></path>`,
			descText: 'Home'
		},
		gearBuilder: {
			route: '/gearBuilder',
			svgPath: `
							<path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path>`,
			descText: 'Gear Builder'
		},
		missingData: {
			route: '/data',
			svgPath: `
							<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"></path>`,
			descText: 'Missing Data'
		},
		// shipBuilder: {
		// 	route: '/shipBuilder',
		// 	svgPath: `<path d="M9 4H14.4458C14.7905 4 15.111 4.17762 15.2938 4.47L18.75 10H23.1577C23.4339 10 23.6577 10.2239 23.6577 10.5C23.6577 10.5837 23.6367 10.666 23.5967 10.7394L19.6364 18H19C18.4694 18 17.9548 17.9311 17.4648 17.8018L20.63 12H3.4L4.44833 17.824C3.9845 17.939 3.49937 18 3 18H2.45455L1.21434 11.1789C1.11555 10.6355 1.47595 10.1149 2.01933 10.0161C2.07835 10.0054 2.13822 10 2.19821 10H3V5C3 4.44772 3.44772 4 4 4H5V1H9V4ZM5 10H16.3915L13.8915 6H5V10ZM3 20C4.53671 20 5.93849 19.4223 7 18.4722C8.06151 19.4223 9.46329 20 11 20C12.5367 20 13.9385 19.4223 15 18.4722C16.0615 19.4223 17.4633 20 19 20H21V22H19C17.5429 22 16.1767 21.6104 15 20.9297C13.8233 21.6104 12.4571 22 11 22C9.54285 22 8.17669 21.6104 7 20.9297C5.82331 21.6104 4.45715 22 3 22H1V20H3Z"></path>`,
		// 	descText: 'Ship Builder'
		// },
		// potionBuilder: {
		// 	route: '/potionBuilder',
		// 	svgPath: `<path
		// 						d="M15.9994 2V4H14.9994V7.24291C14.9994 8.40051 15.2506 9.54432 15.7357 10.5954L20.017 19.8714C20.3641 20.6236 20.0358 21.5148 19.2836 21.8619C19.0865 21.9529 18.8721 22 18.655 22H5.34375C4.51532 22 3.84375 21.3284 3.84375 20.5C3.84375 20.2829 3.89085 20.0685 3.98181 19.8714L8.26306 10.5954C8.74816 9.54432 8.99939 8.40051 8.99939 7.24291V4H7.99939V2H15.9994ZM13.3873 10.0012H10.6115C10.5072 10.3644 10.3823 10.7221 10.2371 11.0724L10.079 11.4335L6.12439 20H17.8734L13.9198 11.4335C13.7054 10.9691 13.5276 10.4902 13.3873 10.0012ZM10.9994 7.24291C10.9994 7.49626 10.9898 7.7491 10.9706 8.00087H13.0282C13.0189 7.87982 13.0119 7.75852 13.0072 7.63704L12.9994 7.24291V4H10.9994V7.24291Z"
		// 					/>`,
		// 	descText: 'Potion Builder (WIP)'
		// },
		info: {
			route: '/info',
			svgPath: `<path
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
							/>`,
			descText: 'Info & Credits'
		}
	};
</script>

<div>
	<div
		class="flex flex-row p-4 z-50"
		in:fly={{ y: 20, duration: 300 }}
		out:fade={{ delay: 250, duration: 300 }}
	>
		{#each Object.keys(navLinks) as navKey}
			{#if showHome && navKey == 'home'}<a
					href="{base}{navLinks[navKey].route}"
					aria-current={$page.url.pathname === navLinks[navKey].route}
					class="flex items-center justify-center"
				>
					<button
						class="border border-slate-300 bg-gray-900 hover:bg-gray-800 fill-slate-300 px-2 py-2 rounded-lg flex flex-col items-center justify-center"
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							>{@html `${navLinks[navKey].svgPath}`}</svg
						>
						{#if showText}
							<p class="px-2 text-slate-300 text-xl font-bold" style="text-decoration: none;">
								{navLinks[navKey].descText}
							</p>
						{/if}
					</button>
				</a>{:else if navKey != 'home'}
				<a
					href="{base}{navLinks[navKey].route}"
					aria-current={$page.url.pathname === navLinks[navKey].route}
					class="flex items-center justify-center"
				>
					<button
						class="border border-slate-300 bg-gray-900 hover:bg-gray-800 fill-slate-300 px-2 py-2 rounded-lg flex flex-col items-center justify-center"
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							>{@html `${navLinks[navKey].svgPath}`}</svg
						>
						{#if showText}
							<p class="px-2 text-slate-300 text-xl font-bold" style="text-decoration: none;">
								{navLinks[navKey].descText}
							</p>
						{/if}
					</button>
				</a>
			{/if}
		{/each}
	</div>
</div>

<style>
	svg {
		width: 3em;
		height: 3em;
	}

	a {
		font-family: 'Merriweather';
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
