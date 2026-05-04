import { Router, Request, Response } from 'express';
import { sendFormEmails } from '../config/email.js';
import { saveLead } from '../config/database.js';
import { notifyLark } from '../config/lark.js';

const router = Router();

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  experience?: string;
  industry?: string;
  lastName?: string;
  firstName?: string;
}

const validateFormData = (data: FormData): { valid: boolean; error?: string } => {
  const name = data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim();
  const email = data.email;
  const phone = data.phone;
  const experience = data.experience;

  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return { valid: false, error: 'Valid email is required' };
  }

  if (!phone || phone.trim().length === 0) {
    return { valid: false, error: 'Phone number is required' };
  }

  if (!experience || experience.trim().length === 0) {
    return { valid: false, error: 'Experience level is required' };
  }

  return { valid: true };
};

const handleFormSubmission = async (
  req: Request,
  res: Response,
  formType: 'apply' | 'consult' | 'brochure' | 'contact' | 'chat-assistant'
) => {
  try {
    const { name, email, phone, experience, industry, firstName, lastName } = req.body as FormData;

    // Validate
    const validation = validateFormData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    const fullName = name || `${firstName || ''} ${lastName || ''}`.trim();

    const lead = await saveLead({
      name: fullName,
      email: email!,
      phone: phone!,
      experience: experience!,
      industry,
      formType,
      source: req.get('origin') || req.get('referer') || 'unknown',
    });

    const larkResult = await notifyLark(lead);
    if (!larkResult.success) {
      console.warn('Lark notification failed:', larkResult.error);
    }

    const emailResult = await sendFormEmails({
      name: fullName,
      email: email!,
      phone: phone!,
      experience: experience!,
      industry,
      formType,
    });

    if (!emailResult.success) {
      console.warn('Email notification failed:', emailResult.error);
    }

    return res.status(200).json({
      success: true,
      message: `${formType} form submitted successfully`,
      data: {
        name: fullName,
        email,
        formType,
        leadId: lead.id,
        larkNotified: larkResult.success,
        emailNotified: emailResult.success,
        timestamp: lead.createdAt,
      },
    });
  } catch (error) {
    console.error(`Error processing ${formType} form:`, error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

// Routes
router.post('/apply', async (req: Request, res: Response) => {
  await handleFormSubmission(req, res, 'apply');
});

router.post('/consult', async (req: Request, res: Response) => {
  await handleFormSubmission(req, res, 'consult');
});

router.post('/brochure', async (req: Request, res: Response) => {
  await handleFormSubmission(req, res, 'brochure');
});

router.post('/contact', async (req: Request, res: Response) => {
  await handleFormSubmission(req, res, 'contact');
});

router.post('/chat-assistant', async (req: Request, res: Response) => {
  await handleFormSubmission(req, res, 'chat-assistant');
});

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Forms API is running' });
});

export default router;
