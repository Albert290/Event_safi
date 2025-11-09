# 📝 Product Requirements Document (PRD)

## 1. Product Overview

Event Safi is an AI-powered event management platform designed to simplify how users plan, manage, and track events. It connects users with verified vendors, manages payments, provides personalized AI suggestions, and offers dashboards for progress tracking.

### 2. Core Features

- **User Management (accounts app):**
  - Users can sign up, log in, and manage their profiles.
  - JWT authentication.
  - Roles: user, vendor, admin.

- **Event Planning (events app):**
  - Users can create events specifying type, budget, location, and date.
  - Each event has a list of selected vendors and status tracking (planning, confirmed, completed).
  - Supports `EventType` classification (e.g., wedding, birthday, corporate).

- **Vendor Management (vendors app):**
  - Vendors can list their services and manage availability.
  - Vendors are categorized by service type (from `services` app).
  - Vendors receive bookings and reviews from users.

- **Services (services app):**
  - Contains service categories (photography, catering, music, etc.).
  - Each service is linked to a vendor and includes details like name, price range, availability, and rating.

- **Payments (payments app):**
  - Handles event deposits and vendor payments.
  - Supports status tracking (pending, completed, failed).
  - Can integrate with MPESA or Stripe.

- **Reviews (reviews app):**
  - Users can review vendors and rate services.
  - Average ratings are shown on the vendor and service profiles.

- **AI Assistant (ai_assistant app):**
  - Helps users by suggesting ideal vendors based on budget, event type, and location.
  - The AI can chat interactively and display results as vendor/service cards.
  - Local LLM integration for offline and cost-efficient recommendations.

### 3. User Dashboard

- Displays a list of user’s events.
- Allows access to each event’s detailed page with vendors, tasks, and status.
- Integrates AI assistant chat and vendor recommendations.
- Payment and review access per event.

### 4. Technical Goals

- Django backend with REST API (Django REST Framework).
- PostgreSQL database (future update)
- Modular and scalable architecture.
- JWT authentication (via accounts).
- Efficient data relationships between events, vendors, and services.
- AI integration endpoint for the assistant.
- Clean code with serializers, viewsets, and routing.
