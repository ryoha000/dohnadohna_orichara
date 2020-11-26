<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string
  const dispatch = createEventDispatcher();
  const change = (e: Event & {
    currentTarget: EventTarget & HTMLSelectElement;
  }) => {
    console.log(e, e.currentTarget.value)
    dispatch('change', e.currentTarget.value)
  }
</script>

<div>
  <h3>{label}</h3>
  <select name="voice" on:input={change}>
    <option value="">ランダム</option>
    <option value="女子汎用／大／真面目">女子汎用／大／真面目</option>
    <option value="女子汎用／大／陽気">女子汎用／大／陽気</option>
    <option value="女子汎用／大／強気">女子汎用／大／強気</option>
    <option value="女子汎用／高／真面目">女子汎用／高／真面目</option>
    <option value="女子汎用／高／活発">女子汎用／高／活発</option>
    <option value="女子汎用／高／陽気">女子汎用／高／陽気</option>
    <option value="女子汎用／高／控え目">女子汎用／高／控え目</option>
    <option value="女子汎用／高／無邪気">女子汎用／高／無邪気</option>
    <option value="女子汎用／中／真面目">女子汎用／中／真面目</option>
    <option value="女子汎用／中／活発	">女子汎用／中／活発	</option>
    <option value="女子汎用／中／控え目">女子汎用／中／控え目</option>
    <option value="女子汎用／小／無邪気">女子汎用／小／無邪気</option>
    <option value="女子汎用／小／勝ち気">女子汎用／小／勝ち気</option>
    <option value="女子汎用／小／控え目">女子汎用／小／控え目</option>
  </select>
</div>

<style>
  h3 {
    margin-bottom: 4px;
  }
</style>
