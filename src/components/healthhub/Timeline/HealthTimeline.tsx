import React from 'react';
import { MedicalRecord, RecordType } from '../../../types/index';
import { cn } from '../../../utils/cn';

interface TimelineEventProps {
  record: MedicalRecord;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ record }) => {
  const getTypeColor = (type: RecordType) => {
    switch (type) {
      case 'LAB': return 'bg-blue-500';
      case 'IMAGING': return 'bg-purple-500';
      case 'CLINICAL': return 'bg-emerald-500';
      case 'PRESCRIPTION': return 'bg-amber-500';
      case 'METRIC': return 'bg-slate-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 last:hidden" />

      {/* Timeline Dot */}
      <div className={cn(
        "absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10",
        getTypeColor(record.type)
      )} />

      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">
            {new Date(record.date).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}
          </span>
          <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white",
            getTypeColor(record.type)
          )}>
            {record.type}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-slate-900 mb-1">{record.provider}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{record.summary}</p>
      </div>
    </div>
  );
};

interface HealthTimelineProps {
  records: MedicalRecord[];
  activeFilter: RecordType | 'ALL';
}

export const HealthTimeline: React.FC<HealthTimelineProps> = ({ records, activeFilter }) => {
  const filteredRecords = activeFilter === 'ALL'
    ? records
    : records.filter(r => r.type === activeFilter);

  return (
    <div className="space-y-0">
      {filteredRecords.length > 0 ? (
        filteredRecords.map((record) => (
          <TimelineEvent key={record.id} record={record} />
        ))
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 text-sm">No records found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};
