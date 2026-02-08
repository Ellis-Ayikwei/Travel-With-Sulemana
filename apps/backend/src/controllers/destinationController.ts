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

// Get all destinations
export const getDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(
      destinations.map((destination) => ({
        ...destination,
        highlights: parseJsonArray(destination.highlights),
        gallery: parseJsonArray(destination.gallery),
        thingsToDo: parseJsonArray(destination.thingsToDo),
        whereToStay: parseJsonArray(destination.whereToStay),
        localTips: parseJsonArray(destination.localTips),
        experienceIds: parseJsonArray(destination.experienceIds),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Get single destination
export const getDestination = async (req: Request, res: Response) => {
  try {
    const destination = await prisma.destination.findUnique({
      where: { id: req.params.id },
    });
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json({
      ...destination,
      highlights: parseJsonArray(destination.highlights),
      gallery: parseJsonArray(destination.gallery),
      thingsToDo: parseJsonArray(destination.thingsToDo),
      whereToStay: parseJsonArray(destination.whereToStay),
      localTips: parseJsonArray(destination.localTips),
      experienceIds: parseJsonArray(destination.experienceIds),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Create destination (admin only)
export const createDestination = async (req: Request, res: Response) => {
  try {
    const {
      slug,
      name,
      region,
      tagline,
      description,
      longDescription,
      image,
      gallery,
      highlights,
      duration,
      bestTime,
      thingsToDo,
      howToGetThere,
      whereToStay,
      localTips,
      estimatedCost,
      rating,
      reviews,
      experienceIds,
    } = req.body;

    if (!slug || !name || !region || !description || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const destination = await prisma.destination.create({
      data: {
        slug,
        name,
        region,
        tagline,
        description,
        longDescription,
        image,
        gallery: stringifyArray(gallery),
        highlights: stringifyArray(highlights),
        duration,
        bestTime: bestTime || 'Year-round',
        thingsToDo: stringifyArray(thingsToDo),
        howToGetThere,
        whereToStay: stringifyArray(whereToStay),
        localTips: stringifyArray(localTips),
        estimatedCost,
        rating: rating || 4.8,
        reviews: reviews || 0,
        experienceIds: stringifyArray(experienceIds),
      },
    });

    res.status(201).json({
      ...destination,
      highlights: parseJsonArray(destination.highlights),
      gallery: parseJsonArray(destination.gallery),
      thingsToDo: parseJsonArray(destination.thingsToDo),
      whereToStay: parseJsonArray(destination.whereToStay),
      localTips: parseJsonArray(destination.localTips),
      experienceIds: parseJsonArray(destination.experienceIds),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Update destination (admin only)
export const updateDestination = async (req: Request, res: Response) => {
  try {
    const {
      slug,
      name,
      region,
      tagline,
      description,
      longDescription,
      image,
      gallery,
      highlights,
      duration,
      bestTime,
      thingsToDo,
      howToGetThere,
      whereToStay,
      localTips,
      estimatedCost,
      rating,
      reviews,
      experienceIds,
    } = req.body;

    const destination = await prisma.destination.update({
      where: { id: req.params.id },
      data: {
        slug,
        name,
        region,
        tagline,
        description,
        longDescription,
        image,
        gallery: gallery !== undefined ? stringifyArray(gallery) : undefined,
        highlights: highlights !== undefined ? stringifyArray(highlights) : undefined,
        duration,
        bestTime,
        thingsToDo: thingsToDo !== undefined ? stringifyArray(thingsToDo) : undefined,
        howToGetThere,
        whereToStay: whereToStay !== undefined ? stringifyArray(whereToStay) : undefined,
        localTips: localTips !== undefined ? stringifyArray(localTips) : undefined,
        estimatedCost,
        rating,
        reviews,
        experienceIds: experienceIds !== undefined ? stringifyArray(experienceIds) : undefined,
      },
    });

    res.json({
      ...destination,
      highlights: parseJsonArray(destination.highlights),
      gallery: parseJsonArray(destination.gallery),
      thingsToDo: parseJsonArray(destination.thingsToDo),
      whereToStay: parseJsonArray(destination.whereToStay),
      localTips: parseJsonArray(destination.localTips),
      experienceIds: parseJsonArray(destination.experienceIds),
    });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

// Delete destination (admin only)
export const deleteDestination = async (req: Request, res: Response) => {
  try {
    await prisma.destination.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Destination deleted' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};
