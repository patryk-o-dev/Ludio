-- AlterTable
ALTER TABLE `gamesessionplayer` ADD COLUMN `rank` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('Invited', 'Accepted', 'Declined', 'Answering', 'Completed', 'Left') NOT NULL DEFAULT 'Invited';

-- CreateTable
CREATE TABLE `_GameSessionToQuestion` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GameSessionToQuestion_AB_unique`(`A`, `B`),
    INDEX `_GameSessionToQuestion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GameSessionToQuestion` ADD CONSTRAINT `_GameSessionToQuestion_A_fkey` FOREIGN KEY (`A`) REFERENCES `GameSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameSessionToQuestion` ADD CONSTRAINT `_GameSessionToQuestion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
