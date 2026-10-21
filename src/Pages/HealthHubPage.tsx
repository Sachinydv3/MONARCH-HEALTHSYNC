import React, { useState, useEffect } from 'react';
import { Patient, MedicalRecord, HealthDocument, RecordType } from '../types';
import { healthHubService } from '../services/core/HealthHubService';
import { PatientProfileCard } from '../components/healthhub/Profile/PatientProfileCard';
import { HealthTimeline } from '../components/healthhub/Timeline/HealthTimeline';
import { DocumentManager } from '../components/healthhub/Documents/DocumentManager';
import DummyReport from '../components/healthhub/Reports/DummyReport';

type Tab = 'timeline' | 'documents' | 'access' | 'reports';

const HealthHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('timeline');
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [criticalInfo, setCriticalInfo] = useState({
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Type 2 Diabetes', 'Hypertension'],
  });
  const [timeline, setTimeline] = useState<MedicalRecord[]>([]);
  const [documents, setDocuments] = useState<HealthDocument[]>([]);
  const [filter, setFilter] = useState<RecordType | 'ALL'>('ALL');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const patientId = 'patient_123';

        setPatient({
          id: patientId,
          fullName: 'Rajesh Kumar',
          dateOfBirth: '1978-05-12',
          gender: 'male',
          mobileNumber: '+91 98765 43210',
          village: 'Kalyani',
          taluka: 'Pune',
          district: 'Pune',
          state: 'Maharashtra',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          abhaId: 'ABHA-9928-1102-4432',
          consentPolicies: [],
        });

        const records = await healthHubService.getHealthTimeline(patientId, { types: [] });
        setTimeline(records || mockTimeline);
        setDocuments(mockDocuments);

      } catch (error) {
        console.error('Error loading Health Hub data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleUpload = async (file: File, category: string) => {
    try {
      const newDoc = await healthHubService.uploadHealthDocument('patient_123', file, category);
      setDocuments(prev => [newDoc, ...prev]);
    } catch (error) {
      alert('Upload failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient) return <div className="p-8 text-center">Patient not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Smart Health Hub</h1>
              <p className="text-slate-500">Unified Personal Health Record</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-xs font-semibold text-slate-400 uppercase">Verified Patient</p>
              <p className="text-sm font-medium text-emerald-600 flex items-center justify-end gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Identity Verified
              </p>
            </div>
          </div>

          <PatientProfileCard patient={patient} criticalInfo={criticalInfo} />
        </div>

        <div className="flex border-b border-slate-200 gap-8">
          {(['timeline', 'documents', 'access', 'reports'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-medium transition-all relative capitalize",
                activeTab === tab ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        <div className="py-4">
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <FilterChip active={filter === 'ALL'} onClick={() => setFilter('ALL')} label="All" />
                <FilterChip active={filter === 'LAB'} onClick={() => setFilter('LAB')} label="Labs" />
                <FilterChip active={filter === 'IMAGING'} onClick={() => setFilter('IMAGING')} label="Imaging" />
                <FilterChip active={filter === 'CLINICAL'} onClick={() => setFilter('CLINICAL')} label="Clinical" />
                <FilterChip active={filter === 'PRESCRIPTION'} onClick={() => setFilter('PRESCRIPTION')} label="Prescriptions" />
              </div >
              <HealthTimeline records={timeline} activeFilter={filter} />
            </div>
          )}

          {activeTab === 'documents' && (
            <DocumentManager documents={documents} onUpload={handleUpload} />
          )}

          {activeTab === 'access' && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Access Management</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Control who can view your medical records. Add family members or grant temporary access to specialists.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Manage Permissions
              </button>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">Sample Health Reports</h3>
                <p className="text-sm text-slate-500">View detailed diagnostic results</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DummyReport />
                <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-12 text-center">
                  <div className="space-y-2">
                    <p className="text-slate-500 font-medium">More reports will appear here</p>
                    <p className="text-xs text-slate-400">Connected to ABHA Health Locker</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterChip: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1 text-xs font-medium rounded-full border transition-all",
      active ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
    )}
  >
    {label}
  </button>
);

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const mockTimeline: MedicalRecord[] = [
  { id: '1', patientId: 'p1', type: 'CLINICAL', date: '2024-05-10', provider: 'Apollo Hospital', summary: 'Initial consultation for chronic hypertension. Prescribed Amlodipine 5mg.', details: {}, category: 'General' },
  { id: '2', patientId: 'p1', type: 'LAB', date: '2024-05-12', provider: 'Metropolis Labs', summary: 'Blood Glucose: 140 mg/dL (Elevated). HbA1c: 7.2%.', details: {}, category: 'Blood Test' },
  { id: '3', patientId: 'p1', type: 'IMAGING', date: '2024-06-01', provider: 'City Radiology', summary: 'Chest X-Ray: Normal lung fields, no cardiomegaly.', details: {}, category: 'X-Ray' },
  { id: '4', patientId: 'p1', type: 'PRESCRIPTION', date: '2024-06-05', provider: 'Dr. Sharma', summary: 'Adjusted medication for diabetes. Started Metformin 500mg.', details: {}, category: 'Prescription' },
];

const mockDocuments: HealthDocument[] = [
  { id: 'd1', patientId: 'p1', url: '#', fileName: 'blood_report_may.pdf', category: 'LAB', uploadDate: '2024-05-12', aiSummaryEn: 'Blood tests show elevated glucose levels indicating poorly controlled diabetes.', aiSummaryHi: 'रक्त परीक्षण ग्लूकोज के उच्च स्तर दिखाते हैं, जो खराब नियंत्रित मधुमेह का संकेत देते हैं।' },
  { id: 'd2', patientId: 'p1', url: '#', fileName: 'chest_xray_june.jpg', category: 'IMAGING', uploadDate: '2024-06-01', aiSummaryEn: 'The chest X-ray is normal with no signs of infection or heart enlargement.', aiSummaryHi: 'छाती का एक्स-रे सामान्य है और संक्रमण या हृदय वृद्धि का कोई संकेत नहीं है।' },
];

export default HealthHubPage;
