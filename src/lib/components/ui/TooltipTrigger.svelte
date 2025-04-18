<script lang="ts">
	let {
		triggerSnippet,
		tooltipContent,
		containerElement,
		cursorOffset,
		tooltipWidth
	}: {
		triggerSnippet: () => any;
		tooltipContent: any;
		containerElement: HTMLElement;
		cursorOffset: { x: number; y: number };
		tooltipWidth: number;
	} = $props();
	let isHovering = $state(false);
	let mousePosition = $state({ x: 0, y: 0 });

	function handleMouseOver(event: MouseEvent) {
		isHovering = true;
		mousePosition = { x: event.clientX, y: event.clientY };
		setBoxPositionOverflow(containerElement);
	}

	function handleMouseOut() {
		isHovering = false;
	}

	function handleBlur() {
		isHovering = false;
	}

	function setBoxPositionOverflow(container: HTMLElement) {
		if (!container) return;

		if (mousePosition.x + tooltipWidth + 20 >= container.clientWidth) {
			mousePosition.x = mousePosition.x - 40 - tooltipWidth + container.scrollLeft;
		} else {
			mousePosition.x += container.scrollLeft;
		}

		const tooltipElement = document.getElementById('hover');
		if (!tooltipElement) return;

		if (mousePosition.y + tooltipElement.offsetHeight >= container.clientHeight) {
			mousePosition.y = mousePosition.y - tooltipElement.offsetHeight + container.scrollTop;
		} else {
			mousePosition.y += container.scrollTop;
		}
	}
</script>

<div
	role="tooltip"
	onmousemove={handleMouseOver}
	onmouseout={handleMouseOut}
	onblur={handleBlur}
	class="tooltip-trigger"
>
	{@render triggerSnippet()}
</div>

{#if isHovering}
	<div
		id="hover"
		style="position: absolute; width: {tooltipWidth}px; top: {mousePosition.y +
			cursorOffset.y}px; left: {mousePosition.x + cursorOffset.x}px; z-index: 999;"
	>
		{@render tooltipContent()}
	</div>
{/if}
