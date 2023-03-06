-- CreateTable
CREATE TABLE "Jugadores" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jugadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JugadoresIntentos" (
    "id" SERIAL NOT NULL,
    "jugadorId" TEXT NOT NULL,
    "palabra" TEXT NOT NULL,
    "fueAdivinada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JugadoresIntentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JugadoresIntentos" ADD CONSTRAINT "JugadoresIntentos_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
