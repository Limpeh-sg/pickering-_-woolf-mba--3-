import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  lang: 'en' | 'zh';
}

export default function ContactPage({ lang }: ContactPageProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    try {
      await fetch(`${apiUrl}/api/consult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message, formType: 'contact' }),
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full border-0 border-b-2 border-border/30 bg-transparent px-0 py-3 text-sm font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary';

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} /> {lang === 'en' ? 'Back to Home' : '返回首页'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">
                {lang === 'en' ? 'Get in Touch' : '联系我们'}
              </p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight mb-4">
                {lang === 'en' ? 'Contact Us' : '联系我们'}
              </h1>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-md">
                {lang === 'en'
                  ? 'Have a question about the programme, admissions, or scholarships? Our team is happy to help.'
                  : '对课程、招生或奖学金有疑问？我们的团队随时为您解答。'}
              </p>
            </div>

            <div className="space-y-6">
              <ContactItem
                icon={<Mail size={16} />}
                label={lang === 'en' ? 'Email' : '邮箱'}
                value="admissions@pickering.education"
                href="mailto:admissions@pickering.education"
              />
              <ContactItem
                icon={<MessageCircle size={16} />}
                label="WhatsApp"
                value="+65 8982 0800"
                href="https://wa.me/6589820800"
                external
              />
              <ContactItem
                icon={<MessageCircle size={16} />}
                label="WeChat"
                value="Pickeringsg"
              />
              <ContactItem
                icon={<Clock size={16} />}
                label={lang === 'en' ? 'Office Hours' : '办公时间'}
                value={lang === 'en' ? 'Mon–Fri, 10 AM – 6 PM (SGT)' : '周一至周五，上午 10 点至下午 6 点（新加坡时间）'}
              />
              <ContactItem
                icon={<MapPin size={16} />}
                label={lang === 'en' ? 'Registered Address' : '注册地址'}
                value="Ahtri tn 12, Tallinn 15551, Estonia"
                href="https://maps.google.com/?q=Ahtri+tn+12+Tallinn+15551"
                external
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {status === 'done' ? (
              <div className="bg-primary/5 rounded-3xl p-12 text-center space-y-4">
                <p className="text-3xl font-black text-primary tracking-tighter">
                  {lang === 'en' ? 'Message sent.' : '已成功发送。'}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {lang === 'en' ? 'We will be in touch within 24 hours.' : '我们将在 24 小时内与您联系。'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-xs font-black uppercase tracking-widest text-primary underline underline-offset-4"
                >
                  {lang === 'en' ? 'Send another message' : '再次发送'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  name="name"
                  required
                  type="text"
                  placeholder={lang === 'en' ? 'Full Name' : '姓名'}
                  className={inputClass}
                />
                <input
                  name="email"
                  required
                  type="email"
                  placeholder={lang === 'en' ? 'Email Address' : '邮箱地址'}
                  className={inputClass}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder={lang === 'en' ? 'Phone / WhatsApp (optional)' : '电话 / WhatsApp（选填）'}
                  className={inputClass}
                />
                <select name="subject" required className={`${inputClass} cursor-pointer appearance-none`} defaultValue="">
                  <option value="" disabled>{lang === 'en' ? 'Subject' : '主题'}</option>
                  <option value="admissions">{lang === 'en' ? 'Admissions Enquiry' : '入学咨询'}</option>
                  <option value="scholarship">{lang === 'en' ? 'Scholarship Information' : '奖学金信息'}</option>
                  <option value="curriculum">{lang === 'en' ? 'Programme & Curriculum' : '课程与学制'}</option>
                  <option value="technical">{lang === 'en' ? 'Technical Support' : '技术支持'}</option>
                  <option value="other">{lang === 'en' ? 'Other' : '其他'}</option>
                </select>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={lang === 'en' ? 'Your message...' : '请输入您的留言...'}
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-white font-black text-xs uppercase tracking-widest py-4 hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {status === 'submitting'
                    ? (lang === 'en' ? 'Sending...' : '发送中...')
                    : (lang === 'en' ? 'Send Message' : '发送留言')}
                </button>
                {status === 'error' && (
                  <p className="text-xs text-red-500 font-medium text-center">
                    {lang === 'en' ? 'Something went wrong. Please email us directly.' : '发送失败，请直接发送邮件给我们。'}
                  </p>
                )}
                <p className="text-center text-[10px] text-muted-foreground font-medium leading-relaxed">
                  {lang === 'en'
                    ? 'By submitting, you agree that Pickering Global Campus may contact you regarding your enquiry, handled per our '
                    : '提交即表示您同意 Pickering Global Campus 就您的咨询与您联系，依照我们的'}
                  <Link to="/privacy-policy" className="font-bold text-primary underline underline-offset-4">
                    {lang === 'en' ? 'Privacy Policy' : '隐私政策'}
                  </Link>
                  {lang === 'en' ? '.' : '进行处理。'}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon, label, value, href, external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-primary shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm font-bold text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
        className="block hover:text-primary transition-colors group">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}
