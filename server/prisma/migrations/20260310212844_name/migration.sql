/*
  Warnings:

  - Added the required column `answerTypeId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `question` ADD COLUMN `answerTypeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_answerTypeId_fkey` FOREIGN KEY (`answerTypeId`) REFERENCES `AnswerType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
