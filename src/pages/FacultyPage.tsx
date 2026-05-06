import React, { useEffect } from 'react';
import BackButton from '../components/BackButton';
import { content } from '../constants/content';

interface FacultyPageProps {
  lang: 'en' | 'zh';
}

export default function FacultyPage({ lang }: FacultyPageProps) {
  const t = content[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <BackButton />
    <div className="bg-background min-h-screen pt-36 pb-24">
      <div className="site-container">
        <div className="relative mb-10 h-52 sm:h-64 md:h-80 overflow-hidden rounded-3xl">
          <img
            src="/pgc_mba_landing_images/dean-office.webp"
            alt={lang === 'en' ? 'Faculty-led online business learning discussion' : '师资带领的在线商科学习讨论'}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-transparent" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />
          <div className="absolute left-6 right-6 bottom-6">
            <p className="text-xs font-black text-white">
              {lang === 'en' ? 'Academic and Industry Expertise' : '学术与行业师资'}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="text-left">
            <h1 className="section-heading mb-4">{t.faculty.title}</h1>
            <p className="section-kicker">{t.faculty.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.faculty.members.map((member, i) => (
            <FacultyCard 
              key={i}
              name={member.name} 
              title={member.title} 
              desc={member.desc}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

function FacultyCard({ name, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-border/10 text-left group hover:border-primary transition-all h-full flex flex-col">
      <h4 className="text-xl font-black text-foreground mb-2 tracking-tight leading-tight">{name}</h4>
      <p className="text-primary text-xs font-black mb-6">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
