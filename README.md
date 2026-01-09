# ペルソナ要約・比較アプリ

一次情報（インタビュー・調査・定性コメント）を整理し、判断の前提を可視化するアプリケーション。

## 機能

- **データ入力**: テキスト貼り付け + ファイルアップロード（.txt/.md）
- **発言の整理**: 発言分割、タグ付け、ペルソナ分離
- **ペルソナ要約**: 課題/感情/意思決定トリガー/NG表現の構造化
- **ペルソナ比較**: 複数ペルソナの横並び比較
- **根拠の確認**: 要約項目から元発言へのジャンプ・ハイライト

## セットアップ

```bash
# プロジェクトディレクトリに移動
cd "/Users/kubotie/Downloads/AIテキスト/persona-app"

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

**注意**: プロジェクトは `/Users/kubotie/Downloads/AIテキスト/persona-app` に作成されています。

## Vercelへのデプロイ

このアプリをVercelにデプロイする方法については、[VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)を参照してください。

## プロジェクト構成

```
persona-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # メインページ
│   └── globals.css         # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── Header.tsx         # ヘッダー（ナビゲーション）
│   └── screens/           # 画面コンポーネント
│       ├── InputScreen.tsx      # データ入力画面
│       ├── SummaryScreen.tsx    # 要約画面
│       └── ComparisonScreen.tsx # 比較画面
├── store/                 # Zustand状態管理
│   └── usePersonaStore.ts # メインストア
├── types/                 # TypeScript型定義
│   └── index.ts           # 型定義
└── data/                  # ダミーデータ
    └── dummyData.ts       # 開発用ダミーデータ
```

## 使用方法

1. **データ入力画面**: インタビュー記録や定性コメントを貼り付け、またはファイルをアップロード
2. **発言の整理画面**: 自動分割された発言を確認・編集し、タグ付けとペルソナ分離を行う
3. **要約画面**: ペルソナごとの要約を確認。根拠発言をクリックで元発言へジャンプ
4. **比較画面**: 複数ペルソナを横並びで比較

## 設計原則

- **推測しない**: 発言にない内容を補完しない
- **断定しない**: 「正解」「最適」などの断定表現は使用しない
- **根拠を明示**: すべての要約項目に根拠発言を紐付け

## 技術スタック

- Next.js 14 (App Router)
- React 18
- TypeScript
- Zustand (状態管理)
- Tailwind CSS
