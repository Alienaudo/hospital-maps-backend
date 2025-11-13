/*
  Warnings:

  - A unique constraint covering the columns `[tel]` on the table `PersonalEmergencyContacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PersonalEmergencyContacts_tel_key" ON "public"."PersonalEmergencyContacts"("tel");
