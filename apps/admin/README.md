# Admin Dashboard

A modern admin panel built with Next.js and Ant Design for managing travel bookings, drivers, and users.

## Features

- **Dashboard**: Overview of key metrics and statistics
- **Booking Management**: View, create, update, and delete bookings
- **Driver Management**: Manage driver profiles and status
- **User Management**: Manage user accounts
- **Authentication**: Secure admin login with JWT
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: Ant Design (antd)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 16+
- Backend API running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
API_SECRET=your_api_secret_key
```

### Running

**Development mode:**
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

**Production:**
```bash
npm run build
npm start
```

## Project Structure

```
app/
├── (dashboard)/          # Protected dashboard routes
│   ├── page.tsx          # Dashboard home
│   ├── bookings/         # Bookings management
│   ├── drivers/          # Drivers management
│   ├── users/            # Users management
│   └── layout.tsx        # Dashboard layout
├── login/                # Login page
├── layout.tsx            # Root layout
└── globals.css           # Global styles

components/
├── AdminLayout.tsx       # Main admin layout with navigation

lib/
├── api.ts               # API client utilities

types/
├── index.ts             # TypeScript types
```

## Pages

### Login (`/login`)
Admin login page with email and password authentication.

### Dashboard (`/dashboard`)
Overview page showing:
- Total bookings
- Active drivers
- Total users
- Revenue

### Bookings (`/dashboard/bookings`)
Manage all bookings:
- View all bookings with filters
- Create new booking
- Edit booking status
- Delete bookings

### Drivers (`/dashboard/drivers`)
Manage all drivers:
- View all drivers
- Add new driver
- Edit driver details
- Remove driver

### Users (`/dashboard/users`)
Manage all users:
- View all users
- Add new user
- Edit user profile
- Delete user account

## API Integration

The admin dashboard communicates with the backend API at `/api/bookings`, `/api/drivers`, `/api/users`, and `/api/auth`.

All authenticated requests include the JWT token in the Authorization header.

## Authentication Flow

1. Admin enters credentials on `/login`
2. Credentials sent to `/api/auth/admin-login`
3. JWT token received and stored in localStorage
4. Token automatically included in all subsequent requests
5. Protected routes check for valid token

## Development

Run TypeScript type checking:
```bash
npm run type-check
```

## Styling

The project uses:
- **Ant Design**: For UI components
- **Tailwind CSS**: For custom styling
- **CSS Modules**: For component-scoped styles

## License

MIT
