# Event Safi API Documentation

Welcome to the official API documentation for the Event Safi backend. This document provides a comprehensive guide for frontend developers to integrate with the API.

## 🚀 Getting Started

This guide will walk you through the basic steps to register, authenticate, and make your first authenticated API call.

- Navigate to your project directory: Open your terminal or command prompt and change the directory to your project's root folder where you intend to create the virtual environment and where your requirements.txt file is located.

  ```bash
  cd event-safi_backend/
  ```

- Create a virtual environment: Use the venv module (built-in with Python 3.3+) to create a new virtual environment. You can replace venv with a name of your choice for the environment folder.

  ```bash
      python -m venv venv
  ```

- Activate the virtual environment: This step ensures that any packages you install will be isolated within this specific environment.

  On macOS/Linux:

    ```bash
    source venv/bin/activate
  ```

  On Windows (Command Prompt).

  ```bash
  venv\Scripts\activate.bat
  ```

  On Windows (PowerShell).

  ```bash
  venv\Scripts\Activate.ps1
  ```

  You will typically see the name of your virtual environment (e.g., (venv)) prepended to your terminal prompt, indicating it's active.
  Install dependencies from requirements.txt: With the virtual environment activated, use pip to install all the packages listed in your requirements.txt file.

  ```bash
    pip install -r requirements.txt
  ```

**Base URL:** All API endpoints are prefixed with your server's domain. For local development, this will be `http://127.0.0.1:8000/`.

### Step 1: Register a New User

First, create a new user account.

- **Request:** `POST /api/auth/register/user/`
- **Body:**

  ```json
  {
    "email": "test.user@example.com",
    "name": "Test User",
    "phone": "0712345678",
    "password": "a-strong-password-123",
    "password_confirm": "a-strong-password-123"
  }
  ```

### Step 2: Log In to Get Your Authentication Tokens

Use the credentials from Step 1 to log in. The response will contain your `access` and `refresh` tokens.

- **Request:** `POST /api/auth/login/`
- **Body:**

  ```json
  {
    "email": "test.user@example.com",
    "password": "a-strong-password-123"
  }
  ```

- **Response:**

  ```json
  {
    "user": {
      "id": "a1b2c3d4-...",
      "email": "test.user@example.com",
      "name": "Test User",
      "phone": "0712345678"
    },
    "tokens": {
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "vendor_profile": null
  }
  ```

  **Save the `access` token.** You will need it for the next step.

### Step 3: Make an Authenticated Request

To access protected endpoints, include the `access` token in the `Authorization` header with the `Bearer` scheme.

- **Request:** `GET /api/auth/dashboard/`
- **Headers:**

  ``` postman
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

- **Response:** You will receive your user dashboard data.

  ```json
  {
    "user": { /* your user object */ },
    "events": [],
    "vendor": null
  }
  ```

---

## 🔐 Authentication

This API uses **JSON Web Tokens (JWT)** for authentication.

- **Token Type:** `Bearer` Token.
- **Header Format:** All protected requests must include the `Authorization` header:
  `Authorization: Bearer <your_access_token>`
- **Token Lifetime:**
  - `access` tokens are short-lived (e.g., 1 hour). If you get a `401 Unauthorized` error, your access token has likely expired.
  - `refresh` tokens are long-lived (e.g., 7 days). Use the refresh token to get a new access token.
- **Refreshing Tokens:**
  - **Endpoint:** `POST /api/auth/token/refresh/`
  - **Body:**

    ```json
    {
      "refresh": "<your_refresh_token>"
    }
    ```

  - **Response:**

    ```json
    {
      "access": "<new_access_token>"
    }

  ```

---

## ⚠️ Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request.

- **`200 OK`**: The request was successful.
- **`201 Created`**: The resource was successfully created.
- **`204 No Content`**: The request was successful, but there is no content to return (e.g., after a `DELETE` operation).
- **`400 Bad Request`**: The request was malformed (e.g., invalid JSON, missing required fields). The response body will contain details.

  ```json
  {
    "field_name": ["This field is required."]
  }
  ```

- **`401 Unauthorized`**: Authentication credentials were not provided or are invalid/expired.

  ```json
  {
    "detail": "Authentication credentials were not provided."
  }
  ```

- **`403 Forbidden`**: You are authenticated but do not have permission to perform this action.

  ```json
  {
    "detail": "You do not have permission to perform this action."
  }
  ```

- **`404 Not Found`**: The requested resource does not exist.
- **`500 Internal Server Error`**: An unexpected error occurred on the server.

---

## Endpoints

### 1. Authentication & User Management

| Method | Endpoint                      | Description                                     |
|--------|-------------------------------|-------------------------------------------------|
| `POST` | `/api/auth/register/user/`    | Register a new regular user.                    |
| `POST` | `/api/register/vendor/`       | Register a new vendor (creates a user & profile). |
| `POST` | `/api/auth/login/`            | Log in and receive JWT tokens.                  |
| `POST` | `/api/auth/logout/`           | Blacklist a refresh token to log out.           |
| `POST` | `/api/auth/token/refresh/`    | Get a new access token using a refresh token.   |
| `GET`  | `/api/auth/profile/`          | Get the authenticated user's profile.           |
| `PUT`  | `/api/auth/profile/`          | Update the authenticated user's profile.        |
| `GET`  | `/api/auth/dashboard/`        | Get dashboard data (events, vendor info).       |

### 2. Events

| Method | Endpoint             | Description                               |
|--------|----------------------|-------------------------------------------|
| `GET`  | `/api/events/`       | List all events for the current user.     |
| `POST` | `/api/events/`       | Create a new event.                       |
| `GET`  | `/api/events/{id}/`  | Retrieve a specific event by its ID.      |
| `PUT`  | `/api/events/{id}/`  | Update an entire event.                   |
| `PATCH`| `/api/events/{id}/`  | Partially update an event.                |
| `DELETE`| `/api/events/{id}/` | Delete an event.                          |
| `GET`  | `/api/events/types/` | List all available event types.           |

- **Create Event (`POST /api/events/`) Request Body:**

  | Field         | Type           | Required | Description                               |
  |---------------|----------------|----------|-------------------------------------------|
  | `title`       | `string`       | Yes      | The name of the event.                    |
  | `event_type`  | `string`       | Yes      | The name of the event type (e.g., "Wedding"). |
  | `description` | `string`       | No       | A detailed description of the event.      |
  | `date`        | `datetime`     | Yes      | The date and time of the event (ISO 8601 format). |
  | `location`    | `string`       | Yes      | The physical location of the event.       |
  | `budget`      | `decimal`      | No       | The estimated budget for the event.       |

### 3. Vendors, Services, & Categories

| Method | Endpoint                     | Description                               |
|--------|------------------------------|-------------------------------------------|
| `GET`  | `/api/vendors/`              | Get a list of all vendor profiles.        |
| `GET`  | `/api/vendors/{id}/`         | Get a specific vendor's public profile.   |
| `GET`  | `/api/services/categories/`  | Get a list of all service categories.     |
| `GET`  | `/api/services/services/`    | Get a list of all services offered by all vendors. |
| `POST` | `/api/register/vendor/`      | Register a new vendor (creates a user & profile). |

- **Register Vendor (`POST /api/register/vendor/`) Request Body:**

  | Field         | Type           | Required | Description                               |
  |---------------|----------------|----------|-------------------------------------------|
  | `user`        | `object`       | Yes      | User registration details (email, name, password). |
  | `business_name`| `string`       | Yes      | The name of the vendor's business.        |
  | `description` | `string`       | No       | A description of the vendor's services.   |
  | `phone_number`| `string`       | No       | Vendor's contact phone number.            |
  | `address`     | `string`       | No       | Vendor's business address.                |
  | `categories`  | `array` of `string` | No  | List of service category names (e.g., ["Catering", "Photography"]). |

- **Create Service (`POST /api/services/services/`) Request Body:**

  | Field         | Type           | Required | Description                               |
  |---------------|----------------|----------|-------------------------------------------|
  | `vendor`      | `uuid` (string)| Yes      | The ID of the vendor offering the service. |
  | `category`    | `string`       | Yes      | The name of the service category (e.g., "Catering"). |
  | `name`        | `string`       | Yes      | The name of the service.                  |
  | `description` | `string`       | No       | A detailed description of the service.    |
  | `price_range` | `string`       | No       | The estimated price range for the service. |
  | `availability_status` | `boolean` | No    | Whether the service is currently available. |

### 4. Bookings

| Method | Endpoint             | Description                               |
|--------|----------------------|-------------------------------------------|
| `GET`  | `/api/bookings/`     | List bookings (context-aware: for user's events or vendor's services). |
| `POST` | `/api/bookings/`     | Create a new booking for a service at an event. |
| `GET`  | `/api/bookings/{id}/`| Retrieve a specific booking.              |
| `PATCH`| `/api/bookings/{id}/`| Update a booking (e.g., a vendor confirming the status). |

- **Create Booking (`POST /api/bookings/`) Request Body:**

  | Field          | Type           | Required | Description                               |
  |----------------|----------------|----------|-------------------------------------------|
  | `event`        | `uuid` (string)| Yes      | The ID of the event this booking is for.  |
  | `service`      | `uuid` (string)| Yes      | The ID of the service being booked.       |
  | `agreed_price` | `decimal`      | No       | The price agreed upon for the service.    |

### 5. Payments

| Method | Endpoint             | Description                               |
|--------|----------------------|-------------------------------------------|
| `GET`  | `/api/payments/`     | List payments related to the user's bookings. |
| `POST` | `/api/payments/`     | Create a new payment for a booking.       |

- **Create Payment (`POST /api/payments/`) Request Body:**

  | Field     | Type           | Required | Description                               |
  |-----------|----------------|----------|-------------------------------------------|
  | `booking` | `uuid` (string)| Yes      | The ID of the booking this payment is for.|
  | `amount`  | `decimal`      | Yes      | The amount being paid.                    |

### 6. Reviews

| Method | Endpoint             | Description                               |
|--------|----------------------|-------------------------------------------|
| `GET`  | `/api/reviews/`      | List reviews written by the current user. |
| `POST` | `/api/reviews/`      | Create a new review for a service/vendor. |

- **Create Review (`POST /api/reviews/`) Request Body:**

  | Field     | Type           | Required | Description                               |
  |-----------|----------------|----------|-------------------------------------------|
  | `event`   | `uuid` (string)| Yes      | The ID of the event where the service was rendered. |
  | `vendor`  | `uuid` (string)| Yes      | The ID of the vendor being reviewed.      |
  | `service` | `uuid` (string)| Yes      | The ID of the service being reviewed.     |
  | `rating`  | `integer`      | Yes      | A rating from 1 to 5.                     |
  | `text`    | `string`       | Yes      | The text content of the review.           |

### 7. AI Assistant

| Method | Endpoint                   | Description                               |
|--------|----------------------------|-------------------------------------------|
| `POST` | `/api/ai/recommendations/` | Interact with the conversational AI assistant. |

- **AI Assistant (`POST /api/ai/recommendations/`) Request Body:**

  ```json
  {
    "conversation": [
      {"role": "user", "text": "Hi, I'm planning a wedding."},
      {"role": "model", "text": "Congratulations! What's your budget and location?"},
      {"role": "user", "text": "Around 50,000 KES in Nairobi."}
    ]
  }
  ```

- **AI Assistant Response (if asking a question):**

  ```json
  {
    "reply": "Great! For 50,000 KES in Nairobi, are you looking for catering, photography, or something else?",
    "structured_data": null,
    "is_tool_call": false
  }
  ```

- **AI Assistant Response (if providing recommendations):**

  ```json
  {
    "reply": "I've found some great options based on your needs! Here are the top recommendations.",
    "structured_data": {
      "vendors": [
        {
          "vendor_id": "...",
          "business_name": "Safi Catering",
          "service_id": "...",
          "service_name": "Wedding Catering Package",
          "price_range": "45000-55000 KES",
          "rating": "4.80/5.00"
        }
      ]
    },
    "is_tool_call": true
  }
  ```
