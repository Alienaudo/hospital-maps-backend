-- CreateEnum
CREATE TYPE "public"."CapacityStatus" AS ENUM ('EMPTY', 'MEDIUM', 'FULL');

-- CreateEnum
CREATE TYPE "public"."BloodType" AS ENUM ('A_NEGATIVE', 'A_POSITIVE', 'B_NEGATIVE', 'B_POSITIVE', 'AB_NEGATIVE', 'AB_POSITIVE', 'O_NEGATIVE', 'O_POSITIVE');

-- CreateEnum
CREATE TYPE "public"."SizeCategory" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "public"."ComplexityCategory" AS ENUM ('PRIMARY', 'SECONDARY', 'TERTIARY');

-- CreateEnum
CREATE TYPE "public"."ServiceCategory" AS ENUM ('GENERAL_HOSPITAL', 'TEACHING_HOSPITAL', 'COMMUNITY_HOSPITAL', 'PEDIATRIC_HOSPITAL', 'CARDIOLOGY_HOSPITAL', 'ONCOLOGY_HOSPITAL', 'MATERNITY_HOSPITAL', 'ORTHOPEDIC_HOSPITAL', 'PSYCHIATRIC_HOSPITAL', 'REHABILITATION_HOSPITAL', 'TRAUMA_CENTER', 'NEUROLOGY_HOSPITAL', 'INFECTIOUS_DISEASE_HOSPITAL');

-- CreateEnum
CREATE TYPE "public"."HospitalOwnership" AS ENUM ('PUBLIC', 'PRIVATE', 'NON_PROFIT', 'MIXED');

-- CreateTable
CREATE TABLE "public"."Hospitals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capacity_status" "public"."CapacityStatus" NOT NULL,
    "size_category" "public"."SizeCategory" NOT NULL,
    "complexity_category" "public"."ComplexityCategory" NOT NULL,
    "service_category" "public"."ServiceCategory" NOT NULL,
    "hospital_ownership" "public"."HospitalOwnership" NOT NULL,

    CONSTRAINT "Hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blood_type" "public"."BloodType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Disease" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_chronic" BOOLEAN NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Allergies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medicament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_chronic" BOOLEAN NOT NULL,

    CONSTRAINT "Medicament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PersonalEmergencyContacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalEmergencyContacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_UserDesease" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserDesease_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_UserAllergies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserAllergies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_UserMedicament" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserMedicament_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Hospitals_name_capacity_status_idx" ON "public"."Hospitals"("name", "capacity_status");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "public"."User"("name");

-- CreateIndex
CREATE INDEX "Disease_name_idx" ON "public"."Disease"("name");

-- CreateIndex
CREATE INDEX "Medicament_name_idx" ON "public"."Medicament"("name");

-- CreateIndex
CREATE INDEX "PersonalEmergencyContacts_name_tel_idx" ON "public"."PersonalEmergencyContacts"("name", "tel");

-- CreateIndex
CREATE INDEX "_UserDesease_B_index" ON "public"."_UserDesease"("B");

-- CreateIndex
CREATE INDEX "_UserAllergies_B_index" ON "public"."_UserAllergies"("B");

-- CreateIndex
CREATE INDEX "_UserMedicament_B_index" ON "public"."_UserMedicament"("B");

-- AddForeignKey
ALTER TABLE "public"."PersonalEmergencyContacts" ADD CONSTRAINT "PersonalEmergencyContacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserDesease" ADD CONSTRAINT "_UserDesease_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserDesease" ADD CONSTRAINT "_UserDesease_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserAllergies" ADD CONSTRAINT "_UserAllergies_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Allergies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserAllergies" ADD CONSTRAINT "_UserAllergies_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserMedicament" ADD CONSTRAINT "_UserMedicament_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Medicament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserMedicament" ADD CONSTRAINT "_UserMedicament_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
