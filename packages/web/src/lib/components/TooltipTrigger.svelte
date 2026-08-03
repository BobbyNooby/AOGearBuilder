<script lang="ts">
	let {
		trigger,
		tooltip,
		containerElement = undefined as HTMLElement | undefined,
		cursorOffset = { x: 20, y: 0 },
		tooltipWidth = 300
	}: {
		trigger: () => any;
		tooltip: () => any;
		containerElement?: HTMLElement;
		cursorOffset?: { x: number; y: number };
		tooltipWidth?: number;
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

	function setBoxPositionOverflow(container: HTMLElement | undefined) {
		const tooltipElement = document.getElementById('hover');
		if (!tooltipElement) return;

		const bounds = container ? container.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight, left: 0, top: 0 };

		// Cursor position relative to the reference bounds (viewport by default)
		let x = mousePosition.x - bounds.left;
		let y = mousePosition.y - bounds.top;

		// Where the tooltip would end up after the template adds cursorOffset
		const projectedRight = x + cursorOffset.x + tooltipWidth;
		const projectedBottom = y + cursorOffset.y + tooltipElement.offsetHeight;

		// Flip to left if too close to right edge
		if (projectedRight + 20 >= bounds.width) {
			x = x - tooltipWidth - 40 - cursorOffset.x;
		}

		// Flip above if too close to bottom edge
		if (projectedBottom >= bounds.height) {
			y = y - tooltipElement.offsetHeight - 20 - cursorOffset.y;
		}

		mousePosition = { x: x + bounds.left, y: y + bounds.top };
	}
</script>

<div
	role="tooltip"
	onmousemove={handleMouseOver}
	onmouseout={handleMouseOut}
	onblur={handleBlur}
	class="tooltip-trigger h-full w-full"
>
	{@render trigger()}
</div>

{#if isHovering}
	<div
		id="hover"
		style="position: fixed; width: {tooltipWidth}px; top: {mousePosition.y + cursorOffset.y}px; left: {mousePosition.x + cursorOffset.x}px; z-index: 999;"
	>
		{@render tooltip()}
	</div>
{/if}
