import { Request, Response } from 'express';
import prisma from '../db';

// Get all bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const { status, userId } = req.query;
    const where: any = {};

    if (status) where.status = String(status).toUpperCase();
    if (userId) where.userId = String(userId);

    const bookings = await prisma.booking.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } }, package: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Get single booking
export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { id: true, name: true, email: true } }, package: true },
    });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Create booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, packageId, numberOfTravelers, startDate, endDate, totalPrice, specialRequests } = req.body;

    if (!userId || !packageId || !numberOfTravelers || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        packageId,
        numberOfTravelers,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        specialRequests,
        status: 'PENDING',
      },
      include: { user: { select: { id: true, name: true, email: true } }, package: true },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Update booking
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { status, numberOfTravelers, totalPrice, specialRequests } = req.body;
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: {
        status: status ? String(status).toUpperCase() : undefined,
        numberOfTravelers,
        totalPrice,
        specialRequests,
      },
      include: { user: { select: { id: true, name: true, email: true } }, package: true },
    });

    res.json(booking);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

// Delete booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    await prisma.booking.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};
