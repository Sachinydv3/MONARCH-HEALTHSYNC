import React from 'react';
import { Citation, PredictiveInsight } from '../../../services/core/CopilotService';
import { AIInsightCard } from '../../clinical/ai-insights/AIInsightCard';
import { cn } from '../../../utils/cn';

interface CitationLinkProps {
  citation: Citation;
  onCitationClick: (id: string) => void;
}

export const CitationLink: React.FC<CitationLinkProps> = ({ citation, onCitationClick }) => {
  return (
    <button
      onClick={() => onCitationClick(citation.id)}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 ml-1 rounded bg-blue-100 text-blue-700 text-[10px] font-bold hover:bg-blue-200 transition-colors"
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C.458 5.042 5.042 0.458 10 0.458s9.542 4.584 9.542 9.542C19.542 15.12 15.12 20 10 20S.458 14.88.458 10zM10 18a8 8 0 110-16 8 8 0 010 16z" clipRule="evenodd" />
      </svg>
      {citation.date}
    </button>
  );
};

export const SafetyDisclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-3">
      <div className="text-amber-600 shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.23 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-amber-800">AI Clinical Draft</p>
        <p className="text-[11px] text-amber-700 leading-relaxed">
          This information is AI-generated and must be reviewed by a licensed clinician.
          The AI cannot issue prescriptions or make final diagnoses.
        </p>
      </div>
    </div>
  );
};

export const PredictiveInsightsPanel: React.FC<{ insights: PredictiveInsight[] }> = ({ insights }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center gap-2 text-slate-900">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="text-sm font-bold uppercase tracking-wider">Predictive AI Insights</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {insights.map(insight => (
          <AIInsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
};
