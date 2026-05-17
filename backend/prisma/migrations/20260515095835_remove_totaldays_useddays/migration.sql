/*
  Warnings:

  - You are about to drop the column `totalDays` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `usedDays` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalDays",
DROP COLUMN "usedDays";
