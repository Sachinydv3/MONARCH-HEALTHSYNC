import { apiClient } from '../api/apiClient';
import { Prescription, DiagnosticOrder, Referral } from '../../types';
import { notificationService } from './NotificationService';

export interface PrescriptionRequest {
  patientId: string;
  doctorId: string;
  medications: any[];
  notes: string;
}

export interface DiagnosticRequest {
  patientId: string;
  doctorId: string;
  testName: string;
  priority: 'NORMAL' | 'URGENT';
}

/**
 * ClinicalWorkflowService manages the operational loop of patient care:
 * Prescriptions, Diagnostics, and Referrals.
 */
class ClinicalWorkflowService {
  /**
   * Issues a digital prescription.
   * Implements the "Draft until Signed" pattern.
   */
  async issuePrescription(data: PrescriptionRequest, signed: boolean) {
    if (!signed) {
      console.log('[ClinicalWorkflowService] Saving as DRAFT prescription...');
      return apiClient.request<any>('clinical', 'prescription/draft', 'POST', data, ['DOCTOR', 'SPECIALIST']);
    }

    console.log('[ClinicalWorkflowService] Signing and Issuing FINAL prescription...');
    const prescription = await apiClient.request<Prescription>('clinical', 'prescription/issue', 'POST', data, ['DOCTOR', 'SPECIALIST']);

    // Integration: Notify patient and push to Health Hub (simulated via API)
    await notificationService.notify({
      title: 'New Prescription Issued',
      message: `Dr. ${data.doctorId} has issued a new prescription for your care.`,
      type: 'SUCCESS'
    });

    return prescription;
  }

  /**
   * Creates a new diagnostic order.
   */
  async createDiagnosticOrder(data: DiagnosticRequest) {
    return apiClient.request<DiagnosticOrder>('clinical', 'diagnostic/order', 'POST', data, ['DOCTOR', 'SPECIALIST']);
  }

  /**
   * Updates the status of a diagnostic test.
   */
  async updateDiagnosticStatus(orderId: string, status: DiagnosticOrder['status']) {
    const updatedOrder = await apiClient.request<DiagnosticOrder>('clinical', 'diagnostic/status', 'PUT', { orderId, status }, ['DOCTOR', 'LAB_STAFF']);

    // Integration: If COMPLETED, trigger the Health Hub upload and notify
    if (status === 'COMPLETED') {
      await notificationService.notify({
        title: 'Lab Report Ready',
        message: 'Your diagnostic report has been completed and added to your Health Hub.',
        type: 'INFO'
      });
      // In a real app, this would trigger the DocumentService.upload() logic
    }

    return updatedOrder;
  }

  /**
   * Coordinates a referral to a specialist.
   */
  async coordinateReferral(referralData: any) {
    return apiClient.request<Referral>('clinical', 'referral/create', 'POST', referralData, ['DOCTOR', 'SPECIALIST']);
  }
}

export const clinicalWorkflowService = new ClinicalWorkflowService();
