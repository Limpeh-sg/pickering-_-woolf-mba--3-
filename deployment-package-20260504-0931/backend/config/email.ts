import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'admissions@pickering.education';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admissions@pickering.education';

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('⚠️  Outlook SMTP credentials are not fully configured');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER && SMTP_PASS ? {
    user: SMTP_USER,
    pass: SMTP_PASS,
  } : undefined,
});

interface EmailData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  industry?: string;
  formType: 'apply' | 'consult' | 'brochure';
}

const getSubjectByType = (type: string): string => {
  const subjects: Record<string, string> = {
    apply: 'Application Received - Pickering MBA',
    consult: 'Consultation Request Confirmed - Pickering MBA',
    brochure: 'Brochure Download Confirmed - Pickering MBA',
  };
  return subjects[type] || 'Thank You - Pickering MBA';
};

const getUserMessageByType = (type: string, name: string): string => {
  const messages: Record<string, string> = {
    apply: `Dear ${name},\n\nThank you for submitting your application to the Pickering Global Campus MBA program. We have received your information and will review it shortly.\n\nOur admissions team will contact you within 2-3 business days with next steps.\n\nBest regards,\nPickering Global Campus Admissions Team`,
    consult: `Dear ${name},\n\nThank you for requesting a consultation with our MBA program team. We appreciate your interest in Pickering Global Campus.\n\nOur academic advisors will reach out to you within 24 hours to schedule a suitable time for your consultation.\n\nBest regards,\nPickering Global Campus`,
    brochure: `Dear ${name},\n\nThank you for requesting our MBA brochure. We've sent the detailed program information to your email.\n\nIf you have any questions about our program, feel free to reach out to us at admissions@pickering.education or via WhatsApp at +65 8982 0800.\n\nBest regards,\nPickering Global Campus`,
  };
  return messages[type] || `Dear ${name},\n\nThank you for your interest in Pickering Global Campus MBA program.`;
};

const getAdminMessageByType = (type: string, data: EmailData): string => {
  return `New ${type.toUpperCase()} Submission:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nExperience: ${data.experience}\n${data.industry ? `Industry: ${data.industry}` : ''}\n\nPlease follow up with this lead.`;
};

export async function sendFormEmails(data: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const userMessage = {
      to: data.email,
      from: FROM_EMAIL,
      subject: getSubjectByType(data.formType),
      text: getUserMessageByType(data.formType, data.name),
      replyTo: ADMIN_EMAIL,
    };

    const adminMessage = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `[NEW ${data.formType.toUpperCase()}] ${data.name}`,
      text: getAdminMessageByType(data.formType, data),
      replyTo: data.email,
    };

    // If SMTP is not configured, just log instead of failing local form tests.
    if (!SMTP_USER || !SMTP_PASS) {
      console.log('📧 Email would be sent (Outlook SMTP not configured):');
      console.log('User message:', userMessage);
      console.log('Admin message:', adminMessage);
      return { success: true };
    }

    await Promise.all([
      transporter.sendMail(userMessage),
      transporter.sendMail(adminMessage),
    ]);

    console.log(`✅ Emails sent successfully for ${data.formType} submission`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error sending emails:', errorMessage);
    return { success: false, error: errorMessage };
  }
}
