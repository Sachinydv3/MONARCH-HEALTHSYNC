# Monarch HealthSync
Monarch HealthSync is a comprehensive healthcare management system designed to streamline patient onboarding, clinical triage, and teleconsultation. Built with a focus on accessibility and scalability, it provides a seamless bridge between patients and healthcare providers.

## 🚀 Features

- **Patient Onboarding & Registration**: A multi-step registration flow including basic info, health history, document uploads, and clinical screening.
- **Intelligent Triage**: Integrated screening and triage screens to categorize patient needs and urgency.
- **Teleconsultation Suite**: A full-featured video consultation interface with real-time call controls, connection status monitoring, and consultation summaries.
- **Care Plan Management**: Dedicated screens for creating and monitoring patient-specific care plans.
- **District Dashboard**: A high-level clinical dashboard for monitoring health metrics at a district level.
- **Multi-Language Support**: Built-in internationalization (i18n) supporting **English**, **Hindi**, and **Marathi** to ensure accessibility for diverse populations.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) (v18)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
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
├── components/    # Feature-based UI components (Registration, Teleconsultation, UI, etc.)
├── hooks/          # Custom React hooks for business logic
├── i18n/           # Translation files and i18n configuration
├── Pages/          # High-level page entry points
├── services/       # Business logic and API communication (Core, API, Sync)
├── types/          # Centralized TypeScript definitions
└── utils/          # Shared utility functions
```

## 🧪 Development Note

The project currently utilizes a **Mock Backend** (`src/services/api/mockBackend.ts`) to enable rapid frontend development and prototyping without requiring a live server.
