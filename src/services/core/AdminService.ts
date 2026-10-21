import { apiClient } from '../api/apiClient';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'READ' | 'WRITE' | 'DELETE' | 'CONSENT_CHANGE';
  resourceId: string;
  resourceType: 'PATIENT_RECORD' | 'PRESCRIPTION' | 'DOCUMENT';
  reason: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  ipAddress: string;
}

export interface HospitalKPI {
  label: string;
  value: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  trendValue: string;
  description: string;
}

export interface ConsentChange {
  id: string;
  patientId: string;
  providerId: string;
  action: 'GRANTED' | 'REVOKED';
  timestamp: string;
  scope: string[];
}

/**
 * AdminService handles institutional management,
 * operational analytics, and security auditing.
 */
class AdminService {
  /**
   * Fetches aggregated hospital outcomes and efficiency metrics.
   */
  async getHospitalAnalytics() {
    return apiClient.request<HospitalKPI[]>('admin', 'analytics/outcomes', 'GET', {}, ['ADMIN']);
  }

  /**
   * Retrieves the immutable audit log of all system access.
   */
  async getAuditLogs(filters: { severity?: string; userId?: string }) {
    return apiClient.request<AuditLogEntry[]>('admin', 'audit-logs', 'GET', filters, ['ADMIN']);
  }

  /**
   * Fetches the full history of consent changes for a specific patient.
   */
  async getConsentHistory(patientId: string) {
    return apiClient.request<ConsentChange[]>('admin', 'consent-history', 'GET', { patientId }, ['ADMIN', 'DOCTOR']);
  }

  /**
   * Updates platform-wide configuration settings.
   */
  async updateSystemConfiguration(config: any) {
    return apiClient.request<any>('admin', 'config', 'PUT', config, ['ADMIN']);
  }
}

export const adminService = new AdminService();
