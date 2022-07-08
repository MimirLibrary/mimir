-- CreateEnum
CREATE TYPE "IdentifierType" AS ENUM ('ISBN-10', 'ISBN-13');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'FOUND', 'MISS');

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Identifier" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "idType" "IdentifierType" NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 1,
    "meta" JSONB NOT NULL,

    CONSTRAINT "Identifier_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "MaterialOnAuthor" (
    "materialId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "MaterialOnAuthor_pkey" PRIMARY KEY ("materialId","authorId")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Author_identifier_idx" ON "Author"("identifier");

-- CreateIndex
CREATE INDEX "Author_name_idx" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_identifier_key" ON "Author"("name", "identifier");

-- CreateIndex
CREATE INDEX "Identifier_value_idx" ON "Identifier"("value");

-- CreateIndex
CREATE INDEX "Material_title_idx" ON "Material"("title");

-- CreateIndex
CREATE INDEX "MaterialOnAuthor_materialId_idx" ON "MaterialOnAuthor"("materialId");

-- CreateIndex
CREATE INDEX "MaterialOnAuthor_authorId_idx" ON "MaterialOnAuthor"("authorId");

-- CreateIndex
CREATE INDEX "Publisher_name_idx" ON "Publisher"("name");

-- CreateIndex
CREATE INDEX "Publisher_identifier_idx" ON "Publisher"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_identifier_key" ON "Publisher"("name", "identifier");

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialOnAuthor" ADD CONSTRAINT "MaterialOnAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialOnAuthor" ADD CONSTRAINT "MaterialOnAuthor_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
