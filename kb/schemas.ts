/**
 * 統合ナレッジベース（KB）zodスキーマ定義
 * バリデーション用
 */

import { z } from 'zod';

/**
 * BBox座標系スキーマ
 */
export const bboxCoordSchema = z.object({
  x: z.number().min(0),
  y: z.number().min(0),
  w: z.number().min(0),
  h: z.number().min(0),
  coord_type: z.enum(['normalized', 'pixel']),
});

/**
 * Personaペイロードスキーマ
 */
export const personaPayloadSchema = z.object({
  type: z.literal('persona'),
  persona_id: z.string().min(1),
  hypothesis_label: z.string(),
  summary: z.string().min(1),
  story: z.string().min(1),
  proxy_structure: z.object({
    whose_problem: z.string(),
    who_solves: z.string(),
    how: z.string(),
  }),
  jtbd: z.object({
    functional: z.array(z.string()),
    emotional: z.array(z.string()),
    social: z.array(z.string()),
  }),
  decision_criteria_top5: z.array(
    z.object({
      criterion: z.string(),
      weight: z.number().min(0).max(1),
    })
  ),
  journey: z.object({
    trigger: z.string(),
    consider: z.string(),
    purchase: z.string(),
    continue: z.string(),
  }),
  pitfalls: z.array(z.string()),
  tactics: z.object({
    message: z.array(z.string()).optional(),
    route: z.array(z.string()).optional(),
    offer: z.array(z.string()).optional(),
  }),
  evidence: z.object({
    quotes: z.array(
      z.object({
        text: z.string(),
        respondent_id: z.string(),
        category: z.string(),
      })
    ),
    count: z.number().int().min(0),
  }),
  evidence_quotes: z.array(
    z.object({
      text: z.string(),
      source_file: z.string(),
      line_number: z.number().int().optional(),
      line_range: z
        .object({
          start: z.number().int(),
          end: z.number().int(),
        })
        .optional(),
      statement_id: z.string().optional(),
      category: z.string(),
    })
  ),
});

/**
 * Banner Extractionペイロードスキーマ（簡易版）
 */
export const bannerExtractionPayloadSchema = z.object({
  type: z.literal('banner'),
  banner_id: z.string().min(1),
  extraction: z.any(),
  image_url: z.string().optional(),
});

/**
 * Market Insightペイロードスキーマ
 */
export const marketInsightPayloadSchema = z.object({
  type: z.literal('insight'),
  insight_id: z.string().min(1),
  persona_premise: z.object({
    assumption: z.string().min(1),
    evidence: z.string().min(1),
  }),
  observed_facts: z.object({
    choice: z.string().min(1),
    evidence: z.string().min(1),
    bbox_references: z
      .array(
        z.object({
          banner_id: z.string(),
          bbox: bboxCoordSchema,
        })
      )
      .optional(),
  }),
  rationale_hypothesis: z.string().min(1),
  market_constraints: z.string().min(1),
  planning_hooks: z.array(
    z.object({
      question: z.string().min(1),
      context: z.string(),
      related_persona_ids: z.array(z.string()).optional(),
    })
  ),
  evidence_links: z.object({
    target_banner_ids: z.array(z.string()).min(1, '根拠リンク（target_banner_ids）は必須です'),
    target_bboxes: z
      .array(
        z.object({
          banner_id: z.string(),
          bbox: bboxCoordSchema,
        })
      )
      .optional(),
  }),
  category: z.enum(['high_frequency', 'low_frequency', 'combination', 'brand_difference']),
  persona_relevance: z
    .array(
      z.object({
        persona_id: z.string(),
        relevance_level: z.enum(['high', 'medium', 'low', 'unknown']),
        reasoning: z.string(),
      })
    )
    .optional(),
});

/**
 * Aggregation Reportペイロードスキーマ（簡易版）
 */
export const aggregationReportPayloadSchema = z.object({
  type: z.literal('report'),
  report_id: z.string().min(1),
  aggregation: z.any(),
  total_banners: z.number().int().min(0),
});

/**
 * Strategy Optionペイロードスキーマ
 */
export const strategyOptionPayloadSchema = z.object({
  type: z.literal('option'),
  option_id: z.string().min(1),
  option_type: z.enum(['A', 'B', 'C']),
  title: z.string().min(1),
  description: z.string().min(1),
  benefits: z.array(z.string()),
  risks: z.array(z.string()),
  rationality_assessment: z.object({
    level: z.enum(['high', 'medium', 'low', 'unknown']),
    reasoning: z.string(),
  }),
  risk_assessment: z.object({
    level: z.enum(['high', 'medium', 'low', 'unknown']),
    reasoning: z.string(),
  }),
  persona_risk_assessment: z.array(
    z.object({
      persona_id: z.string(),
      risk_level: z.enum(['low', 'medium', 'high']),
      reasoning: z.string(),
      persona_overlay: z.enum(['high', 'medium', 'low', 'unknown']),
    })
  ),
  related_insight_ids: z.array(z.string()),
});

/**
 * Plan (LP Rough)ペイロードスキーマ
 */
export const planPayloadSchema = z.object({
  type: z.literal('plan'),
  plan_id: z.string().min(1),
  strategy_option: z.enum(['A', 'B', 'C']),
  sections: z.array(
    z.object({
      section_name: z.string().min(1),
      order: z.number().int().min(0),
      purpose: z.string().min(1),
      include: z.array(z.string()),
      evidence_links: z.object({
        related_insights: z.array(z.string()).optional(),
        related_persona_ids: z.array(z.string()).optional(),
        related_quotes: z.array(z.string()).optional(),
      }),
    })
  ),
  cautions: z.array(
    z.object({
      point: z.string().min(1),
      condition: z.string().min(1),
      evidence_links: z.object({
        related_insights: z.array(z.string()).optional(),
        related_persona_ids: z.array(z.string()).optional(),
      }),
    })
  ),
  planning_hooks: z.array(
    z.object({
      question: z.string().min(1),
      context: z.string(),
      related_section_order: z.number().int().optional(),
    })
  ),
});

/**
 * KBペイロード（discriminatedUnion）
 */
export const kbPayloadSchema = z.discriminatedUnion('type', [
  personaPayloadSchema,
  bannerExtractionPayloadSchema,
  marketInsightPayloadSchema,
  aggregationReportPayloadSchema,
  strategyOptionPayloadSchema,
  planPayloadSchema,
]);

/**
 * KB基本メタデータスキーマ
 */
export const kbBaseMetaSchema = z.object({
  kb_id: z.string().uuid(),
  type: z.enum(['persona', 'banner', 'insight', 'report', 'option', 'plan']),
  title: z.string().min(1),
  folder_path: z.string().min(1),
  tags: z.array(z.string()),
  owner_id: z.string().min(1),
  visibility: z.enum(['private', 'shared']),
  source_app: z.string().optional(),
  source_project_id: z.string().optional(),
  source_refs: z.array(z.string()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  deleted_at: z.string().datetime().optional(),
});

/**
 * KBアイテムスキーマ（メタ + ペイロード）
 */
export const kbItemSchema = kbBaseMetaSchema.extend({
  payload: kbPayloadSchema,
});

/**
 * KBアイテム作成リクエストスキーマ
 */
export const createKBItemRequestSchema = z.object({
  type: z.enum(['persona', 'banner', 'insight', 'report', 'option', 'plan']),
  title: z.string().min(1).optional(),
  folder_path: z.string().default('My Files'),
  tags: z.array(z.string()).default([]),
  owner_id: z.string().default('user'),
  visibility: z.enum(['private', 'shared']).default('private'),
  source_app: z.string().optional(),
  source_project_id: z.string().optional(),
  source_refs: z.array(z.string()).optional(),
  payload: kbPayloadSchema,
});

/**
 * KBアイテム更新リクエストスキーマ
 */
export const updateKBItemRequestSchema = z.object({
  title: z.string().min(1).optional(),
  folder_path: z.string().optional(),
  tags: z.array(z.string()).optional(),
  visibility: z.enum(['private', 'shared']).optional(),
});

/**
 * ActiveContextスキーマ
 */
export const activeContextSchema = z.object({
  persona_ids: z.array(z.string()).optional(),
  insight_ids: z.array(z.string()).optional(),
  banner_ids: z.array(z.string()).optional(),
  report_id: z.string().optional(),
  option_id: z.string().optional(),
  plan_id: z.string().optional(),
  updated_at: z.string().datetime(),
});
