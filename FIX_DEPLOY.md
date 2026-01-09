# ビルドエラー修正と再デプロイ手順

## 現在の状況

ローカルでは修正済みですが、Vercelが古いコードをビルドしている可能性があります。

## 修正手順

### 1. 最新の変更をコミット

```bash
cd "/Users/kubotie/Downloads/AIテキスト/persona-app"

# 変更を確認
git status

# 変更を追加
git add .

# コミット
git commit -m "Fix: Remove unused 'organize' step from type definitions"

# GitHubにプッシュ
git push origin main
```

### 2. Vercelで再デプロイ

GitHubにプッシュすると、Vercelが自動的に再デプロイします。

または、Vercelダッシュボードで：
1. 「Deployments」タブを開く
2. 最新のデプロイメントの「...」メニューから「Redeploy」を選択

## 確認事項

以下のファイルが正しく修正されているか確認：

- ✅ `app/page.tsx`: `organize`が含まれていない
- ✅ `store/usePersonaStore.ts`: `currentStep`の型定義に`organize`が含まれていない

## エラーが続く場合

Vercelのビルドログを確認して、最新のコミットが反映されているか確認してください。
