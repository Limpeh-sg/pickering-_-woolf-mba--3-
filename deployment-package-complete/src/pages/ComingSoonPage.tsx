import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ComingSoonPageProps {
  lang: 'en' | 'zh';
}

export default function ComingSoonPage({ lang }: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Video background / main content */}
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center gap-8">
        {/* Video player */}
        <div className="w-full aspect-video bg-black/40 rounded-2xl overflow-hidden relative">
          <video
            src="/comingsoon.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Fallback if no video yet */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-white/30 text-xs font-black uppercase tracking-widest">
              {lang === 'en' ? 'Video loading…' : '视频加载中…'}
            </p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-secondary font-black text-xs uppercase tracking-[0.3em]">
            {lang === 'en' ? 'Coming Soon' : '即将推出'}
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight">
            {lang === 'en' ? "We're working on it." : '我们正在建设中。'}
          </h1>
          <p className="text-white/60 text-sm font-medium max-w-sm mx-auto leading-relaxed">
            {lang === 'en'
              ? 'This page is under construction. In the meantime, our admissions team is ready to help you directly.'
              : '此页面正在建设中。在此期间，我们的招生团队随时为您提供直接帮助。'}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/consult"
            className="px-8 py-3 bg-white text-primary font-black text-sm rounded-xl hover:bg-secondary transition-colors"
          >
            {lang === 'en' ? 'Talk to an Advisor' : '咨询招生顾问'}
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-8 py-3 border-2 border-white/30 text-white font-black text-sm rounded-xl hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'en' ? 'Back to Home' : '返回首页'}
          </Link>
        </div>
      </div>
    </div>
  );
}
