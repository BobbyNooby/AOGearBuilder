<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import SubmitButton from './inputs/SubmitButton.svelte';
	import toast from 'svelte-french-toast';
	import NumberInput from './inputs/NumberInput.svelte';

	export let config: any;

	let open = false;

    let finalSubmitData: string = '';

	let title = 'Config';

	$: title = 'Config';
	const handleToggle = () => {
		open = !open;
	};

    function generateEntry() {
		finalSubmitData = JSON.stringify(config);
	}

	onMount(() => {
	});
</script>

<button
    class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    on:click={() => handleToggle()}>Config</button
>


{#if open}
	<div
		class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0 overflow-x-hidden overflow-y-auto"
	>
		<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
		<div
			class="bg-white flex flex-col w-full lg:h-max lg:w-5/6 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto max-h-full"
		>
			<form
				method="POST"
				action="?/updateConfig"
                on:submit={generateEntry}
				use:enhance={() => {
					return async ({ result, update }) => {
						update({ reset: false });

						if (result.type === 'success') {
							handleToggle();
							toast.success('Successfully updated the config!');
						}

						if (result.type === 'failure') {
							if (result['data'] !== undefined && result['data']['error'] !== undefined) {
								toast.error('Error: ' + result['data']['error']);
							} else {
								toast.error('Error: Unknown');
							}
						}
					};
				}}
			>
				<div
					class="flex flex-shrink-0 justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold overflow-hidden"
				>
					{title}
					<button
						class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
						on:click={() => handleToggle()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 0 24 24"
							width="24px"
							fill="#000000"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
							/>
						</svg>
					</button>
				</div>

				<div class="content p-8 pt-2 overflow-y-auto">
                    <input type="hidden" id="config" name="config" value={finalSubmitData} required />

					<div class="grid gap-6 mb-6 md:grid-cols-4">
						<NumberInput
							id={'maxLevel'}
							name={'Max Level'}
							placeholder={config.maxLevel}
							isRequired={true}
                            bind:value={config.maxLevel}
						/>
					</div>
                </div>

				<SubmitButton text={'Update'} />
			</form>
		</div>
	</div>
{/if}
