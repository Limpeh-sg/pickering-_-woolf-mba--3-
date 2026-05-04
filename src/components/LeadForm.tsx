import React, { useRef, useState } from 'react';
import { AlertCircle, Upload, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LeadFormProps {
  lang: 'en' | 'zh';
}

type FormStatus = 'idle' | 'submitting' | 'error' | 'success';

const experienceOptions = [
  { value: '<3y', en: 'Less than 3 years', zh: '3 年以下' },
  { value: '3-10y', en: '3-10 years', zh: '3-10 年' },
  { value: '10+y', en: 'More than 10 years', zh: '10 年以上' },
];

const industryOptions = [
  { value: 'business', en: 'Business / Management', zh: '商业 / 管理' },
  { value: 'finance', en: 'Finance / Banking', zh: '金融 / 银行' },
  { value: 'technology', en: 'Technology / Digital', zh: '科技 / 数字化' },
  { value: 'education', en: 'Education / Training', zh: '教育 / 培训' },
  { value: 'healthcare', en: 'Healthcare / Services', zh: '医疗 / 服务业' },
  { value: 'other', en: 'Other Industry', zh: '其他行业' },
];

export default function LeadForm({ lang }: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const industryRef = useRef<HTMLSelectElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFormType = (): 'apply' | 'consult' | 'brochure' => {
    const path = location.pathname;
    if (path === '/apply') return 'apply';
    if (path === '/consult') return 'consult';
    if (path === '/brochure') return 'brochure';
    return 'apply';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(lang === 'en' 
        ? 'File size must be less than 10MB' 
        : '文件大小必须小于 10MB');
      setStatus('error');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setUploadedFile(file);
    setError('');
    setStatus('idle');
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const firstName = firstNameRef.current?.value.trim() || '';
      const lastName = lastNameRef.current?.value.trim() || '';
      const email = emailRef.current?.value.trim() || '';
      const phone = phoneRef.current?.value.trim() || '';
      const experience = experienceRef.current?.value.trim() || '';
      const industry = industryRef.current?.value.trim() || '';
      const name = [firstName, lastName].filter(Boolean).join(' ');

      if (!firstName || !lastName || !email || !phone || !experience || !industry) {
        setError(lang === 'en' ? 'Please complete all fields.' : '请完整填写所有字段。');
        setStatus('error');
        return;
      }

      const formType = getFormType();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || `${apiUrl}/api/${formType}`;
      const recipientEmail = import.meta.env.VITE_FORM_RECIPIENT_EMAIL || 'admissions@pickering.education';
      const payload = { firstName, lastName, name, email, phone, experience, industry, formType };

      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (!response) {
        const subject = encodeURIComponent(`Pickering ${formType} enquiry from ${name}`);
        const body = encodeURIComponent(
          `Form type: ${formType}\nFirst name: ${firstName}\nLast name: ${lastName}\nEmail: ${email}\nPhone / WhatsApp: ${phone}\nExperience: ${experience}\nIndustry: ${industry}`
        );
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      } else if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus('success');
      setTimeout(() => {
        navigate(`/success?type=${formType}`);
      }, 800);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Form submission error:', message);
      setError(message);
      setStatus('error');
    }
  };

  const inputClass = 'w-full border-0 border-b-2 border-[#dbe8f7] bg-transparent px-0 py-3 text-base md:text-lg font-medium text-foreground outline-none transition-colors placeholder:text-[#adc2da] focus:border-primary';
  const selectClass = `${inputClass} cursor-pointer appearance-none text-primary`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {error && (
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input ref={firstNameRef} type="text" placeholder={lang === 'en' ? 'First Name' : '名字'} required className={inputClass} />
        <input ref={lastNameRef} type="text" placeholder={lang === 'en' ? 'Last Name' : '姓氏'} required className={inputClass} />
      </div>
      <input ref={emailRef} type="email" placeholder={lang === 'en' ? 'Email Address' : '邮箱地址'} required className={inputClass} />
      <input ref={phoneRef} type="tel" placeholder={lang === 'en' ? 'Phone / WhatsApp' : '电话 / WhatsApp'} required className={inputClass} />
      <select ref={experienceRef} required className={selectClass} defaultValue="">
        <option value="" disabled>{lang === 'en' ? 'Years of Experience...' : '工作经验年限...'}</option>
        {experienceOptions.map((option) => (
          <option key={option.value} value={option.value}>{lang === 'en' ? option.en : option.zh}</option>
        ))}
      </select>
      <select ref={industryRef} required className={selectClass} defaultValue="">
        <option value="" disabled>{lang === 'en' ? 'Select Industry...' : '选择行业...'}</option>
        {industryOptions.map((option) => (
          <option key={option.value} value={option.value}>{lang === 'en' ? option.en : option.zh}</option>
        ))}
      </select>

      {/* File Upload Section */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-primary">
          {lang === 'en' 
            ? 'Supporting Documents (Optional)' 
            : '补充材料（可选）'}
        </label>
        <p className="text-xs text-muted-foreground font-medium">
          {lang === 'en'
            ? 'Upload your CV, transcript, or other relevant documents (Max 10MB)'
            : '上传您的简历、成绩单或其他相关文件（最大 10MB）'}
        </p>
        
        {!uploadedFile ? (
          <label className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-[#dbe8f7] rounded-xl p-6 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
            <Upload className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              {lang === 'en' ? 'Click to upload file' : '点击上传文件'}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </label>
        ) : (
          <div className="flex items-center justify-between gap-3 w-full border-2 border-primary/20 bg-primary/5 rounded-xl p-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Upload className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="flex-shrink-0 p-1 hover:bg-red-100 rounded-full transition-colors"
              aria-label={lang === 'en' ? 'Remove file' : '删除文件'}
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="cta-button w-full bg-primary text-white shadow-lg shadow-primary/20 hover:bg-secondary disabled:opacity-50"
      >
        {status === 'submitting'
          ? (lang === 'en' ? 'Submitting...' : '提交中...')
          : status === 'success'
            ? (lang === 'en' ? 'Submitted!' : '已提交！')
            : (lang === 'en' ? 'Get in Touch' : '联系顾问')}
      </button>

      <div className="mx-auto max-w-2xl text-center text-[10px] leading-relaxed text-muted-foreground">
        {lang === 'en' ? (
          <p>
            By submitting this form, you agree that Pickering Global Campus may contact you about admissions,
            scholarships, intake dates, programme information, and related study options by phone, WhatsApp, or
            email. Your details are used only for student advisory and application support, and are handled
            according to our{' '}
            <Link to="/privacy-policy" className="font-bold text-primary underline underline-offset-4">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/personal-data-policy" className="font-bold text-primary underline underline-offset-4">
              Personal Data Notice
            </Link>.
          </p>
        ) : (
          <p>
            提交表单即表示您同意 Pickering Global Campus 通过电话、WhatsApp 或电子邮件与您联系，向您说明入学申请、
            奖学金、开课时间、课程信息及相关学习方案。您的资料仅用于招生咨询与申请支持，并将依照我们的
            <Link to="/privacy-policy" className="font-bold text-primary underline underline-offset-4">
              隐私政策
            </Link>
            与
            <Link to="/personal-data-policy" className="font-bold text-primary underline underline-offset-4">
              个人数据告知
            </Link>
            进行处理。
          </p>
        )}
      </div>
    </form>
  );
}
