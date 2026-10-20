import React, { useState } from 'react';
import { Button, Card } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { Consultation, Vitals } from '@/types';

const TeleconsultationPage = () => {
  const { t } = useTranslation();
  const [isCallActive, setIsCallActive] = useState(false);
  const [vitals, setVitals] = useState<Vitals>({
    bloodPressure: '120/80',
    pulseRate: 72,
    temperature: 36.6,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 70,
    height: 175
  });

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      <header className="p-4 flex justify-between items-center bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">DR</div>
          <div>
            <h1 className="font-semibold">Dr. Sarah Jenkins</h1>
            <p className="text-xs text-slate-400">Specialist Cardiologist</p>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={() => setIsCallActive(false)}
          className="bg-red-600 hover:bg-red-700"
        >
          {t('telecon.end_call', 'End Call')}
        </Button>
      </header>

      <main className="flex-1 relative flex gap-4 p-4 overflow-hidden">
        {/* Main Video Feed */}
        <div className="flex-1 relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
          {!isCallActive ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="w-24 h-24 rounded-full bg-slate-700 mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">{t('telecon.waiting', 'Waiting for Doctor...')}</h2>
              <p className="text-slate-400 mb-6">{t('telecon.waiting_desc', 'Your secure HD connection is being established.')}</p>
              <Button onClick={() => setIsCallActive(true)} className="bg-blue-600 hover:bg-blue-700">
                {t('telecon.join_now', 'Join Now')}
              </Button>
            </div>
          ) : (
            <div className="absolute inset-0 bg-slate-700 flex items-center justify-center">
              <span className="text-slate-500 italic">HD Video Stream Active</span>
            </div>
          )}

          {/* Patient Self-View */}
          <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-900 rounded-lg border-2 border-blue-500 overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
              Patient View
            </div>
          </div>
        </div>

        {/* Clinical Sidebar */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto">
          <Card className="p-4 bg-slate-800 border-slate-700 text-white">
            <h3 className="font-bold mb-3 text-blue-400 flex items-center gap-2">
              <span>📊</span> {t('telecon.live_vitals', 'Live Vitals')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'BP', value: vitals.bloodPressure, unit: 'mmHg' },
                { label: 'HR', value: vitals.pulseRate, unit: 'bpm' },
                { label: 'SpO2', value: `${vitals.oxygenSaturation}%`, unit: '%' },
                { label: 'Temp', value: `${vitals.temperature}°C`, unit: '°C' },
              ].map((v, i) => (
                <div key={i} className="p-2 bg-slate-700 rounded-lg">
                  <p className="text-[10px] text-slate-400 uppercase">{v.label}</p>
                  <p className="text-lg font-bold">{v.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700 text-white flex-1 overflow-hidden flex flex-col">
            <h3 className="font-bold mb-3 text-blue-400 flex items-center gap-2">
              <span>✍️</span> {t('telecon.ai_scribe', 'AI Clinical Scribe')}
            </h3>
            <div className="flex-1 overflow-y-auto text-sm space-y-3 text-slate-300 font-mono">
              <p className="text-slate-500 italic text-xs border-b border-slate-700 pb-1 mb-2">Live Transcript</p>
              <p><span className="text-blue-400">Doc:</span> Hello Mr. Sharma, I see your heart rate has been slightly elevated...</p>
              <p><span className="text-green-400">Pat:</span> Yes, I've felt some palpitations since Tuesday.</p>
              <p><span className="text-blue-400">Doc:</span> I'm reviewing your latest ECG now...</p>
              <div className="p-2 bg-blue-900/30 rounded border border-blue-700/50 text-xs italic">
                AI Summary: Patient reports palpitations since Tuesday. Doctor reviewing ECG.
              </div>
            </div>
            <Button variant="outline" className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700">
              {t('telecon.save_notes', 'Finalize SOAP Note')}
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeleconsultationPage;
