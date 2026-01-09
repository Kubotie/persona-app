'use client';

import { useState } from 'react';
import { usePersonaStore } from '@/store/usePersonaStore';
import { Statement } from '@/types';

export default function OrganizeScreen() {
  const { statements, tags, updateStatement, deleteStatement, addTag, setCurrentStep, generateSummaries, generateComparison } = usePersonaStore();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagName, setNewTagName] = useState('');

  const handleEdit = (stmt: Statement) => {
    setEditingId(stmt.id);
    setEditText(stmt.text);
    setSelectedTags([]); // 新しい設計ではtagsは使わない
  };

  const handleSave = (id: string) => {
    updateStatement(id, {
      text: editText,
    });
    setEditingId(null);
    setEditText('');
    setSelectedTags([]);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
    setSelectedTags([]);
  };

  const handleTagToggle = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const handleAddCustomTag = () => {
    if (!newTagName.trim()) return;
    const newTag = {
      id: `tag-${Date.now()}`,
      name: newTagName,
      category: 'その他',
      isCustom: true,
      color: '#6b7280',
    };
    addTag(newTag);
    setNewTagName('');
  };

  const handlePersonaChange = (id: string, persona: string | null) => {
    // 新しい設計ではpersonaは使わない（ExtractionRecordで管理）
    // 後方互換のため残す
  };

  const handleGenerateSummary = () => {
    // 新しい設計では、Extraction → Aggregation → Personaの順で生成
    // この画面は後方互換のため残す
    generateSummaries();
    generateComparison();
    setCurrentStep('summary');
  };

  const personas: string[] = []; // 新しい設計では使わない
  const unclassifiedCount = 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">発言の整理・タグ付け</h2>
          <button
            onClick={handleGenerateSummary}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            要約生成へ進む
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 発言一覧 */}
          <div className="col-span-2 space-y-4">
            <h3 className="font-semibold mb-2">発言一覧 ({statements.length}件)</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {statements.map((stmt) => (
                <div
                  key={stmt.id}
                  id={`statement-${stmt.id}`}
                  className={`p-4 border rounded-lg ${
                    editingId === stmt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  {editingId === stmt.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                      />
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <button
                            key={tag.id}
                            onClick={() => handleTagToggle(tag.name)}
                            className={`px-2 py-1 text-xs rounded ${
                              selectedTags.includes(tag.name)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {tag.name}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(stmt.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          保存
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500">[発言ID: {stmt.id}]</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(stmt)}
                            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => deleteStatement(stmt.id)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{stmt.text}</p>
                      <div className="text-xs text-gray-500 mb-2">
                        source: {stmt.source}
                        {stmt.metadata?.lineNumber && ` (line ${stmt.metadata.lineNumber})`}
                        {stmt.metadata?.respondent_id && ` [${stmt.metadata.respondent_id}]`}
                      </div>
                      <div className="text-xs text-gray-400">
                        ※ 新しい設計では、Extraction → Aggregation → Personaの順で処理します
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* タグ管理・ペルソナ分離 */}
          <div className="space-y-6">
            {/* タグ管理 */}
            <div>
              <h3 className="font-semibold mb-2">タグ一覧</h3>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                  >
                    <span
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-sm">{tag.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="カスタムタグ名"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <button
                  onClick={handleAddCustomTag}
                  className="mt-2 w-full px-2 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  タグ追加
                </button>
              </div>
            </div>

            {/* ペルソナ分離 */}
            <div>
              <h3 className="font-semibold mb-2">ペルソナ分離</h3>
              <div className="space-y-2">
                {personas.map((p) => {
                  const count = statements.filter((s) => s.persona === p).length;
                  return (
                    <div key={p} className="p-2 bg-gray-50 rounded">
                      <span className="text-sm">ペルソナ{p}: {count}件</span>
                    </div>
                  );
                })}
                {unclassifiedCount > 0 && (
                  <div className="p-2 bg-yellow-50 rounded">
                    <span className="text-sm">未分類: {unclassifiedCount}件</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
