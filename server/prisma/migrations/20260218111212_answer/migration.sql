/*
  Warnings:

  - A unique constraint covering the columns `[media]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answerId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `question` ADD COLUMN `answerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `media` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Answer` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AnswerToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AnswerToTag_AB_unique`(`A`, `B`),
    INDEX `_AnswerToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Question_media_key` ON `Question`(`media`);

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnswerToTag` ADD CONSTRAINT `_AnswerToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Answer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnswerToTag` ADD CONSTRAINT `_AnswerToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
