# Carousel Management Setup Complete

## What Was Added

### 1. **Database Model** (`apps/backend/prisma/schema.prisma`)
- Added `CarouselImage` model with:
  - `id`: Unique identifier
  - `imageUrl`: URL to the carousel image
  - `alt`: Alt text for accessibility
  - `order`: Display order in carousel
  - `active`: Boolean to enable/disable images
  - Timestamps for created/updated

### 2. **Backend API** (`apps/backend/src/`)
- **Controller** (`controllers/carouselController.ts`):
  - `getCarouselImages()` - Public endpoint to fetch active carousel images
  - `getAllCarouselImages()` - Admin endpoint to fetch all images (including inactive)
  - `createCarouselImage()` - Create new carousel image
  - `updateCarouselImage()` - Update existing image
  - `deleteCarouselImage()` - Delete image and reorder remaining
  - `reorderCarouselImages()` - Reorder images by array

- **Routes** (`routes/carouselRoutes.ts`):
  - `GET /api/carousel` - Public (fetch active images)
  - `GET /api/carousel/admin/all` - Admin only (fetch all)
  - `POST /api/carousel/admin` - Admin only (create)
  - `PUT /api/carousel/admin/:id` - Admin only (update)
  - `DELETE /api/carousel/admin/:id` - Admin only (delete)
  - `POST /api/carousel/admin/reorder` - Admin only (reorder)

- **Routes Registration** (`src/index.ts`):
  - Added carousel routes to express app

### 3. **Admin Interface** (`apps/admin/app/dashboard/carousel/page.tsx`)
- Full CRUD interface for managing carousel images
- Features:
  - Table view of all carousel images with previews
  - Add new image modal
  - Edit existing images
  - Delete images with confirmation
  - Image URL input or file upload support
  - Alt text input for accessibility
  - Order/sequence management
  - Active/inactive toggle

- **Admin Menu** (`apps/admin/components/AdminLayout.tsx`):
  - Added "Carousel" menu item with picture icon
  - Located between "Experiences" and "Users"

### 4. **Frontend Updates** (`apps/frontend/app/page.tsx`)
- Updated hero carousel to fetch images from API
- Fallback to default hardcoded images if API is unavailable
- Maintains Embla Carousel functionality:
  - Auto-play (5 second intervals)
  - Touch/swipe support
  - Manual navigation arrows
  - Infinite loop

## How to Use

### Adding Carousel Images (Admin)
1. Go to Admin Dashboard
2. Click "Carousel" in the left sidebar
3. Click "Add Image" button
4. Fill in the form:
   - Image URL (paste URL) or upload image
   - Alt text (for accessibility)
   - Order (display sequence)
   - Toggle Active if needed
5. Click OK to save

### Editing Images
1. Click ✏️ icon on the image row
2. Update any fields
3. Click OK to save

### Deleting Images
1. Click 🗑️ icon on the image row
2. Confirm deletion

### Publishing Images
- Images must have `active: true` to appear on the hero
- Inactive images are only visible in admin

## API Endpoints

### Public
- `GET /api/carousel` - Get all active carousel images

### Admin Protected
- `GET /api/carousel/admin/all` - Get all images
- `POST /api/carousel/admin` - Create image
- `PUT /api/carousel/admin/:id` - Update image
- `DELETE /api/carousel/admin/:id` - Delete image
- `POST /api/carousel/admin/reorder` - Reorder images

## Default Images

If no carousel images exist in the database, the frontend will use these default images:
1. `/assets/images/heroImage1.jpg` - Mosque with minarets at twilight
2. `/assets/images/salaga.jpg` - Historic Salaga in Northern Ghana
3. `/assets/images/capecoast.webp` - Cape Coast Castle
4. `/assets/images/independece_square.jpg` - Independence Square in Accra

## Setup Steps

1. ✅ Database migration applied (CarouselImage table created)
2. ✅ Backend API endpoints created and registered
3. ✅ Admin interface created with full CRUD
4. ✅ Frontend updated to fetch from API
5. ⚠️ TODO: Seed initial carousel images (optional)

## Next Steps (Optional)

To populate the database with the default images, you can either:

1. **Manual Entry**: Use the admin interface to add images one by one
2. **Seed Script**: Create a migration/seed script with:
   ```typescript
   await prisma.carouselImage.createMany({
     data: [
       {
         imageUrl: "/assets/images/heroImage1.jpg",
         alt: "Mosque with minarets at twilight",
         order: 0,
         active: true,
       },
       // ... more images
     ],
   });
   ```

## Environment Variables

Make sure your frontend has the correct API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

This is already configured in the frontend's env setup.
