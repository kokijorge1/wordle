/*
  Warnings:

  - Added the required column `updatedAt` to the `Jugadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JugadoresIntentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jugadores" ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE NOT NULL;

-- AlterTable
ALTER TABLE "JugadoresIntentos" ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE NOT NULL;
