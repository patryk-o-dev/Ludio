/*
  Warnings:

  - You are about to drop the column `answerType` on the `answer` table. All the data in the column will be lost.
  - You are about to drop the column `animationsLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `charactersLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `gamingLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `hearthLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `lvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `soundsLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `twitchLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `unlocked` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `variousLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `watchingLvl` on the `chipby` table. All the data in the column will be lost.
  - You are about to drop the column `animationsLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `charactersLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `gamingLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `hearthLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `soundsLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `twitchLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `unlocked` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `variousLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `watchingLvl` on the `chipguess` table. All the data in the column will be lost.
  - You are about to drop the column `alreadyAsked` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `answerType` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `question` table. All the data in the column will be lost.
  - You are about to drop the `_chipguesschipby` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_gameglobalmodifier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_questionchipby` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_questionchipguess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `globalmodifier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `selectedchip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chipById` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_chipguesschipby` DROP FOREIGN KEY `_ChipGuessChipBy_A_fkey`;

-- DropForeignKey
ALTER TABLE `_chipguesschipby` DROP FOREIGN KEY `_ChipGuessChipBy_B_fkey`;

-- DropForeignKey
ALTER TABLE `_gameglobalmodifier` DROP FOREIGN KEY `_GameGlobalModifier_A_fkey`;

-- DropForeignKey
ALTER TABLE `_gameglobalmodifier` DROP FOREIGN KEY `_GameGlobalModifier_B_fkey`;

-- DropForeignKey
ALTER TABLE `_questionchipby` DROP FOREIGN KEY `_QuestionChipBy_A_fkey`;

-- DropForeignKey
ALTER TABLE `_questionchipby` DROP FOREIGN KEY `_QuestionChipBy_B_fkey`;

-- DropForeignKey
ALTER TABLE `_questionchipguess` DROP FOREIGN KEY `_QuestionChipGuess_A_fkey`;

-- DropForeignKey
ALTER TABLE `_questionchipguess` DROP FOREIGN KEY `_QuestionChipGuess_B_fkey`;

-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_currentQuestionId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_mediaId_fkey`;

-- DropForeignKey
ALTER TABLE `selectedchip` DROP FOREIGN KEY `SelectedChip_chipById_fkey`;

-- DropForeignKey
ALTER TABLE `selectedchip` DROP FOREIGN KEY `SelectedChip_chipGuessId_fkey`;

-- DropForeignKey
ALTER TABLE `selectedchip` DROP FOREIGN KEY `SelectedChip_gameId_fkey`;

-- DropIndex
DROP INDEX `Answer_value_key` ON `answer`;

-- DropIndex
DROP INDEX `ChipBy_name_key` ON `chipby`;

-- DropIndex
DROP INDEX `ChipGuess_name_key` ON `chipguess`;

-- DropIndex
DROP INDEX `Question_mediaId_fkey` ON `question`;

-- AlterTable
ALTER TABLE `answer` DROP COLUMN `answerType`;

-- AlterTable
ALTER TABLE `chipby` DROP COLUMN `animationsLvl`,
    DROP COLUMN `charactersLvl`,
    DROP COLUMN `gamingLvl`,
    DROP COLUMN `hearthLvl`,
    DROP COLUMN `lvl`,
    DROP COLUMN `soundsLvl`,
    DROP COLUMN `twitchLvl`,
    DROP COLUMN `unlocked`,
    DROP COLUMN `variousLvl`,
    DROP COLUMN `watchingLvl`;

-- AlterTable
ALTER TABLE `chipguess` DROP COLUMN `animationsLvl`,
    DROP COLUMN `charactersLvl`,
    DROP COLUMN `gamingLvl`,
    DROP COLUMN `hearthLvl`,
    DROP COLUMN `soundsLvl`,
    DROP COLUMN `twitchLvl`,
    DROP COLUMN `unlocked`,
    DROP COLUMN `variousLvl`,
    DROP COLUMN `watchingLvl`;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `alreadyAsked`,
    DROP COLUMN `answerType`,
    DROP COLUMN `mediaId`,
    ADD COLUMN `chipById` VARCHAR(191) NOT NULL,
    ADD COLUMN `difficulty` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_chipguesschipby`;

-- DropTable
DROP TABLE `_gameglobalmodifier`;

-- DropTable
DROP TABLE `_questionchipby`;

-- DropTable
DROP TABLE `_questionchipguess`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `game`;

-- DropTable
DROP TABLE `globalmodifier`;

-- DropTable
DROP TABLE `media`;

-- DropTable
DROP TABLE `player`;

-- DropTable
DROP TABLE `selectedchip`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameConfig` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameSession` (
    `id` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endedAt` DATETIME(3) NULL,
    `gameConfigId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GameSession_gameConfigId_key`(`gameConfigId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameSessionPlayer` (
    `gameSessionId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `timeMs` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`gameSessionId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Options` (
    `id` VARCHAR(191) NOT NULL,
    `gameConfigId` VARCHAR(191) NOT NULL,
    `difficulty` INTEGER NOT NULL DEFAULT 1,
    `questionLimit` INTEGER NOT NULL DEFAULT 10,
    `timeLimitSeconds` INTEGER NULL,

    UNIQUE INDEX `Options_gameConfigId_key`(`gameConfigId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rule` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `gameConfigId` VARCHAR(191) NOT NULL,
    `chipGuessId` VARCHAR(191) NOT NULL,
    `chipById` VARCHAR(191) NOT NULL,
    `chipFilterId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChipFilter` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChipGuessToQuestion` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChipGuessToQuestion_AB_unique`(`A`, `B`),
    INDEX `_ChipGuessToQuestion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChipByToChipGuess` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChipByToChipGuess_AB_unique`(`A`, `B`),
    INDEX `_ChipByToChipGuess_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChipByToChipFilter` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChipByToChipFilter_AB_unique`(`A`, `B`),
    INDEX `_ChipByToChipFilter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChipFilterToQuestion` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChipFilterToQuestion_AB_unique`(`A`, `B`),
    INDEX `_ChipFilterToQuestion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionToUser_AB_unique`(`A`, `B`),
    INDEX `_QuestionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AnswerToChipGuess` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AnswerToChipGuess_AB_unique`(`A`, `B`),
    INDEX `_AnswerToChipGuess_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AnswerToChipFilter` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AnswerToChipFilter_AB_unique`(`A`, `B`),
    INDEX `_AnswerToChipFilter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GameSession` ADD CONSTRAINT `GameSession_gameConfigId_fkey` FOREIGN KEY (`gameConfigId`) REFERENCES `GameConfig`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameSessionPlayer` ADD CONSTRAINT `GameSessionPlayer_gameSessionId_fkey` FOREIGN KEY (`gameSessionId`) REFERENCES `GameSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameSessionPlayer` ADD CONSTRAINT `GameSessionPlayer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Options` ADD CONSTRAINT `Options_gameConfigId_fkey` FOREIGN KEY (`gameConfigId`) REFERENCES `GameConfig`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rule` ADD CONSTRAINT `Rule_gameConfigId_fkey` FOREIGN KEY (`gameConfigId`) REFERENCES `GameConfig`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rule` ADD CONSTRAINT `Rule_chipGuessId_fkey` FOREIGN KEY (`chipGuessId`) REFERENCES `ChipGuess`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rule` ADD CONSTRAINT `Rule_chipById_fkey` FOREIGN KEY (`chipById`) REFERENCES `ChipBy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rule` ADD CONSTRAINT `Rule_chipFilterId_fkey` FOREIGN KEY (`chipFilterId`) REFERENCES `ChipFilter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_chipById_fkey` FOREIGN KEY (`chipById`) REFERENCES `ChipBy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipGuessToQuestion` ADD CONSTRAINT `_ChipGuessToQuestion_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChipGuess`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipGuessToQuestion` ADD CONSTRAINT `_ChipGuessToQuestion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipByToChipGuess` ADD CONSTRAINT `_ChipByToChipGuess_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChipBy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipByToChipGuess` ADD CONSTRAINT `_ChipByToChipGuess_B_fkey` FOREIGN KEY (`B`) REFERENCES `ChipGuess`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipByToChipFilter` ADD CONSTRAINT `_ChipByToChipFilter_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChipBy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipByToChipFilter` ADD CONSTRAINT `_ChipByToChipFilter_B_fkey` FOREIGN KEY (`B`) REFERENCES `ChipFilter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipFilterToQuestion` ADD CONSTRAINT `_ChipFilterToQuestion_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChipFilter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipFilterToQuestion` ADD CONSTRAINT `_ChipFilterToQuestion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToUser` ADD CONSTRAINT `_QuestionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionToUser` ADD CONSTRAINT `_QuestionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnswerToChipGuess` ADD CONSTRAINT `_AnswerToChipGuess_A_fkey` FOREIGN KEY (`A`) REFERENCES `Answer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnswerToChipGuess` ADD CONSTRAINT `_AnswerToChipGuess_B_fkey` FOREIGN KEY (`B`) REFERENCES `ChipGuess`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnswerToChipFilter` ADD CONSTRAINT `_AnswerToChipFilter_A_fkey` FOREIGN KEY (`A`) REFERENCES `Answer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AnswerToChipFilter` ADD CONSTRAINT `_AnswerToChipFilter_B_fkey` FOREIGN KEY (`B`) REFERENCES `ChipFilter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
