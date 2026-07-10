import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Send, X, Mic, MicOff, Volume2, VolumeX, Settings, Key, 
  Copy, Check, RotateCcw, FileText, ExternalLink, Sparkles, ChevronDown 
} from 'lucide-react';
import { aiKnowledge } from '../data/aiKnowledge';

// Message types
interface Message {
  id: string;
  role: 'user' | 'model' | 'system_alert';
  text: string;
  timestamp: string;
}

// Custom Markdown Renderer Component
const CustomMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed font-sans text-gray-200">
      {parts.map((part, idx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.split('\n');
          const lang = lines[0].replace('```', '').trim() || 'code';
          const code = lines.slice(1, -1).join('\n');

          return (
            <div key={idx} className="my-3 rounded-xl border border-white/10 bg-zinc-950/70 overflow-hidden font-mono text-xs shadow-inner">
              <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-zinc-900/50 text-gray-400">
                <span className="uppercase text-[10px] font-bold tracking-wider text-blue-400">{lang}</span>
                <button
                  onClick={() => handleCopy(code)}
                  className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
                  title="Copy Code"
                >
                  {copiedCode === code ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-medium"><Check size={11} /> Copied</span>
                  ) : (
                    <Copy size={11} />
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-blue-300 select-text">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        const lines = part.split('\n');
        return (
          <div key={idx} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lIdx} className="h-1" />;

              if (trimmed.startsWith('### ')) {
                return <h4 key={lIdx} className="text-sm font-bold text-white mt-3 mb-1 font-heading">{parseInline(trimmed.slice(4))}</h4>;
              }
              if (trimmed.startsWith('## ')) {
                return <h3 key={lIdx} className="text-base font-bold text-white mt-4 mb-2 font-heading">{parseInline(trimmed.slice(3))}</h3>;
              }
              if (trimmed.startsWith('# ')) {
                return <h2 key={lIdx} className="text-lg font-bold text-white mt-4 mb-2 font-heading">{parseInline(trimmed.slice(2))}</h2>;
              }

              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-1 my-0.5">
                    <span className="text-blue-400 mt-1.5 text-[8px]">✦</span>
                    <span className="text-gray-300 flex-1">{parseInline(trimmed.slice(2))}</span>
                  </div>
                );
              }

              return <p key={lIdx} className="text-gray-300 leading-relaxed">{parseInline(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};

const parseInline = (text: string): React.ReactNode[] => {
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 font-mono text-[11px]">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const label = match[1];
        const url = match[2];
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium underline inline-flex items-center gap-0.5 cursor-pointer focus:outline-none"
          >
            {label}
            <i className="fa-solid fa-up-right-from-square text-[9px]" />
          </a>
        );
      }
    }
    return part;
  });
};

const AIPortfolioAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakEnabled, setIsSpeakEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Suggested questions chips list
  const suggestedQuestions = [
    "Who are you?",
    "Tell me about yourself",
    "Show your projects",
    "What technologies do you use?",
    "What is InterviewIQ?",
    "Tell me about BFIT",
    "Explain your robotics experience",
    "Download Resume",
    "How can I contact you?",
    "Why should someone hire you?",
    "Show GitHub",
    "LinkedIn",
    "Achievements"
  ];

  // Retrieve current active API key
  const activeKey = useMemo(() => {
    // Check config-defined environment keys
    try {
      if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
        return process.env.GEMINI_API_KEY;
      }
      if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        return process.env.API_KEY;
      }
    } catch (e) {}
    
    return '';
  }, []);

  // Responsive UI check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // System Instruction detailing Yash's Knowledge base
  const systemInstructionText = useMemo(() => {
    return `You are Yash Gupta's AI Portfolio Assistant, representing Yash in a professional, friendly, confident, and highly helpful tone. 
Your core role is to act as his representative to recruiters, colleagues, and visitors on his portfolio website.
Always answer questions as if you are Yash himself (e.g. use "I", "my projects", "my skills"). Never speak in third person. Never say "As an AI..." or "I am an AI assistant representing Yash...". Just speak directly as Yash Gupta.

Here is your exact Knowledge Base:
- Name: Yash Gupta
- Role: ${aiKnowledge.role}
- Tagline: ${aiKnowledge.tagline}
- About: ${aiKnowledge.aboutMe}
- Email: ${aiKnowledge.email}
- GitHub: ${aiKnowledge.githubUrl}
- LinkedIn: ${aiKnowledge.linkedinUrl}
- Resume Link: ${aiKnowledge.resumeUrl}

Education:
${aiKnowledge.education.map(edu => `- ${edu.degree} at ${edu.institution} (${edu.timeline}). Details: ${edu.details}`).join('\n')}

Skills & Technologies:
${aiKnowledge.skills.map(skill => `- ${skill.category}: ${skill.items.join(', ')}`).join('\n')}

Projects:
${aiKnowledge.projects.map(proj => `
* Title: ${proj.title}
  - Problem: ${proj.problem}
  - Solution: ${proj.solution}
  - Features: ${proj.features.join('; ')}
  - Tech Stack: ${proj.techStack.join(', ')}
  - Challenges: ${proj.challenges}
  - Learnings: ${proj.learnings}
  - GitHub: ${proj.github}
  - Live Demo: ${proj.demo}
`).join('\n')}

Experience:
${aiKnowledge.experience.map(exp => `- ${exp.role} at ${exp.organization} (${exp.timeline}). Duties: ${exp.details.join('; ')}`).join('\n')}

Hackathons:
${aiKnowledge.hackathons.map(h => `- ${h.title}: Secured ${h.achievement} in ${h.date} with project "${h.project}". Team: ${h.team}. Details: ${h.details}`).join('\n')}

Achievements:
${aiKnowledge.achievements.map(a => `- ${a}`).join('\n')}

Future Goals: ${aiKnowledge.futureGoals}
Why Hire Me: ${aiKnowledge.whyHireMe}

CRITICAL RULES:
1. NEVER HALLUCINATE OR CREATE FACTS. If the requested information is not in the knowledge base, politely say exactly: "I couldn't find that information on the portfolio."
2. Keep answers concise, conversational, and direct.
3. If the user asks to see your projects, contact, skills, resume, github, or linkedin, notify them that you are scrolling or opening the page (e.g. "I'm scrolling to my projects section now!" or "I'm opening my LinkedIn profile in a new window."):
   - For "Resume", the UI will trigger a download/open.
   - For "Projects", the UI will scroll to the projects grid.
   - For "Contact", the UI will scroll to the contact terminal.
   - For "Skills" or "Technologies", the UI will scroll to the Key Technologies section.
   - For "GitHub" or "LinkedIn", the UI will open the respective profile.
Provide answers matching this configuration.`;
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => setIsListening(true);
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };
      rec.onerror = (e: any) => {
        console.error(e);
        setIsListening(false);
      };
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: "Hi there! I'm Yash's AI Assistant. Ask me anything about my projects, skills, education, hackathons, or how to contact me!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [messages]);

  // Auto-scroll on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Voice Output
  const speakText = (text: string) => {
    if (!isSpeakEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Clean markdown structure for text speaking
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '[Code block skipped]')
      .replace(/\*\*|`|#/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en'));
    if (engVoice) utterance.voice = engVoice;

    window.speechSynthesis.speak(utterance);
  };

  // Keyboard shortcut listener (Esc to close, Enter to send)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Execute UI navigation / download events based on words
  const handleClientAction = (text: string) => {
    const normalized = text.toLowerCase();
    let responseText = '';

    if (normalized.includes('resume')) {
      window.open(aiKnowledge.resumeUrl, '_blank');
      responseText = "I've opened my resume in a new tab for you to view or download!";
    } else if (normalized.includes('github')) {
      window.open(aiKnowledge.githubUrl, '_blank');
      responseText = "Opening my GitHub repository profile in a new window...";
    } else if (normalized.includes('linkedin')) {
      window.open(aiKnowledge.linkedinUrl, '_blank');
      responseText = "Opening my LinkedIn profile... Let's connect!";
    } else if (normalized.includes('project') || normalized.includes('featured work')) {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        responseText = "Scrolling down to my Featured Projects grid.";
      }
    } else if (normalized.includes('contact') || normalized.includes('hire') || normalized.includes('reach out')) {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        responseText = "Scrolling down to the Encrypted Contact Terminal.";
      }
    } else if (normalized.includes('skill') || normalized.includes('technolog')) {
      // Find skills section heading
      const headings = Array.from(document.querySelectorAll('h2'));
      const techHeading = headings.find(h => h.textContent?.includes('Key Technologies'));
      if (techHeading) {
        techHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Highlight effect on tech stack container
        const techCard = techHeading.nextElementSibling || techHeading.parentElement?.querySelector('.tech-mask');
        if (techCard) {
          techCard.classList.add('ring-2', 'ring-blue-500/50');
          setTimeout(() => {
            techCard.classList.remove('ring-2', 'ring-blue-500/50');
          }, 3000);
        }
        responseText = "Scrolling to my Key Technologies and platforms display.";
      }
    }

    if (responseText) {
      setMessages(prev => [
        ...prev,
        {
          id: `action-${Date.now()}`,
          role: 'model',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      speakText(responseText);
      return true;
    }

    return false;
  };

  // Voice recognition toggle
  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Try Chrome/Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Chat message send handler
  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = (customMessage || inputMessage).trim();
    if (!textToSend || isGenerating) return;

    if (!customMessage) setInputMessage('');

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(newMessages);

    // Stop speaking if active
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    // Check if it is a local command first
    const actionTriggered = handleClientAction(textToSend);
    if (actionTriggered) return;

    // Call Gemini API
    if (!activeKey) {
      const alertMsg: Message = {
        id: `alert-${Date.now()}`,
        role: 'system_alert',
        text: "Gemini API Key is not configured. Please define GEMINI_API_KEY in your .env.local file.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, alertMsg]);
      return;
    }

    setIsGenerating(true);
    const assistantMsgId = `assistant-${Date.now()}`;
    
    // Add temporary empty loader message
    setMessages(prev => [
      ...prev,
      {
        id: assistantMsgId,
        role: 'model',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    try {
      // Build history for conversational flow
      // Format messages in Gemini schema: role can be "user" or "model"
      const conversationHistory = newMessages
        .filter(m => m.role === 'user' || m.role === 'model')
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      // Slice to keep context size manageable (last 8 messages)
      const recentHistory = conversationHistory.slice(-8);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${activeKey}`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: recentHistory,
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          },
          generationConfig: {
            temperature: 0.15,
            maxOutputTokens: 800,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let textAccumulator = '';
      let streamBuffer = '';

      if (!reader) {
        throw new Error('Response stream not readable.');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamBuffer += chunk;

        // Parse JSON stream using the brace-matching technique
        let braceCount = 0;
        let startIndex = -1;

        for (let i = 0; i < streamBuffer.length; i++) {
          if (streamBuffer[i] === '{') {
            if (braceCount === 0) startIndex = i;
            braceCount++;
          } else if (streamBuffer[i] === '}') {
            braceCount--;
            if (braceCount === 0 && startIndex !== -1) {
              const jsonStr = streamBuffer.substring(startIndex, i + 1);
              try {
                const parsed = JSON.parse(jsonStr);
                const textVal = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (textVal) {
                  textAccumulator += textVal;
                  
                  // Update message in state
                  setMessages(prev => 
                    prev.map(m => m.id === assistantMsgId ? { ...m, text: textAccumulator } : m)
                  );
                }
              } catch (err) {
                // Ignore incomplete chunks in buffer
              }
              // Crop streamBuffer
              streamBuffer = streamBuffer.substring(i + 1);
              i = -1;
              startIndex = -1;
            }
          }
        }
      }

      // Final speech feedback triggers if speech is enabled
      speakText(textAccumulator);

    } catch (error: any) {
      console.error(error);
      setMessages(prev => 
        prev.map(m => m.id === assistantMsgId ? { 
          ...m, 
          text: "I encountered an error connecting to the AI brain. Please double-check your API key settings or network connection." 
        } : m)
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Floating AI Assistant circular button */}
      <div className="fixed bottom-6 right-6 z-[99] flex items-center justify-center">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[#0d0d12]/90 border border-blue-500/30 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(147,51,234,0.45)] hover:border-purple-500/40 backdrop-blur-md transition-all cursor-pointer focus:outline-none"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          animate={{
            boxShadow: isOpen 
              ? "0 0 0px rgba(59,130,246,0)" 
              : ["0 0 15px rgba(59,130,246,0.2)", "0 0 25px rgba(147,51,234,0.35)", "0 0 15px rgba(59,130,246,0.2)"]
          }}
          transition={{
            boxShadow: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {isOpen ? (
            <X size={22} className="text-gray-300" />
          ) : (
            <div className="relative">
              <Bot size={22} className="text-blue-400" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Main Glassmorphism Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: isMobile ? 0 : 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: isMobile ? 0 : 40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className={`fixed z-[9998] bg-[#07070a]/75 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden font-sans
              ${isMobile 
                ? 'inset-0 w-full h-full rounded-none' 
                : 'bottom-24 right-6 w-[410px] h-[590px] rounded-[24px]'
              }`}
          >
            {/* Top Bar Header */}
            <div className="px-5 py-4 border-b border-white/10 bg-[#030306]/80 flex justify-between items-center flex-shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Bot size={20} className="animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#030306]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide font-heading flex items-center gap-1.5">
                    AI Portfolio Assistant
                    <Sparkles size={11} className="text-purple-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-gray-400">Ask anything about Yash</p>
                </div>
              </div>

              {/* Utility Panel Controls */}
              <div className="flex items-center gap-1.5">
                {/* Voice Synthesis toggle */}
                <button
                  onClick={() => setIsSpeakEnabled(!isSpeakEnabled)}
                  className={`p-2 rounded-lg transition-colors border focus:outline-none ${
                    isSpeakEnabled 
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                      : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-gray-300'
                  }`}
                  title={isSpeakEnabled ? "Mute Voice Output" : "Enable Voice Output"}
                >
                  {isSpeakEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-colors focus:outline-none"
                  title="Close Assistant"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Inner Content Area */}
            <div className="flex-1 overflow-hidden relative flex flex-col">

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 select-text">
                {messages.map((message) => {
                  if (message.role === 'system_alert') {
                    return (
                      <div key={message.id} className="flex justify-center my-2">
                        <div className="bg-amber-950/40 border border-amber-500/20 text-amber-300 rounded-xl px-4 py-2.5 text-xs text-center max-w-[85%] font-mono leading-normal shadow-sm">
                          {message.text}
                        </div>
                      </div>
                    );
                  }

                  const isModel = message.role === 'model';
                  return (
                    <div key={message.id} className={`flex gap-3 ${isModel ? 'justify-start' : 'justify-end'}`}>
                      {isModel && (
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                          <Bot size={15} />
                        </div>
                      )}
                      
                      <div className="flex flex-col space-y-1 max-w-[78%]">
                        <div className={`px-4 py-3 rounded-2xl border text-sm leading-relaxed shadow-sm
                          ${isModel 
                            ? 'bg-white/[0.02] border-white/5 text-gray-200 rounded-tl-sm' 
                            : 'bg-blue-600 border-blue-500 text-white rounded-tr-sm'
                          }`}
                        >
                          {message.text ? (
                            <CustomMarkdown content={message.text} />
                          ) : (
                            /* Message typing anim loader */
                            <div className="flex items-center gap-1 py-1.5 px-0.5">
                              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          )}
                        </div>
                        <span className={`text-[9px] text-gray-500 font-mono px-1 ${!isModel && 'text-right'}`}>
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Horizontal Scroll Suggestion Chips */}
              <div className="px-5 py-2 flex gap-2 overflow-x-auto scrollbar-none flex-shrink-0 select-none border-t border-white/5 bg-[#030306]/20">
                <style dangerouslySetInnerHTML={{__html: `
                  .scrollbar-none::-webkit-scrollbar { display: none; }
                  .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
                `}} />
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    disabled={isGenerating}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.03] text-gray-400 hover:text-white hover:bg-blue-500/5 hover:border-blue-500/20 text-xs transition-all focus:outline-none cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Message input bar */}
            <div className="p-4 border-t border-white/10 bg-[#030306]/75 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1 flex items-center bg-white/[0.03] border border-white/10 rounded-xl focus-within:border-blue-500/40 transition-all">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask me anything..."}
                    disabled={isGenerating}
                    autoFocus
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none w-full"
                  />
                  
                  {/* Voice input mic toggle */}
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`p-2 rounded-lg mr-2 transition-colors focus:outline-none ${
                      isListening 
                        ? 'text-red-400 bg-red-950/20 animate-pulse' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                    title={isListening ? "Stop voice listening" : "Speak message"}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isGenerating}
                  className={`p-3 rounded-xl flex items-center justify-center transition-all focus:outline-none cursor-pointer ${
                    inputMessage.trim() && !isGenerating
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white/[0.02] border border-white/5 text-gray-600'
                  }`}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIPortfolioAssistant;
