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

// Get all experiences
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const { published, category, region } = req.query;
    const where: any = {};

    if (published !== undefined) where.published = published === 'true';
    if (category) where.category = String(category).toUpperCase().replace(/\s+/g, '_');
    if (region) where.region = region;

    const experiences = await prisma.experience.findMany({
      where,
      orderBy: { startDate: 'asc' },
    });
    res.json(
      experiences.map((experience) => ({
        ...experience,
        highlights: parseJsonArray(experience.highlights),
        thingsToDo: parseJsonArray(experience.thingsToDo),
        itinerary: parseJsonArray(experience.itinerary),
        inclusions: parseJsonArray(experience.inclusions),
        testimonials: parseJsonArray(experience.testimonials),
        whereToStay: parseJsonArray(experience.whereToStay),
        localTips: parseJsonArray(experience.localTips),
        gallery: parseJsonArray(experience.gallery),
        destinationIds: parseJsonArray(experience.destinationIds),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Get single experience
export const getExperience = async (req: Request, res: Response) => {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: req.params.id },
    });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json({
      ...experience,
      highlights: parseJsonArray(experience.highlights),
      thingsToDo: parseJsonArray(experience.thingsToDo),
      itinerary: parseJsonArray(experience.itinerary),
      inclusions: parseJsonArray(experience.inclusions),
      testimonials: parseJsonArray(experience.testimonials),
      whereToStay: parseJsonArray(experience.whereToStay),
      localTips: parseJsonArray(experience.localTips),
      gallery: parseJsonArray(experience.gallery),
      destinationIds: parseJsonArray(experience.destinationIds),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      region,
      description,
      longDescription,
      startDate,
      duration,
      groupSize,
      price,
      availability,
      tag,
      highlights,
      thingsToDo,
      itinerary,
      inclusions,
      testimonials,
      aboutExpedition,
      howToGetThere,
      whereToStay,
      localTips,
      image,
      gallery,
      icon,
      rating,
      reviews,
      destinationIds,
      published,
    } = req.body;

    if (!name || !category || !region || !description || !startDate || !duration || !groupSize || !price || !tag || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const experience = await prisma.experience.create({
      data: {
        name,
        category: String(category).toUpperCase().replace(/\s+/g, '_'),
        region,
        description,
        longDescription,
        startDate: new Date(startDate),
        duration,
        groupSize,
        price,
        availability: availability || 0,
        tag,
        highlights: stringifyArray(highlights),
        thingsToDo: stringifyArray(thingsToDo),
        itinerary: stringifyArray(itinerary),
        inclusions: stringifyArray(inclusions),
        testimonials: stringifyArray(testimonials),
        aboutExpedition,
        howToGetThere,
        whereToStay: stringifyArray(whereToStay),
        localTips: stringifyArray(localTips),
        image,
        gallery: stringifyArray(gallery),
        icon,
        rating: rating || 4.8,
        reviews: reviews || 0,
        destinationIds: stringifyArray(destinationIds),
        published: published !== undefined ? published : true,
      },
    });

    res.status(201).json({
      ...experience,
      highlights: parseJsonArray(experience.highlights),
      thingsToDo: parseJsonArray(experience.thingsToDo),
      itinerary: parseJsonArray(experience.itinerary),
      inclusions: parseJsonArray(experience.inclusions),
      testimonials: parseJsonArray(experience.testimonials),
      whereToStay: parseJsonArray(experience.whereToStay),
      localTips: parseJsonArray(experience.localTips),
      gallery: parseJsonArray(experience.gallery),
      destinationIds: parseJsonArray(experience.destinationIds),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Update experience (admin only)
export const updateExperience = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      region,
      description,
      longDescription,
      startDate,
      duration,
      groupSize,
      price,
      availability,
      tag,
      highlights,
      thingsToDo,
      itinerary,
      inclusions,
      testimonials,
      aboutExpedition,
      howToGetThere,
      whereToStay,
      localTips,
      image,
      gallery,
      icon,
      rating,
      reviews,
      destinationIds,
      published,
    } = req.body;

    const experience = await prisma.experience.update({
      where: { id: req.params.id },
      data: {
        name,
        category: category ? String(category).toUpperCase().replace(/\s+/g, '_') : undefined,
        region,
        description,
        longDescription,
        startDate: startDate ? new Date(startDate) : undefined,
        duration,
        groupSize,
        price,
        availability,
        tag,
        highlights: highlights !== undefined ? stringifyArray(highlights) : undefined,
        thingsToDo: thingsToDo !== undefined ? stringifyArray(thingsToDo) : undefined,
        itinerary: itinerary !== undefined ? stringifyArray(itinerary) : undefined,
        inclusions: inclusions !== undefined ? stringifyArray(inclusions) : undefined,
        testimonials: testimonials !== undefined ? stringifyArray(testimonials) : undefined,
        aboutExpedition,
        howToGetThere,
        whereToStay: whereToStay !== undefined ? stringifyArray(whereToStay) : undefined,
        localTips: localTips !== undefined ? stringifyArray(localTips) : undefined,
        image,
        gallery: gallery !== undefined ? stringifyArray(gallery) : undefined,
        icon,
        rating,
        reviews,
        destinationIds: destinationIds !== undefined ? stringifyArray(destinationIds) : undefined,
        published,
      },
    });

    res.json({
      ...experience,
      highlights: parseJsonArray(experience.highlights),
      thingsToDo: parseJsonArray(experience.thingsToDo),
      itinerary: parseJsonArray(experience.itinerary),
      inclusions: parseJsonArray(experience.inclusions),
      testimonials: parseJsonArray(experience.testimonials),
      whereToStay: parseJsonArray(experience.whereToStay),
      localTips: parseJsonArray(experience.localTips),
      gallery: parseJsonArray(experience.gallery),
      destinationIds: parseJsonArray(experience.destinationIds),
    });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

// Delete experience (admin only)
export const deleteExperience = async (req: Request, res: Response) => {
  try {
    await prisma.experience.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};
