<script setup>
defineProps({
  summaries: { type: Object, required: true }, // { ILF, EIF, EI, EO, EQ }
  ufp: { type: Number, required: true },
  gscTotal: { type: Number, required: true },
  vaf: { type: Number, required: true },
  afp: { type: Number, required: true },
})

const LABELS = { ILF: '内部論理ファイル', EIF: '外部インタフェースファイル', EI: '外部入力', EO: '外部出力', EQ: '外部照会' }
</script>

<template>
  <section class="fp-section fp-result">
    <h3>計算結果</h3>
    <table class="fp-table">
      <thead>
        <tr>
          <th>ファンクションタイプ</th>
          <th>Low</th>
          <th>Average</th>
          <th>High</th>
          <th>ファンクションポイント</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(label, key) in LABELS" :key="key">
          <td>{{ label }}</td>
          <td>{{ summaries[key].counts.Low }}</td>
          <td>{{ summaries[key].counts.Average }}</td>
          <td>{{ summaries[key].counts.High }}</td>
          <td>{{ summaries[key].points }}</td>
        </tr>
      </tbody>
    </table>

    <dl class="fp-result__totals">
      <div>
        <dt>未調整ファンクションポイント (UFP)</dt>
        <dd>{{ ufp }}</dd>
      </div>
      <div>
        <dt>GSC 合計影響度</dt>
        <dd>{{ gscTotal }} / 70</dd>
      </div>
      <div>
        <dt>価値調整係数 (VAF)</dt>
        <dd>{{ vaf.toFixed(2) }}</dd>
      </div>
      <div class="fp-result__afp">
        <dt>調整済みファンクションポイント (AFP)</dt>
        <dd>{{ afp.toFixed(2) }}</dd>
      </div>
    </dl>
  </section>
</template>
