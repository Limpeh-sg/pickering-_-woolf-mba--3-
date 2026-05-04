import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export interface LeadRecord {
  id: string;
  formType: 'apply' | 'consult' | 'brochure' | 'contact' | 'chat-assistant';
  name: string;
  email: string;
  phone: string;
  experience: string;
  industry?: string;
  source?: string;
  createdAt: string;
}

const dataDir = process.env.DATABASE_DIR || path.resolve(process.cwd(), 'data');
const leadsFile = process.env.LEADS_FILE || path.join(dataDir, 'leads.jsonl');

export async function saveLead(record: Omit<LeadRecord, 'id' | 'createdAt'>): Promise<LeadRecord> {
  await mkdir(dataDir, { recursive: true });

  const lead: LeadRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...record,
  };

  await appendFile(leadsFile, `${JSON.stringify(lead)}\n`, 'utf8');
  return lead;
}
