import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BackButton from '../components/BackButton';
import LeadForm from '../components/LeadForm';

interface GrantPageProps {
  lang: 'en' | 'zh';
}

const faqs = {
  en: [
    {
      q: 'Can I combine multiple scholarships?',
      a: 'Scholarships are generally not stackable. However, the highest applicable award will automatically be applied to your offer. Our admissions team will identify the best combination for your profile during your eligibility review.',
    },
    {
      q: 'When will I know if I have been awarded a scholarship?',
      a: 'Scholarship decisions are communicated alongside your admission offer, typically within 5–10 business days of submitting a complete application. Early applicants receive priority consideration.',
    },
    {
      q: 'Do I need to repay the scholarship if I withdraw from the programme?',
      a: 'Scholarships are applied as tuition fee reductions and are non-transferable. If you withdraw before completing the programme, the scholarship does not need to be repaid, but is forfeited for future intakes.',
    },
    {
      q: 'Is there a minimum GPA or test score required?',
      a: 'There is no minimum GPA or GMAT requirement. Merit scholarships are assessed holistically — academic record, professional trajectory, leadership impact, and your personal statement all contribute to the decision.',
    },
    {
      q: 'Can my employer sponsor my tuition and apply for a corporate rate?',
      a: 'Yes. We offer corporate partnership arrangements for organisations enrolling two or more employees. Contact our admissions team at admissions@pickering.education to discuss a customised corporate scholarship package.',
    },
  ],
  zh: [
    {
      q: '我可以同时申请多项奖学金吗？',
      a: '奖学金通常不可叠加使用。但我们会自动为您匹配最高适用的奖项。在资格评估过程中，招生顾问将结合您的个人背景，为您确定最优方案。',
    },
    {
      q: '我何时能知道是否获得奖学金？',
      a: '奖学金决定将与录取通知书一同发出，通常在提交完整申请后 5 至 10 个工作日内。提前申请者享有优先审核资格。',
    },
    {
      q: '如果我中途退出课程，需要偿还奖学金吗？',
      a: '奖学金以学费减免形式发放，不可转让。若您在完成课程前退学，无需偿还奖学金，但该奖学金资格将不再保留用于未来入学批次。',
    },
    {
      q: '是否有最低 GPA 或考试成绩要求？',
      a: '我们不设最低 GPA 或 GMAT 要求。奖学金评审采用综合考量方式，包括学术背景、职业发展轨迹、领导力影响以及个人陈述，多维度评估您的申请。',
    },
    {
      q: '我的雇主可以赞助我的学费并申请企业优惠吗？',
      a: '可以。我们为同时有两名或以上员工入读的企业提供合作伙伴计划。请通过 admissions@pickering.education 联系我们的招生团队，获取定制企业奖学金方案。',
    },
  ],
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-border/10 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full p-6 text-left flex justify-between items-center group gap-4"
      >
        <span className="font-bold text-foreground group-hover:text-primary transition-colors text-sm leading-snug">{q}</span>
        <ChevronDown size={18} className={`text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-muted-foreground font-medium leading-relaxed border-t border-border/5 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GrantPage({ lang }: GrantPageProps) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const faqList = faqs[lang];

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-background pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-10 h-52 sm:h-64 md:h-80 overflow-hidden rounded-2xl"
          >
            <img
              src="/pgc_mba_landing_images/scholarship-women.webp"
              alt={lang === 'en' ? 'Scholarship applicant' : '奖学金申请者'}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
            <div className="absolute left-6 bottom-6">
              <p className="text-xs font-black text-white uppercase tracking-widest">
                {lang === 'en' ? 'Scholarship & Financial Support' : '奖学金与费用支持'}
              </p>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-left">
            <h1 className="section-heading mb-4">
              {lang === 'en' ? 'Scholarship Programme' : '奖学金计划'}
            </h1>
            <p className="text-base text-muted-foreground font-medium leading-relaxed max-w-2xl">
              {lang === 'en'
                ? 'Pickering Global Campus is committed to making world-class MBA education accessible. Up to 50% of programme fees may be covered through our merit-based, diversity, early-bird, and corporate scholarship awards.'
                : 'Pickering Global Campus 致力于让世界一流的 MBA 教育触手可及。通过学术卓越奖学金、多元化奖学金、提前申请奖学金及企业合作奖学金，最高可覆盖 50% 的课程费用。'}
            </p>
          </motion.div>

          {/* Scholarship cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14"
          >
            {[
              {
                title: lang === 'en' ? 'Merit Scholarship' : '学术卓越奖学金',
                amount: lang === 'en' ? 'Up to 50%' : '最高 50%',
                desc: lang === 'en'
                  ? 'Awarded to candidates with strong academic backgrounds or demonstrated professional leadership. Assessed holistically — no GMAT required.'
                  : '授予具有优秀学术背景或卓越职业领导力的申请者，采用综合评估，无需 GMAT 成绩。',
                items: lang === 'en'
                  ? ['Academic distinction', 'Leadership track record', 'Professional impact']
                  : ['学术优秀背景', '职业领导力记录', '行业影响力'],
              },
              {
                title: lang === 'en' ? 'Diversity Scholarship' : '多元化奖学金',
                amount: lang === 'en' ? 'Up to 40%' : '最高 40%',
                desc: lang === 'en'
                  ? 'Supporting professionals from underrepresented geographic regions, industries, or demographic backgrounds to ensure a globally diverse cohort.'
                  : '支持来自欠代表性地区、行业或背景的专业人士，确保课程学员具备全球多样性。',
                items: lang === 'en'
                  ? ['Geographic diversity', 'Women in leadership', 'Emerging-market professionals']
                  : ['地域多样性', '女性领导力', '新兴市场从业者'],
              },
              {
                title: lang === 'en' ? 'Early-Bird Award' : '提前申请奖学金',
                amount: lang === 'en' ? 'Up to 30%' : '最高 30%',
                desc: lang === 'en'
                  ? 'Reserved for candidates who complete their application before the intake deadline. Limited places per cohort — apply early to secure your award.'
                  : '专为在招生截止日期前完成申请的候选人而设，每批次名额有限，尽早申请以锁定资格。',
                items: lang === 'en'
                  ? ['Apply before 19 May 2026', 'Limited cohort seats', 'Fast-track decision']
                  : ['2026 年 5 月 19 日前申请', '每批次名额有限', '快速审核决定'],
              },
              {
                title: lang === 'en' ? 'Corporate Sponsorship' : '企业合作奖学金',
                amount: lang === 'en' ? 'Custom rate' : '定制优惠',
                desc: lang === 'en'
                  ? 'Organisations sponsoring two or more employees receive negotiated group rates, dedicated account management, and co-branded CPD certification.'
                  : '赞助两名或以上员工的企业可享受团体优惠费率、专属客户经理服务及联合认证继续教育证书。',
                items: lang === 'en'
                  ? ['Group enrolment discount', 'Dedicated account manager', 'Co-branded CPD certificate']
                  : ['团体入学折扣', '专属客户经理', '联合认证 CPD 证书'],
              },
            ].map((card, i) => (
              <div key={i} className="bg-white p-7 rounded-2xl border border-border/10 hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <h3 className="text-lg font-black text-foreground leading-tight">{card.title}</h3>
                  <span className="shrink-0 text-xs font-black text-primary bg-primary/8 px-2.5 py-1 rounded-full whitespace-nowrap">{card.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-5">{card.desc}</p>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex gap-2.5 text-xs text-muted-foreground">
                      <span className="text-primary font-black mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-primary/[0.05] rounded-2xl p-7 md:p-10 mb-14 border border-primary/10"
          >
            <h2 className="text-xl font-black text-foreground mb-5">
              {lang === 'en' ? 'Eligibility Requirements' : '申请资格要求'}
            </h2>
            <ul className="space-y-3">
              {(lang === 'en'
                ? [
                    'Bachelor\'s degree from an accredited institution (any discipline)',
                    'Minimum 2 years of full-time professional experience',
                    'Proficiency in English (spoken and written)',
                    'Completed online application and personal statement',
                    'Brief admissions interview with the Pickering team',
                  ]
                : [
                    '持有认可院校颁发的学士学位（不限专业）',
                    '至少 2 年全职工作经验',
                    '具备英语读写及口语能力',
                    '完成在线申请表及个人陈述',
                    '参加 Pickering 招生团队的简短面试',
                  ]
              ).map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground font-medium">
                  <span className="text-primary font-black shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Application form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-14"
          >
            <div className="bg-white rounded-2xl shadow-xl shadow-primary/5 overflow-hidden">
              <div className="p-8 md:p-10 border-b border-border/5">
                <h2 className="section-heading mb-3">
                  {lang === 'en' ? 'Apply for a Scholarship' : '立即申请奖学金'}
                </h2>
                <div className="w-10 h-1 bg-primary rounded-full mb-4" />
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {lang === 'en'
                    ? 'Submit your details below. Our admissions team will assess your scholarship eligibility and contact you within 3 business days.'
                    : '请在下方填写您的信息。招生团队将评估您的奖学金资格，并在 3 个工作日内与您联系。'}
                </p>
              </div>
              <div className="p-4 md:p-6">
                <LeadForm lang={lang} />
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <h2 className="text-2xl font-black text-foreground mb-6">
              {lang === 'en' ? 'Frequently Asked Questions' : '常见问题'}
            </h2>
            <div className="space-y-3">
              {faqList.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
