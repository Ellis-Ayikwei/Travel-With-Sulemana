import { Request, Response } from 'express';
import prisma from '../db';
import { hashPassword, comparePassword } from '../utils/auth';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, profileImage: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Get single user
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, name: true, email: true, phone: true, profileImage: true, createdAt: true, updatedAt: true },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true, phone: true, profileImage: true, createdAt: true, updatedAt: true },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, profileImage } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, phone, profileImage },
      select: { id: true, name: true, email: true, phone: true, profileImage: true, createdAt: true, updatedAt: true },
    });

    res.json(user);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};
