<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  function handleFileSelect(evt: DragEvent) {
    evt.stopPropagation();
    evt.preventDefault();

    const file = evt.dataTransfer.files[0]
    console.log(file)
    dispatch('change', URL.createObjectURL(file))
  }

  function handleDragOver(evt: DragEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; 
  }
</script>

<svelte:body on:dragover={handleDragOver} on:drop={handleFileSelect} />
