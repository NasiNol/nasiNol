/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier,value]` on the table `verification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PEMBELI', 'PENJUAL', 'ADMIN');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "hashedPassword",
ADD COLUMN     "alamat" TEXT,
ADD COLUMN     "no_telepon" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PEMBELI',
ADD COLUMN     "tanggal_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "penjual" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nama_restoran" VARCHAR(150) NOT NULL,
    "jenis_usaha" VARCHAR(50) NOT NULL,
    "status_verifikasi" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "tanggal_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "penjual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_makanan" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "deskripsi" TEXT,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kategori_makanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk" (
    "id" TEXT NOT NULL,
    "penjual_id" TEXT NOT NULL,
    "kategori_id" TEXT NOT NULL,
    "nama_produk" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "harga_normal" DECIMAL(10,2) NOT NULL,
    "harga_diskon" DECIMAL(10,2) NOT NULL,
    "stok" INTEGER NOT NULL,
    "waktu_kadaluarsa" TIMESTAMP(3) NOT NULL,
    "foto_produk" VARCHAR(255),
    "status_produk" VARCHAR(20) NOT NULL DEFAULT 'tersedia',
    "tanggal_posting" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifikasi_ai" (
    "id" TEXT NOT NULL,
    "produk_id" TEXT NOT NULL,
    "hasil_verifikasi" VARCHAR(50) NOT NULL,
    "skor_keamanan" DOUBLE PRECISION NOT NULL,
    "catatan_ai" TEXT,
    "waktu_verifikasi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_kelayakan" VARCHAR(20) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verifikasi_ai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id" TEXT NOT NULL,
    "pembeli_id" TEXT NOT NULL,
    "total_harga" DECIMAL(10,2) NOT NULL,
    "waktu_transaksi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_transaksi" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "waktu_pengambilan" TIMESTAMP(3),
    "metode_pengambilan" VARCHAR(30) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_transaksi" (
    "id" TEXT NOT NULL,
    "transaksi_id" TEXT NOT NULL,
    "produk_id" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga_satuan" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detail_transaksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" TEXT NOT NULL,
    "transaksi_id" TEXT NOT NULL,
    "metode_pembayaran" VARCHAR(30) NOT NULL,
    "jumlah_bayar" DECIMAL(10,2) NOT NULL,
    "waktu_pembayaran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_pembayaran" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "bukti_pembayaran" VARCHAR(255),
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ulasan" (
    "id" TEXT NOT NULL,
    "transaksi_id" TEXT NOT NULL,
    "pembeli_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "komentar" TEXT,
    "tanggal_ulasan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ulasan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "penjual_user_id_key" ON "penjual"("user_id");

-- CreateIndex
CREATE INDEX "penjual_user_id_idx" ON "penjual"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_makanan_nama_key" ON "kategori_makanan"("nama");

-- CreateIndex
CREATE INDEX "produk_penjual_id_idx" ON "produk"("penjual_id");

-- CreateIndex
CREATE INDEX "produk_kategori_id_idx" ON "produk"("kategori_id");

-- CreateIndex
CREATE INDEX "produk_status_produk_idx" ON "produk"("status_produk");

-- CreateIndex
CREATE UNIQUE INDEX "verifikasi_ai_produk_id_key" ON "verifikasi_ai"("produk_id");

-- CreateIndex
CREATE INDEX "verifikasi_ai_produk_id_idx" ON "verifikasi_ai"("produk_id");

-- CreateIndex
CREATE INDEX "transaksi_pembeli_id_idx" ON "transaksi"("pembeli_id");

-- CreateIndex
CREATE INDEX "transaksi_status_transaksi_idx" ON "transaksi"("status_transaksi");

-- CreateIndex
CREATE INDEX "detail_transaksi_transaksi_id_idx" ON "detail_transaksi"("transaksi_id");

-- CreateIndex
CREATE INDEX "detail_transaksi_produk_id_idx" ON "detail_transaksi"("produk_id");

-- CreateIndex
CREATE UNIQUE INDEX "pembayaran_transaksi_id_key" ON "pembayaran"("transaksi_id");

-- CreateIndex
CREATE INDEX "pembayaran_transaksi_id_idx" ON "pembayaran"("transaksi_id");

-- CreateIndex
CREATE INDEX "ulasan_transaksi_id_idx" ON "ulasan"("transaksi_id");

-- CreateIndex
CREATE INDEX "ulasan_pembeli_id_idx" ON "ulasan"("pembeli_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_identifier_value_key" ON "verification"("identifier", "value");

-- AddForeignKey
ALTER TABLE "penjual" ADD CONSTRAINT "penjual_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk" ADD CONSTRAINT "produk_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori_makanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk" ADD CONSTRAINT "produk_penjual_id_fkey" FOREIGN KEY ("penjual_id") REFERENCES "penjual"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifikasi_ai" ADD CONSTRAINT "verifikasi_ai_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_pembeli_id_fkey" FOREIGN KEY ("pembeli_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_transaksi" ADD CONSTRAINT "detail_transaksi_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_transaksi" ADD CONSTRAINT "detail_transaksi_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "transaksi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "transaksi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ulasan" ADD CONSTRAINT "ulasan_pembeli_id_fkey" FOREIGN KEY ("pembeli_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ulasan" ADD CONSTRAINT "ulasan_transaksi_id_fkey" FOREIGN KEY ("transaksi_id") REFERENCES "transaksi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
