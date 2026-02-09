# Quick Start Guide - Travel With Sulemana

## 🚀 5-Minute Setup

### Step 1: Prerequisites
- Node.js 18+ installed
- MongoDB running (or use Docker)
- AuthKit account created (for authentication)

### Step 2: Clone & Install
```bash
git clone <repo-url>
cd Travel-With-Sulemana
npm install
```

### Step 3: Environment Setup

**Backend** - `apps/backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-db
JWT_SECRET=your_super_secret_key_here
ADMIN_SECRET=your_admin_secret_here
```

**Frontend** - `apps/frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AUTHKIT_PROJECT_ID=your_project_id_here
```

**Admin** - `apps/admin/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AUTHKIT_PROJECT_ID=your_project_id_here
API_SECRET=your_api_secret
```

### Step 4: Start MongoDB (if not running)
```bash
docker run -d -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  mongo:7
```

### Step 5: Run Applications

**Terminal 1 - Backend:**
```bash
cd apps/backend
npm install
npm run dev
```
✅ Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd apps/frontend
npm install
npm run dev
```
✅ Frontend runs on http://localhost:3000

**Terminal 3 - Admin:**
```bash
cd apps/admin
npm install
npm run dev
```
✅ Admin runs on http://localhost:3001

## 📊 What You Get

### Frontend (http://localhost:3000)
- Beautiful travel package showcase
- Booking system with date selection
- User authentication
- Responsive mobile design

### Admin (http://localhost:3001)
- Dashboard with analytics
- Booking management
- Package management
- Destination management
- User management

### Backend API (http://localhost:5000)
- RESTful API for all operations
- JWT authentication
- MongoDB persistence
- CORS enabled

## 🔑 Key Features Implemented

✅ **Travel-Focused Backend**
- Bookings for travel packages
- Travel package management
- Destination management
- User management
- Admin authentication

✅ **AuthKit Integration**
- Secure user authentication
- Admin authentication
- Role-based access control
- Token-based authorization

✅ **Admin Dashboard**
- Ant Design UI components
- Travel package CRUD
- Destination management
- Booking management
- User analytics

✅ **Frontend**
- AuthKit integration
- Booking context for state management
- Travel package browsing
- Responsive design

## 🧪 Test the System

### 1. Register a User (Frontend)
- Go to http://localhost:3000
- Click "Book Your Experience"
- Sign up with AuthKit

### 2. Create Travel Packages (Admin)
- Go to http://localhost:3001/login
- Sign in with AuthKit admin account
- Navigate to "Packages"
- Create a new travel package

### 3. Book a Package (Frontend)
- Browse packages on frontend
- Select dates and number of travelers
- Complete booking with payment info

### 4. Manage Bookings (Admin)
- View all bookings in admin dashboard
- Update booking status
- View booking details

## 📁 Project Structure

```
apps/
├── frontend/       # Customer app (port 3000)
│   ├── app/       # Next.js pages
│   ├── components/
│   ├── contexts/  # Auth & Booking contexts
│   └── lib/       # API utilities
│
├── admin/         # Admin dashboard (port 3001)
│   ├── app/       # Protected dashboard
│   ├── components/
│   ├── types/
│   └── lib/       # API client
│
└── backend/       # API server (port 5000)
    ├── src/
    │   ├── models/      # MongoDB schemas
    │   ├── routes/      # API endpoints
    │   ├── controllers/ # Business logic
    │   ├── middlewares/ # Auth middleware
    │   └── utils/       # Helper functions
    └── dist/      # Compiled JavaScript
```

## 🔗 API Endpoints Summary

```
Bookings:
  GET    /api/bookings
  POST   /api/bookings
  GET    /api/bookings/:id
  PUT    /api/bookings/:id
  DELETE /api/bookings/:id

Packages:
  GET    /api/packages
  POST   /api/packages
  GET    /api/packages/:id
  PUT    /api/packages/:id
  DELETE /api/packages/:id

Destinations:
  GET    /api/destinations
  POST   /api/destinations
  GET    /api/destinations/:id
  PUT    /api/destinations/:id
  DELETE /api/destinations/:id

Auth:
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/admin-login

Users:
  GET    /api/users
  GET    /api/users/:id
  PUT    /api/users/:id
  DELETE /api/users/:id
```

## 🆘 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on port 27017
- Check `MONGODB_URI` in `.env`
- Use `docker run` command if not installed locally

### AuthKit Not Working
- Verify `NEXT_PUBLIC_AUTHKIT_PROJECT_ID` is set
- Check AuthKit credentials are valid
- Restart dev servers after env changes

### API Connection Error
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend/admin
- Verify CORS is enabled in backend

### Port Already in Use
```bash
# Kill process on port
kill -9 $(lsof -t -i :3000)  # Frontend
kill -9 $(lsof -t -i :3001)  # Admin
kill -9 $(lsof -t -i :5000)  # Backend
```

## 📚 Next Steps

1. **Customize branding** - Update logos and colors
2. **Add payment integration** - Stripe or PayPal
3. **Setup email notifications** - Nodemailer or SendGrid
4. **Enhance security** - Add rate limiting, input validation
5. **Deploy** - Using Vercel, Heroku, or Docker

## 🎉 You're All Set!

The full-stack travel booking platform is now running with:
- ✅ Complete backend API
- ✅ Admin dashboard with Ant Design
- ✅ AuthKit authentication
- ✅ Travel-focused features
- ✅ Responsive design

Happy coding! 🚀
