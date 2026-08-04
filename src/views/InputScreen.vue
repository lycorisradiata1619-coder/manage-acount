<script setup>
import { reactive, computed } from 'vue'
import DataFunctionSection from '../components/DataFunctionSection.vue'
import TransactionFunctionSection from '../components/TransactionFunctionSection.vue'
import GscSection from '../components/GscSection.vue'
import ResultSummary from '../components/ResultSummary.vue'
import { GSC_ITEMS, summarize, calcVaf } from '../lib/ifpug.js'

defineEmits(['back'])

const entries = reactive({
  ILF: [],
  EIF: [],
  EI: [],
  EO: [],
  EQ: [],
})

const gscScores = reactive(Array(GSC_ITEMS.length).fill(0))

function addEntry(type, entry) {
  entries[type].push(entry)
}

function removeEntry(type, id) {
  entries[type] = entries[type].filter((entry) => entry.id !== id)
}

const summaries = computed(() => ({
  ILF: summarize(entries.ILF, 'ILF'),
  EIF: summarize(entries.EIF, 'EIF'),
  EI: summarize(entries.EI, 'EI'),
  EO: summarize(entries.EO, 'EO'),
  EQ: summarize(entries.EQ, 'EQ'),
}))

const ufp = computed(() =>
  Object.values(summaries.value).reduce((sum, s) => sum + s.points, 0),
)
const gscTotal = computed(() => gscScores.reduce((sum, score) => sum + score, 0))
const vaf = computed(() => calcVaf(gscScores))
const afp = computed(() => ufp.value * vaf.value)
</script>

<template>
  <header>
    <a href="#" class="back-link" @click.prevent="$emit('back')">&larr; TOPに戻る</a>
    <h1>入力画面</h1>
  </header>

  <main>
    <h2>データファンクション</h2>
    <DataFunctionSection
      type="ILF"
      label="内部論理ファイル (ILF)"
      :entries="entries.ILF"
      :summary="summaries.ILF"
      @add="(entry) => addEntry('ILF', entry)"
      @remove="(id) => removeEntry('ILF', id)"
    />
    <DataFunctionSection
      type="EIF"
      label="外部インタフェースファイル (EIF)"
      :entries="entries.EIF"
      :summary="summaries.EIF"
      @add="(entry) => addEntry('EIF', entry)"
      @remove="(id) => removeEntry('EIF', id)"
    />

    <h2>トランザクションファンクション</h2>
    <TransactionFunctionSection
      type="EI"
      label="外部入力 (EI)"
      :entries="entries.EI"
      :summary="summaries.EI"
      @add="(entry) => addEntry('EI', entry)"
      @remove="(id) => removeEntry('EI', id)"
    />
    <TransactionFunctionSection
      type="EO"
      label="外部出力 (EO)"
      :entries="entries.EO"
      :summary="summaries.EO"
      @add="(entry) => addEntry('EO', entry)"
      @remove="(id) => removeEntry('EO', id)"
    />
    <TransactionFunctionSection
      type="EQ"
      label="外部照会 (EQ)"
      :entries="entries.EQ"
      :summary="summaries.EQ"
      @add="(entry) => addEntry('EQ', entry)"
      @remove="(id) => removeEntry('EQ', id)"
    />

    <h2>全般システム特性</h2>
    <GscSection :scores="gscScores" />

    <h2>結果</h2>
    <ResultSummary
      :summaries="summaries"
      :ufp="ufp"
      :gsc-total="gscTotal"
      :vaf="vaf"
      :afp="afp"
    />
  </main>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 0.75rem;
  color: inherit;
  opacity: 0.7;
  text-decoration: none;
}

.back-link:hover {
  opacity: 1;
}
</style>
