import { apiClient } from '../api/apiClient';
import { Consultation, Appointment } from '../../types';

export const TeleconsultationService = {
  async joinSession(appointmentId: string): Promise<Consultation> {
    return apiClient.request<Consultation>(
      'teleconsultation-service',
      '/join',
      'POST',
      { appointmentId },
      ['DOCTOR', 'SPECIALIST', 'PATIENT']
    );
  },

  async endSession(consultationId: string): Promise<{ status: string }> {
    return apiClient.request<any>(
      'teleconsultation-service',
      `/end/${consultationId}`,
      'POST',
      null,
      ['DOCTOR', 'SPECIALIST']
    );
  },
};
