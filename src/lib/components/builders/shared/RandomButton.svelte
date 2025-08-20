<script lang="ts">
	import GenericBlackButton from '$lib/components/ui/GenericBlackButton.svelte';
	import type { Player } from '$lib/gearBuilder/Player';
	import { randomizeGearBuild } from '$lib/gearBuilder/randomizeGearBuild';

	let { player, updateState }: { player?: Player; updateState: () => void } = $props();

	let randomFunction = $state(() => {});

	if (player) {
		randomFunction = () => {
			randomizeGearBuild(player.database, player);
			updateState();
		};
	}
</script>

<GenericBlackButton parentFunction={randomFunction} parentText="Random Build" />
