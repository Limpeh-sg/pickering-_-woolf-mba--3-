import type { LeadRecord } from './database.js';

const LARK_WEBHOOK_URL = process.env.LARK_WEBHOOK_URL || '';

const formTypeLabel: Record<LeadRecord['formType'], string> = {
  apply: '立即申请',
  consult: '联系顾问',
  brochure: '下载简章',
  contact: '联系表单',
  'smart-guide': 'MBA 智能助手',
};

export async function notifyLark(lead: LeadRecord): Promise<{ success: boolean; error?: string }> {
  if (!LARK_WEBHOOK_URL) {
    return { success: true };
  }

  try {
    const response = await fetch(LARK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msg_type: 'text',
        content: {
          text: [
            'New Pickering MBA Lead',
            '',
            `Type: ${formTypeLabel[lead.formType]} (${lead.formType})`,
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Phone: ${lead.phone}`,
            `Experience: ${lead.experience}`,
            lead.industry ? `Industry: ${lead.industry}` : '',
            lead.source ? `Source: ${lead.source}` : '',
            `Created: ${new Date(lead.createdAt).toLocaleString('en-SG', { timeZone: 'Asia/Singapore' })}`,
          ].filter(Boolean).join('\n'),
        },
      }),
    });

    if (!response.ok) {
      return { success: false, error: `Lark webhook failed with ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown Lark webhook error',
    };
  }
}
