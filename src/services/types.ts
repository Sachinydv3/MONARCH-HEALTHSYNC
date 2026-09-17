export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  villageAddress: string;
  chronicDiseases: string[];
  allergies: string;
  currentMedications: string;
  smokingStatus: string;
  alcoholStatus: string;
  lastCheckupDate: string;
  documents: {
    aadhar: string | null;
    rationCard: string | null;
    other: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Encounter {
  id: string;
  patientId: string;
  timestamp: string;
  status: 'OPEN' | 'CLOSED';
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    spo2: string;
  };
}

export interface Triage {
  id: string;
  encounterId: string;
  decision: 'PHC' | 'REFERRAL';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  notes: string;
  timestamp: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  specialistId: string;
  specialistName: string;
  startTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface Consultation {
  id: string;
  appointmentId: string;
  patientId: string;
  specialistId: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  startedAt?: string;
  sessionToken?: string;
}

export interface DiagnosticOrder {
  id: string;
  consultationId: string;
  testName: string;
  status: 'PENDING' | 'COMPLETED';
  result?: string;
}

export interface Prescription {
  id: string;
  consultationId: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
}
