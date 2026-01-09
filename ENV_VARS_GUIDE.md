# Vercel環境変数設定ガイド

## エラー: "The name contains invalid characters"

このエラーは、環境変数名（Key）に無効な文字が含まれている場合に発生します。

## 正しい環境変数名のルール

- ✅ **使用可能**: 英字（a-z, A-Z）、数字（0-9）、アンダースコア（_）
- ❌ **使用不可**: ハイフン（-）、スペース、特殊文字、日本語
- ❌ **数字で始まってはいけない**: `123API_KEY` は不可

## 正しい環境変数名（コピーして使用）

### 必須の環境変数

```
NEXT_PUBLIC_OPENROUTER_API_KEY
```

**注意**: 
- 上記をそのままコピー＆ペーストしてください
- 前後にスペースや改行が入らないように注意
- 大文字・小文字を正確に

### 推奨の環境変数（オプション）

```
NEXT_PUBLIC_AI_API_BASE_URL
```

```
NEXT_PUBLIC_AI_MODEL
```

```
NEXT_PUBLIC_SITE_URL
```

## 設定手順（再確認）

1. **Key** フィールドに以下を**正確に**入力（コピー推奨）:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY
   ```

2. **Value** フィールドにAPIキーを入力:
   ```
   sk-or-v1-xxxxxxxxxxxxx
   ```

3. **Environments** は「All Environments」を選択

4. **Sensitive** を「Enabled」に切り替え（APIキーの場合）

5. 「Add」または「Save」をクリック

## よくある間違い

❌ `NEXT_PUBLIC-OPENROUTER_API_KEY` （ハイフンは使用不可）
❌ `NEXT_PUBLIC OPENROUTER_API_KEY` （スペースは使用不可）
❌ `next_public_openrouter_api_key` （小文字のみは動作するが、大文字推奨）
❌ `1NEXT_PUBLIC_OPENROUTER_API_KEY` （数字で始まっている）

✅ `NEXT_PUBLIC_OPENROUTER_API_KEY` （正しい）

## トラブルシューティング

### エラーが続く場合

1. Keyフィールドを一度クリア
2. 上記の正しい環境変数名をコピー
3. 貼り付け（前後のスペースに注意）
4. 再度「Add」をクリック

### 環境変数名を確認する方法

- すべて大文字
- アンダースコア（_）のみで単語を区切る
- 数字で始まらない
- スペースやハイフンを含まない
