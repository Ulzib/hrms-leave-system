/*
  Warnings:

  - You are about to drop the column `type` on the `LeaveRequest` table. All the data in the column will be lost.
  - Added the required column `requestTypeId` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Period" AS ENUM ('YEARLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "LeaveRequest" DROP COLUMN "type",
ADD COLUMN     "requestTypeId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "LeaveType";

-- CreateTable
CREATE TABLE "RequestType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "period" "Period" NOT NULL DEFAULT 'YEARLY',

    CONSTRAINT "RequestType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_requestTypeId_fkey" FOREIGN KEY ("requestTypeId") REFERENCES "RequestType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
