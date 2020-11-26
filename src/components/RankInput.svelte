<script lang="ts">
  import Slider from 'svelte-slider'
  import { createEventDispatcher } from 'svelte';

  export let label: string
  let value: string = 'random'

  const rank = [
    'S+',
    'S',
    'A+',
    'A',
    'B+',
    'B',
    'C+',
    'C',
    'D+',
    'D',
    'random'
  ]
  const dispatch = createEventDispatcher();
  const change = (e: CustomEvent<number[]>) => {
    const div = 1 / (rank.length - 1)
    value = rank[rank.length - Math.floor(e.detail[1] / div + 0.5) - 1]
    dispatch('change', value)
  }
</script>

<div>
  <div class="labelContainer">
    <h3>{label}</h3>
    <h4>{value}</h4>
  </div>
  <div class="sliderContainer">
    <Slider value={[0, 0]} on:change="{change}" single />
  </div>
</div>

<style>
  h4,
  h3 {
    margin-bottom: 4px;
  }
  h4 {
    margin-left: 2rem;
  }
  .labelContainer {
    display: flex;
  }
  .sliderContainer {
    --sliderPrimary: #333;
		--sliderSecondary: rgba(0, 0, 0, 0.05);
    width: 90%;
  }
</style>
