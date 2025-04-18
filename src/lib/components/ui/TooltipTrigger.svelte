<script lang="ts">
	import { writable } from 'svelte/store';

	let isHovering = $state(false);
	let mousePosition = $state({ x: 0, y: 0 });
	let hoverWidth = $state(300);

	function handleMouseOver(event: MouseEvent) {
		isHovering = true;
		mousePosition = { x: event.clientX, y: event.clientY };
	}

	function handleMouseOut() {
		isHovering = false;
	}

	function handleBlur() {
		isHovering = false;
	}

	function setBoxPositionOverflow(containerId: string, tooltipElement: HTMLElement) {
		const container = document.getElementById(containerId);
		if (!container) return;

		// Adjust horizontal position if tooltip would go off screen right
		if (mousePosition.x + hoverWidth + 20 >= container.clientWidth) {
			mousePosition.x = mousePosition.x - 40 - hoverWidth + container.scrollLeft;
		} else {
			mousePosition.x += container.scrollLeft;
		}

		// Adjust vertical position if tooltip would go off screen bottom
		if (mousePosition.y + tooltipElement.offsetHeight >= container.clientHeight) {
			mousePosition.y = mousePosition.y - tooltipElement.offsetHeight + container.scrollTop;
		} else {
			mousePosition.y += container.scrollTop;
		}
	}

	function createdHover(containerId: string, tooltipElement: HTMLElement) {
		setBoxPositionOverflow(containerId, tooltipElement);
	}

	let { containerId = 'menuouter' } = $props();
</script>

<div
	on:mousemove={handleMouseOver}
	on:mouseout={handleMouseOut}
	on:blur={handleBlur}
	class="tooltip-trigger"
>
	<slot {isHovering} {mousePosition} {hoverWidth} {createdHover} />
</div>
