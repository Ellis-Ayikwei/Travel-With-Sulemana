# Travel With Sulemana - Admin & Backend System

A complete admin dashboard and backend API system for managing travel bookings, drivers, and users.

## Project Structure

```
Travel-With-Sulemana/
├── apps/
│   ├── frontend/          # Main travel booking frontend (Next.js)
│   ├── admin/             # Admin dashboard (Next.js + Ant Design)
│   ├── backend/           # Backend API (Express + Node.js)
│   ├── backend-py/        # Python backend (existing)
│   └── backend-node/      # Node backend (existing)
├── shared/                # Shared types and utilities
├── docker-compose.yml     # Docker services configuration
└── turbo.json            # Turborepo configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (for containerized setup)
- MongoDB (included in Docker setup)

### Local Development

1. **Install dependencies** for all apps:
```bash
npm install
```

2. **Setup environment files**:

For backend (`apps/backend/.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-db
JWT_SECRET=your_jwt_secret_key
ADMIN_SECRET=your_admin_secret_key
```

For admin (`apps/admin/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
API_SECRET=your_api_secret_key
```

3. **Start MongoDB** (if running locally):
```bash
# Using Docker
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:7
```

4. **Run in development mode**:

Terminal 1 - Backend:
```bash
cd apps/backend
npm run dev
```

Terminal 2 - Admin:
```bash
cd apps/admin
npm run dev
```

Then visit:
- Admin Dashboard: http://localhost:3000/login
- API: http://localhost:5000/health

### Docker Setup

Run all services with Docker Compose:

```bash
docker-compose up -d
```

Services will be available at:
- Admin Dashboard: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## 📱 Admin Dashboard

A modern admin interface built with **Next.js** and **Ant Design** for managing the travel business.

### Features

- **Dashboard**: Real-time overview of bookings, drivers, users, and revenue
- **Booking Management**: 
  - View all bookings with filters
  - Create new bookings
  - Update booking status
  - Delete bookings
- **Driver Management**:
  - Add and manage drivers
  - Track driver status
  - View driver ratings and ride history
- **User Management**:
  - View all users
  - Create and edit user profiles
  - Manage user accounts
- **Authentication**: Secure admin login with JWT tokens

### Admin Pages

- `/login` - Admin login page
- `/dashboard` - Dashboard home with metrics
- `/dashboard/bookings` - Booking management
- `/dashboard/drivers` - Driver management
- `/dashboard/users` - User management
- `/dashboard/settings` - Admin settings

## 🔌 Backend API

A robust **Express.js + TypeScript** backend API for managing all travel operations.

### API Endpoints

#### Authentication
- `POST /api/auth/admin-login` - Admin authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

#### Bookings
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking (admin)
- `DELETE /api/bookings/:id` - Delete booking (admin)

#### Drivers
- `GET /api/drivers` - List all drivers
- `GET /api/drivers/:id` - Get driver details
- `POST /api/drivers` - Create driver (admin)
- `PUT /api/drivers/:id` - Update driver (admin)
- `DELETE /api/drivers/:id` - Delete driver (admin)

#### Users
- `GET /api/users` - List all users (admin)
- `GET /api/users/:id` - Get user details
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Database Models

#### Booking
```typescript
{
  userId: string;
  driverId?: string;
  source: string;
  destination: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  fare: number;
  distance?: number;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Driver
```typescript
{
  name: string;
  email: string;
  phone: string;
  license: string;
  vehicle: string;
  licensePlate: string;
  status: 'active' | 'inactive' | 'suspended';
  rating: number;
  totalRides: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### User
```typescript
{
  name: string;
  email: string;
  phone: string;
  password: string; // hashed
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Admin
```typescript
{
  email: string;
  password: string; // hashed
  role: 'super_admin' | 'admin' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠 Technology Stack

### Admin Dashboard
- **Framework**: Next.js 14
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **HTTP Client**: Axios

### Backend API
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs

## 📦 Installation & Setup

### Backend Setup

```bash
cd apps/backend
npm install
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and JWT secret.

```bash
npm run dev  # Development
npm run build  # Build for production
npm start  # Production
```

### Admin Setup

```bash
cd apps/admin
npm install
cp .env.example .env.local
```

Edit `.env.local` with your API URL.

```bash
npm run dev  # Development
npm run build  # Build for production
npm start  # Production
```

## 🔐 Authentication

### Admin Login Flow
1. Admin visits `/login` page
2. Enters email and password
3. Credentials sent to `/api/auth/admin-login`
4. Backend validates and returns JWT token
5. Token stored in localStorage
6. Token included in all subsequent API requests

### Token Structure
```
Authorization: Bearer <jwt_token>
```

Token expires in 7 days.

## 📝 Development Guidelines

### TypeScript
- Strict mode enabled
- Proper typing for all functions and components
- Type safety across frontend and backend

### Code Organization
- Controllers handle business logic
- Routes define API endpoints
- Middlewares handle cross-cutting concerns
- Models define data structures
- Types define TypeScript interfaces

### Error Handling
All API endpoints return proper HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

## 🧪 Testing

Run type checking:
```bash
# Backend
cd apps/backend && npm run type-check

# Admin
cd apps/admin && npm run type-check
```

## 🚢 Deployment

### Build Docker Images

```bash
docker-compose build
docker-compose up -d
```

### Environment Variables for Production

Backend `.env`:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<production_mongodb_uri>
JWT_SECRET=<secure_random_string>
ADMIN_SECRET=<secure_random_string>
```

Admin `.env.local`:
```env
NEXT_PUBLIC_API_URL=<production_api_url>
API_SECRET=<secure_random_string>
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design Documentation](https://ant.design/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

MIT

## 👥 Contributors

- Ellis Ayikwei

---

For more information, see individual README files in:
- [Backend README](./apps/backend/README.md)
- [Admin Dashboard README](./apps/admin/README.md)
