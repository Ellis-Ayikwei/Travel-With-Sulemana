# System Architecture - Travel With Sulemana

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USERS & ADMINS                          │
└────┬────────────────────────┬────────────────────────┬──────┘
     │                        │                        │
     ▼                        ▼                        ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend   │      │     Admin    │      │   Backend    │
│   (Port 3000)│      │ (Port 3001)  │      │ (Port 5000)  │
│   Next.js    │      │   Next.js    │      │  Express.js  │
│   + AuthKit  │      │  + Ant Design│      │  + MongoDB   │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             │
                             ▼
                       ┌────────────┐
                       │  MongoDB   │
                       │ (Port 27017)
                       └────────────┘
```

## 🔄 Data Flow

### 1. User Booking Flow

```
┌──────────────┐
│   Frontend   │
│   (Customer) │
└──────┬───────┘
       │ 1. AuthKit Login
       │ 2. Browse Packages
       │ 3. Select Package & Dates
       │ 4. Create Booking
       ▼
┌──────────────────────┐      ┌─────────────────────┐
│   Backend API        │◄────►│  MongoDB Database   │
│   Express.js         │      │                     │
│ /api/bookings        │      │  - Bookings         │
│ /api/packages        │      │  - Packages         │
│ /api/destinations    │      │  - Destinations     │
│ /api/users           │      │  - Users            │
│ /api/auth            │      │  - Admins           │
└──────────────────────┘      └─────────────────────┘
```

### 2. Admin Management Flow

```
┌──────────────┐
│   Admin      │
│  Dashboard   │
└──────┬───────┘
       │ 1. AuthKit Login
       │ 2. View Dashboard
       │ 3. Manage:
       │    - Bookings
       │    - Packages
       │    - Destinations
       │    - Users
       ▼
┌──────────────────────┐      ┌─────────────────────┐
│   Backend API        │◄────►│  MongoDB Database   │
│   Express.js         │      │                     │
│ Protected Routes     │      │  All Data Models    │
│ (Admin Only)         │      │                     │
└──────────────────────┘      └─────────────────────┘
```

## 🏗️ Component Architecture

### Frontend Components

```
Frontend (Next.js 15)
│
├── Pages
│   ├── /                      # Home page
│   ├── /destinations          # Browse destinations
│   ├── /book                  # Booking pages
│   ├── /login                 # AuthKit login
│   └── /experiences           # Travel experiences
│
├── Components
│   ├── Navigation.tsx         # Top navigation
│   ├── Footer.tsx             # Footer
│   └── Other components
│
├── Contexts
│   ├── AuthProvider.tsx       # AuthKit provider
│   └── BookingContext.tsx     # Booking state
│
└── Utilities
    └── api.ts                 # API client
```

### Admin Components

```
Admin Dashboard (Next.js 14)
│
├── Public Routes
│   └── /login                 # AuthKit login page
│
├── Protected Routes (Dashboard)
│   ├── /dashboard             # Home/stats
│   ├── /dashboard/bookings    # Booking management
│   ├── /dashboard/packages    # Package management
│   ├── /dashboard/destinations # Destination management
│   ├── /dashboard/users       # User management
│   └── /dashboard/settings    # Admin settings
│
├── Layout
│   └── AdminLayout.tsx        # Sidebar + navigation
│
├── Auth
│   └── AuthProvider.tsx       # AuthKit provider
│
└── Utilities
    └── api.ts                 # API client with auth
```

### Backend API

```
Backend (Express.js)
│
├── Routes
│   ├── /api/auth              # Authentication
│   │   ├── POST /register     # User signup
│   │   ├── POST /login        # User login
│   │   └── POST /admin-login  # Admin login
│   │
│   ├── /api/bookings          # Booking CRUD
│   │   ├── GET /              # List bookings
│   │   ├── POST /             # Create booking
│   │   ├── GET /:id           # Get booking
│   │   ├── PUT /:id           # Update booking
│   │   └── DELETE /:id        # Delete booking
│   │
│   ├── /api/packages          # Package management
│   │   ├── GET /              # List packages
│   │   ├── POST /             # Create (admin)
│   │   ├── GET /:id           # Get package
│   │   ├── PUT /:id           # Update (admin)
│   │   └── DELETE /:id        # Delete (admin)
│   │
│   ├── /api/destinations      # Destination management
│   │   ├── GET /              # List destinations
│   │   ├── POST /             # Create (admin)
│   │   ├── GET /:id           # Get destination
│   │   ├── PUT /:id           # Update (admin)
│   │   └── DELETE /:id        # Delete (admin)
│   │
│   └── /api/users             # User management
│       ├── GET /              # List users (admin)
│       ├── GET /:id           # Get user
│       ├── PUT /:id           # Update user
│       └── DELETE /:id        # Delete (admin)
│
├── Controllers
│   ├── authController.ts      # Auth logic
│   ├── bookingController.ts   # Booking logic
│   ├── packageController.ts   # Package logic
│   ├── destinationController.ts # Destination logic
│   └── userController.ts      # User logic
│
├── Models
│   ├── Booking.ts             # Booking schema
│   ├── TravelPackage.ts       # Package schema
│   ├── Destination.ts         # Destination schema
│   ├── User.ts                # User schema
│   └── Admin.ts               # Admin schema
│
├── Middlewares
│   └── auth.ts                # JWT + role auth
│
└── Utilities
    └── auth.ts                # Hash/verify passwords
```

## 🔐 Authentication Flow

### User Authentication (Frontend)

```
Frontend                          AuthKit
   │                               │
   ├──────────► Sign In ──────────►│
   │                               │
   │                    JWT Token◄─┤
   │                               │
   ├─ Store Token (localStorage)
   │
   ├──────────► API Request ──────────► Backend
   │        (with Authorization header)
   │
   │◄─────────── Response ◄─────────────┤
   │
```

### Admin Authentication (Admin Dashboard)

```
Admin Dashboard                   AuthKit           Backend
   │                               │                  │
   ├──────────► Sign In ──────────►│                 │
   │                               │                 │
   │                   JWT Token◄──┤                 │
   │                               │                 │
   ├─ Store Token (localStorage)   │                 │
   │                               │                 │
   ├──────────────────────────────────► API Req ────►│
   │                           (with auth header)    │
   │                                                 │
   │◄────────────────── Response ◄────────────────────┤
   │                                                 │
```

## 💾 Database Schema

```
MongoDB Collections
│
├── bookings
│   ├── _id: ObjectId
│   ├── userId: string
│   ├── packageId: string
│   ├── numberOfTravelers: number
│   ├── startDate: Date
│   ├── endDate: Date
│   ├── totalPrice: number
│   ├── status: string (pending/confirmed/completed/cancelled)
│   ├── specialRequests: string
│   ├── createdAt: Date
│   └── updatedAt: Date
│
├── travelpackages
│   ├── _id: ObjectId
│   ├── name: string
│   ├── description: string
│   ├── destination: string
│   ├── duration: number
│   ├── price: number
│   ├── maxTravelers: number
│   ├── currentBookings: number
│   ├── highlights: [string]
│   ├── images: [string]
│   ├── itinerary: [{day, title, description}]
│   ├── rating: number
│   ├── reviews: number
│   ├── createdAt: Date
│   └── updatedAt: Date
│
├── destinations
│   ├── _id: ObjectId
│   ├── name: string
│   ├── region: string
│   ├── description: string
│   ├── image: string
│   ├── highlights: [string]
│   ├── bestTimeToVisit: string
│   ├── rating: number
│   ├── createdAt: Date
│   └── updatedAt: Date
│
├── users
│   ├── _id: ObjectId
│   ├── name: string
│   ├── email: string
│   ├── phone: string
│   ├── password: string (hashed)
│   ├── profileImage: string
│   ├── createdAt: Date
│   └── updatedAt: Date
│
└── admins
    ├── _id: ObjectId
    ├── email: string
    ├── password: string (hashed)
    ├── role: string (super_admin/admin/moderator)
    ├── createdAt: Date
    └── updatedAt: Date
```

## 🔗 Integration Points

### Frontend ↔ Backend

```
GET /api/packages
  ↓
Frontend fetches all travel packages
Displays on /destinations and /book pages
  ↓
User selects package and books
  ↓
POST /api/bookings
  ↓
Backend creates booking in MongoDB
  ↓
Response with booking confirmation
```

### Admin ↔ Backend

```
GET /api/bookings
  ↓
Admin views all bookings
  ↓
PUT /api/bookings/:id
  ↓
Admin updates booking status
  ↓
POST /api/packages
  ↓
Admin creates new travel package
  ↓
DELETE /api/bookings/:id
  ↓
Admin cancels booking
```

## 🔄 Request/Response Flow

### Typical API Request

```
Frontend/Admin
   │
   ├─ Prepare request
   │  - Method (GET, POST, etc.)
   │  - Endpoint URL
   │  - Headers (including Authorization)
   │  - Body (if POST/PUT)
   │
   ├─► Send to Backend
   │
Backend
   │
   ├─ Receive request
   ├─ Check authentication middleware
   ├─ Validate request data
   ├─ Call appropriate controller
   ├─ Perform database operation
   ├─ Return response
   │
   ├─► Send response
   │
Frontend/Admin
   │
   ├─ Receive response
   ├─ Parse JSON
   ├─ Update state/UI
   ├─ Handle errors if any
   │
   └─ Display to user
```

## 🚀 Deployment Architecture

```
Production Environment
│
├── Frontend (Vercel/Netlify)
│   └── Next.js app on CDN
│
├── Admin (Vercel/Netlify)
│   └── Next.js app on CDN
│
├── Backend (AWS/Heroku/Railway)
│   └── Express.js server
│
└── Database (MongoDB Atlas)
    └── Cloud-hosted MongoDB
```

## 🔐 Security Layers

```
Request
   │
   ├─► CORS Check (Express)
   │
   ├─► HTTPS/TLS Encryption
   │
   ├─► Request Validation
   │   └─ Input sanitization
   │
   ├─► Authentication Check
   │   └─ JWT verification
   │
   ├─► Authorization Check
   │   └─ Role-based access control
   │
   ├─► Rate Limiting (optional)
   │
   └─► Database Query
       └─ Parameterized queries (prevent SQL injection)
```

---

## 📈 Scalability Considerations

```
Current (Single Instance)
  Frontend → Backend ← MongoDB
  
Scalable (Load Balanced)
  Frontend (CDN)
      │
      ├─► Backend Instance 1
      ├─► Backend Instance 2 ──── MongoDB Replica Set
      └─► Backend Instance 3
```

---

**Architecture Version**: 1.0.0
**Last Updated**: February 1, 2026
