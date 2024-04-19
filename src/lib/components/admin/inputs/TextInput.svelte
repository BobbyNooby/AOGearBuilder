<script lang="ts">
	import { capitalizeFirstLetter } from "$lib/utils/admin/stringUtils";

    export let id:string, name:string = capitalizeFirstLetter(id), value:string|null = null, placeholder:string|null = value||null, isRequired:boolean = false;
    export let onChange = () => {};
</script>

<div>
    <label for={id} class="block mb-2 text-sm font-medium text-gray-900">{name}</label>
    <input bind:value={value} on:change={onChange} type="text" id={id} name={id} placeholder={placeholder} required={isRequired} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
</div>