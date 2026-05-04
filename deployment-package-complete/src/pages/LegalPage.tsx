import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  lang: 'en' | 'zh';
  page: 'privacy' | 'data' | 'terms' | 'sitemap';
}

const titles: Record<LegalPageProps['page'], { en: string; zh: string }> = {
  privacy: { en: 'Privacy Policy',       zh: '隐私政策' },
  data:    { en: 'Personal Data Policy', zh: '个人数据政策' },
  terms:   { en: 'Terms of Use',         zh: '使用条款' },
  sitemap: { en: 'Sitemap',              zh: '网站地图' },
};

const sitemapLinks = [
  { to: '/',                    label: { en: 'Home',                  zh: '首页' } },
  { to: '/apply',               label: { en: 'Apply Now',             zh: '立即申请' } },
  { to: '/consult',             label: { en: 'Book a Consultation',   zh: '预约咨询' } },
  { to: '/brochure',            label: { en: 'Download Brochure',     zh: '下载手册' } },
  { to: '/grant',               label: { en: 'Scholarships',          zh: '奖学金申请' } },
  { to: '/faculty',             label: { en: 'Faculty',               zh: '师资团队' } },
  { to: '/contact',             label: { en: 'Contact Us',            zh: '联系我们' } },
  { to: '/privacy-policy',      label: { en: 'Privacy Policy',        zh: '隐私政策' } },
  { to: '/personal-data-policy',label: { en: 'Personal Data Policy',  zh: '个人数据政策' } },
  { to: '/terms-of-use',        label: { en: 'Terms of Use',          zh: '使用条款' } },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-black text-foreground">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function PrivacyContent({ lang }: { lang: 'en' | 'zh' }) {
  if (lang === 'zh') return (
    <div className="space-y-8">
      <p className="text-xs text-muted-foreground">最后更新：2025 年 1 月 1 日</p>
      <Section title="1. 数据控制方">
        <p>Pickering School OÜ（爱沙尼亚注册编号：17359066，以下简称"Pickering Global Campus"、"我们"）为本网站及 MBA 课程相关个人数据的控制方，电子邮件：admissions@pickering.education。</p>
      </Section>
      <Section title="2. 我们收集哪些数据">
        <p>当您提交申请、咨询或下载手册等表单时，我们收集以下信息：</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>姓名与联系方式（电子邮件、电话）</li>
          <li>工作经验年限及所属行业</li>
          <li>浏览器类型、IP 地址及页面访问来源（用于网站分析）</li>
        </ul>
      </Section>
      <Section title="3. 数据使用目的">
        <p>我们将所收集的数据用于以下目的：</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>回应您的咨询并处理入学申请</li>
          <li>发送课程相关信息及招生通知</li>
          <li>改善网站功能与用户体验</li>
          <li>履行法律合规义务</li>
        </ul>
      </Section>
      <Section title="4. 法律依据">
        <p>我们依据以下法律依据处理您的个人数据：合同履行（GDPR 第 6(1)(b) 条）、合法利益（GDPR 第 6(1)(f) 条）及您明确给予的同意（GDPR 第 6(1)(a) 条）。</p>
      </Section>
      <Section title="5. 数据共享">
        <p>我们不向第三方出售您的个人数据。我们仅在以下情形下与可信赖的服务提供商共享数据：电子邮件服务提供商（Microsoft 365）、内部团队通讯工具（Lark/Feishu），以及法律法规要求的情形。所有第三方须遵守适用的数据保护法规。</p>
      </Section>
      <Section title="6. 数据保留期限">
        <p>我们将在您提交申请后保留您的数据最长 3 年，或在您要求删除时予以删除。</p>
      </Section>
      <Section title="7. 您的权利">
        <p>根据 GDPR 的规定，您享有以下权利：查阅、更正、删除您的个人数据，以及限制或反对数据处理，以及数据可携带权。如需行使上述权利，请发送电子邮件至 admissions@pickering.education。</p>
      </Section>
      <Section title="8. 政策变更">
        <p>我们可能不时更新本隐私政策。若发生重大变更，我们将在网站上发布通知。继续使用本网站即视为接受更新后的政策。</p>
      </Section>
    </div>
  );

  return (
    <div className="space-y-8">
      <p className="text-xs text-muted-foreground">Last updated: 1 January 2025</p>
      <Section title="1. Data Controller">
        <p>Pickering School OÜ (Estonian Registration Code: 17359066), operating as Pickering Global Campus ("we", "us"), is the data controller for personal information collected through this website and MBA programme enquiries. Contact: admissions@pickering.education.</p>
      </Section>
      <Section title="2. What We Collect">
        <p>When you submit an application, consultation, or brochure request form, we collect:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Name and contact details (email address, phone number)</li>
          <li>Professional experience and industry</li>
          <li>Browser type, IP address, and referring page (for analytics)</li>
        </ul>
      </Section>
      <Section title="3. How We Use Your Data">
        <p>We use the information collected to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Respond to enquiries and process admission applications</li>
          <li>Send programme information and admissions updates</li>
          <li>Improve website functionality and user experience</li>
          <li>Fulfil legal and regulatory obligations</li>
        </ul>
      </Section>
      <Section title="4. Legal Basis for Processing">
        <p>We process your personal data on the basis of: performance of a contract (GDPR Art. 6(1)(b)), legitimate interests (GDPR Art. 6(1)(f)), and your explicit consent where applicable (GDPR Art. 6(1)(a)).</p>
      </Section>
      <Section title="5. Data Sharing">
        <p>We do not sell your personal data. We share data only with trusted service providers necessary to operate our admissions process — including Microsoft 365 (email delivery) and Lark/Feishu (internal team notifications) — all bound by applicable data protection obligations. We may also disclose data where required by law.</p>
      </Section>
      <Section title="6. Retention">
        <p>We retain your information for up to 3 years following your initial enquiry, or until you request deletion — whichever comes first.</p>
      </Section>
      <Section title="7. Your Rights">
        <p>Under GDPR, you have the right to access, rectify, erase, restrict, or object to the processing of your personal data, as well as the right to data portability. To exercise any of these rights, please contact us at admissions@pickering.education.</p>
      </Section>
      <Section title="8. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. Material changes will be notified via a notice on this website. Continued use of the site following any update constitutes acceptance of the revised policy.</p>
      </Section>
    </div>
  );
}

function PersonalDataContent({ lang }: { lang: 'en' | 'zh' }) {
  if (lang === 'zh') return (
    <div className="space-y-8">
      <p className="text-xs text-muted-foreground">最后更新：2025 年 1 月 1 日</p>
      <Section title="1. 适用范围">
        <p>本个人数据政策适用于 Pickering School OÜ（以下简称"我们"）通过 Pickering Global Campus 网站及招生相关渠道收集、存储和处理的所有个人数据。本政策与我们的隐私政策共同构成我们数据保护框架的完整内容。</p>
      </Section>
      <Section title="2. 数据分类">
        <p>我们处理以下类别的个人数据：</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>身份数据：</strong>姓名、称谓</li>
          <li><strong>联系数据：</strong>电子邮件地址、电话号码</li>
          <li><strong>职业数据：</strong>工作经验年限、所属行业</li>
          <li><strong>技术数据：</strong>IP 地址、浏览器信息、访问来源页面</li>
        </ul>
      </Section>
      <Section title="3. 数据安全">
        <p>我们采用行业标准技术措施保护您的个人数据，包括：传输加密（TLS/HTTPS）、访问控制，以及仅限需要知悉的人员可查阅相关数据。</p>
      </Section>
      <Section title="4. 数据存储地点">
        <p>您的数据主要存储在欧洲经济区（EEA）内的服务器上。在将数据传输至 EEA 以外地区时，我们确保采取适当的数据保护措施，包括适当性认定或标准合同条款。</p>
      </Section>
      <Section title="5. Cookie 及追踪技术">
        <p>我们的网站可能使用 Cookie 用于功能性目的（如会话管理）及分析目的（如了解用户行为）。您可通过浏览器设置拒绝或删除 Cookie，但这可能影响部分网站功能的正常使用。</p>
      </Section>
      <Section title="6. 联系方式">
        <p>如对本政策有任何疑问，或需提交数据主体权利请求，请联系：admissions@pickering.education。</p>
      </Section>
    </div>
  );

  return (
    <div className="space-y-8">
      <p className="text-xs text-muted-foreground">Last updated: 1 January 2025</p>
      <Section title="1. Scope">
        <p>This Personal Data Policy governs the collection, storage, and processing of all personal data by Pickering School OÜ ("we", "us") through the Pickering Global Campus website and admissions channels. It should be read alongside our Privacy Policy.</p>
      </Section>
      <Section title="2. Categories of Data Processed">
        <p>We process the following categories of personal data:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Identity data:</strong> name, salutation</li>
          <li><strong>Contact data:</strong> email address, phone number</li>
          <li><strong>Professional data:</strong> years of experience, industry sector</li>
          <li><strong>Technical data:</strong> IP address, browser information, referring URL</li>
        </ul>
      </Section>
      <Section title="3. Data Security">
        <p>We implement industry-standard technical measures to protect your personal data, including TLS/HTTPS encryption in transit, access controls, and need-to-know data access restrictions.</p>
      </Section>
      <Section title="4. Data Storage Location">
        <p>Your data is primarily stored on servers located within the European Economic Area (EEA). Where transfers outside the EEA are necessary, we ensure appropriate safeguards are in place, including adequacy decisions or Standard Contractual Clauses.</p>
      </Section>
      <Section title="5. Cookies and Tracking">
        <p>Our website may use cookies for functional purposes (e.g. session management) and analytical purposes (e.g. understanding site usage). You may disable or delete cookies through your browser settings, though this may affect certain site functionality.</p>
      </Section>
      <Section title="6. Contact">
        <p>For questions regarding this policy or to submit a data subject request, contact us at: admissions@pickering.education.</p>
      </Section>
    </div>
  );
}

function TermsContent({ lang }: { lang: 'en' | 'zh' }) {
  if (lang === 'zh') return (
    <div className="space-y-8">
      <p className="text-xs text-muted-foreground">最后更新：2025 年 1 月 1 日</p>
      <Section title="1. 接受条款">
        <p>访问或使用本网站，即表示您同意受本使用条款的约束。如您不同意上述条款，请立即停止使用本网站。</p>
      </Section>
      <Section title="2. 网站用途">
        <p>本网站由 Pickering School OÜ 运营，仅供推广 Pickering Global Campus MBA 课程及为潜在申请者提供信息之用。未经我们事先书面许可，不得将本网站内容用于任何商业目的。</p>
      </Section>
      <Section title="3. 信息准确性">
        <p>我们尽力确保网站信息的准确性，但不对其完整性或时效性作出保证。课程详情、学费及日期等信息可能在不事先通知的情况下发生变更。如涉及入学事宜，请以招生团队的正式确认为准。</p>
      </Section>
      <Section title="4. 知识产权">
        <p>本网站上所有内容，包括文字、图片、图形及品牌标志，均为 Pickering School OÜ 或其许可方的财产，受版权及商标法律保护。未经明确授权，不得以任何形式复制或分发上述内容。</p>
      </Section>
      <Section title="5. 第三方链接">
        <p>本网站可能包含指向第三方网站的链接。我们对这些网站的内容或数据处理方式不承担任何责任，请在使用前查阅相关网站的隐私政策及使用条款。</p>
      </Section>
      <Section title="6. 责任限制">
        <p>在适用法律允许的最大范围内，Pickering School OÜ 不对因使用本网站或依赖其中内容而导致的任何直接或间接损失承担责任。</p>
      </Section>
      <Section title="7. 适用法律">
        <p>本使用条款受爱沙尼亚共和国法律管辖，与本条款相关的任何争议应提交爱沙尼亚塔林法院解决。</p>
      </Section>
      <Section title="8. 条款变更">
        <p>我们保留随时更新本使用条款的权利。继续使用本网站即视为您接受变更后的条款。</p>
      </Section>
    </div>
  );

  return (
    <div className="space-y-8">
      <p className="text-xs text-muted-foreground">Last updated: 1 January 2025</p>
      <Section title="1. Acceptance of Terms">
        <p>By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree, please discontinue use of the site immediately.</p>
      </Section>
      <Section title="2. Purpose of the Site">
        <p>This website is operated by Pickering School OÜ for the purpose of promoting the Pickering Global Campus MBA programme and providing information to prospective applicants. No content on this site may be used for commercial purposes without our prior written consent.</p>
      </Section>
      <Section title="3. Accuracy of Information">
        <p>We endeavour to keep all information accurate, but make no warranty as to its completeness or currency. Programme details, fees, and dates are subject to change without notice. For binding enrolment information, always rely on formal written confirmation from our admissions team.</p>
      </Section>
      <Section title="4. Intellectual Property">
        <p>All content on this site — including text, images, graphics, and brand marks — is the property of Pickering School OÜ or its licensors and is protected by applicable copyright and trademark laws. Reproduction or distribution without express written permission is prohibited.</p>
      </Section>
      <Section title="5. Third-Party Links">
        <p>This site may contain links to third-party websites. We accept no responsibility for the content or data practices of those sites. Please review their respective privacy policies and terms before use.</p>
      </Section>
      <Section title="6. Limitation of Liability">
        <p>To the maximum extent permitted by applicable law, Pickering School OÜ shall not be liable for any direct or indirect loss arising from use of this website or reliance on its content.</p>
      </Section>
      <Section title="7. Governing Law">
        <p>These Terms of Use are governed by the laws of the Republic of Estonia. Any disputes arising in connection with these terms shall be subject to the jurisdiction of the courts of Tallinn, Estonia.</p>
      </Section>
      <Section title="8. Changes to Terms">
        <p>We reserve the right to update these Terms of Use at any time. Continued use of the site constitutes acceptance of any revised terms.</p>
      </Section>
    </div>
  );
}

export default function LegalPage({ lang, page }: LegalPageProps) {
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  const title = titles[page][lang];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={14} /> {lang === 'en' ? 'Back to Home' : '返回首页'}
        </Link>

        <h1 className="text-4xl font-black tracking-tighter text-primary mb-10">{title}</h1>

        {page === 'sitemap' && (
          <ul className="space-y-3">
            {sitemapLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-bold text-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  {link.label[lang]}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {page === 'privacy' && <PrivacyContent lang={lang} />}
        {page === 'data'    && <PersonalDataContent lang={lang} />}
        {page === 'terms'   && <TermsContent lang={lang} />}
      </div>
    </div>
  );
}
