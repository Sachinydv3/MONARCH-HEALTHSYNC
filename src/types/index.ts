export type Gender = 'male' | 'female' | 'other';

// --- User / Auth Types ---
export interface User {
  id: string;
  role: 'PATIENT' | 'ASHA' | 'ANM' | 'DOCTOR' | 'SPECIALIST' | 'ADMIN';
  name: string;
  facilityId?: string;
  token: string;
}

// --- Patient Service ---
export interface Patient {
  id: string;
  externalId?: string;
  abhaId?: string;
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  mobileNumber: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

// --- Encounter Service ---
export interface Vitals {
  bloodPressure: string;
  pulseRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight: number;
  height: number;
}

export interface Encounter {
  id: string;
  patientId: string;
  workerId: string;
  timestamp: string;
  vitals: Vitals;
  symptoms: string[];
  chiefComplaint: string;
  clinicalNotes: string;
  status: 'OPEN' | 'CLOSED';
}

// --- Triage Service ---
export type TriageLevel = 'ROUTINE' | 'URGENT' | 'EMERGENCY';

export interface Triage {
  id: string;
  encounterId: string;
  patientId: string;
  level: TriageLevel;
  decision: 'PHC' | 'REFERRAL';
  reasoning: string;
  timestamp: string;
}

// --- Referral Service ---
export interface Referral {
  id: string;
  patientId: string;
  fromFacilityId: string;
  toFacilityId: string;
  specialization: string;
  priority: 'NORMAL' | 'URGENT';
  status: 'PENDING' | 'ACCEPTED' | 'COMPLETED';
  createdAt: string;
}

// --- Appointment Service ---
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  specialization: string;
  startTime: string;
  endTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

// --- Teleconsultation Service ---
export interface Consultation {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  status: 'WAITING' | 'CONNECTING' | 'IN_PROGRESS' | 'ENDED';
  startedAt: string;
  endedAt?: string;
  sessionToken: string;
}

// --- Diagnostics Service ---
export interface DiagnosticOrder {
  id: string;
  patientId: string;
  testName: string;
  priority: 'NORMAL' | 'URGENT';
  status: 'ORDERED' | 'COLLECTED' | 'COMPLETED';
  result?: string;
  orderedAt: string;
}

// --- Medicine Service ---
export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medications: Medication[];
  issuedAt: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

// --- Notification Service ---
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'SMS' | 'PUSH' | 'IVR';
  status: 'SENT' | 'DELIVERED' | 'FAILED';
  timestamp: string;
}
