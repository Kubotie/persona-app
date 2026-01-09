/**
 * KBアイテム CRUD API
 * GET: 一覧（メタのみ）
 * POST: 作成
 */

import { NextRequest, NextResponse } from 'next/server';
import { getKBItemsMeta, createKBItem, generateKBTitle } from '@/kb/db-server';
import { createKBItemRequestSchema, kbPayloadSchema } from '@/kb/schemas';
import { KBItem } from '@/kb/types';

// UUID生成（簡易実装、本番ではuuidパッケージを使用）
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * GET /api/kb/items
 * 一覧取得（メタのみ）
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || undefined;
    const type = searchParams.get('type') || undefined;
    const folder_path = searchParams.get('folder_path') || undefined;
    const owner_id = searchParams.get('owner_id') || undefined;

    const items = getKBItemsMeta({ q, type, folder_path, owner_id });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('GET /api/kb/items error:', error);
    return NextResponse.json({ error: 'Failed to fetch KB items' }, { status: 500 });
  }
}

/**
 * POST /api/kb/items
 * アイテム作成
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // リクエストを検証
    const validated = createKBItemRequestSchema.parse(body);

    // ペイロードを個別に検証（根拠リンクチェックなど）
    const payloadValidation = kbPayloadSchema.parse(validated.payload);

    // Insightの場合、evidence_links.target_banner_idsが空でないことを確認
    if (validated.type === 'insight' && payloadValidation.type === 'insight') {
      if (payloadValidation.evidence_links.target_banner_ids.length === 0) {
        return NextResponse.json(
          { error: '根拠リンク（target_banner_ids）は必須です。Insightを保存するには、対象バナーIDを指定してください。' },
          { status: 400 }
        );
      }
    }

    // KBアイテムを作成
    const kbId = generateUUID();
    const now = new Date().toISOString();
    const title = validated.title || generateKBTitle(validated.type);

    const kbItem: KBItem = {
      kb_id: kbId,
      type: validated.type,
      title,
      folder_path: validated.folder_path || 'My Files',
      tags: validated.tags || [],
      owner_id: validated.owner_id || 'user',
      visibility: validated.visibility || 'private',
      source_app: validated.source_app,
      source_project_id: validated.source_project_id,
      source_refs: validated.source_refs,
      created_at: now,
      updated_at: now,
      payload: validated.payload,
    };

    const created = createKBItem(kbItem);

    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/kb/items error:', error);

    // zodバリデーションエラー
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error.message || 'Failed to create KB item' }, { status: 400 });
  }
}
