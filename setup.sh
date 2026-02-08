#!/bin/bash

echo "🚀 Travel With Sulemana - Setup Guide"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📦 Installing dependencies..."
npm install

echo ""
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo "📁 Setting up environment files..."

# Backend
if [ ! -f "apps/backend/.env" ]; then
  cp apps/backend/.env.example apps/backend/.env
  echo -e "${GREEN}✓ Created apps/backend/.env${NC}"
else
  echo -e "${YELLOW}⚠ apps/backend/.env already exists${NC}"
fi

# Admin
if [ ! -f "apps/admin/.env.local" ]; then
  cp apps/admin/.env.example apps/admin/.env.local
  echo -e "${GREEN}✓ Created apps/admin/.env.local${NC}"
else
  echo -e "${YELLOW}⚠ apps/admin/.env.local already exists${NC}"
fi

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "📚 Next steps:"
echo ""
echo "1. Update environment files with your configuration:"
echo "   - apps/backend/.env"
echo "   - apps/admin/.env.local"
echo ""
echo "2. Start MongoDB (using Docker):"
echo "   docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:7"
echo ""
echo "3. Start the backend:"
echo "   cd apps/backend && npm run dev"
echo ""
echo "4. In a new terminal, start the admin:"
echo "   cd apps/admin && npm run dev"
echo ""
echo "5. Open your browser:"
echo "   Admin Dashboard: ${GREEN}http://localhost:3000/login${NC}"
echo "   Backend API: ${GREEN}http://localhost:5000/health${NC}"
echo ""
echo "🐳 Or use Docker Compose:"
echo "   docker-compose up -d"
echo ""
