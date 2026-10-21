import React, { useState, useRef, useEffect } from 'react';
import { copilotService, CopilotResponse } from '../services/core/CopilotService';
import { CitationLink, SafetyDisclaimer, PredictiveInsightsPanel } from '../components/healthhub/Copilot/CopilotUI';
import { cn } from '../utils/cn';

interface Message {
  id: string;
  role: 'user' | 'copilot';
  content: string;
  response?: CopilotResponse;
  timestamp: string;
}

const CopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'copilot',
      content: "Hello. I am your AI Health Copilot. I can help you analyze this patient's medical history, lab reports, and medications. How can I assist you today?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Mocking patientId for the prototype
      const response = await copilotService.askQuestion('patient_123', input);

      const copilotMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'copilot',
        content: response.answer,
        response: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, copilotMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'copilot',
        content: "I encountered an error accessing the records. Please try again.",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Context Info */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Analysis Context</h3>
          <p className="text-xs text-slate-500 mt-1">Active Records: 4</p>
        </div>
        <div className="flex-grow p-4 space-y-4 overflow-auto">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-[10px] font-bold text-blue-600 uppercase">Current Patient</p>
            <p className="text-sm font-medium text-blue-900">Rajesh Kumar</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Authorized Scope</p>
            <ul className="text-xs text-slate-600 mt-1 list-disc pl-3">
              <li>Lab Reports (Full)</li>
              <li>Clinical Notes (Drafts)</li>
              <li>Imaging (Radiology)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col relative">
        {/* Header */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">AI</div>
            <h2 className="font-bold text-slate-900">Health Copilot</h2>
          </div>
          <div className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
            RAG Mode: Active
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-auto p-6 space-y-6">
          <SafetyDisclaimer />

          {messages.map((msg) => (
            <div key={msg.id} className={cn(
              "flex flex-col max-w-3xl",
              msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
            )}>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.role === 'user'
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
              )}>
                {msg.role === 'copilot' && msg.response?.citations && msg.response.citations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {msg.response.citations.map((cit, idx) => (
                      <CitationLink key={idx} citation={cit} onCitationClick={(id) => console.log('Highlighting record:', id)} />
                    ))}
                  </div>
                )}
                {msg.role === 'copilot' && msg.response ? (
                  <div className="space-y-4">
                    <div className="text-slate-800">{msg.content}</div>
                    {msg.response.predictiveInsights && (
                      <PredictiveInsightsPanel insights={msg.response.predictiveInsights} />
                    )}
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 items-center text-slate-400 text-xs">
              <div className="animate-bounce w-1.5 h-1.5 bg-slate-400 rounded-full" />
              <div className="animate-bounce w-1.5 h-1.5 bg-slate-400 rounded-full [animation-delay:0.2s]" />
              <div className="animate-bounce w-1.5 h-1.5 bg-slate-400 rounded-full [animation-delay:0.4s]" />
              <span>Copilot is reasoning over records...</span>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about lab results, medications, or trends..."
              className="flex-grow px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:bg-slate-300"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotPage;
