import { apiClient } from '../api/apiClient';
import { Encounter, Triage } from '../../types';

export const EncounterService = {
  async recordScreening(data: Partial<Encounter>): Promise<{ encounterId: string; status: string }> {
    return apiClient.request<any>(
      'encounter-service',
      '/screen',
      'POST',
      data,
      ['ASHA', 'ANM']
    );
  },
};

export const TriageService = {
  async performTriage(data: Partial<Triage>): Promise<{ triageId: string; status: string }> {
    return apiClient.request<any>(
      'triage-service',
      '/triage',
      'POST',
      data,
      ['ASHA', 'ANM', 'DOCTOR']
    );
  },
};

export const ReferralService = {
  async createReferral(data: any): Promise<{ referralId: string; status: string }> {
    return apiClient.request<any>(
      'referral-service',
      '/create',
      'POST',
      data,
      ['ASHA', 'ANM', 'DOCTOR']
    );
  },
};
