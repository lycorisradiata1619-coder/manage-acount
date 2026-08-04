<script setup>
import { GSC_ITEMS } from '../lib/ifpug.js'

defineProps({
  scores: { type: Array, required: true },
})
</script>

<template>
  <section class="fp-section">
    <h3>全般システム特性 (GSC)</h3>
    <p class="fp-hint">各項目の影響度を 0（影響なし）〜 5（強い影響）で選択してください。</p>
    <ul class="gsc-list">
      <li v-for="(item, index) in GSC_ITEMS" :key="item.key" class="gsc-item">
        <span class="gsc-item__label">{{ item.label }}</span>
        <select v-model.number="scores[index]">
          <option v-for="n in [0, 1, 2, 3, 4, 5]" :key="n" :value="n">{{ n }}</option>
        </select>
      </li>
    </ul>
  </section>
</template>
