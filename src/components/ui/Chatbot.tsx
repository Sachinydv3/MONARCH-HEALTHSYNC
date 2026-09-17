import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, HeartPulse } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

const HEALTH_KNOWLEDGE_BASE: Record<string, string> = {
  "appointment": "You can book an appointment through our Patient App. Simply click 'Get Started' and follow the registration steps to schedule a visit with a healthcare provider.",
  "universal id": "The Universal Health ID is a unique identifier that stores your medical records securely, making them accessible across different healthcare providers for better continuity of care.",
  "screening": "Our smart screening process helps in early detection of health issues. It uses a digital triage system to prioritize patients based on the urgency of their symptoms.",
  "services": "Monarch HealthSync offers teleconsultations, digital health records, smart screening, and district-level health administration tools.",
  "help": "I can help you with information about booking appointments, understanding Universal Health IDs, our screening process, or general app services. What would you like to know?",
  "hello": "Hello! I'm your Monarch Health Assistant. How can I help you with your digital health journey today?",
  "hi": "Hi there! I'm your Monarch Health Assistant. How can I help you today?",
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Monarch Health Assistant. How can I help you with your digital health journey today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMsg = generateResponse(text);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        text: botMsg,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }, 800);
  };

  const generateResponse = (text: string): string => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('appointment') || lowerText.includes('book')) return HEALTH_KNOWLEDGE_BASE['appointment'];
    if (lowerText.includes('id') || lowerText.includes('universal')) return HEALTH_KNOWLEDGE_BASE['universal id'];
    if (lowerText.includes('screening') || lowerText.includes('triage')) return HEALTH_KNOWLEDGE_BASE['screening'];
    if (lowerText.includes('service') || lowerText.includes('what do you do')) return HEALTH_KNOWLEDGE_BASE['services'];
    if (lowerText.includes('hello') || lowerText.includes('hi')) return HEALTH_KNOWLEDGE_BASE['hello'];
    if (lowerText.includes('help')) return HEALTH_KNOWLEDGE_BASE['help'];

    return "I'm not sure I understand that. Could you please rephrase your question? You can ask me about appointments, Universal Health IDs, screening, or our services.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all animate-bounce-slow group relative"
        >
          <MessageCircle size={32} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-ping" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          {/* Header */}
          <div className="bg-primary p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none">Health Assistant</h3>
                <span className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online | Digital Health Expert
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8FAFC]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.sender === 'user' ? "bg-slate-200 text-slate-600" : "bg-primary-light text-primary"
                )}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.sender === 'user'
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                )}>
                  {msg.text}
                  <div className={cn(
                    "text-[10px] mt-1 opacity-70",
                    msg.sender === 'user' ? "text-right" : "text-left"
                  )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          <div className="px-6 py-3 bg-white border-t border-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
            {['Book Appointment', 'Universal Health ID', 'Screening Process'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSend(suggestion)}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full hover:bg-primary-light hover:text-primary transition-colors border border-slate-200"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Ask about your health services..."
                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Button
                className="rounded-2xl p-3 h-auto w-auto"
                onClick={() => handleSend(inputValue)}
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
