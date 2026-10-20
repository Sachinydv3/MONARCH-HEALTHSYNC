import React from 'react';
import { Button, Card, Input } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { Prescription, Medication } from '@/types';

const PharmacyLabPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{t('pharmacy.title', 'Medicine & Diagnostics')}</h1>
        <p className="text-slate-500">{t('pharmacy.subtitle', 'Coordinate your prescriptions and lab tests')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Medicine Availability Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>💊</span> {t('pharmacy.meds_title', 'Active Prescriptions')}
            </h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: 'Metformin 500mg',
                dosage: '1 tablet',
                freq: 'Twice daily',
                status: 'IN_STOCK',
                pharmacies: ['Apollo Pharmacy', 'Netmeds']
              },
              {
                name: 'Atorvastatin 20mg',
                dosage: '1 tablet',
                freq: 'Nightly',
                status: 'LIMITED',
                pharmacies: ['Wellness Forever']
              },
              {
                name: 'Specialized Rare Drug X',
                dosage: '5ml',
                freq: 'Weekly',
                status: 'OUT_OF_STOCK',
                pharmacies: []
              },
            ].map((med, i) => (
              <Card key={i} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-800">{med.name}</p>
                    <p className="text-sm text-slate-500">{med.dosage} • {med.freq}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    med.status === 'IN_STOCK' ? 'bg-green-100 text-green-700' :
                    med.status === 'LIMITED' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {med.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {med.pharmacies.length > 0 ? (
                    med.pharmacies.map((p, pi) => (
                      <span key={pi} className="text-xs bg-slate-100 px-2 py-1 rounded border text-slate-600">
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-red-500 italic">No nearby availability</span>
                  )}
                </div>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  {med.status === 'IN_STOCK' ? 'Order Now' : 'Set Availability Alert'}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Diagnostic Coordination Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>🧪</span> {t('pharmacy.labs_title', 'Diagnostic Orders')}
            </h3>
            <Button variant="outline" size="sm">Order Test</Button>
          </div>
          <div className="space-y-4">
            {[
              { test: 'HbA1c Test', date: '2024-10-25', status: 'ORDERED', lab: 'Dr. Lal PathLabs' },
              { test: 'Lipid Profile', date: '2024-10-20', status: 'COMPLETED', lab: 'Metropolis' },
              { test: 'Chest X-Ray', date: '2024-10-18', status: 'COLLECTED', lab: 'City Imaging' },
            ].map((lab, i) => (
              <Card key={i} className="p-4 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800">{lab.test}</p>
                  <p className="text-xs text-slate-500">{lab.lab} • {lab.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    lab.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    lab.status === 'COLLECTED' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {lab.status}
                  </span>
                  {lab.status === 'COMPLETED' && <Button variant="ghost" size="sm">📄</Button>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyLabPage;
