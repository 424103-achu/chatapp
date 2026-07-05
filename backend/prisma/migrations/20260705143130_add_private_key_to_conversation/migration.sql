/*
  Warnings:

  - A unique constraint covering the columns `[privateKey]` on the table `conversations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "privateKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "conversations_privateKey_key" ON "conversations"("privateKey");
