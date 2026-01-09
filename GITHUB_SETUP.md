# GitHub・Vercelデプロイ手順（詳細版）

## 1. GitHubリポジトリの作成

まず、GitHubでリポジトリを作成します：

1. https://github.com/new にアクセス
2. **Repository name**: `persona-summary-app`（任意の名前）
3. **Description**: 「ペルソナ要約・比較アプリ」（任意）
4. **Public/Private**: 選択
5. **「Add a README file」はチェックしない**（既にREADMEがあるため）
6. 「Create repository」をクリック

## 2. 既存のリモートを確認・削除

既にリモートが設定されている場合、削除または更新します：

```bash
# 現在のリモートを確認
git remote -v

# 既存のリモートを削除（存在する場合）
git remote remove origin
```

## 3. 正しいGitHubリポジトリURLで設定

GitHubで作成したリポジトリのURLを使用します：

```bash
# プロジェクトディレクトリに移動
cd "/Users/kubotie/Downloads/AIテキスト/persona-app"

# Gitの状態を確認
git status

# 変更がある場合はコミット
git add .
git commit -m "Initial commit: Persona Summary App"

# リモートを追加（GitHubで作成した実際のリポジトリURLを使用）
# 例: https://github.com/kubotie/persona-summary-app.git
# 注意: 'kubotie'の部分をあなたのGitHubユーザー名に置き換えてください
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/persona-summary-app.git

# ブランチ名をmainに設定
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**重要**: `YOUR-GITHUB-USERNAME`の部分をあなたの実際のGitHubユーザー名に置き換えてください。

## 4. 認証が必要な場合

GitHubにプッシュする際、認証が必要になる場合があります：

### Personal Access Token（推奨）

1. https://github.com/settings/tokens にアクセス
2. 「Generate new token」→「Generate new token (classic)」をクリック
3. **Note**: `Vercel Deployment`（任意）
4. **Expiration**: 必要に応じて設定
5. **Select scopes**: `repo`にチェック
6. 「Generate token」をクリック
7. 生成されたトークンをコピー（再度表示されません）

プッシュ時に認証を求められたら：
- Username: あなたのGitHubユーザー名
- Password: 上記で生成したPersonal Access Token

または、URLにトークンを含めることもできます：

```bash
git remote set-url origin https://YOUR-TOKEN@github.com/YOUR-GITHUB-USERNAME/persona-summary-app.git
```

### SSH認証（オプション）

SSHキーを設定している場合：

```bash
git remote set-url origin git@github.com:YOUR-GITHUB-USERNAME/persona-summary-app.git
```

## 5. Vercelへのデプロイ

GitHubにプッシュが完了したら：

1. https://vercel.com にログイン
2. 「Add New...」→「Project」をクリック
3. 作成したGitHubリポジトリを選択
4. プロジェクト設定：
   - **Framework Preset**: Next.js（自動検出）
   - **Root Directory**: 空欄のまま（`persona-app`がルートの場合）
   - その他はデフォルトのまま
5. 「Deploy」をクリック

## 6. 環境変数の設定

デプロイ後に、Vercelダッシュボードで環境変数を設定：

1. プロジェクトの「Settings」→「Environment Variables」
2. 以下を追加：
   - `NEXT_PUBLIC_OPENROUTER_API_KEY` = あなたのOpenRouter.ai APIキー
   - `NEXT_PUBLIC_AI_API_BASE_URL` = `https://openrouter.ai/api/v1`（オプション）
   - `NEXT_PUBLIC_AI_MODEL` = `openai/gpt-4o-mini`（オプション）
   - `NEXT_PUBLIC_SITE_URL` = デプロイ後のURL（例: `https://your-app.vercel.app`）
3. すべての環境（Production, Preview, Development）にチェック
4. 「Redeploy」をクリック

## トラブルシューティング

### リモートが既に存在する場合

```bash
# 既存のリモートを確認
git remote -v

# 削除して再追加
git remote remove origin
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/persona-summary-app.git
```

### コミットする変更がない場合

`nothing to commit, working tree clean`と表示される場合は、既にすべての変更がコミットされています。そのままプッシュできます。

### 認証エラーが発生する場合

- Personal Access Tokenを使用しているか確認
- GitHubユーザー名が正しいか確認
- リポジトリのURLが正しいか確認
