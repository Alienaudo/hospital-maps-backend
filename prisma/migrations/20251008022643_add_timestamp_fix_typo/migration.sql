/*
  Warnings:

  - You are about to drop the column `is_chronic` on the `Medication` table. All the data in the column will be lost.
  - Added the required column `is_continuous_use` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Medication" DROP COLUMN "is_chronic",
ADD COLUMN     "is_continuous_use" BOOLEAN NOT NULL;
