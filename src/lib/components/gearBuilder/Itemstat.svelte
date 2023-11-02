<script>
	export let item; //importing the item that was selected cos thats the only thing thats needed

	// This document is a tooltip for the items
</script>

<div class="text-center z-30">
	<!-- Only show the stat if its value is more than zero -->
	{#if item.power > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/Qnt1WCW.png" alt="Power" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FF8400; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #000000; text-align: center;"
			>
				+
				<span>{item.power}</span>
				POWER
			</p>
		</div>
	{/if}

	{#if item.defense > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/xm6Io7L.png" alt="Defense" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #737373; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #000000; text-align: center;"
			>
				+
				<span>{item.defense}</span>
				DEFENSE
			</p>
		</div>
	{/if}

	{#if item.agility > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/ul1c2Ta.png" alt="Agility" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #00ffff; text-align: center;"
			>
				+
				<span>{item.agility}</span>
				AGILITY
			</p>
		</div>
	{/if}

	{#if item.attackSpeed > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/KWzGEI7.png" alt="Attack Speed" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #0077ff; text-align: center;"
			>
				+
				<span>{item.attackSpeed}</span>
				ATTACK SPEED
			</p>
		</div>
	{/if}

	{#if item.attackSize > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/TwDybjN.png" alt="Attack Size" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #00FF00; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #471559; text-align: center;"
			>
				+
				<span>{item.attackSize}</span>
				ATTACK SIZE
			</p>
		</div>
	{/if}

	{#if item.intensity > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/Qgqq9fz.png" alt="Intensity" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFF200; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #712402; text-align: center;"
			>
				+
				<span>{item.intensity}</span>
				INTENSITY
			</p>
		</div>
	{/if}

	{#if item.insanity > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/zuPji7I.png" alt="Insanity" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #8B27DB; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #DB0C45; text-align: center;"
			>
				+
				<span>{item.insanity}</span>
				INSANITY
			</p>
		</div>
	{/if}

	{#if item.drawback > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/43RZKlz.png" alt="Drawback" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #DC4040; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #000000; text-align: center;"
			>
				+
				<span>{item.drawback}</span>
				DRAWBACK
			</p>
		</div>
	{/if}

	{#if item.warding > 0}
		<div class="flex items-center justify-center">
			<img class="h-6" src="https://i.imgur.com/ZMoqTvi.png" alt="Warding" />
			<p
				style="font-family: 'Open Sans', sans-serif; font-weight: 700; font-size: 20px; -webkit-text-fill-color: #FFFFFF; -webkit-text-stroke: 1.5px; -webkit-text-stroke-color: #CBCB55; text-align: center;"
			>
				+
				<span>{item.warding}</span>
				WARDING
			</p>
		</div>
	{/if}
</div>
