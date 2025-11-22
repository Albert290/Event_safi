# Event-Safi Backend API 🚀

> Professional Django REST API powering Kenya's leading event planning platform

[![Django](https://img.shields.io/badge/Django-5.1.3-green.svg)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.15.2-red.svg)](https://www.django-rest-framework.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)

## 📖 About

Event-Safi Backend is a robust Django REST API that powers the Event-Safi platform, connecting clients with verified event vendors across Kenya. Built with Django REST Framework, it provides secure authentication, real-time AI recommendations, and comprehensive event management capabilities.

## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication** - Secure token-based authentication with refresh tokens
- 👥 **Dual User System** - Separate flows for clients and vendors
- 📅 **Event Management** - Full CRUD operations for events
- 🏪 **Vendor Profiles** - Rich vendor profiles with galleries and social media
- 💼 **Service Catalog** - Categorized services with custom packages
- 📦 **Booking System** - Direct vendor bookings with status tracking
- 💳 **Payment Tracking** - Payment management for bookings
- ⭐ **Review System** - Rating and review functionality
- 🤖 **AI Assistant** - Gemini-powered conversational vendor recommendations
- 📊 **Analytics** - Vendor performance and earnings tracking

### API Features
- ✅ RESTful design with standard HTTP methods
- ✅ Pagination for large datasets
- ✅ Filtering and search capabilities
- ✅ Ordering for consistent data retrieval
- ✅ CORS enabled for frontend integration
- ✅ Comprehensive error handling
- ✅ API documentation

## 🛠 Tech Stack

- **Framework:** Django 5.1.3
- **REST API:** Django REST Framework 3.15.2
- **Authentication:** djangorestframework-simplejwt 5.4.0
- **Database:** PostgreSQL (production) / SQLite (development)
- **AI:** Google Generative AI (Gemini) 0.8.3
- **CORS:** django-cors-headers 4.6.0
- **Environment:** python-dotenv 1.0.1
- **Static Files:** whitenoise 6.8.2

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)
- Virtual environment (recommended)
- PostgreSQL (for production)

### Installation

1. **Clone the repository**
   ```bash
   cd event-safi/event-safi_backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   
   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```
   
   On Windows (Command Prompt):
   ```bash
   venv\Scripts\activate.bat
   ```
   
   On Windows (PowerShell):
   ```bash
   venv\Scripts\Activate.ps1
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Database (optional - defaults to SQLite)
   DATABASE_URL=postgresql://user:password@localhost:5432/eventsafi
   ```

6. **Run migrations**
   ```bash
   python manage.py migrate
   ```

7. **Create a superuser** (optional)
   ```bash
   python manage.py createsuperuser
   ```

8. **Load initial data** (optional)
   ```bash
   python manage.py loaddata event_types service_categories
   ```

9. **Start the development server**
   ```bash
   python manage.py runserver
   ```

10. **Access the API**
    
    - API Root: `http://localhost:8000/api/`
    - Admin Panel: `http://localhost:8000/admin/`

### Set Up AI Assistant (Gemini API Key)

To use the AI-powered vendor recommendation feature:

1. **Get an API Key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click **"Create API key"** and copy your new key

2. **Add to `.env` file:**
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

The AI assistant will automatically use this key for conversational vendor recommendations.

## 📁 Project Structure

```
event-safi_backend/
├── accounts/                   # User authentication & profiles
│   ├── models.py              # User model
│   ├── serializers.py         # User serializers
│   ├── views.py               # Auth views
│   └── urls.py                # Auth routes
├── ai_assistant/              # AI recommendation engine
│   ├── chat_memory.py         # Conversation history
│   ├── tools.py               # AI function calling
│   ├── views.py               # AI endpoints
│   └── urls.py
├── bookings/                  # Booking management
│   ├── models.py              # Booking model
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── common/                    # Shared utilities
│   ├── views.py               # Common endpoints
│   └── urls.py
├── core/                      # Project settings
│   ├── settings.py            # Django configuration
│   ├── urls.py                # Root URL configuration
│   └── wsgi.py
├── events/                    # Event management
│   ├── models.py              # Event & EventType models
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── payments/                  # Payment tracking
│   ├── models.py              # Payment model
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── reviews/                   # Review system
│   ├── models.py              # Review model
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── services/                  # Service catalog
│   ├── models.py              # Service & Category models
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── vendors/                   # Vendor profiles
│   ├── models.py              # Vendor model
│   ├── serializers.py
│   ├── views.py
│   ├── admin.py               # Admin customization
│   └── urls.py
├── .env                       # Environment variables (not in git)
├── .gitignore
├── db.sqlite3                # SQLite database (development)
├── manage.py
└── requirements.txt
```

## 🔐 Authentication

This API uses **JSON Web Tokens (JWT)** for authentication.

### Token Types

- **Access Token:** Short-lived (1 hour) - Used for API requests
- **Refresh Token:** Long-lived (7 days) - Used to get new access tokens

### Header Format

All protected requests must include the `Authorization` header:
```
Authorization: Bearer <your_access_token>
```

### Workflow

1. **Register:** `POST /api/auth/register/user/`
2. **Login:** `POST /api/auth/login/` → Get tokens
3. **Use Access Token:** Include in `Authorization` header
4. **Refresh:** `POST /api/auth/token/refresh/` → Get new access token
5. **Logout:** `POST /api/auth/logout/` → Blacklist refresh token

## 📚 API Documentation

### Base URL
```
http://127.0.0.1:8000/api/
```

### Quick Start Example

**1. Register a new user:**
```bash
POST /api/auth/register/user/
Content-Type: application/json

{
  "email": "test.user@example.com",
  "name": "Test User",
  "phone": "0712345678",
  "password": "strongPassword123",
  "password_confirm": "strongPassword123"
}
```

**2. Login to get tokens:**
```bash
POST /api/auth/login/
Content-Type: application/json

{
  "email": "test.user@example.com",
  "password": "strongPassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid-here",
    "email": "test.user@example.com",
    "name": "Test User"
  },
  "tokens": {
    "refresh": "refresh-token-here",
    "access": "access-token-here"
  },
  "vendor_profile": null
}
```

**3. Make authenticated requests:**
```bash
GET /api/auth/dashboard/
Authorization: Bearer <access-token-here>
```

## 📋 API Endpoints

### Authentication & Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register/user/` | Register new client | ❌ |
| `POST` | `/api/register/vendor/` | Register new vendor | ❌ |
| `POST` | `/api/auth/login/` | Login and get JWT tokens | ❌ |
| `POST` | `/api/auth/logout/` | Blacklist refresh token | ✅ |
| `POST` | `/api/auth/token/refresh/` | Get new access token | ❌ |
| `GET` | `/api/auth/profile/` | Get user profile | ✅ |
| `PUT` | `/api/auth/profile/` | Update user profile | ✅ |
| `GET` | `/api/auth/dashboard/` | Get dashboard data | ✅ |

### Events

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/events/` | List user's events | ✅ |
| `POST` | `/api/events/` | Create new event | ✅ |
| `GET` | `/api/events/{id}/` | Get event details | ✅ |
| `PUT` | `/api/events/{id}/` | Update event | ✅ |
| `PATCH` | `/api/events/{id}/` | Partial update event | ✅ |
| `DELETE` | `/api/events/{id}/` | Delete event | ✅ |
| `GET` | `/api/events/types/` | List event types | ❌ |

**Event Type Field:** When creating events, use the event type **name** (e.g., "Wedding", "Corporate"), not the ID.

### Vendors & Services

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/vendors/` | List all vendors | ❌ |
| `GET` | `/api/vendors/{id}/` | Get vendor details | ❌ |
| `GET` | `/api/services/categories/` | List service categories | ❌ |
| `GET` | `/api/services/services/` | List all services | ❌ |
| `POST` | `/api/services/services/` | Create service (vendors only) | ✅ |

### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/bookings/` | List bookings (context-aware) | ✅ |
| `POST` | `/api/bookings/` | Create booking | ✅ |
| `GET` | `/api/bookings/{id}/` | Get booking details | ✅ |
| `PATCH` | `/api/bookings/{id}/` | Update booking status | ✅ |

### Payments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/payments/` | List payments | ✅ |
| `POST` | `/api/payments/` | Create payment | ✅ |

### Reviews

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/reviews/` | List user's reviews | ✅ |
| `POST` | `/api/reviews/` | Create review | ✅ |

### AI Assistant

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/ai/recommendations/` | Get AI recommendations | ✅ |
| `POST` | `/api/ai/recommendations/reset/` | Reset conversation | ✅ |

**AI Request Format:**
```json
{
  "conversation": [
    {"role": "user", "text": "I need a photographer for my wedding"},
    {"role": "model", "text": "What's your budget?"},
    {"role": "user", "text": "Around 30,000 KES in Nairobi"}
  ]
}
```

**AI Response Format:**
```json
{
  "reply": "Here are the best photographers for your budget!",
  "structured_data": {
    "vendors": [
      {
        "vendor_id": "uuid",
        "business_name": "Safi Photography",
        "service_name": "Wedding Package",
        "price_range": "25000-35000 KES",
        "rating": "4.8/5.0"
      }
    ]
  },
  "is_tool_call": true
}
```

## ⚠️ Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created successfully |
| `204` | No Content | Successful DELETE operation |
| `400` | Bad Request | Invalid request data |
| `401` | Unauthorized | Authentication required/failed |
| `403` | Forbidden | No permission |
| `404` | Not Found | Resource doesn't exist |
| `500` | Server Error | Unexpected server error |

### Error Response Format

```json
{
  "field_name": ["Error message here"],
  "detail": "Overall error description"
}
```

## 🗄 Database Models

### Key Models

- **User** - Custom user model with email authentication
- **Vendor** - Extended vendor profile with business details
- **Event** - Client events with type, date, location, budget
- **EventType** - Predefined event categories (Wedding, Corporate, etc.)
- **Service** - Vendor services with categories and pricing
- **ServiceCategory** - Service categorization (Catering, Photography, etc.)
- **Booking** - Links events to services with status tracking
- **Payment** - Payment records for bookings
- **Review** - User reviews for vendors/services
- **ChatMemory** - AI conversation history per user

## 🔧 Management Commands

```bash
# Database
python manage.py makemigrations     # Create migration files
python manage.py migrate            # Apply migrations
python manage.py showmigrations     # View migration status

# Data
python manage.py loaddata fixtures  # Load initial data
python manage.py dumpdata app > file.json  # Export data

# Development
python manage.py runserver          # Start dev server
python manage.py shell              # Django shell
python manage.py dbshell            # Database shell

# Admin
python manage.py createsuperuser    # Create admin user
python manage.py changepassword <user>  # Change password
```

## 🧪 Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test accounts

# Run with coverage
coverage run manage.py test
coverage report
```

## 🚀 Deployment

### Production Checklist

- [ ] Set `DEBUG=False` in settings
- [ ] Configure PostgreSQL database
- [ ] Set strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up static files with WhiteNoise
- [ ] Configure CORS for production frontend URL
- [ ] Set up environment variables
- [ ] Run `python manage.py collectstatic`
- [ ] Set up HTTPS/SSL
- [ ] Configure logging
- [ ] Set up monitoring

### Environment Variables (Production)

```env
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:pass@host:5432/dbname
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
GEMINI_API_KEY=your_gemini_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow PEP 8 guidelines
- Use meaningful variable names
- Add docstrings to functions and classes
- Write unit tests for new features

## 👥 Team

- **Teka** - Founder & CEO
- **Naommy** - Head of Finance
- **Blessing** - Marketing Director
- **Nick** - Lead Developer  
- **Albert** - Product Manager

## 📝 License

This project is part of the Event-Safi platform. All rights reserved.

## 🔗 Links

- **Frontend Repository:** [event-safi_frontend](../event-safi_frontend)
- **API Base URL:** `http://localhost:8000/api/`
- **Admin Panel:** `http://localhost:8000/admin/`

## 📞 Support

For questions or support:
- Email: support@event-safi.co.ke
- Phone: (0700) 123-456

---

Made with ❤️ in Kenya | **Event Safi** - Clean, seamless event experiences
