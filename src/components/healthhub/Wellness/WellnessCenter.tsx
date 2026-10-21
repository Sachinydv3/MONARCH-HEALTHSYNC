import React, { useState } from 'react';
import { CheckCircle2, Play, BookOpen, Heart, Brain, Wind, Scale, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface WellnessResourceProps {
  title: string;
  type: 'exercise' | 'education' | 'screening';
  duration: string;
  description: string;
  icon: React.ReactNode;
}

const WellnessResource: React.FC<WellnessResourceProps> = ({ title, type, duration, description, icon }) => {
  const typeStyles = {
    exercise: 'bg-emerald-100 text-emerald-700',
    education: 'bg-blue-100 text-blue-700',
    screening: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft space-y-3 hover:border-primary transition-colors cursor-pointer group">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary-light transition-colors">
          {icon}
        </div>
        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase", typeStyles[type])}>
          {type}
        </span>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <Clock size={12} /> {duration}
        </span>
        <div className="text-primary group-hover:translate-x-1 transition-transform">
          <Play size={14} fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

const Clock = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export const WellnessCenter: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'assessments' | 'resources' | 'progress'>('assessments');

  const resources = [
    {
      title: 'Mindful Breathing',
      type: 'exercise' as const,
      duration: '5 min',
      description: 'Guided breathing to reduce acute stress and anxiety.',
      icon: <Wind size={18} className="text-emerald-600" />
    },
    {
      title: 'Understanding Diabetes',
      type: 'education' as const,
      duration: '10 min',
      description: 'Learn how blood glucose affects your long-term health.',
      icon: <BookOpen size={18} className="text-blue-600" />
    },
    {
      title: 'PHQ-9 Mood Screening',
      type: 'screening' as const,
      duration: '3 min',
      description: 'Validated screening tool for depression symptoms.',
      icon: <Brain size={18} className="text-purple-600" />
    },
    {
      title: 'Daily Mobility Flow',
      type: 'exercise' as const,
      duration: '12 min',
      description: 'Gentle stretching to improve joint health and circulation.',
      icon: <Scale size={18} className="text-emerald-600" />
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Wellness Center</h2>
          <p className="text-slate-500 text-sm">Personalized Health & Well-being</p>
        </div>
        <div className="p-2 bg-primary-light text-primary rounded-full">
          <Heart size={24} />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1 bg-slate-200/50 rounded-2xl gap-1">
        {(['assessments', 'resources', 'progress'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            className={cn(
              "flex-1 py-2 text-xs font-bold rounded-xl transition-all capitalize",
              activeSection === tab ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeSection === 'assessments' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
              <AlertCircle size={20} className="text-blue-600 shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                These screenings are guided tools to help you and your clinician. They do not replace a professional medical diagnosis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AssessmentCard
                title="General Well-being"
                description="A comprehensive check of your physical and mental state."
                status="Not Started"
                icon={<Activity size={20} />}
              />
              <AssessmentCard
                title="Mental Health Scan"
                description="Validated screening for mood and anxiety levels."
                status="Due"
                icon={<Brain size={20} />}
                urgent
              />
            </div>
          </div>
        )}

        {activeSection === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
            {resources.map((res, idx) => (
              <WellnessResource key={idx} {...res} />
            ))}
          </div>
        )}

        {activeSection === 'progress' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Your Growth Journey</h3>
                <span className="text-xs font-bold text-emerald-600">On Track</span>
              </div>
              <div className="space-y-4">
                <ProgressItem label="Daily Mindfulness" value={85} color="bg-emerald-500" />
                <ProgressItem label="Blood Pressure Goal" value={60} color="bg-blue-500" />
                <ProgressItem label="Educational Modules" value={40} color="bg-purple-500" />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <User size={18} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Care Coordinator Follow-up</p>
                  <p className="text-[10px] text-slate-500">Scheduled for Oct 25, 2026</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Reschedule</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AssessmentCard: React.FC<{ title: string; description: string; status: string; icon: React.ReactNode; urgent?: boolean }> = ({
  title, description, status, icon, urgent
}) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft space-y-3 hover:border-primary transition-all cursor-pointer group">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary-light transition-colors">
        {icon}
      </div>
      <span className={cn(
        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
        urgent ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"
      )}>
        {status}
      </span>
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
    <Button size="sm" className="w-full py-1 text-xs">Start Assessment</Button>
  </div>
);

const ProgressItem: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const Activity = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4L12 7 8 12h-4"/>
  </svg>
);

const User = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
