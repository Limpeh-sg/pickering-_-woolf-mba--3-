import { 
  BookOpen, 
  CheckCircle, 
  Calculator, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  FileText,
  UserCheck,
  TrendingUp,
  Clock,
  Globe,
  Award,
  HelpCircle,
  Stethoscope
} from 'lucide-react';

export const CONTENT = {
  en: {
    title: "PGC MBA Navigator",
    subtitle: "Your personal guide to the Online MBA",
    getStarted: "Find Your Path",
    close: "Close",
    back: "Back",
    next: "Next",
    submit: "Apply Now",
    bookConsultation: "Book Consultation",
    
    sections: {
      overview: {
        id: 'overview',
        title: "Programme Overview",
        icon: 'BookOpen',
        description: "Flexible, Online, Work-Compatible",
        content: [
          "100% Online Learning",
          "12–24 Months Completion",
          "No Examinations (Coursework-based)",
          "4 Intakes per Year",
          "Globally Recognised Credits (ECTS)"
        ]
      },
      eligibility: {
        id: 'eligibility',
        title: "Am I Eligible?",
        icon: 'CheckCircle',
        description: "Check your academic & work fit",
        questions: [
          {
            id: 'education',
            label: "Highest Education",
            options: [
              { label: "Bachelor's Degree", value: 'bachelor', score: 40 },
              { label: "Advanced Diploma", value: 'diploma', score: 20 },
              { label: "Substantial Work Exp (No Degree)", value: 'work_only', score: 30 },
              { label: "Other", value: 'other', score: 10 }
            ]
          },
          {
            id: 'english',
            label: "English Proficiency",
            options: [
              { label: "Studied in English", value: 'studied_en', score: 30 },
              { label: "IELTS 6.5+ or Equivalent", value: 'ielts', score: 30 },
              { label: "No formal test currently", value: 'none', score: 10 },
              { label: "Willing to take proficiency test", value: 'willing', score: 20 }
            ]
          },
          {
            id: 'experience',
            label: "Work Experience",
            options: [
              { label: "0–2 Years", value: 'junior', score: 10 },
              { label: "3–5 Years", value: 'mid', score: 30 },
              { label: "5–7 Years", value: 'senior', score: 50 },
              { label: "7+ Years / Management", value: 'expert', score: 60 }
            ]
          }
        ]
      },
      fees: {
        id: 'fees',
        title: "Fees & Payment",
        icon: 'Calculator',
        description: "Calculate your investment",
        currencies: [
          { code: 'SGD', symbol: 'S$', base: 9800, appFee: 200 },
          { code: 'USD', symbol: '$', base: 7800, appFee: 170 },
          { code: 'EUR', symbol: '€', base: 6800, appFee: 150 }
        ],
        plans: [
          { id: 'full', label: "Single Payment", discount: 0 },
          { id: 'inst', label: "4 Instalments", discount: 0 },
          { id: 'monthly', label: "Monthly Plan", surcharge: 0.10 }
        ],
        extra: { label: "Singapore Residency Week (Optional)", price: 1500 }
      },
      scholarship: {
        id: 'scholarship',
        title: "Scholarship Matcher",
        icon: 'Award',
        description: "Up to 50% funding available",
        categories: [
          { id: 'academic', title: "Academic Excellence", desc: "For high achievers" },
          { id: 'global', title: "Global Awareness", desc: "For international background" },
          { id: 'community', title: "Community Impact", desc: "For social contributors" },
          { id: 'women', title: "Women in Business", desc: "For aspiring female leaders" }
        ]
      },
      intake: {
        id: 'intake',
        title: "Intake Timeline",
        icon: 'Calendar',
        description: "Application deadlines & dates",
        dates: [
          { month: 'July 2026', commencement: '13 July 2026', deadline: '19 May 2026' },
          { month: 'October 2026', commencement: '13 Oct 2026', deadline: '18 Sep 2026' },
          { month: 'January 2027', commencement: '11 Jan 2027', deadline: '12 Dec 2026' }
        ]
      },
      recognition: {
        id: 'recognition',
        title: "Accreditation",
        icon: 'ShieldCheck',
        description: "Woolf & ECTS Framework",
        details: [
          "Licensed as a Higher Education Institution",
          "ECTS (European Credit Transfer System)",
          "US/Canada Credential Evaluation support",
          "Qualified for global employment"
        ]
      }
    },
    leadForm: {
      title: "Get Your Personalised Guide",
      desc: "Leave your details and we'll send the brochure & fee breakdown to you.",
      fields: {
        name: "Full Name",
        email: "Email Address",
        phone: "WhatsApp / Phone",
        intake: "Preferred Intake"
      }
    }
  },
  cn: {
    title: "PGC MBA 导航系统",
    subtitle: "您的个人在线 MBA 申请助手",
    getStarted: "开始探索",
    close: "关闭",
    back: "返回",
    next: "下一步",
    submit: "立即申请",
    bookConsultation: "预约咨询",
    
    sections: {
      overview: {
        id: 'overview',
        title: "课程总览",
        icon: 'BookOpen',
        description: "灵活在线，平衡工作与生活",
        content: [
          "100% 线上学习",
          "12–24 个月完成课程",
          "无考试（基于作业评估）",
          "每年 4 次入学机会",
          "全球认可学分 (ECTS)"
        ]
      },
      eligibility: {
        id: 'eligibility',
        title: "我符合条件吗？",
        icon: 'CheckCircle',
        description: "评估您的学历与背景",
        questions: [
          {
            id: 'education',
            label: "最高学历",
            options: [
              { label: "本科学位", value: 'bachelor', score: 40 },
              { label: "大专学历", value: 'diploma', score: 20 },
              { label: "多年工作经验（无学位）", value: 'work_only', score: 30 },
              { label: "其他", value: 'other', score: 10 }
            ]
          },
          {
            id: 'english',
            label: "英语水平",
            options: [
              { label: "英文授课背景", value: 'studied_en', score: 30 },
              { label: "雅思 6.5+ 或同等", value: 'ielts', score: 30 },
              { label: "目前无正式成绩", value: 'none', score: 10 },
              { label: "愿意参加英语水平测试", value: 'willing', score: 20 }
            ]
          },
          {
            id: 'experience',
            label: "工作经验",
            options: [
              { label: "0–2 年", value: 'junior', score: 10 },
              { label: "3–5 年", value: 'mid', score: 30 },
              { label: "5–7 年", value: 'senior', score: 50 },
              { label: "7 年以上 / 管理岗位", value: 'expert', score: 60 }
            ]
          }
        ]
      },
      fees: {
        id: 'fees',
        title: "学费计算",
        icon: 'Calculator',
        description: "估算您的学费投资",
        currencies: [
          { code: 'SGD', symbol: 'S$', base: 9800, appFee: 200 },
          { code: 'USD', symbol: '$', base: 7800, appFee: 170 },
          { code: 'EUR', symbol: '€', base: 6800, appFee: 150 }
        ],
        plans: [
          { id: 'full', label: "一次性支付", discount: 0 },
          { id: 'inst', label: "4 期分期", discount: 0 },
          { id: 'monthly', label: "按月支付", surcharge: 0.10 }
        ],
        extra: { label: "新加坡研学周 (可选)", price: 1500 }
      },
      scholarship: {
        id: 'scholarship',
        title: "奖学金匹配",
        icon: 'Award',
        description: "最高可获 50% 奖学金",
        categories: [
          { id: 'academic', title: "学术卓越奖", desc: "授予成绩优异者" },
          { id: 'global', title: "全球视野奖", desc: "授予具国际背景者" },
          { id: 'community', title: "社区贡献奖", desc: "授予社会贡献者" },
          { id: 'women', title: "女性商业领导力", desc: "授予女性领导者" }
        ]
      },
      intake: {
        id: 'intake',
        title: "入学批次",
        icon: 'Calendar',
        description: "申请截止日期及时间",
        dates: [
          { month: '2026年7月', commencement: '2026年7月13日', deadline: '2026年5月19日' },
          { month: '2026年10月', commencement: '2026年10月13日', deadline: '2026年9月18日' },
          { month: '2027年1月', commencement: '2027年1月11日', deadline: '2026年12月12日' }
        ]
      },
      recognition: {
        id: 'recognition',
        title: "学历认可度",
        icon: 'ShieldCheck',
        description: "Woolf 与 ECTS 学分体系",
        details: [
          "持有高等教育机构执照",
          "ECTS (欧洲学分转移系统)",
          "支持美国/加拿大认证评估",
          "全球雇主广泛认可"
        ]
      }
    },
    leadForm: {
      title: "获取您的个人申请指南",
      desc: "留下您的联系方式，我们将为您发送课程手册及费用明细。",
      fields: {
        name: "姓名",
        email: "电子邮箱",
        phone: "微信 / 手机号",
        intake: "计划入学时间"
      }
    }
  }
};
