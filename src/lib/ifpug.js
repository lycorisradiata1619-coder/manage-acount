// IFPUG法（ファンクションポイント法）の判定表・計算ロジック
// 参考: IFPUG CPM (Counting Practices Manual) の複雑度マトリクス・重み表

export const WEIGHTS = {
  ILF: { Low: 7, Average: 10, High: 15 },
  EIF: { Low: 5, Average: 7, High: 10 },
  EI: { Low: 3, Average: 4, High: 6 },
  EO: { Low: 4, Average: 5, High: 7 },
  EQ: { Low: 3, Average: 4, High: 6 },
}

export const FUNCTION_TYPES = {
  ILF: { label: '内部論理ファイル (ILF)', unit: 'RET' },
  EIF: { label: '外部インタフェースファイル (EIF)', unit: 'RET' },
  EI: { label: '外部入力 (EI)', unit: 'FTR' },
  EO: { label: '外部出力 (EO)', unit: 'FTR' },
  EQ: { label: '外部照会 (EQ)', unit: 'FTR' },
}

export const GSC_ITEMS = [
  { key: 'dataCommunications', label: 'データ通信' },
  { key: 'distributedProcessing', label: '分散処理' },
  { key: 'performance', label: '性能' },
  { key: 'heavilyUsedConfiguration', label: '頻繁に利用される構成' },
  { key: 'transactionRate', label: 'トランザクション率' },
  { key: 'onlineDataEntry', label: 'オンラインデータ入力' },
  { key: 'endUserEfficiency', label: 'エンドユーザ効率' },
  { key: 'onlineUpdate', label: 'オンライン更新' },
  { key: 'complexProcessing', label: '複雑な処理' },
  { key: 'reusability', label: '再利用性' },
  { key: 'installationEase', label: '導入の容易さ' },
  { key: 'operationalEase', label: '運用の容易さ' },
  { key: 'multipleSites', label: '複数サイト' },
  { key: 'facilitateChange', label: '変更の容易性' },
]

// ILF / EIF: RET(レコード) × DET(データ項目) による複雑度判定
export function dataComplexity(ret, det) {
  if (ret <= 1) {
    return det <= 50 ? 'Low' : 'Average'
  }
  if (ret <= 5) {
    if (det <= 19) return 'Low'
    return det <= 50 ? 'Average' : 'High'
  }
  if (det <= 19) return 'Average'
  return 'High'
}

// EI: FTR(参照ファイル数) × DET による複雑度判定
export function eiComplexity(ftr, det) {
  if (ftr <= 1) {
    return det <= 15 ? 'Low' : 'Average'
  }
  if (ftr === 2) {
    if (det <= 4) return 'Low'
    return det <= 15 ? 'Average' : 'High'
  }
  if (det <= 4) return 'Average'
  return 'High'
}

// EO / EQ: FTR × DET による複雑度判定
export function eoEqComplexity(ftr, det) {
  if (ftr <= 1) {
    return det <= 19 ? 'Low' : 'Average'
  }
  if (ftr <= 3) {
    if (det <= 5) return 'Low'
    return det <= 19 ? 'Average' : 'High'
  }
  if (det <= 5) return 'Average'
  return 'High'
}

export function complexityOf(type, entry) {
  if (type === 'ILF' || type === 'EIF') return dataComplexity(entry.ret, entry.det)
  if (type === 'EI') return eiComplexity(entry.ftr, entry.det)
  return eoEqComplexity(entry.ftr, entry.det)
}

export function summarize(entries, type) {
  const counts = { Low: 0, Average: 0, High: 0 }
  for (const entry of entries) {
    counts[complexityOf(type, entry)]++
  }
  const points =
    counts.Low * WEIGHTS[type].Low +
    counts.Average * WEIGHTS[type].Average +
    counts.High * WEIGHTS[type].High
  return { counts, points }
}

// VAF = 0.65 + 0.01 × Σ(GSC 14項目の影響度 0〜5)
export function calcVaf(gscScores) {
  const total = gscScores.reduce((sum, score) => sum + score, 0)
  return 0.65 + 0.01 * total
}
