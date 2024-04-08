<script>
	import '../app.css';
</script>

<svelte:head>
	<!-- Google Fonts Link -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Eagle+Lake&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section class="bg-zinc-800 overflow-auto app"><slot /></section>

<style>
	.app {
		display: flex;
		width: 100%;
		flex-direction: column;
		min-height: 100vh;
	}

	.merriweather-light {
		font-family: 'Merriweather', serif;
		font-weight: 300;
		font-style: normal;
	}

	.merriweather-regular {
		font-family: 'Merriweather', serif;
		font-weight: 400;
		font-style: normal;
	}

	.merriweather-regular-italic {
		font-family: 'Merriweather', serif;
		font-weight: 400;
		font-style: italic;
	}

	.merriweather-bold {
		font-family: 'Merriweather', serif;
		font-weight: 700;
		font-style: normal;
	}

	.merriweather-bold-italic {
		font-family: 'Merriweather', serif;
		font-weight: 700;
		font-style: italic;
	}

	.merriweather-black {
		font-family: 'Merriweather', serif;
		font-weight: 900;
		font-style: normal;
	}

	.merriweather-black-italic {
		font-family: 'Merriweather', serif;
		font-weight: 900;
		font-style: italic;
	}

	.merriweather-light-italic {
		font-family: 'Merriweather', serif;
		font-weight: 300;
		font-style: italic;
	}
</style>
