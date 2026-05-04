import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface ChatAssistantProps {
  lang: 'en' | 'zh';
}

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface UserData {
  degree?: string;
  experience?: string;
  industry?: string;
  currency?: string;
  scholarship?: string;
  intake?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export default function ChatAssistant({ lang }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      welcome: "Welcome! How can I help you today?",
      mainMenu: "Please choose an option:\n\n1. Am I eligible?\n2. Programme fees\n3. Scholarships\n4. Start dates\n5. Application materials\n6. Online learning\n7. Degree recognition\n8. Curriculum\n9. Talk to advisor\n10. Download brochure",
      
      eligibility: {
        q1: "Do you have a bachelor's degree?\n\n1. Yes\n2. No, but I have work experience",
        q2: "Years of work experience?\n\n1. 0-2 years\n2. 3-5 years\n3. 5+ years",
        result: "You appear eligible!\n\nNext step:\n1. Check fees\n2. See scholarships\n3. Talk to advisor",
      },
      
      fees: {
        info: "Programme Fee: SGD 9,800\nPayment: 4 instalments\nScholarships: Up to 50% off\n\nWhat's next?\n1. Check scholarships\n2. Talk to advisor\n3. Back to menu",
      },
      
      scholarship: {
        info: "Up to 50% Scholarships:\n\n• Academic Excellence\n• Global Awareness\n• Community Impact\n• Women in Business\n\nEvaluated at admission.\n\n1. Talk to advisor\n2. Back to menu",
      },
      
      intake: {
        info: "Upcoming Intakes:\n\n• July 2026 (Deadline: 19 May)\n• October 2026 (Deadline: 15 Aug)\n• January 2027 (Deadline: 20 Nov)\n\n1. Talk to advisor\n2. Back to menu",
      },
      
      contact: {
        intro: "Let's connect you with an advisor!\n\nReady?\n1. Yes, book consultation\n2. Back to menu",
        askName: "Your full name?",
        askEmail: "Your email?",
        askPhone: "Your phone (WhatsApp)?",
        success: "Done! An advisor will contact you within 24 hours.\n\nReference: MBA-{ref}",
      },
      
      brochure: {
        info: "Download our brochure:\n\n1. Get download link\n2. Back to menu",
      },
      
      invalidInput: "Please enter a number from the options shown.",
      backToMenu: "Back to main menu",
    },
    zh: {
      welcome: "您好！请问有什么可以帮到您？",
      mainMenu: "请选择选项：\n\n1. 我符合条件吗？\n2. 课程费用\n3. 奖学金\n4. 开学时间\n5. 申请材料\n6. 在线学习\n7. 学位认可\n8. 课程内容\n9. 咨询顾问\n10. 下载手册",
      
      eligibility: {
        q1: "您有学士学位吗？\n\n1. 有\n2. 没有，但有工作经验",
        q2: "工作经验年限？\n\n1. 0-2 年\n2. 3-5 年\n3. 5 年以上",
        result: "您符合申请条件！\n\n下一步：\n1. 查看费用\n2. 了解奖学金\n3. 咨询顾问",
      },
      
      fees: {
        info: "课程费用：9,800 新元\n付款方式：4 期分期\n奖学金：最高 50% 减免\n\n下一步：\n1. 查看奖学金\n2. 咨询顾问\n3. 返回菜单",
      },
      
      scholarship: {
        info: "最高 50% 奖学金：\n\n• 学术卓越\n• 全球视野\n• 社区影响\n• 女性领导力\n\n录取时自动评估。\n\n1. 咨询顾问\n2. 返回菜单",
      },
      
      intake: {
        info: "即将开学：\n\n• 2026年7月（截止：5月19日）\n• 2026年10月（截止：8月15日）\n• 2027年1月（截止：11月20日）\n\n1. 咨询顾问\n2. 返回菜单",
      },
      
      contact: {
        intro: "让我们为您联系顾问！\n\n准备好了吗？\n1. 是的，预约咨询\n2. 返回菜单",
        askName: "您的全名？",
        askEmail: "您的邮箱？",
        askPhone: "您的电话（WhatsApp）？",
        success: "完成！顾问将在 24 小时内联系您。\n\n参考编号：MBA-{ref}",
      },
      
      brochure: {
        info: "下载课程手册：\n\n1. 获取下载链接\n2. 返回菜单",
      },
      
      invalidInput: "请输入显示选项中的数字。",
      backToMenu: "返回主菜单",
    }
  };

  const t = content[lang];
  const [conversationRound, setConversationRound] = useState(0);
  const maxRounds = 5;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(t.welcome);
      setTimeout(() => addBotMessage(t.mainMenu), 800);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'bot',
      text,
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date()
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    addUserMessage(userInput);
    setInput('');
    
    if (conversationRound < maxRounds) {
      setConversationRound(prev => prev + 1);
    }

    await processUserInput(userInput);
  };

  const processUserInput = async (input: string) => {
    // Main menu (step 0)
    if (currentStep === 0) {
      switch(input) {
        case '1': // Eligibility
          setCurrentStep(1);
          setTimeout(() => addBotMessage(t.eligibility.q1), 500);
          break;
        case '2': // Fees
          setCurrentStep(2);
          setTimeout(() => addBotMessage(t.fees.info), 500);
          break;
        case '3': // Scholarships
          setCurrentStep(3);
          setTimeout(() => addBotMessage(t.scholarship.info), 500);
          break;
        case '4': // Intakes
          setCurrentStep(4);
          setTimeout(() => addBotMessage(t.intake.info), 500);
          break;
        case '9': // Contact advisor
          setCurrentStep(9);
          setTimeout(() => addBotMessage(t.contact.intro), 500);
          break;
        case '10': // Brochure
          setCurrentStep(10);
          setTimeout(() => addBotMessage(t.brochure.info), 500);
          break;
        default:
          setTimeout(() => addBotMessage(t.invalidInput), 500);
      }
    }
    // Eligibility flow
    else if (currentStep === 1) {
      if (!userData.degree) {
        setUserData({...userData, degree: input});
        setTimeout(() => addBotMessage(t.eligibility.q2), 500);
      } else if (!userData.experience) {
        setUserData({...userData, experience: input});
        setTimeout(() => addBotMessage(t.eligibility.result), 500);
        setCurrentStep(1.5);
      } else {
        handleEligibilityNext(input);
      }
    }
    // Fees follow-up
    else if (currentStep === 2) {
      if (input === '1') {
        setCurrentStep(3);
        setTimeout(() => addBotMessage(t.scholarship.info), 500);
      } else if (input === '2') {
        setCurrentStep(9);
        setTimeout(() => addBotMessage(t.contact.intro), 500);
      } else if (input === '3') {
        backToMainMenu();
      }
    }
    // Scholarship follow-up
    else if (currentStep === 3) {
      if (input === '1') {
        setCurrentStep(9);
        setTimeout(() => addBotMessage(t.contact.intro), 500);
      } else if (input === '2') {
        backToMainMenu();
      }
    }
    // Intake follow-up
    else if (currentStep === 4) {
      if (input === '1') {
        setCurrentStep(9);
        setTimeout(() => addBotMessage(t.contact.intro), 500);
      } else if (input === '2') {
        backToMainMenu();
      }
    }
    // Contact flow
    else if (currentStep === 9) {
      if (input === '1') {
        setCurrentStep(9.1);
        setTimeout(() => addBotMessage(t.contact.askName), 500);
      } else if (input === '2') {
        backToMainMenu();
      }
    }
    else if (currentStep === 9.1) {
      setUserData({...userData, name: input});
      setCurrentStep(9.2);
      setTimeout(() => addBotMessage(t.contact.askEmail), 500);
    }
    else if (currentStep === 9.2) {
      setUserData({...userData, email: input});
      setCurrentStep(9.3);
      setTimeout(() => addBotMessage(t.contact.askPhone), 500);
    }
    else if (currentStep === 9.3) {
      setUserData({...userData, phone: input});
      await submitToLark();
    }
    // Brochure
    else if (currentStep === 10) {
      if (input === '1') {
        setCurrentStep(9);
        setTimeout(() => addBotMessage(t.contact.intro), 500);
      } else if (input === '2') {
        backToMainMenu();
      }
    }
  };

  const handleEligibilityNext = (input: string) => {
    if (input === '1') {
      setCurrentStep(2);
      setTimeout(() => addBotMessage(t.fees.info), 500);
    } else if (input === '2') {
      setCurrentStep(3);
      setTimeout(() => addBotMessage(t.scholarship.info), 500);
    } else if (input === '3') {
      setCurrentStep(9);
      setTimeout(() => addBotMessage(t.contact.intro), 500);
    }
  };

  const backToMainMenu = () => {
    setCurrentStep(0);
    setTimeout(() => addBotMessage(t.mainMenu), 500);
  };

  const submitToLark = async () => {
    setIsSubmitting(true);

    const degreeLabels: Record<string, string> = { '1': 'Yes', '2': 'No, but has experience' };
    const experienceLabels: Record<string, string> = { '1': '0-2 years', '2': '3-5 years', '3': '5+ years' };

    const detailedNotes = `
MBA Chat Assistant Conversation:
- Education: ${degreeLabels[userData.degree || ''] || userData.degree || 'Not provided'}
- Work Experience: ${experienceLabels[userData.experience || ''] || userData.experience || 'Not provided'}
- Conversation Rounds: ${conversationRound}
- Language: ${lang === 'en' ? 'English' : 'Chinese'}
- Source: Chat Assistant Widget
    `.trim();

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      await fetch(`${apiUrl}/api/consult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: userData.name?.split(' ')[0] || '',
          lastName: userData.name?.split(' ').slice(1).join(' ') || '',
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          experience: experienceLabels[userData.experience || ''] || userData.experience,
          formType: 'chat-assistant',
          notes: detailedNotes
        }),
      });
    } catch (error) {
      console.error('Submission error:', error);
    }

    setIsSubmitting(false);
    const ref = Date.now().toString().slice(-6);
    const successMsg = t.contact.success.replace('{ref}', ref);
    setTimeout(() => addBotMessage(successMsg), 500);
    setCurrentStep(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Modern Glass Button */}
      <motion.div
        className="fixed bottom-44 right-6 md:bottom-40 md:right-10 z-[55]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full overflow-hidden shadow-xl group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 2px rgba(255,255,255,1)',
          }}
        >
          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity">
            <img 
              src="/favicon-new.png" 
              alt="" 
              className="w-8 h-8 object-contain"
            />
          </div>
          
          {/* Glass reflection */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, transparent 40%, rgba(255,255,255,0.4) 100%)'
            }}
          />

          {/* Active indicator */}
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full shadow-md"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.button>

        <AnimatePresence>
          {showNotification && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 4px 16px rgba(31, 38, 135, 0.12)',
              }}
            >
              <span className="text-sm font-bold text-foreground">
                {lang === 'en' ? 'Need assistance?' : '需要帮助吗？'}
              </span>
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px]"
                style={{ borderLeftColor: 'rgba(255,255,255,0.98)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />
            
            {/* Modern Glass Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed z-[101] overflow-hidden flex flex-col
                         bottom-0 left-0 right-0 h-[50vh] rounded-t-3xl
                         md:bottom-6 md:right-6 md:left-auto md:w-[400px] md:h-[600px] md:rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 20px 60px rgba(31, 38, 135, 0.15), inset 0 1px 2px rgba(255,255,255,1)',
              }}
            >
              {/* Header */}
              <div className="p-4 border-b border-border/10 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.6)',
                      boxShadow: '0 4px 12px rgba(31, 38, 135, 0.1)',
                    }}
                  >
                    <img src="/favicon-new.png" alt="" className="w-6 h-6 object-contain opacity-70" />
                  </div>
                  <div>
                    <h2 className="font-black text-base text-foreground">
                      {lang === 'en' ? 'Admissions Assistant' : '招生助手'}
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium">
                      {lang === 'en' ? 'Online' : '在线'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.type === 'user'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'rounded-bl-md'
                      }`}
                      style={msg.type === 'bot' ? {
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      } : {}}
                    >
                      <p className={`text-sm font-medium whitespace-pre-line leading-relaxed ${
                        msg.type === 'user' ? 'text-white' : 'text-foreground'
                      }`}>
                        {msg.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSubmitting}
                    placeholder={
                      lang === 'en' 
                        ? 'Type number...' 
                        : '输入数字...'
                    }
                    className="flex-1 px-4 py-3 rounded-xl border border-border/20 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm bg-white/50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isSubmitting}
                    className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
