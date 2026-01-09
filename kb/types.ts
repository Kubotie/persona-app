/**
 * 統合ナレッジベース（KB）型定義
 * ペルソナアプリ/バナー分析アプリ共通
 */

import { Persona } from '@/types';

/**
 * KB種別
 */
export type KBType = 'persona' | 'banner' | 'insight' | 'report' | 'option' | 'plan';

/**
 * BBox座標系（normalized/pixelを必須にして混在を防ぐ）
 */
export interface BBoxCoord {
  x: number;
  y: number;
  w: number;
  h: number;
  coord_type: 'normalized' | 'pixel'; // 座標系を明示
}

/**
 * KB基本メタデータ（一覧表示用）
 */
export interface KBBaseMeta {
  kb_id: string; // UUID
  type: KBType;
  title: string; // 表示名（例: "KB-Banner-001_価格訴求バナー"）
  folder_path: string; // フォルダ階層（例: "My Files/Banners"）
  tags: string[]; // タグ（検索対象）
  owner_id: string; // オーナーID（デフォルト: 'user'）
  visibility: 'private' | 'shared'; // 共有状態
  source_app?: string; // 元アプリ（例: "banner-analyzer", "persona-app"）
  source_project_id?: string; // 元のプロジェクトID
  source_refs?: string[]; // 参照元（例: ["banner-001", "insight-002"]）
  created_at: string; // ISO 8601形式
  updated_at: string; // ISO 8601形式
  deleted_at?: string; // 論理削除用（ISO 8601形式）
}

/**
 * KBアイテム（メタ + ペイロード）
 */
export interface KBItem extends KBBaseMeta {
  payload: KBPayload;
}

/**
 * KBペイロード（種別別）
 */
export type KBPayload =
  | PersonaPayload
  | BannerExtractionPayload
  | MarketInsightPayload
  | AggregationReportPayload
  | StrategyOptionPayload
  | PlanPayload;

/**
 * Personaペイロード
 */
export interface PersonaPayload {
  type: 'persona';
  persona_id: string;
  hypothesis_label: string; // 固定文言: "仮説ペルソナ"
  summary: string; // 1行要約
  story: string; // 背景ストーリー短文
  proxy_structure: {
    whose_problem: string; // 誰の課題
    who_solves: string; // 誰が解決
    how: string; // どう解決
  };
  jtbd: {
    functional: string[];
    emotional: string[];
    social: string[];
  };
  decision_criteria_top5: Array<{
    criterion: string;
    weight: number; // 0-1
  }>;
  journey: {
    trigger: string;
    consider: string;
    purchase: string;
    continue: string;
  };
  pitfalls: string[]; // 誤解しやすいポイント
  tactics: {
    message?: string[];
    route?: string[];
    offer?: string[];
  };
  evidence: {
    quotes: Array<{
      text: string;
      respondent_id: string;
      category: string;
    }>;
    count: number;
  };
  evidence_quotes: Array<{
    text: string;
    source_file: string;
    line_number?: number;
    line_range?: { start: number; end: number };
    statement_id?: string;
    category: string;
  }>;
}

/**
 * Banner Extractionペイロード
 */
export interface BannerExtractionPayload {
  type: 'banner';
  banner_id: string;
  extraction: any; // Extraction型（バナー分析アプリ用）
  image_url?: string; // base64またはURL
}

/**
 * Market Insightペイロード
 */
export interface MarketInsightPayload {
  type: 'insight';
  insight_id: string;
  persona_premise: {
    assumption: string;
    evidence: string;
  };
  observed_facts: {
    choice: string;
    evidence: string;
    bbox_references?: Array<{ banner_id: string; bbox: BBoxCoord }>;
  };
  rationale_hypothesis: string;
  market_constraints: string;
  planning_hooks: Array<{
    question: string;
    context: string;
    related_persona_ids?: string[];
  }>;
  evidence_links: {
    target_banner_ids: string[];
    target_bboxes?: Array<{ banner_id: string; bbox: BBoxCoord }>;
  };
  category: 'high_frequency' | 'low_frequency' | 'combination' | 'brand_difference';
  persona_relevance?: Array<{
    persona_id: string;
    relevance_level: 'high' | 'medium' | 'low' | 'unknown';
    reasoning: string;
  }>;
}

/**
 * Aggregation Reportペイロード
 */
export interface AggregationReportPayload {
  type: 'report';
  report_id: string;
  aggregation: any; // Aggregation型（バナー分析アプリ用）
  total_banners: number;
}

/**
 * Strategy Optionペイロード
 */
export interface StrategyOptionPayload {
  type: 'option';
  option_id: string;
  option_type: 'A' | 'B' | 'C';
  title: string;
  description: string;
  benefits: string[];
  risks: string[];
  rationality_assessment: {
    level: 'high' | 'medium' | 'low' | 'unknown';
    reasoning: string;
  };
  risk_assessment: {
    level: 'high' | 'medium' | 'low' | 'unknown';
    reasoning: string;
  };
  persona_risk_assessment: Array<{
    persona_id: string;
    risk_level: 'low' | 'medium' | 'high';
    reasoning: string;
    persona_overlay: 'high' | 'medium' | 'low' | 'unknown';
  }>;
  related_insight_ids: string[];
}

/**
 * Plan (LP Rough)ペイロード
 */
export interface PlanPayload {
  type: 'plan';
  plan_id: string;
  strategy_option: 'A' | 'B' | 'C';
  sections: Array<{
    section_name: string;
    order: number;
    purpose: string;
    include: string[];
    evidence_links: {
      related_insights?: string[];
      related_persona_ids?: string[];
      related_quotes?: string[];
    };
  }>;
  cautions: Array<{
    point: string;
    condition: string;
    evidence_links: {
      related_insights?: string[];
      related_persona_ids?: string[];
    };
  }>;
  planning_hooks: Array<{
    question: string;
    context: string;
    related_section_order?: number;
  }>;
}

/**
 * ActiveContext（他アプリ連携用）
 */
export interface ActiveContext {
  persona_ids?: string[];
  insight_ids?: string[];
  banner_ids?: string[];
  report_id?: string;
  option_id?: string;
  plan_id?: string;
  updated_at: string;
}
