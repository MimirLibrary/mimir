-- CreateEnum
CREATE TYPE "IdentifierType" AS ENUM ('ISBN-10', 'ISBN-13');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'FOUND', 'MISS');

-- CreateTable
CREATE TABLE "Identifier" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "idType" "IdentifierType" NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 1,
    "meta" JSONB NOT NULL,
    "materialId" INTEGER NOT NULL,

    CONSTRAINT "Identifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "yearPublishedAt" SMALLINT NOT NULL,
    "monthPublishedAt" SMALLINT NOT NULL,
    "cover" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "publisherId" INTEGER,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finisherAt" TIMESTAMP(3) NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "meta" JSONB NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToMaterial" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Identifier_value_key" ON "Identifier"("value");

-- CreateIndex
CREATE INDEX "Author_referenceId_idx" ON "Author"("referenceId");

-- CreateIndex
CREATE INDEX "Author_name_idx" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_referenceId_key" ON "Author"("name", "referenceId");

-- CreateIndex
CREATE INDEX "Publisher_name_idx" ON "Publisher"("name");

-- CreateIndex
CREATE INDEX "Publisher_referenceId_idx" ON "Publisher"("referenceId");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_referenceId_key" ON "Publisher"("name", "referenceId");

-- CreateIndex
CREATE INDEX "Material_title_idx" ON "Material"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToMaterial_AB_unique" ON "_AuthorToMaterial"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToMaterial_B_index" ON "_AuthorToMaterial"("B");

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToMaterial" ADD CONSTRAINT "_AuthorToMaterial_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToMaterial" ADD CONSTRAINT "_AuthorToMaterial_B_fkey" FOREIGN KEY ("B") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
