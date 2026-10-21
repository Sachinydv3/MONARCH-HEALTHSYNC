import React, { useState, useEffect } from 'react';
import { OutcomeAnalytics } from '../components/admin/OutcomeAnalytics';
import { AuditLogTable } from '../components/admin/AuditLogTable';
import { HospitalIntelligenceDashboard } from '../components/admin/hospital-intelligence/HospitalIntelligenceDashboard';
import { adminService, AuditLogEntry } from '../services/core/AdminService';

const AdminDashboardPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      setIsLoading(true);
      try {
        // In a real app, we'd fetch from adminService.getAuditLogs()
        // Mocking audit logs for the prototype
        setLogs([
          { id: 'l1', userId: 'u1', timestamp: new Date().toISOString(), userName: 'Dr. Anjali', action: 'READ', resourceId: 'patient_123', resourceType: 'PATIENT_RECORD', reason: 'Clinical Review', severity: 'INFO', ipAddress: '192.168.1.1' },
          { id: 'l2', userId: 'u2', timestamp: new Date().toISOString(), userName: 'Nurse Sita', action: 'WRITE', resourceId: 'doc_456', resourceType: 'DOCUMENT', reason: 'Uploaded Lab Report', severity: 'INFO', ipAddress: '192.168.1.2' },
          { id: 'l3', userId: 'u3', timestamp: new Date().toISOString(), userName: 'Unknown', action: 'READ', resourceId: 'patient_789', resourceType: 'PATIENT_RECORD', reason: 'Unauthorized Access Attempt', severity: 'CRITICAL', ipAddress: '203.0.113.5' },
          { id: 'l4', userId: 'u4', timestamp: new Date().toISOString(), userName: 'Admin Rahul', action: 'CONSENT_CHANGE', resourceId: 'patient_123', resourceType: 'PATIENT_RECORD', reason: 'Patient revoked access', severity: 'WARNING', ipAddress: '192.168.1.10' },
        ]);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Hospital Administration</h1>
            <p className="text-slate-500">Institutional Management & Security Center</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase mr-2">System Status:</span>
            <span className="text-xs font-bold text-emerald-600">All Systems Operational</span>
          </div>
        </div>

        {/* 1. Hospital Intelligence */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-lg font-bold text-slate-900">Hospital Intelligence Dashboard</h2>
          </div>
          <HospitalIntelligenceDashboard />
        </section>

        {/* 2. Clinical Outcome Analytics */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-lg font-bold text-slate-900">Clinical Outcome Analytics</h2>
          </div>
          <OutcomeAnalytics />
        </section>

        {/* 3. Security Audit Trail */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.25c-2.785 0-5.333 1.155-7.318 3.016a11.96 11.96 0 00-3.318 8.23c0 6.627 5.373 12 12 12s12-5.373 12-12c0-1.87-.44-3.63-1.224-5.18z" />
            </svg>
            <h2 className="text-lg font-bold text-slate-900">Security Audit Center</h2>
          </div>
          <AuditLogTable logs={logs} />
        </section>

        {/* 3. System Config Footer */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="text-sm text-slate-500">
            Logged in as <span className="font-bold text-slate-900">Hospital Administrator</span> •
             permissions: <span className="font-mono text-xs bg-slate-100 px-1 rounded">SYSTEM_ALL</span>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
            System Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
