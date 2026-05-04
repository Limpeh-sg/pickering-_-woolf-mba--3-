import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, RotateCcw, Download, Copy } from 'lucide-react';
import {
  level1,
  level2Paths,
  level3,
  level4,
  getLeadLevel,
  generateAdvisorAction,
  type DecisionOption
} from '../data/decision-tree-mvp';

interface AdmissionsGuideProps {
  lang: 'en' | 'zh';
}

interface ConversationState {
  currentLevel: 1 | 2 | 3 | 4 | 5;
  level1Answer?: string;
  level2Answer?: string;
  level3Answer?: string;
  level4Answer?: string;
  level2Path?: string;
  score: number;
  tags: string[];
  answers: {
    intent?: string;
    background?: string;
    detailNeed?: string;
    followUp?: string;
  };
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  country: string;
  note: string;
}

export default function AdmissionsGuide({ lang }: AdmissionsGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [state, setState] = useState<ConversationState>({
    currentLevel: 1,
    score: 5, // +5 for opening assistant
    tags: [],
    answers: {}
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    country: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.currentLevel]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isOpen) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleOptionSelect = (option: DecisionOption) => {
    const newScore = state.score + option.score;
    const newTags = [...new Set([...state.tags, ...option.tags])];

    if (state.currentLevel === 1) {
      setState({
        ...state,
        currentLevel: 2,
        level1Answer: option.value,
        level2Path: option.nextLevel,
        score: newScore,
        tags: newTags,
        answers: {
          ...state.answers,
          intent: option.label[lang]
        }
      });
    } else if (state.currentLevel === 2) {
      setState({
        ...state,
        currentLevel: 3,
        level2Answer: option.value,
        score: newScore,
        tags: newTags,
        answers: {
          ...state.answers,
          background: option.label[lang]
        }
      });
    } else if (state.currentLevel === 3) {
      setState({
        ...state,
        currentLevel: 4,
        level3Answer: option.value,
        score: newScore,
        tags: newTags,
        answers: {
          ...state.answers,
          detailNeed: option.label[lang]
        }
      });
    } else if (state.currentLevel === 4) {
      setState({
        ...state,
        currentLevel: 5,
        level4Answer: option.value,
        score: newScore,
        tags: newTags,
        answers: {
          ...state.answers,
          followUp: option.label[lang]
        }
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // +30 for submitting form
    const finalScore = state.score + 30;
    const leadLevel = getLeadLevel(finalScore);
    const advisorAction = generateAdvisorAction(
      finalScore,
      state.tags,
      state.answers,
      lang
    );

    const payload = {
      programme: 'Pickering Global Campus MBA',
      language: lang,
      source: 'website',
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
      lead_score: finalScore,
      lead_level: leadLevel,
      tags: state.tags,
      answers: state.answers,
      contact: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        country: formData.country,
        note: formData.note
      },
      recommended_advisor_action: advisorAction,
      created_at: new Date().toISOString()
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      await fetch(`${apiUrl}/api/consult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name.split(' ')[0] || '',
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          formType: 'admissions-guide',
          notes: JSON.stringify(payload, null, 2)
        }),
      });
    } catch (error) {
      console.error('Submission error:', error);
    }

    setSummaryData(payload);
    setShowSummary(true);
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    setState({
      currentLevel: 1,
      score: 5,
      tags: [],
      answers: {}
    });
    setFormData({
      name: '',
      phone: '',
      email: '',
      country: '',
      note: ''
    });
    setShowSummary(false);
    setSummaryData(null);
  };

  const copyPayload = () => {
    if (summaryData) {
      navigator.clipboard.writeText(JSON.stringify(summaryData, null, 2));
    }
  };

  const downloadSummary = () => {
    if (summaryData) {
      const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lead-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getCurrentOptions = (): DecisionOption[] => {
    if (state.currentLevel === 1) return level1.options;
    if (state.currentLevel === 2 && state.level2Path) {
      return level2Paths[state.level2Path]?.options || [];
    }
    if (state.currentLevel === 3) return level3.options;
    if (state.currentLevel === 4) return level4.options;
    return [];
  };

  const getCurrentQuestion = (): string => {
    if (state.currentLevel === 1) return level1.question[lang];
    if (state.currentLevel === 2 && state.level2Path) {
      return level2Paths[state.level2Path]?.question[lang] || '';
    }
    if (state.currentLevel === 3) return level3.question[lang];
    if (state.currentLevel === 4) return level4.question[lang];
    return '';
  };

  const getWelcomeMessage = () => {
    if (lang === 'zh') {
      return '欢迎！我是PGC招生助手。我会通过几个简单问题帮您找到最合适的申请路径。';
    }
    return 'Welcome! I\'m the PGC Admissions Assistant. I\'ll help you find the best application path through a few simple questions.';
  };

  const getProgressText = () => {
    if (lang === 'zh') {
      return `进度：${state.currentLevel}/5`;
    }
    return `Progress: ${state.currentLevel}/5`;
  };

  const getFormTitle = () => {
    if (lang === 'zh') {
      return '最后一步：留下您的联系方式';
    }
    return 'Final Step: Leave Your Contact Information';
  };

  const getSummaryTitle = () => {
    if (lang === 'zh') {
      return '提交成功！';
    }
    return 'Submission Successful!';
  };

  const getSummaryMessage = () => {
    const leadLevel = getLeadLevel(state.score);
    if (lang === 'zh') {
      return `感谢您的信息！您的线索等级：${leadLevel}（${state.score}分）。招生顾问将在24小时内联系您。`;
    }
    return `Thank you for your information! Your lead level: ${leadLevel} (${state.score} points). An admissions advisor will contact you within 24 hours.`;
  };

  return (
    <>
      {/* Modern Glass Button */}
      <motion.div
        className="fixed bottom-44 right-6 md:bottom-40 md:right-10 z-[60]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full overflow-hidden shadow-xl group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 2px rgba(255,255,255,1)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity">
            <img 
              src="/favicon-new.png" 
              alt="" 
              className="w-8 h-8 object-contain"
            />
          </div>
          
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, transparent 40%, rgba(255,255,255,0.4) 100%)'
            }}
          />

          <motion.div
            className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full shadow-md"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.button>

        <AnimatePresence>
          {showNotification && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 4px 16px rgba(31, 38, 135, 0.12)',
              }}
            >
              <span className="text-sm font-bold text-foreground">
                {lang === 'en' ? 'Need assistance?' : '需要帮助吗？'}
              </span>
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px]"
                style={{ borderLeftColor: 'rgba(255,255,255,0.98)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />
            
            {/* Modern Glass Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed z-[101] overflow-hidden flex flex-col
                         bottom-0 left-0 right-0 h-[62vh] rounded-t-3xl
                         md:bottom-6 md:right-6 md:left-auto md:w-[420px] md:h-[680px] md:rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 60px rgba(31, 38, 135, 0.15), inset 0 1px 2px rgba(255,255,255,1)',
              }}
            >
              {/* Header */}
              <div className="p-4 border-b border-border/10 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.6)',
                      boxShadow: '0 4px 12px rgba(31, 38, 135, 0.1)',
                    }}
                  >
                    <img src="/favicon-new.png" alt="" className="w-6 h-6 object-contain opacity-70" />
                  </div>
                  <div>
                    <h2 className="font-black text-base text-foreground">
                      {lang === 'en' ? 'Admissions Guide' : 'PGC招生助手'}
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium">
                      {getProgressText()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!showSummary && state.currentLevel > 1 && (
                    <button 
                      onClick={handleRestart}
                      className="p-2 hover:bg-black/5 rounded-full transition-colors"
                      title={lang === 'en' ? 'Restart' : '重新开始'}
                    >
                      <RotateCcw className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-4 pt-3 pb-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(state.currentLevel / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!showSummary ? (
                  <>
                    {/* Welcome Message (Level 1 only) */}
                    {state.currentLevel === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl px-4 py-3 rounded-bl-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          {getWelcomeMessage()}
                        </p>
                      </motion.div>
                    )}

                    {/* Question */}
                    {state.currentLevel < 5 && (
                      <motion.div
                        key={`question-${state.currentLevel}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl px-4 py-3 rounded-bl-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        <p className="text-sm font-bold text-foreground leading-relaxed">
                          {getCurrentQuestion()}
                        </p>
                      </motion.div>
                    )}

                    {/* Options */}
                    {state.currentLevel < 5 && (
                      <div className="space-y-2">
                        {getCurrentOptions().map((option, index) => (
                          <motion.button
                            key={option.value}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleOptionSelect(option)}
                            className="w-full text-left px-4 py-3 rounded-xl border border-border/20 hover:border-primary hover:bg-primary/5 transition-all font-medium text-sm bg-white/50"
                          >
                            {option.label[lang]}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Form (Level 5) */}
                    {state.currentLevel === 5 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="rounded-2xl px-4 py-3 rounded-bl-md"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          <p className="text-sm font-bold text-foreground leading-relaxed">
                            {getFormTitle()}
                          </p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-3">
                          <input
                            type="text"
                            required
                            placeholder={lang === 'en' ? 'Full Name *' : '姓名 *'}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border/20 focus:border-primary focus:outline-none font-medium text-sm bg-white/50"
                          />
                          <input
                            type="email"
                            required
                            placeholder={lang === 'en' ? 'Email *' : '邮箱 *'}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border/20 focus:border-primary focus:outline-none font-medium text-sm bg-white/50"
                          />
                          <input
                            type="tel"
                            required
                            placeholder={lang === 'en' ? 'Phone / WhatsApp *' : '电话 / WhatsApp *'}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border/20 focus:border-primary focus:outline-none font-medium text-sm bg-white/50"
                          />
                          <input
                            type="text"
                            required
                            placeholder={lang === 'en' ? 'Country / Region *' : '国家 / 地区 *'}
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-border/20 focus:border-primary focus:outline-none font-medium text-sm bg-white/50"
                          />
                          <textarea
                            placeholder={lang === 'en' ? 'Additional notes (optional)' : '补充说明（可选）'}
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-border/20 focus:border-primary focus:outline-none font-medium text-sm bg-white/50 resize-none"
                          />
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-sm"
                          >
                            {isSubmitting 
                              ? (lang === 'en' ? 'Submitting...' : '提交中...') 
                              : (lang === 'en' ? 'Submit' : '提交')}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </>
                ) : (
                  /* Summary */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl px-4 py-3 rounded-bl-md"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.05) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        boxShadow: '0 2px 8px rgba(34,197,94,0.1)',
                      }}
                    >
                      <p className="text-sm font-bold text-green-700 leading-relaxed">
                        {getSummaryTitle()}
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        {getSummaryMessage()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                        {lang === 'en' ? 'Your Journey' : '您的选择'}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-bold">{lang === 'en' ? 'Intent:' : '意向：'}</span> {state.answers.intent}</p>
                        <p><span className="font-bold">{lang === 'en' ? 'Background:' : '背景：'}</span> {state.answers.background}</p>
                        <p><span className="font-bold">{lang === 'en' ? 'Need:' : '需求：'}</span> {state.answers.detailNeed}</p>
                        <p><span className="font-bold">{lang === 'en' ? 'Follow-up:' : '跟进：'}</span> {state.answers.followUp}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={copyPayload}
                        className="flex-1 py-2.5 px-4 bg-white border border-border/20 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        {lang === 'en' ? 'Copy' : '复制'}
                      </button>
                      <button
                        onClick={downloadSummary}
                        className="flex-1 py-2.5 px-4 bg-white border border-border/20 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        {lang === 'en' ? 'Download' : '下载'}
                      </button>
                    </div>

                    <button
                      onClick={handleRestart}
                      className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-bold shadow-sm"
                    >
                      {lang === 'en' ? 'Start New Conversation' : '开始新对话'}
                    </button>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
