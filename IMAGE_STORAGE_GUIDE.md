# Image Storage Strategy for Travel with Sulemana

## 📁 Current Setup

### **Static Assets** (Logos, default images)
**Location**: `/apps/frontend/public/assets/`

These are images that are part of your codebase:
```
apps/frontend/public/
└── assets/
    ├── images/
    │   ├── heroImage1.jpg
    │   ├── salaga.jpg
    │   ├── capecoast.webp
    │   ├── independece_square.jpg
    │   └── IMG_2220.jpg
    └── fonts/
```

**Access**: `http://localhost:3000/assets/images/heroImage1.jpg`

---

## 🚀 Recommended Setup

### **For Development & Testing**

#### Option 1: Local File Storage (Backend)

**Setup:**
```bash
# Install multer for file uploads
cd apps/backend
npm install multer
npm install --save-dev @types/multer
```

**Structure:**
```
apps/backend/
└── uploads/          ← Served at /uploads
    ├── carousel/
    ├── blogs/
    ├── destinations/
    ├── experiences/
    └── packages/
```

**Pros:**
- ✅ Easy setup
- ✅ No external dependencies
- ✅ Good for development

**Cons:**
- ❌ Not scalable
- ❌ Lost on server restart (if using containers)
- ❌ No CDN

---

### **For Production** (Recommended)

#### Option 2: Cloud Storage - Cloudinary ⭐

**Why Cloudinary?**
- Free tier: 25GB storage, 25GB bandwidth/month
- Automatic image optimization
- Resize & transform images on-the-fly
- CDN included
- Easy Next.js integration

**Setup:**

1. **Sign up**: [cloudinary.com](https://cloudinary.com)

2. **Install packages**:
```bash
cd apps/backend
npm install cloudinary multer-storage-cloudinary

cd ../frontend
npm install cloudinary next-cloudinary
```

3. **Configure backend** (`.env`):
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Create Cloudinary utility**:
```typescript
// apps/backend/src/utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'travel-with-sulemana',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1920, quality: 'auto' }],
  } as any,
});

export const upload = multer({ storage });
export default cloudinary;
```

5. **Use in frontend**:
```tsx
import { CldImage } from 'next-cloudinary';

<CldImage 
  src="carousel/image123"
  width={1920}
  height={1080}
  alt="Ghana destination"
/>
```

**Pros:**
- ✅ No server storage needed
- ✅ Fast CDN delivery worldwide
- ✅ Automatic optimization
- ✅ Image transformations

---

#### Option 3: AWS S3 + CloudFront

**Best for**: Large scale applications

**Setup:**
```bash
npm install @aws-sdk/client-s3 multer-s3
```

**Pros:**
- ✅ Extremely scalable
- ✅ Pay only for what you use
- ✅ Full control

**Cons:**
- ❌ More complex setup
- ❌ Requires AWS account & configuration

---

## 💻 Quick Local Setup (For Now)

Since you're in development, let's keep it simple with local storage:

### Step 1: Install Dependencies
```bash
cd apps/backend
npm install multer
npm install --save-dev @types/multer
```

### Step 2: Create Upload Directories
```bash
mkdir -p apps/backend/uploads/{carousel,blogs,destinations,experiences,packages}
```

### Step 3: Add to .gitignore
```bash
echo "apps/backend/uploads/*" >> .gitignore
```

### Step 4: Keep Static Assets Where They Are
Your `/apps/frontend/public/assets/` is perfect for:
- Logos
- Default/fallback images
- Icons
- Fonts

---

## 📝 Usage Guidelines

### When to use `/frontend/public/assets/`:
- ✅ Logo, favicon
- ✅ Default hero images
- ✅ UI icons
- ✅ Fonts
- ✅ Any image committed to git

### When to use `/backend/uploads/` (or cloud):
- ✅ Carousel images uploaded by admin
- ✅ Blog post images
- ✅ Destination photos uploaded by users
- ✅ User profile pictures
- ✅ Any dynamic/user-generated content

---

## 🔄 Migration Path

### Phase 1: Development (NOW)
- Static assets in `/frontend/public/`
- User uploads in `/backend/uploads/`

### Phase 2: Pre-Production
- Move uploads to Cloudinary free tier
- Keep static assets in public folder

### Phase 3: Production
- All user content on Cloudinary/S3
- Static assets on CDN (Vercel handles this)

---

## 🎯 My Recommendation for You

**Right now**: 
1. ✅ Keep static images in `/frontend/public/assets/`
2. ✅ Use local `/backend/uploads/` for carousel/admin uploads
3. ✅ I've already added the upload utility and routes

**Before Production**:
1. Sign up for Cloudinary (free)
2. Migrate to cloud storage
3. Update image URLs in database

**Why this approach?**
- Start simple, iterate fast
- Don't over-engineer early
- Easy to migrate later
- Cloud storage when you actually need it

---

## 🚦 Current Status

✅ Backend uploads utility created  
✅ Upload endpoint configured  
✅ Static serving enabled  
⏳ Need to run: `npm install multer @types/multer` in backend  
⏳ Optional: Setup Cloudinary for production  

**Next step**: 
```bash
cd apps/backend && npm install multer @types/multer
```

Then your carousel admin can upload images directly! 🎉
