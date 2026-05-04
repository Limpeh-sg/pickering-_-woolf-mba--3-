import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Send, Sparkles } from 'lucide-react';

interface ChatAssistantProps {
  lang: 'en' | 'zh';
}

type MsgRole = 'bot' | 'user';
interface Msg { id: string; role: MsgRole; text: string; ts: number }

type ChatState =
  | 'main'
  | 'career' | 'eligibility' | 'fees' | 'recognition'
  | 'schedule' | 'materials' | 'intake' | 'family' | 'brochure' | 'other'
  | 'collect-name' | 'collect-phone' | 'collect-email' | 'done';

interface Persisted {
  messages: Msg[];
  chatState: ChatState;
  minimised: boolean;
  open: boolean;
  collecting: Partial<{ name: string; phone: string; email: string }>;
}

const STORAGE_KEY = 'pgc_chat_v3';

// ── Copy (no emojis) ──────────────────────────────────────────────────────────
const copy = {
  en: {
    agentName: 'Pickering Global Campus MBA Assistant',
    tagline: 'Ask freely — we\'re here.',
    greeting: [
      "Hello — thank you for visiting Pickering Global Campus.",
      "We offer an MBA programme in partnership with Woolf University: a fully online, globally recognised degree built for working professionals.",
      "I am here to help. Please choose a topic below and I will do my best to get you the right answer.",
    ],
    mainOptions: [
      { key: 'career',      text: 'Career goals' },
      { key: 'eligibility', text: 'Can I apply?' },
      { key: 'fees',        text: 'Fees & scholarships' },
      { key: 'recognition', text: 'Degree recognition' },
      { key: 'schedule',    text: 'Study while working' },
      { key: 'materials',   text: 'Application documents' },
      { key: 'intake',      text: 'Intake dates' },
      { key: 'family',      text: 'Explaining to family or employer' },
      { key: 'brochure',    text: 'Request a brochure' },
      { key: 'other',       text: 'Something else' },
    ],
    topics: {
      career: {
        reply: [
          "Our MBA is designed for professionals who want to lead — whether that means moving into management, changing industries, or building the confidence to drive business strategy.",
          "Students come from finance, technology, healthcare, and consulting across more than 60 countries. The curriculum focuses on real-world application, not theory-heavy exams.",
          "Would you like to speak with an admissions advisor about how the programme fits your goals?",
        ],
        options: [
          { key: 'collect', text: 'Yes, connect me with an advisor' },
          { key: 'fees',    text: 'Tell me about the fees first' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
      eligibility: {
        reply: [
          "There are several pathways into the programme:",
          "— Bachelor's degree in any discipline, plus professional experience\n— Diploma with 3 or more years of relevant business experience\n— 7 or more years of senior professional experience\n— 12 or more years of highly relevant experience (performance-based admission)\n— Non-English degrees are accepted with an English proficiency test",
          "Not sure whether you qualify? Our advisors can review your background — no obligation at all.",
        ],
        options: [
          { key: 'collect', text: 'Have an advisor review my background' },
          { key: 'fees',    text: 'What are the fees?' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
      fees: {
        reply: [
          "The total programme fee is SGD 9,800, paid across four instalments during your study period.",
          "We offer four merit-based scholarships of up to 50 percent: Academic Excellence, Global Awareness, Community Impact, and Women in Business. These are assessed automatically at the point of admission — no separate application needed.",
          "There is also an optional Singapore Residency Week at an additional fee. Would you like us to send you a personalised fee breakdown?",
        ],
        options: [
          { key: 'collect',     text: 'Yes, send me the fee details' },
          { key: 'recognition', text: 'Tell me about degree recognition' },
          { key: 'main',        text: 'Back to topics' },
        ],
      },
      recognition: {
        reply: [
          "The degree is awarded by Woolf University, which is licensed by the Malta Further and Higher Education Authority (MFHEA licence 2019-015).",
          "The qualification sits within the European Qualifications Framework at Level 7, carries 90 ECTS credits, and is Europass-compatible.",
          "Please note: specific recognition in your country, by your employer, or for immigration purposes will depend on the receiving institution or government body. Our advisors can provide written materials to help you explain this clearly.",
        ],
        options: [
          { key: 'collect', text: 'Request a written recognition summary' },
          { key: 'fees',    text: 'What does it cost?' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
      schedule: {
        reply: [
          "The programme is 100 percent online with no fixed lecture times. You study at your own pace around your job and family commitments.",
          "Most students complete in 12 to 18 months. A 24-month track is also available.",
          "There are no written examinations. Assessment is through assignments and project work. Live cohort sessions and office hours are available but optional.",
        ],
        options: [
          { key: 'collect',     text: 'Talk to an advisor about my schedule' },
          { key: 'eligibility', text: 'Check whether I qualify' },
          { key: 'main',        text: 'Back to topics' },
        ],
      },
      materials: {
        reply: [
          "A standard application requires the following:",
          "— Official degree certificate and transcripts\n— Professional CV\n— Passport-size photo and ID\n— English proficiency evidence (if your degree was not taught in English)",
          "Missing something? Our advisors can help you prepare. Just let us know your situation and we will guide you through it.",
        ],
        options: [
          { key: 'collect', text: 'Get help with my application' },
          { key: 'intake',  text: 'When is the next intake?' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
      intake: {
        reply: [
          "We run four intakes per year. The next intake is:",
          "July 2026 — application deadline 19 May 2026.",
          "After that: October 2026. Applications are reviewed on a rolling basis — the earlier you apply, the better your chance of scholarship consideration.",
        ],
        options: [
          { key: 'collect', text: 'Apply for July 2026' },
          { key: 'fees',    text: 'Tell me about fees first' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
      family: {
        reply: [
          "We understand that decisions like this often involve the people around you.",
          "We can provide written materials — in English or Chinese — that clearly explain the degree, its recognition, and the cost structure. These are designed to be shared with a family member, HR department, or employer.",
          "Would you like us to prepare a summary you can share?",
        ],
        options: [
          { key: 'collect', text: 'Yes, send me materials to share' },
          { key: 'fees',    text: 'Include a fee breakdown please' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
      brochure: {
        reply: [
          "Of course. We have a full programme brochure, a one-page summary, a fees and scholarship sheet, and an application checklist.",
          "Please leave your email address and we will send the full pack to your inbox within a few minutes.",
        ],
        options: [
          { key: 'collect', text: 'Send me the brochure pack' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
      other: {
        reply: [
          "Of course — I am happy to help with any question.",
          "Please type your question below, or if you would prefer to speak directly with a member of our admissions team, I can connect you right away.",
        ],
        options: [
          { key: 'collect', text: 'Connect me with an advisor' },
          { key: 'main',    text: 'Back to topics' },
        ],
      },
    },
    collect: {
      name:  "To connect you with an advisor, may I have your name please?",
      phone: (name: string) => `Thank you, ${name}. What is the best phone number or WhatsApp to reach you?`,
      email: "And your email address?",
      done:  (name: string) => `Thank you, ${name}. An advisor will be in touch within 24 hours. Please feel free to ask anything else in the meantime.`,
    },
    inputPlaceholder: 'Type a message...',
    online: 'Online now',
  },
  zh: {
    agentName: '皮克林全球校园 MBA 小助手',
    tagline: '问就对了，比你想的快。',
    greeting: [
      "您好，感谢您访问 Pickering Global Campus。",
      "我们与 Woolf 大学合作开设全在线工商管理硕士课程，面向全球在职专业人士，学历获国际认可。",
      "我很乐意为您解答任何问题。请从下方选择您感兴趣的话题，我将竭尽所能为您提供最合适的解答。",
    ],
    mainOptions: [
      { key: 'career',      text: '职业目标' },
      { key: 'eligibility', text: '我是否符合申请条件' },
      { key: 'fees',        text: '学费与奖学金' },
      { key: 'recognition', text: '学历认可情况' },
      { key: 'schedule',    text: '在职学习安排' },
      { key: 'materials',   text: '申请材料' },
      { key: 'intake',      text: '开课批次与截止日期' },
      { key: 'family',      text: '向家人或公司说明' },
      { key: 'brochure',    text: '索取课程手册' },
      { key: 'other',       text: '其他问题' },
    ],
    topics: {
      career: {
        reply: [
          "我们的 MBA 专为有志于晋升、转型或建立商业领导力的在职专业人士设计。",
          "来自金融、科技、医疗、咨询等领域、遍布 60 多个国家的学员在此共同学习，课程注重实践应用，而非应试考核。",
          "您希望与招生顾问预约沟通，了解课程如何契合您的职业规划吗？",
        ],
        options: [
          { key: 'collect', text: '是的，请为我联系顾问' },
          { key: 'fees',    text: '先告诉我学费情况' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
      eligibility: {
        reply: [
          "本课程提供多种申请路径：",
          "— 任何专业本科学位及工作经验\n— 专科学历加 3 年以上相关商业经验\n— 7 年以上资深从业经验\n— 12 年以上高度相关经验（绩效考核入学）\n— 非英文授课学位者可通过英文测试申请",
          "不确定是否符合条件？招生顾问可为您进行初步背景评估，完全无义务。",
        ],
        options: [
          { key: 'collect', text: '请顾问评估我的申请背景' },
          { key: 'fees',    text: '学费是多少？' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
      fees: {
        reply: [
          "课程总学费为 SGD 9,800，分四期支付，贯穿整个学习周期。",
          "我们提供四类绩效奖学金，最高可减免 50%：学术卓越奖、全球视野奖、社区影响奖及女性领导力奖。奖学金在入学审核时自动评估，无需单独申请。",
          "此外还有可选的新加坡研学周，另行收费。需要为您准备一份详细的费用说明吗？",
        ],
        options: [
          { key: 'collect',     text: '是的，请发送费用详情' },
          { key: 'recognition', text: '学历认可情况如何？' },
          { key: 'main',        text: '返回话题列表' },
        ],
      },
      recognition: {
        reply: [
          "该学位由 Woolf 大学授予，Woolf 持有马耳他继续教育与高等教育管理局颁发的运营许可证（MFHEA 许可证 2019-015）。",
          "本资历处于欧洲学历框架（EQF）第 7 级，含 90 个 ECTS 学分，并兼容 Europass。",
          "请注意：在特定国家、具体雇主或移民机构的认可情况，取决于各接收机构的自身政策。招生顾问可提供正式说明材料，帮助您清晰地向相关方解释。",
        ],
        options: [
          { key: 'collect', text: '索取书面认可说明材料' },
          { key: 'fees',    text: '学费是多少？' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
      schedule: {
        reply: [
          "课程 100% 在线，无固定直播时间，您可完全按照自己的工作和家庭节奏灵活安排学习。",
          "大多数学员在 12 至 18 个月内完成，也可选择 24 个月节奏。",
          "课程无书面统考，考核通过作业和项目完成。直播答疑和小组学习均为选修，不强制参加。",
        ],
        options: [
          { key: 'collect',     text: '咨询顾问了解我的学习安排' },
          { key: 'eligibility', text: '确认我是否符合申请条件' },
          { key: 'main',        text: '返回话题列表' },
        ],
      },
      materials: {
        reply: [
          "标准申请材料包括：",
          "— 本科学位证书及成绩单\n— 个人简历\n— 证件照及身份证明\n— 若学位非英文授课，需提供英文能力证明",
          "材料不完整也没关系，招生顾问可以帮助您逐步准备，请随时告知您的具体情况。",
        ],
        options: [
          { key: 'collect', text: '获得申请材料准备帮助' },
          { key: 'intake',  text: '下一批次是什么时候？' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
      intake: {
        reply: [
          "我们每年开设四个招生批次。最近一期为：",
          "2026 年 7 月——申请截止日期为 2026 年 5 月 19 日。",
          "此后为 2026 年 10 月批次。申请实行滚动制，越早申请，奖学金评审机会越大。",
        ],
        options: [
          { key: 'collect', text: '申请 2026 年 7 月入学' },
          { key: 'fees',    text: '先了解学费情况' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
      family: {
        reply: [
          "我们非常理解，许多重要决定都需要考虑身边人的意见与支持。",
          "我们可以为您准备中英文版本的书面说明材料，清晰呈现课程认证、学历认可及费用结构，方便您转发给家人或公司 HR。",
          "需要我们为您准备一份可以直接分享的摘要吗？",
        ],
        options: [
          { key: 'collect', text: '是的，请发送可分享的材料' },
          { key: 'fees',    text: '请同时附上费用说明' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
      brochure: {
        reply: [
          "当然。我们有完整课程手册、一页摘要、学费与奖学金说明，以及申请材料清单。",
          "请留下您的邮箱，我们将在几分钟内把完整资料包发送至您的邮箱。",
        ],
        options: [
          { key: 'collect', text: '发送完整手册资料包' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
      other: {
        reply: [
          "当然，我很乐意帮您解答任何问题。",
          "请在下方输入您的问题；如果您希望直接与招生团队沟通，我可以立即为您安排。",
        ],
        options: [
          { key: 'collect', text: '联系招生顾问' },
          { key: 'main',    text: '返回话题列表' },
        ],
      },
    },
    collect: {
      name:  "为了方便联系，请问您怎么称呼？",
      phone: (name: string) => `谢谢您，${name}。请问您方便接受联系的手机号码或 WhatsApp 是？`,
      email: "好的，请问您的邮箱地址是？",
      done:  (name: string) => `非常感谢，${name}。招生顾问将在 24 小时内与您联系。如有其他问题，请随时继续提问。`,
    },
    inputPlaceholder: '输入消息...',
    online: '在线',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function mkId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

function loadPersisted(): Persisted | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function savePersisted(p: Persisted) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

const DEFAULT_STATE: Persisted = {
  messages: [],
  chatState: 'main',
  minimised: false,
  open: false,
  collecting: {},
};

type QueuePhase = 'queued' | 'connecting' | 'online';

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatAssistant({ lang }: ChatAssistantProps) {
  const t = copy[lang];
  const [persisted, setPersistedRaw] = useState<Persisted>(() => loadPersisted() || DEFAULT_STATE);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [queuePhase, setQueuePhase] = useState<QueuePhase>('online');
  const [pastHero, setPastHero] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hide launcher while user is still in the hero zone
  useEffect(() => {
    const check = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const setPersisted = useCallback((updater: (prev: Persisted) => Persisted) => {
    setPersistedRaw(prev => {
      const next = updater(prev);
      savePersisted(next);
      return next;
    });
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [persisted.messages, typing]);

  // Periodic bubble
  useEffect(() => {
    const show = () => { setShowBubble(true); setTimeout(() => setShowBubble(false), 4000); };
    const t1 = setTimeout(show, 9000);
    const interval = setInterval(show, 35000);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  const openChat = () => {
    setPersisted(p => ({ ...p, open: true, minimised: false }));
    if (persisted.messages.length === 0) {
      // Queue animation: queued → connecting → online → greeting
      setQueuePhase('queued');
      setTimeout(() => setQueuePhase('connecting'), 1500);
      setTimeout(() => {
        setQueuePhase('online');
        sendBotSequence(t.greeting, 'main');
      }, 2300);
    }
  };

  const minimise = () => setPersisted(p => ({ ...p, minimised: true }));
  const close    = () => setPersisted(p => ({ ...p, open: false }));
  const restore  = () => setPersisted(p => ({ ...p, open: true, minimised: false }));

  // Send bot messages with staggered typing delay, append inline options after last message
  const sendBotSequence = useCallback(
    (lines: string[], nextState?: ChatState, inlineOptions?: { key: string; text: string }[]) => {
      let delay = 300;
      lines.forEach((line, i) => {
        const isLast = i === lines.length - 1;
        setTimeout(() => {
          setTyping(true);
          const typingDuration = Math.min(line.length * 16, 1100);
          setTimeout(() => {
            setTyping(false);
            setPersistedRaw(prev => {
              const msg: Msg = { id: mkId(), role: 'bot', text: line, ts: Date.now() };
              const next: Persisted = {
                ...prev,
                messages: [...prev.messages, msg],
                chatState: isLast && nextState ? nextState : prev.chatState,
              };
              // Append options marker after last message
              if (isLast && inlineOptions) {
                next.messages = [
                  ...next.messages,
                  { id: mkId() + '_opts', role: 'bot', text: '__OPTIONS__', ts: Date.now() },
                ];
              }
              savePersisted(next);
              return next;
            });
          }, typingDuration);
        }, delay);
        delay += Math.min(line.length * 16, 1100) + 250;
      });
    },
    []
  );

  const pickOption = (key: string, label: string) => {
    // Add user message
    setPersisted(p => ({
      ...p,
      messages: [...p.messages, { id: mkId(), role: 'user', text: label, ts: Date.now() }],
    }));

    if (key === 'main') {
      const backMsg = lang === 'en'
        ? 'Of course. Here are the topics I can help you with:'
        : '好的，以下是我可以帮助您的话题：';
      sendBotSequence([backMsg], 'main', t.mainOptions);
      return;
    }

    if (key === 'collect') {
      setPersisted(p => ({ ...p, chatState: 'collect-name' }));
      sendBotSequence([t.collect.name]);
      return;
    }

    const topicKey = key as keyof typeof t.topics;
    const topic = t.topics[topicKey];
    if (topic) {
      setPersisted(p => ({ ...p, chatState: topicKey as ChatState }));
      sendBotSequence(topic.reply, topicKey as ChatState, topic.options);
    }
  };

  const handleSend = () => {
    const txt = inputVal.trim();
    if (!txt) return;
    setInputVal('');

    setPersisted(p => ({
      ...p,
      messages: [...p.messages, { id: mkId(), role: 'user', text: txt, ts: Date.now() }],
    }));

    const { chatState, collecting } = persisted;

    if (chatState === 'collect-name') {
      setPersisted(p => ({ ...p, collecting: { ...p.collecting, name: txt }, chatState: 'collect-phone' }));
      sendBotSequence([t.collect.phone(txt)]);
    } else if (chatState === 'collect-phone') {
      setPersisted(p => ({ ...p, collecting: { ...p.collecting, phone: txt }, chatState: 'collect-email' }));
      sendBotSequence([t.collect.email]);
    } else if (chatState === 'collect-email') {
      const name = collecting.name || (lang === 'en' ? 'there' : '您');
      setPersisted(p => ({ ...p, collecting: { ...p.collecting, email: txt }, chatState: 'done' }));
      sendBotSequence([t.collect.done(name)]);
      submitLead({ ...collecting, email: txt });
    } else {
      const fallback = lang === 'en'
        ? "Thank you for your message. Let me connect you with one of our admissions advisors who will be able to help you further."
        : "感谢您的留言。我来为您联系招生顾问，他们将进一步为您提供帮助。";
      const followUp = lang === 'en'
        ? "May I have your name please?"
        : "请问您怎么称呼？";
      setPersisted(p => ({ ...p, chatState: 'collect-name' }));
      sendBotSequence([fallback, followUp]);
    }
  };

  const submitLead = async (info: Partial<{ name: string; phone: string; email: string }>) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      await fetch(`${apiUrl}/api/consult`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'smart-guide',
          name: info.name || '',
          firstName: (info.name || '').split(' ')[0],
          lastName: (info.name || '').split(' ').slice(1).join(' '),
          email: info.email || '',
          phone: info.phone || '',
          experience: '',
          source: 'chat-widget',
          notes: `Chat widget. Language: ${lang}`,
        }),
      });
    } catch {}
  };

  // Determine which options to render inline for the CURRENT state
  const currentInlineOptions = (): { key: string; text: string }[] => {
    const { chatState } = persisted;
    if (chatState === 'main') return t.mainOptions;
    const topicKey = chatState as keyof typeof t.topics;
    if (t.topics[topicKey]) return (t.topics[topicKey] as any).options;
    return [];
  };

  const showInput = !['done'].includes(persisted.chatState);
  const { open, minimised, messages } = persisted;

  // Check if last message in chat is the options marker
  const lastRealMessages = messages.filter(m => m.text !== '__OPTIONS__');
  const hasOptionsMarker = messages.length > 0 && messages[messages.length - 1].text === '__OPTIONS__';

  return (
    <>
      {/* ── Launcher button (original frosted-glass style) ── */}
      <AnimatePresence>
        {pastHero && (!open || minimised) && (
          <motion.div
            key="launcher-wrap"
            className="fixed bottom-44 right-6 md:bottom-40 md:right-10 z-[60]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 1, duration: 0.5, type: 'spring' }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* "Need help?" bubble */}
            <AnimatePresence>
              {showBubble && !open && (
                <motion.div
                  initial={{ opacity: 0, x: 16, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16, scale: 0.85 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-2xl border border-primary/10 whitespace-nowrap pointer-events-none"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-xs font-black text-foreground">
                      {lang === 'en' ? 'Need help?' : '需要帮助吗？'}
                    </span>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[7px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[7px] border-l-white" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button — original frosted glass */}
            <motion.button
              onClick={minimised ? restore : openChat}
              className="relative w-14 h-14 rounded-full overflow-hidden group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.80) 100%)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.5)',
              }}
            >
              <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                <img src="/favicon-new.png" alt="" className="w-9 h-9 object-contain" />
              </div>
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, transparent 50%, rgba(255,255,255,0.3) 100%)' }}
              />
              <motion.div
                className="absolute top-2 right-2 w-2.5 h-2.5 bg-secondary rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && !minimised && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[58] md:hidden bg-black/55"
              onClick={minimise}
            />

            <motion.div
              key="chatpanel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={[
                'fixed z-[59] bg-white flex flex-col overflow-hidden',
                // Mobile: bottom sheet, full width, 60vh
                'bottom-0 left-0 right-0 h-[62vh] rounded-t-3xl',
                // Desktop: floating window bottom-right
                'md:bottom-6 md:left-auto md:right-10 md:w-[380px] md:h-[560px] md:rounded-2xl md:rounded-br-sm',
              ].join(' ')}
            >
              {/* Header */}
              <div className="bg-primary text-white px-4 py-3 flex items-center gap-3 shrink-0 rounded-t-3xl md:rounded-t-2xl">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    <img src="/favicon-new.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <AnimatePresence mode="wait">
                    {queuePhase === 'online' ? (
                      <motion.span
                        key="online-dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-primary"
                      />
                    ) : (
                      <motion.span
                        key="queue-dot"
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-primary"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Name + tagline + status — grows to fill space */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p className="font-black text-[11px] leading-none truncate">{t.agentName}</p>
                    <p className="text-[9px] text-white/50 italic font-medium leading-none hidden sm:block whitespace-nowrap">{(t as any).tagline}</p>
                  </div>
                  {/* Dynamic status */}
                  <AnimatePresence mode="wait">
                    {queuePhase === 'queued' && (
                      <motion.p
                        key="queued"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[9px] text-amber-300 mt-0.5 font-medium"
                      >
                        {lang === 'en' ? '1 person ahead — almost your turn...' : '前方 1 人排队，马上轮到您...'}
                      </motion.p>
                    )}
                    {queuePhase === 'connecting' && (
                      <motion.p
                        key="connecting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[9px] text-white/60 mt-0.5 font-medium"
                      >
                        {lang === 'en' ? 'Connecting...' : '连接中...'}
                      </motion.p>
                    )}
                    {queuePhase === 'online' && (
                      <motion.p
                        key="online"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] text-green-300 mt-0.5 font-medium"
                      >
                        {lang === 'en' ? 'Online now' : '在线'}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <button onClick={minimise} className="w-8 h-8 flex items-center justify-center hover:bg-white/15 rounded-full transition-colors" aria-label="Minimise">
                    <Minus className="w-4 h-4" />
                  </button>
                  <button onClick={close} className="w-8 h-8 flex items-center justify-center hover:bg-white/15 rounded-full transition-colors" aria-label="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages — all content including options scrolls here */}
              <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-2.5 bg-[#f0f4f8]">

                {messages.map((msg, idx) => {
                  if (msg.text === '__OPTIONS__') {
                    // Render inline option chips — part of the chat flow
                    const opts = currentInlineOptions();
                    // Only show options for the last __OPTIONS__ marker
                    const isLatest = messages.slice(idx + 1).every(m => m.text === '__OPTIONS__' || false);
                    if (!isLatest && idx !== messages.length - 1) return null;
                    return (
                      <div key={msg.id} className="flex justify-start pl-8">
                        <div className="flex flex-wrap gap-1.5 max-w-[88%]">
                          {opts.map(opt => (
                            <button
                              key={opt.key}
                              onClick={() => pickOption(opt.key, opt.text)}
                              className="px-3 py-1.5 rounded-full border border-primary/30 bg-white text-primary text-xs font-bold hover:bg-primary hover:text-white hover:border-primary transition-all whitespace-nowrap"
                            >
                              {opt.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                      {msg.role === 'bot' && (
                        <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mb-0.5">
                          <img src="/favicon-new.png" alt="" className="w-4 h-4 object-contain" />
                        </div>
                      )}
                      <div
                        className={[
                          'max-w-[80%] px-3.5 py-2.5 text-sm font-medium leading-relaxed whitespace-pre-line',
                          msg.role === 'user'
                            ? 'bg-primary text-white rounded-2xl rounded-br-sm'
                            : 'bg-white text-foreground rounded-2xl rounded-bl-sm',
                        ].join(' ')}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {/* Options for initial state (before any __OPTIONS__ marker) */}
                {persisted.chatState === 'main' && messages.length > 0 && !hasOptionsMarker && !typing && (
                  <div className="flex justify-start pl-8">
                    <div className="flex flex-wrap gap-1.5 max-w-[88%]">
                      {t.mainOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => pickOption(opt.key, opt.text)}
                          className="px-3 py-1.5 rounded-full border border-primary/30 bg-white text-primary text-xs font-bold hover:bg-primary hover:text-white hover:border-primary transition-all whitespace-nowrap"
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Typing dots */}
                {typing && (
                  <div className="flex justify-start items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <img src="/favicon-new.png" alt="" className="w-4 h-4 object-contain" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ delay: i * 0.15, duration: 0.55, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Text input bar */}
              {showInput && (
                <div className="px-3 py-2.5 border-t border-border/10 bg-white shrink-0 flex gap-2 items-center">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={t.inputPlaceholder}
                    className="flex-1 bg-[#f0f4f8] rounded-full px-4 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputVal.trim()}
                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-35 hover:bg-primary/90 transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
