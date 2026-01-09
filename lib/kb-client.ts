/**
 * KBクライアント（保存用ヘルパー）
 * ペルソナアプリ用
 */

import {
  KBItem,
  PersonaPayload,
} from '@/kb/types';
import { Persona } from '@/types';

/**
 * Personaを保存
 */
export async function savePersona(
  persona: Persona,
  options?: {
    title?: string;
    folder_path?: string;
    tags?: string[];
    source_app?: string;
    source_project_id?: string;
  }
): Promise<KBItem> {
  // Persona型からPersonaPayload形式に変換
  const payload: PersonaPayload = {
    type: 'persona',
    persona_id: persona.id,
    hypothesis_label: '仮説ペルソナ',
    summary: persona.one_line_summary,
    story: persona.background_story,
    proxy_structure: {
      whose_problem: persona.proxy_purchase_structure.whose_problem,
      who_solves: persona.proxy_purchase_structure.who_solves,
      how: persona.proxy_purchase_structure.how,
    },
    jtbd: {
      functional: persona.job_to_be_done.functional || [],
      emotional: persona.job_to_be_done.emotional || [],
      social: persona.job_to_be_done.social || [],
    },
    decision_criteria_top5: persona.decision_criteria_top5 || [],
    journey: {
      trigger: persona.typical_journey.trigger,
      consider: persona.typical_journey.consideration,
      purchase: persona.typical_journey.purchase,
      continue: persona.typical_journey.retention,
    },
    pitfalls: persona.common_misconceptions || [],
    tactics: {
      message: persona.effective_strategies?.messages,
      route: persona.effective_strategies?.touchpoints,
      offer: persona.effective_strategies?.offers,
    },
    evidence: {
      quotes: persona.evidence.quotes || [],
      count: persona.evidence.count || 0,
    },
    evidence_quotes: [], // Persona.evidence.quotesから変換が必要な場合は追加
  };

  const response = await fetch('/api/kb/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'persona',
      title: options?.title,
      folder_path: options?.folder_path || 'My Files/Personas',
      tags: options?.tags || [],
      source_app: options?.source_app || 'persona-app',
      source_project_id: options?.source_project_id,
      payload,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save persona');
  }

  const data = await response.json();
  return data.item;
}
