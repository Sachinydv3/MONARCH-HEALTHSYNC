import React from 'react';
import { Button, Card } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { CareNudge, HealthMetric } from '@/types';

const PreventiveCarePage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{t('preventive.title', 'Preventive Care & Wellness')}</h1>
        <p className="text-slate-500">{t('preventive.subtitle', 'Stay ahead of your health with proactive monitoring')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Health Scorecard */}
        <Card className="p-6 lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-xl">
          <h3 className="text-lg font-semibold mb-6 opacity-90">{t('preventive.score_title', 'Overall Health Score')}</h3>
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <svg className="w-32 h-32">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-blue-400/30" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364" strokeDashoffset="80" className="text-white transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">82</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Excellent Condition</p>
              <p className="text-xs opacity-70">{t('preventive.score_desc', 'Your score is 12% higher than last month')}</p>
            </div>
            <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
              {t('preventive.view_details', 'View Analysis')}
            </Button>
          </div>
        </Card>

        {/* Monitoring & Nudges */}
        <div className="lg:col-span-2 space-y-8">
          {/* Predictive Nudges */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>🔔</span> {t('preventive.nudges_title', 'Health Nudges')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'n1', type: 'SCREENING', msg: 'Time for your annual glucose check-up', priority: 'HIGH', date: '2024-11-01' },
                { id: 'n2', type: 'MEDICATION', msg: 'Reminder: Take your Vitamin D supplement', priority: 'LOW', date: 'Today' },
                { id: 'n3', type: 'FOLLOW_UP', msg: 'Schedule your 3-month BP review', priority: 'MEDIUM', date: '2024-11-15' },
              ].map((nudge, i) => (
                <Card key={i} className="p-4 border-l-4 border-l-blue-500 flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-800">{nudge.msg}</p>
                    <p className="text-[10px] text-slate-500">{nudge.date}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-blue-600 font-bold">Done</Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Health Trends */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>📈</span> {t('preventive.trends_title', 'Vitals Trends')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Blood Pressure', value: '118/76', trend: 'stable', color: 'blue' },
                { label: 'Blood Glucose', value: '94 mg/dL', trend: 'down', color: 'green' },
                { label: 'Heart Rate', value: '68 bpm', trend: 'up', color: 'orange' },
              ].map((metric, i) => (
                <Card key={i} className="p-4">
                  <p className="text-xs text-slate-500 uppercase">{metric.label}</p>
                  <div className="flex justify-between items-baseline">
                    <p className="text-lg font-bold">{metric.value}</p>
                    <span className={`text-xs ${metric.trend === 'up' ? 'text-red-500' : metric.trend === 'down' ? 'text-green-500' : 'text-slate-400'}`}>
                      {metric.trend === 'up' ? '▲' : metric.trend === 'down' ? '▼' : '─'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreventiveCarePage;
