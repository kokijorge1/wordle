/*
  Warnings:

  - A unique constraint covering the columns `[jugadorId,palabra]` on the table `JugadoresIntentos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JugadoresIntentos_jugadorId_palabra_key" ON "JugadoresIntentos"("jugadorId", "palabra");
