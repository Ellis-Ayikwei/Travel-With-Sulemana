import { Request, Response } from 'express';
import prisma from '../db';

const parseJsonArray = (value: string | null | undefined) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const stringifyArray = (value: any) => {
  if (!value) return JSON.stringify([]);
  return JSON.stringify(Array.isArray(value) ? value : [value]);
};

// Get all packages
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await prisma.travelPackage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(
      packages.map((pkg) => ({
        ...pkg,
        highlights: parseJsonArray(pkg.highlights),
        images: parseJsonArray(pkg.images),
        itinerary: parseJsonArray(pkg.itinerary),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Get single package
export const getPackage = async (req: Request, res: Response) => {
  try {
    const pkg = await prisma.travelPackage.findUnique({
      where: { id: req.params.id },
    });
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({
      ...pkg,
      highlights: parseJsonArray(pkg.highlights),
      images: parseJsonArray(pkg.images),
      itinerary: parseJsonArray(pkg.itinerary),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Create package (admin only)
export const createPackage = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      destination,
      duration,
      price,
      maxTravelers,
      highlights,
      images,
      itinerary,
    } = req.body;

    if (!name || !description || !destination || !duration || !price || !maxTravelers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pkg = await prisma.travelPackage.create({
      data: {
        name,
        description,
        destination,
        duration,
        price,
        maxTravelers,
        highlights: stringifyArray(highlights),
        images: stringifyArray(images),
        itinerary: stringifyArray(itinerary),
      },
    });

    res.status(201).json({
      ...pkg,
      highlights: parseJsonArray(pkg.highlights),
      images: parseJsonArray(pkg.images),
      itinerary: parseJsonArray(pkg.itinerary),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Update package (admin only)
export const updatePackage = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      destination,
      duration,
      price,
      maxTravelers,
      highlights,
      images,
      itinerary,
      rating,
      reviews,
    } = req.body;

    const pkg = await prisma.travelPackage.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        destination,
        duration,
        price,
        maxTravelers,
        highlights: highlights !== undefined ? stringifyArray(highlights) : undefined,
        images: images !== undefined ? stringifyArray(images) : undefined,
        itinerary: itinerary !== undefined ? stringifyArray(itinerary) : undefined,
        rating,
        reviews,
      },
    });

    res.json({
      ...pkg,
      highlights: parseJsonArray(pkg.highlights),
      images: parseJsonArray(pkg.images),
      itinerary: parseJsonArray(pkg.itinerary),
    });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

// Delete package (admin only)
export const deletePackage = async (req: Request, res: Response) => {
  try {
    await prisma.travelPackage.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Package deleted' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};
