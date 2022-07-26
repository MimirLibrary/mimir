/*
  Warnings:

  - You are about to drop the column `finisherAt` on the `Job` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId]` on the table `Identifier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `finishedAt` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Identifier" DROP CONSTRAINT "Identifier_materialId_fkey";

-- AlterTable
ALTER TABLE "Identifier" ADD COLUMN     "jobId" INTEGER,
ALTER COLUMN "materialId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "finisherAt",
ADD COLUMN     "finishedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Identifier_jobId_key" ON "Identifier"("jobId");

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
