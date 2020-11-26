<script lang="ts">
  import TextInput from './TextInput.svelte'
  import RankInput from './RankInput.svelte'
  import AttributeInput from './AttributeInput.svelte'
  import UnicornInput from './UnicornInput.svelte'
  import VoiceInput from './VoiceInput.svelte'
  import DragImage from './DragImage.svelte'
  import useImage from './use/image'
  import { download } from "./use/download";

  const { main } = useImage()
  let name = ''
  let looks = 'random'
  let tech = 'random'
  let mental = 'random'
  let attrs = []
  let unicorn = '-1'
  let voice = ''
  let profile1 = ''
  let profile2 = ''
  let profile3 = ''
  let imgUrl = ''
</script>

<div>
  <TextInput label="名前" on:change="{(e) => name = e.detail}" />
  <RankInput label="ルックス" on:change="{(e) => looks = e.detail}" />
  <RankInput label="テクニック" on:change="{(e) => tech = e.detail}" />
  <RankInput label="メンタル" on:change="{(e) => mental = e.detail}" />
  <AttributeInput label="属性" on:change="{(e) => attrs = e.detail}" />
  <UnicornInput label="処女" on:change="{(e) => unicorn = e.detail}" />
  <VoiceInput label="音声" on:change={(e) => voice = e.detail} />
  <TextInput label="プロフィール" on:change="{(e) => profile1 = e.detail}" placeholder="プロフィール一行目" />
  <div><input bind:value="{profile2}" placeholder="プロフィール二行目" /></div>
  <div><input bind:value="{profile3}" placeholder="プロフィール三行目" /></div>
  <div class="btnContainer">
    <button disabled={imgUrl === ''} on:click="{() => download(name, looks, tech, mental, attrs, unicorn, voice, profile1, profile2, profile3, imgUrl)}">ダウンロード</button>
    {#if imgUrl === ''}
      <div class="error">画像が必要です。ドラッグアンドドロップで追加してください。</div>
    {/if}
  </div>
</div>

<DragImage on:change={async (e) => imgUrl = await main(e.detail)} />

<style>
  input {
    width: 80%;
  }
  .btnContainer {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    padding: 2rem;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
  .error {
    color: rgb(235, 60, 60);
  }
</style>
