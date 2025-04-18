<script lang="ts">
	import { onMount } from 'svelte';

	let {
		isVisible = false,
		mousePosition = { x: 0, y: 0 },
		width = 300,
		borderColor = 'white',
		containerSelector = 'body'
	} = $props();

	let tooltipElement: HTMLDivElement;
	let adjustedPosition = $state({ x: mousePosition.x + 20, y: mousePosition.y });

	$effect(() => {
		if (isVisible && tooltipElement) {
			calculatePosition();
		}
	});

	function calculatePosition() {
		if (!tooltipElement) return;

		const container = document.querySelector(containerSelector) as HTMLElement;
		if (!container) return;

		const containerRect = container.getBoundingClientRect();
		const tooltipRect = tooltipElement.getBoundingClientRect();
		const containerScrollLeft = container.scrollLeft || 0;
		const containerScrollTop = container.scrollTop || 0;

		let newX = mousePosition.x + 20;
		let newY = mousePosition.y;

		// Check right edge
		if (newX + tooltipRect.width > containerRect.right) {
			newX = mousePosition.x - tooltipRect.width - 10;
		}

		// Check bottom edge
		if (newY + tooltipRect.height > containerRect.bottom) {
			newY = mousePosition.y - tooltipRect.height;
		}

		// Adjust for container scroll
		newX += containerScrollLeft;
		newY += containerScrollTop;

		// Ensure tooltip stays within container
		newX = Math.max(containerRect.left + containerScrollLeft, newX);
		newY = Math.max(containerRect.top + containerScrollTop, newY);

		adjustedPosition = { x: newX, y: newY };
	}

	onMount(() => {
		if (isVisible) {
			calculatePosition();
		}
	});
</script>

{#if isVisible}
	<div
		bind:this={tooltipElement}
		class="tooltip-content z-40 items-center rounded text-center"
		style="
			position: absolute;
			background-color: black;  
			width: {width}px; 
			padding: 10px;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			border: 3px solid {borderColor};
			color: white;
			top: {adjustedPosition.y}px; 
			left: {adjustedPosition.x}px;
			z-index: 40;
		"
	>
		<slot />
	</div>
{/if}
