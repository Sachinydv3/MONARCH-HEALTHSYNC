import React, { useState } from 'react';
import { Button, Card, Input } from '@/components/ui';
import { useTranslation } from 'react-i18next';

interface DepartmentRecord {
  id: string;
  department: string;
  patientId: string;
  patientName: string;
  visitDate: string;
  status: 'STABLE' | 'CRITICAL' | 'RECOVERING' | 'DISCHARGED';
  notes: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

const HospitalDepartmentRecordsPage = () => {
  const { t } = useTranslation();
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    { id: 'ALL', label: 'All Departments', icon: '🏥' },
    { id: 'EMERGENCY', label: 'Emergency', icon: '🚨' },
    { id: 'PHARMACY', label: 'Pharmacy', icon: '💊' },
    { id: 'PEDIATRICS', label: 'Pediatrics', icon: '👶' },
    { id: 'CARDIOLOGY', label: 'Cardiology', icon: '❤️' },
    { id: 'NEUROLOGY', label: 'Neurology', icon: '🧠' },
    { id: 'ORTHOPEDICS', label: 'Orthopedics', icon: '🦴' },
    { id: 'ONCOLOGY', label: 'Oncology', icon: '🎗️' },
  ];

  const mockRecords: DepartmentRecord[] = [
    { id: 'rec1', department: 'EMERGENCY', patientId: 'P001', patientName: 'Amit Sharma', visitDate: '2024-10-20 08:30', status: 'CRITICAL', notes: 'Acute respiratory distress, moved to ICU.', priority: 'HIGH' },
    { id: 'rec2', department: 'PEDIATRICS', patientId: 'P005', patientName: 'Saanvi Iyer', visitDate: '2024-10-20 09:15', status: 'STABLE', notes: 'Routine vaccination and growth check.', priority: 'LOW' },
    { id: 'rec3', department: 'PHARMACY', patientId: 'P012', patientName: 'Rajesh Kumar', visitDate: '2024-10-20 10:00', status: 'DISCHARGED', notes: 'Prescription for Metformin filled.', priority: 'MEDIUM' },
    { id: 'rec4', department: 'CARDIOLOGY', patientId: 'P008', patientName: 'Sunita Deshmukh', visitDate: '2024-10-20 11:00', status: 'RECOVERING', notes: 'Post-angioplasty follow up. BP stabilizing.', priority: 'MEDIUM' },
    { id: 'rec5', department: 'NEUROLOGY', patientId: 'P020', patientName: 'Vijay Patil', visitDate: '2024-10-20 12:30', status: 'STABLE', notes: 'Migraine management review.', priority: 'LOW' },
    { id: 'rec6', department: 'EMERGENCY', patientId: 'P030', patientName: 'Priya Nair', visitDate: '2024-10-20 13:00', status: 'STABLE', notes: 'Minor fracture in left wrist.', priority: 'MEDIUM' },
  ];

  const filteredRecords = mockRecords.filter(rec => {
    const matchesDept = selectedDept === 'ALL' || rec.department === selectedDept;
    const matchesSearch = rec.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rec.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">{t('hospital.records_title', 'Hospital Departmental Records')}</h1>
          <p className="text-slate-500">{t('hospital.records_subtitle', 'Centralized cross-departmental patient tracking and management')}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          {t('hospital.add_record', 'Add New Record')}
        </Button>
      </header>

      {/* Department Filter Bar */}
      <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
        {departments.map(dept => (
          <Button
            key={dept.id}
            variant={selectedDept === dept.id ? 'default' : 'outline'}
            onClick={() => setSelectedDept(dept.id)}
            className={`whitespace-nowrap flex gap-2 ${selectedDept === dept.id ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
          >
            <span>{dept.icon}</span> {dept.label}
          </Button>
        ))}
      </div >

      {/* Search and Filter Section */}
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <Input
            label="Search Patients"
            className="pl-10"
            placeholder={t('hospital.search_placeholder', 'Search by patient name or ID...')}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Filter by Status</Button>
          <Button variant="outline" size="sm">Sort by Priority</Button>
        </div >
      </div >

      {/* Records Table/Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((rec) => (
            <Card key={rec.id} className="p-4 hover:border-blue-300 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    rec.department === 'EMERGENCY' ? 'bg-red-100 text-red-600' :
                    rec.department === 'PHARMACY' ? 'bg-green-100 text-green-600' :
                    rec.department === 'PEDIATRICS' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {departments.find(d => d.id === rec.department)?.icon}
                  </div >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800">{rec.patientName}</h3>
                      <span className="text-xs text-slate-400">#{rec.patientId}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        rec.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {rec.priority} Priority
                      </span >
                    </div >
                    <p className="text-sm text-slate-600">{rec.notes}</p>
                  </div >
                </div >
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400">{t('hospital.visit_date', 'Visit')}:</span>
                    <span className="font-medium">{rec.visitDate}</span>
                  </div >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">{t('hospital.status', 'Status')}:</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      rec.status === 'CRITICAL' ? 'bg-red-500 text-white' :
                      rec.status === 'STABLE' ? 'bg-green-500 text-white' :
                      rec.status === 'RECOVERING' ? 'bg-blue-500 text-white' : 'bg-slate-400 text-white'
                    }`}>
                      {rec.status}
                    </span >
                  </div >
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs">View Full History</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600">Transfer</Button>
                  </div >
                </div >
              </div >
            </Card>
          ))
        ) : (
          <div className="text-center py-20 space-y-4">
            <div className="text-5xl">📂</div>
            <p className="text-slate-500">{t('hospital.no_records', 'No records found for the selected criteria')}</p>
            <Button variant="outline" onClick={() => { setSelectedDept('ALL'); setSearchTerm(''); }}>
              {t('hospital.clear_filters', 'Clear All Filters')}
            </Button>
          </div >
        )}
      </div >
    </div>
  );
};

export default HospitalDepartmentRecordsPage;
