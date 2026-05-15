-- CreateTable
CREATE TABLE `_QuestionChipGuess` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QuestionChipGuess_AB_unique`(`A`, `B`),
    INDEX `_QuestionChipGuess_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_QuestionChipGuess` ADD CONSTRAINT `_QuestionChipGuess_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChipGuess`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QuestionChipGuess` ADD CONSTRAINT `_QuestionChipGuess_B_fkey` FOREIGN KEY (`B`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
