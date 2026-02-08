import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import bookingRoutes from './routes/bookings';
import packageRoutes from './routes/packages';
import destinationRoutes from './routes/destinations';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blogs';
import experienceRoutes from './routes/experiences';
import carouselRoutes from './routes/carouselRoutes';

dotenv.config();

const app: Express = express();
const PORT = parseInt(process.env.PORT || '5000', 10);
const prisma = new PrismaClient();

// Serve static uploaded files
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3005',
    'http://localhost:3006',
    'http://localhost:3007',
    'http://localhost:3008',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3005',
    'http://127.0.0.1:3006',
    'http://127.0.0.1:3007',
    'http://127.0.0.1:3008',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Handle CORS preflight requests
app.options('*', cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3005',
    'http://localhost:3006',
    'http://localhost:3007',
    'http://localhost:3008',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3005',
    'http://127.0.0.1:3006',
    'http://127.0.0.1:3007',
    'http://127.0.0.1:3008',
  ],
}));

// Database connection check
prisma.$connect()
  .then(() => {
    console.log('Connected to SQLite database');
  })
  .catch((err: unknown) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/carousel', carouselRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
