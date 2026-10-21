import React, { useState, useEffect } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { TriageSession, TriageLevel } from '@/types';
import { useTranslation } from 'react-i18next';

const SymptomTriagePage = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: t('triage.welcome_message', 'Hello! I am your AI health assistant. Please describe how you are feeling today.') }
  ]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ level: TriageLevel; routing: string; reason: string } | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsAnalyzing(true);

    // Mock AI Triage Logic
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: t('triage.analyzing', 'I am analyzing your symptoms. Based on what you said, I recommend a consultation with a General Physician.')
      };
      setMessages(prev => [...prev, aiResponse]);
      setResult({
        level: 'ROUTINE',
        routing: 'PHC',
        reason: t('triage.reason_routine', 'Symptoms are stable and do not indicate immediate emergency.')
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">{t('triage.title', 'AI Symptom Screening')}</h1>
        <p className="text-slate-500">{t('triage.subtitle', 'Intelligent triage to get you the right care faster')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-lg animate-pulse text-slate-500">
                    {t('triage.analyzing_dots', 'AI is thinking...')}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex gap-2">
              <Input
                label="Symptom Description"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSend()}
                placeholder={t('triage.input_placeholder', 'Describe your symptoms...')}
              />
              <Button onClick={handleSend}>{t('triage.send', 'Send')}</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-3">{t('triage.analysis_title', 'Triage Analysis')}</h3>
            {result ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-sm text-slate-500">{t('triage.level', 'Priority Level')}</span>
                  <span className={`text-sm font-bold px-2 py-1 rounded ${
                    result.level === 'EMERGENCY' ? 'bg-red-100 text-red-700' :
                    result.level === 'URGENT' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {result.level}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-sm text-slate-500">{t('triage.route', 'Recommended Route')}</span>
                  <span className="text-sm font-bold">{result.routing}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded text-sm text-slate-600">
                  <strong>{t('triage.reason', 'Reasoning')}:</strong> {result.reason}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  {t('triage.book_now', 'Book Appointment Now')}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">{t('triage.no_result', 'Complete the screening to see results')}</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SymptomTriagePage;
