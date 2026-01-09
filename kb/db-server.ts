/**
 * KB永続層（サーバーサイド用、ローカルストレージの代替）
 * API Routesから使用
 * 
 * 注意: 本番環境ではDBに置き換える必要があります。
 * 現在はメモリベースの実装（再起動でデータが消える）
 */

import { KBItem, KBBaseMeta, KBPayload } from './types';

// メモリ内ストレージ（簡易実装）
// 本番環境ではDBに置き換える
let memoryStore: KBItem[] = [];

/**
 * KBアイテム一覧を取得（メタのみ）
 */
export function getKBItemsMeta(
  filters?: {
    q?: string;
    type?: string;
    folder_path?: string;
    owner_id?: string;
  }
): KBBaseMeta[] {
  let filtered = memoryStore.filter((item) => !item.deleted_at);

  // フィルタ適用
  if (filters) {
    if (filters.q) {
      const q = filters.q.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    if (filters.type) {
      filtered = filtered.filter((item) => item.type === filters.type);
    }
    if (filters.folder_path) {
      filtered = filtered.filter((item) => item.folder_path === filters.folder_path);
    }
    if (filters.owner_id) {
      filtered = filtered.filter((item) => item.owner_id === filters.owner_id);
    }
  }

  // updated_at descでソート
  filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  // メタのみ返す
  return filtered.map(({ payload, ...meta }) => meta);
}

/**
 * KBアイテム詳細を取得
 */
export function getKBItem(kbId: string): KBItem | null {
  const item = memoryStore.find((item) => item.kb_id === kbId && !item.deleted_at);
  return item || null;
}

/**
 * KBアイテムを作成
 */
export function createKBItem(item: KBItem): KBItem {
  if (memoryStore.some((i) => i.kb_id === item.kb_id)) {
    throw new Error(`KB item with id ${item.kb_id} already exists`);
  }

  memoryStore.push(item);
  return item;
}

/**
 * KBアイテムを更新
 */
export function updateKBItem(
  kbId: string,
  updates: {
    title?: string;
    folder_path?: string;
    tags?: string[];
    visibility?: 'private' | 'shared';
  }
): KBItem | null {
  const index = memoryStore.findIndex((item) => item.kb_id === kbId && !item.deleted_at);

  if (index === -1) return null;

  const updated: KBItem = {
    ...memoryStore[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  memoryStore[index] = updated;
  return updated;
}

/**
 * KBアイテムを論理削除
 */
export function deleteKBItem(kbId: string): boolean {
  const index = memoryStore.findIndex((item) => item.kb_id === kbId && !item.deleted_at);

  if (index === -1) return false;

  memoryStore[index] = {
    ...memoryStore[index],
    deleted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return true;
}

/**
 * ActiveContextを取得（サーバーサイドではメモリベース）
 */
let activeContext: any = null;

export function getActiveContext(): any | null {
  return activeContext;
}

/**
 * ActiveContextを設定
 */
export function setActiveContext(context: any): void {
  activeContext = {
    ...context,
    updated_at: new Date().toISOString(),
  };
}

/**
 * 自動命名を生成
 */
export function generateKBTitle(type: string, label?: string): string {
  const typeLabels: Record<string, string> = {
    persona: 'Persona',
    banner: 'Banner',
    insight: 'Insight',
    report: 'Report',
    option: 'Option',
    plan: 'Plan',
  };

  const typeLabel = typeLabels[type] || type;
  const timestamp = Date.now();
  const suffix = label ? `_${label}` : '';

  return `KB-${typeLabel}-${timestamp}${suffix}`;
}
