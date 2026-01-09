import { Statement, Tag, PersonaSummary, PersonaComparison } from '@/types';

// ダミー発言データ
export const dummyStatements: Statement[] = [
  {
    id: 'stmt-001',
    text: '価格が高すぎて手が出ない',
    source: 'インタビュー記録_2024-01-15',
    timestamp: '2024-01-15T10:00:00',
    metadata: {
      interviewName: 'ユーザーインタビュー_2024-01-15',
      interviewDate: '2024-01-15',
      segment: '個人ユーザー',
      lineNumber: 1,
      respondent_id: 'R001',
    },
  },
  {
    id: 'stmt-002',
    text: '使いやすさが重要だと思う',
    source: 'インタビュー記録_2024-01-15',
    timestamp: '2024-01-15T10:05:00',
    metadata: {
      lineNumber: 2,
      respondent_id: 'R002',
    },
  },
  {
    id: 'stmt-003',
    text: '使いこなせるか不安です',
    source: 'インタビュー記録_2024-01-15',
    timestamp: '2024-01-15T10:10:00',
    metadata: {
      lineNumber: 3,
      respondent_id: 'R001',
    },
  },
  {
    id: 'stmt-004',
    text: '無料トライアルがあれば試したい',
    source: 'インタビュー記録_2024-01-15',
    timestamp: '2024-01-15T10:15:00',
    metadata: {
      lineNumber: 4,
      respondent_id: 'R001',
    },
  },
  {
    id: 'stmt-005',
    text: 'もう少し安ければ検討したい',
    source: 'インタビュー記録_2024-01-15',
    timestamp: '2024-01-15T10:20:00',
    metadata: {
      lineNumber: 5,
      respondent_id: 'R001',
    },
  },
  {
    id: 'stmt-006',
    text: '「簡単」という言葉は信用できない',
    source: 'インタビュー記録_2024-01-15',
    timestamp: '2024-01-15T10:25:00',
    metadata: {
      lineNumber: 6,
      respondent_id: 'R001',
    },
  },
  {
    id: 'stmt-007',
    text: '便利になりそうで期待している',
    source: 'インタビュー記録_2024-01-15',
    timestamp: '2024-01-15T10:30:00',
    metadata: {
      lineNumber: 7,
      respondent_id: 'R001',
    },
  },
  {
    id: 'stmt-008',
    text: '機能が不足している',
    source: '定性コメント_アンケート',
    timestamp: '2024-01-16T09:00:00',
    metadata: {
      lineNumber: 8,
      respondent_id: 'R002',
    },
  },
  {
    id: 'stmt-009',
    text: 'カスタマイズできないのが不満',
    source: '定性コメント_アンケート',
    timestamp: '2024-01-16T09:05:00',
    metadata: {
      lineNumber: 9,
      respondent_id: 'R002',
    },
  },
  {
    id: 'stmt-010',
    text: 'デモ動画があれば検討する',
    source: '定性コメント_アンケート',
    timestamp: '2024-01-16T09:10:00',
    metadata: {
      lineNumber: 10,
      respondent_id: 'R002',
    },
  },
  {
    id: 'stmt-011',
    text: '「高機能」という表現は逆効果',
    source: '定性コメント_アンケート',
    timestamp: '2024-01-16T09:15:00',
    metadata: {
      lineNumber: 11,
      respondent_id: 'R002',
    },
  },
  {
    id: 'stmt-012',
    text: 'サポートが不足している',
    source: '定性コメント_アンケート',
    timestamp: '2024-01-16T10:00:00',
    metadata: {
      lineNumber: 12,
      respondent_id: 'R003',
    },
  },
  {
    id: 'stmt-013',
    text: '実績紹介があれば信頼できる',
    source: '定性コメント_アンケート',
    timestamp: '2024-01-16T10:05:00',
    metadata: {
      lineNumber: 13,
      respondent_id: 'R003',
    },
  },
];

// ダミーペルソナ要約データ
export const dummyPersonaSummaries: PersonaSummary[] = [
  {
    personaId: 'A',
    summary: {
      challenges: [
        {
          text: '価格が高すぎて手が出ない',
          evidenceIds: ['stmt-001'],
          evidences: [
            {
              statementId: 'stmt-001',
              source: 'インタビュー記録_2024-01-15',
              quoteText: '価格が高すぎて手が出ない',
            },
          ],
          tags: ['課題', '価格'],
        },
        {
          text: 'もう少し安ければ検討したい',
          evidenceIds: ['stmt-005'],
          evidences: [
            {
              statementId: 'stmt-005',
              source: 'インタビュー記録_2024-01-15',
              quoteText: 'もう少し安ければ検討したい',
            },
          ],
          tags: ['課題', '価格'],
        },
      ],
      emotions: [
        {
          text: '使いこなせるか不安です',
          evidenceIds: ['stmt-003'],
          evidences: [
            {
              statementId: 'stmt-003',
              source: 'インタビュー記録_2024-01-15',
              quoteText: '使いこなせるか不安です',
            },
          ],
          tags: ['感情'],
        },
        {
          text: '便利になりそうで期待している',
          evidenceIds: ['stmt-007'],
          evidences: [
            {
              statementId: 'stmt-007',
              source: 'インタビュー記録_2024-01-15',
              quoteText: '便利になりそうで期待している',
            },
          ],
          tags: ['感情'],
        },
      ],
      decisionTriggers: [
        {
          text: '無料トライアルがあれば試したい',
          evidenceIds: ['stmt-004'],
          evidences: [
            {
              statementId: 'stmt-004',
              source: 'インタビュー記録_2024-01-15',
              quoteText: '無料トライアルがあれば試したい',
            },
          ],
          tags: ['意思決定トリガー'],
        },
      ],
      ngExpressions: [
        {
          text: '「簡単」という言葉は信用できない',
          evidenceIds: ['stmt-006'],
          evidences: [
            {
              statementId: 'stmt-006',
              source: 'インタビュー記録_2024-01-15',
              quoteText: '「簡単」という言葉は信用できない',
            },
          ],
          tags: ['NG表現'],
        },
      ],
    },
    statementCount: 7,
  },
  {
    personaId: 'B',
    summary: {
      challenges: [
        {
          text: '使いやすさが重要だと思う',
          evidenceIds: ['stmt-002'],
          evidences: [
            {
              statementId: 'stmt-002',
              source: 'インタビュー記録_2024-01-15',
              quoteText: '使いやすさが重要だと思う',
            },
          ],
          tags: ['課題', '品質'],
        },
        {
          text: '機能が不足している',
          evidenceIds: ['stmt-008'],
          evidences: [
            {
              statementId: 'stmt-008',
              source: '定性コメント_アンケート',
              quoteText: '機能が不足している',
            },
          ],
          tags: ['課題'],
        },
        {
          text: 'カスタマイズできないのが不満',
          evidenceIds: ['stmt-009'],
          evidences: [
            {
              statementId: 'stmt-009',
              source: '定性コメント_アンケート',
              quoteText: 'カスタマイズできないのが不満',
            },
          ],
          tags: ['課題'],
        },
      ],
      emotions: [],
      decisionTriggers: [
        {
          text: 'デモ動画があれば検討する',
          evidenceIds: ['stmt-010'],
          evidences: [
            {
              statementId: 'stmt-010',
              source: '定性コメント_アンケート',
              quoteText: 'デモ動画があれば検討する',
            },
          ],
          tags: ['意思決定トリガー'],
        },
      ],
      ngExpressions: [
        {
          text: '「高機能」という表現は逆効果',
          evidenceIds: ['stmt-011'],
          evidences: [
            {
              statementId: 'stmt-011',
              source: '定性コメント_アンケート',
              quoteText: '「高機能」という表現は逆効果',
            },
          ],
          tags: ['NG表現'],
        },
      ],
    },
    statementCount: 4,
  },
  {
    personaId: 'C',
    summary: {
      challenges: [
        {
          text: 'サポートが不足している',
          evidenceIds: ['stmt-012'],
          evidences: [
            {
              statementId: 'stmt-012',
              source: '定性コメント_アンケート',
              quoteText: 'サポートが不足している',
            },
          ],
          tags: ['課題'],
        },
      ],
      emotions: [],
      decisionTriggers: [
        {
          text: '実績紹介があれば信頼できる',
          evidenceIds: ['stmt-013'],
          evidences: [
            {
              statementId: 'stmt-013',
              source: '定性コメント_アンケート',
              quoteText: '実績紹介があれば信頼できる',
            },
          ],
          tags: ['意思決定トリガー'],
        },
      ],
      ngExpressions: [],
    },
    statementCount: 2,
  },
];

// ダミー比較データ
export const dummyComparison: PersonaComparison = {
  personas: ['A', 'B', 'C'],
  comparison: {
    challenges: {
      A: dummyPersonaSummaries[0].summary.challenges,
      B: dummyPersonaSummaries[1].summary.challenges,
      C: dummyPersonaSummaries[2].summary.challenges,
    },
    emotions: {
      A: dummyPersonaSummaries[0].summary.emotions,
      B: dummyPersonaSummaries[1].summary.emotions,
      C: dummyPersonaSummaries[2].summary.emotions,
    },
    decisionTriggers: {
      A: dummyPersonaSummaries[0].summary.decisionTriggers,
      B: dummyPersonaSummaries[1].summary.decisionTriggers,
      C: dummyPersonaSummaries[2].summary.decisionTriggers,
    },
    ngExpressions: {
      A: dummyPersonaSummaries[0].summary.ngExpressions,
      B: dummyPersonaSummaries[1].summary.ngExpressions,
      C: dummyPersonaSummaries[2].summary.ngExpressions,
    },
  },
  commonPoints: ['課題に関する発言が多い（A, B, C）'],
  differences: ['課題の種類が異なる（A: 価格、B: 機能、C: サポート）'],
};
