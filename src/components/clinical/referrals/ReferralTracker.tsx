import React from 'react';
import { CheckCircle2, Clock, AlertCircle, FileText, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ReferralStatus = 'PENDING' | 'ACCEPTED' | 'SCHEDULED' | 'COMPLETED' | 'OVERDUE' | 'MISSED';

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  fromFacility: string;
  toFacility: string;
  specialistName: string;
  specialty: string;
  urgency: 'NORMAL' | 'URGENT' | 'EMERGENCY';
  status: ReferralStatus;
  createdAt: string;
  scheduledDate?: string;
  attachedRecords: string[];
  feedback?: string;
}

export const ReferralTracker: React.FC<{ referrals: Referral[] }> = ({ referrals }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Care Coordination Hub</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
          {referrals.filter(r => r.status === 'PENDING' || r.status === 'OVERDUE').length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {referrals.map((referral) => (
          <ReferralCard key={referral.id} referral={referral} />
        ))}
      </div>
    </div>
  );
};

const ReferralCard: React.FC<{ referral: Referral }> = ({ referral }) => {
  const statusStyles = {
    PENDING: 'bg-slate-100 text-slate-600',
    ACCEPTED: 'bg-blue-100 text-blue-600',
    SCHEDULED: 'bg-indigo-100 text-indigo-600',
    COMPLETED: 'bg-emerald-100 text-emerald-600',
    OVERDUE: 'bg-red-100 text-red-600 border-red-200',
    MISSED: 'bg-orange-100 text-orange-600',
  };

  const statusIcons = {
    PENDING: <Clock size={14} />,
    ACCEPTED: <CheckCircle2 size={14} />,
    SCHEDULED: <Calendar size={14} />,
    COMPLETED: <CheckCircle2 size={14} />,
    OVERDUE: <AlertCircle size={14} />,
    MISSED: <AlertCircle size={14} />,
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all hover:shadow-md",
      referral.status === 'OVERDUE' ? "border-red-200 ring-1 ring-red-100" : "border-slate-100"
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">{referral.patientName}</h3>
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
              referral.urgency === 'EMERGENCY' ? "bg-red-600 text-white" :
              referral.urgency === 'URGENT' ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-600"
            )}>
              {referral.urgency}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {referral.fromFacility} <ArrowRight size={12} className="inline mx-1" /> {referral.toFacility}
          </p>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase",
          statusStyles[referral.status]
        )}>
          {statusIcons[referral.status]}
          {referral.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Specialist</p>
          <p className="text-xs font-medium text-slate-700">{referral.specialistName}</p>
          <p className="text-[10px] text-slate-500">{referral.specialty}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Scheduled Date</p>
          <p className="text-xs font-medium text-slate-700">{referral.scheduledDate || 'TBD'}</p>
          <p className="text-[10px] text-slate-500">Created: {referral.createdAt}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <FileText size={14} />
            <span>{referral.attachedRecords.length} Records</span>
          </div>
        </div>
        <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
          Manage Referral <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
