import React, { useState } from 'react';
import { Patient, DiagnosticOrder, Prescription } from '../types';
import { clinicalWorkflowService as ClinicalWorkflowService } from '../services/core/ClinicalWorkflowService';
import { PrescriptionWriter } from '../components/clinical/PrescriptionWriter';
import { DiagnosticTracker } from '../components/clinical/DiagnosticTracker';
import { PatientProfileCard } from '../components/healthhub/Profile/PatientProfileCard';
import { cn } from '../utils/cn';

const ClinicalWorkspacePage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'prescription' | 'diagnostic' | 'referral'>('prescription');
  const [isSaving, setIsSaving] = useState(false);

  // Mocking the active patient for the workspace
  const patient: Patient = {
    id: 'patient_123',
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
  };

  const criticalInfo = {
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Type 2 Diabetes', 'Hypertension'],
  };

  const mockDiagnosticOrder: DiagnosticOrder = {
    id: 'do1',
    patientId: 'patient_123',
    testName: 'HbA1c (Glycated Hemoglobin)',
    priority: 'NORMAL',
    status: 'COLLECTED',
    orderedAt: new Date().toISOString(),
  };

  const handleIssuePrescription = async (meds: any[], notes: string, signed: boolean) => {
    setIsSaving(true);
    try {
      await ClinicalWorkflowService.issuePrescription({
        patientId: patient.id,
        doctorId: 'doc_current',
        medications: meds,
        notes,
      }, signed);
      alert(signed ? 'Prescription signed and issued!' : 'Prescription saved as draft.');
    } catch (e) {
      alert('Error issuing prescription.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Clinical Workspace</h1>
            <p className="text-slate-500">Active Consultation: {patient.fullName}</p>
          </div>
          <div className="flex gap-2">
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                activeTool === 'prescription' ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
              onClick={() => setActiveTool('prescription')}
            >
              Prescriptions
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                activeTool === 'diagnostic' ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
              onClick={() => setActiveTool('diagnostic')}
            >
              Diagnostics
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                activeTool === 'referral' ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              )}
              onClick={() => setActiveTool('referral')}
            >
              Referrals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Col: Patient Context */}
          <div className="lg:col-span-1 space-y-6">
            <PatientProfileCard patient={patient} criticalInfo={criticalInfo} />
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Active Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                  <p className="text-xs font-bold text-red-700">CRITICAL ALLERGY</p>
                  <p className="text-xs text-red-600">Penicillin - Severe Anaphylaxis</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <p className="text-xs font-bold text-amber-700">PENDING LABS</p>
                  <p className="text-xs text-amber-600">HbA1c result expected in 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Clinical Tools */}
          <div className="lg:col-span-2 space-y-6">
            {activeTool === 'prescription' && (
              <PrescriptionWriter
                patientId={patient.id}
                doctorId='doc_current'
                onIssue={handleIssuePrescription}
              />
            )}

            {activeTool === 'diagnostic' && (
              <div className="space-y-6">
                <DiagnosticTracker order={mockDiagnosticOrder} />
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">New Diagnostic Order</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Test Name (e.g. Lipid Profile)"
                      className="px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Normal Priority</option>
                      <option>Urgent / STAT</option>
                    </select>
                    <button className="md:col-span-2 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTool === 'referral' && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Referral Coordination</h3>
                <p className="text-slate-500">Manage patient transfers and specialist hand-offs.</p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Create New Referral
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalWorkspacePage;
