<img width="1556" height="980" alt="Screenshot 2026-09-17 at 09 27 01" src="https://github.com/user-attachments/assets/672d2bb5-eaad-4586-9873-c384a39845bd" />

<img width="1691" height="876" alt="Screenshot 2026-09-17 at 09 27 39" src="https://github.com/user-attachments/assets/d27e03c9-5e29-4fed-bc3b-c0f96896690c" />

<img width="1630" height="958" alt="Screenshot 2026-09-17 at 09 27 18" src="https://github.com/user-attachments/assets/0a8f51a2-49be-47de-9cb9-e31725644fe6" />
# Monarch HealthSync

Monarch HealthSync is a next-generation, patient-centric healthcare management ecosystem designed to bridge the gap between rural populations and specialized clinical care. It integrates AI-driven triage, HD teleconsultations, and secure digital health records to provide a seamless continuum of care.

## 🚀 Features

### 🤖 Advanced Clinical AI & Intelligence
- **Predictive Health Copilot**: A RAG-powered AI assistant that analyzes patient records to provide grounded answers, detect clinical trends, and generate **Predictive Insights** (e.g., progression risks, drug interactions) with evidence-based citations.
- **Hospital Intelligence Dashboard**: Operational visibility for administrators to track appointment volume, wait times, missed visits, and clinical pipeline bottlenecks.
- **AI Symptom Screening & Triage**: Conversational LLM-driven intake that performs risk stratification (Routine, Urgent, Emergency) and autonomously routes patients to the appropriate care level.
- **Ambient Clinical Scribe**: AI-powered real-time transcription and structured SOAP note generation during teleconsultations.

### 🏥 Virtual Care & Coordination
- **Intelligent Referral Network**: A closed-loop coordination system that routes patients between PHCs and specialists, attaches relevant records, and tracks the referral lifecycle to prevent patient loss.
- **HD Teleconsultation Suite**: Low-latency video interface featuring real-time vitals overlay (IoT integration) and specialist matching.
- **Smart Scheduling**: Automated appointment booking with synchronized status tracking between providers.
- **Integrated Pharmacy & Lab Coordination**: Real-time medicine availability tracking and electronic diagnostic ordering.

### 🌿 Personalized Wellness & Chronic Care
- **Remote Health Monitoring**: Patient-entered tracking for BP, Glucose, and Weight with clinician-defined targets and automated escalation for warning patterns.
- **Wellness Center**: A personalized hub for guided well-being assessments, mental health screenings (PHQ-9), and self-guided educational resources.
- **Guided Care Plans**: Dynamic recovery roadmaps with clinician-approved goals and progress tracking.

### 🔐 Patient Data Sovereignty
- **Digital Health Locker**: FHIR-compliant patient records with a secure, patient-controlled consent matrix.
- **QR-Enabled Access**: Encrypted, time-bound QR codes for emergency health passport access.
- **Zero-Trust Privacy**: Granular permissions allowing patients to control exactly which provider sees what data and for how long.

### 🌍 Accessibility & Equity
- **Multilingual Ecosystem**: Native support for **English**, **Hindi**, and **Marathi** to ensure care is accessible to diverse linguistic populations.
- **Offline-First Capability**: Built-in synchronization services to ensure critical health data is available in low-connectivity regions.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) (v18) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Internationalization**: [i18next](https://www.i18next.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd monarch-healthsync
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
To start the development server:
```bash
npm run dev
```

### Build
To create a production-ready bundle:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```text
src/
├── components/    # Feature-based UI components (Triage, Telecon, Records, etc.)
├── hooks/          # Custom React hooks for clinical logic
├── i18n/           # Translation files and i18n configuration
├── Pages/          # High-level page entry points (The core application modules)
├── services/       # Business logic, API communication, and Sync services
├── types/          # Centralized TypeScript definitions (FHIR-aligned)
└── utils/          # Shared utility functions
```

## 🧪 Development Note

The project currently utilizes a **Mock Backend** (`src/services/api/mockBackend.ts`) to enable rapid frontend development and prototyping. This layer can be replaced with a live FHIR-compliant server for production deployment.
