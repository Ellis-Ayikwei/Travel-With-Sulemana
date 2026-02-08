import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getFileUrl } from "../utils/upload";

const prisma = new PrismaClient();

// Get all carousel images
export const getCarouselImages = async (req: Request, res: Response) => {
  try {
    console.log("Fetching active carousel images...");
    const images = await prisma.carouselImage.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    console.log(`Found ${images.length} active carousel images`);
    res.json(images);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    res.status(500).json({ error: "Failed to fetch carousel images" });
  }
};

// Get all carousel images (admin - including inactive)
export const getAllCarouselImages = async (req: Request, res: Response) => {
  try {
    const images = await prisma.carouselImage.findMany({
      orderBy: { order: "asc" },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch carousel images" });
  }
};

// Create carousel image
export const createCarouselImage = async (req: Request, res: Response) => {
  try {
    const { imageUrl, alt, order } = req.body;
    const file = req.file;

    // Use uploaded file or provided URL
    let finalImageUrl = imageUrl;
    if (file) {
      // Generate full URL for uploaded file
      finalImageUrl = getFileUrl(req, file.path);
    }

    if (!finalImageUrl || !alt) {
      res.status(400).json({ error: "Image URL/file and alt text are required" });
      return;
    }

    // If no order provided, set it to the next order
    let finalOrder = order;
    if (finalOrder === undefined) {
      const lastImage = await prisma.carouselImage.findFirst({
        orderBy: { order: "desc" },
      });
      finalOrder = (lastImage?.order || 0) + 1;
    }

    const image = await prisma.carouselImage.create({
      data: {
        imageUrl: finalImageUrl,
        alt,
        order: finalOrder,
        active: true,
      },
    });

    res.status(201).json(image);
  } catch (error) {
    console.error("Error creating carousel image:", error);
    res.status(500).json({ error: "Failed to create carousel image" });
  }
};

// Update carousel image
export const updateCarouselImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { imageUrl, alt, order, active } = req.body;

    const image = await prisma.carouselImage.update({
      where: { id },
      data: {
        ...(imageUrl && { imageUrl }),
        ...(alt && { alt }),
        ...(order !== undefined && { order }),
        ...(active !== undefined && { active }),
      },
    });

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to update carousel image" });
  }
};

// Delete carousel image
export const deleteCarouselImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete the image
    await prisma.carouselImage.delete({
      where: { id },
    });

    // Reorder remaining images
    const remainingImages = await prisma.carouselImage.findMany({
      orderBy: { order: "asc" },
    });

    for (let i = 0; i < remainingImages.length; i++) {
      await prisma.carouselImage.update({
        where: { id: remainingImages[i].id },
        data: { order: i },
      });
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete carousel image" });
  }
};

// Reorder carousel images
export const reorderCarouselImages = async (req: Request, res: Response) => {
  try {
    const { images } = req.body;

    if (!Array.isArray(images)) {
      res.status(400).json({ error: "Images must be an array" });
      return;
    }

    const updatedImages = await Promise.all(
      images.map((img: any, index: number) =>
        prisma.carouselImage.update({
          where: { id: img.id },
          data: { order: index },
        })
      )
    );

    res.json(updatedImages);
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder carousel images" });
  }
};
