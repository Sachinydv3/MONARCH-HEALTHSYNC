import React, { useState } from 'react';
import { Search, FileText, Download, Filter, Calendar, Beaker, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MobileFrame } from '../components/layout/MobileFrame';
import { cn } from '../utils/cn';

interface TestReport {
  id: string;
  testName: string;
  date: string;
  category: string;
  result: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
  lab: string;
  pdfUrl: string;
}

const MOCK_REPORTS: TestReport[] = [
  {
    id: 'REP-001',
    testName: 'Complete Blood Count (CBC)',
    date: '2024-10-15',
    category: 'Hematology',
    result: 'Hemoglobin: 14.2 g/dL',
    status: 'Normal',
    lab: 'City Diagnostics',
    pdfUrl: '#',
  },
  {
    id: 'REP-002',
    testName: 'HbA1c',
    date: '2024-10-10',
    category: 'Biochemistry',
    result: '7.2%',
    status: 'Abnormal',
    lab: 'Metro PathLabs',
    pdfUrl: '#',
  },
  {
    id: 'REP-003',
    testName: 'Lipid Profile',
    date: '2024-09-28',
    category: 'Biochemistry',
    result: 'LDL: 160 mg/dL',
    status: 'Critical',
    lab: 'City Diagnostics',
    pdfUrl: '#',
  },
  {
    id: 'REP-004',
    testName: 'Thyroid Profile (T3, T4, TSH)',
    date: '2024-09-15',
    category: 'Endocrinology',
    result: 'TSH: 2.5 mIU/L',
    status: 'Normal',
    lab: 'Apex Labs',
    pdfUrl: '#',
  },
];

export const PathologyReportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Normal' | 'Abnormal' | 'Critical'>('All');

  const filteredReports = MOCK_REPORTS.filter(report => {
    const matchesSearch = report.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || report.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex justify-center">
      <MobileFrame>
        <div className="h-full flex flex-col bg-white">
          {/* Header */}
          <header className="p-6 pb-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Beaker size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Pathology Reports</h1>
                <p className="text-xs text-slate-500">Search and download your test results</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <Input
                className="pl-10 w-full rounded-2xl bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Search test or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                label="Search Reports"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {(['All', 'Normal', 'Abnormal', 'Critical'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                    filter === status
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </header>

          {/* Reports List */}
          <main className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{report.category}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          report.status === 'Normal' ? "bg-green-100 text-green-700" :
                          report.status === 'Abnormal' ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                        )}>
                          {report.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{report.testName}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar size={12} />
                      <span className="text-[10px] font-medium">{report.date}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-3 mb-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <FileText size={14} />
                      <span className="text-xs font-semibold">Primary Result:</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 pl-6">{report.result}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {report.lab[0]}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{report.lab}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      onClick={() => window.open(report.pdfUrl, '_blank')}
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                  <AlertCircle size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">No reports found</h3>
                  <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => { setSearchQuery(''); setFilter('All'); }}
                >
                  Clear All
                </Button>
              </div>
            )}
          </main>
        </div>
      </MobileFrame>
    </div>
  );
};

export default PathologyReportPage;
