import React from 'react';
import { motion } from 'motion/react';
import { content } from '../constants/content';

interface WhyChooseUsProps {
  lang: 'en' | 'zh';
}

export default function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const t = content[lang].advantages;
  const advantageKeys = ['asia', 'degree', 'design', 'live', 'balance', 'community'] as const;
  const easeOutQuint = [0.22, 1, 0.36, 1] as const;
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 }
    }
  };

  return (
    <section id="advantages" className="py-12 md:py-20 bg-muted relative overflow-hidden scroll-mt-28">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 translate-x-1/2 pointer-events-none" />
      
      <div className="site-container relative z-10">
        <div className="text-left mb-10 md:mb-14">
          <p className="section-kicker mb-3">
            {lang === 'en' ? 'Why Pickering Master of Business Administration?' : '为什么选择 Pickering 工商管理硕士？'}
          </p>
          <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tighter leading-tight uppercase">
            {t.title}
          </h2>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {advantageKeys.map((key, index) => (
            <HighlightCard
              key={key}
              title={t[key].title}
              desc={t[key].text}
              ease={easeOutQuint}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface HighlightCardProps {
  title: string;
  desc: string;
  ease: readonly [number, number, number, number];
  index: number;
  key?: string | number;
}

function HighlightCard({ title, desc, ease, index }: HighlightCardProps) {
  const patternText = ['Asia', '60+', 'Work', 'Online', 'Time', 'Peers'][index] || 'MBA';
  const images = [
    '/pgc_mba_landing_images/advantage-asia.webp',
    '/pgc_mba_landing_images/advantage-degree.webp',
    '/pgc_mba_landing_images/advantage-professional.webp',
    '/pgc_mba_landing_images/advantage-online.webp',
    '/pgc_mba_landing_images/advantage-balance.webp',
    '/pgc_mba_landing_images/advantage-community.webp',
  ];
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } }
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease }}
      className="group bg-white rounded-[2rem] border border-border/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col text-left h-full relative overflow-hidden"
    >
      <div className="h-44 overflow-hidden relative">
        <img src={images[index]} alt="" decoding="async" className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
        <div className="absolute inset-0 bg-primary/25 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5" />
        <div className="absolute left-6 bottom-5 h-px w-20 bg-primary/15" />
        <p className="absolute right-5 bottom-4 text-3xl font-black text-primary/5">{patternText}</p>
      </div>
      <div className="p-8 md:p-10">
        <h4 className="relative z-10 text-lg md:text-xl font-black text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors uppercase leading-tight">{title}</h4>
        <p className="relative z-10 text-muted-foreground leading-relaxed font-medium text-xs md:text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-8 md:p-10 bg-white border-2 border-primary/10 rounded-[1.5rem] md:rounded-[2rem] text-left hover:border-primary transition-all group">
      <p className="text-3xl md:text-5xl font-black mb-2 md:mb-4 tracking-tighter text-primary group-hover:scale-110 transition-transform">{value}</p>
      <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
    </div>
  );
}
