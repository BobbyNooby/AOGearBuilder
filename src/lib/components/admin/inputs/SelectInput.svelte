<script lang="ts">
	import { capitalizeFirstLetter } from "$lib/utils/admin/stringUtils";

    export let id:string, name:string = capitalizeFirstLetter(id), dropdowns:string[]|null, value:string|undefined = undefined, isRequired:boolean = false, tooltip:string|null = null;
    export let onChange = () => {};
</script>

<div>
    <label for={id} class="block mb-2 text-sm font-medium text-gray-900">{name}</label>
    <select bind:value={value} on:change={onChange} id={id} name={id} required={isRequired} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {#if tooltip}
            <option hidden disabled selected value>{tooltip}</option>
        {/if}
        {#if dropdowns != null}
            {#each dropdowns as option}
                <option value={option}>{option}</option>
            {/each}
        {/if}
    </select>
</div>