import React from 'react';
import { Button, Card } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { Appointment, Referral } from '@/types';

const AppointmentPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">{t('appointments.title', 'Scheduling & Referrals')}</h1>
          <p className="text-slate-500">{t('appointments.subtitle', 'Coordinate your care and track referrals')}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex gap-2">
          <span>📅</span> {t('appointments.book_new', 'Schedule Appointment')}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold">{t('appointments.upcoming', 'Upcoming Appointments')}</h3>
          <div className="space-y-4">
            {[
              { id: 'a1', doctor: 'Dr. Anjali Rao', spec: 'Endocrinologist', date: '2024-11-05', time: '10:30 AM', status: 'CONFIRMED' },
              { id: 'a2', doctor: 'Dr. Vikram Seth', spec: 'Dermatologist', date: '2024-11-12', time: '04:15 PM', status: 'SCHEDULED' },
            ].map((app, i) => (
              <Card key={i} className="p-4 flex justify-between items-center border-l-4 border-l-blue-500">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-blue-50 rounded-full text-blue-600 font-bold">
                    {app.date.split('-')[2]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{app.doctor}</p>
                    <p className="text-sm text-slate-500">{app.spec} • {app.date} at {app.time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Referral Tracker */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">{t('appointments.referrals', 'Referral Tracking')}</h3>
          <div className="space-y-4">
            {[
              { id: 'r1', to: 'Cardiology Dept', from: 'Dr. Sharma', status: 'ACCEPTED', date: '2024-10-15' },
              { id: 'r2', to: 'Neurology Clinic', from: 'Dr. Sharma', status: 'PENDING', date: '2024-10-20' },
            ].map((ref, i) => (
              <Card key={i} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-slate-800">{ref.to}</p>
                    <p className="text-xs text-slate-500">Referred by {ref.from} on {ref.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    ref.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ref.status}
                  </span>
                </div>
                {/* Timeline Visual */}
                <div className="flex justify-between items-center px-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1 h-0.5 bg-slate-200 mx-1" />
                  <div className={`w-2 h-2 rounded-full ${ref.status === 'ACCEPTED' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                  <div className="flex-1 h-0.5 bg-slate-200 mx-1" />
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Sent</span>
                  <span>Accepted</span>
                  <span>Done</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
