import React, { useState } from 'react';
import { Provider } from '../../../types/index';
import { cn } from '../../../utils/cn';

interface ProviderCardProps {
  provider: Provider;
  onBook: (providerId: string) => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onBook }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
          {provider.name.charAt(0)}
        </div>
        <div className="flex-grow space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Dr. {provider.name}
            </h4>
            <div className="flex items-center gap-1 text-amber-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371.793.78 1.382l-2.887 2.118a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.887-2.118a1 1 0 00-1.175 0l-2.887 2.118c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.05 8.78c-.593-.588.211-1.38 1.182-1.38h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-bold">{provider.rating}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600">{provider.specialty}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded">
              {provider.location.city}
            </span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded">
              {provider.languages[0]}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onBook(provider.id)}
        className="w-full mt-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Book Appointment
      </button>
    </div>
  );
};

interface DoctorSearchProps {
  onProviderSelected: (id: string) => void;
}

export const DoctorSearch: React.FC<DoctorSearchProps> = ({ onProviderSelected }) => {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');

  // Mock providers for prototype
  const providers: Provider[] = [
    { id: 'doc1', name: 'Anjali Sharma', specialty: 'Cardiologist', location: { street: '', city: 'Pune', state: '', zipCode: '', country: '' }, languages: ['English', 'Hindi'], availability: { weeklySlots: [] }, rating: 4.8, experienceYears: 12, consultationFee: 800 },
    { id: 'doc2', name: 'Vikram Mehra', specialty: 'Pediatrician', location: { street: '', city: 'Mumbai', state: '', zipCode: '', country: '' }, languages: ['English', 'Marathi'], availability: { weeklySlots: [] }, rating: 4.5, experienceYears: 8, consultationFee: 600 },
    { id: 'doc3', name: 'Sanjay Gupta', specialty: 'Endocrinologist', location: { street: '', city: 'Pune', state: '', zipCode: '', country: '' }, languages: ['English', 'Hindi'], availability: { weeklySlots: [] }, rating: 4.9, experienceYears: 15, consultationFee: 1000 },
  ];

  const filtered = providers.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.specialty.toLowerCase().includes(search.toLowerCase())) &&
    (specialty === '' || p.specialty === specialty)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div >
        <select
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Endocrinologist">Endocrinologist</option>
        </select>
      </div >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <ProviderCard key={p.id} provider={p} onBook={() => onProviderSelected(p.id)} />
        ))}
      </div >
    </div>
  );
};
