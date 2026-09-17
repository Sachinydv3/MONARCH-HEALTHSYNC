import React, { useState } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, MessageSquare, MoreVertical, Signal } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCallTimer } from '../../hooks/teleconsultation/useCallTimer';
import { useConnectionStatus } from '../../hooks/teleconsultation/useConnectionStatus';
import { cn } from '../../utils/cn';

interface TeleconsultationScreenProps {}

export const TeleconsultationScreen: React.FC<TeleconsultationScreenProps> = () => {
  const [isActive, setIsActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { formattedTime } = useCallTimer(isActive);
  const { label, color } = useConnectionStatus();

  const handleEndCall = () => {
    setIsActive(false);
    setShowSummary(true);
  };

  if (showSummary) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-50 flex items-center justify-center p-4">
         <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 text-center p-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
               <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Consultation Ended</h2>
            <p className="text-slate-500 mb-8">Your session with Dr. Priya Sharma has been successfully synced.</p>
            <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex justify-between items-center border border-slate-100">
               <span className="text-sm text-slate-500">Total Duration:</span>
               <span className="font-bold text-slate-900">{formattedTime}</span>
            </div>
            <Button className="w-full" size="lg" onClick={() => window.location.reload()}>
              Return to Dashboard
            </Button>
         </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden max-w-md mx-auto shadow-2xl border-x border-slate-800">
      {/* Premium Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex items-start justify-between text-white">
        <div className="flex items-center gap-3">
          <button className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-colors" onClick={() => alert('Exiting call...')}>
            <span className="text-xl">←</span>
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">Dr. Priya Sharma</h1>
            <p className="text-xs text-slate-300 font-medium">Cardiology Specialist</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-mono bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", color)} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
          </div>
          <div className="flex gap-0.5 items-end h-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-0.5 rounded-full transition-all duration-500",
                  i <= 3 ? "bg-green-400" : "bg-white/20"
                )}
                style={{ height: `${i * 25}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1559839734-2b71f0536780?auto=format&fit=crop&q=80&w=800"
          alt="Doctor"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Patient PIP */}
      <div className="absolute bottom-32 right-4 w-28 h-40 bg-slate-800 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl z-10 group transition-transform hover:scale-105">
        {isCameraOff ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-400">
            <div className="text-center px-2">
              <div className="w-8 h-8 bg-slate-600 rounded-full mx-auto mb-2" />
              <span className="text-[10px] font-medium">Off</span>
            </div>
          </div>
        ) : (
          <img src="https://i.pravatar.cc/150?u=patient" alt="Patient" className="w-full h-full object-cover" />
        )}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-[8px] text-white font-bold px-2 py-0.5 bg-black/50 rounded-full">YOU</span>
        </div>
      </div>

      {/* Branding Overlay */}
      <div className="absolute top-24 left-6 pointer-events-none">
        <div className="bg-primary/30 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl">
          <p className="text-white text-xs font-medium leading-relaxed max-w-[140px]">
            Care for a <br />
            <span className="text-primary-light font-bold text-sm">Healthier</span> <br />
            Maharashtra
          </p>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
        <div className="flex items-center justify-between w-full max-w-xs mx-auto gap-6">
          <ControlButton
            onClick={() => setIsMuted(!isMuted)}
            active={!isMuted}
            icon={isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            label="Mute"
          />
          <ControlButton
            onClick={() => setIsCameraOff(!isCameraOff)}
            active={!isCameraOff}
            icon={isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
            label="Camera"
          />
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-900/40 hover:bg-red-700 active:scale-90 transition-all duration-200"
          >
            <PhoneOff size={32} fill="currentColor" />
          </button>
          <ControlButton
            onClick={() => setIsChatOpen(true)}
            active={false}
            icon={<MessageSquare size={24} />}
            label="Chat"
          />
          <ControlButton
            onClick={() => alert('Settings opened')}
            active={false}
            icon={<MoreVertical size={24} />}
            label="More"
          />
        </div>
      </div>

      {/* Chat Overlay */}
      {isChatOpen && (
        <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="p-6 border-b border-white/10 flex items-center justify-between text-white">
            <h3 className="font-bold text-lg">Consultation Chat</h3>
            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full">✕</button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="flex flex-col items-start">
              <div className="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm shadow-sm">
                Dr. Priya: Please confirm the patient's current BP.
              </div>
              <span className="text-[10px] text-slate-500 mt-1 ml-1">10:12 AM</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm shadow-lg shadow-primary/20">
                168/102 mmHg.
              </div>
              <span className="text-[10px] text-slate-500 mt-1 mr-1">10:13 AM</span>
            </div>
          </div>
          <div className="p-6 bg-slate-900 border-t border-white/10 flex gap-3">
            <input
              className="flex-1 bg-slate-800 border-none rounded-2xl px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Type message..."
            />
            <button className="bg-primary text-white p-3 rounded-2xl hover:bg-primary-dark transition-colors">
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ControlButton: React.FC<{
  onClick: () => void;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}> = ({ onClick, active, icon, label }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
          active
            ? "bg-white text-slate-900 shadow-lg scale-110"
            : "bg-white/10 text-slate-400 hover:bg-white/20"
        )}
      >
        {icon}
      </button>
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-tighter",
        active ? "text-white" : "text-slate-500"
      )}>{label}</span>
    </div>
  );
};
