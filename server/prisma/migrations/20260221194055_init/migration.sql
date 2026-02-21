/*
  Warnings:

  - You are about to drop the `_answertotag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_answertotag` DROP FOREIGN KEY `_AnswerToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_answertotag` DROP FOREIGN KEY `_AnswerToTag_B_fkey`;

-- AlterTable
ALTER TABLE `answer` ADD COLUMN `typeId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_answertotag`;

-- CreateTable
CREATE TABLE `Type` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
