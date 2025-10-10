/*
  Warnings:

  - You are about to drop the column `name` on the `Allergies` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Medication` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `name` on the `PersonalEmergencyContacts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Allergies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Allergies" DROP COLUMN "name",
ADD COLUMN     "description" VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Medication" ALTER COLUMN "name" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "public"."PersonalEmergencyContacts" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");
