<script lang="ts">
	import { capitalizeFirstLetter } from "$lib/utils/admin/stringUtils";

    export let id:string, name:string = capitalizeFirstLetter(id), value:number|null = null, placeholder:number|null = value||0, isRequired:boolean = false, min:number|null = null, max:number|null = null, step:number|null = null;
    export let onChange = (e:Event & { currentTarget: EventTarget & HTMLInputElement; }) => {}, onInput = (e:Event & { currentTarget: EventTarget & HTMLInputElement; }) => {};
</script>

<div>
    <label for={id} class="block mb-2 text-sm font-medium text-gray-900">{name}</label>
    <input bind:value={value} on:change={onChange} on:input={onInput} type="number" id={id} name={id} min={min} max={max} step={step} placeholder={(placeholder == null ? "" : placeholder).toString()} required={isRequired} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
</div>