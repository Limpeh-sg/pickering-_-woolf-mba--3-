import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Quote,
  ChevronDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import WhyChooseUs from '../components/WhyChooseUs';
import { content } from '../constants/content';

interface HomeProps {
  lang: 'en' | 'zh';
}

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const HERO_IMG = '/hero.webp';
const revealContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};
const revealItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutQuint }
  }
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeOutQuint } }
};

const HERO_STATS = [
  { kicker: { en: 'Global Recognition', zh: '全球认可' }, value: { en: '60+', zh: '60+' }, label: { en: 'Countries · EU Framework', zh: '国家 · 欧盟框架' } },
  { kicker: { en: 'Designed For Work', zh: '适合在职' }, value: { en: '100%', zh: '100%' }, label: { en: 'Online · 12–24 months', zh: '在线 · 12–24 个月' } },
  { kicker: { en: 'Scholarship', zh: '奖学金' }, value: { en: '50%', zh: '50%' }, label: { en: 'Max grant available', zh: '最高奖学金比例' } },
  { kicker: { en: 'Student Outcomes', zh: '学员成就' }, value: { en: '2,500+', zh: '2,500+' }, label: { en: 'Students · 60 Countries', zh: '名学员 · 60 个国家' } },
];

export default function Home({ lang }: HomeProps) {
  const t = content[lang];
  const [heroStatIndex, setHeroStatIndex] = useState(0);
  const [flashDismissed, setFlashDismissed] = useState(false);

  const scholarshipItems = (t as any).admissions.scholarships.items as Array<{ title: string; desc: string }>;
  const scholarshipCards = [
    { keyword: lang === 'en' ? 'Excellence' : '学术卓越', title: scholarshipItems[0]?.title, desc: scholarshipItems[0]?.desc, bgClass: 'bg-gradient-to-br from-primary/10 to-primary/5', accentClass: 'text-primary' },
    { keyword: lang === 'en' ? 'Global Reach' : '全球视野', title: scholarshipItems[1]?.title, desc: scholarshipItems[1]?.desc, bgClass: 'bg-gradient-to-br from-sky-100 to-blue-50', accentClass: 'text-sky-600' },
    { keyword: lang === 'en' ? 'Impact' : '社区影响', title: scholarshipItems[2]?.title, desc: scholarshipItems[2]?.desc, bgClass: 'bg-gradient-to-br from-emerald-50 to-teal-50', accentClass: 'text-emerald-600' },
    { keyword: lang === 'en' ? 'Women in Business' : '女性领导力', title: scholarshipItems[3]?.title, desc: scholarshipItems[3]?.desc, bgClass: 'bg-gradient-to-br from-pink-50 to-rose-50', accentClass: 'text-pink-500' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setHeroStatIndex(p => (p + 1) % HERO_STATS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-left">
      {/* Hero Section */}
      <section id="hero" className="relative bg-primary overflow-hidden text-white z-0">
        {/* Mobile background image with blue frosted glass overlay */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <img 
            src="/pgc_mba_landing_images/hero-overview.webp" 
            alt="" 
            className="w-full h-full object-cover blur-sm"
            loading="eager"
          />
          <div className="absolute inset-0 bg-primary/50 backdrop-blur-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[68vh] lg:min-h-[76vh]">

          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOutQuint }}
            className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-12 relative z-10"
          >
            <p className="text-secondary font-black text-xs mb-5 tracking-widest uppercase">
              {lang === 'en' ? '100% Online Programme' : '100% 在线课程'}
            </p>
            <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-black tracking-tighter leading-[0.93] mb-6">
              {lang === 'en' ? (
                <>Master of<br /><span className="text-secondary">Business</span><br />Administration</>
              ) : (
                <>工商管理<span className="text-secondary">硕士</span></>
              )}
            </h1>
            <p className="text-sm font-semibold text-white/70 mb-10 leading-relaxed">
              {lang === 'en'
                ? 'A one-year online MBA designed for Asia-facing career ambition.'
                : '1 年制在线工商管理硕士，加速职业进阶，扎根亚洲，全球认可。'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/apply" className="cta-button bg-white text-primary hover:bg-secondary">
                {lang === 'en' ? 'Apply Now' : '立即申请'}
              </Link>
              <Link to="/brochure" className="cta-button border-2 border-white/30 text-white hover:bg-white/10">
                {lang === 'en' ? 'Download Brochure' : '下载手册'}
              </Link>
            </div>
          </motion.div>

          {/* Right: Photo panel with certification cards overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block overflow-hidden"
          >
            <img
              src="/pgc_mba_landing_images/hero-overview.webp"
              alt="Pickering Global Campus"
              className="absolute inset-0 w-full h-full object-cover blur-sm"
              loading="eager"
              fetchPriority="high"
            />
            {/* Blue frosted glass overlay with backdrop blur */}
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md pointer-events-none" />
            
            {/* Certification cards - right side vertical stack, static */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
              {/* Card 1 - Malta */}
              <div 
                className="backdrop-blur-xl p-4 w-36 border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}
              >
                <div className="h-14 flex items-center justify-center mb-2">
                  <img src="/assets/Melta-DZ8e3MNc.png" alt="Malta MFHEA" className="h-12 w-auto object-contain" />
                </div>
                <p className="text-[10px] font-black text-black text-center leading-tight">
                  {lang === 'en' ? 'Malta MFHEA' : '马耳他高等教育'}
                </p>
              </div>

              {/* Card 2 - Lisbon Convention */}
              <div 
                className="backdrop-blur-xl p-4 w-36 border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}
              >
                <div className="h-14 flex items-center justify-center mb-2">
                  <img src="/assets/Lisbon Recognition Convention-DqjXrqhh.png" alt="Lisbon Convention" className="h-12 w-auto object-contain" />
                </div>
                <p className="text-[10px] font-black text-black text-center leading-tight">
                  {lang === 'en' ? 'Lisbon Convention' : '里斯本公约'}
                </p>
              </div>

              {/* Card 3 - ECTS */}
              <div 
                className="backdrop-blur-xl p-4 w-36 border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}
              >
                <div className="h-14 flex items-center justify-center mb-2">
                  <img src="/assets/ECTS-BB8xoJ9D.png" alt="ECTS" className="h-12 w-auto object-contain" />
                </div>
                <p className="text-[10px] font-black text-black text-center leading-tight">
                  Europass · ECTS
                </p>
              </div>

              {/* Card 4 - AACSB */}
              <div 
                className="backdrop-blur-xl p-4 w-36 border border-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}
              >
                <div className="h-14 flex items-center justify-center mb-2">
                  <img src="/assets/AACSB-HRiRaVrV.png" alt="AACSB" className="h-12 w-auto object-contain" />
                </div>
                <p className="text-[10px] font-black text-black text-center leading-tight">
                  AACSB
                </p>
              </div>
            </div>
            
            {/* Main stat display - center left */}
            <div className="absolute inset-0 flex flex-col justify-center px-14 xl:px-20 z-10 max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroStatIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease: easeOutQuint }}
                >
                  <p className="text-[10px] font-black text-secondary tracking-[0.3em] uppercase mb-4">
                    {HERO_STATS[heroStatIndex].kicker[lang]}
                  </p>
                  <p className="text-6xl xl:text-7xl font-black text-white leading-none tracking-tighter mb-3">
                    {HERO_STATS[heroStatIndex].value[lang]}
                  </p>
                  <p className="text-sm font-bold text-white/80 tracking-wide mb-10">
                    {HERO_STATS[heroStatIndex].label[lang]}
                  </p>
                </motion.div>
              </AnimatePresence>
              <Link
                to="/consult"
                className="inline-flex items-center gap-2 text-xs font-black text-white border-b-2 border-secondary pb-1 hover:border-white transition-colors w-fit"
              >
                {lang === 'en' ? 'Check my eligibility' : '评估我的资格'} <ArrowRight size={14} />
              </Link>
            </div>
            
            {/* Dot indicators */}
            <div className="absolute bottom-6 left-14 xl:left-20 flex gap-2 z-10">
              {HERO_STATS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroStatIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === heroStatIndex ? 'w-6 bg-secondary' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile form — full layout, always visible below hero */}
      <section className="lg:hidden bg-white border-b border-border/10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="font-black text-foreground text-base tracking-tight mb-1">
            {lang === 'en' ? 'Find out if this MBA fits your next step.' : '了解这个 MBA 是否适合你的下一步。'}
          </p>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed mb-6">
            {lang === 'en' ? 'Advisor responds within 24 hours.' : '顾问 24 小时内回复。'}
          </p>
          <MiniLeadForm lang={lang} />
        </div>
      </section>

      {/* Desktop flash banner form — slides in after hero */}
      <AnimatePresence>
        {!flashDismissed && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.5, delay: 0.9, ease: easeOutQuint } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
            className="hidden lg:block bg-white border-b border-border/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5 flex items-center gap-8">
              <div className="shrink-0 min-w-[140px]">
                <p className="text-xs font-black text-primary mb-0.5">
                  {lang === 'en' ? 'Free Eligibility Check' : '免费资格评估'}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium">
                  {lang === 'en' ? 'Advisor responds in 24h' : '顾问 24 小时内回复'}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <MiniLeadForm lang={lang} compact />
              </div>
              <button
                onClick={() => setFlashDismissed(true)}
                className="shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <ProgrammeSectionNav lang={lang} />

      {/* Dynamic Numeric Stats Module */}
      <section className="bg-white py-12 md:py-16 border-b border-border/10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 lg:grid-cols-[3fr_1fr_1fr_2fr] gap-8 lg:gap-12"
          >
            {(t as any).stats.map((stat: any, i: number) => (
              <motion.div
                key={i}
                variants={revealItem}
                whileHover={{ y: -8 }}
                className="space-y-2 group text-left"
              >
                <p className="text-4xl md:text-5xl font-black text-primary tracking-tighter group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
                <div className="h-1 w-8 bg-secondary/30 rounded-full" />
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview Combined */}
      <section id="about" className="py-20 md:py-24 bg-white overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={revealItem} className="space-y-10 text-left">
              <div className="text-left">
                <p className="section-kicker mb-4">
                  {lang === 'en' ? 'About Pickering & Woolf' : '关于 Pickering 与 Woolf'}
                </p>
                <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter mb-6 leading-tight">
                  {lang === 'en' ? 'Built for Working Professionals' : '为在职人士设计'}
                </h2>
              </div>
              
              <div className="space-y-8">
                <div className="text-left">
                    <h4 className="text-xl font-black uppercase tracking-tight mb-2">
                       {lang === 'en' ? 'Global Perspective, Local Relevance' : '全球视野，本土关联'}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                       {lang === 'en' ? 'Most applicants are not looking for another certificate. They want a credible way to move into management, switch tracks, or prove they can lead across Asia-facing markets without pausing their lives.' : '多数申请者并不是单纯想多一张证书，而是希望用一个可信的学历与学习过程，打开管理晋升、职业转型或亚洲市场领导力的新机会，同时不打断现有工作与生活。'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                   <IconFeature title={lang === 'en' ? 'Study Around Work' : '围绕工作安排学习'} desc={lang === 'en' ? 'Keep your role while building your next credential.' : '保留现有岗位，同时积累下一阶段所需资历。'} />
                   <IconFeature title={lang === 'en' ? 'Lead With Evidence' : '用能力证明领导力'} desc={lang === 'en' ? 'Coursework turns business thinking into visible outputs.' : '通过课程作业把商业思考转化为可展示成果。'} />
                </div>
              </div>
            </motion.div>

            <motion.div variants={revealItem} className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-[4rem]" />
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl">
                <motion.img
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.35, ease: easeOutQuint }}
                  src="/pgc_mba_landing_images/hero-overview.webp" 
                  className="w-full transition-transform duration-700" 
                  alt="Overview" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Recognition */}
      <section id="recognition" className="py-24 bg-primary/[0.04] relative overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left mb-12">
            <p className="section-kicker mb-3">
              {lang === 'en' ? 'Official Accreditations' : '官方认证与学术框架'}
            </p>
            <h2 className="section-heading">{t.recognition.title}</h2>
          </div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
             <RecognitionFileCard title="Malta Further and Higher Education Authority" subtitle="Higher Education Authority" desc={t.recognition.framework.malta.text} tag="Accreditation" image="/assets/Melta-DZ8e3MNc.png" />
             <RecognitionFileCard title="Council of Europe" subtitle="Lisbon Convention" desc={t.recognition.framework.lisbon.text} tag="Framework" image="/assets/Lisbon Recognition Convention-DqjXrqhh.png" />
             <RecognitionFileCard title="Europass" subtitle="European Union Qualifications" desc={t.recognition.framework.eu.text} tag="Standard" image="/assets/ECTS-BB8xoJ9D.png" />
             <RecognitionFileCard title="Association to Advance Collegiate Schools of Business Member" subtitle="Business Alliance" desc={lang === 'en' ? 'Member college of the Association to Advance Collegiate Schools of Business Business Education Alliance.' : '国际商学院协会商业教育联盟成员学院。'} tag="Membership" image="/assets/AACSB-HRiRaVrV.png" />
          </motion.div>
        </div>
      </section>

      {/* Early Eligibility CTA */}
      <section id="careers" className="bg-primary px-4 md:px-8 py-5 md:py-7 scroll-mt-28 relative overflow-hidden">
        <img
          src="/pgc_mba_landing_images/team-discussion.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-[0.5px] pointer-events-none" />
        <div className="max-w-7xl mx-auto bg-white rounded-2xl p-5 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-5 lg:gap-10 relative z-10">
          <div className="text-left space-y-2">
            <p className="text-primary text-[10px] font-black uppercase tracking-widest">
              {lang === 'en' ? 'Career Fit Check' : '职业适配评估'}
            </p>
            <h3 className="text-lg md:text-xl font-black text-foreground tracking-tighter leading-tight">
              {lang === 'en' ? 'Find Out If This MBA Fits Your Next Step' : '了解此 MBA 是否适合您的下一步'}
            </h3>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              {lang === 'en'
                ? 'Leave your details and our admissions advisor will help you understand your eligibility and options.'
                : '请留下您的联系方式，我们的招生顾问将为您提供个性化的资格评估与入学指导。'}
            </p>
          </div>
          <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto lg:min-w-[200px]">
            <Link to="/apply" className="cta-button bg-primary text-white hover:bg-secondary hover:text-primary text-xs py-2.5 px-5">
              {lang === 'en' ? 'Check My Eligibility' : '评估入学资格'}
            </Link>
            <Link to="/consult" className="cta-button border-2 border-primary/10 text-primary hover:bg-primary/5 text-xs py-2.5 px-5">
              {lang === 'en' ? 'Request Programme Advice' : '咨询课程顾问'}
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseUs lang={lang} />

      {/* Curriculum */}
      <section id="curriculum" className="py-20 bg-muted text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div>
              <p className="section-kicker mb-2">{t.curriculum.subtitle}</p>
              <h2 className="section-heading">{t.curriculum.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground font-medium max-w-xs lg:max-w-sm lg:text-right leading-relaxed">{t.curriculum.duration}</p>
          </div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {t.curriculum.stages.map((stage, i) => (
              <CurriculumStage 
                key={i}
                number={`0${i+1}`} 
                title={stage.title} 
                subtitle={stage.subtitle}
                modules={stage.items}
                lang={lang}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Faculty - Limited to 4 */}
      <section id="faculty" className="py-16 md:py-20 bg-primary/[0.04] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div className="text-left">
              <p className="section-kicker mb-2">{t.faculty.subtitle}</p>
              <h2 className="section-heading">{t.faculty.title}</h2>
            </div>
          </div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.faculty.members.slice(0, 4).map((member, i) => (
              <FacultyCard 
                key={i}
                name={member.name} 
                title={member.title} 
                desc={member.desc}
              />
            ))}
          </motion.div>
          <div className="mt-8 flex justify-start lg:justify-end">
            <Link to="/faculty" className="inline-flex items-center gap-2 text-primary font-black text-sm hover:gap-4 transition-all pb-1 border-b-2 border-primary/20">
              {lang === 'en' ? 'View All Faculty' : '查看全部导师'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Singapore Residency */}
      <section className="py-32 relative overflow-hidden bg-primary text-left">
        <div className="absolute inset-0 z-0">
             <img
             src="/pgc_mba_landing_images/singapore-residency.webp"
             className="w-full h-full object-cover opacity-50"
             alt="Singapore Background"
             loading="lazy"
             decoding="async"
           />
           <div className="absolute inset-0 bg-primary/40 backdrop-blur-[0.5px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="max-w-2xl mx-auto space-y-8 text-center"
          >
            <div>
              <p className="section-kicker text-secondary mb-3 justify-center">
                {lang === 'en' ? 'Optional Experience' : '可选研学体验'}
              </p>
              <h2 className="text-xl md:text-3xl font-black tracking-tighter mb-5 text-white leading-tight">
                {lang === 'en' ? 'Singapore Residency Opportunity' : '新加坡研学机会'}
              </h2>
              <p className="text-sm md:text-base text-white/80 font-medium leading-relaxed">
                {t.immersion.text}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
               <span className="text-xs font-black text-white border border-white/20 rounded-xl px-4 py-2">{lang === 'en' ? 'Corporate Visits' : '企业参访'}</span>
               <span className="text-xs font-black text-white border border-white/20 rounded-xl px-4 py-2">{lang === 'en' ? 'Executive Network' : '高管人脉'}</span>
               <span className="text-xs font-black text-white border border-white/20 rounded-xl px-4 py-2">{lang === 'en' ? 'Leadership Workshops' : '领导力工作坊'}</span>
            </div>

            <Link
              to="/consult"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-black text-xs uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-white transition-colors"
            >
              {lang === 'en' ? 'Learn More' : '了解详情'} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Admissions - Compact */}
      <section id="admission" className="py-20 bg-primary/[0.04] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <p className="section-kicker mb-3">{lang === 'en' ? 'Admissions' : '招生入学'}</p>
            <h2 className="section-heading">{t.admissions.title}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-border/10 text-left">
              <h4 className="text-2xl font-black text-foreground mb-6">{t.admissions.checklist.title}</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {t.admissions.checklist.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-primary font-black">{t.admissions.checklist.note}</p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-border/10 text-left flex flex-col justify-center">
              <h4 className="text-2xl font-black text-foreground mb-4">{t.admissions.method.title}</h4>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-medium">{t.admissions.method.text}</p>
            </div>
          </div>

          {/* Intakes & Fees - Strike-through logic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
             <div className="lg:col-span-2 bg-primary text-white p-6 sm:p-8 lg:p-10 rounded-[2.5rem] text-left flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <h4 className="text-2xl font-black">{t.admissions.intakes.title}</h4>
                  <p className="text-[11px] font-black text-white/70">
                    {lang === 'en' ? 'Rolling admission · 4 intakes per year' : '滚动招生 · 每年 4 次入学'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                   {t.admissions.intakes.items.map((intake: any, i: number) => (
                     <div key={i} className={`pb-4 border-b border-white/20 ${intake.expired ? 'opacity-30' : ''}`}>
                        <p className={`font-black text-xl mb-2 ${intake.expired ? 'line-through decoration-white/50 decoration-2' : 'text-primary-foreground'}`}>
                          {intake.label}
                        </p>
                        <div className="space-y-1 text-[10px] text-white/70 font-medium text-left">
                          <p>{lang === 'en' ? 'Start' : '开课'}: {intake.start}</p>
                          <p>{lang === 'en' ? 'Deadline' : '截止'}: {intake.deadline}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div id="tuition" className="bg-primary text-white p-6 sm:p-8 lg:p-10 rounded-[2.5rem] text-left relative overflow-hidden flex flex-col min-w-0 scroll-mt-28">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full" />
                <h4 className="text-2xl font-black mb-8">{t.admissions.fees.title}</h4>
                <div className="space-y-8 relative z-10 flex-1 text-left">
                   <div className="text-left">
                      <p className="text-[10px] font-black text-white/60 mb-1">{lang === 'en' ? 'Application' : '申请费'}</p>
                      <p className="text-xl md:text-2xl font-black break-words">{t.admissions.fees.appFee}</p>
                   </div>
                   <div className="text-left">
                      <p className="text-[10px] font-black text-white/60 mb-1">{lang === 'en' ? 'Tuition' : '学费'}</p>
                      <p className="text-xl md:text-2xl font-black break-words">{t.admissions.fees.tuition}</p>
                      <p className="text-xs mt-2 text-white/70 font-medium leading-relaxed">{t.admissions.fees.note}</p>
                   </div>
                </div>
                <div className="pt-6 border-t border-white/10 mt-auto space-y-3">
                  <Link to="/apply" className="cta-button w-full bg-white text-primary hover:bg-secondary hover:text-white">
                    {lang === 'en' ? 'Check My Eligibility' : '评估入学资格'}
                  </Link>
                  <Link to="/grant" className="block text-center text-xs font-black text-white/60 hover:text-white transition-colors py-2">
                    {lang === 'en' ? 'View Scholarship Options →' : '查看奖学金方案 →'}
                  </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Scholarship */}
      <section className="py-24 bg-muted text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="section-kicker mb-4">
                {lang === 'en' ? 'Scholarship Programme' : '奖学金计划'}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tighter leading-tight mb-6">
                {lang === 'en' ? <>{(t as any).admissions.scholarships.title}</> : <>最高 50%<br />奖学金</>}
              </h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8 max-w-md">
                {lang === 'en'
                  ? 'Four merit-based pathways evaluated automatically at the point of admission — no separate application required.'
                  : '四项绩效奖学金，录取时自动评估，无需单独申请。'}
              </p>
              <Link to="/grant" className="cta-button bg-primary text-white hover:bg-secondary">
                {lang === 'en' ? 'Check Scholarship Eligibility' : '查看奖学金资格'}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {scholarshipCards.map((card) => (
                <div key={card.keyword} className="bg-white rounded-2xl overflow-hidden border border-border/10 hover:border-primary/20 transition-all group shadow-sm">
                  <div className={`h-28 flex items-end p-4 ${card.bgClass}`}>
                    <span className={`text-xs font-black uppercase tracking-widest ${card.accentClass}`}>{card.keyword}</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-black text-foreground text-xs mb-1.5 tracking-tight leading-tight">{card.title}</h4>
                    <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Voice */}
      <section className="py-24 bg-primary overflow-hidden text-left relative">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 pointer-events-none" style={{clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)'}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left mb-16">
            <p className="section-kicker mb-3 text-secondary">
               {lang === 'en' ? "Professionals Who Didn't Stop." : '不断进取的职场精英'}
            </p>
            <h2 className="section-heading text-white">
              {lang === 'en' ? 'Student Voice' : '学员声音'}
            </h2>
          </div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {(t as any).admissions.stories.map((story: any, i: number) => (
              <motion.div key={i} variants={revealItem} whileHover={{ y: -6 }} className="flex flex-col space-y-5 text-left">
                <div className="p-8 md:p-10 bg-white/10 backdrop-blur-sm rounded-3xl relative flex-1 border border-white/15 text-left">
                  <Quote size={36} className="text-white/15 absolute top-6 right-6" />
                  <p className="text-sm text-white/85 font-medium leading-relaxed relative z-10">
                    "{story.text}"
                  </p>
                </div>
                <div className="px-4 text-left">
                   <p className="font-black text-sm text-white">{story.name}</p>
                   <p className="text-xs font-black text-secondary">{story.location}, Class of {story.class}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 text-left scroll-mt-28 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%)'}}>
        {/* Decorative accent blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="section-kicker mb-3">
              {lang === 'en' ? 'Questions You May Have' : '您可能关心的问题'}
            </p>
            <h2 className="section-heading">
              {lang === 'en' ? 'Frequently Asked Questions' : '常见问题'}
            </h2>
          </div>
          
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-4"
          >
             <FAQItem question={lang === 'en' ? "What are the admission requirements?" : "入学要求是什么？"} answer={lang === 'en' ? "Applicants typically need a bachelor's degree and at least 2 years of work experience. No GMAT required. Contact our admissions team for a personalised eligibility review." : "申请者通常需要具备学士学位及至少2年工作经验，无需参加GMAT考试。请联系我们的招生团队进行个人资格评估。"} />
             <FAQItem question={lang === 'en' ? "How long does it take to complete the Master of Business Administration program?" : "完成工商管理硕士课程需要多长时间？"} answer={lang === 'en' ? "The program can be completed in as little as 18 months, with a maximum of 4 years. Most working professionals finish within 2 years." : "课程最快可在18个月内完成，最长可延至4年。大多数在职学员在2年内顺利毕业。"} />
             <FAQItem question={lang === 'en' ? "Is the program 100% online?" : "该项目是 100% 在线的吗？"} answer={lang === 'en' ? "Yes. All coursework, lectures, and assessments are delivered online, allowing you to study from anywhere in the world on a schedule that fits your life." : "是的，所有课程、讲座和考核均在线完成，您可以在全球任何地方按照自己的时间安排学习。"} />
             <FAQItem question={lang === 'en' ? "Are there any exams?" : "会有考试吗？"} answer={lang === 'en' ? "There are no traditional sit-down exams. Assessment is project-based, using real business cases, reports, and presentations." : "没有传统的笔试考试，考核以项目为主，包括真实商业案例分析、报告撰写和演示展示。"} />
             <FAQItem question={lang === 'en' ? "Can I get credit transfer?" : "我可以申请学分抵免吗？"} answer={lang === 'en' ? "Yes, credit transfer is available for relevant prior academic qualifications. Contact admissions to assess how many modules may be waived." : "是的，可凭相关学术背景申请学分抵免。请联系招生团队评估可免修的模块数量。"} />
             <FAQItem question={lang === 'en' ? "What is the class schedule?" : "课程表是怎样的？"} answer={lang === 'en' ? "Classes are asynchronous — study at your own pace within weekly learning windows. Live webinars are optional and recorded for catch-up." : "课程采用异步方式，在每周的学习窗口期内自主安排学习进度。直播网络研讨会为可选，并提供回放录像。"} />
             <FAQItem question={lang === 'en' ? "Are scholarships available?" : "有奖学金吗？"} answer={lang === 'en' ? "Yes. Merit-based and need-based scholarships are available for qualified applicants. Visit our scholarship page or contact admissions for details." : "是的，我们为符合条件的申请者提供优秀奖学金和助学金。详情请访问奖学金页面或联系招生团队。"} />
             <FAQItem question={lang === 'en' ? "How do I apply?" : "我该如何申请？"} answer={lang === 'en' ? "Click Apply Now, fill in the online application form, and our admissions team will reach out within 2 business days to guide you through the next steps." : "点击【立即申请】，填写在线申请表，我们的招生团队将在2个工作日内与您联系，指引您完成后续步骤。"} />
          </motion.div>

          <div className="mt-16 text-center">
             <p className="text-sm md:text-base font-black text-foreground mb-5">
               {lang === 'en' ? 'Want to know if this programme fits your next step?' : '想确认这是否适合您的下一步？'}
             </p>
             <Link to="/consult" className="cta-button bg-primary text-white hover:bg-secondary gap-3">
               <MessageCircle size={18} />
               {lang === 'en' ? 'Speak With an Admissions Advisor' : '联系招生顾问'}
             </Link>
          </div>
        </div>
      </section>

      {/* Ready to Begin - Final Footer CTA */}
      <section className="py-16 md:py-24 bg-primary text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
          <div className="text-white relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 translate-x-1/4 pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-8 text-left">
                 <h2 className="text-xl md:text-3xl font-black tracking-tighter leading-tight">
                   {lang === 'en' ? 'Ready to' : '准备好'}<br />
                   <span className="text-secondary">{lang === 'en' ? 'Begin?' : '出发吗？'}</span>
                 </h2>
                 <p className="text-lg font-bold text-white/80">
                   {lang === 'en' ? 'Start Your Master of Business Administration This July.' : '今年 7 月开启您的工商管理硕士旅程。'}
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                     <p className="text-xs font-bold text-left">
                       {lang === 'en' ? 'Next intake: July 2026 — closes 19 May' : '下一次入学：2026 年 7 月 — 5 月 19 日截止'}
                     </p>
                   </div>
                   <div className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                     <p className="text-xs font-bold text-left">
                       {lang === 'en' ? 'SGD 9,800 total — paid in 4 instalments' : '总计 9,800 新加坡元 — 分 4 期支付'}
                     </p>
                   </div>
                   <div className="flex items-center gap-4">
                     <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                     <p className="text-xs font-bold text-left">
                       {lang === 'en' ? 'Scholarships up to 50% of programme fees' : '奖学金最高可达课程学习费用的 50%'}
                     </p>
                   </div>
                 </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 text-foreground">
                 <div className="mb-8 text-left">
                   <h3 className="text-2xl font-black tracking-tighter mb-1">
                      {lang === 'en' ? 'Speak With Admissions' : '咨询入学顾问'}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      {lang === 'en' ? 'An advisor will contact you within 24 hours.' : '顾问将在 24 小时内与您联系。'}
                    </p>
                 </div>
                 <MiniLeadForm lang={lang} message />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-components
function ProgrammeSectionNav({ lang }: { lang: 'en' | 'zh' }) {
  const [activeSection, setActiveSection] = useState('#about');
  const tabs = lang === 'en'
    ? [
        { label: 'About', href: '#about' },
        { label: 'Recognition', href: '#recognition' },
        { label: 'Academics', href: '#curriculum' },
        { label: 'Admissions', href: '#admission' },
      ]
    : [
        { label: '项目概览', href: '#about' },
        { label: '全球认可', href: '#recognition' },
        { label: '课程', href: '#curriculum' },
        { label: '申请', href: '#admission' },
      ];
  const activeLabel = tabs.find((tab) => tab.href === activeSection)?.label || tabs[0].label;

  React.useEffect(() => {
    const ids = tabs.map((tab) => tab.href.slice(1));
    const handleScroll = () => {
      const markerY = 145;
      const sections = ids
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { id, top: rect.top, bottom: rect.bottom };
        })
        .filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;
      const current =
        sections.find((section) => section.top <= markerY && section.bottom > markerY) ||
        sections
          .slice()
          .sort((a, b) => Math.abs(a.top - markerY) - Math.abs(b.top - markerY))[0];

      if (current) setActiveSection(`#${current.id}`);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [lang]);

  return (
    <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-border/70 text-left">
      <nav className="overflow-x-auto" aria-label={lang === 'en' ? 'Programme sections' : '课程页面导航'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-max md:min-w-0">
          <div className="flex items-center justify-start gap-4 md:gap-7 h-12">
            <span className="md:hidden relative text-xs font-black text-primary whitespace-nowrap py-4">
              {activeLabel}
              <span className="absolute left-0 right-0 -bottom-px h-1 bg-primary rounded-t-full" />
            </span>
            {tabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className={`relative hidden md:inline-flex text-xs font-black hover:text-primary transition-colors whitespace-nowrap py-4 ${activeSection === tab.href ? 'text-primary' : 'text-foreground/80'}`}
              >
                {tab.label}
                {activeSection === tab.href && <motion.span layoutId="section-nav-cursor" className="absolute left-0 right-0 -bottom-px h-1 bg-primary rounded-t-full" />}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </section>
  );
}

function IconFeature({ title, desc }: any) {
  return (
    <motion.div variants={revealItem} whileHover={{ y: -6 }} className="p-6 bg-background rounded-3xl border border-border/5 hover:border-primary/20 transition-all text-left">
      <h5 className="font-black uppercase tracking-tight text-foreground mb-1 leading-tight">{title}</h5>
      <p className="text-xs text-muted-foreground font-medium">{desc}</p>
    </motion.div>
  );
}

const compactExperienceOptions = [
  { value: '<3y', en: 'Less than 3 years', zh: '3 年以下' },
  { value: '3-10y', en: '3-10 years', zh: '3-10 年' },
  { value: '10+y', en: 'More than 10 years', zh: '10 年以上' },
];

const compactIndustryOptions = [
  { value: 'business', en: 'Business / Management', zh: '商业 / 管理' },
  { value: 'finance', en: 'Finance / Banking', zh: '金融 / 银行' },
  { value: 'technology', en: 'Technology / Digital', zh: '科技 / 数字化' },
  { value: 'education', en: 'Education / Training', zh: '教育 / 培训' },
  { value: 'healthcare', en: 'Healthcare / Services', zh: '医疗 / 服务业' },
  { value: 'other', en: 'Other Industry', zh: '其他行业' },
];

function MiniLeadForm({ lang, compact }: { lang: 'en' | 'zh'; message?: boolean; compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(event.currentTarget);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const recipientEmail = import.meta.env.VITE_FORM_RECIPIENT_EMAIL || 'admissions@pickering.education';
    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();
    const name = [firstName, lastName].filter(Boolean).join(' ');
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const experience = String(formData.get('experience') || '').trim();
    const industry = String(formData.get('industry') || '').trim();
    const subject = encodeURIComponent(`Pickering callback request from ${name || 'website visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone / WhatsApp: ${phone}\nExperience: ${experience}\nIndustry: ${industry}`);
    
    try {
      await fetch(`${apiUrl}/api/consult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, name, email, phone, experience, industry, formType: 'consult' }),
      });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
    } catch {
      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      setStatus('idle');
    }
  };

  if (compact) {
    const compactInput = 'border-0 border-b border-primary/30 bg-transparent px-2 py-1.5 text-[11px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary min-w-0';
    const compactSelect = `${compactInput} cursor-pointer appearance-none`;
    
    if (status === 'success') {
      return (
        <div className="flex items-center gap-3 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          <p className="text-xs font-bold text-green-700">
            {lang === 'en' ? 'Thank you! We\'ll contact you within 24 hours.' : '感谢！我们将在24小时内联系您。'}
          </p>
        </div>
      );
    }
    
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
        <input name="firstName" required type="text" placeholder={lang === 'en' ? 'First Name' : '名'} className={`${compactInput} w-24`} disabled={status === 'submitting'} />
        <input name="email" required type="email" placeholder={lang === 'en' ? 'Email' : '邮箱'} className={`${compactInput} w-40`} disabled={status === 'submitting'} />
        <input name="phone" required type="tel" placeholder={lang === 'en' ? 'Phone' : '电话'} className={`${compactInput} w-32`} disabled={status === 'submitting'} />
        <select name="experience" required className={`${compactSelect} w-36`} defaultValue="" disabled={status === 'submitting'}>
          <option value="" disabled>{lang === 'en' ? 'Experience' : '工作年限'}</option>
          {compactExperienceOptions.map((o) => (
            <option key={o.value} value={o.value}>{lang === 'en' ? o.en : o.zh}</option>
          ))}
        </select>
        <button type="submit" disabled={status === 'submitting'} className="shrink-0 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {status === 'submitting' 
            ? (lang === 'en' ? 'Sending...' : '发送中...') 
            : (lang === 'en' ? 'Get in Touch' : '联系顾问')}
        </button>
      </form>
    );
  }

  const inputClass = 'w-full border-0 border-b-2 border-[#dbe8f7] bg-transparent px-0 py-3 text-base font-medium text-foreground outline-none transition-colors placeholder:text-[#adc2da] focus:border-primary';
  const selectClass = `${inputClass} cursor-pointer appearance-none text-primary`;

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-3">
        <CheckCircle2 size={48} className="text-green-600 mx-auto" />
        <p className="text-xl font-black text-green-700">
          {lang === 'en' ? 'Thank you!' : '感谢！'}
        </p>
        <p className="text-sm text-green-600 font-medium">
          {lang === 'en' ? 'We\'ll contact you within 24 hours.' : '我们将在24小时内联系您。'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="firstName" required type="text" placeholder={lang === 'en' ? 'First Name' : '名字'} className={inputClass} disabled={status === 'submitting'} />
        <input name="lastName" required type="text" placeholder={lang === 'en' ? 'Last Name' : '姓氏'} className={inputClass} disabled={status === 'submitting'} />
      </div>
      <input name="email" required type="email" placeholder={lang === 'en' ? 'Email Address' : '邮箱地址'} className={inputClass} disabled={status === 'submitting'} />
      <input name="phone" required type="tel" placeholder={lang === 'en' ? 'Phone / WhatsApp' : '电话 / WhatsApp'} className={inputClass} disabled={status === 'submitting'} />
      <select name="experience" required className={selectClass} defaultValue="" disabled={status === 'submitting'}>
        <option value="" disabled>{lang === 'en' ? 'Years of Experience...' : '工作经验年限...'}</option>
        {compactExperienceOptions.map((option) => (
          <option key={option.value} value={option.value}>{lang === 'en' ? option.en : option.zh}</option>
        ))}
      </select>
      <select name="industry" required className={selectClass} defaultValue="" disabled={status === 'submitting'}>
        <option value="" disabled>{lang === 'en' ? 'Select Industry...' : '选择行业...'}</option>
        {compactIndustryOptions.map((option) => (
          <option key={option.value} value={option.value}>{lang === 'en' ? option.en : option.zh}</option>
        ))}
      </select>
      <button type="submit" disabled={status === 'submitting'} className="cta-button w-full bg-primary text-white shadow-lg shadow-primary/20 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'submitting'
          ? (lang === 'en' ? 'Submitting...' : '提交中...')
          : (lang === 'en' ? 'Get in Touch' : '联系顾问')}
      </button>
      <p className="text-center text-[10px] text-muted-foreground font-medium leading-relaxed">
        {lang === 'en' ? (
          <>By submitting, you agree that Pickering Global Campus may contact you about admissions per our <Link to="/privacy-policy" className="font-bold text-primary underline underline-offset-4">Privacy Policy</Link>.</>
        ) : (
          <>提交即表示您同意 Pickering Global Campus 依照<Link to="/privacy-policy" className="font-bold text-primary underline underline-offset-4">隐私政策</Link>与您联系。</>
        )}
      </p>
    </form>
  );
}

function FAQItem({ question, answer }: { question: string; answer?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div variants={revealItem} className="bg-white rounded-2xl border border-border/10 overflow-hidden text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center group"
      >
        <span className="font-bold text-foreground group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown size={20} className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-sm text-muted-foreground font-medium leading-relaxed border-t border-border/5 text-left">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function RecognitionFileCard({ title, subtitle, desc, tag, image }: any) {
  return (
    <motion.div
      variants={revealItem}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: easeOutQuint }}
      className="group bg-white rounded-[2rem] border border-border/10 p-8 flex flex-col text-left hover:border-primary/20 transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="h-12 flex items-center">
          <img src={image} alt={title} className="h-full w-auto object-contain" loading="lazy" decoding="async" />
        </div>
      </div>
      <h4 className="text-lg font-black text-foreground mb-1 tracking-tight leading-tight">{title}</h4>
      <p className="text-[9px] font-black text-primary/60 mb-4">{subtitle}</p>
      <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function CurriculumStage({ number, title, subtitle, modules, lang }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cleanTitle = String(title).replace(/^Stage\s*\d+:\s*/i, '').replace(/^阶段\s*\d+:\s*/, '');
  const stageImages: Record<string, string> = {
    '01': '/pgc_mba_landing_images/curriculum-stage1.webp',
    '02': '/pgc_mba_landing_images/curriculum-stage2.webp',
    '03': '/pgc_mba_landing_images/curriculum-stage3.webp',
  };

  return (
    <motion.div
      variants={revealItem}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: easeOutQuint }}
      className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-border/10 text-left relative overflow-hidden group h-fit"
    >
      <div className="relative -mx-10 -mt-10 md:-mx-12 md:-mt-12 mb-8 h-44 w-[calc(100%+5rem)] md:w-[calc(100%+6rem)] overflow-hidden">
        <img
          src={stageImages[number]}
          alt={cleanTitle}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />
      </div>
      <div className="relative z-10 text-left">
        <span className="text-5xl font-black text-primary/25 block mb-6">{number}</span>
        <h4 className="text-2xl font-black text-foreground mb-1 tracking-tighter">{cleanTitle}</h4>
        <p className="text-[10px] font-black text-primary mb-6">{subtitle}</p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-primary font-black text-xs mb-4 hover:gap-3 transition-all"
        >
          {isExpanded ? (lang === 'en' ? 'Collapse Details' : '收起详情') : (lang === 'en' ? 'Expand Details' : '展开详情')}
          <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.ul 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-6 pt-4 overflow-hidden border-t border-border/5 text-left"
            >
              {modules.map((m: any, i: number) => (
                <li key={i} className="group/item text-left">
                  <div className="flex items-start gap-3 mb-1 text-left">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-primary/30 group-hover/item:bg-primary rounded-full flex-shrink-0 transition-colors" />
                    <p className="font-black text-foreground text-sm tracking-tight leading-tight">{m.name}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed pl-5 font-medium">{m.desc}</p>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function FacultyCard({ name, title, desc }: any) {
  return (
    <motion.div
      variants={revealItem}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: easeOutQuint }}
      className="bg-white p-8 rounded-[2rem] border border-border/10 text-left group hover:border-primary transition-all h-full flex flex-col items-start"
    >
      <h4 className="text-xl font-black text-foreground mb-2 tracking-tight leading-tight">{name}</h4>
      <p className="text-primary text-xs font-black mb-6">{title}</p>
      <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}
