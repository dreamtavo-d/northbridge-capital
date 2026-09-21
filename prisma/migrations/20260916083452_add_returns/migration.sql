-- CreateTable
CREATE TABLE "Return" (
    "id" TEXT NOT NULL,
    "investmentId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Return_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Return_investmentId_key" ON "Return"("investmentId");

-- CreateIndex
CREATE INDEX "Return_investmentId_idx" ON "Return"("investmentId");

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
