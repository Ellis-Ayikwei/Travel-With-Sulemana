-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "startDate" DATETIME NOT NULL,
    "duration" TEXT NOT NULL,
    "groupSize" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "availability" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "thingsToDo" TEXT NOT NULL DEFAULT '[]',
    "itinerary" TEXT NOT NULL DEFAULT '[]',
    "inclusions" TEXT NOT NULL DEFAULT '[]',
    "testimonials" TEXT NOT NULL DEFAULT '[]',
    "aboutExpedition" TEXT,
    "howToGetThere" TEXT,
    "whereToStay" TEXT NOT NULL DEFAULT '[]',
    "localTips" TEXT NOT NULL DEFAULT '[]',
    "image" TEXT NOT NULL,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "icon" TEXT,
    "rating" REAL NOT NULL DEFAULT 4.8,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "destinationIds" TEXT NOT NULL DEFAULT '[]',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Experience" ("availability", "category", "createdAt", "description", "destinationIds", "duration", "gallery", "groupSize", "highlights", "howToGetThere", "icon", "id", "image", "localTips", "longDescription", "name", "price", "published", "rating", "region", "reviews", "startDate", "tag", "thingsToDo", "updatedAt", "whereToStay") SELECT "availability", "category", "createdAt", "description", "destinationIds", "duration", "gallery", "groupSize", "highlights", "howToGetThere", "icon", "id", "image", "localTips", "longDescription", "name", "price", "published", "rating", "region", "reviews", "startDate", "tag", "thingsToDo", "updatedAt", "whereToStay" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
