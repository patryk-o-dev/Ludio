/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `ChipBy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `ChipFilter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `ChipGuess` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `ChipBy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `ChipFilter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `ChipGuess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `answer` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `chipby` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `chipfilter` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `chipguess` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Answer_key_key` ON `Answer`(`key`);

-- CreateIndex
CREATE UNIQUE INDEX `ChipBy_key_key` ON `ChipBy`(`key`);

-- CreateIndex
CREATE UNIQUE INDEX `ChipFilter_key_key` ON `ChipFilter`(`key`);

-- CreateIndex
CREATE UNIQUE INDEX `ChipGuess_key_key` ON `ChipGuess`(`key`);

-- CreateIndex
CREATE UNIQUE INDEX `Question_key_key` ON `Question`(`key`);
