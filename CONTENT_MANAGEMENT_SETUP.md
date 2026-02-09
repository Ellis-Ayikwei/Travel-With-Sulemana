# Content Management System - Complete Setup ✅

## Overview

The admin dashboard now has full content management capabilities for **Blogs**, **Experiences**, and **Destinations**. Admins can create, read, update, and delete content that appears on the frontend.

---

## What Was Added

### Backend Models & APIs

#### 1. **Blog Posts** (`/api/blogs`)
**Model:** `apps/backend/src/models/BlogPost.ts`
```typescript
{
  title: string;
  excerpt: string;
  content: string;
  category: string; // Travel Tips, Guide, Culture, Adventure, Food, Photography
  author: string;
  date: Date;
  image: string;
  featured: boolean;
  readTime: number; // in minutes
  tags: string[];
  published: boolean;
}
```

**API Endpoints:**
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)

**Query Parameters:**
- `?published=true` - Filter by publication status
- `?featured=true` - Filter featured posts
- `?category=Travel%20Tips` - Filter by category

---

#### 2. **Experiences** (`/api/experiences`)
**Model:** `apps/backend/src/models/Experience.ts`
```typescript
{
  name: string;
  category: string; // Adventure, Culture, History, Leisure, Creative, Food, Photography
  region: string; // e.g., "Northern Ghana"
  description: string;
  startDate: Date;
  duration: string; // e.g., "7 Days"
  groupSize: string; // e.g., "8-12 Guests"
  price: number;
  availability: number;
  tag: string; // e.g., "Wildlife & Safari"
  highlights: string[];
  image: string;
  published: boolean;
}
```

**API Endpoints:**
- `GET /api/experiences` - Get all published experiences
- `GET /api/experiences/:id` - Get single experience
- `POST /api/experiences` - Create experience (admin only)
- `PUT /api/experiences/:id` - Update experience (admin only)
- `DELETE /api/experiences/:id` - Delete experience (admin only)

**Query Parameters:**
- `?published=true` - Filter by publication status
- `?category=Adventure` - Filter by category
- `?region=Northern%20Ghana` - Filter by region

---

### Admin Dashboard Pages

#### 1. **Blog Management** (`/dashboard/blogs`)
**File:** `apps/admin/app/(dashboard)/blogs/page.tsx`

Features:
- ✅ View all blog posts in a table
- ✅ Create new blog post
- ✅ Edit existing blog post
- ✅ Delete blog post with confirmation
- ✅ Filter by category, featured status, publication status
- ✅ Display read time, author, and date
- ✅ Full-text editor for blog content
- ✅ Image URL management
- ✅ Tags support

**Form Fields:**
- Title (required)
- Excerpt (required)
- Content (required)
- Category (dropdown)
- Author (defaults to "Sulemana")
- Image URL (required)
- Read Time (minutes)
- Featured (checkbox)
- Published (checkbox)

---

#### 2. **Experiences Management** (`/dashboard/experiences`)
**File:** `apps/admin/app/(dashboard)/experiences/page.tsx`

Features:
- ✅ View all experiences in a table
- ✅ Create new experience
- ✅ Edit existing experience
- ✅ Delete experience with confirmation
- ✅ Filter by category, region, publication status
- ✅ Display price, duration, availability
- ✅ Manage highlights (comma-separated)

**Form Fields:**
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
- Published (checkbox)

---

### Admin Sidebar Updates

**File:** `apps/admin/components/AdminLayout.tsx`

New menu items added:
```
Dashboard
├── Bookings
├── Packages
├── Destinations
├── Blogs          ← NEW
├── Experiences    ← NEW
├── Users
└── Settings
```

---

## How to Use

### For Admins

#### Creating a Blog Post
1. Navigate to **Dashboard → Blogs**
2. Click **"New Blog Post"** button
3. Fill in all required fields:
   - Title
   - Excerpt (short summary)
   - Content (full article)
   - Category
   - Image URL
   - Read Time (estimated minutes)
4. Optionally:
   - Mark as Featured
   - Change publication status
5. Click **OK** to save

#### Creating an Experience
1. Navigate to **Dashboard → Experiences**
2. Click **"New Experience"** button
3. Fill in all required fields:
   - Name
   - Category
   - Region
   - Description
   - Start Date
   - Duration
   - Group Size
   - Price
   - Tag
   - Image URL
4. Optionally:
   - Add Highlights
   - Update Availability
   - Change publication status
5. Click **OK** to save

#### Updating Content
- Click the **Edit** (pencil) icon on any row
- Modify the fields
- Click **OK** to save changes

#### Deleting Content
- Click the **Delete** (trash) icon on any row
- Confirm the deletion
- Content is permanently deleted from the database

---

## Database Schema

### BlogPost Collection
```javascript
{
  _id: ObjectId,
  title: String,
  excerpt: String,
  content: String,
  category: String,
  author: String,
  date: Date,
  image: String,
  featured: Boolean,
  readTime: Number,
  tags: [String],
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Experience Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  region: String,
  description: String,
  startDate: Date,
  duration: String,
  groupSize: String,
  price: Number,
  availability: Number,
  tag: String,
  highlights: [String],
  image: String,
  icon: String,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Examples

### Creating a Blog Post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "10 Hidden Gems in Ghana",
    "excerpt": "Beyond the bustle of Accra lies a world...",
    "content": "Full blog content here...",
    "category": "Travel Tips",
    "author": "Sulemana",
    "image": "https://...",
    "featured": true,
    "readTime": 5,
    "tags": ["ghana", "travel", "adventure"],
    "published": true
  }'
```

### Creating an Experience
```bash
curl -X POST http://localhost:5000/api/experiences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Northern Ghana Safari Explorer",
    "category": "Adventure",
    "region": "Northern Ghana",
    "description": "Explore wildlife...",
    "startDate": "2026-03-15",
    "duration": "7 Days",
    "groupSize": "8-12 Guests",
    "price": 4499,
    "availability": 4,
    "tag": "Wildlife & Safari",
    "highlights": ["Mole National Park", "Larabanga Mosque", "Wildlife Safaris"],
    "image": "https://...",
    "published": true
  }'
```

### Getting Published Blogs
```bash
curl "http://localhost:5000/api/blogs?published=true&category=Travel%20Tips"
```

### Getting Experiences by Region
```bash
curl "http://localhost:5000/api/experiences?region=Northern%20Ghana&published=true"
```

---

## Frontend Integration

### Fetching Blogs
The frontend blog page will fetch from `/api/blogs`:
```typescript
const response = await fetch('http://localhost:5000/api/blogs?published=true');
const blogs = await response.json();
```

### Fetching Experiences
The frontend experiences page will fetch from `/api/experiences`:
```typescript
const response = await fetch('http://localhost:5000/api/experiences?published=true');
const experiences = await response.json();
```

### Fetching Destinations
The destinations are managed in the `/api/destinations` endpoint (already implemented).

---

## File Structure

```
Backend:
├── models/
│   ├── BlogPost.ts          ← NEW
│   └── Experience.ts        ← NEW
├── controllers/
│   ├── blogController.ts    ← NEW
│   └── experienceController.ts ← NEW
├── routes/
│   ├── blogs.ts             ← NEW
│   └── experiences.ts       ← NEW
└── index.ts (updated with new routes)

Admin Dashboard:
├── app/(dashboard)/
│   ├── blogs/
│   │   └── page.tsx         ← NEW
│   ├── experiences/
│   │   └── page.tsx         ← NEW
│   └── ... (other pages)
└── components/
    └── AdminLayout.tsx      (updated with new menu items)
```

---

## Status

✅ **Backend Models** - Created (BlogPost, Experience)
✅ **API Controllers** - Created (blogController, experienceController)
✅ **API Routes** - Created (blogs, experiences)
✅ **Admin Pages** - Created (blogs management, experiences management)
✅ **Sidebar Menu** - Updated with new items
✅ **Authentication** - Protected with admin middleware
✅ **CRUD Operations** - All implemented

---

## Next Steps

### Immediate
1. Test all endpoints with the admin dashboard
2. Create sample blogs and experiences
3. Verify frontend can fetch the content

### Short Term
1. Integrate with CloudinaryAPI for image uploads
2. Add rich text editor (Quill/TinyMCE) for blog content
3. Add comment system for blogs
4. Add search and filtering UI

### Long Term
1. Scheduling (publish at specific time)
2. Drafts workflow
3. Revisions/history
4. Collaboration (multiple editors)
5. SEO optimization fields
6. Analytics dashboard

---

## Environment Variables

Backend `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-db
JWT_SECRET=your_secret
```

Admin `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AUTHKIT_PROJECT_ID=your_authkit_id
```

---

## Commands

```bash
# Start backend
cd apps/backend
npm run dev

# Start admin dashboard
cd apps/admin
npm run dev

# Build for production
npm run build

# Test API endpoints
curl http://localhost:5000/api/blogs
curl http://localhost:5000/api/experiences
```

---

**Version:** 1.0.0  
**Date:** February 1, 2026  
**Status:** Complete and Ready for Use
