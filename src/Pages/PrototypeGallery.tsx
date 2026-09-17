import React from 'react';
import {
  Users,
  ShieldCheck,
  BarChart3,
  Leaf,
  Bell,
  User,
  Search,
  Globe,
  ChevronRight
} from 'lucide-react';
import { PatientHomeScreen } from '../components/home/PatientHomeScreen';
import { PatientRegistrationScreen } from '../components/registration/PatientRegistrationScreen';
import { TeleconsultationScreen } from '../components/teleconsultation/TeleconsultationScreen';
import { DistrictDashboard } from '../components/dashboard/DistrictDashboard';
import { MobileFrame } from '../components/layout/MobileFrame';
import { cn } from '../utils/cn';

const BenefitBlock = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex items-center gap-4 px-8 py-4 group transition-all hover:bg-slate-50">
    <div className="p-3 bg-primary-light text-primary rounded-2xl group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <div>
      <p className="font-bold text-slate-900 text-sm">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  </div>
);

export const PrototypeGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7FBFF] font-sans text-slate-900">
      {/* TOP HEADER */}
      <header className="bg-white border-b border-slate-100 px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">M</div>
            <div>
              <h1 className="text-xl font-black text-[#0B2A6F] tracking-tight">MONARCH HEALTHSYNC</h1>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Connected Care. Healthier Maharashtra.</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Sample Working Prototype</h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">DIGITAL HEALTHCARE FOR A STRONGER MAHARASHTRA</p>
          </div>

          <div className="text-right flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-slate-900 text-sm">Government of Maharashtra</p>
              <p className="text-[10px] text-slate-500 font-medium italic">For People | For Better Healthcare | For a Healthier Tomorrow</p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
              <span className="text-xs font-bold">MH</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN PROTOTYPE AREA */}
      <main className="max-w-[1600px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

          {/* Screen 1: Patient Home */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white p-4 rounded-[3rem] shadow-soft border border-slate-100 w-full flex justify-center">
              <MobileFrame>
                <PatientHomeScreen onNavigate={() => {}} />
              </MobileFrame>
            </div>
            <div className="text-center space-y-1">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold text-sm shadow-md">1</div>
              <h3 className="font-bold text-slate-900">Patient Home Screen</h3>
              <p className="text-xs text-slate-500">Namaste greeting with key actions</p>
            </div>
          </div>

          {/* Screen 2: Registration */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white p-4 rounded-[3rem] shadow-soft border border-slate-100 w-full flex justify-center">
              <MobileFrame>
                <PatientRegistrationScreen />
              </MobileFrame>
            </div>
            <div className="text-center space-y-1">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold text-sm shadow-md">2</div>
              <h3 className="font-bold text-slate-900">ASHA / ANM Registration</h3>
              <p className="text-xs text-slate-500">Patient registration workflow</p>
            </div>
          </div>

          {/* Screen 3: Teleconsultation */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white p-4 rounded-[3rem] shadow-soft border border-slate-100 w-full flex justify-center">
              <MobileFrame>
                <TeleconsultationScreen />
              </MobileFrame>
            </div>
            <div className="text-center space-y-1">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold text-sm shadow-md">3</div>
              <h3 className="font-bold text-slate-900">Specialist Teleconsultation</h3>
              <p className="text-xs text-slate-500">Secure video consultation</p>
            </div>
          </div>

          {/* Screen 4: Dashboard */}
          <div className="flex flex-col items-center gap-6 lg:col-span-1">
            <div className="bg-white p-4 rounded-[3rem] shadow-soft border border-slate-100 w-full overflow-hidden h-[640px]">
              <div className="w-full h-full overflow-hidden rounded-2xl border border-slate-100">
                <DistrictDashboard />
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto font-bold text-sm shadow-md">4</div>
              <h3 className="font-bold text-slate-900">Maharashtra District Dashboard</h3>
              <p className="text-xs text-slate-500">Government monitoring view</p>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER BENEFIT BAR */}
      <footer className="bg-white border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <BenefitBlock
            icon={Users}
            title="People First"
            subtitle="Accessible. Inclusive. Multilingual."
          />
          <div className="hidden md:block w-px h-12 bg-slate-200" />
          <BenefitBlock
            icon={ShieldCheck}
            title="Secure & Trusted"
            subtitle="Privacy. Consent. Government Ready."
          />
          <div className="hidden md:block w-px h-12 bg-slate-200" />
          <BenefitBlock
            icon={BarChart3}
            title="Data Driven"
            subtitle="Better Decisions. Healthier Communities."
          />
          <div className="hidden md:block w-px h-12 bg-slate-200" />
          <BenefitBlock
            icon={Leaf}
            title="Stronger Maharashtra"
            subtitle="Equitable Healthcare for All."
          />
        </div>
      </footer>
    </div>
  );
};
