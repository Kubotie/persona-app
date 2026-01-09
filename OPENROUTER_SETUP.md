# OpenRouter.ai セットアップガイド

このアプリでOpenRouter.aiのAPIキーを使用する方法です。

## 1. 環境変数ファイルの作成

プロジェクトルート（`persona-app`ディレクトリ）に`.env.local`ファイルを作成してください。

## 2. 環境変数の設定

`.env.local`ファイルに以下の内容を追加してください：

```bash
# OpenRouter.aiのAPIキー
NEXT_PUBLIC_OPENROUTER_API_KEY=your-openrouter-api-key-here

# OpenRouter.aiのAPIベースURL（自動設定されますが、明示的に指定することも可能）
NEXT_PUBLIC_AI_API_BASE_URL=https://openrouter.ai/api/v1

# 使用するモデル（オプション、デフォルト: anthropic/claude-sonnet-4.5）
NEXT_PUBLIC_AI_MODEL=anthropic/claude-sonnet-4.5

# サイトURL（オプション、OpenRouter.aiの推奨ヘッダー用）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. 利用可能なモデル

OpenRouter.aiでは複数のモデルを選択できます。以下は例です：

- `anthropic/claude-sonnet-4.5` - デフォルト（最新のClaude Sonnet 4.5、推論能力が高い）
- `anthropic/claude-3.5-sonnet` - Claude 3.5 Sonnet（以前のバージョン）
- `openai/gpt-4o-mini` - コスト効率が良い
- `openai/gpt-4o` - より高性能
- `openai/gpt-4-turbo` - 高精度
- `google/gemini-pro-1.5` - Google Gemini Pro

モデルを変更する場合は、`.env.local`の`NEXT_PUBLIC_AI_MODEL`を変更してください。

## 4. 開発サーバーの再起動

環境変数を変更した後は、開発サーバーを再起動してください：

```bash
# サーバーを停止（Ctrl+C）してから
npm run dev
```

## 5. 動作確認

1. アプリを起動: `npm run dev`
2. データを入力して「AIでExtraction生成」ボタンをクリック
3. エラーが表示されなければ、OpenRouter.aiが正常に動作しています

## トラブルシューティング

### APIキーエラーが表示される場合

- `.env.local`ファイルが正しい場所（`persona-app`ディレクトリ）にあるか確認
- 環境変数名が`NEXT_PUBLIC_OPENROUTER_API_KEY`であるか確認
- 開発サーバーを再起動したか確認

### モデルが見つからないエラーが表示される場合

- `NEXT_PUBLIC_AI_MODEL`の値が正しいか確認
- OpenRouter.aiのドキュメントで利用可能なモデル名を確認: https://openrouter.ai/models

### その他のエラー

- ブラウザのコンソール（F12）でエラーメッセージを確認
- OpenRouter.aiのAPIキーが有効か確認
- クレジット残高があるか確認
