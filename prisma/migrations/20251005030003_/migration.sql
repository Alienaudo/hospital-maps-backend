/*
  Warnings:

  - You are about to drop the column `update_at` on the `Allergies` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Disease` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `PersonalEmergencyContacts` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firebaseId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Allergies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `PersonalEmergencyContacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PersonalEmergencyContacts" DROP CONSTRAINT "PersonalEmergencyContacts_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Allergies" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Disease" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Medication" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."PersonalEmergencyContacts" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "update_at",
ADD COLUMN     "firebaseId" VARCHAR(28),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseId_key" ON "public"."User"("firebaseId");

-- AddForeignKey
ALTER TABLE "public"."PersonalEmergencyContacts" ADD CONSTRAINT "PersonalEmergencyContacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
