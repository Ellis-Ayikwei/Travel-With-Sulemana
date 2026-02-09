# 🚀 Quick Reference Guide

## Starting the System

### Terminal 1: Backend
```bash
cd apps/backend
npm install  # First time only
npm run dev
# Running on http://localhost:5000
```

### Terminal 2: Admin Dashboard
```bash
cd apps/admin
npm install  # First time only
npm run dev
# Running on http://localhost:3001
```

### Terminal 3: Frontend
```bash
cd apps/frontend
npm install  # First time only
npm run dev
# Running on http://localhost:3000
```

---

## Admin Dashboard Navigation

### Login
- URL: `http://localhost:3001/login`
- Use your admin credentials (AuthKit)

### Main Sections
```
Dashboard (📊)           → View stats and metrics
Bookings (📅)            → Manage customer bookings
Packages (📦)            → Manage travel packages
Destinations (🗺️)       → Manage destinations
Blogs (📝)              → Manage blog posts ⭐
Experiences (✨)        → Manage experiences ⭐
Users (👥)              → Manage user accounts
Settings (⚙️)           → App settings
```

---

## Common Admin Tasks

### Create a Blog Post
1. Click **Blogs** in sidebar
2. Click **"New Blog Post"** button
3. Fill form:
   - Title (required)
   - Excerpt (required)
   - Content (required)
   - Category (dropdown)
   - Author (defaults to "Sulemana")
   - Image URL (required)
   - Read Time in minutes
   - Toggle Featured/Published
4. Click **OK**

### Create an Experience
1. Click **Experiences** in sidebar
2. Click **"New Experience"** button
3. Fill form:
   - Name (required)
   - Category (dropdown)
   - Region (required)
   - Description (required)
   - Start Date (date picker)
   - Duration (e.g., "7 Days")
   - Group Size (e.g., "8-12 Guests")
   - Price (number)
   - Availability (number)
   - Tag (required)
   - Highlights (comma-separated)
   - Image URL (required)
4. Click **OK**

### Edit Content
1. Find item in table
2. Click **Edit** (pencil icon)
3. Update fields
4. Click **OK**

### Delete Content
1. Find item in table
2. Click **Delete** (trash icon)
3. Confirm deletion
4. Removed from database

---

## API Endpoints Cheat Sheet

### Blogs
```
GET  /api/blogs                      Get all blogs
GET  /api/blogs?published=true       Get published only
GET  /api/blogs?featured=true        Get featured only
GET  /api/blogs?category=Travel%20Tips
GET  /api/blogs/:id                  Get single blog
POST /api/blogs                      Create (admin token)
PUT  /api/blogs/:id                  Update (admin token)
DELETE /api/blogs/:id                Delete (admin token)
```

### Experiences
```
GET  /api/experiences                Get all experiences
GET  /api/experiences?published=true Get published only
GET  /api/experiences?category=Adventure
GET  /api/experiences?region=Northern%20Ghana
GET  /api/experiences/:id            Get single experience
POST /api/experiences                Create (admin token)
PUT  /api/experiences/:id            Update (admin token)
DELETE /api/experiences/:id          Delete (admin token)
```

### Other Resources
```
GET  /api/packages                   All travel packages
GET  /api/destinations               All destinations
GET  /api/bookings                   All bookings
POST /api/bookings                   Create booking
GET  /api/users                      All users (admin only)
```

---

## Testing with cURL

### Get All Blogs
```bash
curl http://localhost:5000/api/blogs
```

### Get Published Blogs Only
```bash
curl "http://localhost:5000/api/blogs?published=true"
```

### Get Blogs by Category
```bash
curl "http://localhost:5000/api/blogs?category=Travel%20Tips"
```

### Create Blog (Need JWT Token)
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Blog",
    "excerpt": "Test excerpt",
    "content": "Test content",
    "category": "Travel Tips",
    "author": "Sulemana",
    "image": "https://...",
    "readTime": 5,
    "featured": false,
    "published": true
  }'
```

### Get Single Experience
```bash
curl http://localhost:5000/api/experiences/:id
```

### Get Experiences by Region
```bash
curl "http://localhost:5000/api/experiences?region=Northern%20Ghana"
```

---

## File Locations

### Backend
```
apps/backend/
├── src/
│   ├── index.ts                         Main server
│   ├── models/
│   │   ├── BlogPost.ts                 NEW ⭐
│   │   ├── Experience.ts                NEW ⭐
│   │   ├── TravelPackage.ts
│   │   ├── Booking.ts
│   │   ├── Destination.ts
│   │   ├── User.ts
│   │   └── Admin.ts
│   ├── controllers/
│   │   ├── blogController.ts            NEW ⭐
│   │   ├── experienceController.ts      NEW ⭐
│   │   ├── packageController.ts
│   │   ├── bookingController.ts
│   │   ├── destinationController.ts
│   │   ├── userController.ts
│   │   └── authController.ts
│   ├── routes/
│   │   ├── blogs.ts                     NEW ⭐
│   │   ├── experiences.ts               NEW ⭐
│   │   ├── packages.ts
│   │   ├── bookings.ts
│   │   ├── destinations.ts
│   │   ├── users.ts
│   │   └── auth.ts
│   ├── middlewares/
│   │   └── auth.ts
│   └── utils/
│       └── auth.ts
├── package.json
├── tsconfig.json
└── API_DOCUMENTATION.md
```

### Admin Dashboard
```
apps/admin/
├── app/
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   └── (dashboard)/
│       ├── page.tsx                     Dashboard home
│       ├── bookings/
│       │   └── page.tsx
│       ├── packages/
│       │   └── page.tsx
│       ├── destinations/
│       │   └── page.tsx
│       ├── blogs/
│       │   └── page.tsx                 NEW ⭐
│       ├── experiences/
│       │   └── page.tsx                 NEW ⭐
│       ├── users/
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
├── components/
│   ├── AdminLayout.tsx
│   └── AuthProvider.tsx
├── lib/
│   └── api.ts
├── types/
│   └── index.ts
└── package.json
```

### Documentation
```
Root/
├── COMPLETE_SUMMARY.md                 This project summary
├── CONTENT_MANAGEMENT_SETUP.md          API & setup docs
├── ADMIN_FEATURES_GUIDE.md              User guide
├── SYSTEM_OVERVIEW.md                   Architecture diagrams
├── IMPLEMENTATION_CHECKLIST.md          Testing checklist
├── BACKEND_REFACTORING_COMPLETE.md      Backend status
├── ARCHITECTURE.md                      System architecture
└── This_File.md                         Quick reference
```

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/travel-db
JWT_SECRET=your_super_secret_key_change_in_production
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AUTHKIT_PROJECT_ID=your_authkit_project_id
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AUTHKIT_PROJECT_ID=your_authkit_project_id
```

---

## Data Format Examples

### Blog Post
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "title": "10 Hidden Gems in Ghana",
  "excerpt": "Discover amazing places...",
  "content": "Full article content here...",
  "category": "Travel Tips",
  "author": "Sulemana",
  "date": "2025-12-15T10:30:00Z",
  "image": "https://images.unsplash.com/...",
  "featured": true,
  "readTime": 5,
  "tags": ["ghana", "travel", "adventure"],
  "published": true,
  "createdAt": "2025-12-15T10:30:00Z",
  "updatedAt": "2025-12-15T10:30:00Z"
}
```

### Experience
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
  "name": "Northern Ghana Safari Explorer",
  "category": "Adventure",
  "region": "Northern Ghana",
  "description": "Explore wildlife in their natural habitat...",
  "startDate": "2026-03-15T00:00:00Z",
  "duration": "7 Days",
  "groupSize": "8-12 Guests",
  "price": 4499,
  "availability": 4,
  "tag": "Wildlife & Safari",
  "highlights": ["Mole National Park", "Larabanga Mosque", "Wildlife Safaris"],
  "image": "https://images.unsplash.com/...",
  "published": true,
  "createdAt": "2025-12-15T10:30:00Z",
  "updatedAt": "2025-12-15T10:30:00Z"
}
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Check MongoDB is running
mongosh

# Check dependencies
npm install
```

### Admin won't connect to backend
```bash
# Verify backend is running on :5000
curl http://localhost:5000/health

# Check CORS settings in backend
# Check NEXT_PUBLIC_API_URL in admin .env.local
```

### Login fails
```bash
# Check AuthKit credentials
# Verify JWT_SECRET in backend

# Check token in localStorage (browser console)
localStorage.getItem('authToken')
```

### API returns 403 (Forbidden)
```bash
# Not an admin user
# Check user role in database
# Verify JWT token is valid and not expired
```

---

## MongoDB Queries (mongosh)

### View Collections
```javascript
use travel-db
show collections
```

### Count Documents
```javascript
db.blogposts.countDocuments()
db.experiences.countDocuments()
db.bookings.countDocuments()
```

### Find Published Blogs
```javascript
db.blogposts.find({ published: true })
```

### Find Experiences by Region
```javascript
db.experiences.find({ region: "Northern Ghana" })
```

### Update Blog
```javascript
db.blogposts.updateOne(
  { _id: ObjectId("...") },
  { $set: { featured: true } }
)
```

---

## Performance Tips

1. **Caching**: Cache API responses in frontend
2. **Pagination**: Add pagination to large tables
3. **Indexing**: Add MongoDB indexes on frequently queried fields
4. **Lazy Loading**: Load images lazily on frontend
5. **CDN**: Use CDN for static content
6. **Database**: Use MongoDB Atlas for production

---

## Deployment Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas (production DB)
- [ ] Set CORS_ORIGIN to production domain
- [ ] Enable HTTPS
- [ ] Configure environment variables
- [ ] Deploy backend (AWS/Heroku/Railway)
- [ ] Deploy admin (Vercel/Netlify)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Test all endpoints
- [ ] Monitor logs

---

## Key Commands

```bash
# Start all services (from root)
# Terminal 1
cd apps/backend && npm run dev

# Terminal 2
cd apps/admin && npm run dev

# Terminal 3
cd apps/frontend && npm run dev

# Build for production
npm run build

# Test backend
npm run type-check

# View MongoDB data
mongosh
```

---

## Support Links

- **Backend API Docs**: See `apps/backend/API_DOCUMENTATION.md`
- **Admin User Guide**: See `ADMIN_FEATURES_GUIDE.md`
- **System Architecture**: See `SYSTEM_OVERVIEW.md`
- **Testing Guide**: See `IMPLEMENTATION_CHECKLIST.md`
- **Setup Guide**: See `CONTENT_MANAGEMENT_SETUP.md`

---

## Quick Links

- Admin Dashboard: http://localhost:3001
- Frontend: http://localhost:3000
- API: http://localhost:5000
- Health Check: http://localhost:5000/health
- MongoDB: localhost:27017

---

**Last Updated:** February 1, 2026  
**Status:** ✅ Production Ready  
**Questions?** Check the documentation files or review the API reference.
