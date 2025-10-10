/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the `Medicament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserDesease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserMedicament` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `update_at` to the `Allergies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Disease` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `PersonalEmergencyContacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_UserDesease" DROP CONSTRAINT "_UserDesease_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserDesease" DROP CONSTRAINT "_UserDesease_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserMedicament" DROP CONSTRAINT "_UserMedicament_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserMedicament" DROP CONSTRAINT "_UserMedicament_B_fkey";

-- AlterTable
ALTER TABLE "public"."Allergies" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Disease" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."PersonalEmergencyContacts" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "public"."Medicament";

-- DropTable
DROP TABLE "public"."_UserDesease";

-- DropTable
DROP TABLE "public"."_UserMedicament";

-- CreateTable
CREATE TABLE "public"."Medication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_chronic" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_UserDisease" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserDisease_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_UserMedication" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserMedication_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Medication_name_idx" ON "public"."Medication"("name");

-- CreateIndex
CREATE INDEX "_UserDisease_B_index" ON "public"."_UserDisease"("B");

-- CreateIndex
CREATE INDEX "_UserMedication_B_index" ON "public"."_UserMedication"("B");

-- AddForeignKey
ALTER TABLE "public"."_UserDisease" ADD CONSTRAINT "_UserDisease_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserDisease" ADD CONSTRAINT "_UserDisease_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserMedication" ADD CONSTRAINT "_UserMedication_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserMedication" ADD CONSTRAINT "_UserMedication_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
