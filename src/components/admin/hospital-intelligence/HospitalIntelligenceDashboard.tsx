import React from 'react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendValue: string;
  trendType: 'positive' | 'negative' | 'neutral';
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendValue, trendType, description }) => {
  const colorClasses = {
    positive: 'text-emerald-600 bg-emerald-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-slate-600 bg-slate-50',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full",
          colorClasses[trendType]
        )}>
          {trend} {trendValue}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
};

export const HospitalIntelligenceDashboard: React.FC = () => {
  const operationalKPIs = [
    { label: 'Appointment Volume', value: '1,240', trend: '↑', trendValue: '+12%', trendType: 'positive', description: 'Total scheduled vs completed visits' },
    { label: 'Avg Wait Time', value: '42m', trend: '↓', trendValue: '-8m', trendType: 'positive', description: 'Triage to clinician contact' },
    { label: 'Missed Visits', value: '8.4%', trend: '↑', trendValue: '+1.2%', trendType: 'negative', description: 'Patient no-show rate' },
    { label: 'Clinic Utilization', value: '76%', trend: '→', trendValue: 'Stable', trendType: 'neutral', description: 'Average room & staff occupancy' },
  ];

  const clinicalPipeline = [
    { label: 'Pending Diagnostics', value: '156', trend: '↑', trendValue: '+15', trendType: 'negative', description: 'Labs/Imaging awaiting review' },
    { label: 'Referral Completion', value: '62%', trend: '↑', trendValue: '+5%', trendType: 'positive', description: 'Referrals closed within 14 days' },
    { label: 'Patient Follow-ups', value: '312', trend: '↑', trendValue: '+40', trendType: 'negative', description: 'Overdue post-consultation check-ins' },
    { label: 'Clinician Workload', value: '14h', trend: '↓', trendValue: '-1h', trendType: 'positive', description: 'Avg daily documentation time' },
  ];

  return (
    <div className="space-y-8">
      {/* Operational Efficiency Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-md">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Operational Efficiency</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {operationalKPIs.map((kpi, idx) => (
            <StatCard key={idx} {...kpi} />
          ))}
        </div>
      </section>

      {/* Clinical Pipeline Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-100 rounded-md">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 000 4h12a2 2 0 000-4M9 5a2 2 0 012-2h6a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Clinical Pipeline & Outcomes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clinicalPipeline.map((kpi, idx) => (
            <StatCard key={idx} {...kpi} />
          ))}
        </div>
      </section>

      {/* Service Access Gaps - Placeholder for Chart */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 rounded-md">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Service Access Gaps</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm min-h-[300px] flex flex-col items-center justify-center space-y-4">
          <div className="text-slate-400 italic">
            Aggregated outcome map and location-based access gaps visualization
          </div>
          <button className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors border border-slate-200">
            Generate Detailed Access Report
          </button>
        </div>
      </section>
    </div>
  );
};
