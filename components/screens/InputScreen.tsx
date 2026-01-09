'use client';

import { useState } from 'react';
import { usePersonaStore } from '@/store/usePersonaStore';
import { InputSource } from '@/types';

export default function InputScreen() {
  const { inputSources, addInputSource, removeInputSource, splitTextIntoStatements, addStatements, setCurrentStep } = usePersonaStore();
  
  const [inputType, setInputType] = useState<'interview' | 'comment' | 'persona'>('interview');
  const [text, setText] = useState('');
  const [metadata, setMetadata] = useState({
    interviewName: '',
    interviewDate: '',
    segment: '',
    owner: '',
  });

  const handleAddSource = () => {
    if (!text.trim()) return;

    const sourceId = `source-${Date.now()}`;
    const source: InputSource = {
      id: sourceId,
      type: inputType,
      text,
      metadata: {
        interviewName: metadata.interviewName || undefined,
        interviewDate: metadata.interviewDate || undefined,
        segment: metadata.segment || undefined,
        owner: metadata.owner || undefined,
      },
      createdAt: new Date().toISOString(),
    };

    addInputSource(source);
    setText('');
    setMetadata({ interviewName: '', interviewDate: '', segment: '', owner: '' });
  };

  const handleStartExtraction = () => {
    // Statement生成をスキップして、直接Extraction生成へ
    // LLMが入力ソース全体を分析してrespondentを識別するため、事前のStatement分割は不要
    setCurrentStep('extraction');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">データ入力</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">入力タイプ</label>
            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="interview">インタビュー記録</option>
              <option value="comment">定性コメント</option>
              <option value="persona">既存ペルソナ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">ファイル取り込み（.txt / .md）</label>
            <input
              type="file"
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">インタビュー名（任意）</label>
              <input
                type="text"
                value={metadata.interviewName}
                onChange={(e) => setMetadata({ ...metadata, interviewName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="インタビュー名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">実施日（任意）</label>
              <input
                type="date"
                value={metadata.interviewDate}
                onChange={(e) => setMetadata({ ...metadata, interviewDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">対象セグメント（任意）</label>
              <input
                type="text"
                value={metadata.segment}
                onChange={(e) => setMetadata({ ...metadata, segment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="対象セグメント"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">担当者（任意）</label>
              <input
                type="text"
                value={metadata.owner}
                onChange={(e) => setMetadata({ ...metadata, owner: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="担当者"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">テキストエリア</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Q: なぜこのサービスを…&#10;A: 価格が安いから…"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddSource}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              追加
            </button>
            <button
              onClick={handleStartExtraction}
              disabled={inputSources.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Extraction生成へ進む
            </button>
          </div>
        </div>
      </div>

      {inputSources.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">入力済みソース一覧</h3>
          <ul className="space-y-2">
            {inputSources.map((source) => (
              <li key={source.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">
                  {source.type === 'interview' && 'インタビュー記録'}
                  {source.type === 'comment' && '定性コメント'}
                  {source.type === 'persona' && '既存ペルソナ'}
                  {source.metadata?.interviewName && ` - ${source.metadata.interviewName}`}
                </span>
                <button
                  onClick={() => removeInputSource(source.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
