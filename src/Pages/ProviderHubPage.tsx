import React, { useState } from 'react';
import { DoctorSearch } from '../components/provider/Search/DoctorSearch';
import { SlotPicker } from '../components/provider/Booking/SlotPicker';
import { providerService } from '../services/core/ProviderService';
import { Provider, Slot } from '../types';

type View = 'search' | 'booking';

const ProviderHubPage: React.FC = () => {
  const [view, setView] = useState<View>('search');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const handleProviderSelect = (id: string) => {
    // In a real app, we would fetch the provider details from the service
    // Mocking the provider selection for the prototype
    const mockProviders: Provider[] = [
      { id: 'doc1', name: 'Anjali Sharma', specialty: 'Cardiologist', location: { street: '', city: 'Pune', state: '', zipCode: '', country: '' }, languages: ['English', 'Hindi'], availability: { weeklySlots: [] }, rating: 4.8, experienceYears: 12, consultationFee: 800 },
      { id: 'doc2', name: 'Vikram Mehra', specialty: 'Pediatrician', location: { street: '', city: 'Mumbai', state: '', zipCode: '', country: '' }, languages: ['English', 'Marathi'], availability: { weeklySlots: [] }, rating: 4.5, experienceYears: 8, consultationFee: 600 },
      { id: 'doc3', name: 'Sanjay Gupta', specialty: 'Endocrinologist', location: { street: '', city: 'Pune', state: '', zipCode: '', country: '' }, languages: ['English', 'Hindi'], availability: { weeklySlots: [] }, rating: 4.9, experienceYears: 15, consultationFee: 1000 },
    ];
    const provider = mockProviders.find(p => p.id === id);
    if (provider) {
      setSelectedProvider(provider);
      setView('booking');
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedProvider || !selectedSlot) return;

    setIsBooking(true);
    try {
      await providerService.bookAppointment({
        patientId: 'patient_123',
        doctorId: selectedProvider.id,
        slotId: selectedSlot,
        type: 'VIDEO',
        reason: 'General Consultation',
      });
      alert(`Appointment confirmed with Dr. ${selectedProvider.name}!`);
      setView('search');
      setSelectedProvider(null);
      setSelectedSlot(null);
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Find Your Specialist</h1>
            <p className="text-slate-500">Book appointments with trusted healthcare providers</p>
          </div>
          {view === 'booking' && (
            <button
              onClick={() => setView('search')}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Search
            </button>
          )}
        </div >

        {view === 'search' ? (
          <DoctorSearch onProviderSelected={handleProviderSelect} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Provider Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    {selectedProvider?.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Dr. {selectedProvider?.name}</h3>
                    <p className="text-sm text-slate-500">{selectedProvider?.specialty}</p>
                  </div>
                </div>
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-medium text-slate-900">{selectedProvider?.experienceYears} Years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Location</span>
                    <span className="font-medium text-slate-900">{selectedProvider?.location.city}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Consultation Fee</span>
                    <span className="font-bold text-blue-600">₹{selectedProvider?.consultationFee}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slot Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Select Appointment Slot</h3>
                <SlotPicker
                  providerId={selectedProvider?.id || ''}
                  onSlotSelected={(id) => setSelectedSlot(id)}
                />
              </div>

              <button
                disabled={!selectedSlot || isBooking}
                onClick={handleConfirmBooking}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg",
                  !selectedSlot || isBooking
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                )}
              >
                {isBooking ? 'Confirming...' : 'Confirm Appointment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default ProviderHubPage;
