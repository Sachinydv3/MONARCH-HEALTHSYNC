import React from 'react';
import { Brain, Sparkles, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export type InsightSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface ClinicalInsight {
  id: string;
  title: string;
  description: string;
  severity: InsightSeverity;
  evidence: string[];
  recommendation: string;
  confidence: number;
  category: 'Predictive' | 'Diagnostic' | 'Preventive';
}

export const AIInsightCard: React.FC<{ insight: ClinicalInsight }> = ({ insight }) => {
  const severityStyles = {
    INFO: 'bg-blue-50 text-blue-700 border-blue-100',
    WARNING: 'bg-amber-50 text-amber-700 border-amber-100',
    CRITICAL: 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <div className={cn(
      "p-4 rounded-2xl border shadow-sm space-y-3 transition-all hover:shadow-md",
      severityStyles[insight.severity]
    )}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white rounded-lg shadow-sm">
            <Brain size={16} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
            {insight.category} Insight
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold bg-white/50 px-2 py-0.5 rounded-full">
          <Sparkles size={10} />
          {Math.round(insight.confidence * 100)}% Conf.
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="font-bold text-slate-900">{insight.title}</h4>
        <p className="text-xs leading-relaxed text-slate-700">{insight.description}</p>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase">Evidence</p>
        <div className="flex flex-wrap gap-2">
          {insight.evidence.map((ev, i) => (
            <div key={i} className="flex items-center gap-1 text-[10px] bg-white/60 px-2 py-1 rounded-md border border-white/40">
              <FileText size={10} /> {ev}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-black/5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <AlertTriangle size={14} className="text-amber-600" />
          Recommendation:
        </div>
        <p className="text-xs italic text-slate-600">{insight.recommendation}</p>
      </div>

      <button className="w-full py-2 text-xs font-bold bg-white/80 hover:bg-white rounded-lg border border-black/5 transition-colors flex items-center justify-center gap-2">
        Review Grounding <ArrowRight size={12} />
      </button>
    </div>
  );
};
