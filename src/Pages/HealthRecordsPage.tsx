import React, { useState } from 'react';
import { Button, Card } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { Patient } from '@/types';

const HealthRecordsPage = () => {
  const { t } = useTranslation();
  const [showQR, setShowQR] = useState(false);

  const mockPatient: Patient = {
    id: 'p123',
    fullName: 'Rajesh Kumar',
    dateOfBirth: '1985-05-12',
    gender: 'male',
    mobileNumber: '+91 98765 43210',
    village: 'Khed',
    taluka: 'Khed',
    district: 'Pune',
    state: 'Maharashtra',
    createdAt: '2023-01-01',
    updatedAt: '2024-10-20',
    qrCodeToken: 'SECURE_JWT_TOKEN_XYZ_123',
    consentPolicies: [
      { id: 'c1', providerId: 'hosp_01', allowedScopes: ['vitals', 'diagnostics'], expiresAt: '2025-12-31', status: 'ACTIVE' },
      { id: 'c2', providerId: 'lab_05', allowedScopes: ['blood_tests'], expiresAt: '2024-11-01', status: 'ACTIVE' },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">{t('records.title', 'Digital Health Locker')}</h1>
          <p className="text-slate-500">{t('records.subtitle', 'Your medical history, secured and patient-controlled')}</p>
        </div>
        <Button onClick={() => setShowQR(true)} className="bg-blue-600 hover:bg-blue-700 flex gap-2">
          <span>📱</span> {t('records.generate_qr', 'Generate Access QR')}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Profile Summary */}
        <Card className="p-6 lg:col-span-1 space-y-4">
          <div className="text-center space-y-3">
            <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-slate-500">RK</div>
            <h2 className="text-xl font-bold">{mockPatient.fullName}</h2>
            <p className="text-sm text-slate-500">ABHA ID: {mockPatient.abhaId || 'Not Linked'}</p>
          </div>
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{t('records.dob', 'DOB')}</span>
              <span className="font-medium">{mockPatient.dateOfBirth}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{t('records.gender', 'Gender')}</span>
              <span className="font-medium">{mockPatient.gender}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{t('records.blood_group', 'Blood Group')}</span>
              <span className="font-medium text-red-600">O+</span>
            </div>
          </div>
        </Card>

        {/* Medical Documents / Records */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{t('records.docs_title', 'Medical Documents')}</h3>
            <Button variant="outline" size="sm">{t('records.upload', 'Upload Document')}</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Annual Health Checkup', date: '2024-09-15', type: 'Report', color: 'blue' },
              { title: 'Chest X-Ray', date: '2024-08-02', type: 'Imaging', color: 'purple' },
              { title: 'Blood Lipid Profile', date: '2024-07-20', type: 'Lab', color: 'green' },
              { title: 'COVID-19 Vaccination', date: '2021-11-10', type: 'Certificate', color: 'orange' },
            ].map((doc, i) => (
              <Card key={i} className="p-4 flex justify-between items-center hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded bg-${doc.color}-100 text-${doc.color}-600 flex items-center justify-center font-bold`}>
                    {doc.type[0]}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{doc.title}</p>
                    <p className="text-xs text-slate-500">{doc.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">👁️</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Consent Management */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{t('records.consent_title', 'Data Access Consent')}</h3>
        <div className="space-y-3">
          {mockPatient.consentPolicies.map(policy => (
            <div key={policy.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
                <div>
                  <p className="text-sm font-medium">{policy.providerId}</p>
                  <p className="text-[10px] text-slate-500">Scopes: {policy.allowedScopes.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400">Expires: {policy.expiresAt}</span>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Revoke</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="p-8 max-w-sm w-full text-center space-y-6">
            <h2 className="text-2xl font-bold">{t('records.qr_title', 'Secure Access QR')}</h2>
            <div className="aspect-square bg-slate-100 mx-auto flex items-center justify-center border-4 border-slate-200 rounded-xl">
              <div className="w-48 h-48 bg-slate-800" /> {/* Placeholder for actual QR */}
            </div>
            <div className="text-sm text-slate-500 space-y-1">
              <p>{t('records.qr_desc', 'Scan this code to provide temporary medical record access to a healthcare provider.')}</p>
              <p className="font-bold text-blue-600">Expires in 15 minutes</p>
            </div>
            <Button onClick={() => setShowQR(false)} className="w-full">Close</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthRecordsPage;
