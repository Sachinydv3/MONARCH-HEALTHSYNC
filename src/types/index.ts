export type Gender = 'male' | 'female' | 'other';

// --- User / Auth Types ---
export interface User {
  id: string;
  role: 'PATIENT' | 'ASHA' | 'ANM' | 'DOCTOR' | 'SPECIALIST' | 'ADMIN';
  name: string;
  facilityId?: string;
  token: string;
  preferredLanguage: string;
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
  qrCodeToken?: string;
  consentPolicies: ConsentPolicy[];
}

export interface ConsentPolicy {
  id: string;
  providerId: string;
  allowedScopes: string[];
  expiresAt: string;
  status: 'ACTIVE' | 'REVOKED';
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

export interface TriageSession {
  id: string;
  patientId: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  conversationalHistory: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
  detectedSymptoms: string[];
  riskScore: number;
  triageLevel: TriageLevel;
  suggestedRouting: 'PHC' | 'SPECIALIST' | 'EMERGENCY_ROOM';
  createdAt: string;
}

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
  aiScribeNotes?: string;
  liveVitals?: Vitals;
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
  fulfillmentStatus: 'PENDING' | 'PARTIAL' | 'COMPLETED';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  availabilityStatus?: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LIMITED';
  nearbyPharmacies?: string[];
}

// --- Preventive Care Service ---
export interface HealthMetric {
  id: string;
  patientId: string;
  type: 'GLUCOSE' | 'BP' | 'WEIGHT' | 'SPO2' | 'HEART_RATE';
  value: number;
  unit: string;
  timestamp: string;
}

export interface CareNudge {
  id: string;
  patientId: string;
  type: 'SCREENING' | 'MEDICATION' | 'FOLLOW_UP';
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  scheduledDate: string;
  status: 'PENDING' | 'COMPLETED' | 'IGNORED';
}
