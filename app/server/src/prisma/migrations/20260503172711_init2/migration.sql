-- CreateTable
CREATE TABLE `Player` (
    `id` VARCHAR(191) NOT NULL,
    `exp` INTEGER NOT NULL DEFAULT 0,
    `expNextLvl` INTEGER NOT NULL DEFAULT 10,
    `lvl` INTEGER NOT NULL DEFAULT 0,
    `kp` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChipGuess` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gamingLvl` INTEGER NOT NULL DEFAULT 0,
    `watchingLvl` INTEGER NOT NULL DEFAULT 0,
    `animationsLvl` INTEGER NOT NULL DEFAULT 0,
    `soundsLvl` INTEGER NOT NULL DEFAULT 0,
    `twitchLvl` INTEGER NOT NULL DEFAULT 0,
    `hearthLvl` INTEGER NOT NULL DEFAULT 0,
    `charactersLvl` INTEGER NOT NULL DEFAULT 0,
    `variousLvl` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `ChipGuess_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChipBy` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gamingLvl` INTEGER NOT NULL DEFAULT 0,
    `watchingLvl` INTEGER NOT NULL DEFAULT 0,
    `animationsLvl` INTEGER NOT NULL DEFAULT 0,
    `soundsLvl` INTEGER NOT NULL DEFAULT 0,
    `twitchLvl` INTEGER NOT NULL DEFAULT 0,
    `hearthLvl` INTEGER NOT NULL DEFAULT 0,
    `charactersLvl` INTEGER NOT NULL DEFAULT 0,
    `variousLvl` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `ChipBy_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `globalModifier` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gamingLvl` INTEGER NOT NULL DEFAULT 0,
    `watchingLvl` INTEGER NOT NULL DEFAULT 0,
    `animationsLvl` INTEGER NOT NULL DEFAULT 0,
    `soundsLvl` INTEGER NOT NULL DEFAULT 0,
    `twitchLvl` INTEGER NOT NULL DEFAULT 0,
    `hearthLvl` INTEGER NOT NULL DEFAULT 0,
    `charactersLvl` INTEGER NOT NULL DEFAULT 0,
    `variousLvl` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `globalModifier_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `answerType` ENUM('GAMING', 'WATCHING', 'ANIMATION', 'SOUND', 'TWITCH', 'HEART', 'CHARACTERS', 'VARIOUS') NOT NULL,

    UNIQUE INDEX `Answer_value_key`(`value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `mediaId` VARCHAR(191) NOT NULL,
    `alreadyAsked` BOOLEAN NOT NULL DEFAULT false,
    `answerId` VARCHAR(191) NOT NULL,
    `answerType` ENUM('GAMING', 'WATCHING', 'ANIMATION', 'SOUND', 'TWITCH', 'HEART', 'CHARACTERS', 'VARIOUS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SelectedChip` (
    `id` VARCHAR(191) NOT NULL,
    `chipGuessId` VARCHAR(191) NOT NULL,
    `chipById` VARCHAR(191) NOT NULL,
    `usageCount` INTEGER NOT NULL DEFAULT 0,
    `gameId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` VARCHAR(191) NOT NULL,
    `currentQuestionId` VARCHAR(191) NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `difficulty` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lvl` INTEGER NOT NULL DEFAULT 0,
    `lvlMax` INTEGER NOT NULL DEFAULT 10,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChipGuessChipBy` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChipGuessChipBy_AB_unique`(`A`, `B`),
    INDEX `_ChipGuessChipBy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QuestionChipBy` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionChipBy_AB_unique`(`A`, `B`),
    INDEX `_QuestionChipBy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GameGlobalModifier` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GameGlobalModifier_AB_unique`(`A`, `B`),
    INDEX `_GameGlobalModifier_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `Media`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SelectedChip` ADD CONSTRAINT `SelectedChip_chipGuessId_fkey` FOREIGN KEY (`chipGuessId`) REFERENCES `ChipGuess`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SelectedChip` ADD CONSTRAINT `SelectedChip_chipById_fkey` FOREIGN KEY (`chipById`) REFERENCES `ChipBy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SelectedChip` ADD CONSTRAINT `SelectedChip_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_currentQuestionId_fkey` FOREIGN KEY (`currentQuestionId`) REFERENCES `Question`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipGuessChipBy` ADD CONSTRAINT `_ChipGuessChipBy_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChipBy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChipGuessChipBy` ADD CONSTRAINT `_ChipGuessChipBy_B_fkey` FOREIGN KEY (`B`) REFERENCES `ChipGuess`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionChipBy` ADD CONSTRAINT `_QuestionChipBy_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChipBy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionChipBy` ADD CONSTRAINT `_QuestionChipBy_B_fkey` FOREIGN KEY (`B`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameGlobalModifier` ADD CONSTRAINT `_GameGlobalModifier_A_fkey` FOREIGN KEY (`A`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameGlobalModifier` ADD CONSTRAINT `_GameGlobalModifier_B_fkey` FOREIGN KEY (`B`) REFERENCES `globalModifier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
