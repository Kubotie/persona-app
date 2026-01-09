/**
 * KBアイテム詳細 CRUD API
 * GET: 詳細取得（メタ + ペイロード）
 * PATCH: 更新
 * DELETE: 論理削除
 */

import { NextRequest, NextResponse } from 'next/server';
import { getKBItem, updateKBItem, deleteKBItem } from '@/kb/db-server';
import { updateKBItemRequestSchema } from '@/kb/schemas';

/**
 * GET /api/kb/items/:kbId
 * 詳細取得
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { kbId: string } }
) {
  try {
    const item = getKBItem(params.kbId);

    if (!item) {
      return NextResponse.json({ error: 'KB item not found' }, { status: 404 });
    }

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    console.error('GET /api/kb/items/:kbId error:', error);
    return NextResponse.json({ error: 'Failed to fetch KB item' }, { status: 500 });
  }
}

/**
 * PATCH /api/kb/items/:kbId
 * 更新
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { kbId: string } }
) {
  try {
    const body = await request.json();

    // リクエストを検証
    const validated = updateKBItemRequestSchema.parse(body);

    const updated = updateKBItem(params.kbId, validated);

    if (!updated) {
      return NextResponse.json({ error: 'KB item not found' }, { status: 404 });
    }

    return NextResponse.json({ item: updated }, { status: 200 });
  } catch (error: any) {
    console.error('PATCH /api/kb/items/:kbId error:', error);

    // zodバリデーションエラー
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error.message || 'Failed to update KB item' }, { status: 400 });
  }
}

/**
 * DELETE /api/kb/items/:kbId
 * 論理削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { kbId: string } }
) {
  try {
    const deleted = deleteKBItem(params.kbId);

    if (!deleted) {
      return NextResponse.json({ error: 'KB item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/kb/items/:kbId error:', error);
    return NextResponse.json({ error: 'Failed to delete KB item' }, { status: 500 });
  }
}
