# Travel With Sulemana - Full Stack Application

A complete full-stack travel booking platform with a customer-facing frontend, admin dashboard, and backend API.

## 🏗️ Project Architecture

```
Travel-With-Sulemana/
├── apps/
│   ├── frontend/          # Customer-facing travel booking app (Next.js + React)
│   ├── admin/             # Admin dashboard (Next.js + Ant Design + AuthKit)
│   └── backend/           # Backend API (Express + Node.js + MongoDB)
├── shared/                # Shared types and utilities
└── docker-compose.yml     # Docker orchestration
```

## 🎯 Features

### Frontend (Customer App)
- Browse and explore travel packages
- View destinations with detailed information
- Book travel packages with flexible dates
- User authentication with AuthKit
- Responsive design with Tailwind CSS
- Real-time notifications
- Booking history and management

### Admin Dashboard
- Complete booking management system
- Travel package CRUD operations
- Destination management
- User account management
- Dashboard with analytics
- Real-time statistics
- Admin authentication with AuthKit

### Backend API
- RESTful API with Express.js
- MongoDB database integration
- JWT-based authentication
- Admin role-based access control
- CORS enabled for frontend integration
- Type-safe with TypeScript

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15
- **UI**: React 19
- **Styling**: Tailwind CSS
- **Authentication**: React AuthKit
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Admin Dashboard
- **Framework**: Next.js 14
- **UI Library**: Ant Design
- **Authentication**: AuthKit React
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT + bcryptjs
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Travel-With-Sulemana
```

2. **Install root dependencies**
```bash
npm install
```

3. **Setup environment files**

Backend (`apps/backend/.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-db
JWT_SECRET=your_super_secret_jwt_key
ADMIN_SECRET=your_admin_secret_key
```

Frontend (`apps/frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AUTHKIT_PROJECT_ID=your_authkit_project_id
```

Admin (`apps/admin/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AUTHKIT_PROJECT_ID=your_authkit_project_id
API_SECRET=your_api_secret_key
```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd apps/backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd apps/frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

**Terminal 3 - Admin:**
```bash
cd apps/admin
npm install
npm run dev
# Admin runs on http://localhost:3001
```

### Using Docker

```bash
docker-compose up -d
```

Services will be available at:
- Frontend: http://localhost:3000
- Admin: http://localhost:3001
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## 📚 API Documentation

### Base URL
`http://localhost:5000/api`

### Authentication Endpoints
```
POST /auth/register       - Register new user
POST /auth/login         - User login
POST /auth/admin-login   - Admin login
```

### Booking Endpoints
```
GET    /bookings         - Get all bookings
POST   /bookings         - Create booking
GET    /bookings/:id     - Get booking details
PUT    /bookings/:id     - Update booking (admin)
DELETE /bookings/:id     - Delete booking (admin)
```

### Travel Package Endpoints
```
GET    /packages         - Get all packages
POST   /packages         - Create package (admin)
GET    /packages/:id     - Get package details
PUT    /packages/:id     - Update package (admin)
DELETE /packages/:id     - Delete package (admin)
```

### Destination Endpoints
```
GET    /destinations     - Get all destinations
POST   /destinations     - Create destination (admin)
GET    /destinations/:id - Get destination details
PUT    /destinations/:id - Update destination (admin)
DELETE /destinations/:id - Delete destination (admin)
```

### User Endpoints
```
GET    /users           - Get all users (admin)
GET    /users/:id       - Get user details
PUT    /users/:id       - Update user
DELETE /users/:id       - Delete user (admin)
```

## 🔐 Authentication

### Frontend Authentication
Uses AuthKit for secure authentication:
1. User registers or logs in
2. Receives JWT token
3. Token stored in localStorage
4. Token included in API requests

### Admin Authentication
Uses AuthKit with admin-specific roles:
- super_admin: Full access
- admin: Full management access
- moderator: Limited access

### API Authentication
Protected routes require Bearer token:
```
Authorization: Bearer <jwt_token>
```

## 🗄️ Database Schema

### Booking
```typescript
{
  _id: ObjectId;
  userId: string;
  packageId: string;
  numberOfTravelers: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### TravelPackage
```typescript
{
  _id: ObjectId;
  name: string;
  description: string;
  destination: string;
  duration: number;
  price: number;
  maxTravelers: number;
  currentBookings: number;
  highlights: string[];
  images: string[];
  itinerary: Array<{day, title, description}>;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Destination
```typescript
{
  _id: ObjectId;
  name: string;
  region: string;
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### User
```typescript
{
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string; // hashed
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 📱 Project Structure Details

### Frontend (`apps/frontend/`)
```
app/
├── api/               # API routes
├── destinations/      # Destinations pages
├── experiences/       # Experiences pages
├── book/             # Booking pages
└── page.tsx          # Home page

components/
├── Navigation.tsx     # Navigation component
├── Footer.tsx         # Footer component
└── ...

contexts/
├── AuthProvider.tsx   # Auth context
├── BookingContext.tsx # Booking context
└── AuthContext.tsx    # Additional auth logic

lib/
├── api.ts            # API utilities
└── utils.ts          # Helper functions
```

### Admin (`apps/admin/`)
```
app/
├── login/            # Login page
└── (dashboard)/      # Protected dashboard routes
    ├── page.tsx      # Dashboard home
    ├── bookings/     # Bookings management
    ├── packages/     # Packages management
    ├── destinations/ # Destinations management
    ├── users/        # Users management
    └── settings/     # Admin settings

components/
├── AdminLayout.tsx   # Main layout with navigation
├── AuthProvider.tsx  # AuthKit provider
└── ...

lib/
├── api.ts           # API client
└── ...

types/
└── index.ts         # TypeScript types
```

### Backend (`apps/backend/`)
```
src/
├── models/          # Mongoose models
│   ├── Booking.ts
│   ├── TravelPackage.ts (Driver.ts)
│   ├── Destination.ts
│   ├── User.ts
│   └── Admin.ts

├── controllers/     # Route controllers
│   ├── bookingController.ts
│   ├── packageController.ts
│   ├── destinationController.ts
│   ├── userController.ts
│   └── authController.ts

├── routes/          # API routes
│   ├── bookings.ts
│   ├── packages.ts
│   ├── destinations.ts
│   ├── users.ts
│   └── auth.ts

├── middlewares/     # Express middlewares
│   └── auth.ts     # Authentication middleware

├── utils/           # Utility functions
│   └── auth.ts     # Auth utilities

└── index.ts        # App entry point
```

## 🚀 Deployment

### Build Production Bundles
```bash
# Frontend
cd apps/frontend && npm run build

# Admin
cd apps/admin && npm run build

# Backend
cd apps/backend && npm run build
```

### Environment Variables for Production
Update all `.env` files with production values:
- Strong JWT secrets
- Production database URI
- Production API URLs
- Updated AuthKit credentials

### Docker Deployment
```bash
docker-compose -f docker-compose.yml up -d
```

## 🔧 Development

### Type Checking
```bash
# Frontend
cd apps/frontend && npm run type-check

# Admin
cd apps/admin && npm run type-check

# Backend
cd apps/backend && npm run type-check
```

### Linting
```bash
# Frontend
cd apps/frontend && npm run lint
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [AuthKit Documentation](https://docs.authkit.dev/)
- [Ant Design Components](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

Ellis Ayikwei - [@EllisDev](https://twitter.com/ellisweb)

---

**Project Status**: Active Development

For issues and feature requests, please open a GitHub issue.
