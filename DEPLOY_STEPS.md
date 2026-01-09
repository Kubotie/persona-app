# Vercelデプロイ手順（実際のコマンド）

## ⚠️ 重要：`YOUR-GITHUB-USERNAME`を実際のGitHubユーザー名に置き換えてください

## ステップ1: 既存のリモートを削除

```bash
cd "/Users/kubotie/Downloads/AIテキスト/persona-app"
git remote remove origin
```

## ステップ2: GitHubでリポジトリを作成

1. ブラウザで https://github.com/new を開く
2. **Repository name**: `persona-summary-app`（任意）
3. 「Create repository」をクリック
4. 作成されたリポジトリのURLをコピー（例: `https://github.com/あなたのユーザー名/persona-summary-app.git`）

## ステップ3: 正しいリモートURLで設定

```bash
# ステップ2でコピーしたURLを使用してリモートを追加
# 例: git remote add origin https://github.com/kubotie/persona-summary-app.git
git remote add origin https://github.com/あなたのGitHubユーザー名/persona-summary-app.git

# ブランチ名を確認（既にmainならスキップ可能）
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**注意**: `あなたのGitHubユーザー名`の部分を実際のGitHubユーザー名に置き換えてください。

## ステップ4: 認証が必要な場合

プッシュ時に認証を求められたら：

1. GitHubでPersonal Access Tokenを作成:
   - https://github.com/settings/tokens
   - 「Generate new token (classic)」
   - `repo`スコープにチェック
   - トークンを生成・コピー

2. プッシュ時に:
   - Username: あなたのGitHubユーザー名
   - Password: 生成したPersonal Access Token

## ステップ5: Vercelにデプロイ

1. https://vercel.com にログイン
2. 「Add New...」→「Project」
3. ステップ2で作成したリポジトリを選択
4. 環境変数を設定（VERCEL_DEPLOY.mdを参照）
5. 「Deploy」をクリック

## クイックリファレンス

```bash
# 現在のリモートを確認
git remote -v

# リモートを削除
git remote remove origin

# 正しいリモートを追加（YOUR-USERNAMEを実際のユーザー名に置き換え）
git remote add origin https://github.com/YOUR-USERNAME/persona-summary-app.git

# プッシュ
git push -u origin main
```
