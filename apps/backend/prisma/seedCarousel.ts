import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedCarousel() {
  try {
    // Check if carousel images already exist
    const existingImages = await prisma.carouselImage.findMany();
    
    if (existingImages.length > 0) {
      console.log("Carousel images already exist. Skipping seed.");
      return;
    }

    const carouselImages = [
      {
        imageUrl: "/assets/images/heroImage1.jpg",
        alt: "Mosque with minarets at twilight",
        order: 0,
        active: true,
      },
      {
        imageUrl: "/assets/images/salaga.jpg",
        alt: "Historic Salaga in Northern Ghana",
        order: 1,
        active: true,
      },
      {
        imageUrl: "/assets/images/capecoast.webp",
        alt: "Cape Coast Castle",
        order: 2,
        active: true,
      },
      {
        imageUrl: "/assets/images/independece_square.jpg",
        alt: "Independence Square in Accra",
        order: 3,
        active: true,
      },
    ];

    const result = await prisma.carouselImage.createMany({
      data: carouselImages,
    });

    console.log(`✅ Seeded ${result.count} carousel images`);
  } catch (error) {
    console.error("Error seeding carousel images:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCarousel();
