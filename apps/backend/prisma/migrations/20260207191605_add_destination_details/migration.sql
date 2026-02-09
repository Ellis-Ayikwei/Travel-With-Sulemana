/*
  Warnings:

  - You are about to drop the column `bestTimeToVisit` on the `Destination` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Destination" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "image" TEXT NOT NULL,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "duration" TEXT,
    "bestTime" TEXT NOT NULL DEFAULT 'Year-round',
    "thingsToDo" TEXT NOT NULL DEFAULT '[]',
    "howToGetThere" TEXT,
    "whereToStay" TEXT NOT NULL DEFAULT '[]',
    "localTips" TEXT NOT NULL DEFAULT '[]',
    "estimatedCost" TEXT,
    "rating" REAL NOT NULL DEFAULT 4.8,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "experienceIds" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Destination" ("createdAt", "description", "highlights", "id", "image", "name", "rating", "region", "updatedAt") SELECT "createdAt", "description", "highlights", "id", "image", "name", "rating", "region", "updatedAt" FROM "Destination";
DROP TABLE "Destination";
ALTER TABLE "new_Destination" RENAME TO "Destination";
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");
CREATE UNIQUE INDEX "Destination_name_key" ON "Destination"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
