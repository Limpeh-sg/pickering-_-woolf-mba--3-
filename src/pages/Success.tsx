import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

interface SuccessPageProps {
  lang: 'en' | 'zh';
}

type FormType = 'apply' | 'consult' | 'brochure';

export default function SuccessPage({ lang }: SuccessPageProps) {
  const [searchParams] = useSearchParams();
  const [emailStatus, setEmailStatus] = useState<'sending' | 'sent'>('sending');

  const formType = (searchParams.get('type') || 'apply') as FormType;

  const getMessages = () => {
    const messages: Record<FormType, Record<'en' | 'zh', { title: string; body: string; notification: string }>> = {
      apply: {
        en: {
          title: 'Thank You!',
          body: 'Your application has been received. Our admissions team will review it and contact you within 2-3 business days.',
          notification: 'Application Received Notification',
        },
        zh: {
          title: '感谢您!',
          body: '我们已收到您的申请。招生团队将审核您的申请，并在2-3个工作日内与您联系。',
          notification: '已收到申请通知',
        },
      },
      consult: {
        en: {
          title: 'Thank You!',
          body: 'Your consultation request has been received. Our academic advisors will contact you within 24 hours to schedule a meeting.',
          notification: 'Consultation Request Received',
        },
        zh: {
          title: '感谢您!',
          body: '我们已收到您的咨询预约请求。学术顾问将在24小时内与您联系以安排时间。',
          notification: '已收到咨询预约通知',
        },
      },
      brochure: {
        en: {
          title: 'Thank You!',
          body: 'Your brochure request has been received. The course brochure has been sent to your email address.',
          notification: 'Brochure Sent Notification',
        },
        zh: {
          title: '感谢您!',
          body: '我们已收到您的手册申请。课程手册已发送至您的电子邮箱。',
          notification: '已发送手册通知',
        },
      },
    };

    return messages[formType][lang];
  };

  const messages = getMessages();

  useEffect(() => {
    // Simulate system sending email notification
    const timer = setTimeout(() => {
      setEmailStatus('sent');
      console.log(`✅ ${messages.notification} sent to admissions@pickering.education`);
    }, 1500);
    return () => clearTimeout(timer);
  }, [messages.notification]);

  return (
    <>
      <BackButton />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-32">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-10 md:p-16 text-left shadow-2xl shadow-primary/10 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />

          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mb-10 relative z-10">
            <CheckCircle2 size={40} />
          </div>

          <h1 className="section-heading mb-6">
            {messages.title}
          </h1>

          <p className="text-lg md:text-xl font-medium text-muted-foreground mb-12 leading-relaxed">
            {messages.body}
          </p>

          <div className="space-y-6 pt-8 border-t border-border/10">
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  emailStatus === 'sent' ? 'bg-primary text-white' : 'bg-primary/10 text-primary animate-pulse'
                }`}
              >
                <Mail size={20} />
              </div>
              <div>
                <p className="font-black text-sm text-foreground">
                  {emailStatus === 'sent'
                    ? (lang === 'en' ? 'Notification Sent' : '通知已发送')
                    : (lang === 'en' ? 'Sending Notification...' : '正在发送通知...')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  to admissions@pickering.education
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-3 text-primary font-black text-sm hover:gap-5 transition-all pt-4"
            >
              <ArrowLeft size={16} />
              {lang === 'en' ? 'Back to Home' : '返回首页'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
      </>
  );
}
