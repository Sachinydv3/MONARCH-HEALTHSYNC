import { apiClient } from '../api/apiClient';
import { MedicalRecord, HealthDocument } from '../../types';

export interface CopilotResponse {
  answer: string;
  citations: Citation[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  isDraft: boolean;
  safetyWarning?: string;
}

export interface Citation {
  id: string;
  sourceName: string;
  date: string;
  snippet: string;
  type: 'RECORD' | 'DOCUMENT';
}

/**
 * CopilotService implements the RAG (Retrieval Augmented Generation)
 * logic for Monarch HealthSync. It ensures AI answers are grounded
 * in the patient's actual medical history.
 */
class CopilotService {
  /**
   * Asks the AI Copilot a question about a patient.
   */
  async askQuestion(patientId: string, query: string): Promise<CopilotResponse> {
    console.log(`[CopilotService] Processing query: "${query}" for patient ${patientId}`);

    // 1. Retrieve relevant context (The "R" in RAG)
    const context = await this.getRelevantContext(patientId, query);

    // 2. Simulate LLM processing of the context
    return this.simulateLLM(query, context);
  }

  /**
   * Simulates the retrieval of medical records and documents relevant to the query.
   */
  private async getRelevantContext(patientId: string, query: string) {
    // In a real app, this would involve vector embeddings and a database search.
    // For the prototype, we simulate retrieval by filtering existing records.
    const records = await apiClient.request<MedicalRecord[]>('health-hub', 'timeline', 'GET', { patientId, types: [] });
    const documents = await apiClient.request<HealthDocument[]>('health-hub', 'documents', 'GET', { patientId });

    return { records, documents };
  }

  /**
   * Simulates the LLM generating a response based on provided context.
   * Adheres to AI Safety requirements: GROUNDING, CITATIONS, and UNCERTAINTY.
   */
  private simulateLLM(query: string, context: { records: MedicalRecord[], documents: HealthDocument[] }): CopilotResponse {
    const q = query.toLowerCase();

    // Scenario 1: Glucose/Diabetes Question
    if (q.includes('glucose') || q.includes('diabetes') || q.includes('hba1c')) {
      const glucoseRecord = context.records.find(r => r.summary.includes('Glucose'));
      if (glucoseRecord) {
        return {
          answer: `Based on the medical records, the patient's Blood Glucose was 140 mg/dL on ${glucoseRecord.date}, which is indicated as elevated.`,
          citations: [{
            id: glucoseRecord.id,
            sourceName: glucoseRecord.provider,
            date: glucoseRecord.date,
            snippet: glucoseRecord.summary,
            type: 'RECORD'
          }],
          confidence: 'HIGH',
          isDraft: true
        };
      }
    }

    // Scenario 2: X-Ray/Imaging Question
    if (q.includes('x-ray') || q.includes('chest') || q.includes('imaging')) {
      const xray = context.records.find(r => r.type === 'IMAGING');
      if (xray) {
        return {
          answer: `The Chest X-Ray performed on ${xray.date} showed normal lung fields with no signs of cardiomegaly.`,
          citations: [{
            id: xray.id,
            sourceName: xray.provider,
            date: xray.date,
            snippet: xray.summary,
            type: 'RECORD'
          }],
          confidence: 'HIGH',
          isDraft: true
        };
      }
    }

    // Scenario 3: Prescription Question
    if (q.includes('medication') || q.includes('prescription') || q.includes('metformin')) {
      const rx = context.records.find(r => r.type === 'PRESCRIPTION');
      if (rx) {
        return {
          answer: `The patient was started on Metformin 500mg on ${rx.date} following a consultation with Dr. Sharma.`,
          citations: [{
            id: rx.id,
            sourceName: rx.provider,
            date: rx.date,
            snippet: rx.summary,
            type: 'RECORD'
          }],
          confidence: 'HIGH',
          isDraft: true
        };
      }
    }

    // Default: Uncertainty Handling (Required by AI Safety Specs)
    return {
      answer: "I cannot find specific information in the patient's authorized records to answer this question accurately. Please review the original documents or perform a new clinical assessment.",
      citations: [],
      confidence: 'LOW',
      isDraft: true,
      safetyWarning: "No grounded evidence found in records."
    };
  }
}

export const copilotService = new CopilotService();
