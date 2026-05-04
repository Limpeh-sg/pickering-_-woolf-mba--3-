// MVP版本：招生转化决策树数据
// 包含4个核心路径：申请资格、费用、学历认可、申请材料

export interface DecisionOption {
  value: string;
  label: { en: string; zh: string };
  score: number;
  tags: string[];
  nextLevel?: string;
}

export interface DecisionLevel {
  level: 1 | 2 | 3 | 4 | 5;
  question: { en: string; zh: string };
  options: DecisionOption[];
}

// 第1级：入口分流（MVP版本：10个选项）
export const level1: DecisionLevel = {
  level: 1,
  question: {
    en: "How can I help you today?",
    zh: "请问有什么可以帮到您？"
  },
  options: [
    {
      value: "career-goal",
      label: { en: "1. Is this MBA right for my career goals?", zh: "1. 判断这个MBA是否适合我的职业目标" },
      score: 10,
      tags: ["career-goal"],
      nextLevel: "career"
    },
    {
      value: "eligibility",
      label: { en: "2. Check if I'm eligible to apply", zh: "2. 确认我的背景是否符合申请资格" },
      score: 15,
      tags: ["eligibility-check"],
      nextLevel: "eligibility"
    },
    {
      value: "recognition",
      label: { en: "3. Understand degree recognition & Woolf", zh: "3. 了解学历认可与Woolf" },
      score: 12,
      tags: ["recognition-concern"],
      nextLevel: "recognition"
    },
    {
      value: "fees",
      label: { en: "4. Calculate fees, instalments & scholarships", zh: "4. 计算学费、分期和奖学金" },
      score: 12,
      tags: ["fee-interest"],
      nextLevel: "fees"
    },
    {
      value: "study-work",
      label: { en: "5. Can I study while working?", zh: "5. 确认我能否边工作边读" },
      score: 10,
      tags: ["working-professional"],
      nextLevel: "study"
    },
    {
      value: "materials",
      label: { en: "6. Prepare application materials", zh: "6. 准备申请材料" },
      score: 18,
      tags: ["application-materials"],
      nextLevel: "materials"
    },
    {
      value: "intake",
      label: { en: "7. Find intake dates & deadlines", zh: "7. 找到合适入学批次和截止日期" },
      score: 10,
      tags: ["intake-interest"],
      nextLevel: "intake"
    },
    {
      value: "family-company",
      label: { en: "8. Get info for family/company", zh: "8. 给家人/公司一个简单说明" },
      score: 8,
      tags: ["family-decision"],
      nextLevel: "family"
    },
    {
      value: "brochure",
      label: { en: "9. Request brochure or summary", zh: "9. 索取手册或课程摘要" },
      score: 5,
      tags: ["brochure-request"],
      nextLevel: "brochure"
    },
    {
      value: "compare",
      label: { en: "10. I'm comparing other MBAs", zh: "10. 我正在对比其他MBA" },
      score: 8,
      tags: ["comparing-mba"],
      nextLevel: "compare"
    }
  ]
};

// 第2级：需求诊断（MVP版本：4个核心路径）

// A. 申请资格路径
export const level2_eligibility: DecisionLevel = {
  level: 2,
  question: {
    en: "Which best describes your background?",
    zh: "以下哪项最符合您的背景？"
  },
  options: [
    {
      value: "bachelor-any",
      label: { en: "1. Bachelor's degree, any major", zh: "1. 本科，不限专业" },
      score: 15,
      tags: ["standard-admission"]
    },
    {
      value: "bachelor-non-english",
      label: { en: "2. Bachelor's but not English-taught", zh: "2. 本科但不是英文授课" },
      score: 12,
      tags: ["english-check"]
    },
    {
      value: "diploma-experience",
      label: { en: "3. 3-year diploma + business experience", zh: "3. 3年制大专+商业工作经验" },
      score: 12,
      tags: ["rpl-route"]
    },
    {
      value: "7y-experience",
      label: { en: "4. 7+ years relevant business experience", zh: "4. 7年以上相关商业经验" },
      score: 15,
      tags: ["performance-based-admission"]
    },
    {
      value: "12y-no-degree",
      label: { en: "5. 12+ years experience, no bachelor's", zh: "5. 12年以上高度相关经验但无本科" },
      score: 15,
      tags: ["performance-based-admission"]
    },
    {
      value: "unsure",
      label: { en: "6. Not sure how my background qualifies", zh: "6. 不确定我的背景怎么算" },
      score: 10,
      tags: ["needs-review"]
    }
  ]
};

// B. 费用路径
export const level2_fees: DecisionLevel = {
  level: 2,
  question: {
    en: "What would you like to know about fees?",
    zh: "您想了解费用的哪方面？"
  },
  options: [
    {
      value: "total-fee",
      label: { en: "1. Total programme fee", zh: "1. 只想知道总学费标准" },
      score: 10,
      tags: ["fee-sensitive"]
    },
    {
      value: "4-instalments",
      label: { en: "2. 4-instalment payment plan", zh: "2. 4期付款" },
      score: 12,
      tags: ["instalment-interest"]
    },
    {
      value: "monthly",
      label: { en: "3. Monthly payment option", zh: "3. 月付方式" },
      score: 12,
      tags: ["monthly-payment"]
    },
    {
      value: "scholarship",
      label: { en: "4. Scholarship opportunities", zh: "4. 奖学金可能性与类别" },
      score: 15,
      tags: ["scholarship-interest"]
    },
    {
      value: "residency",
      label: { en: "5. Singapore residency week cost", zh: "5. 可选新加坡研学周费用" },
      score: 8,
      tags: ["residency-interest"]
    },
    {
      value: "fee-statement",
      label: { en: "6. Fee breakdown for family/company", zh: "6. 需要给家人/公司一份费用说明" },
      score: 10,
      tags: ["family-decision", "fee-sensitive"]
    }
  ]
};

// C. 学历认可路径
export const level2_recognition: DecisionLevel = {
  level: 2,
  question: {
    en: "What would you like to understand about recognition?",
    zh: "您想了解学历认可的哪方面？"
  },
  options: [
    {
      value: "woolf-accredited",
      label: { en: "1. Is Woolf an accredited institution?", zh: "1. Woolf是否是受认可的高等教育机构？" },
      score: 12,
      tags: ["woolf-question"]
    },
    {
      value: "credential-evaluation",
      label: { en: "2. Can I get credential evaluation in US/Canada?", zh: "2. 这个学位能否在美国/加拿大做学历评估？" },
      score: 12,
      tags: ["credential-evaluation"]
    },
    {
      value: "ects-eqf",
      label: { en: "3. What are ECTS, EQF, Europass?", zh: "3. ECTS、EQF、Europass是什么？" },
      score: 10,
      tags: ["recognition-concern"]
    },
    {
      value: "employer",
      label: { en: "4. Will employers understand this MBA?", zh: "4. 雇主是否容易理解这个MBA？" },
      score: 12,
      tags: ["employer-concern"]
    },
    {
      value: "further-study",
      label: { en: "5. Can I use it for further study/mobility?", zh: "5. 是否有助于继续深造或职业流动？" },
      score: 10,
      tags: ["recognition-concern"]
    },
    {
      value: "formal-statement",
      label: { en: "6. I need a formal statement for family/company", zh: "6. 我需要给家人/公司一份谨慎说明" },
      score: 10,
      tags: ["family-decision", "recognition-concern"]
    }
  ]
};

// D. 申请材料路径
export const level2_materials: DecisionLevel = {
  level: 2,
  question: {
    en: "Where are you with application materials?",
    zh: "您的申请材料准备情况？"
  },
  options: [
    {
      value: "ready",
      label: { en: "1. Degree, transcript, resume, passport ready", zh: "1. 学位、成绩单、简历、护照基本齐了" },
      score: 30,
      tags: ["application-ready", "high-intent"]
    },
    {
      value: "need-resume",
      label: { en: "2. Have documents, need help with resume", zh: "2. 有学位/成绩单，但简历需要整理" },
      score: 20,
      tags: ["resume-help"]
    },
    {
      value: "english-test",
      label: { en: "3. May need English test", zh: "3. 可能需要英文测试或入学英文测试" },
      score: 15,
      tags: ["english-test-needed"]
    },
    {
      value: "document-review",
      label: { en: "4. Need to confirm if my documents are acceptable", zh: "4. 需要确认材料是否可接受" },
      score: 15,
      tags: ["document-review"]
    },
    {
      value: "early-stage",
      label: { en: "5. Just gathering information for now", zh: "5. 目前只是先收集信息" },
      score: 5,
      tags: ["early-stage"]
    }
  ]
};

// 第3级：细节采集（固定10个选项）
export const level3: DecisionLevel = {
  level: 3,
  question: {
    en: "What would help you most right now?",
    zh: "现在什么对您最有帮助？"
  },
  options: [
    {
      value: "advisor-review",
      label: { en: "1. Have advisor review my background", zh: "1. 希望招生顾问审核我的背景" },
      score: 20,
      tags: ["advisor-review"]
    },
    {
      value: "fee-estimate",
      label: { en: "2. Get personalized fee/scholarship estimate", zh: "2. 希望获得个性化费用/奖学金预估" },
      score: 18,
      tags: ["fee-estimate"]
    },
    {
      value: "intake-confirm",
      label: { en: "3. Confirm nearest intake & deadline", zh: "3. 希望确认最近入学批次和截止日期" },
      score: 15,
      tags: ["intake-confirm"]
    },
    {
      value: "written-statement",
      label: { en: "4. Get written statement to share", zh: "4. 希望获得可转发的书面说明" },
      score: 12,
      tags: ["written-statement"]
    },
    {
      value: "talk-first",
      label: { en: "5. Talk to advisor before applying", zh: "5. 希望申请前先和顾问聊" },
      score: 20,
      tags: ["consultation-request"]
    },
    {
      value: "download-first",
      label: { en: "6. Download materials first", zh: "6. 我想先下载资料" },
      score: 5,
      tags: ["brochure-request"]
    },
    {
      value: "ready-soon",
      label: { en: "7. I'm preparing to apply soon", zh: "7. 我准备近期申请" },
      score: 24,
      tags: ["high-intent", "ready-soon"]
    },
    {
      value: "still-comparing",
      label: { en: "8. Still comparing other options", zh: "8. 我还在对比其他选择" },
      score: 8,
      tags: ["comparing"]
    },
    {
      value: "help-explain",
      label: { en: "9. Need help explaining to family/company", zh: "9. 需要有人帮我跟家人/公司解释" },
      score: 12,
      tags: ["family-decision"]
    },
    {
      value: "advisor-match",
      label: { en: "10. Help me choose the best path", zh: "10. 需要顾问帮我选择最合适路径" },
      score: 15,
      tags: ["needs-advisor"]
    }
  ]
};

// 第4级：跟进方式（固定10个选项）
export const level4: DecisionLevel = {
  level: 4,
  question: {
    en: "How would you prefer to be contacted?",
    zh: "您希望如何被联系？"
  },
  options: [
    {
      value: "whatsapp-summary",
      label: { en: "1. WhatsApp summary", zh: "1. WhatsApp发送摘要" },
      score: 20,
      tags: ["whatsapp-preferred"]
    },
    {
      value: "email-details",
      label: { en: "2. Email detailed info", zh: "2. Email发送详情" },
      score: 15,
      tags: ["email-preferred"]
    },
    {
      value: "phone-call",
      label: { en: "3. 10-15 min phone call", zh: "3. 安排10-15分钟电话" },
      score: 24,
      tags: ["call-request", "high-intent"]
    },
    {
      value: "online-consult",
      label: { en: "4. Online consultation", zh: "4. 线上咨询" },
      score: 24,
      tags: ["consultation-request", "high-intent"]
    },
    {
      value: "chinese-advisor",
      label: { en: "5. Chinese-speaking advisor", zh: "5. 需要中文顾问" },
      score: 15,
      tags: ["chinese-advisor"]
    },
    {
      value: "english-advisor",
      label: { en: "6. English-speaking advisor", zh: "6. 需要英文顾问" },
      score: 15,
      tags: ["english-advisor"]
    },
    {
      value: "brochure-no-call",
      label: { en: "7. Send brochure, no call yet", zh: "7. 先发手册，暂时不电话" },
      score: 5,
      tags: ["no-call-yet"]
    },
    {
      value: "ready-apply",
      label: { en: "8. I'm ready to start application", zh: "8. 我准备开始申请" },
      score: 30,
      tags: ["application-ready", "high-intent"]
    },
    {
      value: "scholarship-eval",
      label: { en: "9. Evaluate scholarship match", zh: "9. 请顾问评估奖学金匹配" },
      score: 18,
      tags: ["scholarship-interest"]
    },
    {
      value: "recognition-explain",
      label: { en: "10. Explain degree recognition carefully", zh: "10. 请顾问谨慎解释学历认可" },
      score: 15,
      tags: ["recognition-concern"]
    }
  ]
};

// 路径映射
export const level2Paths: Record<string, DecisionLevel> = {
  eligibility: level2_eligibility,
  fees: level2_fees,
  recognition: level2_recognition,
  materials: level2_materials,
  // 其他路径可以后续添加
  career: level2_eligibility, // 临时映射
  study: level2_eligibility, // 临时映射
  intake: level2_eligibility, // 临时映射
  family: level2_recognition, // 临时映射
  brochure: level2_fees, // 临时映射
  compare: level2_recognition, // 临时映射
};

// 评分等级
export function getLeadLevel(score: number): 'Cold Lead' | 'Warm Lead' | 'Hot Lead' {
  if (score >= 70) return 'Hot Lead';
  if (score >= 40) return 'Warm Lead';
  return 'Cold Lead';
}

// 生成顾问建议
export function generateAdvisorAction(
  score: number,
  tags: string[],
  answers: Record<string, string>,
  lang: 'en' | 'zh'
): string {
  const level = getLeadLevel(score);
  const hasWhatsApp = tags.includes('whatsapp-preferred');
  const hasCall = tags.includes('call-request');
  const isReady = tags.includes('application-ready');
  const needsScholarship = tags.includes('scholarship-interest');
  const needsRecognition = tags.includes('recognition-concern');

  if (lang === 'zh') {
    if (level === 'Hot Lead') {
      if (isReady) {
        return '立即联系（30分钟内）。用户已准备申请，优先通过WhatsApp或电话跟进，协助提交申请材料并确认入学批次。';
      }
      if (hasCall) {
        return '24小时内安排电话咨询。用户要求通话，准备好背景审核和个性化建议。';
      }
      return '24小时内通过WhatsApp跟进，发送定制资料并邀请预约咨询。';
    }
    
    if (level === 'Warm Lead') {
      if (needsScholarship) {
        return '24小时内发送费用拆分和奖学金说明，3天后跟进确认是否需要进一步咨询。';
      }
      if (needsRecognition) {
        return '24小时内发送学历认可谨慎说明（包含Woolf、MFHEA、ECTS说明），适合转发给家人或公司。';
      }
      return '24小时内发送定制资料，3天后轻度跟进，邀请参加线上说明会。';
    }
    
    return '加入nurture list，发送手册，7天后轻度跟进，加入再营销广告池。';
  }

  // English version
  if (level === 'Hot Lead') {
    if (isReady) {
      return 'Contact immediately (within 30 min). Applicant is ready - follow up via WhatsApp or phone to assist with application submission and intake confirmation.';
    }
    if (hasCall) {
      return 'Schedule phone consultation within 24 hours. Prepare background review and personalized recommendations.';
    }
    return 'Follow up within 24 hours via WhatsApp, send customized materials and invite consultation booking.';
  }
  
  if (level === 'Warm Lead') {
    if (needsScholarship) {
      return 'Send fee breakdown and scholarship details within 24 hours, follow up in 3 days to confirm if further consultation needed.';
    }
    if (needsRecognition) {
      return 'Send careful recognition statement within 24 hours (including Woolf, MFHEA, ECTS explanation), suitable for sharing with family/company.';
    }
    return 'Send customized materials within 24 hours, light follow-up in 3 days, invite to online info session.';
  }
  
  return 'Add to nurture list, send brochure, light follow-up in 7 days, add to retargeting pool.';
}
