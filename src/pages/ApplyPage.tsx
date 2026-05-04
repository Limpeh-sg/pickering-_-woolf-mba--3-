import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import BackButton from '../components/BackButton';
import { motion } from 'motion/react';

interface ApplyPageProps {
  lang: 'en' | 'zh';
}

export default function ApplyPage({ lang }: ApplyPageProps) {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const isApply = location.pathname === '/apply';
  const isConsult = location.pathname === '/consult';
  const isBrochure = location.pathname === '/brochure';
  const heroImage = isApply
    ? '/pgc_mba_landing_images/curriculum-stage2.webp'
    : isConsult
      ? '/pgc_mba_landing_images/team-discussion.webp'
      : '/pgc_mba_landing_images/hero-overview.webp';
  const imageAlt = isApply
    ? (lang === 'en' ? 'Application documents and admissions planning' : '申请资料与招生规划')
    : isConsult
      ? (lang === 'en' ? 'Admissions consultation conversation' : '招生顾问咨询沟通')
      : (lang === 'en' ? 'Online course brochure preview' : '在线课程手册预览');
  const eyebrow = isApply
    ? (lang === 'en' ? 'Start Your Application' : '开始申请')
    : isConsult
      ? (lang === 'en' ? 'Speak With Admissions' : '联系招生顾问')
      : (lang === 'en' ? 'Programme Brochure' : '课程手册');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/apply') {
      setTitle(lang === 'en' ? 'Admission Application' : '入学申请');
    } else if (path === '/consult') {
      setTitle(lang === 'en' ? 'Book a Free Consultation' : '预约免费咨询');
    } else if (path === '/brochure') {
      setTitle(lang === 'en' ? 'Download Course Brochure' : '下载课程手册');
    } else {
      setTitle(lang === 'en' ? 'Contact Us' : '联系我们');
    }
    window.scrollTo(0, 0);
  }, [location, lang]);

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 overflow-hidden"
        >
          <div className="relative h-52 sm:h-64 md:h-80 overflow-hidden">
            <img
              src={heroImage}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />
            <div className="absolute left-6 right-6 bottom-6">
              <p className="text-white text-xs font-black">{eyebrow}</p>
            </div>
          </div>
          <div className="p-8 md:p-12 border-b border-border/5">
            <h1 className="section-heading mb-4">
              {title}
            </h1>
            <div className="w-12 h-1 bg-primary rounded-full mb-6" />
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              {lang === 'en' 
                ? 'Please fill out the form below. Our admissions team will contact you shortly.' 
                : '请填写下方表单，我们的招生团队将尽快与您联系。'}
            </p>
          </div>
          <div className="p-8 md:p-12">
            <LeadForm lang={lang} />
          </div>
        </motion.div>
      </div>
    </div>
      </>
  );
}
