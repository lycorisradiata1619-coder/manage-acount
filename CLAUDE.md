# manage-acount

IFPUG法（ファンクションポイント法）でソフトウェア規模を計算する、Vue 製の計算ツール。

## 解決したい課題

見積もり担当者が抱える以下の課題を解決する。

- データファンクション（ILF/EIF）・トランザクションファンクション（EI/EO/EQ）の複雑度判定を手計算するのは手間がかかり、ミスが起きやすい
- 全般システム特性（GSC）を踏まえた価値調整係数（VAF）の算出、調整済みファンクションポイント（AFP）までを一貫して計算したい

## アプリ概要

- **入力** — 画面入力（ILF/EIF/EI/EO/EQ 各ファンクションの名称・DET・RET/FTR、GSC 14項目の影響度）
- **出力** — 画面表示（複雑度判定、ファンクションタイプ別の未調整FP、UFP・VAF・AFP の計算結果）

## IFPUG法の計算ロジック

- 複雑度判定・重み表・VAF計算は `src/lib/ifpug.js` に集約する（IFPUG CPM の複雑度マトリクスに準拠）
- ILF/EIF は RET × DET、EI/EO/EQ は FTR × DET で複雑度（Low/Average/High）を判定する
- UFP = 各ファンクションの複雑度別件数 × 重み の合計
- VAF = 0.65 + 0.01 × GSC 14項目（各0〜5）の合計影響度
- AFP = UFP × VAF

## 技術スタック

- **Vue 3** — UI フレームワーク
- **JavaScript (ES6+)** — ロジック
- **CSS3** — スタイリング

## プロジェクト構成

```
manage-acount/
├── index.html         # エントリーポイント
├── src/
│   ├── main.js         # アプリ初期化
│   ├── App.vue         # ルートコンポーネント（状態管理・集計）
│   ├── lib/
│   │   └── ifpug.js     # 複雑度判定・重み表・VAF計算ロジック
│   ├── components/      # UI コンポーネント
│   └── assets/          # スタイル
└── CLAUDE.md
```

構成はプロジェクトの進行に応じて変化するため、実態と乖離したら本セクションを更新すること。

## 開発ガイドライン

- コンポーネントは Vue の単一ファイルコンポーネント（`.vue`）で作成する
- コンポーネントファイル名はパスカルケース (`GscSection.vue`)、その他のファイル名はケバブケース
- IFPUG の判定ロジックは UI コンポーネントに埋め込まず、`src/lib/ifpug.js` の純粋関数として実装する
- state 管理はまず Vue の `ref`/`reactive` で行い、複雑化した場合のみ Pinia 等の導入を検討する
- CSS はセレクターの詳細度を低く保ち、クラスベースのスタイリングを優先する
- 不要な外部ライブラリの追加は避ける

## ブラウザ対応

モダンブラウザ（Chrome・Firefox・Edge・Safari 最新版）を対象とする。

## デプロイ先

| 項目 | 内容 |
|---|---|
| GitHub リポジトリ | https://github.com/lycorisradiata1619-coder/manage-acount.git |
| 公開 URL | https://lycorisradiata1619-coder.github.io/manage-acount/ |
| デプロイ方法 | `main` ブランチへのプッシュで GitHub Actions が自動ビルド・デプロイ |
| Vite base パス | `/manage-acount/` |

## Git 運用ルール

### 基本方針

**コードを変更するたびに、必ず GitHub へプッシュすること。**

### 手順

コードを変更・追加した際は、以下の手順を毎回実行する。

```bash
# 1. 変更内容を確認
git status
git diff

# 2. ステージング
git add <変更ファイル>   # 特定ファイルを指定。git add . / -A は避ける

# 3. コミット
git commit -m "変更内容を簡潔に説明するメッセージ"

# 4. プッシュ（変更のたびに必ず実行）
git push origin main
```

### コミットメッセージ規約

| プレフィックス | 用途 |
|---|---|
| `feat:` | 新機能の追加 |
| `fix:` | バグ修正 |
| `style:` | スタイル変更（機能に影響なし） |
| `refactor:` | リファクタリング |
| `docs:` | ドキュメント変更 |
| `chore:` | ビルド・設定ファイルの変更 |

例: `feat: アカウント一覧画面を実装`

### ブランチ戦略

- `main` — 本番用。常に動作する状態を保つ
- `feature/<機能名>` — 新機能開発用ブランチ
- 機能完成後は `main` へマージし、即座にプッシュする

### 注意事項

- `.env` や認証情報（トークン・パスワード等）を含むファイルは絶対にコミットしない
- リポジトリURLに認証トークンを含めない。認証には Git Credential Manager や SSH 鍵を使用する
- `git add .` / `git add -A` は意図しないファイルを含む恐れがあるため、ファイルを明示して追加する
- force push (`git push --force`) は原則禁止。必要な場合は事前に確認を取る
