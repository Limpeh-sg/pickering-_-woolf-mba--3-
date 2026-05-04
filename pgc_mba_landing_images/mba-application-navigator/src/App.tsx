import { motion } from 'motion/react';
import { Globe, ShieldCheck, GraduationCap, Clock, Award, CheckCircle2 } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-black italic">PGC</div>
            <span className="font-bold text-xl tracking-tight">Pickering Global Campus</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Programme</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Admissions</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Scholarship</a>
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              Apply Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" /> Globally Recognised Online MBA
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter mb-8 bg-gradient-to-br from-slate-900 to-indigo-800 bg-clip-text text-transparent">
              Fast-track Your Global Career Business Leadership.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">
              Earn a world-class MBA 100% online in 12–24 months. Designed for working professionals who demand flexibility and prestige.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all">
                Download Brochure
              </button>
              <button 
                onClick={() => document.getElementById('guide-trigger')?.click()}
                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all"
              >
                Start Smart Navigator
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6 pt-12 border-t border-slate-100">
               <div>
                  <p className="text-2xl md:text-3xl font-black text-indigo-600">100%</p>
                  <p className="text-xs uppercase font-bold text-slate-400">Online</p>
               </div>
               <div>
                  <p className="text-2xl md:text-3xl font-black text-indigo-600">12m</p>
                  <p className="text-xs uppercase font-bold text-slate-400">Min Duration</p>
               </div>
               <div>
                  <p className="text-2xl md:text-3xl font-black text-indigo-600">60</p>
                  <p className="text-xs uppercase font-bold text-slate-400">ECTS Credits</p>
               </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] bg-indigo-50 border border-indigo-100 overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" 
                 alt="MBA Students" 
                 className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
            </div>
            {/* Floating Accents */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 z-10"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Scholarships</p>
                <p className="text-lg font-black text-slate-900">Up to 50%</p>
              </div>
            </motion.div>
            
            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 z-10"
            >
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Accredited</p>
                <p className="text-lg font-black text-slate-900">ECTS / Woolf</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Why Choose PGC MBA?</h2>
             <p className="text-slate-500 font-medium max-w-2xl mx-auto">Transform your professional trajectory with a curriculum designed for the modern global marketplace.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Global Recognition", desc: "Our degrees are benchmarked against the highest European standards." },
              { icon: Clock, title: "Maximum Flexibility", desc: "Study anytime, anywhere. Perfect for busy professionals and parents." },
              { icon: GraduationCap, title: "Career Focused", desc: "Skills-based coursework with real-world business application." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Section / Bottom CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
           <div className="bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                 <GraduationCap className="w-64 h-64 text-white" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight">Ready to start your journey?</h2>
                <p className="text-indigo-200 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
                  Use our Smart Navigator to check your eligibility, fees, and scholarship options in 30 seconds.
                </p>
                <button 
                  onClick={() => document.getElementById('guide-trigger')?.click()}
                  className="bg-white text-indigo-900 px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:bg-slate-100 transition-all scale-110"
                >
                  Open Smart Navigator
                </button>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-400 font-bold italic">PGC</div>
            <span>© 2026 Pickering Global Campus. All rights reserved.</span>
          </div>
          <div className="flex gap-8">
             <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
             <a href="#" className="hover:text-indigo-600">Terms of Service</a>
             <a href="#" className="hover:text-indigo-600">Contact Us</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
