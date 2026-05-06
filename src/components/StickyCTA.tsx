import React, { useState, useEffect } from 'react';
import { FileText, FileEdit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { content } from '../constants/content';
import SocialLinks from './SocialLinks';

interface StickyCTAProps {
  lang: 'en' | 'zh';
}

export default function StickyCTA({ lang }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const t = content[lang].ui.cta;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollY > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop Floating CTA */}
      <AnimatePresence>
        {isVisible && !isFooterVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="fixed bottom-6 inset-x-0 mx-auto max-w-5xl z-40 px-6 hidden md:block"
          >
            <div className="bg-white border border-border/10 rounded-2xl px-6 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-6 shadow-2xl shadow-black/10">
              <div className="text-left">
                <p className="text-sm font-black text-foreground tracking-tight">
                  {lang === 'en' ? 'Ready to advance your career?' : '准备好提升您的职业吗？'}
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  {lang === 'en' ? '2026 cohort — spots filling fast' : '2026 年入学名额即将截止'}
                </p>
              </div>

              <SocialLinks variant="compact" />
              
              <div className="flex gap-3 justify-end items-center">
                <Link
                  to="/consult"
                  className="flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-black rounded-xl hover:bg-primary/5 transition-all text-xs uppercase tracking-widest"
                >
                  <span>{t.consult}</span>
                </Link>
                <Link
                  to="/apply"
                  className="flex items-center justify-center px-6 py-3 bg-primary text-white font-black rounded-xl hover:bg-secondary transition-all text-xs uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  <span>{t.apply}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Fixed Bottom Nav */}
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="md:hidden fixed bottom-0 left-0 w-full z-[60] bg-white/90 backdrop-blur-xl border-t border-border/10 grid grid-cols-3 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            <MobileNavItem
              to="/brochure"
              icon={<FileText size={20} />}
              label={lang === 'en' ? 'Download' : '下载简章'}
            />
            <MobileNavItem
              to="/apply"
              icon={<FileEdit size={20} />}
              label={lang === 'en' ? 'Apply' : '立即申请'}
            />
            <MobileNavItem
              to="/consult"
              icon={<WhatsAppLogo />}
              label={lang === 'en' ? '1-1 Consult' : '联系顾问'}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WhatsAppLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        fill="#fff"
        d="M16.02 6.2a9.72 9.72 0 0 0-8.4 14.6L6.4 25.6l4.92-1.28a9.7 9.7 0 1 0 4.7-18.12Zm0 17.7a7.92 7.92 0 0 1-4.04-1.1l-.28-.17-2.92.76.78-2.84-.19-.3a7.89 7.89 0 1 1 6.65 3.65Zm4.36-5.92c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.55.12-.16.24-.63.78-.77.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z"
      />
    </svg>
  );
}

function MobileNavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      to={to} 
      className="flex flex-col items-center justify-center py-3 gap-1 text-primary active:bg-primary/5 transition-colors border-r border-border/5 last:border-r-0"
    >
      {icon}
      <span className="text-xs font-black leading-tight">{label}</span>
    </Link>
  );
}
