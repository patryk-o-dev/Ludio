/*
  Warnings:

  - Added the required column `category` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tag` ADD COLUMN `category` VARCHAR(191) NOT NULL;
