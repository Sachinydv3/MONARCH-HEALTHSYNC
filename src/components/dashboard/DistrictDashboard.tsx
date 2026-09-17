import React from 'react';
import {
  LayoutDashboard,
  Users,
  Share2,
  Stethoscope,
  Pill,
  FileText,
  Settings,
  TrendingUp,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../ui/LanguageSelector';

interface KPICardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, trend, trendUp, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-primary-light text-primary rounded-lg">
        {icon}
      </div>
      <span className={cn(
        "text-xs font-bold px-2 py-1 rounded-full",
        trendUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
      )}>
        {trend}
      </span>
    </div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
  </div>
);

export const DistrictDashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen bg-surface overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">M</div>
            <span className="font-bold text-slate-900 text-sm">Monarch HealthSync</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Admin Portal</p>
            <LanguageSelector />
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<Users size={18} />} label="Patients" />
          <NavItem icon={<Share2 size={18} />} label="Referrals" />
          <NavItem icon={<Stethoscope size={18} />} label="Diagnostics" />
          <NavItem icon={<Pill size={18} />} label="Medicines" />
          <NavItem icon={<FileText size={18} />} label="Reports" />
          <div className="my-4 border-t border-slate-100 pt-4" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">District Dashboard - Maharashtra</h1>
              <p className="text-slate-500 text-sm">Real-time healthcare metrics for the district</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Govt of Maharashtra</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 gap-2 text-sm text-slate-600">
              <span className="text-slate-400">Month:</span>
              <span className="font-medium">Jun 2024</span>
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 gap-2 text-sm text-slate-600">
              <span className="text-slate-400">District:</span>
              <span className="font-medium">Pune</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            label="Patients This Month"
            value="12,340"
            trend="+12%"
            trendUp={true}
            icon={<Users size={20} />}
          />
          <KPICard
            label="Referral Completion"
            value="87%"
            trend="+5%"
            trendUp={true}
            icon={<Share2 size={20} />}
          />
          <KPICard
            label="Avg. Waiting Time"
            value="34 min"
            trend="-18%"
            trendUp={false}
            icon={<Clock size={20} />}
          />
          <KPICard
            label="Medicine Stock-outs"
            value="4.1%"
            trend="-2%"
            trendUp={true}
            icon={<Pill size={20} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Facility Status & Trend */}
          <div className="lg:col-span-2 space-y-8">
            {/* Facility Status */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Facility Status</h3>
              <div className="flex flex-wrap gap-4">
                <FacilityTag label="PHC" status="good" />
                <FacilityTag label="CHC" status="warning" />
                <FacilityTag label="District Hospital" status="good" />
                <FacilityTag label="Sub-centre" status="critical" />
              </div>
            </div>

            {/* Patient Trend Chart (SVG Approximation) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Patient Trend (Monthly)</h3>
                <TrendingUp size={20} className="text-slate-400" />
              </div>
              <div className="h-64 w-full relative flex items-end justify-between gap-2 px-4">
                {/* Simulated Chart Bars */}
                {[40, 60, 45, 90, 70, 110, 130, 100, 140, 160, 150, 180].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t-sm transition-all duration-500"
                      style={{ height: `${h}px` }}
                    />
                    <span className="text-[10px] text-slate-400">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Issues & Alerts */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Top Issues</h3>
              <div className="space-y-4">
                <IssueItem
                  priority="High"
                  text="OPD load — Wardha"
                  color="bg-red-100 text-red-600"
                />
                <IssueItem
                  priority="Low"
                  text="Low medicine stock — Gadchiroli"
                  color="bg-amber-100 text-amber-600"
                />
                <IssueItem
                  priority="Medium"
                  text="Diagnostic delay — Nanded"
                  color="bg-blue-100 text-blue-600"
                />
                <IssueItem
                  priority="High"
                  text="Follow-up defaults — Bhandara"
                  color="bg-red-100 text-red-600"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Alerts</h3>
              <div className="space-y-4">
                <AlertItem
                  text="Stock-out: Insulin — PHC B"
                  time="2h ago"
                />
                <AlertItem
                  text="Referral pending — 24h PHC C"
                  time="5h ago"
                />
                <AlertItem
                  text="High-risk pregnancy follow-up due"
                  time="8h ago"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={cn(
    "flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors text-sm font-medium",
    active ? "bg-primary-light text-primary" : "text-slate-600 hover:bg-slate-50"
  )}>
    {icon}
    <span>{label}</span>
  </button>
);

const FacilityTag: React.FC<{ label: string; status: 'good' | 'warning' | 'critical' }> = ({ label, status }) => {
  const colors = {
    good: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    critical: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <div className={cn("px-3 py-1 rounded-full border text-xs font-semibold", colors[status])}>
      {label}
    </div>
  );
};

const IssueItem: React.FC<{ priority: string; text: string; color: string }> = ({ priority, text, color }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", color)}>{priority}</span>
    <span className="text-sm text-slate-700">{text}</span>
  </div>
);

const AlertItem: React.FC<{ text: string; time: string }> = ({ text, time }) => (
  <div className="flex justify-between items-start gap-2 py-2 border-b border-slate-50 last:border-none">
    <span className="text-xs text-slate-600">{text}</span>
    <span className="text-[10px] text-slate-400">{time}</span>
  </div>
);

const Clock = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
