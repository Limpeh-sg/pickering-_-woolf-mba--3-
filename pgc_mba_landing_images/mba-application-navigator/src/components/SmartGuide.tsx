import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { CONTENT } from '../data';
import { useLark, type Lead } from '../hooks/useLark';

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <Icons.BookOpen className="w-5 h-5" />,
  CheckCircle: <Icons.CheckCircle className="w-5 h-5" />,
  Calculator: <Icons.Calculator className="w-5 h-5" />,
  Award: <Icons.Award className="w-5 h-5" />,
  Calendar: <Icons.Calendar className="w-5 h-5" />,
  ShieldCheck: <Icons.ShieldCheck className="w-5 h-5" />,
};

type SectionId = 'home' | 'overview' | 'eligibility' | 'fees' | 'scholarship' | 'intake' | 'recognition' | 'lead';

export default function SmartGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [feeCalc, setFeeCalc] = useState({ currency: 'SGD', plan: 'full', extra: false });
  const { pushToLark, isSubmitting } = useLark();
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', intake: '' });
  const [submitted, setSubmitted] = useState(false);

  // Auto-detect language
  useEffect(() => {
    const userLang = navigator.language.toLowerCase();
    if (userLang.includes('zh') || userLang.includes('cn')) {
      setLang('cn');
    }
  }, []);

  const content = CONTENT[lang];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleSelection = (questionId: string, value: string, score: number) => {
    setSelections(prev => ({ ...prev, [questionId]: value }));
    setScores(prev => ({ ...prev, [questionId]: score }));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      ...form,
      score: totalScore,
      tags: Object.values(selections),
      lang,
      timestamp: new Date().toISOString()
    };
    await pushToLark(lead);
    setSubmitted(true);
  };

  const menuItems = [
    content.sections.overview,
    content.sections.eligibility,
    content.sections.fees,
    content.sections.scholarship,
    content.sections.intake,
    content.sections.recognition,
  ];

  const toggleLang = () => setLang(l => l === 'en' ? 'cn' : 'en');

  return (
    <>
      {/* Floating Trigger Bubble */}
      <motion.button
        id="guide-trigger"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer"
      >
        <Icons.MessageSquare className="w-6 h-6" />
        <span className="font-medium hidden md:inline">{content.title}</span>
      </motion.button>

      {/* Main Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white w-full max-w-4xl h-[90vh] md:h-[80vh] rounded-2xl shadow-3xl overflow-hidden flex flex-col relative"
            >
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-indigo-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <Icons.Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-indigo-900 leading-tight">{content.title}</h2>
                    <p className="text-xs text-indigo-600 font-medium">{content.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleLang}
                    className="px-2 py-1 text-xs font-bold border border-indigo-200 rounded hover:bg-indigo-100 transition-colors"
                  >
                    {lang === 'en' ? '中' : 'EN'}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-indigo-100 rounded-full transition-colors"
                  >
                    <Icons.X className="w-5 h-5 text-indigo-900" />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
                <AnimatePresence mode="wait">
                  {activeSection === 'home' && (
                    <motion.div 
                      key="home"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id as SectionId)}
                          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left flex flex-col gap-3 group"
                        >
                          <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            {ICON_MAP[item.icon]}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.description}</p>
                          </div>
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setActiveSection('lead')}
                        className="bg-indigo-600 p-6 rounded-xl text-white shadow-lg hover:bg-indigo-700 transition-all text-left flex flex-col gap-3 md:col-span-2 lg:col-span-1"
                      >
                        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                          <Icons.Headset className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{content.bookConsultation}</h3>
                          <p className="text-sm text-indigo-100 opacity-90">Talk to our admissions expert today.</p>
                        </div>
                      </button>
                    </motion.div>
                  )}

                  {activeSection === 'overview' && (
                    <motion.div 
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                      <button onClick={() => setActiveSection('home')} className="flex items-center gap-1 text-indigo-600 font-medium mb-4">
                        <Icons.ArrowLeft className="w-4 h-4" /> {content.back}
                      </button>
                      <h3 className="text-2xl font-bold text-slate-900">{content.sections.overview.title}</h3>
                      <div className="grid gap-4">
                        {content.sections.overview.content.map((text, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                            <Icons.CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 font-medium">{text}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-6">
                        <button onClick={() => setActiveSection('eligibility')} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
                          {content.sections.eligibility.title}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'eligibility' && (
                    <motion.div 
                      key="eligibility"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-8"
                    >
                      <button onClick={() => setActiveSection('home')} className="flex items-center gap-1 text-indigo-600 font-medium mb-4">
                        <Icons.ArrowLeft className="w-4 h-4" /> {content.back}
                      </button>
                      <h3 className="text-2xl font-bold text-slate-900">{content.sections.eligibility.title}</h3>
                      
                      {content.sections.eligibility.questions.map((q) => (
                        <div key={q.id} className="space-y-3">
                          <label className="block font-bold text-slate-700">{q.label}</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => handleSelection(q.id, opt.value, opt.score)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                  selections[q.id] === opt.value 
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                                    : 'border-slate-200 hover:border-indigo-300 bg-white text-slate-600'
                                }`}
                              >
                                <span className="font-semibold">{opt.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="p-6 bg-indigo-600 rounded-2xl text-white flex items-center justify-between shadow-xl">
                        <div>
                          <p className="text-indigo-100 text-sm uppercase tracking-wider font-bold">Eligibility Score</p>
                          <p className="text-3xl font-black">{totalScore}%</p>
                        </div>
                        <button 
                          onClick={() => setActiveSection('fees')}
                          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                          Check Fees
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'fees' && (
                    <motion.div 
                      key="fees"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-8"
                    >
                      <button onClick={() => setActiveSection('home')} className="flex items-center gap-1 text-indigo-600 font-medium mb-4">
                        <Icons.ArrowLeft className="w-4 h-4" /> {content.back}
                      </button>
                      <h3 className="text-2xl font-bold text-slate-900">{content.sections.fees.title}</h3>
                      
                      {/* Currency Select */}
                      <div className="flex gap-2 p-1 bg-slate-200 rounded-xl">
                        {content.sections.fees.currencies.map(c => (
                          <button
                            key={c.code}
                            onClick={() => setFeeCalc(prev => ({ ...prev, currency: c.code }))}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                              feeCalc.currency === c.code ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                            }`}
                          >
                            {c.code} ({c.symbol})
                          </button>
                        ))}
                      </div>

                      {/* Plan Select */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {content.sections.fees.plans.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setFeeCalc(prev => ({ ...prev, plan: p.id }))}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              feeCalc.plan === p.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'
                            }`}
                          >
                            <span className={`block font-bold ${feeCalc.plan === p.id ? 'text-indigo-600' : 'text-slate-900'}`}>{p.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Display Results */}
                      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Icons.Calculator className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                           <div>
                              <p className="text-slate-400 font-medium mb-1">Estimated Tuition</p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black tracking-tighter">
                                  {content.sections.fees.currencies.find(c => c.code === feeCalc.currency)?.symbol}
                                  {Math.round((content.sections.fees.currencies.find(c => c.code === feeCalc.currency)?.base || 0) * (feeCalc.plan === 'monthly' ? 1.1 : 1)).toLocaleString()}
                                </span>
                              </div>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                              <div>
                                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Application Fee</p>
                                <p className="text-xl font-bold">
                                  {content.sections.fees.currencies.find(c => c.code === feeCalc.currency)?.symbol}
                                  {content.sections.fees.currencies.find(c => c.code === feeCalc.currency)?.appFee}
                                </p>
                              </div>
                              {feeCalc.plan !== 'full' && (
                                <div>
                                  <p className="text-slate-400 text-xs uppercase font-bold mb-1">Per Payment approx.</p>
                                  <p className="text-xl font-bold">
                                    {content.sections.fees.currencies.find(c => c.code === feeCalc.currency)?.symbol}
                                    {Math.round(((content.sections.fees.currencies.find(c => c.code === feeCalc.currency)?.base || 0) * (feeCalc.plan === 'monthly' ? 1.1 : 1)) / (feeCalc.plan === 'inst' ? 4 : 12)).toLocaleString()}
                                  </p>
                                </div>
                              )}
                           </div>
                           
                           <button 
                            onClick={() => setActiveSection('scholarship')}
                            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/20 transition-all"
                           >
                            Check Scholarship Eligibility
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'scholarship' && (
                    <motion.div 
                      key="scholarship"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-8"
                    >
                      <button onClick={() => setActiveSection('home')} className="flex items-center gap-1 text-indigo-600 font-medium mb-4">
                        <Icons.ArrowLeft className="w-4 h-4" /> {content.back}
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                          <Icons.Award className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{content.sections.scholarship.title}</h3>
                          <p className="text-slate-500 font-medium">{content.sections.scholarship.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.sections.scholarship.categories.map(cat => (
                          <div key={cat.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all">
                             <h4 className="font-bold text-slate-900 mb-2">{cat.title}</h4>
                             <p className="text-sm text-slate-500">{cat.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-indigo-900 mb-2">Can I get 50% funding?</h4>
                          <p className="text-sm text-indigo-700 leading-relaxed">
                            Scholarships are awarded based on a comprehensive review of your leadership, academic background, and social impact.
                          </p>
                        </div>
                        <button 
                          onClick={() => setActiveSection('lead')}
                          className="whitespace-nowrap bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all"
                        >
                          Check My Status
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'intake' && (
                    <motion.div 
                      key="intake"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-8"
                    >
                      <button onClick={() => setActiveSection('home')} className="flex items-center gap-1 text-indigo-600 font-medium mb-4">
                        <Icons.ArrowLeft className="w-4 h-4" /> {content.back}
                      </button>
                      <h3 className="text-2xl font-bold text-slate-900">{content.sections.intake.title}</h3>
                      
                      <div className="space-y-4">
                        {content.sections.intake.dates.map((d, i) => (
                          <div key={i} className="flex bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-indigo-600 text-white px-6 py-6 flex flex-col items-center justify-center min-w-[120px]">
                              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Intake</span>
                              <span className="text-lg font-black text-center">{d.month}</span>
                            </div>
                            <div className="p-6 flex-1 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Commences</p>
                                <p className="font-bold text-slate-800">{d.commencement}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Deadline</p>
                                <p className="font-bold text-red-600">{d.deadline}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-center p-6 border-2 border-dashed border-indigo-200 rounded-3xl">
                        <p className="text-slate-500 mb-4">Not sure which one fits your schedule?</p>
                        <button 
                          onClick={() => setActiveSection('lead')}
                          className="bg-indigo-100 text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-200 transition-all border border-indigo-200"
                        >
                          Discuss My Timeline
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'recognition' && (
                    <motion.div 
                      key="recognition"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-2xl mx-auto space-y-8"
                    >
                      <button onClick={() => setActiveSection('home')} className="flex items-center gap-1 text-indigo-600 font-medium mb-4">
                        <Icons.ArrowLeft className="w-4 h-4" /> {content.back}
                      </button>
                      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                          <Icons.ShieldCheck className="w-12 h-12 text-indigo-600" />
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900">{content.sections.recognition.title}</h3>
                            <p className="text-sm font-medium text-slate-500">Quality Assured Global Education</p>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          {content.sections.recognition.details.map((d, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-indigo-50/50 rounded-xl">
                              <div className="w-2 h-2 rounded-full bg-indigo-600" />
                              <span className="font-medium text-slate-700">{d}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-slate-500 italic px-4">
                          * Recognition may vary by employer, institution, or authority. We recommend checking with local credential evaluation services for specific needs.
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <button onClick={() => setActiveSection('lead')} className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-indigo-500/40 transition-all">
                          Request Full Recognition Pack
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === 'lead' && (
                    <motion.div 
                      key="lead"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-xl mx-auto"
                    >
                      {!submitted ? (
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-indigo-900 mb-2">{content.leadForm.title}</h3>
                            <p className="text-slate-500">{content.leadForm.desc}</p>
                          </div>
                          
                          <form onSubmit={handleLeadSubmit} className="space-y-4">
                            <div className="space-y-1">
                              <label className="text-sm font-bold text-slate-600 px-1">{content.leadForm.fields.name}</label>
                              <input 
                                required
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none" 
                                placeholder="Your Name"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-600 px-1">{content.leadForm.fields.email}</label>
                                <input 
                                  required
                                  type="email"
                                  value={form.email}
                                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none" 
                                  placeholder="email@example.com"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-600 px-1">{content.leadForm.fields.phone}</label>
                                <input 
                                  required
                                  value={form.phone}
                                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none" 
                                  placeholder="+65 ..."
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm font-bold text-slate-600 px-1">{content.leadForm.fields.intake}</label>
                              <select 
                                value={form.intake}
                                onChange={e => setForm(f => ({ ...f, intake: e.target.value }))}
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white font-medium"
                              >
                                <option value="">Select intake...</option>
                                <option value="july">July 2026</option>
                                <option value="october">October 2026</option>
                                <option value="january">January 2027</option>
                              </select>
                            </div>
                            
                            <button 
                              disabled={isSubmitting}
                              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? <Icons.Loader2 className="w-6 h-6 animate-spin" /> : content.submit}
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="text-center py-12 px-6">
                          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icons.Check className="w-10 h-10" />
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 mb-3">Submission Received!</h3>
                          <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                            Thank you, {form.name}. An admissions advisor has been notified and will contact you within 15 minutes to discuss the {form.intake} intake.
                          </p>
                          <button 
                            onClick={() => {
                              setIsOpen(false);
                              setSubmitted(false);
                              setActiveSection('home');
                            }}
                            className="text-indigo-600 font-bold border-b-2 border-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            Back to website
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Progress / CTA */}
              {activeSection !== 'home' && activeSection !== 'lead' && (
                <div className="p-4 border-t bg-white flex items-center justify-between">
                   <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
                      {menuItems.map(item => (
                        <button 
                          key={item.id}
                          onClick={() => setActiveSection(item.id as SectionId)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                            activeSection === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {ICON_MAP[item.icon]}
                          {item.title}
                        </button>
                      ))}
                   </div>
                   <button 
                    onClick={() => setActiveSection('lead')}
                    className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-indigo-700 transition-all whitespace-nowrap"
                   >
                    {content.submit}
                   </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
