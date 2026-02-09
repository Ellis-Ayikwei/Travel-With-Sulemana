# Carousel Setup & Testing Guide

## Prerequisites

Ensure you have:
- Node.js 18+ installed
- Both backend and frontend apps set up

## Step 1: Configure Environment Variables

### Frontend (`/apps/frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (`/apps/backend/.env`)
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your_jwt_secret_here"
PORT=5000
```

## Step 2: Initialize Database with Carousel Data

Run the seed script to populate the carousel with default images:

```bash
cd apps/backend
npx prisma db seed  # if seed.ts is configured
# OR manually run:
npx ts-node prisma/seedCarousel.ts
```

You should see output:
```
✅ Seeded 4 carousel images
```

## Step 3: Start Services in Order

### Terminal 1: Start Backend
```bash
cd apps/backend
npm run dev
```

Expected output:
```
Connected to SQLite database
▶ Server is running on port 5000
GET /api/carousel (when frontend requests)
```

### Terminal 2: Start Frontend
```bash
cd apps/frontend
npm run dev
```

Expected output:
```
▲ Next.js 15.5.9 (Turbopack)
Fetching carousel images from: http://localhost:5000/api/carousel
Carousel images fetched: [...]
```

### Terminal 3 (Optional): Start Admin
```bash
cd apps/admin
npm run dev
```

## Step 4: Test the Carousel

### In Browser
1. Open http://localhost:3000
2. Scroll to hero section
3. See carousel with auto-rotating images
4. Click left/right arrows to manually navigate
5. Check browser console for logs showing successful fetch

### View Browser Console
Press `F12` and go to Console tab. You should see:
```
Fetching carousel images from: http://localhost:5000/api/carousel
Carousel images fetched: Array(4)
  0: {image: "/assets/images/heroImage1.jpg", alt: "Mosque with minarets..."}
  1: {image: "/assets/images/salaga.jpg", alt: "Historic Salaga..."}
  2: {image: "/assets/images/capecoast.webp", alt: "Cape Coast Castle"}
  3: {image: "/assets/images/independece_square.jpg", alt: "Independence..."}
```

## Step 5: Manage Carousel (Admin)

### Access Admin Dashboard
1. Go to http://localhost:3000/login (or http://localhost:3001 if separate)
2. Login with admin credentials
3. Navigate to **Carousel** in sidebar
4. Add/Edit/Delete carousel images

### Example: Add New Image
1. Click "Add Image" button
2. Fill in:
   - **Image URL**: `https://example.com/your-image.jpg`
   - **Alt Text**: `Beautiful Ghana landscape`
   - **Order**: `4` (will appear 4th in carousel)
   - **Active**: Toggle ON
3. Click OK

Changes appear on homepage immediately!

## Troubleshooting

### "Failed to fetch" Error

**Check 1: Is backend running?**
```bash
curl http://localhost:5000/health
# Should return: {"status":"OK","timestamp":"..."}
```

**Check 2: Is database initialized?**
```bash
cd apps/backend
npx prisma db push
npx ts-node prisma/seedCarousel.ts
```

**Check 3: Check frontend console**
- Open Browser DevTools (F12)
- Go to Console tab
- Look for error messages
- Check Network tab to see if request is being made

**Check 4: Verify CORS**
Backend logs should show:
```
GET /api/carousel
```

If not seeing request, frontend isn't trying to fetch (JavaScript error).

### Database Error

```bash
# Reset database
cd apps/backend
rm prisma/dev.db
npx prisma migrate deploy
npx ts-node prisma/seedCarousel.ts
```

### Port Already in Use

If port 5000 is in use, change in backend `.env`:
```env
PORT=5001
```

Then update frontend `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## API Endpoints

### Public Endpoints
```
GET /api/carousel
Response: [
  {
    id: "clx...",
    imageUrl: "/assets/images/heroImage1.jpg",
    alt: "Mosque with minarets at twilight",
    order: 0,
    active: true,
    createdAt: "2026-02-07T...",
    updatedAt: "2026-02-07T..."
  },
  ...
]
```

### Admin Endpoints (Requires Auth)
```
POST   /api/carousel/admin
GET    /api/carousel/admin/all
PUT    /api/carousel/admin/:id
DELETE /api/carousel/admin/:id
POST   /api/carousel/admin/reorder
```

## Manual API Testing

### Using cURL

**Get carousel images:**
```bash
curl http://localhost:5000/api/carousel
```

**Create carousel image (admin):**
```bash
curl -X POST http://localhost:5000/api/carousel/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "imageUrl": "https://example.com/image.jpg",
    "alt": "Image description",
    "order": 0,
    "active": true
  }'
```

## Next Steps

1. ✅ Setup environment variables
2. ✅ Initialize database with carousel data
3. ✅ Start backend and frontend
4. ✅ Test carousel on homepage
5. ✅ Add/edit carousel images via admin

If you encounter issues, check the troubleshooting section above!
