import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Languages,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import ApplyPage from './pages/ApplyPage';
import Success from './pages/Success';
import FacultyPage from './pages/FacultyPage';
import GrantPage from './pages/GrantPage';
import LegalPage from './pages/LegalPage';
import ContactPage from './pages/ContactPage';
import ComingSoonPage from './pages/ComingSoonPage';

// Components
import TopBanner from './components/TopBanner';
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer';
import SocialLinks from './components/SocialLinks';
import AdmissionsGuide from './components/AdmissionsGuide';

// Content
import { content } from './constants/content';

export default function App() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary text-left">
      <TopBanner lang={lang} />
      <StickyCTA lang={lang} />
      
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border/10">
        <div className="site-container">
          <div className="flex justify-between h-24 items-center gap-4">
            <div className="flex-shrink-0 flex items-center gap-3 min-w-0">
              <Link to="/" className="flex items-center gap-3">
                <img src="logo.png" alt="Pickering" className="h-14" loading="lazy" decoding="async" />
                <div className="hidden sm:block border-l border-border/10 pl-3 max-w-[190px] xl:max-w-none">
                  <p className="text-xs font-black uppercase tracking-tighter leading-tight">Pickering Global Campus</p>
                  <p className="text-xs font-bold text-muted-foreground tracking-tight leading-tight">
                    {lang === 'en' ? 'Member of Woolf University' : 'Woolf University 成员学院'}
                  </p>
                  <p className="text-xs font-bold text-muted-foreground tracking-tight leading-tight">
                    {lang === 'en' ? 'MBA Programme (Online)' : '在线工商管理硕士项目'}
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="hidden lg:flex gap-4 xl:gap-8 items-center min-w-0">
              <NavHashLink href="/#hero">{lang === 'en' ? 'Home' : '首页'}</NavHashLink>
              <NavHashLink href="/#recognition">{t.nav.recognition}</NavHashLink>
              <NavHashLink href="/#curriculum">{t.nav.curriculum}</NavHashLink>
              <NavHashLink href="/#faculty">{t.nav.faculty}</NavHashLink>
              <NavHashLink href="/#admission">{lang === 'en' ? 'Admission' : '招生'}</NavHashLink>
              
              <Link 
                to="/apply"
                className="flex shrink-0 items-center justify-center whitespace-nowrap px-6 xl:px-8 py-2.5 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-tight hover:bg-secondary transition-all shadow-xl shadow-primary/10"
              >
                {t.nav.apply}
              </Link>
              
              <button 
                onClick={toggleLang}
                className="flex shrink-0 items-center justify-center whitespace-nowrap min-w-16 px-4 h-10 rounded-xl border border-border/20 text-primary font-black text-sm hover:bg-primary/5 transition-colors"
              >
                {lang === 'en' ? '中文' : 'ENGLISH'}
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="p-2 text-primary"
              >
                <Languages size={24} />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-border/10 px-6 pb-12 space-y-2 overflow-hidden"
            >
              <MobileNavLink href="/#hero" onClick={() => setIsMenuOpen(false)}>{t.nav.overview}</MobileNavLink>
              <MobileNavLink href="/#curriculum" onClick={() => setIsMenuOpen(false)}>{t.nav.curriculum}</MobileNavLink>
              <MobileNavLink href="/#recognition" onClick={() => setIsMenuOpen(false)}>{t.nav.recognition}</MobileNavLink>
              <MobileNavLink href="/#faculty" onClick={() => setIsMenuOpen(false)}>{t.nav.faculty}</MobileNavLink>
              <Link 
                to="/apply"
                onClick={() => setIsMenuOpen(false)}
                className="w-full h-16 flex items-center justify-center bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm mt-8 shadow-xl"
              >
                {t.nav.apply}
              </Link>
              <div className="pt-6">
                <SocialLinks variant="menu" className="text-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/apply" element={<ApplyPage lang={lang} />} />
          <Route path="/consult" element={<ApplyPage lang={lang} />} />
          <Route path="/brochure" element={<ApplyPage lang={lang} />} />
          <Route path="/success" element={<Success lang={lang} />} />
          <Route path="/faculty" element={<FacultyPage lang={lang} />} />
          <Route path="/grant" element={<GrantPage lang={lang} />} />
          <Route path="/privacy-policy" element={<LegalPage lang={lang} page="privacy" />} />
          <Route path="/personal-data-policy" element={<LegalPage lang={lang} page="data" />} />
          <Route path="/terms-of-use" element={<LegalPage lang={lang} page="terms" />} />
          <Route path="/sitemap" element={<LegalPage lang={lang} page="sitemap" />} />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="*" element={<ComingSoonPage lang={lang} />} />
        </Routes>
      </main>

      <Footer lang={lang} />

      {/* Global Admissions Guide - Always visible */}
      <AdmissionsGuide lang={lang} />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-28 right-6 md:bottom-24 md:right-10 z-[55] w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-secondary transition-all group border-2 border-white/20"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavHashLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [path, hash] = href.split('#');
  const handleClick = (e: React.MouseEvent) => {
    if (window.location.pathname === path) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="text-foreground/70 font-black hover:text-primary transition-colors text-sm uppercase tracking-tight whitespace-nowrap"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a href={href} onClick={onClick} className="block text-foreground font-black py-4 border-b border-border/10 text-sm uppercase tracking-widest">
      {children}
    </a>
  );
}
