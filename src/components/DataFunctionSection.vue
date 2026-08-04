<script setup>
import { reactive } from 'vue'
import { complexityOf } from '../lib/ifpug.js'

const props = defineProps({
  type: { type: String, required: true }, // 'ILF' | 'EIF'
  label: { type: String, required: true },
  entries: { type: Array, required: true },
  summary: { type: Object, required: true },
})

const emit = defineEmits(['add', 'remove'])

const form = reactive({ name: '', ret: 1, det: 1 })

function handleAdd() {
  if (!form.name.trim()) return
  emit('add', { id: crypto.randomUUID(), name: form.name.trim(), ret: form.ret, det: form.det })
  form.name = ''
  form.ret = 1
  form.det = 1
}
</script>

<template>
  <section class="fp-section">
    <h3>{{ label }}</h3>
    <form class="fp-form" @submit.prevent="handleAdd">
      <input v-model="form.name" type="text" placeholder="名称" class="fp-form__name" />
      <label>RET <input v-model.number="form.ret" type="number" min="1" /></label>
      <label>DET <input v-model.number="form.det" type="number" min="1" /></label>
      <button type="submit">追加</button>
    </form>

    <table v-if="entries.length" class="fp-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>RET</th>
          <th>DET</th>
          <th>複雑度</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>{{ entry.name }}</td>
          <td>{{ entry.ret }}</td>
          <td>{{ entry.det }}</td>
          <td>{{ complexityOf(props.type, entry) }}</td>
          <td><button type="button" @click="emit('remove', entry.id)">削除</button></td>
        </tr>
      </tbody>
    </table>

    <p class="fp-summary">
      Low: {{ summary.counts.Low }} / Average: {{ summary.counts.Average }} / High: {{ summary.counts.High }}
      — 小計 {{ summary.points }} FP
    </p>
  </section>
</template>
