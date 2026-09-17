import { apiClient } from '../api/apiClient';
import { Patient } from '../../types';

export const PatientService = {
  async registerPatient(data: Partial<Patient>): Promise<{ patientId: string; status: string }> {
    return apiClient.request<any>(
      'patient-service',
      '/register',
      'POST',
      data,
      ['ASHA', 'ANM', 'ADMIN']
    );
  },

  async getPatientProfile(id: string): Promise<Patient> {
    return apiClient.request<Patient>(
      'patient-service',
      `/profile/${id}`,
      'GET',
      null,
      ['ASHA', 'ANM', 'DOCTOR', 'SPECIALIST', 'ADMIN']
    );
  },
};
