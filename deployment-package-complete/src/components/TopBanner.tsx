import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopBannerProps {
  lang: 'en' | 'zh';
}

// Next intake: Jul 13 2026 · Deadline: May 19 2026
const NEXT_INTAKE_DATE = new Date('2026-07-13T00:00:00');
const DEADLINE_DATE    = new Date('2026-05-19T00:00:00');

function getCountdown(target: Date) {
  const now  = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;
  const totalSecs = Math.floor(diff / 1000);
  const days    = Math.floor(totalSecs / (24 * 3600));
  const hours   = Math.floor((totalSecs % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function TopBanner({ lang }: TopBannerProps) {
  const [isVisible, setIsVisible]   = useState(true);
  const [countdown, setCountdown]   = useState(() => getCountdown(DEADLINE_DATE));
  const [intakeCD, setIntakeCD]     = useState(() => getCountdown(NEXT_INTAKE_DATE));
  const [itemIndex, setItemIndex]   = useState(0);

  // Tick every second for live countdown
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(getCountdown(DEADLINE_DATE));
      setIntakeCD(getCountdown(NEXT_INTAKE_DATE));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Format deadline countdown — days + hh:mm:ss
  const deadlineStr = countdown
    ? lang === 'en'
      ? `${countdown.days}d ${pad(countdown.hours)}:${pad(countdown.minutes)}:${pad(countdown.seconds)}`
      : `${countdown.days}天 ${pad(countdown.hours)}:${pad(countdown.minutes)}:${pad(countdown.seconds)}`
    : '';

  // Format intake countdown — just days
  const intakeStr = intakeCD
    ? lang === 'en'
      ? `${intakeCD.days} days away`
      : `还有 ${intakeCD.days} 天`
    : '';

  const items = lang === 'en'
    ? [
        deadlineStr ? `Deadline closes in ${deadlineStr} — Apply before May 19` : 'Enrolment now open',
        `Next intake: July 2026 · ${intakeStr}`,
        '4 intakes per year — flexible start dates',
        '100% online · Study from anywhere in the world',
        'SGD 9,800 total · Scholarships up to 50%',
      ]
    : [
        deadlineStr ? `截止倒计时 ${deadlineStr} — 5月19日前申请` : '现正招生',
        `下一期：2026 年 7 月 · ${intakeStr}`,
        '一年四次开课，灵活入学时间',
        '100% 在线 · 全球随地学习',
        '学费 9,800 新币 · 奖学金最高 50%',
      ];

  // Rotate every 8 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setItemIndex(prev => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-primary text-white overflow-hidden relative z-50 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-10 py-1.5 flex items-center justify-center relative" style={{ minHeight: '2rem' }}>
            <div className="overflow-hidden h-5 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={itemIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-center px-8 whitespace-nowrap"
                >
                  {items[itemIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 p-1 hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
