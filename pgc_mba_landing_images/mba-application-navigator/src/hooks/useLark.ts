import { useState } from 'react';

export type Lead = {
  name: string;
  email: string;
  phone: string;
  intake: string;
  score: number;
  tags: string[];
  lang: string;
  timestamp: string;
};

export function useLark() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pushToLark = async (lead: Lead) => {
    setIsSubmitting(true);
    console.log('Pushing to Lark CRM:', lead);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would be a fetch to an Express endpoint
    // that interacts with Lark APIs.
    
    setIsSubmitting(false);
    return { success: true };
  };

  return { pushToLark, isSubmitting };
}
