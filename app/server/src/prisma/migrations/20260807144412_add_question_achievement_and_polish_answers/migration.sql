-- AlterTable
ALTER TABLE `answer` ADD COLUMN `valuePl` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `QuestionAchievement` (
    `id` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `achievementTitle` VARCHAR(191) NOT NULL,
    `achievementDesc` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `QuestionAchievement_questionId_key`(`questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuestionAchievement` ADD CONSTRAINT `QuestionAchievement_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
