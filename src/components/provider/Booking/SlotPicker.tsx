import React, { useState } from 'react';
import { Slot } from '../../../types/index';

interface SlotPickerProps {
  providerId: string;
  onSlotSelected: (slotId: string) => void;
}

export const SlotPicker: React.FC<SlotPickerProps> = ({ providerId, onSlotSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSlots = async (date: string) => {
    setIsLoading(true);
    // Mock slots for prototype
    setTimeout(() => {
      setSlots([
        { id: 's1', startTime: '09:00 AM', endTime: '09:30 AM', status: 'AVAILABLE' },
        { id: 's2', startTime: '10:00 AM', endTime: '10:30 AM', status: 'BOOKED' },
        { id: 's3', startTime: '11:30 AM', endTime: '12:00 PM', status: 'AVAILABLE' },
        { id: 's4', startTime: '02:00 PM', endTime: '02:30 PM', status: 'AVAILABLE' },
        { id: 's5', startTime: '04:00 PM', endTime: '04:30 PM', status: 'BOOKED' },
      ]);
      setIsLoading(false);
    }, 500);
  };

  React.useEffect(() => {
    loadSlots(selectedDate);
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-slate-600">Select Date:</label>
        <input
          type="date"
          className="px-3 py-1 border border-slate-200 rounded-md text-sm"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div >

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {slots.map(slot => (
            <button
              key={slot.id}
              disabled={slot.status === 'BOOKED'}
              onClick={() => onSlotSelected(slot.id)}
              className={cn(
                "py-2 text-xs font-medium rounded-lg border transition-all",
                slot.status === 'BOOKED'
                  ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed"
                  : "bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:text-blue-600"
              )}
            >
              {slot.startTime}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
