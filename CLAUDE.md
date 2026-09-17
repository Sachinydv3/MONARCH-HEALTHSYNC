# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Architecture and Structure

Monarch HealthSync is a healthcare application built with **React**, **TypeScript**, and **Vite**, styled with **Tailwind CSS**.

### Project Structure
- `src/Pages`: Contains the high-level page components that serve as entry points for different application sections (e.g., `LandingPage`, `PrototypeGallery`).
- `src/components`: Organized by feature area:
    - `ui`: General-purpose reusable components (Buttons, Inputs, etc.).
    - `registration`: Patient onboarding and triage flow.
    - `teleconsultation`: Video call interface and consultation tools.
    - `careplan` & `dashboard`: Clinical management and monitoring screens.
    - `layout`: Application shell and framing components.
- `src/services`: Contains the business logic, decoupled from the UI:
    - `core`: Domain-specific services (`PatientService`, `ClinicalServices`, `TeleconsultationService`).
    - `api`: Low-level API communication logic, currently utilizing a `mockBackend.ts` for development.
    - `syncService.ts`: Handles data synchronization logic.
- `src/i18n`: Internationalization setup using `i18next`, supporting English (en), Hindi (hi), and Marathi (mr).
- `src/hooks`: Feature-specific hooks (e.g., teleconsultation timers and connection status).
- `src/types`: Centralized TypeScript type definitions for the entire application.
- `src/utils`: Shared utility functions (e.g., `cn` for Tailwind class merging).

### Key Architectural Patterns
- **Service Layer**: UI components interact with `core` services rather than calling APIs directly, ensuring business logic is reusable and testable.
- **Mock-Driven Development**: The `api/mockBackend.ts` allows frontend development to proceed independently of a live backend.
- **Feature-Based Componentization**: Components are grouped by the feature they support rather than just by technical role.
