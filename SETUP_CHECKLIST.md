# Setup Checklist - Travel With Sulemana

Complete this checklist to get your full-stack travel booking platform running.

## ✅ Pre-Setup

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] MongoDB installed or Docker available
- [ ] AuthKit account created
- [ ] Text editor/IDE ready

## ✅ Clone & Install

- [ ] Clone repository: `git clone <repo-url>`
- [ ] Navigate to project: `cd Travel-With-Sulemana`
- [ ] Install dependencies: `npm install`

## ✅ Backend Setup

- [ ] Navigate: `cd apps/backend`
- [ ] Install packages: `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Update `.env` with:
  - [ ] `MONGODB_URI` (local or Atlas)
  - [ ] `JWT_SECRET` (strong random string)
  - [ ] `ADMIN_SECRET` (another random string)
- [ ] Start MongoDB (if local):
  ```bash
  docker run -d -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    mongo:7
  ```
- [ ] Test backend: `npm run dev`
- [ ] Verify: http://localhost:5000/health returns `{"status":"OK"}`

## ✅ Frontend Setup

- [ ] Navigate: `cd apps/frontend`
- [ ] Install packages: `npm install`
- [ ] Create `.env.local` file
- [ ] Update `.env.local` with:
  - [ ] `NEXT_PUBLIC_API_URL=http://localhost:5000`
  - [ ] `NEXT_PUBLIC_AUTHKIT_PROJECT_ID` (from AuthKit)
- [ ] Test frontend: `npm run dev`
- [ ] Verify: http://localhost:3000 loads with logo

## ✅ Admin Dashboard Setup

- [ ] Navigate: `cd apps/admin`
- [ ] Install packages: `npm install`
- [ ] Create `.env.local` file
- [ ] Update `.env.local` with:
  - [ ] `NEXT_PUBLIC_API_URL=http://localhost:5000`
  - [ ] `NEXT_PUBLIC_AUTHKIT_PROJECT_ID` (same as frontend)
  - [ ] `API_SECRET` (random string)
- [ ] Test admin: `npm run dev`
- [ ] Verify: http://localhost:3001/login loads login page

## ✅ Authentication Setup

- [ ] Create AuthKit project at https://authkit.dev
- [ ] Get your Project ID from AuthKit dashboard
- [ ] Set `NEXT_PUBLIC_AUTHKIT_PROJECT_ID` in:
  - [ ] `apps/frontend/.env.local`
  - [ ] `apps/admin/.env.local`
- [ ] Test login on admin dashboard
- [ ] Test signup on frontend

## ✅ Database Setup (Optional - for demo data)

- [ ] Connect to MongoDB (local or via Compass)
- [ ] Create sample destinations
- [ ] Create sample travel packages
- [ ] Create sample users

## ✅ API Testing

- [ ] GET http://localhost:5000/api/packages
- [ ] GET http://localhost:5000/api/destinations
- [ ] GET http://localhost:5000/api/bookings
- [ ] All should return `[]` or valid data

## ✅ Admin Dashboard Testing

- [ ] Visit http://localhost:3001
- [ ] Click "Sign in with AuthKit"
- [ ] Complete AuthKit authentication
- [ ] See Dashboard page
- [ ] Click "Bookings" - should load table
- [ ] Click "Packages" - should load packages
- [ ] Click "Destinations" - should load destinations
- [ ] Click "Users" - should load users

## ✅ Frontend Testing

- [ ] Visit http://localhost:3000
- [ ] See home page with hero section
- [ ] Scroll to "Featured Adventures" - should show destinations
- [ ] Click "Explore Destinations" - should navigate
- [ ] Click "Book Your Experience" - should show booking section
- [ ] AuthKit login should work

## ✅ Documentation Review

- [ ] Read `README_COMPLETE.md` - full documentation
- [ ] Read `QUICK_START.md` - setup guide
- [ ] Read `IMPLEMENTATION_SUMMARY.md` - what was built
- [ ] Review API endpoints in `apps/backend/README.md`
- [ ] Review admin features in `apps/admin/README.md`

## ✅ Docker Setup (Alternative)

- [ ] Ensure Docker is running
- [ ] From project root: `docker-compose up -d`
- [ ] Wait for services to start (~30 seconds)
- [ ] Test URLs:
  - [ ] http://localhost:3000 - Frontend
  - [ ] http://localhost:3001 - Admin
  - [ ] http://localhost:5000 - Backend
  - [ ] Connect to MongoDB on localhost:27017

## ✅ Project Structure Verification

Verify all required files exist:

```
Backend (/apps/backend/)
├── [ ] src/index.ts
├── [ ] src/models/Booking.ts
├── [ ] src/models/Driver.ts (TravelPackage)
├── [ ] src/models/Destination.ts
├── [ ] src/controllers/bookingController.ts
├── [ ] src/controllers/packageController.ts
├── [ ] src/routes/bookings.ts
├── [ ] src/routes/packages.ts
├── [ ] src/routes/destinations.ts
└── [ ] .env

Admin (/apps/admin/)
├── [ ] components/AdminLayout.tsx
├── [ ] components/AuthProvider.tsx
├── [ ] app/layout.tsx
├── [ ] app/login/page.tsx
├── [ ] app/(dashboard)/page.tsx
├── [ ] app/(dashboard)/bookings/page.tsx
├── [ ] app/(dashboard)/packages/page.tsx
├── [ ] app/(dashboard)/destinations/page.tsx
└── [ ] .env.local

Frontend (/apps/frontend/)
├── [ ] contexts/AuthProvider.tsx
├── [ ] contexts/BookingContext.tsx
└── [ ] .env.local
```

## ✅ Troubleshooting

If something doesn't work:

- [ ] Check MongoDB is running: `mongosh`
- [ ] Check ports: `lsof -i :3000` (3001, 5000)
- [ ] Check environment variables in `.env` files
- [ ] Restart services: kill terminal and rerun `npm run dev`
- [ ] Clear node_modules: `rm -rf node_modules && npm install`
- [ ] Check AuthKit credentials are correct
- [ ] Review error messages in terminal/console

## ✅ Customization (After Setup)

- [ ] Update company logo/branding
- [ ] Customize colors in Tailwind config
- [ ] Add your destinations and packages
- [ ] Create admin users in database
- [ ] Setup email notifications
- [ ] Add payment integration
- [ ] Deploy to production

## ✅ Deployment Preparation

- [ ] Update all `.env` with production values
- [ ] Set strong JWT_SECRET
- [ ] Use production MongoDB URI
- [ ] Configure CORS for your domain
- [ ] Setup SSL certificates
- [ ] Review security headers
- [ ] Run type checking: `npm run type-check` in each app
- [ ] Build production bundles: `npm run build`

## ✅ Final Verification

- [ ] All three services running without errors
- [ ] Can access all three URLs
- [ ] AuthKit authentication working
- [ ] Can create bookings from frontend
- [ ] Can manage bookings from admin
- [ ] API endpoints returning proper responses
- [ ] No console errors in browser
- [ ] No errors in terminal outputs

## 🎉 You're Done!

When all checkboxes are complete, you have a fully functional:
- ✅ Travel booking frontend
- ✅ Admin management dashboard
- ✅ Backend REST API
- ✅ MongoDB database
- ✅ AuthKit authentication

Start using the platform to manage travel bookings!

---

## 📞 Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review error messages carefully
3. Check documentation in README files
4. Review terminal/console logs
5. Verify all environment variables

---

**Last Updated**: February 1, 2026
**Version**: 1.0.0
