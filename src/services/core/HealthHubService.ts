import { apiClient } from '../api/apiClient';
import {
  MedicalRecord,
  HealthDocument,
  FamilyMember,
  AccessLevel,
  RecordType
} from '../../types';

export interface TimelineFilters {
  types: RecordType[];
  startDate?: string;
  endDate?: string;
}

/**
 * HealthHubService manages the "Smart Patient Health Hub" logic.
 * It interfaces between the UI and the API Gateway to handle
 * comprehensive health records, timelines, and consent.
 */
class HealthHubService {
  /**
   * Aggregates all critical health data for a patient into a unified profile.
   * Mimics the "Unified Patient Profile" requirement.
   */
  async getPatientComprehensiveProfile(patientId: string) {
    return apiClient.request<any>('health-hub', 'comprehensive-profile', 'GET', { patientId }, ['PATIENT', 'ASHA', 'DOCTOR']);
  }

  /**
   * Fetches health records in chronological order with filtering.
   */
  async getHealthTimeline(patientId: string, filters: TimelineFilters) {
    return apiClient.request<MedicalRecord[]>('health-hub', 'timeline', 'GET', { patientId, ...filters }, ['PATIENT', 'ASHA', 'DOCTOR']);
  }

  /**
   * Handles the upload of a medical document and triggers the AI summary pipeline.
   * In production, this would interface with OCR and LLM services.
   */
  async uploadHealthDocument(patientId: string, file: File, category: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', patientId);
    formData.append('category', category);

    return apiClient.request<HealthDocument>('health-hub', 'upload-document', 'POST', formData, ['PATIENT']);
  }

  /**
   * Manages caregiver access for family members.
   */
  async manageFamilyAccess(patientId: string, memberId: string, accessLevel: AccessLevel) {
    return apiClient.request<FamilyMember>('health-hub', 'family-access', 'PUT', {
      patientId,
      memberId,
      accessLevel
    }, ['PATIENT']);
  }

  /**
   * Updates consent policies for sharing records with specific providers.
   */
  async grantRecordConsent(patientId: string, providerId: string, scope: string) {
    return apiClient.request<any>('health-hub', 'grant-consent', 'POST', {
      patientId,
      providerId,
      scope
    }, ['PATIENT']);
  }
}

export const healthHubService = new HealthHubService();
