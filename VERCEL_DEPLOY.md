# Vercelデプロイガイド

このアプリをVercelにデプロイする手順です。

## 1. 前提条件

- GitHubアカウント
- Vercelアカウント（https://vercel.com で無料登録可能）
- OpenRouter.aiのAPIキー

## 2. GitHubにプッシュ

まず、プロジェクトをGitHubリポジトリにプッシュします：

### ステップ1: 既存のリモートを削除（存在する場合）

```bash
cd "/Users/kubotie/Downloads/AIテキスト/persona-app"
git remote remove origin
```

### ステップ2: GitHubでリポジトリを作成

1. ブラウザで https://github.com/new を開く
2. **Repository name**: `persona-summary-app`（任意の名前）
3. 「Create repository」をクリック
4. 作成されたリポジトリのURLをコピー（例: `https://github.com/あなたのユーザー名/persona-summary-app.git`）

### ステップ3: 正しいリモートURLで設定

```bash
# ステップ2でコピーしたURLを使用（YOUR-USERNAMEを実際のGitHubユーザー名に置き換える）
git remote add origin https://github.com/YOUR-USERNAME/persona-summary-app.git

# 変更をコミット（未コミットの変更がある場合）
git add .
git commit -m "Initial commit: Persona Summary App"

# ブランチ名をmainに設定
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**⚠️ 重要**: 
- `YOUR-USERNAME`の部分を**実際のGitHubユーザー名**に置き換えてください
- `.env.local`ファイルは`.gitignore`に含まれているため、コミットされません
- 環境変数はVercelダッシュボードで設定してください
- プッシュ時に認証を求められたら、Personal Access Tokenを使用してください（GITHUB_SETUP.md参照）

## 3. Vercelにプロジェクトをインポート

1. https://vercel.com にログイン
2. 「Add New...」→「Project」をクリック
3. GitHubリポジトリを選択
4. プロジェクト設定：
   - **Framework Preset**: Next.js（自動検出されるはず）
   - **Root Directory**: 
     - プロジェクトが`persona-app`サブディレクトリにある場合: `persona-app`を指定
     - プロジェクトのルートディレクトリが`persona-app`の場合: 空欄のまま（デフォルト）
   - **Build Command**: `npm run build`（デフォルト、`vercel.json`で設定済み）
   - **Output Directory**: `.next`（デフォルト）
   - **Install Command**: `npm install`（デフォルト、`vercel.json`で設定済み）
   
   **重要**: 
   - 現在のプロジェクト構造では、`persona-app`ディレクトリがプロジェクトルートです
   - GitHubリポジトリのルートが`persona-app`ディレクトリの場合、「Root Directory」は空欄のままにしてください
   - GitHubリポジトリのルートが`AIテキスト`ディレクトリの場合、「Root Directory」に`persona-app`を指定してください

## 4. 環境変数の設定

Vercelダッシュボードで、プロジェクトの「Settings」→「Environment Variables」に以下を追加：

### 必須の環境変数

```
NEXT_PUBLIC_OPENROUTER_API_KEY=your-openrouter-api-key-here
```

### 推奨の環境変数

```
NEXT_PUBLIC_AI_API_BASE_URL=https://openrouter.ai/api/v1
NEXT_PUBLIC_AI_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
```

**重要**: 
- `NEXT_PUBLIC_SITE_URL`は、デプロイ後にVercelが自動的に割り当てるURLに更新してください
- 環境変数は「Production」「Preview」「Development」すべての環境に設定することを推奨します

### 環境変数の設定方法

1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→「Environment Variables」をクリック
3. 各環境変数を追加：
   - **Name**: 環境変数名（例: `NEXT_PUBLIC_OPENROUTER_API_KEY`）
   - **Value**: 値（例: あなたのAPIキー）
   - **Environment**: Production, Preview, Development すべてにチェック
4. 「Save」をクリック

## 5. デプロイ

環境変数を設定したら：

1. 「Deployments」タブに戻る
2. 最新のデプロイメントの「...」メニューから「Redeploy」を選択
3. または、GitHubにプッシュすると自動的に再デプロイされます

## 6. デプロイ後の確認

1. デプロイが完了したら、Vercelが提供するURL（例: `https://your-app-name.vercel.app`）にアクセス
2. アプリが正常に表示されるか確認
3. 「データ入力」画面でデータを入力し、AI機能が動作するか確認

## 7. カスタムドメインの設定（オプション）

1. Vercelダッシュボードで「Settings」→「Domains」
2. ドメイン名を入力
3. DNS設定に従ってドメインを設定

## トラブルシューティング

### ビルドエラーが発生する場合

- `npm run build`をローカルで実行してエラーを確認
- コンソールログを確認

### 環境変数が読み込まれない場合

- 環境変数名が`NEXT_PUBLIC_`で始まっているか確認
- デプロイ後に再デプロイが必要な場合があります
- Vercelダッシュボードの「Environment Variables」で設定を確認

### APIキーエラーが表示される場合

- Vercelの環境変数設定を確認
- OpenRouter.aiのAPIキーが有効か確認
- ブラウザのコンソールでエラーメッセージを確認

## 注意事項

- `.env.local`ファイルはGitにコミットしないでください（`.gitignore`に含まれています）
- 環境変数はVercelダッシュボードで管理してください
- `NEXT_PUBLIC_`で始まる環境変数はクライアントサイドに公開されるため、機密情報は含めないでください
