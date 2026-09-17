import React from 'react';

interface VideoAreaProps {
  doctorImageUrl?: string;
  patientImageUrl?: string;
  isCameraOn: boolean;
}

export const VideoArea: React.FC<VideoAreaProps> = ({
  doctorImageUrl = 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800',
  patientImageUrl = 'https://images.unsplash.com/photo-1537368910025-70a27935d772?auto=format&fit=crop&q=80&w=400',
  isCameraOn,
}) => {
  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/* Specialist Main Feed */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
        <img
          src={doctorImageUrl}
          alt="Specialist"
          className="w-full h-full object-cover"
        />
        {/* Overlay for professional medical feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Patient PIP View */}
      <div className="absolute bottom-24 right-4 w-32 h-48 bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-10">
        {isCameraOn ? (
          <img
            src={patientImageUrl}
            alt="Patient"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-400">
            <div className="text-center px-2">
              <div className="w-8 h-8 bg-slate-600 rounded-full mx-auto mb-2" />
              <span className="text-[10px] font-medium">Camera Off</span>
            </div>
          </div>
        )}
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <span className="text-[8px] text-white/70 uppercase font-bold px-1 bg-black/40 rounded">You</span>
        </div>
      </div>

      {/* Public Health Branding Overlay */}
      <div className="absolute top-24 left-4 pointer-events-none">
        <div className="bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-2 rounded-xl">
          <p className="text-white text-[10px] font-medium leading-tight max-w-[120px]">
            Care for a <br />
            <span className="text-primary-light font-bold text-xs">Healthier</span> <br />
            Maharashtra
          </p>
        </div>
      </div>
    </div>
  );
};
