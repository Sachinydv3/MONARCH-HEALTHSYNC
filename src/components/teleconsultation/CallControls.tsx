import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, MoreVertical } from 'lucide-react';

interface CallControlsProps {
  isMuted: boolean;
  isCameraOff: boolean;
  onMuteToggle: () => void;
  onCameraToggle: () => void;
  onEndCall: () => void;
  onOpenChat: () => void;
  onOpenMore: () => void;
}

export const CallControls: React.FC<CallControlsProps> = ({
  isMuted,
  isCameraOff,
  onMuteToggle,
  onCameraToggle,
  onEndCall,
  onOpenChat,
  onOpenMore,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md p-6 pb-10 flex items-center justify-between gap-4 z-20">
      <div className="flex items-center justify-between w-full max-w-md mx-auto gap-4">

        <ControlButton
          onClick={onMuteToggle}
          active={!isMuted}
          icon={isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          label="Mute"
        />

        <ControlButton
          onClick={onCameraToggle}
          active={!isCameraOff}
          icon={isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
          label="Camera"
        />

        <button
          onClick={onEndCall}
          className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-900/40 hover:bg-red-700 active:scale-90 transition-all duration-200"
        >
          <PhoneOff size={32} fill="currentColor" />
        </button>

        <ControlButton
          onClick={onOpenChat}
          active={false}
          icon={<MessageSquare size={24} />}
          label="Chat"
        />

        <ControlButton
          onClick={onOpenMore}
          active={false}
          icon={<MoreVertical size={24} />}
          label="More"
        />

      </div>
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
          'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
          active
            ? 'bg-white text-slate-900 shadow-sm'
            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
        )}
      >
        {icon}
      </button>
      <span className="text-[10px] text-slate-500 font-medium">{label}</span>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
