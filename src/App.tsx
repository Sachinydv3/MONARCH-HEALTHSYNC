import React, { useState } from 'react';
import { LandingPage } from './Pages/LandingPage';
import { PrototypeGallery } from './Pages/PrototypeGallery';
import { PatientRegistrationScreen } from './components/registration/PatientRegistrationScreen';
import { ScreeningScreen } from './components/registration/ScreeningScreen';
import { TriageScreen } from './components/registration/TriageScreen';
import { ReferralScreen } from './components/registration/ReferralScreen';
import { AppointmentScreen } from './components/registration/AppointmentScreen';
import { TeleconsultationScreen } from './components/teleconsultation/TeleconsultationScreen';
import { CarePlanScreen } from './components/careplan/CarePlanScreen';
import { PatientHomeScreen } from './components/home/PatientHomeScreen';
import { DistrictDashboard } from './components/dashboard/DistrictDashboard';
import { MobileFrame } from './components/layout/MobileFrame';
import { cn } from './utils/cn';

type AppView = 'landing' | 'gallery' | 'patient' | 'worker' | 'admin' | 'screening' | 'triage' | 'referral' | 'appointment' | 'teleconsultation' | 'careplan';

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [patientData, setPatientData] = useState<any>(null);
  const [screeningData, setScreeningData] = useState<any>(null);
  const [referralData, setReferralData] = useState<any>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);

  const handleRegistrationComplete = (data: any) => {
    setPatientData(data);
    setView('screening');
  };

  const handleScreeningComplete = (data: any) => {
    setScreeningData(data);
    setView('triage');
  };

  const handleTriageComplete = (decision: 'PHC' | 'REFERRAL') => {
    if (decision === 'REFERRAL') {
      setView('referral');
    } else {
      alert('Patient assigned to Routine Care at PHC. Flow complete.');
      setView('patient');
    }
  };

  const handleReferralComplete = (data: any) => {
    setReferralData(data);
    setView('appointment');
  };

  const handleAppointmentComplete = (data: any) => {
    setAppointmentData(data);
    setView('teleconsultation');
  };

  return (
    <div className="min-h-screen bg-slate-100">
        {view === 'landing' && <LandingPage onEnterApp={(role) => {
          if (role === 'patient') setView('patient');
          else if (role === 'worker') setView('worker');
          else if (role === 'admin') setView('admin');
        }} />}

        {view === 'gallery' && <PrototypeGallery />}

        {view === 'patient' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <MobileFrame>
              <PatientHomeScreen
                onNavigate={(v) => {
                  if (v === 'appointments') setView('teleconsultation');
                  else if (v === 'registration') setView('worker');
                  else alert(`${v} is coming soon!`);
                }}
              />
            </MobileFrame>
          </div>
        )}

        {view === 'worker' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <MobileFrame>
              <PatientRegistrationScreen
                onComplete={handleRegistrationComplete}
              />
            </MobileFrame>
          </div>
        )}

        {view === 'screening' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <MobileFrame>
              <ScreeningScreen
                patientName={patientData?.fullName || 'Sita Devi'}
                onBack={() => setView('worker')}
                onComplete={handleScreeningComplete}
              />
            </MobileFrame>
          </div>
        )}

        {view === 'triage' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <MobileFrame>
              <TriageScreen
                patientName={patientData?.fullName || 'Sita Devi'}
                vitals={screeningData?.vitals || { bp: '120/80', pulse: '72', temp: '98.6', spo2: '98' }}
                onBack={() => setView('screening')}
                onTriageComplete={handleTriageComplete}
              />
            </MobileFrame>
          </div>
        )}

        {view === 'referral' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <MobileFrame>
              <ReferralScreen
                patientName={patientData?.fullName || 'Sita Devi'}
                onBack={() => setView('triage')}
                onComplete={handleReferralComplete}
              />
            </MobileFrame>
          </div>
        )}

        {view === 'appointment' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <MobileFrame>
              <AppointmentScreen
                patientName={patientData?.fullName || 'Sita Devi'}
                specialistName={referralData?.specialistName || 'Dr. Priya Sharma'}
                onBack={() => setView('referral')}
                onComplete={handleAppointmentComplete}
              />
            </MobileFrame>
          </div>
        )}

        {view === 'teleconsultation' && (
          <div className="flex items-center justify-center min-h-screen p-0">
            <TeleconsultationScreen />
          </div>
        )}

        {view === 'admin' && (
          <div className="w-full h-screen">
            <DistrictDashboard />
          </div>
        )}

        {/* Hidden Debug Navigation */}
        <div className="fixed bottom-4 right-4 z-50 flex gap-2 opacity-10 hover:opacity-100 transition-opacity">
          <button onClick={() => setView('landing')} className="px-2 py-1 bg-black text-white text-[10px] rounded">Landing</button>
          <button onClick={() => setView('gallery')} className="px-2 py-1 bg-black text-white text-[10px] rounded">Gallery</button>
          <button onClick={() => setView('patient')} className="px-2 py-1 bg-black text-white text-[10px] rounded">Patient</button>
          <button onClick={() => setView('worker')} className="px-2 py-1 bg-black text-white text-[10px] rounded">Worker</button>
          <button onClick={() => setView('admin')} className="px-2 py-1 bg-black text-white text-[10px] rounded">Admin</button>
        </div>
      </div>
  );
}

export default App;
