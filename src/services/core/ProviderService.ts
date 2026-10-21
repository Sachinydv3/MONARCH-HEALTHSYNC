import { apiClient } from '../api/apiClient';
import {
  Provider,
  Slot,
  AppointmentRequest,
  ConsultationType
} from '../../types';

export interface SearchCriteria {
  specialty?: string;
  location?: string;
  language?: string;
  availability?: 'TODAY' | 'THIS_WEEK' | 'ANY';
  type?: ConsultationType;
}

export interface DiagnosticStatus {
  orderId: string;
  status: 'ORDERED' | 'COLLECTED' | 'PROCESSING' | 'COMPLETED';
  estimatedReadyDate: string;
  reportUrl?: string;
}

/**
 * ProviderService manages the "Provider Discovery & Appointment Ecosystem" logic.
 */
class ProviderService {
  /**
   * Smart search for doctors based on criteria.
   */
  async searchProviders(criteria: SearchCriteria) {
    return apiClient.request<Provider[]>('providers', 'search', 'GET', criteria, ['PATIENT', 'ASHA', 'DOCTOR']);
  }

  /**
   * Fetches real-time available slots for a specific provider and date.
   */
  async getProviderAvailability(providerId: string, date: string) {
    return apiClient.request<Slot[]>('providers', 'availability', 'GET', { providerId, date }, ['PATIENT', 'ASHA', 'DOCTOR']);
  }

  /**
   * Books a new appointment.
   */
  async bookAppointment(appointmentData: AppointmentRequest) {
    return apiClient.request<any>('appointments', 'book', 'POST', appointmentData, ['PATIENT']);
  }

  /**
   * Tracks the status of a diagnostic test.
   */
  async getDiagnosticStatus(orderId: string) {
    return apiClient.request<DiagnosticStatus>('diagnostics', 'status', 'GET', { orderId }, ['PATIENT', 'ASHA', 'DOCTOR']);
  }

  /**
   * Clinician tool to issue a digital prescription.
   */
  async issueDigitalPrescription(prescriptionData: any) {
    return apiClient.request<any>('prescriptions', 'issue', 'POST', prescriptionData, ['DOCTOR', 'SPECIALIST']);
  }
}

export const providerService = new ProviderService();
