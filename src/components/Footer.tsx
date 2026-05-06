import React from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

interface FooterProps {
  lang: 'en' | 'zh';
}

export default function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear();

  const accredLogos = [
    { src: '/assets/Melta-DZ8e3MNc.png',                          alt: 'Malta MFHEA' },
    { src: '/assets/Lisbon Recognition Convention-DqjXrqhh.png',  alt: 'Lisbon Convention' },
    { src: '/assets/ECTS-BB8xoJ9D.png',                           alt: 'ECTS / Europass' },
    { src: '/assets/AACSB-HRiRaVrV.png',                          alt: 'AACSB Alliance' },
  ];

  return (
    <footer className="bg-white text-primary text-left">

      {/* ── Main grid ────────────────────────────────────────── */}
      <div className="site-container pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-b border-primary/10 pb-12">

          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <img
              src="logo.png"
              alt="Pickering Global Campus × Woolf University"
              className="h-8 w-auto object-contain"
              loading="lazy"
            />
            <p className="text-[11px] text-primary/60 leading-relaxed font-medium">
              {lang === 'en'
                ? 'Pickering Global Campus offers an accredited online Master of Business Administration programme as a member institution of Woolf University, licensed by the Malta Further and Higher Education Authority (MFHEA).'
                : 'Pickering Global Campus 为 Woolf University 成员学院，经马耳他继续教育与高等教育管理局（MFHEA）批准，提供经认可的在线工商管理硕士课程。'}
            </p>
            {/* Accreditation logos */}
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-primary/40 mb-2">
                {lang === 'en' ? 'Accreditation & Recognition' : '认证与认可'}
              </p>
              <div className="flex flex-wrap gap-2">
                {accredLogos.map(logo => (
                  <div key={logo.alt} className="bg-primary/8 rounded p-1.5 flex items-center justify-center border border-primary/10">
                    <img src={logo.src} alt={logo.alt} className="h-5 w-auto object-contain opacity-70" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — Programme actions */}
          <div className="space-y-4">
            <h6 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
              {lang === 'en' ? 'MBA Programme' : 'MBA 课程'}
            </h6>
            <nav className="flex flex-col gap-3">
              <FooterLink to="/apply"    label={lang === 'en' ? 'Apply Now'            : '立即申请'} />
              <FooterLink to="/consult"  label={lang === 'en' ? 'Talk to an Advisor'   : '咨询招生顾问'} />
              <FooterLink to="/brochure" label={lang === 'en' ? 'Download Brochure'    : '下载课程手册'} />
              <FooterLink to="/grant"    label={lang === 'en' ? 'Scholarships'         : '奖学金计划'} />
              <FooterLink to="/faculty"  label={lang === 'en' ? 'Meet the Faculty'     : '了解师资团队'} />
              <FooterLink to="/contact"  label={lang === 'en' ? 'Contact Us'           : '联系我们'} />
            </nav>
          </div>

          {/* Col 3 — Campus locations */}
          <div className="space-y-4">
            <h6 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
              {lang === 'en' ? 'Campus Locations' : '校区地址'}
            </h6>
            <div className="space-y-5">
              <div>
                <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest mb-1">
                  {lang === 'en' ? 'Singapore' : '新加坡校区'}
                </p>
                <a
                  href="https://maps.google.com/?q=1+North+Bridge+Road+Singapore+179094"
                  target="_blank" rel="noreferrer"
                  className="text-[11px] text-primary/60 font-medium leading-relaxed hover:text-primary transition-colors underline underline-offset-2"
                >
                  1 North Bridge Road #06-01<br />
                  High Street Centre<br />
                  Singapore 179094
                </a>
              </div>
              <div>
                <p className="text-[9px] font-black text-primary/40 uppercase tracking-widest mb-1">
                  {lang === 'en' ? 'Estonia' : '爱沙尼亚校区'}
                </p>
                <a
                  href="https://maps.google.com/?q=Ahtri+tn+12+Tallinn+15551"
                  target="_blank" rel="noreferrer"
                  className="text-[11px] text-primary/60 font-medium leading-relaxed hover:text-primary transition-colors underline underline-offset-2"
                >
                  Ahtri tn 12<br />
                  Tallinn 15551, Estonia
                </a>
              </div>
            </div>
          </div>

          {/* Col 4 — Follow us + Legal links */}
          <div className="space-y-6">
            <div>
              <h6 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-3">
                {lang === 'en' ? 'Follow Us' : '关注我们'}
              </h6>
              <SocialLinks variant="menu" className="text-primary/70 !flex !flex-row !flex-wrap !gap-4" />
            </div>
            <div>
              <h6 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/40 mb-3">
                {lang === 'en' ? 'Legal' : '法律信息'}
              </h6>
              <nav className="flex flex-col gap-2">
                <FooterSmallLink to="/privacy-policy"      label={lang === 'en' ? 'Privacy Policy'  : '隐私政策'} />
                <FooterSmallLink to="/personal-data-policy" label={lang === 'en' ? 'Personal Data'  : '个人数据政策'} />
                <FooterSmallLink to="/terms-of-use"        label={lang === 'en' ? 'Terms of Use'    : '使用条款'} />
                <FooterSmallLink to="/sitemap"             label={lang === 'en' ? 'Sitemap'         : '网站地图'} />
              </nav>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="pt-8 space-y-4">
          {/* Entity info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-[10px] font-bold text-primary/40 leading-relaxed">
              Pickering School OÜ · {lang === 'en' ? 'Estonian Registration' : '爱沙尼亚注册编号'}: 17359066<br />
              {lang === 'en' ? 'Member College of Woolf University' : 'Woolf University 成员学院'}
            </p>
            <p className="text-[9px] text-primary/30 font-medium leading-relaxed">
              {lang === 'en'
                ? 'Woolf (Malta) holds licence 2019-015 from the Malta Further and Higher Education Authority. Woolf University (Wisconsin, USA) is incorporated and approved under Wisconsin Statutes §440.52(10)(a). Pickering Global Campus is a trademark of Pickering School OÜ. Information on this site may change without prior notice.'
                : 'Woolf（马耳他）持有马耳他继续教育与高等教育管理局许可证 2019-015。Woolf University（美国威斯康星州）依据威斯康星州法规第 440.52(10)(a) 条注册。Pickering Global Campus 为 Pickering School OÜ 商标。本站信息可能在不事先通知的情况下变更。'}
            </p>
          </div>
          {/* Copyright */}
          <div className="border-t border-primary/8 pt-5">
            <p className="text-[9px] font-black text-primary/30 uppercase tracking-widest">
              © {year} Pickering Global Campus. {lang === 'en' ? 'All Rights Reserved.' : '保留所有权利。'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="text-[11px] font-bold text-primary/65 hover:text-primary transition-colors leading-none"
    >
      {label}
    </Link>
  );
}

function FooterSmallLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="text-[10px] font-bold text-primary/40 hover:text-primary/70 transition-colors leading-none"
    >
      {label}
    </Link>
  );
}
