<script>
  import { createEventDispatcher } from 'svelte';

  export let label = ''
  let value = []
  let search = ''

  const attribute = [
    '巨乳',	'貧乳', '安産型',	'脚線美',	'玉の肌',	'筋肉質',	'着やせ',	'名器',	'外傷', '骨折',
    '車椅子',	'低血圧', '病弱',	'失明',	'タトゥ',	'ピアス',	'敏感',	'体臭',	'令嬢', '有名人',
    '委員長',	'優等生', '運動部',	'補導歴',	'生活難',	'彼氏有',	'彼女有',	'既婚',	'経産婦', '人気者',
    '王子様',	'愛嬌', 'クール',	'無口',	'強情',	'前向き',	'一途',	'照れ屋',	'臆病', '従順',
    '正義感',	'真面目', '小悪魔',	'高飛車',	'潔癖',	'無垢',	'えっち',	'変態',	'癒し系',
    'ゆるい',	'不思議', '心の闇',	'自虐的',	'サイコ',	'上品',	'家庭的',	'魔性',
  ]
  let visibleAttr = attribute.map(_ => true)
  const dispatch = createEventDispatcher();
  const check = (e, i) => {
    if (e.target.checked) {
      if (value.length > 2) {
        alert('属性は最大3つです')
        e.target.checked = false
        return
      }
      value.push(attribute[i])
    } else {
      const delIndex = value.findIndex(v => v === attribute[i])
      value.splice(delIndex, 1)
    }
    dispatch('change', value)
  }

  const updateVisible = (e) => {
    console.log()
    if (e.target.value === '') {
      visibleAttr = attribute.map(_ => true)
    } else {
      visibleAttr = attribute.map(v => v.includes(e.target.value))
    }
  }
</script>

<div>
  <h3>{label}</h3>
  <input placeholder="絞り込み" bind:value="{search}" on:input="{(e) => updateVisible(e)}" />
  <div class="container">
    {#each attribute as attr, i}
    <div class="item" style="{visibleAttr[i] ? '' : `display:none`}">
      <label>
        <input
          type="checkbox"
          name="{attr}"
          value="{attr}"
          on:input="{(e) => check(e, i)}"
        >
        {attr}
      </label>
    </div>
    {/each}
  </div>
</div>

<style>
  h3 {
    margin-bottom: 4px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    margin-right: 1rem;
  }
</style>
