import React from 'react';
import { HospitalKPI } from '../../services/core/AdminService';
import { cn } from '../../utils/cn';

interface KPICardProps {
  kpi: HospitalKPI;
}

const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  const isUp = kpi.trend === 'UP';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
        <span className={cn(
          "text-xs font-bold flex items-center gap-0.5",
          isUp ? "text-emerald-600" : "text-red-600"
        )}>
          {isUp ? '↑' : '↓'} {kpi.trendValue}
        </span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{kpi.description}</p>
    </div>
  );
};

export const OutcomeAnalytics: React.FC = () => {
  // Mock KPIs for prototype
  const kpis: HospitalKPI[] = [
    { label: 'Diabetes Control', value: '68%', trend: 'UP', trendValue: '+4%', description: 'Patients with HbA1c < 7.0%' },
    { label: 'Avg Wait Time', value: '22m', trend: 'DOWN', trendValue: '-5m', description: 'From registration to consultation' },
    { label: 'Readmission Rate', value: '12%', trend: 'DOWN', trendValue: '-2%', description: '30-day post-discharge' },
    { label: 'Patient Satisfaction', value: '4.7', trend: 'UP', trendValue: '+0.2', description: 'Average rating (1-5 stars)' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => (
        <KPICard key={idx} kpi={kpi} />
      ))}
    </div>
  );
};
