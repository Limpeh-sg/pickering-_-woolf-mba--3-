// 招生转化决策树系统类型定义

export interface LeadData {
  // 基础信息
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  
  // 决策路径
  level1_intent?: string;
  level2_detail?: string;
  level3_concern?: string;
  level4_followup?: string;
  
  // 背景信息
  education?: string;
  experience?: string;
  intake?: string;
  note?: string;
}

export interface LeadScore {
  score: number;
  level: 'Cold Lead' | 'Warm Lead' | 'Hot Lead';
  tags: string[];
}

export interface ConversationStep {
  level: 1 | 2 | 3 | 4 | 5;
  question: string;
  options: Array<{
    value: string;
    label: string;
    score: number;
    tags: string[];
    nextPath?: string;
  }>;
}

export interface LarkPayload {
  programme: string;
  language: 'en' | 'zh';
  source: string;
  utm_source?: string;
  utm_campaign?: string;
  lead_score: number;
  lead_level: string;
  tags: string[];
  answers: {
    intent: string;
    background: string;
    detailNeed: string;
    followUp: string;
  };
  contact: {
    name: string;
    phone: string;
    email: string;
    country: string;
    note: string;
  };
  recommended_advisor_action: string;
  created_at: string;
}
