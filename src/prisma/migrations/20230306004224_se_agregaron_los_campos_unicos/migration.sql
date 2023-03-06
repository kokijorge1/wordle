/*
  Warnings:

  - The primary key for the `JugadoresIntentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[jugadorId,palabra]` on the table `JugadoresIntentos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JugadoresIntentos" DROP CONSTRAINT "JugadoresIntentos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JugadoresIntentos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JugadoresIntentos_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "JugadoresIntentos_jugadorId_palabra_key" ON "JugadoresIntentos"("jugadorId", "palabra");
