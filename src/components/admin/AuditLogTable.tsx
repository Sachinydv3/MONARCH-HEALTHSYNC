import React, { useState } from 'react';
import { AuditLogEntry } from '../../services/core/AdminService';
import { cn } from '../../utils/cn';

interface AuditLogTableProps {
  logs: AuditLogEntry[];
}

export const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs }) => {
  const [filter, setFilter] = useState('ALL');

  const filteredLogs = filter === 'ALL'
    ? logs
    : logs.filter(l => l.severity === filter);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">System Audit Trail</h3>
        <div className="flex gap-2">
          {['ALL', 'INFO', 'WARNING', 'CRITICAL'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-2 py-1 text-[10px] font-bold rounded border transition-all",
                filter === f ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
            <tr>
              <th className="px-4 py-3 text-xs font-bold uppercase">Timestamp</th>
              <th className="px-4 py-3 text-xs font-bold uppercase">User</th>
              <th className="px-4 py-3 text-xs font-bold uppercase">Action</th>
              <th className="px-4 py-3 text-xs font-bold uppercase">Resource</th>
              <th className="px-4 py-3 text-xs font-bold uppercase">Reason</th>
              <th className="px-4 py-3 text-xs font-bold uppercase">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{log.userName}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600 text-xs">{log.resourceType} ({log.resourceId})</td>
                <td className="px-4 py-3 text-slate-500 text-xs italic">{log.reason}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold text-white",
                    log.severity === 'CRITICAL' ? "bg-red-500" : log.severity === 'WARNING' ? "bg-amber-500" : "bg-blue-500"
                  )}>
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
