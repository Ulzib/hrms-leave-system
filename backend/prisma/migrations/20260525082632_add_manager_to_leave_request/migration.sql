/*
  Warnings:

  - Added the required column `managerId` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaveRequest" ADD COLUMN     "managerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
