import React from 'react';
import { ReferralTracker, Referral } from '../clinical/referrals/ReferralTracker';

export const CareCoordinationPage: React.FC = () => {
  // Mock coordination data
  const referrals: Referral[] = [
    {
      id: 'ref-1',
      patientId: 'p1',
      patientName: 'Rajesh Kumar',
      fromFacility: 'Kondgaon Rural Health Centre',
      toFacility: 'Pune District Hospital',
      specialistName: 'Dr. Priya Sharma',
      specialty: 'Cardiology',
      urgency: 'URGENT',
      status: 'SCHEDULED',
      createdAt: '2026-10-15',
      scheduledDate: '2026-10-22 10:00 AM',
      attachedRecords: ['blood_work.pdf', 'ecg_report.jpg'],
    },
    {
      id: 'ref-2',
      patientId: 'p2',
      patientName: 'Sita Devi',
      fromFacility: 'Kondgaon Rural Health Centre',
      toFacility: 'Pune District Hospital',
      specialistName: 'Dr. Amit Verma',
      specialty: 'Neurology',
      urgency: 'NORMAL',
      status: 'OVERDUE',
      createdAt: '2026-10-01',
      attachedRecords: ['clinical_note.pdf'],
    },
    {
      id: 'ref-3',
      patientId: 'p3',
      patientName: 'Amit Patel',
      fromFacility: 'Primary Health Centre A',
      toFacility: 'National State Medical College',
      specialistName: 'Dr. Sneha Patil',
      specialty: 'Endocrinology',
      urgency: 'EMERGENCY',
      status: 'COMPLETED',
      createdAt: '2026-10-18',
      scheduledDate: '2026-10-19 02:00 PM',
      attachedRecords: ['fasting_glucose.pdf', 'lipid_profile.pdf'],
      feedback: 'Patient stabilized, follow-up in 4 weeks',
    },
    {
      id: 'ref-4',
      patientId: 'p4',
      patientName: 'Meena Bai',
      fromFacility: 'Kondgaon Rural Health Centre',
      toFacility: 'National State Medical College',
      specialistName: 'Dr. Sneha Patil',
      specialty: 'Endocrinology',
      urgency: 'NORMAL',
      status: 'PENDING',
      createdAt: '2026-10-20',
      attachedRecords: [],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Care Coordination Hub</h1>
            <p className="text-slate-500">Referral Tracking & Public Health Routing</p>
          </div>
        </div>

        <ReferralTracker referrals={referrals} />

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Facility Directory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-800">Pune District Hospital</p>
              <p className="text-xs text-slate-500">Available: MRI, CT, Echo, Full Surgical Suite</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-800">Kondgaon Rural Health Centre</p>
              <p className="text-xs text-slate-500">Available: X-Ray, Basic Blood Lab, Maternal Care</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareCoordinationPage;
