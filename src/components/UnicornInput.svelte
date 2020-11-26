<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string
  let value = ''
  const dispatch = createEventDispatcher();
  const change = (e: Event & {
    currentTarget: EventTarget & HTMLInputElement;
  }) => {
    console.log(e, e.currentTarget.value)
    dispatch('change', e.currentTarget.value)
  }
</script>

<div>
  <h3>{label}</h3>
  <div class="radioContainer">
    <label>
      <input type="radio" value="-1" name="unicorn" on:change="{change}" />
      ランダム
    </label>
    <label>
      <input type="radio" value="0" name="unicorn" on:change="{change}" />
      非処女
    </label>
    <label>
      <input type="radio" value="1" name="unicorn" on:change="{change}" />
      処女
    </label>
  </div>
</div>

<style>
  h3 {
    margin-bottom: 4px;
  }
  label {
    margin-right: 1rem;
  }
  .radioContainer {
    display: flex;
    flex-wrap: wrap;
  }
</style>
