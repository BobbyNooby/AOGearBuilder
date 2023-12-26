<script>
	export let item; //importing the item that was selected cos thats the only thing thats needed

	// This document is a tooltip for the items
</script>

<div class="text-center z-30">
	<!-- Only show the stat if its value is more than zero -->
	{#if item.stability != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/stability.png" alt="Stability" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #6297C1; -webkit-text-stroke: 1px; -webkit-text-stroke-color : #124975; text-align: center;"
			>
				<span>{item.stability}%</span>
				STABILITY
			</p>
		</div>
	{/if}

	{#if item.durability != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/durability.png" alt="Durability" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #737373; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color : #000000; text-align: center;"
			>
				<span>{item.durability}</span>
				DURABILITY
			</p>
		</div>
	{/if}

	{#if item.magicStorage != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/magicstorage.png" alt="Magic Storage" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #BA70EB; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color : #000000; text-align: center;"
			>
				<span>{item.magicStorage}</span>
				MAGIC STORAGE
			</p>
		</div>
	{/if}

	{#if item.turning != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/turning.png" alt="Turning" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1px; -webkit-text-stroke-color : #584A8C; text-align: center;"
			>
				<span>{item.turning}</span>
				TURNING
			</p>
		</div>
	{/if}

	{#if item.speed != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/speed.png" alt="Speed" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #00ffff; text-align: center;"
			>
				<span>{item.speed}</span>
				SPEED
			</p>
		</div>
	{/if}

	{#if item.resilience != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/resilience.png" alt="Resilience" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #AF2230; text-align: center;"
			>
				<span>{item.resilience}%</span>
				RESILIENCE
			</p>
		</div>
	{/if}

	{#if item.ramStrength != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/ramstrength.png" alt="Ram Strength" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FF8400; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #000000; text-align: center;"
			>
				<span>{item.ramStrength}</span>
				RAM STRENGTH
			</p>
		</div>
	{/if}

	{#if item.ramDefense != 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="/assets/images/shipstat/ramdefense.png" alt="Ram Defense" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #6B6BD7; text-align: center;"
			>
				<span>{item.ramDefense}</span>
				RAM DEFENSE
			</p>
		</div>
	{/if}
</div>
