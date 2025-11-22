# Event-Safi Frontend 🎉

> Professional event planning platform connecting clients with verified vendors across Kenya

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC.svg)](https://tailwindcss.com/)

## 📖 About

Event-Safi is a modern event planning platform that simplifies the process of organizing weddings, corporate events, and celebrations in Kenya. Born from a hackathon-winning idea, we connect clients with curated, professional vendors through an elegant, user-friendly interface.

**"Safi" means "Clean" in Swahili** - reflecting our commitment to delivering seamless, beautiful event experiences.

## ✨ Features

### For Clients
- 🏠 **Professional Landing Page** - Navy/amber design with sophisticated aesthetics
- 🔍 **Smart Vendor Search** - Filter by category, location, rating, and price range
- 📅 **Event Management** - Create, track, and manage multiple events
- 💬 **AI Assistant** - Get personalized event planning recommendations
- ⭐ **Reviews & Ratings** - Read authentic feedback from previous clients
- 📱 **Responsive Design** - Seamless experience across all devices

### For Vendors
- 📊 **Vendor Dashboard** - Track bookings, earnings, and performance
- 🎨 **Portfolio Management** - Showcase services with galleries and social media
- 📦 **Package Creation** - Create and manage service packages
- 📈 **Analytics** - Monitor business growth and client engagement
- 🔔 **Booking Notifications** - Real-time alerts for new opportunities

## 🛠 Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.10
- **Styling:** TailwindCSS 3.4.14
- **Routing:** React Router DOM 6.27.0
- **State Management:** Zustand 5.0.1
- **HTTP Client:** Axios 1.7.7
- **Icons:** Lucide React 0.454.0
- **Development:** ESLint, PostCSS, Autoprefixer

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running Event-Safi backend API

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/event-safi.git
   cd event-safi/event-safi_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Backend Setup

Ensure the Django backend is running on `http://localhost:8000`. See the backend README for setup instructions.

## 📁 Project Structure

```
event-safi_frontend/
├── public/
│   └── event-safi.jpg          # Logo
├── src/
│   ├── api/                    # API integration layer
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── vendors.js
│   │   └── ...
│   ├── components/             # Reusable components
│   │   ├── ai/                 # AI Assistant
│   │   ├── auth/               # Authentication guards
│   │   ├── homepage/           # Landing page sections
│   │   ├── reviews/            # Review components
│   │   ├── EventCard.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   └── VendorNavbar.jsx
│   ├── pages/                  # Route pages
│   │   ├── auth/               # Login, Register, VendorRegister
│   │   ├── vendor/             # Vendor dashboard pages
│   │   ├── About.jsx
│   │   ├── CreateEvent.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Events.jsx
│   │   ├── Home.jsx
│   │   ├── Vendors.jsx
│   │   └── ...
│   ├── stores/                 # Zustand state management
│   │   ├── useAuthStore.js
│   │   ├── useEventsStore.js
│   │   └── useVendorsStore.js
│   ├── App.jsx                 # Main app with routing
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── .env                        # Environment variables (not in git)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Design System

### Color Palette

**Professional Navy/Amber Theme:**
- **Primary Dark:** `slate-900`, `blue-900`, `indigo-900`
- **Primary Accent:** `amber-400`, `amber-500`, `amber-600`
- **Text:** `white`, `slate-200`, `slate-300` (on dark) | `slate-600`, `slate-900` (on light)
- **Borders:** `white/10`, `white/30` (on dark) | `slate-100`, `amber-200` (on light)

### Typography

- **Headings:** `font-bold` or `font-semibold`
- **Body:** `font-normal`
- Consistent use of `slate` variants

### Components

All components follow the professional design system with:
- Subtle gradients (`bg-gradient-to-*`)
- Smooth transitions (`transition-all duration-300`)
- Hover effects with amber accents
- Focus states with amber rings (`focus:ring-amber-500`)
- Responsive breakpoints (mobile-first)

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173

# Build
npm run build           # Build for production
npm run preview         # Preview production build locally

# Linting
npm run lint            # Run ESLint
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI features | `your_api_key` |

## 🗺 Key Routes

### Public Routes
- `/` - Landing page with hero, features, and vendor categories
- `/about` - Company story, team, mission, and values
- `/login` - Client login
- `/register` - Client registration
- `/register/vendor` - Vendor registration

### Protected Client Routes
- `/dashboard` - Client dashboard overview
- `/events` - My events list
- `/create-event` - Create new event
- `/vendors` - Browse vendors with filters
- `/vendors/:id` - Vendor detail page with booking
- `/reviews` - My reviews
- `/settings` - Account settings

### Protected Vendor Routes
- `/vendor/dashboard` - Vendor dashboard
- `/vendor/bookings` - Manage bookings
- `/vendor/services` - Service management
- `/vendor/profile` - Portfolio and social media
- `/vendor/packages` - Package management
- `/vendor/analytics` - Business analytics

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test updates

## 👥 Team

Built by a passionate team that met at a hackathon in 2025:

- **Teka** - Founder & CEO
- **Naommy** - Head of Finance
- **Blessing** - Marketing Director
- **Nick** - Lead Developer
- **Albert** - Product Manager

## 🏆 Origin Story

Event-Safi started as a hackathon project when five strangers came together to solve a real problem: the chaos of event planning in Kenya. We won first place with our innovative bundled services approach and turned it into a mission to revolutionize Kenya's event industry.

## 📝 License

This project is part of the Event-Safi platform. All rights reserved.

## 🔗 Links

- **Backend Repository:** [event-safi_backend](../event-safi_backend)
- **Live Demo:** Coming soon!
- **API Documentation:** See backend README

## 📞 Support

For questions or support:
- Email: support@event-safi.co.ke
- Phone: (0700) 123-456

---

Made with ❤️ in Kenya | **Event Safi** - Where every event is extraordinary
