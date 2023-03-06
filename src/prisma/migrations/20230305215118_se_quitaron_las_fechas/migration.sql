/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Jugadores` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Jugadores` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `JugadoresIntentos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `JugadoresIntentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jugadores" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "JugadoresIntentos" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
