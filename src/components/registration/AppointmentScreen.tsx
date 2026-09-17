import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface AppointmentScreenProps {
  patientName: string;
  specialistName: string;
  onComplete: (appointment: any) => void;
  onBack: () => void;
}

export const AppointmentScreen: React.FC<AppointmentScreenProps> = ({
  patientName,
  specialistName,
  onComplete,
  onBack,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-12');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const dates = [
    { date: '2026-09-10', day: 'Today', label: 'Thu' },
    { date: '2026-09-11', day: 'Tomorrow', label: 'Fri' },
    { date: '2026-09-12', day: '12 Sep', label: 'Sat' },
    { date: '2026-09-13', day: '13 Sep', label: 'Sun' },
    { date: '2026-09-14', day: '14 Sep', label: 'Mon' },
    { date: '2026-09-15', day: '15 Sep', label: 'Tue' },
    { date: '2026-09-16', day: '16 Sep', label: 'Wed' },
  ];

  const slots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const handleBook = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    onComplete({
      patientName,
      specialistName,
      date: selectedDate,
      slot: selectedSlot,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-hidden">
      <header className="flex items-center px-4 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 mr-3">
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-lg font-semibold text-slate-900">Book Appointment</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-3 overflow-hidden border-4 border-white shadow-md">
            <img src="https://i.pravatar.cc/150?u=doc1" alt="Specialist" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">{specialistName}</h2>
          <p className="text-slate-500 text-sm">Cardiology Specialist</p>
        </div>

        {/* Date Picker */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-primary" />
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Select Date</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={cn(
                  "flex-shrink-0 w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all",
                  selectedDate === d.date
                    ? "border-primary bg-primary text-white shadow-lg scale-105"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                )}
              >
                <span className="text-[10px] font-bold uppercase">{d.label}</span>
                <span className="text-lg font-bold">{d.day.slice(0, 2)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-primary" />
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Available Slots</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={cn(
                  "py-2 px-1 text-center rounded-xl border-2 text-xs font-medium transition-all",
                  selectedSlot === slot
                    ? "border-primary bg-primary-light text-primary shadow-sm"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface via-surface to-transparent">
        <Button className="w-full" size="lg" onClick={handleBook}>
          Confirm Appointment →
        </Button>
      </div>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
