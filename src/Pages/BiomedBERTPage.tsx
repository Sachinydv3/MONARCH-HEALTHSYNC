import React from 'react';
import { BookOpen, BrainCircuit, Activity, Database, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const BiomedBERTPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7FBFF] font-sans p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary rounded-full text-xs font-bold uppercase tracking-widest">
            <BrainCircuit size={14} />
            Medical AI Model
          </div>
          <h1 className="text-5xl font-black text-[#0B2A6F] tracking-tight">BiomedBERT</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A domain-specific biomedical language model developed by Microsoft for advanced healthcare NLP tasks.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description Card */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-soft space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="text-primary" />
              About the Model
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Unlike general NLP models that start with broad-domain corpora, BiomedBERT is pre-trained from scratch using PubMed abstracts and full-text articles from PubMed Central, enabling superior performance on biomedical NLP tasks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Activity, text: "Biomedical text classification" },
                { icon: Database, text: "Named entity recognition (NER) for medical terminology" },
                { icon: BrainCircuit, text: "Question answering in the medical domain" },
                { icon: CheckCircle2, text: "Biomedical language inference and reasoning" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <item.icon size={18} className="text-primary" />
                  <span className="text-sm font-medium text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            <div className="bg-primary p-6 rounded-3xl text-white shadow-lg shadow-primary/20 space-y-4">
              <h3 className="text-lg font-bold">Performance</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                This model outperforms general-domain language models on various benchmarks and currently holds the top score on the Biomedical Language Understanding and Reasoning Benchmark.
              </p>
              <Button variant="outline" className="w-full bg-white text-primary border-none py-3 rounded-xl font-bold">
                View Benchmarks
              </Button>
            </div>

            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 space-y-3">
              <div className="flex items-center gap-2 text-amber-700 font-bold">
                <AlertTriangle size={18} />
                Disclaimer
              </div>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                BiomedBERT is intended for research purposes only and should not be used for clinical decision-making. It serves as a valuable tool for biomedical AI researchers, medical text mining, and healthcare-related NLP applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomedBERTPage;
