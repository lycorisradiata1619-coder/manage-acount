<script setup>
defineEmits(['start'])
</script>

<template>
  <div class="top-page">
    <h1>IFPUG法 ファンクションポイント計算</h1>
    <p class="lead">
      データファンクション（ILF/EIF）とトランザクションファンクション（EI/EO/EQ）を登録し、
      全般システム特性（GSC）を設定すると、未調整・調整済みファンクションポイントを自動計算します。
    </p>

    <ul class="top-page__points">
      <li>ILF/EIF は RET × DET、EI/EO/EQ は FTR × DET から複雑度を自動判定</li>
      <li>GSC 14項目の影響度から価値調整係数（VAF）を自動算出</li>
      <li>未調整ファンクションポイント（UFP）・調整済みファンクションポイント（AFP）を即座に表示</li>
    </ul>

    <a href="#" class="top-page__cta" @click.prevent="$emit('start')">入力画面へ進む &rarr;</a>
  </div>
</template>

<style scoped>
.top-page {
  padding: 3rem 0;
}

.top-page__points {
  margin: 1.5rem 0 2rem;
  padding-left: 1.25rem;
  line-height: 1.9;
}

.top-page__cta {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  background: hsla(160, 100%, 30%, 1);
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

.top-page__cta:hover {
  background: hsla(160, 100%, 25%, 1);
}
</style>
