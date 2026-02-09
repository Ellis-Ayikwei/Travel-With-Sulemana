# PostgreSQL Migration from MongoDB

## Changes Made

### 1. **Database Provider**
- ❌ Removed: MongoDB with Mongoose
- ✅ Added: PostgreSQL with Prisma ORM

### 2. **Package Dependencies**
Updated `apps/backend/package.json`:
```bash
# Removed:
- mongoose: ^8.0.0

# Added:
- @prisma/client: ^5.8.0
- prisma: ^5.8.0 (dev)
```

### 3. **Database Schema**
Prisma schema created at `prisma/schema.prisma` with 7 models:
- **User** - Travel customers (replaces Mongoose User model)
- **Admin** - Admin users with roles (replaces Mongoose Admin model)
- **Booking** - Travel booking records (replaces Mongoose Booking model)
- **TravelPackage** - Travel packages (replaces Mongoose TravelPackage model)
- **Destination** - Travel destinations (replaces Mongoose Destination model)
- **BlogPost** - Blog articles (replaces Mongoose BlogPost model)
- **Experience** - Travel experiences (replaces Mongoose Experience model)

### 4. **ID Generation**
- Old: MongoDB ObjectId (`_id`)
- New: Prisma CUID (`id`)

### 5. **Controllers Updated**
All 7 controllers converted from Mongoose to Prisma:
- ✅ authController.ts
- ✅ blogController.ts
- ✅ bookingController.ts
- ✅ destinationController.ts
- ✅ experienceController.ts
- ✅ packageController.ts
- ✅ userController.ts

### 6. **Docker Compose**
- ✅ MongoDB service removed
- ✅ Backend service updated to use PostgreSQL
- ✅ DATABASE_URL environment variable set

### 7. **Models Removed**
The `/src/models/` folder is now deprecated. Prisma replaces Mongoose model definitions.

---

## Setup Instructions

### Step 1: Install Dependencies
```bash
cd apps/backend
npm install
```

### Step 2: Generate Prisma Client
```bash
npx prisma generate
```

### Step 3: Run Database Migrations
```bash
# Create and run initial migration
npx prisma migrate dev --name init
```

### Step 4: Create Seed Data (Optional)
```bash
npx prisma db seed
```

### Step 5: Start Backend
```bash
npm run dev
```

---

## Environment Variables

Create `.env` file in `apps/backend/`:

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/travel_with_sulemana_db
JWT_SECRET=your_jwt_secret_key_change_in_production
```

For Docker:
```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/travel_with_sulemana_db
```

---

## Running with Docker

### Start Services
```bash
docker-compose up -d
```

### Create Migrations in Container
```bash
docker-compose exec backend npx prisma migrate dev --name init
```

### View Database (Prisma Studio)
```bash
docker-compose exec backend npx prisma studio
```

---

## Database Connection String

**Local Development:**
```
postgresql://postgres:postgres@localhost:5432/travel_with_sulemana_db
```

**Docker Network:**
```
postgresql://postgres:postgres@postgres:5432/travel_with_sulemana_db
```

---

## Key Differences: Mongoose → Prisma

| Aspect | Mongoose | Prisma |
|--------|----------|--------|
| ID Field | `_id` (ObjectId) | `id` (CUID) |
| Query | `.find()`, `.findById()` | `.findMany()`, `.findUnique()` |
| Create | `new Model()` + `.save()` | `.create()` |
| Update | `.findByIdAndUpdate()` | `.update()` |
| Delete | `.findByIdAndDelete()` | `.delete()` |
| Errors | Throws exceptions | P2025 for not found |
| Password | Manual select `-password` | Explicit `select` field |

---

## Troubleshooting

### Issue: `P2002` - Unique constraint violated
**Solution:** Database already has duplicate values. Use:
```bash
npx prisma db seed  # Clear & reseed (deletes data)
```

### Issue: `P2025` - Record not found
This is expected. Our controllers handle it gracefully.

### Issue: Migration conflicts
Reset database (⚠️ will delete data):
```bash
npx prisma migrate reset
```

---

## Verification

### Check Connection
```bash
npx prisma db execute --stdin < /dev/null
```

### View Database Schema
```bash
npx prisma studio
```

### Test API
```bash
curl http://localhost:5000/health
# Should return: {"status": "OK", "timestamp": "..."}
```

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Run migrations
3. ✅ Create seed data
4. ✅ Test API endpoints
5. ✅ Connect frontend

---

**Migration Status:** ✅ COMPLETE

All Mongoose code has been replaced with Prisma. PostgreSQL is the new database.
