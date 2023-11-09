<script>
	import arcaneIcon_result from '../lib/images/arcaneIcon_result.webp';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	// Fade in initiator
	let ready = false;
	onMount(() => (ready = true));
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Arcane Odyssey Tools</title>
	<meta name="title" content="Arcane Odyssey Tools" />
	<meta name="description" content="Various Tools for Arcane Odyssey by BobbyNooby" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="og:title" content="Arcane Odyssey Tools" />
	<meta property="og:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="og:image" content="assets/images/icon.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tools.arcaneodyssey.net/" />
	<meta property="twitter:title" content="Arcane Odyssey Tools" />
	<meta property="twitter:description" content="Various Tools for Arcane Odyssey by BobbyNooby" />
	<meta property="twitter:image" content="assets/images/icon.png" />

	<!-- Meta Tags Generated with https://metatags.io -->

	<!-- Google Fonts Link -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Open+Sans:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section class=" items-center snap-center justify-center">
	{#if ready}
		<img
			src={arcaneIcon_result}
			alt="logo"
			in:fly={{ y: 20, duration: 2000 }}
			style="padding-top: 3rem;"
		/>

		<p
			class=" text-7xl font-medium text-gray-300 text-center"
			style="font-family: Merriweather;"
			in:fly={{ y: 20, duration: 3000 }}
			out:fade={{ delay: 250, duration: 300 }}
		>
			Arcane Odyssey Tools
		</p>

		<!-- No navbar component as i want this to be a little different -->

		<nav
			style="padding-top : 2em;"
			in:fly={{ y: 20, duration: 3500 }}
			out:fade={{ delay: 250, duration: 300 }}
		>
			<ul class="flex space-x-1 md:space-x-4" style="background-color:transparent;">
				<li>
					<a href="{base}/gearBuilder" aria-current={$page.url.pathname === '/gearBuilder'}>
						<button
							class="border border-slate-300 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center aspect-square"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-nut"
								viewBox="0 0 16 16"
							>
								<path
									d="m11.42 2 3.428 6-3.428 6H4.58L1.152 8 4.58 2h6.84zM4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58z"
								/>
								<path
									d="M6.848 5.933a2.5 2.5 0 1 0 2.5 4.33 2.5 2.5 0 0 0-2.5-4.33zm-1.78 3.915a3.5 3.5 0 1 1 6.061-3.5 3.5 3.5 0 0 1-6.062 3.5z"
								/>
							</svg></button
						>
					</a>
				</li>

				<li>
					<a href="{base}/potionBuilder" aria-current={$page.url.pathname === '/potionBuilder'}>
						<button
							class="border border-slate-300 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center aspect-square"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								><path
									d="M15.9994 2V4H14.9994V7.24291C14.9994 8.40051 15.2506 9.54432 15.7357 10.5954L20.017 19.8714C20.3641 20.6236 20.0358 21.5148 19.2836 21.8619C19.0865 21.9529 18.8721 22 18.655 22H5.34375C4.51532 22 3.84375 21.3284 3.84375 20.5C3.84375 20.2829 3.89085 20.0685 3.98181 19.8714L8.26306 10.5954C8.74816 9.54432 8.99939 8.40051 8.99939 7.24291V4H7.99939V2H15.9994ZM13.3873 10.0012H10.6115C10.5072 10.3644 10.3823 10.7221 10.2371 11.0724L10.079 11.4335L6.12439 20H17.8734L13.9198 11.4335C13.7054 10.9691 13.5276 10.4902 13.3873 10.0012ZM10.9994 7.24291C10.9994 7.49626 10.9898 7.7491 10.9706 8.00087H13.0282C13.0189 7.87982 13.0119 7.75852 13.0072 7.63704L12.9994 7.24291V4H10.9994V7.24291Z"
								/></svg
							>
						</button>
					</a>
				</li>

				<li>
					<a href="{base}/shipBuilder" aria-current={$page.url.pathname === '/shipBuilder'}>
						<button
							class="border border-slate-300 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center aspect-square"
						>
							<svg
								width="800px"
								height="800px"
								viewBox="0 -3 150 150"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M28.0609 106.699C26.7856 103.398 25.574 99.6762 23.9371 96.1497C20.996 89.816 17.797 83.6025 14.7142 77.3352C14.2331 76.3572 13.7468 75.3766 13.3451 74.3652C11.4122 69.4972 13.2315 66.9137 18.4488 66.5121C29.5507 65.6588 40.6389 64.6087 51.7323 63.6393C55.7504 63.2875 59.7685 62.9305 64.1936 62.5406C64.2625 61.1623 64.3905 59.9028 64.378 58.6452C64.1977 41.6015 64.0061 24.5585 63.803 7.5165C63.7932 6.64226 63.7991 5.76802 63.8083 4.89115C63.828 2.95167 64.1522 1.16381 66.2125 0.296783C68.1592 -0.524296 69.586 0.493724 70.9158 1.70007C79.667 9.6177 88.4124 17.5404 97.1522 25.468C100.07 28.1039 103.009 30.7187 106.006 33.2621C109.353 36.1027 109.344 39.196 105.486 41.3875C102.45 43.1083 99.2268 44.4737 95.8789 45.4568C87.5185 47.899 79.0649 50.0236 70.1741 52.4028C70.0488 55.0518 69.8905 58.3755 69.7258 61.8482C73.3862 61.8482 76.9495 61.9316 80.5075 61.8331C93.9405 61.4616 107.372 61.0555 120.801 60.6149C123.859 60.5184 126.913 60.2946 129.97 60.2152C135.399 60.0747 137.324 62.6108 135.721 67.878C132.417 78.7298 129.049 89.5614 125.713 100.403C125.461 101.22 125.253 102.05 124.922 103.249C132.02 102.43 137.246 105.714 142.151 109.975C143.503 111.15 145.464 111.597 146.98 112.622C147.875 113.227 149.085 114.374 149.007 115.163C148.904 116.213 147.778 117.869 146.92 117.985C144.941 118.306 142.913 118.097 141.041 117.38C139.006 116.476 137.332 114.738 135.556 113.294C129.83 108.634 125.929 108.717 120.558 113.648C118.949 115.126 117.387 116.667 115.704 118.053C110.94 121.986 105.162 122.67 99.8806 119.485C97.1316 117.729 94.604 115.649 92.3524 113.289C89.4074 110.342 87.4016 109.405 83.6474 111.264C80.4334 112.852 77.4606 114.888 74.8177 117.31C64.7042 126.663 53.6528 127.044 43.1291 118.092C41.9365 117.134 40.8041 116.104 39.7384 115.007C37.287 112.337 34.4004 112.015 31.4305 113.688C28.494 115.34 25.8345 117.478 22.946 119.226C19.048 121.583 15.2012 124.141 11.0282 125.884C8.8026 126.814 5.90025 126.495 3.38057 126.159C2.46497 126.037 1.14379 124.243 1.12344 123.19C1.09063 121.507 2.83386 121.674 4.17082 121.696C7.97758 121.761 11.1418 120.062 14.0303 117.823C18.5886 114.289 23.0727 110.661 28.0609 106.699ZM35.0292 105.711C39.2245 105.386 42.6309 108.016 45.7176 111.285C46.1672 111.761 46.6759 112.18 47.1616 112.622C55.0783 119.853 62.2449 119.627 70.2824 112.437C73.4217 109.583 76.9765 107.222 80.8251 105.437C87.2573 102.553 92.208 104.105 97.0649 109.161C98.895 111.019 100.945 112.647 103.169 114.009C105.63 115.551 108.2 115.117 110.507 113.367C112.814 111.616 114.763 109.742 115.068 106.544C115.239 104.741 116.052 102.986 116.678 101.244C118.628 95.8006 120.736 90.414 122.571 84.9322C124.566 78.9727 126.324 72.9337 128.215 66.8357C92.3669 66.6827 56.8636 68.2757 21.4345 73.0328L35.0292 105.711ZM71.4257 10.3158L70.4813 10.7319V44.5635L99.9778 36.5851C90.0191 27.422 80.7221 18.8692 71.4257 10.3178V10.3158Z"
									fill="#000000"
								/>
								<path
									d="M8.47029 143.226C6.561 142.832 4.54143 142.695 2.78966 141.937C1.87538 141.543 1.43237 140.057 0.777344 139.063C1.72247 138.507 2.70698 137.415 3.60748 137.48C11.0241 138.016 16.9311 134.867 22.3577 130.295C24.0092 128.865 25.7657 127.56 27.6124 126.392C33.1853 122.979 38.7951 123.172 44.2788 126.644C45.6361 127.56 46.938 128.556 48.1774 129.627C51.5018 132.333 55.5086 134.069 59.7565 134.645C64.4041 135.315 68.4858 134.564 71.8942 130.701C74.3886 127.971 77.2473 125.597 80.3898 123.646C84.7151 120.879 89.3068 121.112 93.6629 123.936C94.9533 124.754 96.1998 125.64 97.3975 126.589C100.805 129.345 104.775 130.743 109 131.587C110.332 131.891 111.717 131.879 113.044 131.554C114.371 131.228 115.604 130.596 116.644 129.71C123.485 124.236 130.805 122.926 138.879 127.14C140.848 128.167 143.258 128.375 145.485 128.869C147.223 129.254 148.694 129.985 148.856 131.904C149.028 133.933 147.727 135.281 145.922 135.723C144.237 136.087 142.505 136.19 140.789 136.028C139.584 135.932 138.421 135.546 137.398 134.902C131.438 131.045 126.28 132.71 121.284 136.872C119.856 138.07 118.185 138.943 116.385 139.43C114.586 139.918 112.702 140.007 110.865 139.694C104.236 138.767 98.2159 136.551 93.0191 132.187C88.4903 128.385 86.5069 128.428 81.8167 132.101C80.7755 132.898 79.8287 133.811 78.9944 134.822C73.6164 141.526 66.4722 142.632 58.5823 141.297C53.3849 140.425 48.4999 138.229 44.3989 134.92C43.375 134.103 42.3379 133.295 41.2524 132.564C38.6881 130.837 35.936 130.472 33.2175 132.039C30.8625 133.397 28.6612 135.022 26.3949 136.533C20.9663 140.149 15.2942 143.083 8.47029 143.226Z"
									fill="#000000"
								/>
							</svg>
						</button>
					</a>
				</li>

				<li>
					<a href="{base}/info" aria-current={$page.url.pathname === '/info'}>
						<button
							class="border border-slate-300 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center aspect-square"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								><path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
								/></svg
							>
						</button>
					</a>
				</li>
			</ul>
		</nav>
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

	svg {
		width: 3em;
		height: 3em;
	}

	nav {
		display: flex;
		width: 100%;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav a {
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
