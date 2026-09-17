import { Patient, Encounter, Triage, Appointment, Consultation, DiagnosticOrder, Prescription } from '../types';

class MockBackend {
  // Simulating PostgreSQL Tables
  private db = {
    patients: new Map<string, Patient>(),
    encounters: new Map<string, Encounter>(),
    triages: new Map<string, Triage>(),
    appointments: new Map<string, Appointment>(),
    consultations: new Map<string, Consultation>(),
    diagnostics: new Map<string, DiagnosticOrder>(),
    prescriptions: new Map<string, Prescription>(),
  };

  // Simulating Redis (Caching/Sessions)
  private cache = new Map<string, any>();

  async handleRequest(service: string, endpoint: string, method: string, payload: any): Promise<any> {
    console.log(`[Mock Backend] Processing ${service} request: ${endpoint}`);

    switch (service) {
      case 'patient-service':
        return this.handlePatientService(endpoint, method, payload);
      case 'encounter-service':
        return this.handleEncounterService(endpoint, method, payload);
      case 'triage-service':
        return this.handleTriageService(endpoint, method, payload);
      case 'appointment-service':
        return this.handleAppointmentService(endpoint, method, payload);
      case 'teleconsultation-service':
        return this.handleTeleconsultationService(endpoint, method, payload);
      default:
        throw new Error(`500 Internal Server Error: Service ${service} not found`);
    }
  }

  private handlePatientService(endpoint: string, method: string, payload: any) {
    if (method === 'POST' && endpoint === '/register') {
      const id = `PAT-${Math.floor(Math.random() * 10000)}`;
      const patient: Patient = { ...payload, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      this.db.patients.set(id, patient);
      return { patientId: id, status: 'created' };
    }
    if (method === 'GET' && endpoint.startsWith('/profile/')) {
      const id = endpoint.split('/')[2];
      return this.db.patients.get(id) || null;
    }
    throw new Error('404 Not Found');
  }

  private handleEncounterService(endpoint: string, method: string, payload: any) {
    if (method === 'POST' && endpoint === '/screen') {
      const id = `ENC-${Math.floor(Math.random() * 10000)}`;
      const encounter: Encounter = { ...payload, id, timestamp: new Date().toISOString(), status: 'OPEN' };
      this.db.encounters.set(id, encounter);
      return { encounterId: id, status: 'recorded' };
    }
    throw new Error('404 Not Found');
  }

  private handleTriageService(endpoint: string, method: string, payload: any) {
    if (method === 'POST' && endpoint === '/triage') {
      const id = `TR-${Math.floor(Math.random() * 10000)}`;
      const triage: Triage = { ...payload, id, timestamp: new Date().toISOString() };
      this.db.triages.set(id, triage);
      return { triageId: id, status: 'triaged' };
    }
    throw new Error('404 Not Found');
  }

  private handleAppointmentService(endpoint: string, method: string, payload: any) {
    if (method === 'POST' && endpoint === '/schedule') {
      const id = `APP-${Math.floor(Math.random() * 10000)}`;
      const appt: Appointment = { ...payload, id, status: 'SCHEDULED' };
      this.db.appointments.set(id, appt);
      return { appointmentId: id, status: 'scheduled' };
    }
    throw new Error('404 Not Found');
  }

  private handleTeleconsultationService(endpoint: string, method: string, payload: any) {
    if (method === 'POST' && endpoint === '/join') {
      const id = `TC-${Math.floor(Math.random() * 10000)}`;
      const session: Consultation = {
        ...payload,
        id,
        status: 'IN_PROGRESS',
        startedAt: new Date().toISOString(),
        sessionToken: `rtc_token_${Math.random().toString(36).substr(2, 9)}`
      };
      this.db.consultations.set(id, session);
      return session;
    }
    throw new Error('404 Not Found');
  }
}

export const mockBackend = new MockBackend();
