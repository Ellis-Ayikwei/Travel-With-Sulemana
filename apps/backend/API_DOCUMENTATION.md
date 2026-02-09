# Travel With Sulemana - Backend API Documentation

## Overview

This is the Express.js + MongoDB backend for the Travel With Sulemana platform. It provides RESTful APIs for managing travel packages, bookings, destinations, users, and administrative functions.

**Technology Stack:**
- Node.js + Express.js 4.18.2
- MongoDB with Mongoose 8.0.0
- TypeScript 5.3.2
- JWT Authentication (jsonwebtoken 9.1.2)
- Password Hashing (bcryptjs 2.4.3)

---

## Project Structure

```
src/
├── index.ts                 # Main Express server entry point
├── models/                  # MongoDB Mongoose schemas
│   ├── Admin.ts            # Admin user accounts
│   ├── Booking.ts          # Travel package bookings
│   ├── Destination.ts      # Travel destinations
│   ├── TravelPackage.ts    # Travel package tours
│   └── User.ts             # Customer user accounts
├── controllers/            # Business logic for routes
│   ├── authController.ts   # Authentication logic
│   ├── bookingController.ts # Booking CRUD operations
│   ├── destinationController.ts # Destination CRUD
│   ├── packageController.ts # Package CRUD operations
│   └── userController.ts   # User CRUD operations
├── routes/                 # API route definitions
│   ├── auth.ts            # Authentication endpoints
│   ├── bookings.ts        # Booking endpoints
│   ├── destinations.ts    # Destination endpoints
│   ├── packages.ts        # Package endpoints
│   └── users.ts           # User endpoints
├── middlewares/           # Express middleware
│   └── auth.ts           # JWT authentication & authorization
├── utils/                # Utility functions
│   └── auth.ts          # Password hashing & token generation
└── types/               # TypeScript types (if any)
```

---

## Core Models

### 1. User (Customer)
Represents a customer/traveler account.

**Fields:**
- `name` (string) - Customer name
- `email` (string) - Unique email address
- `phone` (string) - Contact phone number
- `password` (string) - Hashed password
- `profileImage` (string) - Profile picture URL
- `createdAt` (Date) - Account creation timestamp
- `updatedAt` (Date) - Last update timestamp

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233240000000",
  "profileImage": "https://...",
  "createdAt": "2025-12-15T10:30:00Z",
  "updatedAt": "2025-12-15T10:30:00Z"
}
```

### 2. TravelPackage
Represents a travel tour/package offered by the company.

**Fields:**
- `name` (string) - Package name (e.g., "Ghana Coast Explorer")
- `description` (string) - Detailed description
- `destination` (string) - Primary destination
- `duration` (number) - Duration in days
- `price` (number) - Price per person
- `maxTravelers` (number) - Maximum travelers allowed
- `currentBookings` (number) - Current confirmed bookings
- `highlights` (array) - Key attractions/highlights
- `images` (array) - Package images URLs
- `itinerary` (array) - Day-by-day itinerary
  - `day` (number) - Day number
  - `title` (string) - Day title
  - `description` (string) - Day description
- `rating` (number) - Package rating (0-5)
- `reviews` (number) - Number of reviews
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Ghana Coast Explorer",
  "description": "Explore the beautiful beaches and historical sites of Ghana",
  "destination": "Cape Coast",
  "duration": 5,
  "price": 850,
  "maxTravelers": 20,
  "currentBookings": 15,
  "highlights": ["Fort Castle", "Beach Resort", "Local Markets"],
  "images": ["https://...", "https://..."],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Orientation",
      "description": "Welcome to Cape Coast. Hotel check-in and city tour."
    }
  ],
  "rating": 4.8,
  "reviews": 25,
  "createdAt": "2025-11-01T08:00:00Z",
  "updatedAt": "2025-12-15T10:30:00Z"
}
```

### 3. Booking
Represents a customer's booking for a travel package.

**Fields:**
- `userId` (string) - Reference to User ID
- `packageId` (string) - Reference to TravelPackage ID
- `numberOfTravelers` (number) - Number of people traveling
- `startDate` (Date) - Booking start date
- `endDate` (Date) - Booking end date
- `totalPrice` (number) - Total booking price
- `status` (enum) - Booking status: `pending`, `confirmed`, `completed`, `cancelled`
- `specialRequests` (string) - Special accommodations/requests
- `createdAt` (Date) - Booking creation timestamp
- `updatedAt` (Date) - Last update timestamp

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "packageId": "507f1f77bcf86cd799439012",
  "numberOfTravelers": 3,
  "startDate": "2026-03-15T00:00:00Z",
  "endDate": "2026-03-20T00:00:00Z",
  "totalPrice": 2550,
  "status": "confirmed",
  "specialRequests": "Vegetarian meals required",
  "createdAt": "2025-12-20T14:22:00Z",
  "updatedAt": "2025-12-22T09:15:00Z"
}
```

### 4. Destination
Represents a travel destination in Ghana.

**Fields:**
- `name` (string) - Destination name
- `region` (string) - Region in Ghana
- `description` (string) - Description of destination
- `image` (string) - Destination image URL
- `highlights` (array) - Key attractions
- `bestTimeToVisit` (string) - Best season to visit
- `rating` (number) - Destination rating
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Cape Coast",
  "region": "Central Region",
  "description": "Historical coastal town with beautiful beaches and colonial forts",
  "image": "https://...",
  "highlights": ["Cape Coast Castle", "Elmina Castle", "Beach Resort"],
  "bestTimeToVisit": "November - March",
  "rating": 4.6,
  "createdAt": "2025-10-01T00:00:00Z",
  "updatedAt": "2025-12-15T10:30:00Z"
}
```

### 5. Admin
Represents an administrative user.

**Fields:**
- `email` (string) - Unique admin email
- `password` (string) - Hashed password
- `role` (enum) - Admin role: `super_admin`, `admin`, `moderator`
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "email": "admin@travelwithsulemana.com",
  "role": "super_admin",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-12-15T10:30:00Z"
}
```

---

## API Endpoints

### Authentication Endpoints (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233240000000",
  "password": "securePassword123"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### User Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### Admin Login
```
POST /api/auth/admin-login
Content-Type: application/json

{
  "email": "admin@travelwithsulemana.com",
  "password": "adminPassword123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439015",
    "email": "admin@travelwithsulemana.com",
    "role": "super_admin"
  }
}
```

### Travel Packages Endpoints (`/api/packages`)

#### List All Packages
```
GET /api/packages

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Ghana Coast Explorer",
    "destination": "Cape Coast",
    "duration": 5,
    "price": 850,
    "maxTravelers": 20,
    "currentBookings": 15,
    "rating": 4.8,
    ...
  }
]
```

#### Get Package Details
```
GET /api/packages/:id

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Ghana Coast Explorer",
  "description": "Explore the beautiful beaches...",
  "destination": "Cape Coast",
  "duration": 5,
  "price": 850,
  ...
}
```

#### Create Package (Admin Only)
```
POST /api/packages
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Ghana Coast Explorer",
  "description": "Explore beautiful beaches...",
  "destination": "Cape Coast",
  "duration": 5,
  "price": 850,
  "maxTravelers": 20,
  "highlights": ["Fort", "Beach"],
  "images": ["url1", "url2"],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival",
      "description": "Check-in at hotel"
    }
  ]
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439012",
  ...created package...
}
```

#### Update Package (Admin Only)
```
PUT /api/packages/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 950,
  "rating": 4.9,
  ...fields to update...
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  ...updated package...
}
```

#### Delete Package (Admin Only)
```
DELETE /api/packages/:id
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "Package deleted"
}
```

### Bookings Endpoints (`/api/bookings`)

#### List Bookings
```
GET /api/bookings?status=confirmed&userId=507f1f77bcf86cd799439011

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "packageId": "507f1f77bcf86cd799439012",
    "numberOfTravelers": 3,
    "startDate": "2026-03-15T00:00:00Z",
    "totalPrice": 2550,
    "status": "confirmed",
    ...
  }
]
```

#### Create Booking
```
POST /api/bookings
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011",
  "packageId": "507f1f77bcf86cd799439012",
  "numberOfTravelers": 3,
  "startDate": "2026-03-15",
  "endDate": "2026-03-20",
  "totalPrice": 2550,
  "specialRequests": "Vegetarian meals"
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439013",
  ...created booking...
}
```

#### Get Booking
```
GET /api/bookings/:id
Authorization: Bearer <token>

Response (200):
{
  "_id": "507f1f77bcf86cd799439013",
  ...booking details...
}
```

#### Update Booking (Admin Only)
```
PUT /api/bookings/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "completed",
  "numberOfTravelers": 4
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439013",
  ...updated booking...
}
```

#### Cancel Booking
```
DELETE /api/bookings/:id
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "Booking deleted"
}
```

### Destinations Endpoints (`/api/destinations`)

#### List Destinations
```
GET /api/destinations

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Cape Coast",
    "region": "Central Region",
    "rating": 4.6,
    ...
  }
]
```

#### Get Destination
```
GET /api/destinations/:id

Response (200):
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Cape Coast",
  ...
}
```

#### Create Destination (Admin Only)
```
POST /api/destinations
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Cape Coast",
  "region": "Central Region",
  "description": "Beautiful coastal town...",
  "image": "https://...",
  "highlights": ["Fort", "Beach"],
  "bestTimeToVisit": "November - March"
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439014",
  ...created destination...
}
```

#### Update Destination (Admin Only)
```
PUT /api/destinations/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "rating": 4.8
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439014",
  ...updated destination...
}
```

#### Delete Destination (Admin Only)
```
DELETE /api/destinations/:id
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "Destination deleted"
}
```

### Users Endpoints (`/api/users`)

#### List Users (Admin Only)
```
GET /api/users
Authorization: Bearer <admin_token>

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+233240000000",
    ...
  }
]
```

#### Get User
```
GET /api/users/:id
Authorization: Bearer <token>

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  ...
}
```

#### Update User
```
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+233240000001",
  "profileImage": "https://..."
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  ...updated user...
}
```

#### Delete User (Admin Only)
```
DELETE /api/users/:id
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "User deleted"
}
```

---

## Authentication

### JWT Token Format

All authenticated requests require a Bearer token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The token includes:
- `id` - User/Admin ID
- `email` - User/Admin email
- `role` - User role (for admins)

### Authorization

**Public Routes:**
- `GET /api/packages` - Anyone can view packages
- `GET /api/destinations` - Anyone can view destinations
- `POST /api/bookings` - Anyone can create bookings
- `POST /api/auth/*` - Registration and login

**Protected Routes (Authenticated Users):**
- `GET /api/bookings/:id` - User can view own booking
- `PUT /api/users/:id` - User can update own profile
- `GET /api/users/:id` - User can view own profile

**Admin Only Routes:**
- `POST /api/packages` - Create packages
- `PUT /api/packages/:id` - Update packages
- `DELETE /api/packages/:id` - Delete packages
- `POST /api/destinations` - Create destinations
- `PUT /api/bookings/:id` - Update bookings
- `DELETE /api/bookings/:id` - Delete bookings
- `GET /api/users` - View all users

---

## Environment Variables

Create a `.env` file in the `apps/backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/travel-db

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

---

## Running the Backend

### Development

```bash
cd apps/backend
npm install
npm run dev
```

The server will start on `http://localhost:5000`

### Production

```bash
cd apps/backend
npm install
npm run build
npm start
```

### With Docker

```bash
docker-compose up backend mongodb
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - OK / Success
- `201` - Created / Resource created
- `400` - Bad Request / Invalid input
- `401` - Unauthorized / Missing/invalid token
- `403` - Forbidden / Insufficient permissions
- `404` - Not Found / Resource doesn't exist
- `500` - Internal Server Error

---

## Database Connection

The backend automatically connects to MongoDB on startup. Ensure MongoDB is running on the configured URI before starting the server.

**Connection Details:**
- Default: `mongodb://localhost:27017/travel-db`
- Atlas: `mongodb+srv://user:password@cluster.mongodb.net/travel-db?retryWrites=true&w=majority`

---

## Testing API Endpoints

### Using cURL

```bash
# Get all packages
curl http://localhost:5000/api/packages

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+233240000000",
    "password": "password123"
  }'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Using Postman

1. Import the provided Postman collection (if available)
2. Set base URL to `http://localhost:5000`
3. Set `{{token}}` variable with the JWT token from login response
4. Use the pre-configured requests

---

## Performance Considerations

- Bookings are filtered by `status` and `userId` for faster queries
- Add MongoDB indexes for frequently queried fields
- Implement pagination for large result sets
- Cache frequently accessed packages and destinations

---

## Security Best Practices

✅ **Implemented:**
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 24-hour expiration
- Role-based access control
- CORS enabled for trusted origins
- Input validation on all endpoints

⚠️ **Recommended:**
- Use HTTPS in production
- Implement rate limiting
- Add request logging and monitoring
- Regular security audits
- Keep dependencies updated

---

## Future Enhancements

- [ ] Email notifications for bookings
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Advanced search and filtering
- [ ] Booking cancellation policies
- [ ] Reviews and ratings system
- [ ] Multi-language support
- [ ] Analytics and reporting
- [ ] WebSocket notifications

---

**Version:** 1.0.0  
**Last Updated:** February 1, 2026  
**Maintained By:** Travel With Sulemana Team
