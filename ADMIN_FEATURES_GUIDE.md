# Travel With Sulemana - Admin Features Guide

## 🎯 Complete Admin Dashboard Features

The admin dashboard provides comprehensive content and booking management for the Travel With Sulemana platform.

---

## 📊 Dashboard Overview

### Main Dashboard (`/dashboard`)
Shows key metrics:
- Total Bookings
- Total Travel Packages
- Total Destinations
- Total Users
- Revenue Statistics

---

## 🗓️ Booking Management (`/dashboard/bookings`)

Manage customer travel bookings:
- **View all bookings** with customer details, dates, and pricing
- **Filter bookings** by status (pending, confirmed, completed, cancelled)
- **Update booking status** (e.g., pending → confirmed)
- **Cancel bookings** with confirmation
- **View customer information** and special requests

**Columns:**
- Booking ID
- Number of Travelers
- Start Date / End Date
- Status (with color tags)
- Total Price
- Actions (Edit/Delete)

---

## 🎁 Package Management (`/dashboard/packages`)

Manage travel packages and tours:
- **Create new packages** with price, duration, and itinerary
- **Edit package details** (name, description, pricing)
- **Manage availability** and current bookings
- **Add package highlights** and images
- **Create day-by-day itineraries**
- **Set pricing and capacity**

**Columns:**
- Package Name
- Destination
- Duration (days)
- Price
- Max Capacity
- Current Bookings
- Rating
- Actions (Edit/Delete)

**Form Fields:**
- Name, Description, Destination
- Duration, Price, Max Travelers
- Highlights (array)
- Images (URLs)
- Itinerary (day-by-day)
- Rating and Review count

---

## 🗺️ Destination Management (`/dashboard/destinations`)

Manage travel destinations:
- **Create destinations** with descriptions and attractions
- **Add destination highlights** and images
- **Set best time to visit** recommendations
- **Rate destinations**
- **Update destination information**

**Columns:**
- Destination Name
- Region
- Description
- Rating
- Actions (Edit/Delete)

**Form Fields:**
- Name, Region, Description
- Image URL
- Highlights (array)
- Best Time to Visit
- Rating

---

## 📝 Blog Management (`/dashboard/blogs`) ⭐ NEW

Manage travel blog posts and articles:
- **Create blog posts** with rich content
- **Edit published posts**
- **Mark posts as featured** to highlight them
- **Set publication status** (published/draft)
- **Organize by category** (Travel Tips, Guide, Culture, Food, etc.)
- **Track read time** and engagement

**Columns:**
- Title
- Category (with tag)
- Author
- Read Time
- Featured Status
- Publication Status (Published/Draft)
- Actions (Edit/Delete)

**Form Fields:**
- Title, Excerpt, Content (full text)
- Category (dropdown)
- Author (defaults to "Sulemana")
- Image URL
- Read Time (minutes)
- Featured (checkbox)
- Published (checkbox)
- Tags (optional)

**Categories Available:**
- Travel Tips
- Guide
- Culture
- Adventure
- Food
- Photography
- Other

---

## ✨ Experience Management (`/dashboard/experiences`) ⭐ NEW

Manage unique travel experiences and activities:
- **Create experiences** with dates and pricing
- **Manage availability** and group sizes
- **Set pricing** and schedule
- **Add highlights** for each experience
- **Track availability** for bookings
- **Control publication status**

**Columns:**
- Experience Name
- Category
- Region
- Duration
- Price
- Available Spots
- Publication Status
- Actions (Edit/Delete)

**Form Fields:**
- Name, Category, Region
- Description, Image URL
- Start Date, Duration, Group Size
- Price, Availability
- Tag/Label, Highlights (comma-separated)
- Published (checkbox)

**Categories Available:**
- Adventure
- Culture
- History
- Leisure
- Creative
- Food
- Photography

---

## 👥 User Management (`/dashboard/users`)

Manage customer accounts:
- **View all registered users**
- **Update user profiles** and information
- **Delete user accounts** if needed
- **View user details** (name, email, phone, profile image)

**Columns:**
- Name
- Email
- Phone
- Join Date
- Actions (Edit/Delete)

---

## ⚙️ Settings (`/dashboard/settings`)

Admin settings and configuration (coming soon).

---

## 🔐 Access & Permissions

### Public Access (No Login)
- View published blogs
- Browse experiences
- Browse destinations
- View packages

### Admin Only (Login Required)
- Create/Edit/Delete blogs
- Create/Edit/Delete experiences
- Create/Edit/Delete packages
- Create/Edit/Delete destinations
- View/Update/Delete bookings
- Manage users

### Authentication
- Uses React AuthKit for secure login
- JWT tokens for API calls
- Role-based access control (admin, super_admin, moderator)

---

## 🚀 Quick Start

### 1. Start Backend
```bash
cd apps/backend
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`

### 2. Start Admin Dashboard
```bash
cd apps/admin
npm install
npm run dev
```
Admin runs on: `http://localhost:3001`

### 3. Access Admin Dashboard
- Go to: `http://localhost:3001/login`
- Login with your admin credentials

### 4. Start Creating Content
- Navigate to **Dashboard → Blogs** to create blog posts
- Navigate to **Dashboard → Experiences** to create experiences
- Navigate to **Dashboard → Packages** to add travel packages

---

## 📱 Interface Design

### Admin Dashboard Features
- **Clean, professional UI** with Ant Design components
- **Responsive tables** for all data management
- **Modal forms** for create/edit operations
- **Confirmation dialogs** for deletions
- **Loading states** for async operations
- **Success/error messages** for user feedback
- **Color-coded status tags** (published/draft, confirmed/pending, etc.)

### Navigation
- **Sidebar menu** with all management sections
- **Breadcrumb navigation** for easy orientation
- **Quick access buttons** for common actions
- **User profile dropdown** in header

---

## 📊 Data Management

### Blog Posts
```json
{
  "title": "10 Hidden Gems in Ghana",
  "excerpt": "Beyond the bustle...",
  "content": "Full article content...",
  "category": "Travel Tips",
  "author": "Sulemana",
  "image": "https://...",
  "featured": true,
  "readTime": 5,
  "published": true
}
```

### Experiences
```json
{
  "name": "Northern Ghana Safari",
  "category": "Adventure",
  "region": "Northern Ghana",
  "description": "Explore wildlife...",
  "startDate": "2026-03-15",
  "duration": "7 Days",
  "groupSize": "8-12 Guests",
  "price": 4499,
  "availability": 4,
  "highlights": ["Mole Park", "Safari"]
}
```

---

## 🎯 Workflow Examples

### Adding a New Blog Post
1. Click **Blogs** in sidebar
2. Click **"New Blog Post"** button
3. Fill in title, excerpt, content
4. Select category and upload image
5. Set read time and other metadata
6. Toggle "Featured" if needed
7. Click **OK** to publish

### Creating a New Experience
1. Click **Experiences** in sidebar
2. Click **"New Experience"** button
3. Enter name, description, pricing
4. Set dates, duration, and group size
5. Add highlights and image
6. Set availability
7. Click **OK** to publish

### Updating a Booking
1. Click **Bookings** in sidebar
2. Find the booking in the table
3. Click **Edit** button
4. Change status (e.g., pending → confirmed)
5. Click **OK** to save

---

## 🔧 API Integration

### For Backend Developers

All admin actions trigger API calls:

```bash
# Create blog
POST /api/blogs
Authorization: Bearer {token}
Content-Type: application/json

# Update booking
PUT /api/bookings/:id
Authorization: Bearer {token}

# Delete experience
DELETE /api/experiences/:id
Authorization: Bearer {token}
```

Full API documentation: See [API_DOCUMENTATION.md](./apps/backend/API_DOCUMENTATION.md)

---

## 💡 Pro Tips

1. **Use Featured for Blog Posts**: Mark important articles as featured to highlight them on the homepage
2. **Set Availability**: Keep experience availability updated to prevent overbooking
3. **Rich Content**: Use detailed descriptions and highlights for better user engagement
4. **Images**: Use high-quality images for all content (blogs, packages, experiences)
5. **Categories**: Organize content properly for easier filtering
6. **Drafts**: Create posts as drafts first, then publish when ready

---

## ❓ FAQ

**Q: Can customers modify their own information?**
A: Currently, only admins can edit user profiles. User self-service is a future feature.

**Q: How do I upload images?**
A: Currently, use external image URLs (Unsplash, Cloudinary, etc.). Direct upload coming soon.

**Q: Can I schedule content for later?**
A: Currently no scheduling. Content publishes immediately. Scheduled publishing is a planned feature.

**Q: What happens when I delete a blog?**
A: It's permanently deleted from the database. Consider archiving instead of deleting.

**Q: Can I see analytics?**
A: Analytics dashboard is coming in a future update.

---

## 📞 Support

For issues or questions:
1. Check [CONTENT_MANAGEMENT_SETUP.md](./CONTENT_MANAGEMENT_SETUP.md) for detailed setup
2. Review [BACKEND_REFACTORING_COMPLETE.md](./apps/backend/BACKEND_REFACTORING_COMPLETE.md) for backend details
3. Check [API_DOCUMENTATION.md](./apps/backend/API_DOCUMENTATION.md) for API details

---

**Version:** 1.0.0  
**Last Updated:** February 1, 2026  
**Maintained By:** Travel With Sulemana Team
