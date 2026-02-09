# Travel Admin Backend

A Node.js/Express backend API for managing travel bookings, drivers, and users.

## Features

- **Booking Management**: Create, read, update, and delete bookings
- **Driver Management**: Manage driver profiles and status
- **User Management**: Handle user accounts and authentication
- **Authentication**: JWT-based authentication with admin and user roles
- **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-db
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET=your_admin_secret_key
```

### Running

**Development mode:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Drivers
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/:id` - Get driver details
- `POST /api/drivers` - Create driver (admin only)
- `PUT /api/drivers/:id` - Update driver (admin only)
- `DELETE /api/drivers/:id` - Delete driver (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user details
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

## Project Structure

```
src/
├── models/          # Mongoose models
├── routes/          # API routes
├── controllers/     # Route controllers
├── middlewares/     # Express middlewares
├── utils/           # Utility functions
├── types/           # TypeScript types
└── index.ts         # App entry point
```

## Models

### Booking
- userId: String (required)
- driverId: String
- source: String (required)
- destination: String (required)
- status: 'pending' | 'accepted' | 'completed' | 'cancelled'
- fare: Number (required)
- distance: Number
- duration: Number

### Driver
- name: String (required)
- email: String (unique, required)
- phone: String (required)
- license: String (required)
- vehicle: String (required)
- licensePlate: String (required)
- status: 'active' | 'inactive' | 'suspended'
- rating: Number (default: 5.0)
- totalRides: Number (default: 0)

### User
- name: String (required)
- email: String (unique, required)
- phone: String (required)
- password: String (hashed, required)
- profileImage: String

### Admin
- email: String (unique, required)
- password: String (hashed, required)
- role: 'super_admin' | 'admin' | 'moderator'

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens expire in 7 days.

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

## Development

Run TypeScript type checking:
```bash
npm run type-check
```

## License

MIT
