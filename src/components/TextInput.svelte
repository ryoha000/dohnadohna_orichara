<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string
  export let placeholder = ''
  let value = ''
  const dispatch = createEventDispatcher();
  const change = () => {
    dispatch('change', value)
  }
</script>

<div>
  <h3>{label}</h3>
  <input bind:value="{value}" on:change="{change}" placeholder={placeholder} />
</div>

<style>
  h3 {
    margin-bottom: 4px;
  }
  input {
    width: 80%;
  }
</style>
